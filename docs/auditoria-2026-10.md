# Informe de análisis del sistema de diseño `@studiolxd/brand`

**Versión analizada:** 49.28.0 (HEAD `79c8b906`, árbol limpio) · **Fecha:** 2026-10-06

Alcance: tokens (190 JSON, 4.313 tokens), CSS (188 ficheros), API de los 232 componentes exportados, empaquetado npm, tests, documentación (193 MDX), Storybook, paridad nativa e higiene del repo. Todo lo que figura aquí se ha comprobado leyendo el código o ejecutando comandos en el repo; lo que no pudo verificarse en ejecución se marca como tal. No se ha podido usar el MCP de Storybook (el servidor no estaba levantado).

---

## 1. Resumen ejecutivo

El sistema está en buen estado estructural: `tsc` y `eslint` pasan limpios, las tres listas de registro (`entry-points.mjs`, `package.json#exports`, `dist/`) cuadran, no hay `!important`, ni ids en selectores, ni `text-decoration: underline`, ni `@radix-ui`, ni `asChild`, ni atributos `style`, ni `TODO` pendientes. Las reglas no negociables de `CLAUDE.md` se cumplen casi al pie de la letra en el código de componentes.

Los problemas reales están en otra capa: **en lo que se publica, en lo que se documenta y en la coherencia de la API entre componentes**.

| Área | Estado | Hallazgo principal |
|---|---|---|
| Empaquetado | 🔴 | 2,2 MB de sourcemaps base64 incrustados en el CSS publicado; `Figure` rompe en Server Components |
| Documentación interna | 🔴 | `CLAUDE.md` y `src/index.ts` describen un barril que no existe; CHANGELOG contradice al código |
| Consistencia de API | 🟠 | 5 nombres para la prop de color, 4 para cerrar, 2 grafías de `aria-label`, 114 componentes sin `ref` |
| Tokens | 🟠 | 150 tokens huérfanos, 47 colores literales fuera de las paletas, 101 dimensiones sin primitivo |
| i18n | 🟠 | 5 componentes conservan castellano cableado pese a que v49.0.0 dice que ya no queda ninguno |
| Dependencias | 🟠 | Dos deps empaquetadas y a la vez declaradas; externals obsoletos; una dep duplicada |
| Infraestructura | 🟠 | Sin CI, sin hooks, sin `engines`, sin umbral de coverage; 141 tags y 18 majors en 30 días |
| Accesibilidad | 🟡 | Addon a11y en modo aviso (`todo`); `aria-selected` inválido en `Table`; 4 `outline: none` sin alternativa clara |
| Higiene del repo | 🟡 | `.bak`, `notes/`, restos de plantilla Vite y binarios sin referencia rastreados |
| CSS de componentes | 🟢 | Cumplimiento alto; violaciones puntuales de opacidad, z-index y tamaños literales |

---

## 2. Problemas críticos (arreglar antes del siguiente release)

### 2.1 Sourcemaps incrustados en el CSS publicado

`build:css` y `build:tokens-css` llaman a `postcss … -o` sin `--no-map`, y postcss-cli incrusta el sourcemap en base64 en la última línea.

| Fichero | Total | Sourcemap | Sin map | Sin map ni comentarios | gzip (sin map ni comentarios) |
|---|---|---|---|---|---|
| `dist/tokens.css` | 1.714 KB | 1.071 KB (62,5 %) | 643 KB | 378 KB | 39 KB |
| `dist/brand.css` | 1.765 KB | 1.104 KB (62,5 %) | 661 KB | 385 KB | 41 KB |

El paquete pesa 7,94 MB descomprimido; 2,2 MB son estos dos mapas. Además `brand.css` contiene casi íntegro `tokens.css` (por diseño), y ambos viajan en el paquete y en git (son los dos ficheros más grandes del repo).

**Arreglo:** `--no-map` en ambos scripts; valorar `cssnano` o al menos retirar los comentarios `/** descripción */` del CSS generado (265 KB), que ya están en `tokens.json` y en Storybook.

### 2.2 `Figure` falla en un React Server Component

`src/stories/atoms/Figure/Figure.tsx:2,79` usa `useRender` de `@base-ui/react/use-render`, que internamente llega a `useRef`. `figure` **no está en `clientComponents`**, así que `dist/figure.js` sale sin `'use client'`. Importado desde un RSC, la build `react-server` de React no exporta `useRef` y el render falla. (Cadena de hooks verificada leyendo el código; no ejecutado.)

**Arreglo:** añadir `'figure'` a `clientComponents` en `scripts/entry-points.mjs`, o sustituir `useRender` por composición sin hooks.

### 2.3 `ref` que se pierde en silencio con React 18

El peer es `react >=18`. Seis componentes tipan `ref` (vía `SVGProps`/`ComponentProps`) pero son funciones sin `forwardRef`; en React 18 el `ref` no llega y TypeScript no avisa:

- `atoms/Skeleton/Skeleton.tsx:24`
- `molecules/FormField/FormField.tsx:109, 127, 164, 185, 217` (`FormItem`, `FormLabel`, `FormDescription`, `FormMessage`, `FormRootMessage`)

**Arreglo:** `forwardRef` en los seis, o subir el peer a `react >=19` y documentarlo.

### 2.4 El barril `src/index.ts` no existe para el consumidor y la documentación lo da por hecho

- No hay export `"."`, ni `main`, ni `types`, ni `dist/index.js`/`dist/index.css`. `README.md:31` lo dice bien: «No hay barril».
- `src/index.ts` (446 líneas) se mantiene a mano, `CLAUDE.md` obliga a registrar cada componente ahí (checklist, paso 3) y `CLAUDE.md:65` describe la salida como `dist/index.js + dist/index.css`.
- Ya está desincronizado: faltan `PageIntro`, `SiteNav`, `SiteHeader` y `SiteShell`; hay 59 saltos de orden alfabético y 17 exports en la sección equivocada (p. ej. `DataTable`, `Sheet`, `Menu` y `CommandPalette` bajo «Atoms»).
- Cinco documentos enseñan un import que falla: `Pagination.mdx:127`, `CodeBlock.mdx:62,95`, `Toast.mdx:26`, `Button.mdx:154`, `CodeBlock.stories.tsx:61` (`from '@studiolxd/brand'` sin subruta).

**Decisión pendiente:** o se publica el barril como `"."` (con el coste de tree-shaking y de arrastrar peers opcionales), o se borra `src/index.ts`, se corrige `CLAUDE.md` y se arreglan los cinco MDX. La segunda es coherente con la política actual de subrutas.

### 2.5 Dependencias mal clasificadas

| Dependencia | Problema |
|---|---|
| `@tanstack/react-table`, `react-image-crop` | Se **empaquetan** en `dist/data-table.js` y `dist/_shared/imagecropdialog.js` (no están en `external`) y a la vez están en `dependencies`: el consumidor las instala sin usarlas y hay dos copias si él también las usa |
| `react-phone-number-input` | Duplicada en `dependencies` y `devDependencies` (`^3.4.16` en ambas) |
| `vite-plugin-dts` | En `devDependencies` sin ninguna referencia |
| `/^@radix-ui\//`, `/^embla-carousel/`, `'sonner'` | Externals en `vite.lib.config.ts` que nada importa; `Toast.mdx:182` dice que sonner se quitó en v25 |
| `engines`, `LICENSE` | No existen |

`CLAUDE.md` nombra el motor como `@base-ui-components/react`; el paquete real es `@base-ui/react`.

---

## 3. Problemas importantes

### 3.1 Consistencia de la API

**La prop que pone el color tiene cinco nombres**, y el mismo significado («error/peligro») tres grafías:

| Nombre | Componentes |
|---|---|
| `variant` | Tag, NumberBadge, ProgressBar, Alert, Banner |
| `tone` | StepMarker, Steps, Timeline (y con otro significado en Text, Link, Button, StatTile) |
| `color` | Card (`Card.tsx:9`, pisa el atributo HTML `color`) |
| `intent` | toast (`toast.ts:11`) |
| `destructive` (booleano) | Button |

`danger` (Tag, NumberBadge, StepMarker) · `error` (Alert, Banner, toast) · `destructive` (Text, Button). `StepMarkerTone` está mapeado 1:1 a `NumberBadgeVariant` (`StepMarker.tsx:7`): es el mismo tipo con otro nombre.

**Cerrar un componente tiene cuatro convenciones:** `onClose` (Modal, ImageCropDialog, toast), `onDismiss` (Alert, Banner), `onCancel` (ConfirmDialog), `onOpenChange` (Sheet, CommandPalette, Popover, Menu…). `isOpen` sobrevive solo en `MenuButton.tsx:23`; el resto usa `open`.

**Nombre accesible con dos grafías:** `ariaLabel` (camelCase) en 11 componentes (Input, NumberInput, FileUpload —que tiene las dos—, Sparkline, FilterBar, Pagination, TableOfContents, Breadcrumb, Chart, ConversationThread, DataTable) frente a `'aria-label'` en el resto.

**Enlace del router inyectado con tres patrones:** `render` (Button, Link, Figure, Card, ProjectCard), `renderLink` (15 componentes) y `linkComponent: ComponentType<any>` (Pagination, PrevNextNav, CalendarRoster), este último con los únicos cuatro `any` del repo.

**Escala `size` fragmentada:**

