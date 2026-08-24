# Changelog

Este fichero arranca en `v13.5.0`. El histórico anterior vive en los mensajes de commit
de cada tag (`git log --tags`).

El paquete sigue [semver](https://semver.org/lang/es/): **patch** para bug fixes y
regeneración de `dist`, **minor** para componentes/props/variantes/tokens nuevos, **major**
para breaking changes.

## v14.0.2

### Cambiado

- **El repo pasa de npm a pnpm.** `pnpm-lock.yaml` importado del `package-lock.json` (mismas
  versiones), `packageManager` fijado a `pnpm@10.12.1` como en el resto de la suite y `Dockerfile`
  con corepack.

- **Fuera el script `prepare`.** `dist/` va committeado, así que a los consumidores que instalan
  por tag de git el `prepare` solo les costaba bajar las devDependencies y recompilar para nada.
  En local lo sustituye `pnpm build:all` (`build:tokens` → `build:lib` → `build:css` →
  `build:tokens-css`).

## v14.0.1

### Corregido

- **`react-hook-form` y `sonner` pasan a externos del build de librería.** Son peers con contexto
  compartido: bundlearlos duplicaba la librería dentro del consumidor, de modo que el
  `FormProvider` del consumidor no cruzaba hasta los campos de `brand` y los `toast()` disparados
  fuera no llegaban al `Toaster`. Ya estaban declarados en `peerDependencies`; ahora el bundle los
  respeta.

## v14.0.0

Mayor: `@studiolxd/brand` absorbe `@slxd/ui` y se convierte en el design system canónico de la
suite slxd y de la web. El breaking está en los tokens de feedback y en `Tag`; **no hay alias de
compatibilidad**, cualquier nombre viejo se queda sin valor al subir.

### Roto

- **Tokens de feedback por rol, separados por uso.** El esquema viejo tenía un solo token por rol
  y superficie que servía indistintamente de color de texto y de fondo. Ahora cada rol
  (`error`, `success`, `destructive`) expone tres cosas distintas: `*-text-on-light` /
  `*-text-on-dark` para texto, icono y borde; `*-fill` para fondo sólido (universal, el mismo en
  superficie clara y oscura); y `*-fill-text` para el contenido que va encima de ese fondo.

  | Nombre viejo | Nombre nuevo |
  | --- | --- |
  | `--color-error-on-light` | `--color-error-text-on-light` |
  | `--color-error-on-dark` | `--color-error-text-on-dark` |
  | `--color-success-on-light` | `--color-success-text-on-light` |
  | `--color-success-on-dark` | `--color-success-text-on-dark` |
  | `--color-destructive-on-light` | `--color-destructive-text-on-light` |
  | `--color-red-on-light` | `--color-red` |
  | `--color-red-on-dark` | `--color-red-light` |
  | `--color-green-on-light` | `--color-green` |
  | `--color-green-on-dark` | `--color-green-light` |

  La regla para migrar un uso viejo: si estaba en `color`, `border-color` o `outline-color` va a
  `*-text-on-*`; si estaba en `background`/`background-color` va a `*-fill`, y el color del
  contenido de encima a `*-fill-text`. Los primitivos `--color-red-light` y `--color-green-light`
  son **solo** texto/icono/borde sobre prussian, nunca fondo; y los `*-fill` nunca son color de
  texto.

- **Tokens retirados sin sustituto directo.**

  | Retirado | Qué usar |
  | --- | --- |
  | `--color-green-dark` | `--color-green` (texto sobre claro) o `--color-success-fill` (fondo) |
  | `--color-green-bg` | no hay equivalente: el fondo de success es `--color-success-fill` sólido, con `--color-success-fill-text` encima |
  | `--tag-default-bg`, `--tag-default-color` | `--tag-neutral-bg`, `--tag-neutral-color` |

  No entra en `brand` la familia *tint* de `@slxd/ui` (`success-tint`, `success-tint-text`,
  `green-tint`, `green-deep`): el rol de feedback se resuelve con el par texto/fill, sin fondo
  teñido intermedio. Los consumidores que la usaran tienen que pasar a `*-fill` + `*-fill-text`.

- **`Tag` pierde la variante `default`.** `TagVariant` ya no la acepta y el valor por defecto de
  la prop `variant` pasa a ser `neutral`. Migración: `variant="default"` → `variant="neutral"`, o
  quitar la prop. Ojo, no es un renombrado a secas: `default` era gris claro con texto oscuro y
  `neutral` es gris oscuro con texto blanco, así que el tag cambia de aspecto.

### Añadido

- **El delta de `@slxd/ui`, con diez entries nuevos del paquete.**

  | Entry | Componente |
  | --- | --- |
  | `@studiolxd/brand/skeleton` | `Skeleton` |
  | `@studiolxd/brand/tooltip` | `Tooltip` |
  | `@studiolxd/brand/command-palette` | `CommandPalette` |
  | `@studiolxd/brand/form-field` | `FormField` |
  | `@studiolxd/brand/image-crop-dialog` | `ImageCropDialog` |
  | `@studiolxd/brand/menu` | `Menu` |
  | `@studiolxd/brand/sheet` | `Sheet` |
  | `@studiolxd/brand/data-table` | `DataTable` |
  | `@studiolxd/brand/conversation-thread` | `ConversationThread` (ya existía, ahora con entry propio) |
  | `@studiolxd/brand/app-launcher` | `AppLauncher` — el `SlxdLauncher` de la suite, renombrado |

  `AppLauncher` llega nuevo a `brand`: ningún consumidor de `brand` usaba `SlxdLauncher`, así que
  el renombrado no rompe a nadie aquí.

- **`dropdownItems` acepta ítems de tipo `label` y `radio`**, además de los de acción y separador.

- **`'use client'` en los componentes con estado o efectos**, para consumirlos desde React Server
  Components sin envoltorios.

- **Fallback de `Avatar`** cuando la imagen falla o no hay `src`.

### Cobertura

Proyecto `components` nuevo de vitest sobre jsdom con los tests de componente que venían de
`@slxd/ui`. `pnpm test` corre `unit` + `components`; `pnpm test:stories` sigue corriendo el
proyecto `storybook`.

## v13.6.0

### Añadido

- **Props de texto en los componentes que aún cableaban castellano.** Misma convención que
  `Pagination` en `v13.5.0`: prop opcional con el texto actual como default, así que sin pasar
  nada el marcado no cambia.

  | Componente | Props nuevas |
  | --- | --- |
  | `AsyncSelect` | `emptyMessage`, `loadingLabel`, `clearLabel` |
  | `AsyncMultiSelect` | `emptyMessage`, `loadingLabel` |
  | `FileUpload` | `dropzoneLabel`, `dropzoneActiveLabel`, `dropzoneHintLabel`, `maxSizeHint`, `maxFilesHint`, `filesLabel`, `progressLabel`, `removeFileLabel`, `tooLargeError`, `invalidTypeError` |
  | `NumberInput` | `decrementLabel`, `incrementLabel` |
  | `TimeSelect` | `hoursLabel`, `minutesLabel`, `hoursPlaceholder`, `minutesPlaceholder` |
  | `InputPhone` | `countryLabel` |
  | `Calendar`, `CalendarPlanner` | `previousMonthLabel`, `nextMonthLabel` |
  | `CalendarRoster` | `previousMonthLabel`, `nextMonthLabel`, `legendLabel`, `legendItems` |
  | `Table` (`TableHeader`) | `sortedAscLabel`, `sortedDescLabel`, `sortableLabel` |
  | `CodeBlock` | `copyLabel`, `copiedLabel` |
  | `ConversationThread` | `ariaLabel` |
  | `LoginForm` | `emailLabel`, `passwordLabel`, `submitLabel`, `loadingLabel` |

  Los dos textos **visibles** sin ninguna vía de traducción eran "Sin resultados"
  (`AsyncSelect`/`AsyncMultiSelect`) y los de la zona de arrastre de `FileUpload`; el resto eran
  etiquetas accesibles.

- **`LegendItem`** exportado desde el índice del paquete (tipo de `CalendarRoster.legendItems`).

- **Foundations › Internacionalización** — página nueva de Storybook con la convención de props
  de texto, el criterio de nombres, el tratamiento de fechas vía `locale` y la tabla de todos los
  componentes con props de texto. La regla equivalente para el desarrollo interno queda en
  `CLAUDE.md`.

### Cobertura

Una story de test por componente tocado, verificando en cada uno que los textos por defecto se
siguen emitiendo y que las props pasadas los sustituyen.

## v13.5.0

### Añadido

- **Pagination — etiquetas accesibles configurables.** Todos los textos que el componente
  emitía cableados en castellano son ahora props opcionales, con el texto actual como valor
  por defecto:

  | Prop | Default | Dónde aparece |
  | --- | --- | --- |
  | `pageLabel?: (page: number) => string` | `` `Página ${page}` `` | `aria-label` de cada botón/enlace de página |
  | `previousLabel?: string` | `"Página anterior"` | `aria-label` del control anterior |
  | `nextLabel?: string` | `"Página siguiente"` | `aria-label` del control siguiente |
  | `pagesGroupLabel?: string` | `"Páginas"` | `aria-label` del `role="group"` de los controles |
  | `pageSizeLabel?: string` | `"Registros por página"` | `aria-label` del `Select` de registros por página |
  | `totalLabel?: (total: number) => string` | `` `${total} resultados` `` | texto del sumario de `showTotal` |

  `ariaLabel` (el `aria-label` del `<nav>`) ya era configurable y no cambia.

  Motivación: un consumidor multiidioma que delegaba en este componente perdía sus
  traducciones y anunciaba "Página 3" a un lector de pantalla en inglés o alemán. Ahora
  puede inyectar sus textos traducidos. Sin pasar ninguna prop el marcado es idéntico al
  de `v13.4.1`, así que el cambio es retrocompatible.

  Documentado en el JSDoc de `PaginationProps` y en la sección "Internacionalización de las
  etiquetas" de `Pagination.mdx`. Cubierto por dos stories de test: una verifica los textos
  por defecto, otra que las props pasadas ganan.
