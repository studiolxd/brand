# Changelog

Este fichero arranca en `v13.5.0`. El histórico anterior vive en los mensajes de commit
de cada tag (`git log --tags`).

El paquete sigue [semver](https://semver.org/lang/es/): **patch** para bug fixes y
regeneración de `dist`, **minor** para componentes/props/variantes/tokens nuevos, **major**
para breaking changes.

## v25.4.0

### Cambiado

- `Modal`: el aspa de cierre pasa a `<Button variant="ghost" size="sm" iconOnly>`
  compuesto con `Dialog.Close` vía `render` (precedente de `Alert`/`Toast`);
  se retiran `close-color`/`close-hover-color`/`close-hover-bg` y el foco
  prestado de Button. `calc(-50% - 8px)` de los keyframes de
  entrada/salida pasa a token (`content-enter-offset`, `spacing.2`). El
  panel gana borde 1px en superficie oscura (`surface-dark-border-color`,
  blanco) que lo separa del velo, también oscuro; transparente en
  superficie clara, donde el velo ya basta. `width-max`/`max-height`
  quedan documentados como medidas de layout. Story oscura reescrita con
  `parameters: { surface: 'dark' }` en vez de alternar `html.dark` a mano.
  Doc MDX nueva.
- `Sheet`: el aspa deja de tomar prestados `--modal-close-*` y pasa al mismo
  patrón `Button ghost` de Modal — con ello se resuelve un bug de a11y real,
  `.sheet__close` no tenía `:focus-visible`. `description-font-size`/
  `description-color` dejan de tomar prestado `input-field.helper.*` y pasan
  a referenciar los de `Modal`; verificado en el CSS generado que Sheet
  hereda el modo oscuro de Modal por cascada real de custom properties, sin
  declarar tokens `surface-dark-*` propios. Story oscura y story
  `Test — abre, cierra con el aspa y devuelve el foco` nuevas (antes sin
  ningún `play`). Doc MDX nueva.
- `ImageCropDialog`: `area-bg`/`surface-dark-area-bg` dejan de nombrar
  `color.grey-lightest` y una rgba cableada; pasan al rol
  `surface.secondary-on-light|dark` (mismo que `Kbd`/`CodeBlock`/
  `ProgressBar`). Story oscura nueva; el marco de `react-image-crop` se
  verificó sobre superficie oscura (dibuja sobre la imagen, no sobre
  `area-bg`, así que su contraste no depende del tema — documentado en el
  MDX). Doc MDX nueva.
- Los tres salen de `Por revisar/`: `Molecules/Modal`, `Molecules/Sheet`,
  `Molecules/ImageCropDialog`.

## v25.3.0

### Cambiado

- `Table`: la cabecera ordenable pasa a ser un `<button>` dentro del `<th>`
  (patrón WAI-ARIA). El `th` conserva `aria-sort`, el nombre accesible del
  botón es solo el rótulo de la columna —el estado deja de mezclarse con el
  nombre— y Enter y **Espacio** activan de forma nativa, lo que el
  `tabIndex` + `onKeyDown` manual anterior no garantizaba. La API pública no
  cambia (`sortable`/`sorted`/`onSort`); lo que cambia es el DOM interno:
  `.table__header-content` es ahora el botón. `Table.Row` acepta `selected`
  (nueva prop) y emite `.table__row--selected`. Los estados salen del gris:
  el hover de fila interactiva invierte —relleno de marca y tinta clara—
  como en `Menu` y `SidebarNav`; la fila seleccionada se dice con tinta y
  peso; `footer-bg` pasa al rol `surface.secondary-on-light`; el hover de una
  columna ordenable no pinta fondo, lleva el icono de ordenación al color
  activo; y `sort-icon-color` deja `grey-dark` por `text.muted-on-light`.
  Tokens huérfanos `border-color` y `header-hover-bg` retirados con sus pares
  oscuros, y los `rgba()` cableados del par oscuro sustituidos por roles.
  `gap: 0.375rem` pasa al token propio `header-content-gap` ({spacing.2}),
  fuera los `@import` de CSS ajeno y documentado el `width: 1px` de la
  columna de acciones. Doc MDX nueva, story de superficie oscura, story de
  columna de acciones y test de contrato de la cabecera ordenable.
- `DataTable`: fuera el `data-state="selected"` —prohibido por la regla de
  Base UI y, además, atributo muerto que ningún CSS leía—; la selección viaja
  ahora por la prop `selected` de `Table.Row`. Doc MDX nueva y stories de
  superficie oscura, con y sin `isLoading`.
- Storybook: una story marcada `parameters: { surface: 'dark' }` acota su
  lienzo a un contenedor `.surface-dark` cuando se renderiza dentro de la
  página de **docs**. Antes teñía el `<html>` entero y dejaba ilegibles todas
  las demás stories de esa página. En el canvas de la story sigue usando el
  `<html>`, que es donde hace falta alcanzar a los portales.
## v25.2.0

### Cambiado

- `Card`: los cuatro fondos `accent-1`/`accent-2`/`support-1`/`support-2`
  —antes primitivo `var(--color-*)` directo en CSS— pasan a tokens de
  componente propios. La variante `primary` deja de usar `color.primary`
  como fondo (coincidía con `color.background.dark`: invisible sobre
  `.surface-dark`) y pasa al patrón autocontenido de `button.primary` —
  fondo `color.accent-1` (lavanda), texto `color.primary` (prussian), igual
  en los dos temas. Token huérfano `card.shadow` (ya en `none`) retirado
  junto con su `box-shadow` en CSS. Doc MDX ampliada (modo link/contenedor,
  accesibilidad) y story de superficie oscura nueva.
- `AppLauncher`: se borran 50 líneas de CSS bajo
  `.surface-dark`/`[data-theme]`/`html.dark` que nunca surtían efecto (el
  popup va en `Portal`; los tokens oscuros ya funcionan por el mecanismo
  estándar de activación root-level). `trigger-size`/`tile-icon-size`
  —2.5rem crudos— pasan a `size-component.md` (mismo valor).
  `trigger-hover-bg`/`tile-hover-bg`/`tile-active-bg` dejan `grey-lightest`
  y usan el relleno de marca del patrón Menu/Button ghost, con inversión en
  superficie oscura. Doc MDX, story de superficie oscura y test de contrato
  nuevos.
- `Pagination`: el subrayado del botón en hover —antes `link.underline-width`
  prestado de `Link`— pasa a `pagination.btn-hover-underline-width`, token
  propio. Story de superficie oscura nueva.
- `Skeleton`: `skeleton.duration` pasa de número crudo consumido con
  `calc(var(*)*1ms)` a `"1400ms"` directo (como `spinner.animation-duration`).
  Se apaga en `prefers-reduced-motion` (no lo cubría el
  `--motion-duration-*` global). `skeleton--circle` usa `border-radius.round`
  en vez de `50%` a mano; `bg` pasa al rol `surface.secondary-on-light` y
  `surface-dark-bg`/`-highlight` dejan los `rgba` cableados por
  `surface.secondary-on-dark` y `grey-dark`. Doc MDX nueva, story de
  superficie oscura y test de contrato.

## v25.1.0

Revisión de la familia de chat entera: los seis componentes salen de
`Por revisar/` y la plantilla `Chat` se convierte en un componente de verdad.

### Roto

- **`MessageBubble` pierde los cuatro tokens de relleno** (`user-bg`,
  `user-color`, `assistant-bg`, `assistant-color`). Ningún globo lleva relleno:
  quien personalizara el fondo del globo del usuario ahora repunta
  `message-bubble.border-color` y `message-bubble.color`.
- **`MessageBubble` deja de aceptar el atributo `role` de ARIA.** Su prop `role`
  dice quién habla, no qué es el elemento, así que el atributo nativo queda
  excluido de las props reenviadas.
- **`UserMessage` / `AssistantMessage` / `ConversationThread`: `timestamp` pasa
  a ser el instante** (`Date` o cadena ISO 8601), no una hora ya formateada.
  Quien pase `"14:32"` deja de ver la marca de tiempo (no se pinta nada, en vez
  de «Invalid Date»). Afecta a **lrs › StoreChat**, que hoy pasa la hora ya
  formateada con `format.dateTime`: hay que pasarle el `Date`.
- **`MessageComposer` pierde `sendAriaLabel`.** El botón tenía texto «Enviar» y
  `aria-label="Enviar mensaje"` a la vez, y el `aria-label` sustituye al nombre
  visible: quien dictaba «Enviar» no activaba el control (WCAG *label in name*).
  Ahora el nombre accesible es el texto visible; se traduce `sendLabel`.
- **`MessageComposer` cambia de estructura BEM.** `.message-composer` es ahora
  la pila (marco + línea de ayuda) y el marco es `.message-composer__box`.
  Quien estilara `.message-composer` como caja tiene que apuntar al box.
- **`ConversationList` pierde `item-active-bg`** (era gris claro, y estaba
  huérfano) y **`.conversation-list__new` deja de ser un `<button>` propio**:
  es un `Button variant="outline" block`, así que su CSS ya no existe.
- **La plantilla `Chat` desaparece.** Era solo una story, sin componente ni
  export, así que ningún producto podía consumirla; en su sitio está `ChatShell`.

### Añadido

- **`ChatShell`** (`Templates/ChatShell`, export `./chat-shell`): el armazón de
  una pantalla de chat en tres zonas por slots —`list`, `header`, el hilo como
  `children` y `composer`—, sin estado, con el scroll solo en el hilo y una
  maqueta que cae a una columna por debajo de `--breakpoint-lg`. Tokens propios
  con par oscuro.
- **`Textarea` gana la variante `bare`**: el campo renuncia a borde, fondo,
  aire, altura mínima, asa de redimensionado y anillo de foco para que los
  dibuje el contenedor que lo enmarca. Nueve tokens `textarea.bare-*`.
- **La cola del globo.** `MessageBubble` estrena una cola triangular que nace en
  la esquina inferior del lado del emisor. Como el globo no tiene relleno, la
  cola tampoco: dos triángulos superpuestos, el exterior del color del borde y
  el interior del color de la superficie (`tail-fill`), que la vacía e
  interrumpe el borde del globo donde nace. Tamaño por `tail-size`.
- **Tokens propios para `UserMessage` y `AssistantMessage`** (JSON nuevos, con
  par oscuro): antes tiraban del `message-bubble.font-family` del vecino y de
  `--font-size-1`, `--color-grey-dark` y `--spacing-1` globales.
- **Props nuevas**: `locale` y `timestampFormat` en `UserMessage`,
  `AssistantMessage` y `ConversationThread`; `helperText` y `rows` en
  `MessageComposer`; `listLabel` en `ChatShell`. `className`, `...rest` y
  `forwardRef` en los seis componentes de la familia.

### Cambiado

- **El globo es contorno, no relleno.** Rectángulo de 1px con las cuatro
  esquinas rectas y una sola tinta, con par claro/oscuro. Al emisor lo
  distinguen la alineación y la cola. El prusia del globo del usuario
  desaparecía sobre superficie oscura y llenaba el hilo de color.
- **`ConversationThread` respeta `prefers-reduced-motion`** en el autoscroll:
  consulta la media query en JS —a un `scrollIntoView` no le llega ningún token
  CSS— y baja de golpe para quien ha pedido menos movimiento.
- **`MessageComposer` deja de pisar el `Textarea` desde fuera.** Fuera las cinco
  reglas `.message-composer .textarea { border: none; box-shadow: none;
  min-height: unset }`; el campo va en variante `bare` y el marco, el fondo y el
  anillo de foco (`:focus-within`) los dibuja el composer. El `1px` cableado del
  borde sale de `border-width`.
- **`MessageComposer` enseña su atajo**: `Enter` envía y `Mayús + Enter` salta
  de línea, escrito bajo el marco con `Kbd` y enlazado al campo por
  `aria-describedby`.
- **`ConversationList` tenía cinco custom properties que no existen en el
  sistema** (`--font-size-body`, `--font-family-ui`, `--color-focus`,
  `--motion-ease-default`, `--color-grey`): la tipografía caía en la del
  navegador y **los tres anillos de foco no se pintaban**. Todas salen ya de
  tokens propios con par oscuro.
- **El aspa de `ConversationList` es alcanzable por teclado.** Llevaba
  `tabIndex={-1}` y una regla `:focus-visible` que no podía dispararse: borrar
  una conversación era imposible sin ratón. Ahora está en el orden de
  tabulación, mide la talla mínima (32px) y se ve siempre con puntero grueso.
- **Los estados de `ConversationList` dejan de ser grises.** Bajo el puntero la
  fila se rellena de marca y voltea la tinta, como en el `SidebarNav`; la
  conversación abierta se dice con tinta plena y peso, sin fondo. `item-color`
  pasa de `grey-dark` —que no es un color de texto— a `text.muted-on-light`.
- **El nombre del modelo sube a tinta plena** en `AssistantMessage`: firma la
  respuesta, no es un dato de segunda fila.
- Doc: MDX nuevas en `MessageBubble`, `UserMessage`, `AssistantMessage`,
  `ConversationThread`, `MessageComposer`, `ConversationList` y `ChatShell`;
  sección `bare` en `Textarea.mdx`; tabla de internacionalización al día.
  Stories en castellano con story «En superficie oscura» en los siete y tests de
  contrato `!dev`. `MessageComposer.test.tsx` y `ConversationList.test.tsx`
  nuevos.

## v25.0.0

### Eliminado (breaking)

- **Fuera `sonner`.** El motor de la cola de avisos pasa a ser
  `@base-ui-components/react/toast`, el mismo motor de conducta que el resto del
  sistema. `sonner` desaparece de `dependencies`, de `peerDependencies` y del
  `dist`: el paquete ya no lo reexporta (`export { toast } from 'sonner'`) ni lo
  arrastra ninguna salida.
- **`Toaster` pierde la prop `theme`.** Era la sincronización de tema de sonner;
  el modo oscuro sale de la cascada de tokens (`.surface-dark`,
  `[data-theme="dark"]`, `html.dark`).
- **Las firmas de sonner que no eran del sistema no se han portado**:
  `toast.custom()`, las opciones de presentación por aviso (`icon`, `cancel`,
  `className`, `style`, `richColors`, `position`, `unstyled`) y el par
  `onDismiss`/`onAutoClose`, que se unifica en un solo `onClose`. `toast.message`
  sobrevive como alias del aviso neutro.
- **Migración para las apps**: `import { toast } from 'sonner'` →
  `import { toast } from '@studiolxd/brand/toast'`. La tabla completa está en
  `Toast.mdx` § «Migración desde sonner».

### Añadido

- **`@studiolxd/brand/toast`**, punto de entrada nuevo con el manager de avisos:
  `toast(msg)`, `toast.message|success|error|warning|info|loading(msg, options)`,
  `toast.dismiss(id?)` y `toast.promise(promise, { loading, success, error })`.
  Cada llamada devuelve el `id` del aviso; reutilizar un `id` vivo **actualiza el
  aviso en su sitio** en vez de apilar otro (el patrón
  `const id = toast.loading(…)` → `toast.success(…, { id })`). Opciones:
  `id`, `description`, `duration` (`Infinity` deja el aviso fijo), `action`
  (`{ label, onClick }`) y `onClose`.
- **`Toast`: rol ARIA por intención.** Lo que sonner no permitía: `error` y
  `warning` interrumpen (`role="alertdialog"` y anuncio asertivo) y el resto
  informa sin interrumpir (`role="dialog"` en región `aria-live="polite"`). Es el
  mismo criterio que el `role` por variante del `Alert`.
- **`Toast`: acción opcional** — un `Button` ghost bajo el texto, montado sobre
  `Toast.Action` con `render`.
- Tokens nuevos del apilado y del movimiento: `toast.gap`, `toast.stack-offset`,
  `toast.stack-scale` y `toast.enter-scale`. El apilado lo dibuja ahora el CSS a
  partir de las alturas que mide el motor, así que `gap` es a la vez prop y
  token (la prop viaja como custom property).

### Cambiado

- **`Toast`: el aspa vuelve a ser un `Button` ghost.** Con sonner el elemento lo
  montaba el motor y había que reproducir su cara a mano; ahora `Toast.Close`
  monta el `Button variant="ghost" size="sm" iconOnly` del sistema con `render`,
  y desaparecen las reglas `.toast__close` que imitaban al ghost. El motor oculta
  el aspa al lector de pantalla mientras la pila está recogida (`aria-hidden`) y
  la descubre al desplegarla con el ratón o con el foco.
- **`Toast`: la pila se alcanza con F6** (el atajo de Base UI), que lleva el foco
  a la región y la despliega.
- `Toaster`: `visibleToasts` pasa a ser el `limit` del motor y `expand` una clase
  del CSS; el resto de props (`position`, `containerAriaLabel`, `closeLabel`,
  `closeButton`, `duration`, `gap`) mantiene su firma y sus defaults castellanos.
- Doc y pruebas: `Toast.mdx` estrena «Acción», «Espera», «API del manager» y
  «Migración desde sonner»; stories nuevas de acción y de espera; el test de
  componente cubre auto-cierre con timers falsos, cierre manual, acción,
  actualización por `id`, `dismiss` y rol por intención.

## v24.11.0

### Cambiado

- `CommandPalette` deja de envolver **cmdk**, que arrastraba
  `@radix-ui/react-dialog`, `react-primitive` y `react-id` al bundle publicado
  pese a que CLAUDE.md prohíbe Radix en el DS. Se reescribe sobre el `Modal`
  del sistema (Base UI Dialog) + `Autocomplete` de Base UI en modo `inline`.
  **La API pública no cambia**: `open`, `onOpenChange`, `groups`, `title`,
  `placeholder`, `emptyLabel`, `listLabel`, `closeLabel`, `shortcut` y
  `className` siguen igual, y los ítems mantienen `id`, `label`, `icon`,
  `onSelect`, `keywords` y `disabled` — los 8 consumidores de la suite suben
  de versión sin tocar nada. Lo que sí cambia es el DOM interno y los tokens,
  que son detalle de implementación (el CSS de componente no se expone):
  - `[cmdk-group-heading]` → `.command-palette__heading`.
  - `.command-palette__item[data-selected="true"]` →
    `[data-highlighted]`; `[data-disabled="true"]` → `[data-disabled]`.
  - Fuera `.command-palette__separator` y sus tokens
    (`command-palette.separator-height|-color|-margin-block` y
    `surface-dark-separator-color`): la regla existía pero el componente nunca
    renderizó un separador.
  - `command-palette.list-padding` se desdobla en `list-padding-block` /
    `list-padding-inline` (regla de ejes inline/block).
- `cmdk` sale de `dependencies`.
- `CommandPalette` sale de «Por revisar»: su título pasa a
  `Molecules/CommandPalette`.

### Añadido

- `CommandPalette`: prop `locale` (default: el del entorno) para fijar el
  idioma con el que `Intl.Collator` compara al filtrar.
- `CommandPalette`: MDX con anatomía, teclado, tokens, accesibilidad y
  «Migración desde cmdk»; stories «Con grupos» y «En superficie oscura»; dos
  stories de test (`!dev`) y `CommandPalette.test.tsx` con 13 casos
  (filtrado con y sin acentos, keywords, grupos vacíos, región viva, ↑↓,
  Home/End, Enter, ratón, deshabilitados, Escape y el atajo ⌘K).

## v24.10.0

### Cambiado

- `Arrow`: exporta `ArrowProps` desde `src/index.ts` (único átomo de este
  bloque que no lo hacía). Token huérfano `width-default` (duplicaba
  `width-md`, sin consumidores) retirado. MDX con anatomía, superficie oscura
  y accesibilidad.
- `Breadcrumb`: `renderLink` reenvía ahora todas las props que recibe
  (`{...props}`, tipo extendido con `AnchorHTMLAttributes<HTMLAnchorElement>`),
  en vez de recomponer solo `href`/`children`/`className`. `border-radius` del
  foco pasa de `2px` cableado a `border-radius.default`. `font-size` pasa de
  `font-size.1` fijo a `text.paragraph.small.font-size` (texto de navegación,
  respira en `SiteShell`). Doc MDX y stories de contrato/superficie oscura
  nuevas.
- `EmptyState`: `title-color`/`description-color` dejan de ser `grey-dark`
  (texto prohibido) y pasan a `color.text.muted-on-light`, con par
  `surface-dark-*` nuevo — antes no tenía ningún token oscuro y quedaba
  ilegible sobre `.surface-dark`. `icon-size` se unifica con `icon.size-lg`
  (48px); las stories con icono pasan de `size="xl"` a `size="lg"` para
  coincidir. Doc MDX nueva.
- `Tabs`: hover de la variante pill —antes `rgba(0,0,0,.06)` cableado— pasa a
  tokens `trigger-pill-hover-bg`/`-color` con relleno de marca (mismo patrón
  que `Menu`/`Button ghost`) y par oscuro; el foco —antes `outline: … solid
  2px` / `outline-offset: 2px` a mano— usa `focus-ring-width`
  (`border-width.focus`) + `focus-ring-offset` (`border-width.default`); la
  opacidad del trigger deshabilitado pasa de `0.4` cableado a
  `opacity.disabled`; `trigger-color` pasa de `grey-dark` a
  `color.text.muted-on-light`. Se añaden los pares `surface-dark-*` que
  faltaban para el pill activo y el indicador underline (`color.primary`
  colisionaba con el fondo de `.surface-dark`, ambos prusia). Doc MDX y
  stories de contrato/superficie oscura nuevas.

## v24.9.0

### Cambiado

- `Tooltip`, `Table`, `AppLauncher` y `PrevNextNav`: `calc(var(--…-transition-duration) * 1ms)`
  anulaba la animación (el token ya trae `ms`, así que el `calc` daba `ms²`,
  inválido). La propiedad toma ahora el token tal cual, como ya hacía
  `Popover`. `Modal` no tenía el patrón; `Skeleton` se deja intacto porque su
  duración es un número sin unidad por diseño.
- Decorator `withSurface` (`.storybook/preview.tsx`): en vez de envolver la
  story en `<div class="surface-dark">` —que no llega a los portales
  (`Popover`, `Menu`, `Tooltip`, `Modal`, `Select` renderizan en
  `document.body`)— pone `data-theme="dark"` en `document.documentElement`.
  Story «En superficie oscura» en `Popover`, ahora honesta.
- `DatePicker`: nueva prop `calendarLabel` (default «Calendario») que da
  nombre accesible al panel del calendario (antes `role="dialog"` sin
  nombre); `DatePickerField` usa el `label` del campo como nombre del panel
  por defecto.
- `DescriptionList`: por debajo de `--breakpoint-md` término y descripción se
  apilan en una columna (antes `max-content 1fr` apretaba el valor con
  términos largos en móvil); story «Estrecha».
- Nuevos roles semánticos `surface.secondary-on-light|on-dark` y
  `surface.inverse-on-light|on-dark` para los usos de `grey-lightest` /
  `grey-darkest` como superficie (no como estado): `kbd.bg`,
  `progress-bar.track-bg`, `code-block.bg` y `tag.neutral-bg` apuntan ahora al
  rol en vez de al primitivo — mismos valores resueltos, sin cambio visual.
  Documentados en Foundations/Colores.

## v24.8.0

### Cambiado

- `Toast` sale de `Por revisar/` (`Molecules/Toast`) y deja de duplicar al
  `Alert`: **son el mismo objeto con distinta vida**. La tarjeta del aviso monta
  ahora las clases y el juego de tokens del alert (`alert`,
  `alert--<intención>`, `alert--dismissible`, `alert__title`,
  `alert__description`), así que relleno, borde, aire, tipografía y las cuatro
  intenciones son literalmente los mismos y se personalizan con `alert.*`.
  `toast.*` se queda solo con lo suyo: capa, posición, apilado y movimiento.
- `Toaster`: props nuevas `closeLabel` (etiqueta accesible del aspa, «Cerrar»),
  `closeButton`, `duration` (5000ms, el reloj se para con el puntero o el foco
  dentro), `gap`, `visibleToasts` y `expand`. `containerAriaLabel` estrena
  default castellano («Notificaciones»; antes caía en el «Notifications» del
  motor). `'use client'` explícito.
- `Toast`: el aspa deja de llevar color cableado —fuera el
  `rgba(255, 255, 255, .15)` del hover y el `color-mix(… 8%)` de la variante
  `warning`—; reproduce la cara del `Button` ghost con los tokens del alert
  (tinta del título, que voltea sola con la intención, e inversión contra el
  relleno en hover) y mide `alert.close-size` (32px). Los `--spacing-*` sueltos
  del CSS salen también de tokens del alert.
- `Toast`: `dist/toaster.css` incluye ahora el CSS del `Alert`, del que la
  tarjeta depende de verdad. Sin esto, un consumidor que importara solo el
  entrypoint `./toaster` se quedaba con la capa pero sin tarjeta.
- `Toast`: la pila no se sale por el lado en ventanas estrechas — su anchura es
  `min(toast.max-width, ancho de la ventana − aire lateral)`.
- Doc: `Toast.mdx` nueva (anatomía, montaje, intenciones, apilado, auto-cierre,
  superficie oscura, tokens y accesibilidad) y `Toast.test.tsx` nuevo
  (auto-cierre, `duration: Infinity`, cierre manual, `closeLabel`, la tarjeta es
  un alert, `containerAriaLabel`). Stories en castellano con contratos `!dev`.
- Doc: `Alert.mdx` § «Superficie oscura» recoge la decisión explícita — en
  oscuro el relleno del aviso neutro sigue siendo prusia y el borde es el único
  separador; **no se añade un neutro oscuro a la paleta**.
- Doc: `Kbd.mdx` estrena § «Medida» con el porqué de derivar la altura del texto
  (`cuerpo × interlineado + 2 × aire + 2 × borde`, como `textarea.min-height`) y
  de no alinearla a los 32px de los controles: un keycap es una marca inline, no
  un control, y a 32px `sm` y `md` colapsarían en la misma medida.
- Doc: `Foundations › Internacionalización` añade `Toaster`.

### Eliminado

- Tokens `toast.*` que duplicaban a `alert.*`, **breaking para quien los
  sobrescribiera** (ninguna app de la suite lo hacía; verificado por `grep`):
  `padding-block`, `padding-inline`, `border-radius`, `border-width`, `shadow`,
  `bg`, `border-color`, `title-font-size`, `title-font-weight`, `title-color`,
  `description-font-size`, `description-color`, `close-color`,
  `close-hover-color`, `close-size`, y los juegos completos `success-*`,
  `error-*` y `warning-*`. Su equivalente es el token `alert.*` del mismo
  nombre.
- Tokens `toast.width`, `toast.inset-block-end`, `toast.inset-inline-end` y
  `toast.gap`, renombrados o retirados: la anchura es ahora `toast.max-width`,
  las distancias al borde son `toast.inset-block` / `toast.inset-inline` (valen
  para las cuatro esquinas) y el aire entre avisos apilados pasa a ser la prop
  `gap` del `Toaster`, porque el apilado lo calcula el motor de la cola en JS.

## v24.7.0

### Cambiado

- `Accordion`: el separador entre ítems deja de ser `currentColor` y pasa a
  `accordion.border-color` (`color.primary`), con par oscuro; el anillo de foco
  usa el rol `focus` también para su separación y estrena
  `surface-dark-focus-ring-color`. Tipos (`AccordionProps`, `AccordionItemProps`,
  `AccordionTriggerProps`, `AccordionContentProps`) exportados. Doc MDX nueva y
  `Accordion.test.tsx`.
- `Tag`: los tokens de variante dejan de nombrar primitivos —`info-bg` y
  `warning-bg` pasan a `color.primary` y `color.accent-2`, los textos a
  `color.text.on-dark|on-light`—. Mismos valores resueltos: un componente nombra
  un rol, no un color. Doc MDX con anatomía, oscuro y matriz de contraste.
- `Kbd`: `min-size` (y sus `sm-`/`lg-`) dejan de ser números sueltos y salen de
  `cuerpo × interlineado + 2 × aire + 2 × borde`, así una tecla de un carácter
  es cuadrada en las tres tallas (24 / 26 / 38px); `lg-font-size` sube de 16 a
  20px. Fuera el token huérfano `kbd.shadow` (el relieve lo da el borde). El
  átomo reenvía props del `<kbd>` y `className`, con `forwardRef`.
- `List`: el aire entre ítems lo pone el ítem (`li + li`) en vez de un `gap` de
  flex sobre la lista. Reenvía props del elemento y `className`, con
  `forwardRef`; `ListProps` y `ListType` exportados. La tabla de tokens oscuros
  del MDX sale del JSON (antes era un token escrito a mano inexistente).
- `Popover`: la animación no ocurría —`animation-duration` tomaba
  `calc(var(--popover-transition-duration) * 1ms)` y el token ya trae `ms`—;
  ahora usa el token tal cual. Prop `label` para dar nombre al panel
  (`role="dialog"`), `sideOffset` por defecto desde el token nuevo
  `popover.offset`, anillo de foco propio con par oscuro y fuera el token
  huérfano `popover.shadow`. `'use client'`. `Popover.test.tsx` nuevo.
- `DescriptionList`: el término (`<dt>`) estrena tokens propios `term-*` —antes
  se vestía con `--label-*` directamente— y su par oscuro; CSS con ejes lógicos
  (`border-block-end` / `border-inline-end`). Reenvía props del `<dl>` y
  `className`, con `forwardRef`. Doc MDX nueva.
- `ProgressBar`: `label` es el nombre accesible y trae texto castellano por
  defecto («Progreso») —antes, sin él, la barra no tenía nombre—; añadido
  `aria-valuetext`, `className` al contenedor y token
  `progress-bar.line-height` (el CSS lo llevaba cableado). Doc MDX nueva y
  `ProgressBar.test.tsx`.
- Los siete salen del grupo «Por revisar» del catálogo: `Atoms/Accordion`,
  `Atoms/Tag`, `Atoms/Kbd`, `Atoms/List`, `Atoms/Popover`,
  `Atoms/DescriptionList` y `Atoms/ProgressBar`.

## v24.6.0

### Cambiado

- **`Alert`**: el rol ARIA sale de la intención — `alert` (live assertive) en
  `error` y `warning`, `status` (live polite) en `default` y `success`; la prop
  `role` lo sigue forzando. El botón de cierre es un `Button` ghost `sm`
  iconOnly: objetivo táctil de 32px, anillo de foco del sistema y hover que
  voltea con la superficie del relleno, en vez del `rgba(255, 255, 255, 0.15)`
  y el `color-mix(… 8%)` que llevaba cableados. Su etiqueta accesible es ahora
  la prop `closeLabel` (default «Cerrar»). Tokens nuevos: `alert.gap`,
  `alert.content-gap`, `alert.close-inset`, `alert.title-line-height`,
  `alert.description-line-height`; `alert.close-size` pasa a ser el lado del
  botón (`size-component.sm`). Retirados `alert.close-color`,
  `alert.close-hover-color`, `alert.warning-close-color`,
  `alert.warning-close-hover-color`, `alert.surface-dark-bg` y
  `alert.surface-dark-border-color` (la raíz ya se declara `.surface-dark`, así
  que los valores claros de `bg`/`border-color` nunca se aplicaban);
  `alert.border-color` es blanco. MDX y test de componente nuevos.
- **`CodeBlock`**: el área de código (`<pre>`) es una región focalizable
  (`role="region"`, `tabindex="0"`) con nombre accesible por la prop nueva
  `codeLabel` —función, porque interpola el lenguaje— y anillo de foco propio
  (tokens nuevos `code-block.focus-ring-width|style|offset|color`). El botón de
  copiar ya no se renombra bajo el foco: conserva `copyLabel` y el resultado se
  anuncia en una región `role="status"` con `copiedLabel`. Un portapapeles no
  disponible se captura en vez de dejar la promesa rechazada. Retirado el token
  `code-block.shadow` (heredaba `card.shadow`, que es `none`). El raíz reenvía
  `{...rest}`. MDX corregido: la superficie del bloque es autocontenida y su
  borde **no** hereda el remapeo oscuro de `Card`.
- Ambos salen del grupo «Por revisar» del catálogo: `Molecules/Alert` y
  `Molecules/CodeBlock`. Su story «En superficie oscura» usa el
  `parameters: { surface: 'dark' }` que llegó en v24.5.0.

## v24.5.0

### Añadido

- `Inline` (átomo): fila de piezas con envoltura, hermano horizontal de `Stack`.
  `gap` `sm|md|lg` (tokens nuevos `inline.gap-sm|md|lg` → `spacing.2|4|5`) y
  `align` `start|center|end` (centro por defecto). `div.inline`, sin fondo ni
  semántica. Export `./inline`.
- `NotFoundPage` y `ErrorPage`: prop `shell?: boolean` (por defecto `true`).
  Con `shell={false}` no montan `SiteShell` ni el `main`, solo el contenido
  (`Stack` → `PageIntro` + enlace/acciones), para una app con `AppShell` que ya
  tiene su `main`. Story «Dentro de una app».
- `Hero`: story «En superficie oscura».
- Storybook: el decorator global pasa a llamarse `withSurface` y, además del
  switcher de fondos, lee `parameters.surface = 'dark'` para envolver una story
  en `.surface-dark` (el lienzo del sistema). Patrón documentado en
  `CLAUDE.md` § Storybook.
- Barrel `src/index.ts`: `Container`, `Columns` y `Stack` (antes solo por
  subpath), junto a `Inline`.

### Cambiado

- `Hero` y `ErrorPage` componen su fila de acciones con `Inline` en lugar de un
  flex propio. `.hero__actions` y `.error-page__actions` siguen existiendo como
  clase sobre el `Inline`; `.hero__actions` conserva `hero.actions-space-before`.

### Retirado

- Tokens `hero.actions-gap` y `error-page.actions-gap` (y con él
  `tokens/component/error-page.json`, `ErrorPage.css` y el SCSS
  `components/_error-page.scss`): el aire entre acciones lo pone
  `inline.gap-md`, que resuelve al mismo `spacing.4` (16px), así que la maqueta
  no cambia. Nacieron en v24.2.0/v24.3.0 y no tienen consumidor; por eso va
  como minor y no como major.

## v24.4.0

### Cambiado

- `Spinner`: deja de ser un círculo que gira. Ahora es un cuadrado de solo
  contorno (SVG `<rect>` sin radio, `pathLength="100"`) que se dibuja desde la
  esquina superior izquierda hasta cerrarse y vuelve a empezar; sin rotación.
  Misma API (`size`, `label`, `aria-hidden`) y mismos tokens: `spinner.size-*`
  y `spinner.border-width-*` (ahora grosor del `stroke`);
  `spinner.animation-duration` pasa de 600ms a 1000ms (un ciclo de dibujo).
  Con `prefers-reduced-motion: reduce` no anima: se muestra el contorno
  completo. Elemento interno `.spinner__circle` → `.spinner__square` +
  `.spinner__stroke` (CSS interno, no expuesto). Doc MDX nueva.
- `TypingIndicator`: los tres puntos son cuadrados (sin `border-radius`).
  Tamaño, tokens, ritmo, reduced-motion y API sin cambios; el token
  `typing-indicator.dot-size` conserva su nombre (es el lado del cuadrado).
  Doc MDX nueva.
- `Tooltip`: la separación con el disparador sale del token nuevo
  `tooltip.offset` (`spacing.1`, 4px), leído en runtime sobre `<html>`; la prop
  `sideOffset` sigue como override. Doc MDX nueva y story «Cuatro lados» como
  contrato visual.
- `Spinner`, `TypingIndicator` y `Tooltip` pasan a definitivos: salen de
  «Por revisar» en Storybook (`Atoms/…`).

### Corregido

- `Tooltip` con `side="left"`/`"right"`: la flecha giraba 90° sobre el centro
  de su caja 10×5 y quedaba flotando 2,5px separada del bocadillo (y metida en
  el disparador). Un `translate` de ±25% la devuelve al borde. Test de
  geometría para los cuatro lados.

## v24.3.0

### Añadido

- `ErrorBoundary` (átomo): límite de error de React sin cara ni tokens.
  `children`, `fallback` (por defecto `null`) y `onError`. Componente de clase
  cliente: si un hijo lanza al renderizar, pinta el fallback y el resto del
  árbol sigue vivo.
- `NotFoundPage` (plantilla): el 404 de un sitio público. `SiteShell` con
  `header`/`footer` opcionales —cada uno dentro de su `ErrorBoundary`— y un
  `main` (`Container` `space="xl"`, `id="main-content"`, `tabIndex={-1}`) con
  `PageIntro` (`title`, `description`) y `homeLink` (el `Link` del producto).
- `ErrorPage` (plantilla): «algo ha salido mal», misma maqueta que
  `NotFoundPage` con una fila de `actions` (Button «Reintentar» + enlace «Ir al
  inicio») en lugar del enlace de vuelta. Regla documentada: en `error.tsx`
  cabecera sin auth y pie; en `global-error.tsx` ninguno. Token nuevo
  `error-page.actions-gap`.
- Exports `./error-boundary`, `./not-found-page` y `./error-page`.

## v24.2.0

### Añadido

- `Hero` (sección): cabecera de portada de un sitio público. `Container`
  `section` a ancho `xl` con aire `2xl`; `title` como `Heading` de nivel 1 a
  talla 10, `description` opcional como `Paragraph size="large"` y `actions`
  opcional (botones en fila con envoltura). Título y frase limitados a
  `--content-measure` (primer consumidor del token). Sin color propio: el fondo
  lo pone la superficie. Tokens nuevos `hero.actions-gap` y
  `hero.actions-space-before`.

## v24.1.0

### Añadido

- `SiteNav`: cada ítem admite `target` y `rel`. Con `target="_blank"` y sin
  `rel` explícito se aplica `rel="noopener noreferrer"`. Ambos viajan también
  en las props que recibe `renderLink` (`SiteNavRenderLinkProps`), así que el
  enlace del router del producto debe reenviarlos. Caso de uso: una entrada del
  menú que vive en otro dominio (estado del servicio) y abre en pestaña nueva.

## v24.0.0

### Eliminado (breaking)

Fuera todo el legado de la web de studiolxd.com: la suite no lo consume y el DS
deja de arrastrarlo.

- **Secciones**: `ClientsSection`, `ContactSection`, `CoursesSection`, `Footer`,
  `HighlightSection`, `MethodologySection`, `ProjectsSection`, `ReviewsSection`,
  `SolutionsSection`. El pie público vigente es `LegalFooter`.
- **Organismos**: `ProjectCarousel`, `ProjectGrid`, `ReviewCarousel`,
  `PricingCard`, `Steps`.
- **Moléculas**: `ProjectCard`, `CardSplit`, `CardSquare`. Para tarjetas, `Card`.
- **Átomos**: `Carousel`, `HeroVideo`, `Highlight`. La prop `size` de `Highlight`
  desaparece de la escala de títulos documentada en Foundations.
- **Tokens**: `carousel.*`, `card-split.*`, `card-square.*`, `clients-section.*`,
  `contact-section.*`, `footer.*`, `highlight-section.*`, `methodology-section.*`
  y `pricing-card.*` — con sus CSS/SCSS generados (`components/carousel`,
  `components/card-split`, `components/card-square`, `components/clients-section`,
  `components/contact-section`, `components/footer`,
  `components/highlight-section`, `components/methodology-section`,
  `components/pricing-card`). Los tokens `section.*` (`--section-padding-*`) se
  quedan: los consumen `Container` y `SiteHeader`.
- **Exports CSS de sección**: `./clients-section.css`, `./contact-section.css`,
  `./courses-section.css`, `./footer.css`, `./highlight-section.css`,
  `./methodology-section.css`, `./projects-section.css`, `./reviews-section.css`,
  `./solutions-section.css` — ya no queda ningún CSS de sección suelto.
- **Exports de componente**: `./carousel`, `./hero-video`, `./highlight`,
  `./card-split`, `./card-square`, `./project-card`, `./project-carousel`,
  `./project-grid`, `./review-carousel`, `./pricing-card`.
- **Dependencias**: `embla-carousel`, `embla-carousel-react` y
  `embla-carousel-auto-scroll` (solo las usaban los carruseles).

## v23.0.0

### Eliminado (breaking)

- `Header` (la cabecera legacy de studiolxd.com), sus tokens `header.*`
  (`--header-height-overlay/inline`, `--header-nav-*`…) y `header.css`.
  La cabecera pública es `SiteHeader` + `SiteNav`.
- Plantillas de página `Home`, `Content`, `Article` y `Legal` (montaban el
  `Header`; ningún producto las consumía) y sus CSS `article-template.css`,
  `content-template.css`, `legal-template.css`. Las secciones que usaban
  (`ClientsSection`, `Footer`…) siguen.

## v22.6.1

### Corregido

- `SiteHeader`, `Header` y `Sidebar`: el logo enlazado tampoco lleva línea en hover (la
  regla de hover de la base empataba en especificidad y ganaba por orden).

## v22.6.0

### Cambiado

- Títulos con su propio aire por debajo: `h1`…`h6` (y `Heading`) llevan
  `margin-block-end: var(--text-heading-space-after)` (`0.5em`, escala con el
  tamaño del título); se anula cuando el título es el último hijo. Antes iban
  sin margen y cada contenedor ponía un `gap` fijo.
- `PageIntro` deja el `gap`: el aire título→frase lo pone el título; entre la
  frase y `children`, `--spacing-3`.

### Corregido

- `Sidebar`: el logo enlazado (`<a>` en el slot `logo`) ya no lleva la línea
  de enlace, como en `SiteHeader`.

### Eliminado

- Token `--page-intro-gap` (y su export `tokens/molecules/page-intro`).

## v22.5.1

### Corregido

- `Stack`: las piezas miden lo suyo (`align-items: flex-start`); un enlace de
  vuelta no se estiraba a todo el ancho de la columna.

## v22.5.0

### Añadido

- `Stack` (átomo de maquetación): apila piezas con aire por token (`gap-md/lg`)
  y `mobileOrder="reverse"` (por debajo de `md`, la última pieza arriba; solo
  orden visual). Es el envoltorio explícito de una celda de `Columns` con varias
  piezas. Export `./stack`.

### Cambiado

- `PageIntro` ya no pone aire por debajo (`margin-block-end` retirado): lo pone el
  `Stack` que lo agrupa con lo que le sigue.

## v22.4.3

### Corregido

- `Form`: sin aire encima de las acciones cuando son lo primero (formulario
  solo de acciones); en `blockActions` la acción principal (última del JSX)
  queda arriba.

## v22.4.2

### Corregido

- `PageIntro` pone el aire por debajo cuando algo le sigue en la columna
  (`margin-block-end`), en vez de ponerlo el elemento que sigue.

## v22.4.1

### Corregido

- Texto de ayuda de los campos en oscuro: blanco (16 fields lo tenían aún en
  `text.muted-on-dark`). Fuera `columns.cell-gap`.

## v22.4.0

### Cambiado

- `Columns`: solo se desenvuelve el Fragment cuando es TODO el contenido; un
  Fragment entre otras hijas es una celda (agrupa varias piezas, apiladas con
  `cell-gap`). Antes cada hija del Fragment anidado pasaba a ser una columna.

## v22.3.0

### Cambiado

- `PageIntro`: la frase bajo el título es una entradilla (`Paragraph size="large"`,
  un peldaño por encima del cuerpo); `children` sigue en cuerpo normal.

## v22.2.1

### Corregido

- `Link` `tone="ink"`: faltaba la regla CSS (solo estaban los tokens), así que
  en oscuro salía amarillo como los `accent`.

## v22.2.0

### Añadido

- `Link` con `tone`: `accent` (por defecto: texto y acciones) e `ink` (utilitario:
  legal, volver, ¿olvidaste la contraseña? — tinta, línea en reposo y ninguna en
  hover, igual en claro y oscuro). Tokens `link.ink-*`. `LegalFooter` usa `ink`
  (fuera sus tokens de enlace propios de v22.1.0).

## v22.1.0

### Cambiado

- Enlaces en superficie oscura: amarillo (`accent-2`), sin línea en reposo y
  con línea en hover (`link.hover-underline-width`, `surface-dark-underline-width`,
  `surface-dark-hover-underline-width`). En claro, como antes.
- `LegalFooter`: excepción explícita — enlaces en tinta (blanco en oscuro),
  línea en reposo y ninguna en hover (`link-color`, `link-underline-width`,
  `link-hover-underline-width`).
- `SiteNav`: hover en oscuro a `accent-2`; más aire entre la cabecera del grupo
  y sus enlaces (`label-margin-block-end` = `spacing.4`).

## v22.0.2

### Corregido

- `OtpInput` admite `aria-labelledby` (el grupo se nombra por la etiqueta
  visible del `OtpField`); v22.0.1 lo pasaba sin que el átomo lo aplicara.

## v22.0.1

### Corregido

- `OtpField`: el grupo se nombra por `aria-labelledby` con la etiqueta visible,
  no con un `aria-label` duplicado (los tests por etiqueta encontraban dos).

## v22.0.0

### Rompe

- **Los 14 fields restantes pasan a definitivos** con el contrato completo
  (`id`/`useId`, `label` + `labelHidden`, `helperText`, `error`+`errorMessage`,
  `aria-describedby`/`aria-invalid`, `className` al contenedor, `forwardRef` al
  control real y `name`): RadioField, SwitcherField, SelectField,
  NumberInputField, InputPhoneField, OtpField, FileUploadField, MultiSelectField,
  AsyncSelectField, AsyncMultiSelectField, DatePickerField, DateTimeField,
  TimeField, y DropdownField gana ayuda y error. Cada uno con `Contrato`,
  `ContratoTallas` y `ConReactHookForm` (FormProvider + FormField reales).
- Átomos: Radio y Switcher estrenan `error`; NumberInput, InputPhone, OtpInput,
  FileUpload, Select, MultiSelect, AsyncSelect, AsyncMultiSelect, DatePicker y
  TimeSelect pasan a `forwardRef` con passthrough nativo y `name`
  (`describedBy`/`ariaLabel` deprecados). Fuera `multi-select.icon-size`,
  `multi-select.focus-ring-offset`, `select-field.error.border-color` y
  `time-select.error-border-color` (crudos o duplicados).
- `labelHidden` pasa a `false` por defecto en NumberInputField, InputPhoneField,
  FileUploadField, DatePickerField, DateTimeField y TimeField. El DOM de
  RadioField/SwitcherField cambia (raíz que apila; `__control` para marca+texto).
- `SiteNav`: la página actual ya no va en negrita (`item-current-font-weight` =
  `default`); la marca `aria-current`.

### Corregido

- A11y de los campos: el disparador del MultiSelect se nombra por
  `aria-labelledby`; los Async* no pisan la etiqueta con el placeholder;
  TimeField y DateTimeField nombran un `role="group"`; FileUpload lleva ayuda y
  error a la zona de arrastre; TimeSelect ya no salta de no controlado a controlado.

## v21.1.1

### Corregido

- `SiteNav`: la línea de hover ya no desplaza el contenido (el sitio se reserva
  siempre) y va más pegada al texto (`item-underline-offset` = 2px).

## v21.1.0

### Añadido

- `Form` `success`: el mensaje que sustituye al formulario al enviarlo, como
  texto anunciado (`role="status"`, tokens `form.success`), sin caja; mantiene
  `links`. Las páginas de contacto y verificación lo usan en vez de un `Alert`.

## v21.0.0

### Rompe

- `src/stylesheets/surface.css` **retirado**: era el último CSS del DS
  anterior (bordes de error en blanco, disabled a mano, separadores del Form,
  `.surface-light`, `form-spacer`…). Todo el modo oscuro sale ahora de tokens
  `surface-dark-*` de cada componente; los estados deshabilitados de `Input`,
  `Textarea` y `Checkbox` ganan sus tokens oscuros. `.surface-light` deja de existir.
- `.surface-dark` es un **lienzo**: fija fondo y color emparejados (`base.css`),
  como el `body`. Sin esto, el texto que solo hereda (párrafos, enlaces) seguía
  en el color del body dentro de una superficie oscura anidada.

## v20.2.1

### Corregido

- `surface.css` conservaba reglas de la técnica de separadores del `Form`
  anterior (`.surface-dark .form__fields > … { --input-border-color: fondo }`):
  en superficie oscura los campos de un formulario salían sin borde. Fuera.

## v20.2.0

### Añadido

- `TextareaField` reenvía `ref` y las props nativas al `<textarea>` (react-hook-form), como `InputField`.
- Storybook: `Pages/Contacto`; la sección pasa a llamarse «Páginas públicas».

## v20.1.2

### Corregido

- La anulación de la línea de los enlaces (`padding-block-end: 0`) pisaba el
  padding propio en 11 componentes (SkipLink, Menu, Card, Pagination, UserMenu,
  OrgSwitcher, SidebarNav, AppLauncher, CalendarRoster, PricingCard, Header):
  el SkipLink salía sin aire abajo. Retirada donde el componente ya fija su padding.

## v20.1.1

### Corregido

- `SkipLink`: el anillo de foco iba en el color del texto del relleno (blanco
  en claro, prusia en oscuro), invisible sobre la página. Ahora es la tinta de
  la superficie, a 4px, como en los botones.

## v20.1.0

### Cambiado

- Anillo de foco de `Button`: por fuera, a 4px del botón (`button.focus-ring-offset`
  = `spacing.1`), en la tinta de la superficie en todas las variantes — el
  `primary` deja de usar el lavanda (invisible sobre sí mismo). El hueco es el
  fondo, y así se lee como foco y no como un borde más.

## v20.0.1

### Corregido

- El estado de error de `Input`/`Textarea` en oscuro: fondo del lienzo, texto y
  placeholder blancos (tokens `surface-dark-error-*`; antes solo lo cubría
  `.surface-dark` a mano, no `html.dark`).
- Todos los fields marcan el control en error también cuando solo llega
  `errorMessage` (PasswordField, InputPhoneField, TimeField, DateTimeField,
  DatePickerField; los de selección en su contenedor). `Select`, `MultiSelect`,
  `AsyncSelect`, `AsyncMultiSelect` y `TimeSelect` ganan borde de error
  (`error-border-color` + variante oscura).

## v20.0.0

### Rompe

- **Dos superficies de lectura**, documentadas en Foundations → Tipografía:
  aplicación (base) cuerpo 16 / controles `md`; pública (`SiteShell`) cuerpo 20 /
  controles `lg`. En público los títulos suben un peldaño (H1 56 … H6 20) y los
  peldaños del párrafo también.
- `Paragraph size="large"` pasa a ser un peldaño sobre el cuerpo (20 en base,
  24 en público; antes 24 fijo); `small` un peldaño por debajo (14 / 16).
- Los componentes de texto **heredan** el cuerpo de la superficie en vez de fijar
  16px: alert, toast, modal, empty-state, description-list, table, prev-next-nav,
  file-upload, message-bubble, form (`success`; `error`/`helper` = párrafo
  pequeño). `LegalFooter` pierde su token de tamaño y hereda. Los componentes de
  interfaz (campos, botones, menús, kbd, tabs, calendarios…) conservan su talla.
- Mecanismo: `src/tokens/surface-public.css` (generado en `build:tokens`)
  redeclara bajo `.site-shell` todo token que dependa del cuerpo o la escala —
  un `var()` dentro de una custom property se resuelve en `:root`, así que
  remapear `--text-font-size` no bastaba. Documentado en `CLAUDE.md` del repo.
- `text.json`: descripciones corregidas (el cuerpo es 16px, no 18).

### Corregido

- Foundations → Tipografía: el bloque «Estilos de texto» estaba roto.

## v19.12.0

### Añadido

- `Form` `blockActions`: acciones (y botones de `alternatives`) a todo el ancho y
  apilados también en escritorio.

### Cambiado

- Sin `text-decoration: underline` en ningún enlace del sistema: el hover de
  `SiteNav` (claro), `LanguageSwitcher` y `ThemeSwitcher` en lista y
  `Pagination` usan la línea de los enlaces (`link.underline-*`);
  `site-nav.item-hover-line-width` (0 en oscuro, donde cambia el color).
- Placeholders en tinta: prusia sobre claro, blanco sobre oscuro (`input`,
  `textarea`), también en error. Foundations → Colores actualizado.

## v19.11.1

### Corregido

- `Form`: el rótulo de las alternativas («O continúa con») no fija talla ni
  color: es texto corriente y hereda los de la superficie (fuera los tokens
  `alternatives-label-*`).

## v19.11.0

### Añadido

- `SiteShell` fija la tipografía de la superficie pública: cuerpo a 20px
  (`site-shell.text-font-size` = `font-size.3`, la talla de los controles `lg`)
  y su interlineado. `AppShell` sigue a la base de 16px.

## v19.10.0

### Cambiado

- Enlaces: el subrayado es una **línea bajo el enlace** (sombra interior con
  `link.underline-width`/`underline-offset`), no `text-decoration`: cubre texto
  e icono, se separa del texto y desaparece en hover. Los componentes que visten
  sus propios enlaces la anulan (`box-shadow: none; padding-block-end: 0`);
  `a.button` queda fuera. Fuera `link.text-decoration`/`hover-text-decoration`.
- Textos de ayuda de los campos en tinta: prusia sobre claro, blanco sobre
  oscuro (`form.helper.color`), no gris.
- `Form`: el rótulo de las alternativas («O continúa con») en cuerpo normal y
  color de texto, no como pista.

## v19.9.1

### Corregido

- `Link` con icono: el subrayado cubre icono y texto (línea bajo el enlace,
  `icon-underline-width`/`-offset`); en hover desaparece, como en el resto.

## v19.9.0

### Cambiado

- Iconos `arrow` y `arrow-left`: la punta es un tercio del largo y abre a 45°
  (la proporción de la flecha de la marca), en trazo.

## v19.8.1

### Corregido

- `Input` y `Textarea`: el autorrelleno del navegador ya no pinta el campo de
  blanco (también en superficie oscura): sombra interior del color del campo y
  color de texto forzado; el anillo de foco en error se conserva.

## v19.8.0

### Añadido

- `Link` con `icon` (+ `iconPosition`) y `render` para el enlace del router del
  producto; icono `arrow-left`; token `link.icon-gap`.
- Storybook: sección `Pages/` con acceso, registro, recuperar contraseña,
  verificar correo y aceptar invitación montadas con el DS.

### Cambiado

- Borde de los campos en error en el color de error (`input`/`textarea`
  `error-border-color`, `error-focus-border-color`, con variante oscura):
  excepción explícita a «bordes en prusia».
- Storybook: fuera las 38 stories «superficie oscura» y «en móvil» sin
  contrato (la barra de fondos y de viewport ya lo hacen); las que afirman algo
  quedan como test `!dev`.

## v19.7.0

### Cambiado

- `SiteHeader`: fuera el marco con borde del panel (tokens `panel-frame-*`
  retirados). El panel vuelve a llevar su aire vertical directamente
  (`panel-padding-block`, `panel-padding-block-end`).

## v19.6.0

### Añadido

- `Form` sin campos (`children` opcional): solo acciones y enlaces.
- `PageIntro` admite `children`: más texto bajo la frase, con el mismo aire.

## v19.5.0

### Añadido

- `PageIntro` (molécula): cabecera de página — título (`Heading` 1) y frase
  opcional con su aire (`gap`). Un `header`; va como celda de `Columns` o en el
  `Container`. Export `./page-intro`.

## v19.4.0

### Añadido

- `Columns` (átomo de maquetación): N celdas iguales en escritorio (2–4),
  apiladas en móvil; `ratio` con dos columnas (`1:1`, `1:2`, `2:1`), `align`,
  `gap`, `stackOrder`. Sin semántica ni fondo: la jerarquía la pone el contenido.
  Export `./columns`.

## v19.3.1

### Corregido

- `PasswordField.action` no es ayuda: enlace en cuerpo normal, a la izquierda,
  con aire propio (`action-margin-block-start`); fuera `action-font-size`.

## v19.3.0

### Añadido

- `PasswordField` admite `action`: una acción bajo el campo, a la derecha
  («¿Olvidaste tu contraseña?»), en cuerpo de ayuda (`action-font-size`).

## v19.2.0

### Añadido

- `FormProvider` admite `translate`: `FormMessage` y `FormRootMessage` pasan por
  ahí los mensajes de error (claves de traducción de una política compartida con
  el servidor, por ejemplo) antes de pintarlos.

## v19.1.0

### Añadido

- `Form`: ranura `captcha` (entre los campos y las acciones, `captcha-margin-block-start`)
  y enlaces secundarios con texto delante (`<Paragraph>¿No tienes cuenta? <Link>Regístrate</Link></Paragraph>`).

## v19.0.0

### Rompe

- `Form` rediseñado: **solo estructura y aire** (tema claro/oscuro por tokens de
  cada pieza). Fuera el perímetro y la técnica de separadores del DS anterior
  (`--form-border-*`, `--form-separator-*`, `--form-heading-*`). Bloques nuevos:
  `links`, `alternatives` (+ `alternativesLabel`); `size` reparte la talla a
  campos y botones por contexto; `errors` es una lista `role="alert"`.
  Las clases `form-errors*` pasan a `form__errors`/`form__error`.
- `LoginForm` (organismo) retirado: los formularios de acceso son del producto
  sobre `Form` + `*Field`.
- Bordes y separadores: siempre prusia sobre claro y blanco sobre oscuro.
  Fuera `grey-light` y los blancos translúcidos en sidebar, app-header, table,
  tabs, kbd, file-upload, calendarios, legal-footer, menú, user-menu y
  org-switcher. `LegalFooter` sin línea.
- `LanguageSwitcher` compacto muestra el nombre del idioma (no el código); fuera
  los tokens `code-*`.

### Añadido

- Talla por contexto: `useFormSize` (`constants/form-size`); todos los `*Field`
  y `Button` toman la talla del `Form` si no se les pasa.
- `InputField` reenvía `ref` y las props nativas al `<input>` (react-hook-form).
- `Menu` con `size` (opciones a la talla del disparador, como el `Select`);
  `DropdownField` y `ThemeSwitcher` la propagan. Icono del valor a la talla del menú.
- `SiteHeader`: ajustes (idioma, tema) pegados abajo del panel, en fila en
  escritorio y apilados en móvil; contenido dentro de un marco con borde y aire
  (`panel-frame-*`, `panel-padding-block-end`); la marca descuenta el aire del
  Container (`logo-margin-inline-start`); hover de `SiteNav` en oscuro a `accent-1`.
- `LegalFooter`: enlaces apilados en móvil (`links-gap-stacked`), cuerpo base.
- `Label` `lg` a 20px (la del control). `PasswordField`: toggle en tinta e icono a
  la talla del campo.
- Storybook: `Form`, `FormField`, `PasswordField`, `CheckboxField`, `Checkbox` y
  `Fieldset` salen de «Por revisar».

### Corregido

- El disparador del `Menu` recibe `aria-expanded`/`data-popup-open` (el chevron
  de los desplegables gira).

## v18.1.0

### Cambiado

- `LanguageSwitcher` compacto: la etiqueta («Idioma») es visible por defecto,
  como la del selector de tema — ahora van juntos en los ajustes del panel.
  `labelHidden` sigue disponible.

## v18.0.0

### Rompe

- `SiteHeader`: la ranura `language` ya no va en la barra; se pinta en los
  ajustes del panel, delante de `settings` (tema) — en fila en escritorio,
  apilados en móvil (`settings-gap`). La barra queda en marca + acciones + menú.
  La API no cambia; cambia dónde aparece.

### Añadido

- `SiteShell`: cabecera, contenido y pie en columna con la altura mínima de la
  pantalla; el pie siempre abajo, scroll del documento. Export `./site-shell`.
- `Label` admite `size` (`sm`/`md` 14px, `lg` 16px); todos los fields con `size`
  se lo propagan a su etiqueta. `CheckboxField`, `RadioField` y `SwitcherField`
  escalan su etiqueta (`sm/lg-label-font-size`).
- `SiteHeader` responsive: por debajo de `md` barra 64 / marca 48
  (`content-height-compact`, `height-compact`); por debajo de `sm` barra 56 /
  marca 40 (`content-height-narrow`, `height-narrow`, `gap-narrow`). La marca de
  la ranura mide lo que la barra le da.

### Corregido

- El panel del `SiteHeader` solo desliza (cortina con `clip-path`), sin fundido.

## v17.1.0

### Añadido

- `DropdownField`, `LanguageSwitcher` y `ThemeSwitcher` admiten `size` (32/40/48).
- Foundations → Tallas: dónde va cada talla — superficies públicas a `lg`,
  interior de las aplicaciones a `md`.

## v17.0.1

### Corregido

- Paneles flotantes (menús, desplegables, popover, tooltip) sobre superficie
  oscura: borde blanco (`text.on-dark`), como el control que los abre; era un
  gris translúcido.

## v17.0.0

### BREAKING

- **`InputField` y `TextareaField` muestran la etiqueta por defecto**
  (`labelHidden` pasa de `true` a `false`, como `SelectField`). Con la etiqueta
  oculta y sin `placeholder`, la etiqueta sigue sirviendo de placeholder.
- **Placeholder en caja normal**: fuera los tokens `input.placeholder-text-transform`,
  `textarea.placeholder-text-transform` y sus pares `error-*`.
- `textarea.min-height` deja de ser un `15rem` suelto: se deriva de
  `textarea.rows` (4) × interlineado × cuerpo + aire + borde, por talla
  (`sm-min-height` / `min-height` / `lg-min-height`).

### Corregido

- Los ítems `radio` de los menús cierran el menú al elegir (`closeOnSelect`
  para dejarlo abierto); Base UI los dejaba abiertos.
- `SiteHeader`: elegir en un menú del panel (tema, idioma) ya no cierra el panel.

## v16.4.0

### Añadido

- `Logo size="xl"` (64px, la talla ilustrativa de la escala de iconos) y
  `MenuButton size="lg"` (48px con el glifo a 48).
- `SiteHeader`: `logoSize` (por defecto `xl`) y `menuButtonSize` (por defecto
  `lg`). La barra mide ahora el logotipo más el aire del sistema: **80px**
  (`site-header.content-height` → `logo.height-xl`); la de aplicación sigue en 56.

## v16.3.0

### Cambiado

- `LanguageSwitcher` compacto es un `DropdownField` (el mismo control que el
  selector de tema), con la etiqueta oculta por defecto (`labelHidden`, `id`).

## v16.2.0

### Cambiado

- **Los campos de texto miden la talla del sistema** (32/40/48), como Button y
  Select: `Input` y todo lo que hereda de él (`NumberInput`, `InputPhone`,
  `OtpInput`, `TimeSelect`, `DatePicker`, `MultiSelect`/`AsyncSelect`/
  `AsyncMultiSelect`, `PasswordField`) fijan `block-size` a la talla; fuera
  `input.padding-block`/`sm-`/`lg-padding-block`. Los triggers con píldoras usan
  `min-block-size` y solo crecen al envolver. `PasswordField`: botón cuadrado a
  la talla del campo. `control.padding-block` queda para lo multilínea.
- `Input`, `InputField`, `Textarea` y `TextareaField` revisados y definitivos
  (tests de altura, `aria-describedby`/`aria-invalid` desde el campo, docs).

## v16.1.1

### Corregido

- `AppRoot`: `children` opcional (puede ir como hermano antes del contenido).

## v16.1.0

### Añadido

- **`AppRoot`**: la raíz de cualquier sitio o app; pone el enlace de salto al
  contenido una vez por documento. `SiteHeader` y `AppHeader` **dejan de pintarlo**
  (fuera `skipLabel`/`skipHref` del SiteHeader); el `main` del `AppShell` es el
  destino (`#main-content`, `tabIndex=-1`).
- **`LegalFooter`**: el pie legal de las aplicaciones (enlaces legales, título
  opcional, `renderLink`, `Container`, `surface="dark"`).
- `SiteHeader`: `logo` (la marca del producto), `renderLogoLink` (router),
  `menuCloseLabel`; sin `children` ni `settings` no se pinta el botón de menú.
- `MenuButton` / `AppHeader`: `closeLabel` / `menuCloseLabel`.
- `ThemeSwitcher variant="icon"`: solo el icono del tema actual, para barras.
- `Pagination`: `mode="cursor"` (anterior/siguiente por `previousHref`/`nextHref`
  o `onPrevious`/`onNext`), `hrefs` precalculados y `pageCount`; `total`, `page` y
  `pageSize` pasan a opcionales.
- `EmptyState` reenvía atributos al contenedor (`role="status"`, `aria-live`).
- `ConversationThread` admite `children`: el producto monta las burbujas y el hilo
  pone contenedor, `role="log"` y autoscroll.

### Cambiado

- `SiteHeader` ya no acepta `skipLabel`/`skipHref` (ver `AppRoot`).

## v16.0.5

### Corregido

- `@base-ui-components/react` es externo del build (como react-hook-form y
  sonner): empaquetado arrastraba un shim CJS de `require` que Turbopack rechaza
  en desarrollo (`dynamic usage of require is not supported`).

## v16.0.4

### Corregido

- Exports `./container`, `./site-nav` y `./site-header` que faltaban en `package.json`.

## v16.0.3

### Corregido

- `Switcher` y `Checkbox`: el `id` va en el botón (Base UI lo daba al input
  oculto), así que `<label htmlFor>` nombra el control. Tests jsdom del contrato.

## v16.0.2

### Corregido

- `Switcher` y `Checkbox` renderizan un `<button>` nativo (Base UI ponía un
  `<span>`): un `<label htmlFor>` vuelve a nombrarlos y `disabled` es nativo.

## v16.0.1

### Corregido

- `Switcher` y `Checkbox`: `onCheckedChange` recibe solo el estado (Base UI
  añadía un segundo argumento con los detalles del evento).
- `Select`: el trigger resuelve la etiqueta de la opción elegida aunque los
  `Select.Item` vengan envueltos por un wrapper del producto.

## v16.0.0

Rediseño del sistema: Base UI como motor, doctrina de tokens cerrada (nada
inventado: todo referencia la escala), tallas de componente 32/40/48 en todos
los controles, y el shell de aplicación rehecho. Storybook es la verdad:
Foundations explica el sistema; cada componente definitivo documenta su API.

### BREAKING

- **Radix → Base UI** (`@base-ui-components/react`). `asChild` desaparece:
  `Button` y los primitivos usan `render`. `renderLink` de los menús debe
  reenviar TODAS las props inyectadas (`<Link {...props}>`).
- **Shell de aplicación**: `AppShell` exige `header` + `sidebar`; la sidebar tiene
  estado `open | rail | closed` y ancho redimensionable; en móvil es un cajón
  lateral que se cierra al navegar. `AppHeader` vive en todos los anchos
  (menú · `start` · `notifications` · `end`) y ya no admite `children`/`center`.
  `Sidebar` pierde `expanded`. `useAppShell()` cambia (`sidebar`, `setSidebar`,
  `toggleSidebar`, `closeSidebar`, `sidebarWidth`, `isDesktop`).
- **Menús**: `Menu` es la fuente (tipos `MenuItem`… y tokens `menu.*`);
  `ContextMenu` es `Menu` + `DotsButton` (`triggerAriaLabel` → `label`); fuera
  `context-menu.json` y `dots-button.json`. Ítems `radio` sin glifo: la elegida
  en énfasis.
- **Tallas**: `Avatar` y `Select` a 32/40/48 (`Avatar` pierde `xl`); `Button`,
  `Select` y `DotsButton` fijan altura por talla, sin `padding-block`. `Button`
  rectangular (`border-radius.default`) y ghost con relleno de marca en hover.
- **Tipografía**: la base viste `h1`–`h6`, `p` y `a`; `Heading`/`Paragraph` solo
  añaden modificadores. Fuera los pesos `extralight/regular/semibold/extrabold`
  y los alias `text.paragraph.*`. `Label` sin mayúsculas.
- **Tokens retirados**: `select.padding-block/icon-size/focus-ring-offset`,
  `site-header.settings-border-*`, `user-menu.avatar-size`/`initials-*`,
  `org-switcher.logo-*`/`initials-*`, `*-label-text-transform`, `link.color-hover`
  → `link.hover-color` (y `text-decoration-hover` → `hover-text-decoration`).

### Añadido

- Componentes: `Container`, `Logo`, `MenuButton`, `SkipLink`, `SiteHeader`,
  `SiteNav`, `LanguageSwitcher`, `ThemeSwitcher`, `DropdownField`,
  `NotificationButton`. `Icon` con `menu`/`close` compartiendo geometría con
  `MenuButton`.
- `Menu` con `openOnHover`; `SidebarNav` en rail (iconos, tooltips, grupos como
  menú con la portada de primer enlace); `OrgSwitcher block`/`compact`;
  `UserMenu compact`; `Select` con `aria-describedby`/`aria-invalid`;
  `SelectField` enlaza ayuda y error; `VisuallyHidden` reenvía `ref` y props.
- Foundations completas (colores, tipografía, espaciado, tallas, bordes, radio,
  sombras, opacidad, movimiento, puntos de ruptura, capas, iconografía);
  `z-index.*`, `size-component.*`, `font-size.0` (cifras de marcas).

## v15.0.0

### BREAKING

- **Reset global `box-sizing: border-box`** (`*`, `*::before`, `*::after`). Antes
  brand dejaba el `content-box` del navegador y cada consumidor escribía su propio
  reset. Si una app ya lo tenía, no nota nada; si no lo tenía, cualquier regla que
  combine `width`/`inline-size` con `padding` cambia de caja.
- **`html { color-scheme: light dark }`** (antes `light`). Los controles nativos y
  las barras de scroll pasan a seguir el tema.

### Añadido

- **Lienzo de página emparejado**: `body` fija ahora `background-color` además del
  color de texto, con tokens `--text-background` / `--text-color` y sus pares
  `surface-dark-*`. El modo oscuro del canvas llega solo con `.surface-dark`,
  `[data-theme="dark"]` o `html.dark`; ya no hace falta que cada app lo repita.
- **Subpartes componibles de Card**: `CardHeader`, `CardTitle`, `CardDescription`,
  `CardAction`, `CardContent` y `CardFooter`, con BEM propio (`.card__*`) y tokens
  `--card-header-gap`, `--card-title-font-weight`, `--card-footer-gap`. Eran divs
  sin estilar y cinco apps de la suite repetían su maquetación.

## v14.0.4

### Corregido

- **`'use client'` vuelve a la primera línea de todos los bundles.** En `dist/avatar.js` la
  directiva quedaba detrás del `import './avatar.css'` que inyecta el post-build, y Next la
  rechaza ("The 'use client' directive must be placed before other expressions"), rompiendo el
  build de cualquier consumidor que llegara a `Avatar` (p. ej. vía `review-carousel`). El
  post-build ahora arranca cualquier directiva que el bundler haya dejado dentro del fichero y la
  repone él mismo en la línea 1, de modo que un entry con `'use client'` en el fuente ya no
  depende de estar apuntado a mano en `clientComponents` — `avatar` se apunta igualmente.

## v14.0.3

Solo documentación: este fichero estrena las entradas de la serie `v14`.

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