| Valores | Componentes |
|---|---|
| `sm \| md \| lg` | La inmensa mayoría (controles, campos, menús) |
| `sm \| md` | EmptyState, LoadingState, PrevNextNav, Prose, StatTile, Table, StepMarker |
| `… \| xl` | SearchForm (único control con `xl`), Logomark |
| `… \| xxl` | Logo |
| `… \| 2xl \| 3xl \| 4xl` | Avatar (`2xl` frente al `xxl` de Logo) |
| `small \| default \| large` | Paragraph, CardDescription (palabras en vez de abreviaturas) |
| `1…10` | Heading, CardTitle, PageIntro, Fieldset (que **redeclara** el tipo en `Fieldset.tsx:4` en vez de importarlo) |

**`className` y `ref` irregulares:**

- 33 de 232 componentes no aceptan `className`. Incoherencias entre hermanos: `Modal` lo excluye a propósito (`Modal.tsx:29`) pero `Sheet`, `ConfirmDialog` y `CommandPalette` sí; `Select` no, sus partes sí; `InputPhone` no, el resto de inputs sí; `Spinner`, `TypingIndicator`, `SkeletonText/List/Table/Grid` no; `ContextMenu`, `OrgSwitcher`, `UserMenu`, `AppLauncher` no, pero `Menu` sí; `AppShell`, `AppHeader`, `Sidebar` no.
- 114 de 232 no aceptan `ref`: `Stack`, `Inline`, `Columns` (pero `Container` sí), `Table` y sus partes, `Avatar`, `Icon`, todos los diálogos, `Popover` y `Menu` (pero `Tooltip` sí), `Calendar` (pero `DatePicker` sí).

**Textos en bloque** (`labels: {...}`) en ThemeSwitcher, Stepper, AppLauncher y RecoveryCodes, en contra de la norma `<cosa>Label` de `CLAUDE.md`; y en `FieldRow.tsx:23` `labels` significa otra cosa (`'first-row' | 'every-row'`).

`title` es `string` en Modal/ConfirmDialog y `ReactNode` en Sheet, Hero, ErrorPage…; `label` es `string` en casi todos y `ReactNode` en CheckboxField, RadioField, SwitcherField, StatTile, PrevNextNav, Tooltip.

### 3.2 Internacionalización: castellano cableado que el CHANGELOG niega

La entrada v49.0.0 afirma que «ningún componente del paquete trae ya castellano puesto». Siguen trayéndolo:

| Componente | Dónde | Observación |
|---|---|---|
| ThemeSwitcher | `ThemeSwitcher.tsx:59` `{ group: 'Tema', light: 'Claro', dark: 'Oscuro', system: 'Sistema' }` | No usa `useBrandMessages`; además compone `` `${group}: ${valor}` `` con separador fijo (`:113`). **No está en la tabla de Internacionalización** y está portado a nativo |
| StatTile | `StatTile.tsx:54-58` `DIRECTION_LABEL = { up: 'Sube', down: 'Baja', flat: 'Sin cambio' }` | Se lee en `<VisuallyHidden>`; solo cambiable dato a dato |
| CloseButton | `CloseButton.tsx:29` `label = 'Cerrar'` | Sin catálogo, al contrario que DotsButton y Modal |
| CalendarPlanner | `CalendarPlanner.tsx:199-203` | Mezcla `useBrandMessages` con 5 defaults literales («Semana anterior», «Mes»…) |
| SidebarNav | `SidebarNav.tsx:134` `` `${label} — ${vacío}` `` | Orden y separador fijos; debería ser función |
| EmailLayout | `EmailLayout.tsx:117-121` | Defaults castellanos; declarado en la tabla, pero contradice v49.0.0 |

Además `Internacionalizacion.mdx` está desfasado: cita `LoginForm` (retirado en `d335c894`), dice que el proveedor «hoy lo usan Pagination y la familia de tablas» cuando hay ~80 espacios y 88 componentes usándolo, le faltan ~19 espacios en la lista de las líneas 55-67 y la ruta del test en la línea 112 es incorrecta (`src/messages/…` → `src/stories/messages/…`).

**Semver:** la 49.27.0 salió como *minor* pero añade `fileUpload.uploading` como clave obligatoria de `BrandMessages` («cada aplicación debe añadirla»): rompe los tipos del consumidor, era major por la propia política del repo.

### 3.3 Tokens

- **150 tokens de componente huérfanos** (223 sin uso directo, 73 de ellos referenciados por otro token). Por grupo: `*-field.error.*` 90 (5 tokens × 18 campos, ninguno usado), `button` 25, `chart` 16, `control`/`file-upload`/`sidebar-nav` 4 cada uno. Ejemplos: `--button-destructive-*` (10), `--chart-sequential-100/700`, `--control-cursor`, `--input-field-error-color`.
- **47 colores literales fuera de las paletas permitidas** (regla 9): 42 hex en `tokens/color/chart.json` (las series de gráficos: `#1E7FF6`…), `kbd.surface-dark-bg = rgba(255,255,255,0.08)` en `kbd.json:26`, y `shadow.sm…xl` con `rgba(17,30,48,…)` (el prusia escrito a mano en vez de referenciado). O se declara `chart.json` paleta aprobada o se referencia a primitivos.
- **101 tokens de componente con dimensión literal sin primitivo**: `switcher.json` (10, `track-padding = 0.1875em`), `checkbox.json`/`radio.json` (6 cada uno, `size = 1.25em`), `spinner.json` (`border-width-* = 2px` sin pasar por la escala `border-width`), `sidebar.json` (`width = 15rem`).
- **Nomenclatura dispar:** `hover` como prefijo (`button.hover-*`, 26), infijo (`*-hover-*`, 86) y sufijo (`*-color-hover`, 7); `bg` (330) frente a `text.background` (2); `ink-color` (Link, Button text) frente a `text-color`; 101 `*height` y 52 `*width` frente a solo 32 `*-inline-size`/`*-block-size`; `container.max-width-xl` frente a `modal.width-max`; `radio-group.gap-horizontal`. Los grupos `color-picker` y `color-swatch` generan `--color-picker-*`/`--color-swatch-*`, que se leen como tokens globales `--color-*`.
- **Referencia rota en CSS:** `--color-border-subtle` no existe y se usa en `foundations/TypeScale.css:13,17,47`.
- **Hueco oscuro real:** `radio.json:21-22` (`disabled-border-color`, `disabled-dot-color`) sin par `surface-dark-*`, mientras `checkbox.json:33-34` sí lo tiene.
- **Tokens obsoletos sin retirar:** `breadcrumb.link-text-decoration(-hover)`, marcados «a retirar en el próximo major» (ha habido 18 majors desde entonces).
- **`surface-invert.css` y `surface-light.css` son idénticos** (769 declaraciones, solo cambia el selector): fundir los selectores ahorra 47 KB.
- **Espejo manual de tokens en JS:** `Chart.tsx:166-179` tiene un objeto `GEOMETRY` con 12 valores `--chart-*` copiados a mano («si cambia el token, cambia aquí»), cuando existe `tokenPx()` en `src/tokens/tokens.ts`.

### 3.4 Duplicación de código

| Pareja | Solapamiento | Nota |
|---|---|---|
| AsyncSelect ↔ AsyncMultiSelect | 172 líneas idénticas, 75 % de contención | Los cuatro (`AsyncSelect`, `AsyncMultiSelect`, `Autocomplete`, `MultiSelect`) **montan el combobox ARIA a mano** sobre `@base-ui/react/popover`, mientras `DocsSearch` y `CommandPalette` usan `@base-ui/react/autocomplete`. Contradice «Base UI es el motor de conducta» |
| AsyncSelectField ↔ AsyncMultiSelectField | 75 % | Los seis `*SelectField`/`DropdownField`: 41-68 % |
| CheckboxField ↔ SwitcherField | 72 % | |
| InputField ↔ TextareaField | 71 % | |
| ErrorPage ↔ NotFoundPage | 76 % | |
| Inline ↔ Stack | 47 % | Comparten `gap` |

**Helpers copiados sin utilidad compartida:** `assignRef` ×7 (AsyncSelect:103, AsyncMultiSelect:114, Autocomplete:85, MultiSelect:78, FileUpload:190, InputPhone:213 + 1 inline), `cssLengthToPx`/`tokenSideOffset` ×4 (Tooltip, Popover, NotificationPanel, UserMenu), `defaultRenderLink` ×12.

### 3.5 Infraestructura y cadencia

- **Sin CI** (`.github/` no existe), sin `.husky`/lint-staged, sin `engines`/`.nvmrc`, sin `thresholds` de coverage (aunque `@vitest/coverage-v8` está instalado). La calidad depende de que una persona ejecute `release:check` a mano.
- **Cadencia:** 528 tags en total, **141 en los últimos 30 días**, **18 majors en 30 días** (v32→v49; 9 majors solo el 2026-09-15). Para 10 apps consumidoras, cada major es una migración. Las olas v40-v49 son todas la misma migración (al `BrandMessagesProvider`) troceada por familias: habría cabido en uno o dos majors con una guía única.
- **CHANGELOG:** 8.154 líneas / 479 KB **publicados en npm** (`files`); dos formatos de encabezado (`## [x.y.z] — fecha` desde 30.10.1, `## vX.Y.Z` antes); tags sin entrada: 31.1.0, 31.1.1, 34.1.1; **no existe la sección `[Sin publicar]`** que `CLAUDE.md` exige.
- Addon a11y en `a11y: { test: 'todo' }` (`.storybook/preview.tsx:175`): las violaciones solo avisan. No hay `axe` en los tests de componentes.

---

## 4. Problemas menores

### 4.1 Accesibilidad
- `Table.tsx:237`: `<tr aria-selected>` fuera de `grid`/`treegrid` no es válido (ARIA).
- `Tooltip.tsx:165`: `<span tabIndex={0}>` sin rol para envolver un disparador deshabilitado.
- `StarRating.tsx:249,273,300`: cae a `aria-label=""` (nombre accesible vacío) si falta el texto.
- `outline: none` sin alternativa visible: `Toast.css:30`, `FloatingDock.css:85`, listas desplazables en `DocsSearch.css:17` y `CommandPalette.css:37` (Chrome puede hacerlas enfocables). Por confirmar en navegador.
- `Card.tsx:393,444` (`CardAction`, `CardSelection`): `<div onClick>` sin rol; delegan en un control interior (no verificado a fondo).

### 4.2 Hooks y SSR
- **Ids fijos por defecto** que chocan con dos instancias: `ThemeSwitcher.tsx:58` (`'theme-switcher'`), `LanguageSwitcher.tsx:92`, `DocsSearch.tsx:131`, `SiteHeader.tsx:103`.
- **`new Date()`/`Date.now()` en el render** (riesgo de desajuste de hidratación): `Calendar.tsx:137,150`, `CalendarRoster.tsx:188`, `CalendarPlanner.tsx:210,213,271`, `_shared/calendarGrid.tsx:333,342,463,473`, `ClockWidget.tsx:159`.
- `Toaster.tsx:192` muta un singleton global (`setToastDefaultDuration`): dos `<Toaster>` se pisan.
- `ConfirmDialog.tsx:203`: `useEffect` que reinicia 3 estados al cerrar; mejor en el manejador o con `key`.
- `_shared/dropdownItems.tsx:221`: `setTimeout` sin cancelar.
- 3 `eslint-disable react-hooks/exhaustive-deps` (`MultiSelect.tsx:243` sin justificar, `Consent.tsx:315`, `SiteHeader.tsx:147`).

### 4.3 CSS de componentes (violaciones puntuales de «token first»)
- Opacidad literal con tokens disponibles: `AsyncSelect.css:33,69`, `AsyncMultiSelect.css:33,75`, `Autocomplete.css:33`.
- Tamaños: `AsyncMultiSelect.css:86` (`4rem`), `AuthPage.css:8-9` (`300px`/`65px`), `Consent.css:34`, `RecurrenceField.css:24`, `Modal.css:31` (`width: 90vw`, además física), `Table.css:146`.
- `line-height: 1.2` en `CalendarRoster.css:76`.
- z-index locales literales en CalendarRoster, Card, Heatmap, Stepper, Table, PlanningGrid (9 casos).
- Receta sr-only duplicada en `CommandPalette.css:53-56` (debería usar `VisuallyHidden`).
- Propiedades físicas: 36 `border-top/bottom` (Table, Select y la familia de combos), 16 `top/left/right/bottom` (Modal, Sheet, Tooltip, Calendar, ColorPicker, CalendarRoster), `text-align: left` en `Table.css:23`, 208 `width`/`height`.
- Selectores de 4 niveles: `AppShell.css:87`, `Table.css:89-90`.
- Breakpoint `767px` en `TextStyles.css:28` frente a `767.98px` en el resto.
- La mitad de los 214 valores hardcoded está en `foundations/*.css` (CSS de documentación, no se publica), con 19 shorthands `padding: a b` y 8 `margin-top`: no viaja, pero predica mal desde la documentación.

### 4.4 Documentación
- `CLAUDE.md:71` cita `organisms/ContactForm`, que no existe; no menciona `templates/`.
- `Colors.mdx:143` cita `--app-launcher-tile-active-marker-*`, retirados en `a03bf4fa` (2026-09-11).
- 5 componentes sin `.mdx`: `Fieldset`, `FormField`, `PasswordField` (y está portado a nativo), `AppWithSidebar`, `Bricks`.
- `storySort` de `.storybook/preview.tsx` no incluye «Marca», «Gráficos de datos», «Tokens desde JavaScript» ni «Tarjeta social».
- Comentario desfasado en `.storybook/main.ts` (dice 14 MDX con tablas; hay 115).

### 4.5 Paridad nativa
- `CloseButton` tiene implementación Swift y Kotlin **sin ficha de paridad** y falta en la tabla SwiftUI de `native/README.md`.
- Nombres Swift en fichas que no existen como tipo: `Sheet.json` → `BrandSheet` (real: `BrandSheetContent` + `.brandSheet()`), `Toaster.json` → `ToastHost` (solo existe en Kotlin).
- `Menu` sin carpeta en `Comparisons/` (solo cubierto por `ContextMenu`).
- `Button.loading` (v49.28.0, 2026-10-05) entró en React sin tocar nativo; declarado en `excluded`, correcto, pero es la primera deriva.

### 4.6 Higiene del repo
- Rastreados y que no deberían: `sd.formats.mjs.bak` (40 KB, commit `94a9eca8`), `notes/` (20 ficheros de notas de sesión), `Package.resolved` (opinable).
- Restos de la plantilla Vite: `index.html` (`lang="en"`, `<title>brand</title>`), `src/main.tsx`, `src/App.tsx` (importa `./assets/react.svg` y `./assets/vite.svg`, **que ya no existen**), `src/App.css`, `public/icons.svg`, `src/assets/hero.png`; y los scripts `dev`, `build`, `preview` que solo los sirven a ellos.
- Binarios sin referencia: `public/clients/logos.af` (1,6 MB, fichero de Affinity), `public/videos/*` (700 KB).
- En el paquete: `src/tokens/utils.test.ts` se publica; woff2 duplicado entre `dist/assets/fonts/google-sans-flex/` y `dist/assets/email/` (120 KB, mismo md5); `dist/_types/pages` y `dist/_types/data` publicados sin export que los use.
- `.git` ocupa 84 MB; los dos CSS con sourcemap son los ficheros más grandes del historial y crecen en cada release.
- 87 carpetas de componente sin `*.test.tsx` (se cubren por `play` en stories salvo `Fieldset` y `AppWithSidebar`).

---

## 5. Mejoras propuestas

### 5.1 Inmediatas (un commit, patch)
1. `--no-map` en `build:css` y `build:tokens-css`. Regenerar `dist/`. (−2,2 MB)
2. `'figure'` → `clientComponents`.
3. `forwardRef` en `Skeleton` y los cinco `Form*` de `FormField.tsx`.
4. Quitar `react-phone-number-input` de `devDependencies`, `vite-plugin-dts`, y los externals `@radix-ui`/`embla-carousel`/`sonner`. Añadir `engines` y `LICENSE`.
5. Des-rastrear `sd.formats.mjs.bak` y `notes/`; borrar restos de la plantilla Vite y los scripts `dev`/`build`/`preview`; retirar `logos.af` y `public/videos` si nadie los usa.
6. Arreglar `--color-border-subtle` en `TypeScale.css` y el par oscuro de `radio.disabled-*`.
7. Añadir ficha `CloseButton.json`; corregir `native.swift` de `Sheet` y `Toaster`.
8. Corregir `CLAUDE.md` (`dist/index.js`, `ContactForm`, `@base-ui-components`, `templates/`), `Internacionalizacion.mdx` y `Colors.mdx:143`.

### 5.2 Corto plazo (minor)
9. **Decidir el destino de `src/index.ts`** (ver 2.4). Recomendación: borrarlo y quitar el paso 3 del checklist; arreglar los 5 MDX.
10. **Externalizar o retirar** `@tanstack/react-table` y `react-image-crop` de `dependencies` (si se empaquetan, no son deps del consumidor; si son externas, deben estar en `external`). Mi recomendación: externas y en `peerDependencies` opcionales, como `react-hook-form`.
11. **Fundir `surface-invert.css` y `surface-light.css`** en una sola regla con dos selectores (generador `sd.config.mjs`).
12. **Retirar los 150 tokens huérfanos** o, para los `*-field.error.*`, decidir si el patrón es que `ErrorText` los consuma. Script de detección en `release:check` para que no vuelvan a crecer.
13. **Mover `ThemeSwitcher`, `StatTile`, `CloseButton`, `CalendarPlanner` y `SidebarNav` al catálogo `BrandMessages`** para que la afirmación de v49.0.0 sea cierta. Es un major por la política vigente (cada clave nueva obligatoria lo es): agrupar con el punto 14.
14. **Catálogo de mensajes: hacer las claves nuevas opcionales con fallback**, o declarar explícitamente en `CLAUDE.md` que una clave nueva obligatoria es major. Evita el fallo de semver de 49.27.0 y la cascada de majors.
15. **Utilidades compartidas**: `src/stories/utils/assignRef.ts`, `cssLength.ts` (`cssLengthToPx` + `tokenSideOffset`), `defaultRenderLink.tsx`. Elimina ~23 copias.
16. **`Chart.GEOMETRY`** → leer de `tokenPx()`.
17. **CI mínima** (lint + tsc + test + `release:check` sin nativo) en GitHub Actions, y el hook `pre-push` propuesto en `CLAUDE.md`. `a11y.test: 'error'` al menos en `test:stories`.
18. **CHANGELOG**: añadir `[Sin publicar]`, unificar formato de encabezados, y valorar sacarlo de `files` (479 KB en cada instalación) o truncarlo a las últimas N versiones con enlace al repo.
19. **Fieldset**: importar `HeadingSize` en vez de redeclararlo. Documentar `Fieldset`, `FormField`, `PasswordField`.

### 5.3 Medio plazo (próximo major, agrupado)
20. **Unificar la prop de color**: un solo nombre (`tone` es el más extendido y no choca con HTML) y un solo vocabulario (`danger` o `error`, no ambos; `destructive` solo para la acción de `Button`). `StepMarkerTone` = `NumberBadgeVariant` = `TagVariant`.
21. **Unificar el cierre**: `onOpenChange` como contrato controlado en todo lo que se abre y cierra; `onDismiss` solo en lo que no es controlado (Alert, Banner).
22. **`'aria-label'` en lugar de `ariaLabel`** en los 11 componentes; eliminar la duplicidad en `FileUpload`.
23. **Un único patrón de enlace inyectado** (`render`), retirar `renderLink` y `linkComponent: any`.
24. **Escala `size` única**: `sm|md|lg(|xl)` en todo; `Paragraph`/`CardDescription` dejan `small|default|large`; `Logo` pasa de `xxl` a `2xl`.
25. **`className` y `ref` en todos los componentes de marcado** (no en proveedores). Especialmente `Modal`, `Stack`/`Inline`/`Columns`, `Table`, diálogos y menús.
26. **Reconstruir `AsyncSelect`/`AsyncMultiSelect`/`Autocomplete`/`MultiSelect` sobre `@base-ui/react/autocomplete`** (o `combobox`), como ya hacen `DocsSearch` y `CommandPalette`. Elimina ~400 líneas duplicadas y cumple la norma del motor único.
27. **Fusionar `ErrorPage`/`NotFoundPage`** (uno con `code`), y los `*Field` sobre un `FieldShell` común.
28. **Nomenclatura de tokens**: fijar posición de `hover` (infijo), `bg` siempre, `inline-size`/`block-size` para dimensiones nuevas, y renombrar los grupos `color-picker`/`color-swatch` (p. ej. `picker-*`, `swatch-*`) para no colisionar con `--color-*`.
29. **Política de releases**: agrupar breaking changes en ventanas (p. ej. un major al mes con guía de migración única). 18 majors en 30 días para 10 consumidores es el coste más alto que hoy paga el sistema.

---

## 6. Lo que está bien y conviene conservar

- Cumplimiento casi total de las 12 reglas de `CLAUDE.md` en el CSS de componentes: 0 `!important`, 0 ids, 0 `text-decoration: underline`, 0 `.dark` suelto, 0 `style=`, 0 shorthands `padding: a b` en componentes, 0 `@radix-ui`, 0 `asChild`, 0 `@ts-ignore`, 0 `Math.random()` para ids (44 ficheros con `useId`), listeners con cleanup en los 7 ficheros que los usan.
- Tokens JSON sanos: 0 referencias rotas, 0 duplicados, 0 `surface-dark-*` sin par claro, 0 colisiones de nombre CSS.
- Las tres listas de registro cuadran y `'use client'` coincide exactamente con `clientComponents` (salvo `Figure`).
- Las tablas de tokens de Foundations se generan desde los JSON: no pueden desincronizarse.
- 0 textos literales en atributos o JSX; el catálogo `BrandMessages` cubre 88 componentes.
- Paridad nativa sin deriva en 27 de 28 fichas.
- `release-check.mjs` con guardas reales (sync de `dist/`, caja de ficheros, `npm pack` sin nativo).
- No hay ni un `TODO`/`FIXME` pendiente en `src/`, `scripts/` ni nativo.

---

## 7. Método

Cuatro auditorías paralelas (tokens/CSS, API/a11y, build/tests/higiene, docs/i18n/nativo) con grep, scripts de recuento y el type checker de TypeScript sobre `src/index.ts`; comprobación manual de los hallazgos críticos (sourcemaps, `Figure`, `Skeleton`, dependencias, `radio.json`). `tsc -b` y `pnpm lint` ejecutados: ambos limpios. Sin verificar en ejecución: comportamiento de foco de `Toast`/`FloatingDock`, desajustes de hidratación, y el fallo real de `Figure` en un RSC (inferido de la cadena de hooks).

---

## 8. Decisiones pendientes del operador

Lo que sigue no se ha tocado porque cada punto pide una decisión técnica o de diseño. Están ordenadas por impacto.

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D1 | Futuro de `src/index.ts` (barril no publicado) | Publicarlo como `"."` · Borrarlo y quitar el paso 3 del checklist | Borrarlo: la política es una subruta por componente |
| D2 | `@tanstack/react-table` y `react-image-crop` empaquetados y declarados a la vez | Externalizarlos como peers opcionales · Sacarlos de `dependencies` y seguir empaquetando | Peers opcionales, como `react-hook-form` |
| D3 | Soporte de React 18 | Mantenerlo y añadir `forwardRef` a los 114 componentes sin `ref` · Subir el peer a `>=19` (ref como prop) | Subir a `>=19` en el próximo major |
| D4 | Castellano cableado en ThemeSwitcher, StatTile, CloseButton, CalendarPlanner, SidebarNav, EmailLayout | Moverlos al catálogo `BrandMessages` (major) · Dejar los defaults y corregir el texto de v49.0.0 | Al catálogo, en el mismo major que D5 |
| D5 | Claves nuevas obligatorias en `BrandMessages` rompen tipos (pasó en 49.27.0) | Claves nuevas opcionales con respaldo · Declarar que cada clave nueva es major | Opcionales con respaldo |
| D6 | Unificación de API: prop de color (`variant`/`tone`/`color`/`intent`), vocabulario de error (`danger`/`error`/`destructive`), cierre (`onClose`/`onDismiss`/`onCancel`/`onOpenChange`), `ariaLabel` frente a `aria-label`, `render`/`renderLink`/`linkComponent`, escala `size` | Un major agrupado con guía de migración · Dejarlo | Un único major agrupado |
| D7 | 150 tokens huérfanos y tokens obsoletos de `breadcrumb` | Retirarlos (major) · Mantenerlos | Retirarlos en el major de D6 |
| D8 | Colores literales fuera de paleta: 42 hex de `chart.json`, `kbd.surface-dark-bg`, sombras con prusia en `rgba` | Declarar `chart.json` paleta aprobada · Derivar de primitivos | Declarar `chart.json` paleta; referenciar el prusia en las sombras |
| D9 | Nomenclatura de tokens (posición de `hover`, `bg`/`background`, `width`/`inline-size`, grupos `color-picker`/`color-swatch`) | Fijar convención y renombrar (major) · Fijarla solo para lo nuevo | Fijarla para lo nuevo ya; renombrar en un major |
| D10 | Combobox hecho a mano en AsyncSelect, AsyncMultiSelect, Autocomplete y MultiSelect | Reescribir sobre `@base-ui/react/combobox` · Dejarlo | Reescribir; es el mayor foco de duplicación |
| D11 | `Modal` excluye `className` a propósito | Mantener · Aceptarlo como el resto de diálogos | Revisar el motivo original |
| D12 | `Table` usa `aria-selected` en `<tr>` fuera de grid | `aria-current` · Rol `grid` · Quitarlo | Depende de qué significa «seleccionada» en la tabla |
| D13 | `new Date()` en el render de Calendar y familia (hidratación SSR) | Prop `today` inyectable · Calcularlo en efecto | Prop `today` con default |
| D14 | `Toaster` muta un singleton global | Contexto por instancia · Documentar «un solo Toaster» | Documentarlo |
| D15 | CI y hooks | GitHub Actions con lint + tsc + test · Hook `pre-push` · Nada | Actions mínima |
| D16 | Addon a11y en modo `todo` | Pasar a `error` en `test:stories` · Mantener | `error`, tras limpiar las violaciones actuales |
| D17 | `CHANGELOG.md` (479 KB) se publica en npm | Sacarlo de `files` · Truncarlo · Mantenerlo | Sacarlo y enlazar al repo |
| D18 | `engines` y `LICENSE` | Versión mínima de Node · Tipo de licencia | `node >=20`; la licencia la decide Studio LXD |
| D19 | `notes/`, `public/clients/logos.af`, `public/videos/*` rastreados sin uso en el repo | Borrar · Mover fuera · Mantener | Confirmar si algo externo los usa |
| D20 | Duplicación de la woff2 del correo en `dist/assets/email/` | Mantener (activo versionado del host de correo) · Unificar | Mantener si el host la necesita aparte |
| D21 | Fusionar ErrorPage/NotFoundPage y crear un `FieldShell` común para los `*Field` | Hacerlo · Dejarlo | Hacerlo cuando se toque esa familia |
| D22 | Cadencia de releases: 18 majors en 30 días | Ventanas de major (p. ej. mensual) · Seguir igual | Ventanas |
| D23 | `CommandPalette` oculta el nodo vacío de Base UI con una receta sr-only solo en `:empty`; `VisuallyHidden` lo ocultaría siempre | Anotarlo como cuarta excepción en `CLAUDE.md` § VisuallyHidden · Dejarlo sin anotar | Anotarlo |
| D24 | `chart.dot-size` vale 12px (`{spacing.3}`) pero el componente dibuja 10px y la descripción dice 10 | Manda el token (cambia el dibujo) · Manda el dibujo (cambia el token) | Manda el dibujo: es lo que se ha visto siempre |
| D25 | `src/tokens/surface-light.css` queda vacío tras fundir su bloque con `surface-invert.css` | Retirar el fichero y su `@import` en el próximo major · Mantenerlo | Retirarlo en el próximo major |
| D26 | `Fieldset` tiene prop `weight`, mientras `Heading` dice que «un título no elige su peso» | Retirar `weight` (major) · Documentar la excepción | Retirarla en el major de D6 |
| D27 | El esquema de paridad nativa solo admite un nombre de tipo en `native.swift`; `Sheet` y `Toaster` se exponen en SwiftUI como modificadores | Ampliar el esquema con un campo de modificador · Seguir con el tipo interno (`ToastStack`) | Ampliar el esquema |
| D28 | `PasswordField` tiene `labelHidden = true` por defecto; `InputField`, `false` | Igualarlo (major) · Documentar el motivo | Documentarlo si es deliberado (campo de acceso) |
| D29 | Dónde cae `className` en los componentes con portal: va al disparador en `ContextMenu`, `Select`, `OrgSwitcher`, `UserMenu` y `AppLauncher`, pero al panel en `Menu` | Disparador · Panel · Las dos (`className` + `popupClassName`) | Las dos, en el major de D6 |
| D30 | `LanguageSwitcher` y `SiteNav` tienen un `renderLink` por defecto que reenvía solo una lista cerrada de atributos, y `CLAUDE.md` exige que se propaguen todos | Usar el `defaultRenderLink` compartido · Documentar la excepción | Usar el compartido; revisar que no se cuele ningún atributo no deseado |
| D31 | CHANGELOG: `NotificationPanel` y `Popover initialFocus` se movieron de 31.0.0 a 31.1.0, porque el tag `v31.0.0` no los contiene | Confirmar · Revertir y dejar el texto histórico intacto | Confirmar |

---

## 9. Estado tras los arreglos (2026-10-06)

Lo que no pedía decisión está hecho, integrado y verificado. Está en la rama `auditoria/arreglos`, fusionada en `main` en local **sin push ni tag**, con el CHANGELOG bajo `## [Sin publicar]`.

### Verificación

| Comprobación | Resultado |
|---|---|
| `pnpm release:check` (lint, tsc, test, paridad, `build:all`, sync de `dist/` y `native/`, `npm pack`) | Verde |
| `pnpm test` | 118 ficheros, 1303 tests en verde |
| `pnpm test:stories` (Chromium) | 196 ficheros, 1954 tests en verde |
| `swift build && swift test` | 141 pruebas en verde |
| `./gradlew build` (Android, con Paparazzi) | Verde |
| `dist/brand.css` / `dist/tokens.css` | De 1.765 KB / 1.714 KB a 618 KB / 599 KB |

### Resuelto del informe

- **2.1 Sourcemaps:** `--no-map` en `build:css` y `build:tokens-css`.
- **2.2 `Figure`:** está en `clientComponents`. Se revisaron todas las entradas de servidor, incluidos los chunks compartidos, y ninguna otra usa hooks.
- **2.3 `ref` en React 18:** `forwardRef` en `Skeleton` y en los cinco `Form*`, con test.
- **2.4 Barril, en parte:** `src/index.ts` está completo y ordenado por sección, y los cinco imports sin subruta están corregidos. `CLAUDE.md` describe ya la salida real del build. Su futuro sigue en D1.
- **2.5 Dependencias, en parte:** fuera la dependencia duplicada, `vite-plugin-dts` y los externals obsoletos. Siguen abiertos D2 y D18.
- **3.1 API, la parte aditiva:** `className` añadido en 30 componentes. `Modal` queda pendiente en D11.
- **3.2 i18n, la parte de documentación:** Internacionalización está al día (85 espacios, 298 textos) y ya no contradice al código. La migración sigue en D4.
- **3.3 Tokens:**
  - Variable rota de TypeScale corregida.
  - Par oscuro de `Radio` añadido.
  - Literales de opacidad y tamaño pasados a tokens de componente.
  - Bloques de `surface-invert` y `surface-light` fundidos (47 KB menos).
  - Test que vigila `Chart.GEOMETRY` frente a los tokens.
- **3.4 Duplicación, los helpers:** `assignRef`, `cssLengthToPx`/`sideOffsetFromToken` y `defaultRenderLink` viven ya en `src/stories/constants/`, en lugar de ~23 copias.
- **4.2 Ids fijos:** `useId()` por defecto en cuatro componentes. `MultiSelect` ya no suprime `exhaustive-deps`.
- **4.3 Propiedades físicas:** unas 200 declaraciones pasadas a lógicas. Los centrados con `left: 50%` + `translate`, los lados físicos de Base UI y los atributos de SVG se quedan físicos a propósito.
- **4.4 Documentación:**
  - `CLAUDE.md`, Colores y `storySort` corregidos.
  - MDX nuevos de `Fieldset`, `FormField` y `PasswordField`.
  - Comentario de `.storybook/main.ts` corregido.
- **4.5 Paridad nativa:** ficha de `CloseButton` registrada en Swift y Kotlin. Nombres Swift de `Sheet` y `Toaster` corregidos (ver D27).
- **4.6 Higiene:** fuera `sd.formats.mjs.bak` y la plantilla de Vite. Fuera de `files` los tests de tokens, y de `_types` las carpetas `pages` y `data`.
- **3.5 CHANGELOG:**
  - Un solo formato de encabezado.
  - Entradas para 31.1.0, 31.1.1 y 34.1.1.
  - Sección `[Sin publicar]`.

### Correcciones al propio informe

- **z-index locales literales (4.3):** no son una violación. `Foundations › Capas` § «Lo que no es una capa» establece que el apilado interno usa 1, 2 o 3 sin token.
- **`AuthPage` 300×65 (4.3):** son las medidas de Turnstile, documentadas en el propio fichero, y la página es de catálogo, no se publica.
- **`setTimeout` de `dropdownItems` (4.2):** es deliberado. Cancelarlo al desmontar descartaría la acción elegida, porque el ítem se desmonta al cerrarse el menú. Ahora lleva un comentario que lo explica.

### Errores nuevos destapados y ya resueltos

- La story de test de `Spinner` estaba en rojo desde la v49.28.0: esperaba un `pathLength` que se retiró a propósito. Esto hacía fallar `release:check -- --with-stories`.
- El JSDoc de `PasswordField.errorMessage` contradecía al código.
- El comentario de `BrandMessages.ts` daba cifras falsas (310 textos en 111 componentes).
- `storySort` no incluía la categoría `Email`.
- El ejemplo de «convención histórica» de Internacionalización usaba `Modal`, ya migrado.
- Las separaciones de `Popover`, `NotificationPanel` y `UserMenu` leían `0.5em` como 0,5 píxeles. Ahora convierten `em`, como `Tooltip`.

### Notas para quien publique

- Es un **minor**: hay props `className` nuevas y tokens nuevos, y ningún breaking de API.
- Los cambios visibles son intencionados:
  - el filete de TypeScale, que antes no se pintaba;
  - `Radio` deshabilitado en oscuro.
- Chromatic los marcará.
- Los ids por defecto de `ThemeSwitcher`, `LanguageSwitcher`, `DocsSearch` y `SiteHeader` dejan de ser fijos. Está anotado en el CHANGELOG.
- Falta lo que da una persona: `git push`, versión y tag, `pnpm chromatic`, `pnpm release:npm` y la aprobación del stage.

---

## 10. Decisiones tomadas (2026-10-06)

| # | Decisión del operador | Estado |
|---|---|---|
| D1 | Borrar `src/index.ts` | Hecho. El checklist de `CLAUDE.md` queda en dos sitios |
| D2 | Peers opcionales | Hecho. `@tanstack/react-table` y `react-image-crop` salen del bundle; `data-table.js` baja de 69 KB a 5 KB. **Breaking** |
| D3 | Subir el peer a React 19 | Hecho. `react` y `react-dom` >=19; `keycloakify-starter` se sube a React 19 a la vez. **Breaking** |
| D17 | Sacar el CHANGELOG de npm | Hecho. El README enlaza al del repo |
| D18 | `engines` y licencia | Hecho. `node >=20`; licencia MIT con exclusión expresa del nombre, el logotipo y los activos de marca de Studio LXD; las fuentes conservan su SIL OFL 1.1 |
| D20 | Mantener la copia versionada de la fuente del correo | Hecho. Documentado en `CLAUDE.md` § El correo |
| D15 | CI mínima | Hecho. `.github/workflows/ci.yml`: lint, tsc, test y paridad nativa. Empezará a correr con el primer push |
| D19 | Borrar `notes/`, `public/videos/` y `public/clients/logos.af` | Hecho |
| D22 | Cadencia de releases | Se mantiene mientras dure el desarrollo |
| D27 | Ampliar el esquema de paridad | Hecho. Campo `native.swiftModifier` en `Sheet`, `ConfirmDialog` y `Toaster` |
| D31 | Entradas movidas de 31.0.0 a 31.1.0 | Confirmado |

**Hallazgo al aplicar D2:** cuatro apps de slxd usan `DataTable` sin declarar `@tanstack/react-table`: people, training, finance y translator. Al subir a la próxima versión tienen que añadirla. Ya la tienen account, creator, lmsmarketplace, lrs, projects y tender.

**Efecto en el paquete:** de 2,13 MB a 1,5 MB comprimido y de 7,9 MB a 5,1 MB descomprimido, contando también los arreglos de la sección 9.

**Siguen abiertas:** de D4 a D14, D16, D21, D23 a D26, D28 a D30. La sección `[Sin publicar]` del CHANGELOG ya es un **major** por D2 y D3.

---

## 11. Segunda tanda de decisiones (2026-10-07)

| # | Decisión del operador | Estado |
|---|---|---|
| D3 | React 19 | Hecho (peer `>=19`); `keycloakify-starter` se sube a la vez |
| D4 | Castellano cableado al catálogo | Hecho: `CloseButton`, `ThemeSwitcher`, `StatTile`, `CalendarPlanner`, `SidebarNav` al catálogo; `EmailLayout` con props obligatorias, como `EmailButton`, porque el correo no lee el proveedor. **Breaking:** 15 claves nuevas obligatorias |
| D7 | Retirar huérfanos | Hecho: 129 tokens (no 150: la auditoría no vio usos nativos y se dejó otros huérfanos). Ningún consumidor los usaba |
| D10 | Combobox sobre Base UI | Hecho: `AsyncSelect` y `AsyncMultiSelect` sobre `Combobox`, `Autocomplete` sobre `Autocomplete`, `MultiSelect` sobre `Select multiple`. 1.510 a 1.236 líneas |
| D11 | `Modal` acepta `className` | Hecho. La exclusión era de criterio, no técnica |
| D13 | Prop `today` | Hecho en Calendar, CalendarPlanner y CalendarRoster, y la reenvían los pickers |
| D14 | Un solo `Toaster` | Documentado (dos `Toaster` pintan cada aviso dos veces) |
| D16 | a11y en modo `error` | Hecho: `test:stories` falla con cualquier violación de axe. 117 stories fallaban; arreglados los fallos técnicos en 9 componentes y en las stories; los contrastes, sin tocar (D41) |
| D25 | Retirar `surface-light.css` | Hecho |
| D28 | `PasswordField` muestra la etiqueta | Hecho en React, SwiftUI y Compose, con capturas regrabadas |
| D30 | `defaultRenderLink` compartido | Hecho; el HTML no cambia |

Verificado sobre `main` integrado: `release:check` en verde, 1354 tests, 1962 stories, Swift y Gradle en verde.

### Decisiones nuevas que han salido

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D32 | 14 rampas de `chart` (`sequential-*`, `diverging-*`) sin uso en CSS, pero presentadas en `DataViz.mdx` como la rampa del sistema y con par oscuro | Conservarlas como API · Retirarlas y apuntar la doc a `color.chart.*` | Conservarlas: es la única rampa que cambia con el tema |
| D33 | `site-nav.columns-max` y `chat-shell.breakpoint`, tokens que solo documentan una cifra escrita a mano | Conservarlos · Retirarlos y dejar la cifra comentada | Conservarlos y leerlos desde el código si se puede |
| D34 | Base UI oculta sus inputs auxiliares (Select, Combobox, Checkbox, Radio, Switch…) con un atributo `style` en el HTML del servidor; comprobado en SSR. La CSP de slxd (`packages/kit/src/security/csp.ts`) ya lo permite con `style-src-attr 'unsafe-inline'` desde el 2026-09-12, así que en slxd no rompe. La regla 11 de `CLAUDE.md` dice lo contrario | Corregir la regla 11 y confirmar la CSP de learn-app, rubik, keycloakify-starter y homenize · Ocultar esos inputs también desde la hoja del DS, como red | Corregir la regla 11. learn-app, rubik, keycloakify-starter y homenize no declaran `style-src` en su código, así que hoy no les afecta; si algún día añaden una CSP, necesitan el mismo `style-src-attr` |
| D35 | `MultiSelect` sobre `Select` (sin campo de búsqueda) | Darlo por bueno · Añadirle búsqueda (cambia la interfaz) | Darlo por bueno |
| D36 | Escape con la lista cerrada: hoy no vacía la selección (conducta antigua); Base UI la vaciaría | Mantener · Adoptar la de Base UI | Mantener |
| D37 | Un formulario de un solo campo combobox ya no se envía con Intro (input oculto de Base UI) | Aceptarlo · Compensarlo en el componente | Aceptarlo: los formularios del DS llevan botón de envío |
| D38 | ThemeSwitcher nativo compone «grupo: tema» con separador fijo, al contrario que React | Igualarlo en Swift y Kotlin · Dejarlo | Igualarlo cuando se toque ThemeSwitcher nativo |
| D39 | El rótulo del menú de grupo vacío de `SidebarNav` pasó de « · » a « — » para usar una sola clave | Aceptarlo · Dos claves distintas | Aceptarlo |
| D40 | Usos internos de `PasswordField` siguen pasando `labelHidden={false}`, ya redundante | Limpiarlos · Dejarlos | Limpiarlos (sin efecto visible) |

### Decisiones que deja D16

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D41 | Contrastes que no llegan a WCAG (regla desactivada por story, con comentario) | Elegir color por caso · Dejarlos | Por caso, de mayor a menor alcance: ver abajo |
| D42 | Centinelas de foco de Base UI: falso positivo sistemático de `aria-hidden-focus` en 15 stories | Excluir `[data-base-ui-focus-guard]` de forma global en la configuración de axe · Seguir desactivando story a story | Excluirlos de forma global: es código de Base UI y el fallo depende de cuándo corre axe |
| D43 | La auditoría solo corre en claro; en oscuro fallan 41 stories | Añadir un segundo proyecto de Vitest en oscuro (el doble de tiempo) · Solo pasadas puntuales | Añadirlo cuando se resuelva D41 |

**D41 en detalle**, de mayor a menor alcance:

1. **Enlace amarillo sin subrayado en oscuro** (`#ffcd00` frente al texto blanco, 1,5:1, pide 3:1 o subrayado). Afecta a Prose, Form, Consent, Acceso, Registro, EnlaceMagico y Link en texto. Lo más simple: que el enlace dentro de un párrafo lleve la línea también en reposo.
2. **Atenuar con opacidad** como marca de estado: hilo resuelto de AnnotationThread, origen y destino prohibido del arrastre en Sortable y TreeView, celda en vuelo de PlanningGrid. Baja el texto a 2–2,5:1. Necesita otra marca que no sea la opacidad del texto.
3. **`Link tone="accent-1"` sobre claro**: lavanda sobre blanco, 2,02:1. Restringir el tono a superficie oscura.
4. **Tinta menor de AnnotationThread**: `#808080` sobre blanco, 3,94:1 a 14px. Otra tinta de la paleta que llegue a 4,5:1.
5. **Error del pie de PlanningGrid en oscuro**: `#ff8585` sobre `#4a4a4a`, 3,77:1.

**Resuelto aparte:** el título de `Card` en los rellenos `accent-*` y `support-*` salía blanco sobre lavanda en oscuro. Era un fallo de la regla de derivación (un relleno autocontenido se ve igual en las dos superficies), no una decisión. Arreglado sin cambio en claro.

**Cambios de API de D16 para revisar:** props nuevas `AccordionTrigger.headingLevel` y `LegalFooter.as`; `appLauncher.title` también se lee con `presentation="popover"`; Table y CalendarRoster ganan una parada de tabulador solo cuando desbordan.

---

## 12. Tercera tanda (2026-10-07)

Hecho: StarRating sin `aria-label` vacío; Tooltip con disparador deshabilitado con rol y nombre; ConfirmDialog reinicia al abrir y no en un efecto de cierre; `switcher.lg-track-width` a primitivo; comparaciones nativas de `Menu` en iOS y Android, y la captura de `ContextMenu` abierto en Android deja de ser inestable.

### Decisiones nuevas

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D44 | De 117 literales dimensionales en tokens de componente, solo uno tenía primitivo del mismo valor, unidad y rol. El más claro de los restantes: el trazo de 2px de `Spinner`, sin rol en `border-width` (el de 2px es solo el anillo de foco) | Crear un rol `border-width.stroke` · Declararlo excepción | Crear el rol: es el único grosor de trazo del sistema que no lo tiene |
| D45 | El resto de literales (em de controles, medidas de maqueta, topes en px, vh/vw, porcentajes) | Dejarlos como tokens de componente con valor propio · Crear primitivos | Dejarlos: son medidas propias de cada componente, no escalas |
| D46 | Tooltip sobre control deshabilitado: hoy el envoltorio es un grupo deshabilitado con el nombre del control | Mantener · Envoltorio como botón · Sin envoltorio, con controles enfocables estando deshabilitados (cambia la API) | Mantener por ahora; la tercera es la mejor según la APG, para el major de D6 |
| D47 | El rótulo de sección del menú en Android está sangrado 8 dp de más respecto a React | Corregir Android y regrabar capturas · Declararlo en `differences` | Corregir Android: es una deriva, no una decisión de plataforma |
| D48 | `CloseButton` y `Toaster` no tienen pareja de comparación con Storybook | Añadirlas · Dejarlo | Añadirlas, es trabajo mecánico |

### Resueltas (2026-10-07)

- **D44**: ni rol nuevo ni excepción. El trazo de `Spinner` baja a 1px y `spinner.border-width-*` apuntan a `{border-width.default}`, como todo borde y el trazo de los iconos. Rama `auditoria/ola5`, `release:check` en verde.
- **D45**: se quedan como tokens de componente con valor propio. Son medidas en `em` que siguen la letra, proporciones, medidas de ventana, topes de maqueta y unidades de carácter, y ninguna tiene un segundo usuario. Si dos componentes llegan a compartir una, entonces se crea el primitivo.
- **D46**: se mantiene el envoltorio actual. La opción de controles enfocables estando deshabilitados va al major de D6.
- **D47**: Android corregido. El rótulo queda a 16 dp, como en React; antes estaba a 24. iOS usa el `Menu` del sistema y no tenía la deriva.
- **D48**: hechas las parejas de `CloseButton` (tres tallas) y `Toaster` (pila desplegada y recogida) en iOS y Android.

### Decisiones nuevas

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D49 | En React el texto del rótulo de sección del menú queda a 16 px del borde y el de los ítems a 24 px (8 de margen y 16 de relleno): el rótulo sale 8 px más a la izquierda que los ítems. Android ya copia a React | Alinear rótulo e ítems (en tokens, y Android con ellos) · Mantener el desfase como jerarquía | Alinearlos: no hay nada que diga que el desfase sea intencionado, y un rótulo alineado con lo que titula se lee mejor |
| D50 | Los avisos de `Toast`/`Toaster` son algo más altos en React y llevan el título más grueso que en SwiftUI y Compose. Ya se veía en las parejas de `Toast`, y no figura en `differences` | Igualar el nativo a React · Declararlo en `differences` | Igualar el nativo: es deriva, igual que D47 |

### Resueltas (2026-10-07, segunda vuelta)

- **D49**: el texto del rótulo de sección del menú queda alineado con el de los ítems, a 24 px del borde, en React y en Android. Lo garantizan los tokens: `menu.label-margin-inline` y `menu.label-padding-inline` apuntan a los del ítem. Lo vigila un test de story.
- **D50**: en SwiftUI y Compose el aviso de `Toast`/`Toaster` mide ahora como en React, con un margen de ±0,5. El borde ocupa espacio, el título y la descripción usan la caja de línea de CSS, el título lleva el tracking de `h2` y la acción se separa igual que en web. El título no pesa más en la web: los tres dibujan el peso 500, y lo que engorda es el suavizado de Chromium en macOS. Queda declarado en `differences`.

### Decisiones nuevas

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D51 | Suavizado de texto en la web. Chromium en macOS dibuja la letra más gruesa que iOS y Android (mismo peso, distinto suavizado) | Añadir `-webkit-font-smoothing: antialiased` en `base.css` · Dejarlo declarado | Dejarlo declarado. Cambia el aspecto de todo el texto web solo en macOS, y el suavizado por subpíxel es lo que el sistema elige para esa pantalla |
| D52 | Llevar a todos los componentes nativos la medida de interlineado de CSS (`halfLeading` en SwiftUI, `brandCssLineHeight` en Compose). Hoy solo lo usa Toast, y el resto con texto de varias líneas o interlineado ajustado probablemente se desvía en altura | Generalizarla, regrabando capturas · Aplicarla al portar o tocar cada componente | Aplicarla componente a componente, cuando se toque cada uno: generalizar de golpe regraba casi todas las capturas sin que nadie lo pida |
| D53 | El título de `Toast`/`Alert` hereda el tracking del `<h2>` de `base.css` y no de un token `alert.*` | Token propio `alert.title-letter-spacing` → `{text.h2-letter-spacing}` · Dejar la herencia | Token propio: el título se ve igual, la herencia queda explícita y el nativo la consume por nombre |
| D54 | `MenuSnapshotTest.openPopup` en Android falla a veces cuando se ejecuta con toda la suite: el primer ítem sale resaltado porque otro test le deja el foco. Solo no falla, y también ocurre en `main` | Aislarlo (reiniciar el foco en el test) · Dejarlo | Aislarlo. Es trabajo de pruebas, sin decisión de diseño; lo arreglo si me dices |

### Resueltas (2026-10-07, tercera vuelta)

- **D51**: queda declarada. La web no suaviza el texto aparte; la diferencia de grosor en macOS figura en `differences`.
- **D52**: paridad ya, aplicada en las dos plataformas. Todo texto nativo mide la caja de línea de CSS. Ejemplos: el h1 pasa de 50 a 44 pt en iOS y de 58,7 a 44 dp en Android (React 44); `PageIntro` pasa de 178 a 160 dp en Android; `Tag` de 26 a 22 pt en iOS. Los controles de alto fijo no cambian. Capturas y parejas regrabadas.
- **D53**: token propio por componente, sin cambio visual. `alert.title-letter-spacing` apunta a `{text.letter-spacing}` (el título de Alert es un `<p>`) y `toast.title-letter-spacing` a `{text.h2.letter-spacing}` (el de Toast es un `<h2>`).
- **D54**: arreglado en la prueba. layoutlib abre la ventana del `Popup` fuera del modo táctil, y el primer ítem recibía el foco visible. La prueba ahora abre el menú en modo táctil. Pasa 5 de 5 con `--rerun-tasks`.

### Decisiones nuevas

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D55 | Alert y Toast leen su título con tracking distinto (0 frente a −0,02 em) porque uno es `<p>` y el otro `<h2>`, no por diseño | Igualarlos · Mantenerlo | Igualarlos al de `h2`: los dos son títulos de un aviso con el mismo dibujo |
| D56 | En SwiftUI, un texto de varias líneas con `line-height` por debajo del alto natural (títulos a 1,1) sigue midiendo de más a partir de la segunda línea (+6 pt por línea en un h1). Solo se arregla con `.lineHeight(.exact)`, de iOS 26 y con un desplazamiento sin documentar | Aceptarlo y declararlo · Usar la API de iOS 26 con compensación | Aceptarlo: el mínimo es iOS 17, y la compensación dependería de la versión |
| D57 | Botón `text`: en web mide 21 px y en nativo 20, por el `padding-top: 1px` que el navegador pone a `<button>` | `padding-block-start: 0` en React · Declararlo | Arreglarlo en React: es un valor del navegador, no del sistema |
| D58 | `Tabs`: React hereda `line-height: 1.15` de `normalize.css` en el `<button>`, sin token | Token `tabs.trigger-line-height` · Dejarlo copiado | Crear el token. Revisar a la vez qué otros `<button>` con texto heredan ese 1,15 |
| D59 | El borde de `Banner` en nativo va superpuesto, y en web ocupa sitio (`border-box`): 48 frente a 50 | Corregir el nativo como en Toast · Declararlo | Corregirlo, es deriva como D50 |
| D60 | La API pública de texto para apps (`brandTextStyle` en SwiftUI y Compose, `BrandTypography.*`) sigue con el interlineado antiguo. Homenize la usa | Pasarla a la caja de CSS (Homenize verá cambiar alturas) · Exponer `BrandBasicText`/`brandCssLineBox` y dejarla igual · Documentarlo | Exponer las piezas nuevas y marcar la antigua como obsoleta, para que Homenize migre cuando quiera |
| D61 | `AsyncSelect.test.tsx`, el test de rebote de teclas, falla a veces por tiempos (3 llamadas en vez de 2) | Pasarlo a temporizadores falsos · Dejarlo | Pasarlo a temporizadores falsos |

### Resueltas (2026-10-07, cuarta vuelta: solo anotar)

- **D56**: aceptado. En SwiftUI un título de varias líneas con `line-height` por debajo del alto natural mide de más a partir de la segunda línea. Queda declarado en la ficha de `Heading`/`ConfirmDialog`/`Sheet`.
- **D35**: `MultiSelect` se queda sin búsqueda. Para listas largas está `AsyncMultiSelect`.
- **D36**: Escape con la lista cerrada no vacía la selección.
- **D37**: un formulario con un solo combobox no se envía con Intro. Los formularios del sistema llevan botón de envío.
- **D39**: el rótulo de grupo vacío de `SidebarNav` se queda con « — ».
- **D33**: `site-nav.columns-max` y `chat-shell.breakpoint` se conservan como documentación. Una media query no puede leer una variable.

En curso: D55, D57, D58, D24, D40, D61 y D23 (React y tokens). D59, D60 y D38 (nativo) salen cuando se cierre D52.

### Resueltas (2026-10-07, decisiones de diseño)

- **D8.1**: `tokens/color/chart.json` pasa a ser paleta aprobada y queda como excepción declarada a la regla 9.
- **D8.2**: `kbd.surface-dark-bg` deja el `rgba` y apunta a `{color.surface.secondary-on-dark}`.
- **D8.3**: las sombras `sm…xl` se conservan para el futuro, con el color tomado de `{color.prussian}` y el mismo alfa en lugar del `rgba` escrito a mano.
- **D32**: corrección de la premisa. La rampa secuencial sí se usa: `Heatmap` pinta 6 de sus 7 pasos y `CodeBlock` 1. Sin componente solo estaba la divergente, así que se crea `Heatmap scale="diverging"` con `midpoint`. `DataViz.mdx` pasará a decir qué componente usa cada rampa.
- **D12**: se quita `aria-selected` del `<tr>`, que es inválido fuera de `grid`. `selected` queda como marca visual y la selección la anuncia la casilla de la fila. `aria-current` (maestro-detalle) solo se añadirá si una app lo pide.
- **D21a**: `ErrorPage` y `NotFoundPage` no se fusionan, porque ya comparten `PublicPageShell` y difieren en la maqueta.
- **D21b**: se crea un `FieldShell` interno para los 21 `*Field`, que conservan sus clases BEM y su API. Unifica `required` y `aria-describedby` (`RecurrenceField` no lo enlazaba) y añade un test común.
- **D29**: no había incoherencia, solo una regla sin escribir. `className` va al disparador cuando lo pinta el componente y al panel cuando el disparador lo trae el consumidor. Se escribirá en CLAUDE.md y en el JSDoc. No se añade `popupClassName`, porque el panel se personaliza con tokens.
- **D41**: aprobados los cinco puntos.
  1. El enlace dentro de texto corrido va subrayado en reposo y sin subrayar en hover, en las dos superficies, como el correo. El problema no era el amarillo sobre prusia (11,17:1), sino distinguir el enlace del texto blanco que lo rodea (1,5:1). Los enlaces sueltos no cambian.
  2. El hilo resuelto lleva tinta normal y la etiqueta «Resuelto». La celda en vuelo lleva un `Spinner`. El arrastre queda como excepción declarada (componente inactivo).
  3. `Link tone="accent-1"` solo se aplica en oscuro.
  4. La tinta menor de `AnnotationThread` pasa a `muted-on-light`.
  5. El pie de `PlanningGrid` en oscuro toma el fondo del lienzo.
- **D42**: se excluye de axe de forma global solo `[data-base-ui-focus-guard]`, y se quitan las 19 desactivaciones de `aria-hidden-focus`. Es la única exclusión global y se anota en CLAUDE.md.
- **D43**: se añade un proyecto de Vitest en oscuro (solo en `release:check --with-stories`), después de D41. Lo técnico se arregla; lo que sea color se consulta caso a caso.
- **D5**: todas las claves de `BrandMessages` pasan a ser opcionales, antiguas y nuevas, y el paquete lleva el catálogo castellano como respaldo. Sale un aviso en consola en desarrollo y se exporta `CompleteBrandMessages` para las apps que quieran el modo estricto (`satisfies`). No es breaking. Corrección: hoy no hay defaults castellanos; un texto que falta lanza en ejecución.
- **D6.1**: `variant` = forma o maqueta; `tone` = color (de marca o de estado). Pasan a `tone` `Alert`, `Banner`, `Tag`, `NumberBadge`, `ProgressBar`, `CalendarPlanner` y el `color` de `Card`. En la v51 `variant` queda como alias obsoleto, con aviso en desarrollo, y se retira en la v52. Elegido frente a `color` (MUI/Mantine/Radix) por el choque con `HTMLAttributes.color` y porque el valor es un papel, no un color (como en Polaris y Braid).
- **D6.2**: `error` para estados y resultados, `destructive` para acciones. `danger` pasa a `error` en `Tag`, `NumberBadge` y `StepMarker`, con alias obsoleto en la v51 que se retira en la v52. `Text tone="destructive"` pasa a `error`, salvo que en las apps se use para avisar de una acción. Las acciones (`Button`, ítems de menú, `ConfirmDialog`) no cambian.
- **D6.3**: `Modal` e `ImageCropDialog` pasan de `onClose` a `onOpenChange(open)`, como las otras 14 superposiciones y Base UI. Alias obsoleto en la v51. Se quedan `onDismiss` (`Alert`, `Banner`: el mensaje se va), `onCancel`/`onConfirm` (`ConfirmDialog`: el resultado) y `onClear`.
- **D6.4**: `'aria-label'` en todos los componentes. `ariaLabel` queda como alias obsoleto en la v51 en `Input`, `NumberInput`, `Pagination`, `Breadcrumb`, `FilterBar`, `TableOfContents`, `Sparkline` y `FileUpload`. `FileUpload` se queda con una sola prop (la zona; el input nativo toma su nombre). Se mantienen los nombres de partes (`containerAriaLabel`) y `label` como nombre accesible de componentes sin texto visible.
- **D6.5**: `linkComponent` pasa a `renderLink` en `Pagination`, `PrevNextNav` y `CalendarRoster`, con alias obsoleto en la v51. `render` (raíz) y `renderLink` (enlaces internos) se quedan, y la regla se escribe en CLAUDE.md. `as` de `List` y `DescriptionList` se cierra a uniones de etiquetas, tras comprobar las apps.
- **D6.6**: una sola escala de tallas (`xs`…`4xl`), y cada componente usa su tramo. `Paragraph` pasa de `small`/`default`/`large` a `sm`/`md`/`lg` y `Logo` de `xxl` a `2xl`, con alias obsoleto en la v51. Los títulos siguen con números de la escala de texto. La regla se escribe en CLAUDE.md.
- **D9**: convención `<componente>-<parte>-<estado>-<propiedad>-<talla>` escrita en CLAUDE.md y Foundations: el estado antes de la propiedad, `bg` (no `background`), `max-width` (no `width-max`), `width`/`height` para medidas (las 32 `inline-size`/`block-size` se renombran; la regla 5 sigue para padding/margin/gap) y `color` (no `ink-color`). Los grupos `color-picker`/`color-swatch` se quedan y se reserva que `color.*` no usará `picker` ni `swatch`. Unos 45 renombrados, con alias CSS/SCSS en la v51 que se retiran en la v52, y un test de la convención.
- **Heatmap (dudas de D32)**: se acepta #E26330 para el paso 2 cálido en claro. El centro y la celda vacía comparten relleno (los distingue la trama). El rótulo del centro va detrás de la escala. Sin filete: la leyenda pasa a ser una barra continua, sin huecos entre pasos y con los extremos rotulados.
- **D62**: los interlineados heredados de `normalize.css` pasan a token y apuntan al del control (1): día y año de `Calendar`, «+N» de `CalendarPlanner`, `DropdownField`, `Pagination`, `InputPhone` y `CommandPalette`. `ConversationList` también va a 1, para que no crezca. `Collapsible` declara `{text.line-height}`.
- **D26**: se retira `Fieldset weight` **del tipo en la v51, sin alias**. Corrección: sí tenía efecto (nueve reglas de peso en `Fieldset.css`); el dato «no hacía nada» era un error de lectura. Un alias sin efecto cambiaría la leyenda en silencio, así que se quita del tipo y TypeScript señala cada uso. La leyenda ya pesa lo que su `level` (`text.h<N>`), como `Heading`. Nadie en la suite la usa.
- **D46**: los botones (`Button`, `CloseButton`, `DotsButton`, `CopyButton`, `Toggle`) ganan `focusableWhenDisabled`, que pasa `disabled` a `aria-disabled` y los deja en el orden de tabulación, como en Base UI. `Tooltip` lo activa en su disparador y desaparece el envoltorio; `disabledTrigger` queda obsoleta en la v51.
- **D63**: el resto negativo del pie de `PlanningGrid` pasa a relleno de error (`error-fill`/`error-fill-text`, 7,20:1) en las dos superficies.
- **D65**: `NotificationPanel`, `ConfirmDialog` y `ColorPicker` se alinean con la regla de `className` en la v51.
- **D66**: se acepta que el estado «reconocido» deje de atenuarse y que se retiren `annotation-thread.acknowledged-opacity`, `annotation-thread.resolved-opacity` y `planning-grid.pending-opacity`. Entra en la v51.
- **D67**: `required` en `DatePicker`, y por tanto en `DatePickerField`/`DateTimeField`, también en nativo.
- **D68**: en `ColorPickerField` y `DropdownField` lo obligatorio va en el grupo que envuelve el campo (`role="group"` + `aria-required`) y se valida con el input oculto.
- **D69**: `Fieldset` gana la leyenda oculta (`visually-hidden` sobre el `<legend>`, quinta excepción de VisuallyHidden) y `RecurrenceField` gana `labelHidden`.
- **D70**: se marca lo opcional («(opcional)» tras la etiqueta, desde el catálogo), no lo obligatorio. Va en `FieldShell`.
- **Publicación**: una sola v51 con todo. Antes se integra en main la rama `barra-y-marco` (hecho: `FloatingToolbar toolbarProps`, `EmbedFrame device`). Después se avisa a la sesión de slxd con el pin nuevo y lo que deben actualizar las apps.
- **D64**: se reescribe la regla 7 y el subrayado pasa a `text-decoration`: grosor (`text-decoration-thickness`) y distancia (`text-underline-position: under` + `text-underline-offset`) salen de tokens, con `skip-ink`. Se mantiene el hueco que reservaba la línea para que la maqueta no se mueva. El único cambio visible es que los iconos quedan sin línea. Se gana alto contraste de Windows, impresión y reconocimiento de axe, que hace innecesarias las dos desactivaciones de `link-in-text-block`. Se prohíben `box-shadow` y `background-image` para subrayar. Va en la v51.
- **D71**: (b) `<BrandMessagesProvider fallback="es">` declara que el castellano es intencionado y silencia los avisos de respaldo. Sin exportar el catálogo.
- **D72**: el respaldo del logotipo dice «Ir al inicio», sin marca.
- **D73**: el «obligatorio» de `ColorPickerField`, `DropdownField` y `TimeSelect` pasa a la descripción del disparador (texto oculto del catálogo por `aria-describedby`); fuera `aria-required` del grupo.
- **D74**: `Form markOptional` marca todos los campos no obligatorios del formulario; `optional` por campo sigue valiendo.
