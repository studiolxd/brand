# Revisión del DS — pendientes por componente

Lo que se detecta al revisar fundamentos y hay que corregir cuando cada
componente salga de `Por revisar`. Se tacha al hacerlo.

## `grey-lightest` deja de ser fondo de estado (Colores, 2026-08-25)

Decisión: **el gris claro NO es el fondo de hover / activo / deshabilitado del
sistema.** Queda solo como superficie clara secundaria (código, kbd, burbujas,
pie de tabla). Cómo se representa cada estado se decide componente a
componente al revisarlo — no con un gris de fondo por defecto. Hoy lo usan así
36 tokens; van cayendo con la revisión:

- [x] **Cerrado (2026-08-28, fase 0).** Ya no se decide componente a
      componente: la regla general está en Foundations → Colores, «Estados:
      nada se rellena». Ningún componente pinta relleno en hover ni en activo
      —ni gris ni de marca—; el foco lleva el anillo del sistema, el hover una
      línea de tinta y el activo una barra de tinta con peso `emphasis`. La
      única excepción es `Button` (el relleno es el lenguaje de sus variantes,
      y `ghost` conserva su tinta suave) y el **valor elegido** (día del
      `Calendar`, pestaña activa de `Tabs` pill), que no es un estado.
- [x] hover de ítem: ContextMenu, UserMenu, OrgSwitcher, SidebarNav,
      ConversationList, DotsButton, NumberInput, Menu, Table, Tabs,
      AppLauncher, Calendar, CalendarPlanner, CommandPalette, Select,
      MultiSelect, InputPhone
- [x] activo: OrgSwitcher, ConversationList, AppLauncher, SidebarNav
- [x] deshabilitado: Button, Input, Textarea — se quedan en `grey-lightest`, y
      es deliberado: un control apagado no reacciona a nada, es una superficie
      muerta. Documentado en Foundations → Colores.
- [x] celdas de calendario: fin de semana, no laborable, fuera de mes
      (2026-08-27, tanda 6) — `calendar-planner.cell-outside-bg` y las tres de
      `calendar-roster` (`cell-weekend-bg`, `cell-holiday-bg`,
      `cell-non-working-bg`) apuntan al rol `color.surface.secondary-on-light|dark`.
      Las tres del cuadrante comparten valor a propósito: lo que separa festivo,
      fin de semana y no laborable es el chip que los nombra, no tres grises vecinos.

## Texto gris sobre `grey-lightest` (Colores, 2026-08-25)

Regla cerrada (Foundations/Colores → "Los grises de texto"):

1. **Todo texto va en prusia o `grey-darkest`** (AAA en blanco y en el gris de
   estado). El placeholder también: `text.placeholder-on-light` → grey-darkest.
2. **`grey-dark` no es texto**: solo iconos de acción secundarios y controles
   deshabilitados.

Con el gris claro fuera de los estados, el problema "gris sobre gris" deja de
existir por diseño; lo que queda es corregir los textos que aún usan grey-dark.

- [x] **ConversationList** — hecho (2026-08-27): `item-color` pasa a
      `text-muted-on-light` y `item-active-bg` (gris, y además huérfano) se
      retira. El estado bajo el puntero se resuelve invirtiendo, como en el
      `SidebarNav`; la conversación abierta, con tinta y peso.
- [x] **EmptyState** — `title-color` y `description-color` eran grey-dark: es
      texto → `color.text.muted-on-light` (grey-darkest), con par
      `muted-on-dark` nuevo (2026-08-27). (`icon-color` se queda: icono.)
- [x] **Tabs** — `trigger-color` (grey-dark) era texto → `color.text.muted-on-light` (2026-08-27).
- [x] **Table** — hecho (2026-08-27): `sort-icon-color` pasa a
      `text.muted-on-light` y `header-hover-bg` (huérfano, nunca usado) se
      retira. El hover de una columna ordenable no pinta fondo: lleva el icono
      de su opacidad en reposo al color activo. El hover de fila se invierte
      como en Menu/SidebarNav y `footer-bg` pasa al rol
      `surface.secondary-on-light`.
- [ ] **Modal** — `close-color` (grey-dark) sobre `close-hover-bg`
      (grey-lightest). Ídem, icono.
- [ ] **Table** — `sort-icon-color` (grey-dark) sobre `header-hover-bg`
      (grey-lightest). Icono: pasa a 3:1, pero rompe la regla.
- [x] **Modal** — resuelto (2026-08-27, tanda 3): el aspa pasa a `Button ghost`
      `sm` `iconOnly` (precedente de `Alert`/`Toast`); `close-color`,
      `close-hover-color` y `close-hover-bg` se retiran del JSON.
- [x] **Calendar / CalendarPlanner / CalendarRoster** (2026-08-27, tanda 6) —
      `calendar.outside-color` → `color.text.muted-on-light` (grey-darkest) con
      par `muted-on-dark`; el número fuera de mes del planificador hereda de él.
      `disabled-color` se queda en grey-dark: deshabilitado, exento.
- [x] **Input / Textarea / MultiSelect / CommandPalette** — placeholder.
      Resuelto en tokens: `text.placeholder-on-light|dark` (grey-darkest /
      grey-light), y fuera los `surface-dark-placeholder-color` que lo
      remapeaban a mano. Queda por ver en cada componente si el placeholder
      debe ocultarse en deshabilitado.
- [x] **FileUpload** (2026-08-28) — la miniatura se queda en `grey-dark` sobre
      `grey-lightest` en superficie clara (es un icono, le basta 3:1), pero
      estrena par oscuro: sobre prusia ese gris no llega, así que
      `surface-dark-thumb-icon-color` es el gris de texto secundario.

## Deudas de capa detectadas en neutrales (Colores, 2026-08-25)

- [ ] **`grey-lightest` no tiene rol semántico.** Sus 36 usos referencian el
      primitivo directamente. Al revisar neutrales, darle un rol
      (`background.subtle` / fondo de estado) y que los componentes apunten a él.
      Parcial (2026-08-27): `surface.secondary-on-light|dark` ya cubre los
      cuatro usos como superficie clara secundaria (`kbd.bg`,
      `progress-bar.track-bg`, `code-block`, `tag.neutral-bg` con
      `surface.inverse-*`); quedan los usos como fondo de estado (hover/activo/
      deshabilitado), que es una decisión de diseño distinta (ver más abajo).
- [ ] **16 `var(--color-grey-*)` directos en CSS de componentes** (Table,
      Sidebar, campos…), saltándose el token de componente. Criterio de
      revisión: todo color en CSS pasa por un token propio del componente.

## Tipografía (2026-08-25)

- [ ] **HighlightSection** — usa `{content.measure}` como ancho de maqueta
      (`max-width`). La medida es de prosa, no de layout: pasar a
      `container.max-width-*` cuando se revise.
- [ ] **NumberBadge** — `font-weight` apuntaba a `semibold` (600), único uso
      fuera de los dos roles; ya repuntado a `emphasis`. Comprobar visualmente
      al revisar.
- [ ] Comprobar en el smoke (hub, tema oscuro, pantalla 1×) que el cuerpo a
      300 sobre prusia se lee; si no, valorar `text-on-dark` a 400.

## Espaciado (2026-08-25)

Regla: el mínimo de la escala es 4px; 2, 6 y 10px no existen en el sistema.

- [ ] **ReviewCarousel** — `ReviewCarousel.css:60` usa `var(--section-spacing-md)`,
      token inexistente: el margen se descarta. Debe ser
      `--section-padding-block-md`.
- [ ] **UserMenu** — `--number-badge-padding-inline: 0.125rem` (2px) y un
      `gap: 0.125rem` → `spacing-1`.
- [x] **FileUpload** (2026-08-28) — el borde discontinuo saca sus dos medidas
      a tokens (`border-dash-length` = `spacing.4`, `border-dash-gap` =
      `spacing.2`, antes 16px/10px) y el `gap: 0.125rem` entre nombre y peso
      pasa a `item-info-gap` (`spacing.1`). También salen de crudo el
      `outline-offset: 2px` y el `border-radius: 2px` del aspa.
- [x] **Table** — `gap: 0.375rem` (6px) → `spacing-2`, en el token propio
      `table.header-content-gap` (2026-08-27).

## Tallas de componente (2026-08-25)

Regla: tres tallas (32/40/48). Los controles de una línea fijan su altura a la
talla; los elementos cuadrados toman su lado de ella. No existe nada por debajo
de 32px como control.

- [x] **Button** — hecho (2026-08-25): `--button-height` / `sm-height` / `lg-height`
      a la talla, `padding-block` retirado, icon-only = lado a la talla.
- [x] **Select** — hecho (2026-08-26): `--select-height/sm/lg` a la talla, sin
      `padding-block`; SelectField enlaza ayuda/error por `aria-describedby`.
- [x] **Input / DatePicker / OtpInput / InputPhone / TimeSelect /
      MultiSelect / AsyncSelect** — hecho (2026-08-26): `input.height/sm/lg`
      y `multi-select.height/sm/lg` a `size-component.*`, `padding-block: 0`,
      fuera los `padding-block`/`sm-`/`lg-padding-block` de `input`,
      `number-input` y `multi-select`. Miden 32/40/48 con test de story:
      Input, NumberInput, InputPhone, OtpInput, MultiSelect, AsyncSelect,
      AsyncMultiSelect, DatePicker y PasswordField (TimeSelect compone Select,
      que ya medía). Los dos triggers con pills (MultiSelect,
      AsyncMultiSelect) usan `min-block-size`: miden la talla exacta con una
      línea y crecen solo si las pills envuelven.
      `control.height` sigue consumiéndose solo desde `dropdown-field`; los
      campos apuntan a `size-component.*` directamente, como Button y Select.
- [x] **Hamburger** → rehecho como `MenuButton` a talla (40/32), barras 1px.
- [x] **Kbd** — resuelto de otra forma (2026-08-27): el ancho mínimo del keycap no
      es una talla de componente (no es un control ni un cuadrado de una fila de
      controles, es una marca dentro del texto). Los tres números sueltos
      (1.5 / 1.75 / 2.25rem) se van: `min-size` sale ahora de la fórmula
      `cuerpo × interlineado + 2 × aire + 2 × borde`, igual que
      `textarea.min-height`, así una tecla de un carácter es cuadrada en las
      tres tallas (24 / 26 / 38px). **Decidido (2026-08-27): se queda así.** Un
      keycap es una marca dentro del texto, no un control de una fila de
      formulario, y a 32px sería más alto que el renglón que lo rodea; además
      `sm` y `md` colapsarían en la misma medida. Documentado en Kbd → «Medida».
- [x] **UserMenu** avatar, **OrgSwitcher** logo y **SidebarNav** icono → `sm`
      (2026-08-25; Avatar entero a tallas 32/40/48, sin `xl`).
- [x] **DotsButton** → Button ghost iconOnly a talla (32/40/48), sin tokens propios (2026-08-26).
- [x] **AppLauncher** trigger y tile-icon 2.5rem → `size-component.md` (2026-08-27, mismo valor).
- [x] Pasan a token sin cambiar de tamaño: **FileUpload** miniatura 2.5rem →
      `{size-component.md}` (2026-08-28). **DotsButton** ya no tiene tokens
      propios desde que es `Button ghost iconOnly`.
- [x] **EmptyState** icono 3rem → `icon.size-lg` (2026-08-27, mismo valor 48px). `icon-size-sm` (2rem)
      queda crudo: no hay un `icon.size-*` que valga 32px (16/24/48); anotado para decisión de diseño.
- [x] **PasswordField** toggle 2.5rem → `size-component.md`, con
      `sm-`/`lg-toggle-size` para que el botón siga siendo cuadrado a la talla
      del campo; el icono pasa de `1.125rem` crudo a `icon.size-sm` (18 → 16px),
      y el hueco a su derecha (`input-padding-inline-end`, antes `3rem`) es
      ahora el propio ancho del toggle.
- [ ] **Carousel** — botones a 4rem (64px): bajar a `lg` o justificar.
- [ ] **Checkbox / Radio** — sus `sm-size`/`lg-size` (1rem / 1.5rem) no son
      tallas de componente: son marcas. Se quedan como tokens propios.
- [x] **AppHeader** / **SiteHeader** — la altura ya no es un número propio:
      `calc(content-height md + 2 × spacing.2)` = 56px, compuesto en tokens.

## Campos de texto — deudas detectadas al pasarlos a definitivos (2026-08-26)

- [x] **Placeholder en caja normal** (2026-08-26). El placeholder es texto,
      como el `Label`: fuera los cuatro tokens `*-placeholder-text-transform`
      de `input` y `textarea` y la propiedad en el CSS de `Input`, `Textarea`,
      `DatePicker` (trigger en placeholder) e `InputPhone` (los cuatro
      consumían el token del `input`). Ningún otro campo transformaba la caja
      del placeholder. Test de story en Input y Textarea.
- [x] **`textarea.min-height` derivado** (2026-08-26). Fuera el `15rem`
      suelto: `min-height = rows × line-height × font-size + 2 ×
      padding-block + 2 × border-width`, con `textarea.rows: 4` (cuatro
      líneas: dos no se distinguen de un campo de una línea, cinco se comen
      media pantalla en móvil). md 130px, y `sm-min-height` / `lg-min-height`
      resuelven la misma fórmula con su cuerpo y su aire (102 / 170px) —
      hacen falta como tokens propios porque las custom properties se
      sustituyen en `:root` y no ven el remapeo de la talla. Un `rows` por
      encima de 4 ya se nota; test de story con las tres medidas.
- [ ] **`control.padding-block`** ya no lo usa ningún control de una línea:
      queda para `Textarea` (multilínea) y para el aire de las filas del
      `Form` y de los campos de casilla (CheckboxField, RadioField,
      SwitcherField). Si esos se revisan y dejan de usarlo, el token se va.
- [x] **`InputField` y `TextareaField` muestran la etiqueta por defecto**
      (2026-08-26): `labelHidden = false`, como `SelectField`. Breaking, va en
      v17.0.0. `labelHidden` sigue existiendo; con la etiqueta oculta y sin
      `placeholder` propio se mantiene el préstamo del texto de la etiqueta
      como placeholder (si no, el control se queda sin pista visible; el
      nombre accesible lo sigue poniendo la etiqueta). Dentro del DS,
      `ContactSection` y `Footer` ya pasaban `labelHidden` explícito y no
      cambian; `LoginForm` no lo pasaba y ahora enseña sus dos etiquetas.

## Bordes y radio (2026-08-25)

Reglas: todo borde 1px (`border-width.default`); 2px solo para el anillo de
foco (`border-width.focus`). Toda esquina recta (`border-radius.default` = 0);
solo píldoras y círculos usan `border-radius.round`. Los tokens ya apuntan a
roles; lo que queda es comprobar visualmente cada componente al revisarlo.

- [x] **Table** — `header-border-width` y `footer-border-width` ya estaban en
      `border-width.default` (1px) en el JSON; comprobado en Storybook que la
      cabecera se sigue leyendo por peso (2026-08-27).
- [x] **Tabs** — `trigger-indicator-width` ya estaba en `border-width.default`
      (1px) en el JSON; comprobado visualmente en Storybook (2026-08-27).
- [x] **Spinner** — el grosor (2/2/3px) es ahora el `stroke-width` del cuadrado
      de contorno, en `spinner.border-width-*` (2026-08-27). Sigue crudo en el JSON.
- [x] **RadioField** — el `offset` de 3px se retiró (2026-08-27): la marca se
      alinea con la primera línea derivando `(altura de línea × cuerpo − lado
      del radio) / 2`, sin número suelto.
- [ ] **CheckboxField** — sigue con `checkbox-offset: 3px`: espaciado fuera de
      escala (mínimo 4px). El `chip-padding-block` de 2px de **CalendarRoster**
      se cerró en la tanda 6: era el padding del botón de navegación a mano, y
      se fue con él al pasar la banda de mes a `PrevNextNav`.
- [x] Componentes que pasan de 4px a esquina recta (29 usos, ya repuntados):
      AppLauncher, Avatar (variante cuadrada), Calendar, CalendarPlanner,
      CalendarRoster, CommandPalette, ContextMenu, ConversationList,
      FileUpload, ImageCropDialog, Kbd, MessageBubble, OrgSwitcher,
      Pagination, SidebarNav, Skeleton, Tabs, Tooltip, UserMenu, Alert,
      Toast, Modal, Sheet. Comprobar que ninguno dependía del radio para
      leerse (chips, burbujas). **Cerrado (2026-08-29):** verificado que
      `border-radius.default` (el único rol al que apuntan todos estos
      tokens) resuelve a `{border-radius.none}` = `0px` en todo el sistema —
      no queda ningún `4px` crudo ni referencia a la escala en
      `tokens/component/**`/`tokens/molecule/**`. Nada dependía del radio
      para leerse.

## Sombras (2026-08-25)

Regla: nada proyecta sombra (`shadow.default` = none). La elevación es fondo +
borde 1px (+ velo en modales). Ya repuntado en tokens; al revisar cada uno,
comprobar que sigue separándose de lo que tiene debajo:

- [x] **Modal** (tenía `xl`) — hecho (2026-08-27, tanda 3): el velo hace el
      trabajo en claro (`border-color: transparent`); en `surface-dark` el
      panel lleva borde 1px blanco (`surface-dark-border-color`) que lo
      separa del velo, también oscuro.
- [x] **Toast** (tenía `lg`) — hecho (2026-08-27): fuera el token `toast.shadow`;
      el borde es el del `Alert` (1px, blanco en el neutro), que separa el aviso
      del contenido sobre el que flota en claro y en oscuro.
- [x] **Sidebar** y **AppHeader** (sombra cruda) — barra fija sobre
      contenido que hace scroll: sustituir por borde inferior/derecho 1px.
      **Cerrado (2026-08-29):** Sidebar ya usaba `border-inline-end` real
      (el `box-shadow: none` que quedaba era el reset de subrayado del
      logo-enlace, no la barra). AppHeader seguía dibujando la línea con
      `box-shadow: 0 var(--app-header-border-width) 0 var(--app-header-border-color)`
      (comentario: "así la altura sigue siendo la compuesta") — pasado a
      `border-block-end: var(--app-header-border-width) solid var(--app-header-border-color)`
      real, sin token nuevo.
- [x] **Kbd** — el relieve lo daba el borde, no la sombra: el token
      `kbd.shadow` (huérfano, ya en `none`) se retira y el CSS deja de
      declarar `box-shadow` (2026-08-27).
- [x] **Header** (Por revisar) — misma sombra cruda que AppHeader.
      **Cerrado (2026-08-29):** no existe ya un componente `Header` separado
      — el catálogo solo tiene `AppHeader` y `SiteHeader` (ninguno con
      `title: 'Por revisar/...'`); referencia obsoleta de una fase anterior.
      `SiteHeader` no dibuja ninguna sombra/borde inferior propio (los
      `box-shadow: none` de su CSS son el mismo reset de subrayado del logo).

## Movimiento (2026-08-25)

Regla: ninguna duración va escrita a mano (reduced-motion las anula todas vía
token). Curvas `in` y `linear` declaradas sin uso.

- [ ] **Spinner** — `animation-duration` ahora 1000ms (un ciclo de dibujo del
      contorno, 2026-08-27). Sigue siendo token propio crudo: un bucle no es una
      transición; decidir si merece un token de motion.
- [x] Transiciones con ms a mano en CSS (2026-08-28) — barrido completo con
      `grep -rnE '[0-9]+ms' src/stories/**/*.css`: cero ms crudos fuera de
      comentarios, y cero `calc(var(--…) * 1ms)` en todo `src/`. **CardSplit**
      ya no existe (fusionado en `Card`, sin transiciones). **Table** y
      **Modal** toman `var(--table-transition-duration)` /
      `var(--modal-transition-duration)` directos, sin `calc`, resueltos a
      `{motion.duration.fast|base}`. **Tooltip** ya arreglado (resuelve a
      `{floating-panel.transition-duration}` directo). Sin código pendiente;
      **Popover**/**AppLauncher**/**Skeleton** ya cerrados (2026-08-27, ver
      arriba).

## Capas (2026-08-25)

Escala nueva `z-index.{bar,backdrop,modal,floating,toast,skip}` (100–600); ya
repuntados AppHeader, floating-panel, Select, InputPhone, Modal, Toast,
ContextMenu (tenía 50 crudo en CSS), SkipLink (9999 crudo) y el Header viejo.

- [ ] **Sidebar** — comprobar que su capa es `bar` (no define z-index en
      tokens; ver si el CSS lo fija).
- [ ] z-index locales 1–3 en CardSquare, CardSplit, CalendarRoster, Carousel:
      correctos (apilado interno), sin token. Verificar que ninguno se sale
      de su contexto de apilamiento.

## Iconografía (2026-08-25)

- [x] `icon.size-sm` (2026-08-28) — verificado: el token ya vale `16px` en
      `tokens/component/icon.json` (a la retícula de 4) desde el rediseño
      (commit `9e51db5`); no queda ningún `18px`/`1.125rem` crudo en `src/` ni
      `tokens/`. Auditados los ~18 usos de `<Icon size="sm">` (AppShell nav,
      CodeBlock, Alert, Toast, ThemeSwitcher, UserMenu, OrgSwitcher,
      SidebarNav, DropdownField, Modal, Sheet, Link): todos toman el tamaño de
      `.icon--sm { --icon-size: var(--icon-size-sm) }`, sin contenedor de
      ancho/alto fijo que asumiera 18px — nada dependía del valor anterior.
      Table usa `size="xs"` en su icono de orden, no `sm`; Button y Tag no
      montan `<Icon>` con talla propia. Sin cambios de código; ítem cerrado.
- [x] **EmptyState** — usaba `xl` (64) en stories y `lg` (48) en el token
      `icon-size` crudo (3rem): unificado, stories a `size="lg"` y token a
      `{icon.size-lg}` (2026-08-27).

## Logo y MenuButton (2026-08-25) — hechos

- [x] **Logo** — `size` por tallas (32/40/48), sin `width`/`height` ni `dark`;
      color por token con par oscuro. Consumidores actualizados: Sidebar,
      AppShell, Footer (`lg`), LoginForm (`md`), templates.
- [x] **MenuButton** (antes Hamburger) — cuadrado a talla, barras 1px del
      borde, movimiento por tokens, label "Menú". Header viejo repuntado.

## SkipLink (2026-08-25) — hecho

- [x] Tokens propios (bg, color, aire, foco, capa) con par oscuro; compone
      `visually-hidden` en vez de duplicar la receta; `href` con `#`.
- [x] **AppShell** (2026-08-28) — ya tenía `<main id="main-content" tabIndex={-1}>`;
      ahora también monta `SkipLink` (prop `skipLabel`, default «Saltar al
      contenido principal») como primer elemento del árbol, mismo patrón que
      `AppRoot`. La app con sesión ya tiene salto al contenido.
- [ ] **hub** (`app/[locale]/layout.tsx`) lleva su propio `<a class="slot-skip-link">`
      → desaparece al migrar a `SiteHeader` (público) y `AppShell` (app).

## Base UI (2026-08-25) — migración hecha

Todo el DS corre sobre `@base-ui-components/react`; `@radix-ui/*` ya no está en
`src/` ni en `package.json`.

- [x] **cmdk (CommandPalette)** — resuelto en v24.11.0: la paleta se reescribió
      sobre `Modal` (Base UI Dialog) + `Autocomplete` de Base UI en modo
      `inline`; `cmdk` fuera de `dependencies` y cero Radix en
      `dist/command-palette.js`.
- [x] **Modal / Sheet** con título oculto: `VisuallyHidden` ya reenvía `ref` y
      props (2026-08-25), el `aria-labelledby` enlaza.
- [x] z-index de los popups en el `Positioner` (`<bloque>__positioner`), no en
      el Popup: Menu, ContextMenu, UserMenu, OrgSwitcher, Popover, Tooltip,
      AppLauncher, MultiSelect, Select, InputPhone, AsyncSelect/AsyncMultiSelect.
- [x] `renderLink` de los menús reenvía las props inyectadas (rol, tabIndex,
      teclado): sin ello los ítems `link` no eran `menuitem`. Test en Menu.
- [ ] `Switcher`: el `value` se conserva escribiendo sobre el input oculto;
      `Accordion collapsible={false}` emulado en el wrapper (sin story que lo use).

## Definitivos 2026-08-25 (segunda tanda)

Label, VisuallyHidden, Avatar, NumberBadge, UserMenu, OrgSwitcher, SidebarNav,
DropdownField (nuevo). Derivados pendientes:

- [ ] **ReviewCarousel** usaba `Avatar size="xl"` (120px): ahora `lg` (48px).
      Al revisarlo, decidir si el retrato de la reseña lleva un token propio.
- [x] **AppHeader.css** ya no estila UserMenu/OrgSwitcher: `UserMenu compact`
      y `OrgSwitcher block` (2026-08-26).

## Select / SelectField definitivos (2026-08-26) — derivados

- [x] **MultiSelect / AsyncSelect / AsyncMultiSelect** — hecho (2026-08-27):
      fuera `multi-select.icon-size` (0.625rem crudo) y `focus-ring-offset`
      (-3px crudo). El chevron toma su talla del `Icon` como en el Select, el
      offset del foco sale de un `calc` y el aire hasta el chevron es
      `content-gap`.

## Input / InputField / Textarea / TextareaField definitivos (2026-08-26)

- [x] Salen de `Por revisar/`: `Atoms/Input`, `Atoms/Textarea`,
      `Molecules/InputField`, `Molecules/TextareaField`.
- [x] Stories en castellano con test de contrato: altura 32/40/48 medida en
      Input e InputField; en Textarea, que la altura la manda el contenido y no
      la talla; `aria-describedby` / `aria-invalid` enlazados desde el campo,
      como en `SelectField`.
- [x] MDX con API, tallas, estados, superficie oscura y accesibilidad; tablas
      de tokens por grupo (`textareaSizeTokens` nuevo).
- [x] Un `errorMessage` implica estado de error en los dos campos (antes solo
      lo hacía la prop `error`, al revés que `SelectField`).
- [x] `InputFieldProps` y `TextareaFieldProps` se exportan desde `src/index.ts`.

## Menús: Menu es la fuente (2026-08-26)

- [x] Tipos de ítem (`MenuItem`, `MenuRenderLinkProps`…) viven en
      `_shared/dropdownItems` y los exporta `Menu`; `ContextMenuItem` es alias.
- [x] Tokens: `menu.*` tiene los valores; `context-menu.json` eliminado;
      user-menu, org-switcher y command-palette referencian `menu.*`.
- [x] `ContextMenu` = `Menu` con `DotsButton`; sin CSS ni tokens propios.
      Prop `triggerAriaLabel` → `label`.
- [x] `Button` ghost: hover/active con relleno de marca (fuera grey-lightest);
      icon-only sm/lg eran rectangulares (el padding de talla ganaba): arreglado.
- [ ] Consumidores en slxd al subir el pin: `triggerAriaLabel` → `label` en
      ContextMenu si alguno lo usa; los tipos `ContextMenu*Item` → `Menu*Item`.

## Shell de aplicación rehecho (2026-08-26)

`AppShell` (barra + sidebar + contenido, estado `open|rail|closed` + ancho por
contexto), `AppHeader` en todos los anchos (menú · start · notificaciones ·
cuenta), `Sidebar` (columna redimensionable con asa accesible; rail; cajón
lateral en móvil que se cierra al navegar), `SidebarNav` en rail (iconos,
tooltips, grupos como menú con flyout en hover y la portada como primer
enlace), `Menu` con `openOnHover`, `OrgSwitcher compact` por contexto.

Al subir el pin, los `AppShell.tsx` de hub, bricks y lmsmarketplace cambian:
- `AppShell` exige `header` + `sidebar`; ya no hay panel móvil con el nav
  duplicado (`AppHeader` no admite `children` ni `center`).
- `Sidebar`: fuera `expanded`; `OrgSwitcher block`, `UserMenu compact` en la barra.
- `useAppShell()`: `setMenuOpen` → `closeSidebar()` / `setSidebar()`; el
  `MobileMenuCloser` ya no hace falta (la sidebar se cierra al navegar).
- Entradas de primer nivel del `SidebarNav` con `icon` para que el rail tenga
  glifo (sin él, la inicial).
- [ ] `Logo`: en rail se oculta; valorar una marca cuadrada para el rail.

## Integración v16 (2026-08-26) — hecho

Suite (10 apps) y web en `brand#v16.0.5`; typecheck, lint y tests en verde
(único fallo: `bricks zip-parser` zip-bomb, flaky bajo carga, pasa aislado;
ajeno al DS). Parches sacados por la integración: v16.0.1 (onCheckedChange
1 arg; etiquetas de Select a través de wrappers), v16.0.2/3 (Switcher y
Checkbox como <button> nativo con id), v16.0.4 (exports container/site-nav/
site-header), v16.0.5 (Base UI externo del build).

- [ ] Web: `SiteNav` con un único grupo cuya cabecera repite «Navegación
      principal»; decidir estructura real del índice (secciones) con contenido.
- [ ] Web: sin tema oscuro todavía; cuando lo haya, `ThemeSwitcher` en `settings`.
- [ ] Apps: el `NotificationButton` no se usa aún (el hub lleva la campana en
      el menú de usuario); cablearlo en `notifications` del shell.

## Los 14 campos a definitivos (2026-08-27)

Salen de `Por revisar/` los doce campos que quedaban —RadioField,
SwitcherField, NumberInputField, InputPhoneField, OtpField, FileUploadField,
MultiSelectField, AsyncSelectField, AsyncMultiSelectField, DatePickerField,
DateTimeField, TimeField— más la revisión de contrato de SelectField y
DropdownField, y los átomos que llevan: Radio, Switcher, Select, NumberInput,
InputPhone, OtpInput, FileUpload, MultiSelect, AsyncSelect, AsyncMultiSelect,
TimeSelect y DatePicker.

- [x] Contrato común: `id` (con `useId` si falta), `label` + `labelHidden`,
      `helperText`, `error` + `errorMessage` (un mensaje ya implica error),
      `aria-describedby` / `aria-invalid`, `className` al contenedor,
      `forwardRef` y `name`.
- [x] Cada campo con story `Contrato` (`!dev`, con `play`), story de tallas y
      story `ConReactHookForm` visible, montada con `FormProvider` + `FormField`
      reales y un resolver que falla.
- [x] MDX al día en los catorce (nuevos: SwitcherField, NumberInputField,
      OtpField, FileUploadField, MultiSelectField, AsyncSelectField,
      AsyncMultiSelectField, DatePickerField, DateTimeField, TimeField).
- [x] El error lo marca el **control**, no el campo: `.select[aria-invalid]`,
      `radio--error`, `switcher--error`, `multi-select--error` y hermanos.
      Fuera los tokens que lo duplicaban (`select-field.error.border-color`,
      `time-select.error-border-color`).
- [x] Tokens propios para InputPhoneField, OtpField, AsyncSelectField y
      AsyncMultiSelectField: dejan de tomar prestados los de `input-field` y
      `multi-select-field`.

Quedan con dudas, anotadas al cerrarlo:

- [x] **CheckboxField** (2026-08-28) — al contrato de campo de los otros 14
      fields: `forwardRef` (al disparador de Base UI), `helperText`,
      `error`/`errorMessage` (con `aria-describedby`/`aria-invalid`, borde
      `checkbox--error` nuevo en el átomo), `className` en el contenedor y
      tipografía `{text.*}` (antes `font-size.2` crudo, un peldaño por debajo
      del `RadioField` en la superficie pública). Mismo patrón que
      `SwitcherField`.
- [x] **AsyncSelect / AsyncMultiSelect** (2026-08-28, fase 0) — ya tienen
      tokens propios: `tokens/component/async-select.json` y
      `async-multi-select.json`. Cada token apunta por defecto al del `Select` /
      `MultiSelect`, así que la cara sigue siendo la misma, pero ahora es una
      referencia declarada y no un préstamo de variable en el CSS. Estrenan
      además lo que solo tiene un buscador —`loading-*`, `empty-*` y
      `item-selected-font-weight` (antes `--font-weight-bold` crudo)— y MDX
      propio con las tres TokenTable.
- [x] **FileUpload** (2026-08-28, fase 0) — tiene las tres tallas, por
      `useFormSize` como el resto de controles. La zona de arrastre no es un
      control de una línea, así que **no** toma 32/40/48: lo que sigue a la
      talla es su aire (32/48/64), el cuerpo de su texto (peldaño de párrafo
      pequeño / cuerpo / grande) y el icono. La miniatura de cada archivo sí
      toma la talla exacta —32/40/48—, porque la fila de un archivo es una fila
      de control; de paso, `thumb-size` deja el `2.5rem` suelto por
      `{size-component.md}` (mismo valor). MDX nuevo en el átomo.
- [x] **DatePicker / DateTimeField** (2026-08-28) — el input oculto que monta
      `name` construía `yyyy-mm-dd` con `toISOString().slice(0, 10)` (UTC):
      desplazaba un día en husos al este del meridiano a horas tempranas.
      Nuevo helper `toLocalDateInputValue` en `DatePicker.tsx` usa
      `getFullYear`/`getMonth`/`getDate` (huso local); `DateTimeField` hereda
      el arreglo al reenviar `name` al `DatePicker`. Test —
      `DatePicker.stories.tsx` › «Test — input oculto en fecha local, no UTC».

## Alert y CodeBlock definitivos (2026-08-27)

Salen de `Por revisar/`: `Molecules/Alert` y `Molecules/CodeBlock`.

- [x] **Alert** — rol ARIA por intención (`alert` en error/warning, `status` en
      default/success, forzable con la prop `role`); el aspa pasa a `Button`
      ghost `sm` iconOnly (fuera el `rgba(255,255,255,.15)` y el
      `color-mix(… 8%)` cableados, más los tokens `close-color`,
      `close-hover-color` y `warning-close-*`); `closeLabel` como prop;
      interlineados 1.4 sueltos a `title-line-height` / `description-line-height`;
      `--spacing-*` sueltos del CSS a `alert.gap` / `content-gap` / `close-inset`;
      `border-color` a blanco y fuera `surface-dark-bg` / `surface-dark-border-color`
      (la raíz ya lleva `.surface-dark`, así que los valores claros nunca se
      aplicaban). Radio ya recto. Test de componente y stories de contrato.
- [x] **CodeBlock** — el `<pre>` con scroll es `role="region"` focalizable con
      nombre (`codeLabel`) y anillo de foco propio (`focus-ring-*`); el copiado
      se anuncia por `role="status"` en vez de renombrar el botón bajo el foco;
      portapapeles que falla capturado; fuera el token `shadow`. El `grey-lightest`
      del fondo se queda: es la excepción documentada (superficie clara
      secundaria), no un fondo de estado.

Decisiones pendientes que salen de esta revisión:

- [x] **`Alert` y `Toast` son el mismo objeto con distinta vida.** Resuelto
      (2026-08-27): comparten la cara. El toast monta las clases del `Alert`
      (`alert`, `alert--<intención>`, `alert__title`, `alert__description`) y su
      juego de tokens; `toast.*` se queda solo con la capa, la posición, el
      apilado y el movimiento de entrada/salida.
- [x] **El relleno `default` de Alert es prusia.** Decidido (2026-08-27): se
      queda, y el borde es el único separador en superficie oscura. **No se
      añade un neutro oscuro a la paleta** para este caso: sería un color sin
      rol en el resto del sistema. Un aviso que deba destacar sobre página
      oscura no es el neutro, es una de las tres intenciones saturadas.
      Documentado en Alert → «Superficie oscura», y vale igual para el Toast.
- [x] **`parameters: { surface: 'dark' }`** ya está en `main` (v24.5.0, decorator
      `withSurface`): las stories «En superficie oscura» de Alert y CodeBlock
      usan el parámetro, no `globals.backgrounds`.

## Siete átomos a definitivos (2026-08-27)

Accordion, Tag, Kbd, List, Popover, DescriptionList y ProgressBar salen de
`Por revisar/`. Lo hecho va en el CHANGELOG de v24.7.0; lo que queda anotado:

- [x] **`calc(var(--…-transition-duration) * 1ms)`** (2026-08-27) — corregido en
      Tooltip, Table, AppLauncher y PrevNextNav: la propiedad toma el token
      directamente, como ya hacía Popover. Modal ya usaba el token tal cual (no
      tenía el patrón). Skeleton se queda como está: su `--skeleton-duration`
      es un número sin unidad por diseño (`$type: number`), así que
      `calc(1400 * 1ms)` es válido y la animación sí ocurre. CardSplit no
      existe en el repo actual. **Actualizado (2026-08-27, tanda 2):** al
      pasar `Skeleton` a definitivo se prefirió `"1400ms"` directo (sin
      `calc`), igual que `spinner.animation-duration` — más consistente con
      el resto del sistema aunque el `calc` de entonces no fuera un bug.
- [x] **`grey-lightest` sin rol semántico** (2026-08-27) — resuelto con dos
      roles nuevos en `tokens/color`: `surface.secondary-on-light|dark` e
      `surface.inverse-on-light|dark`. `kbd.bg`, `progress-bar.track-bg` y el
      fondo de `CodeBlock` apuntan ahora a `surface.secondary-*`.
- [x] **`tag.neutral-bg`** (2026-08-27) — apunta a `surface.inverse-on-light|dark`
      en vez de nombrar `color.grey-darkest` directamente; sin cambio visual.
- [ ] **Alturas de `ProgressBar`** (8 / 24 / 32px) se expresan con la escala de
      espaciado (`spacing.2/5/6`). No son aire: son alturas de carril. Si el
      sistema añade una escala de medidas que no sean tallas de componente,
      repuntar ahí.
- [ ] **Umbral de la cifra de `ProgressBar`** (15%) vive en el TSX. No se hizo
      token para no dejar uno huérfano: el CSS no puede leerlo y el JS tendría
      que leer la custom property en runtime. Decidir si merece la pena.
- [x] **`DescriptionList` en pantalla estrecha** (2026-08-27) — por debajo de
      `--breakpoint-md` pasa a una columna (término apilado sobre su
      descripción); story «Estrecha» con viewport móvil.
- [x] **`DatePicker`** (2026-08-27) — nueva prop `calendarLabel` (default
      «Calendario») pasada al `label` del `Popover`; `DatePickerField` usa el
      `label` del campo como nombre del panel por defecto. Test de contrato.

## Toast definitivo (2026-08-27)

Sale de `Por revisar/`: `Molecules/Toast`. Comparte la cara del `Alert` y se
queda solo con la capa, la posición, el apilado y el auto-cierre. Lo que queda
anotado:

- [x] **El rol ARIA ya es por intención.** Resuelto en v25.0.0 al cambiar de
      motor: Base UI expone `type` y `priority` por aviso, así que `error` y
      `warning` salen `role="alertdialog"` con anuncio asertivo y el resto
      `role="dialog"` dentro de la región `aria-live="polite"`. Mismo criterio
      que el `role` por variante del `Alert`. Sigue en pie la regla de uso: lo
      que **bloquea** la tarea va en un `Alert` en el flujo o en un `Modal`.
- [x] **Cola migrada a Base UI** (`@base-ui-components/react/toast`) en v25.0.0.
      `sonner` fuera de dependencias, de peers y del `dist`. Las apps cambian el
      `import` (`sonner` → `@studiolxd/brand/toast`); la tabla de migración está
      en `Toast.mdx`. El aspa y la acción vuelven a ser `Button` ghost.
- [x] **El apilado ya es de tokens.** El CSS lo dibuja a partir de las alturas
      que mide el motor: `toast.gap`, `toast.stack-offset`, `toast.stack-scale` y
      `toast.enter-scale`. `gap` es prop **y** token (la prop viaja como custom
      property). Siguen siendo solo props `duration` y `visibleToasts`: la vida
      del aviso y el límite de la cola se cuentan en JS y un token CSS no movería
      nada. Mismo caso que el umbral del 15% de `ProgressBar`.
- [ ] **Un aviso actualizado por `id`** (el patrón `loading` → `success`) cuenta
      su vida con un reloj propio, fuera de la cola: el motor solo programa el
      suyo al dar de alta el aviso. Consecuencia: ese reloj **no se pausa** al
      pasar el ratón. Si Base UI expone algún día el reprogramado del temporizador
      en `update`, quitar el reloj propio de `toast.ts`.
- [ ] **`toast.max-width`** son 360px sueltos: la anchura de una tarjeta
      flotante no está en ninguna escala. Mismo caso que las alturas de carril
      de `ProgressBar`.

## Tanda 1 — Arrow, Breadcrumb, EmptyState, Tabs a definitivos (2026-08-27)

Los cuatro salen de `Por revisar/`. MDX, story `EnSuperficieOscura` y story
`Test — …` (`!dev`, con `play`) nuevos en los cuatro.

- [x] **Arrow** — exporta `ArrowProps` desde `src/index.ts`; `width-default`
      (duplicaba `width-md`, sin consumidores) retirado del JSON; MDX
      documenta que las cuatro anchuras son fórmulas fluidas (grafismo
      decorativo, no control de escala).
- [x] **Breadcrumb** — `border-radius: 2px` del foco → `var(--border-radius-default)`;
      `renderLink` reenvía ahora todo lo que reciba (`{...props}`, tipo
      extendido con `AnchorHTMLAttributes`), como el resto de `renderLink` del
      sistema; `font-size` → `{text.paragraph.small.font-size}` (texto de
      navegación, respira en `SiteShell`).
- [x] **EmptyState** — `title-color`/`description-color` → `color.text.muted-on-light`
      con par `surface-dark-*` nuevo (`muted-on-dark`): antes no tenía ningún
      token oscuro y el título quedaba en `grey-darkest` sobre prusia,
      ilegible; `icon-size` → `{icon.size-lg}` (48px), stories con
      `Icon size="lg"` en vez de `"xl"` para que coincidan.
- [x] **Tabs** — hover de la variante pill: `rgba(0,0,0,.06)` cableado →
      `trigger-pill-hover-bg`/`-color` con relleno de marca (mismo patrón que
      `Menu`/`Button ghost`, no un gris de estado nuevo) y par
      `surface-dark-*`; foco: `outline: … solid 2px` / `outline-offset: 2px`
      cableados → `focus-ring-width` (`border-width.focus`) + `focus-ring-offset`
      (`border-width.default`); `opacity: 0.4` → `{opacity.disabled}`;
      `trigger-color` → `color.text.muted-on-light`. Al añadir el par oscuro
      del pill activo se detectó que `trigger-pill-bg-active` y
      `trigger-indicator-color` (ambos `color.primary`) colisionaban con el
      fondo de `.surface-dark` (los dos son prusia): se añadieron
      `surface-dark-trigger-pill-bg-active`, `-pill-color-active` e
      `-indicator-color` (blanco/prusia invertidos, patrón `Button primary`).
- [ ] **`empty-state.icon-size-sm`** (2rem/32px) queda crudo: no hay un
      `icon.size-*` que valga 32px (la escala es 16/24/48). No se ha inventado
      uno — decisión pendiente.
- [ ] **`empty-state.title-font-size`** (`{font-size.4}`, 24px fijo) el plan lo
      señala como candidato a un token `{text.*}` (es texto corriente, no
      control) pero no resuelve a cuál — no se ha tocado.

## Familia chat definitiva (2026-08-27)

Salen de `Por revisar/` los seis de la familia —`MessageBubble`, `UserMessage`,
`AssistantMessage`, `ConversationThread`, `MessageComposer`,
`ConversationList`— y la plantilla `Chat` pasa a ser el componente `ChatShell`.
Lo hecho va en el CHANGELOG de v25.0.0. Lo que queda anotado:

- [ ] **`message-bubble.tail-fill` no es un color del globo, es el de la
      superficie que hay detrás.** Es lo que vacía el triángulo de la cola. Si
      un hilo vive sobre una superficie que no es el fondo del sistema (una
      tarjeta, una banda), hay que repuntarlo ahí o la cola se ve rellena. El
      sistema no tiene forma de que un componente lea el fondo de su
      contenedor; cuando los neutrales tengan rol semántico
      (`background.subtle` y compañía), revisar si eso da una salida mejor.
- [ ] **`message-bubble.max-width` son 75% sueltos.** La anchura de un globo no
      está en ninguna escala. Mismo caso que `toast.max-width` y las alturas de
      carril de `ProgressBar`.
- [ ] **`chat-shell.list-narrow-max-height`** son 12rem sueltos: la altura de
      la tira de conversaciones cuando la maqueta cae a una columna. Ídem.
- [ ] **`ChatShell` no monta cajón lateral.** Por debajo de `--breakpoint-lg`
      la lista es una tira acotada sobre el hilo, y para un chat de móvil de
      verdad hay que montarlo dentro de un `AppShell` y usar el cajón del
      `Sidebar`. Es deliberado (no duplicar el cajón), pero deja el chat suelto
      en móvil con una lista corta.
- [ ] **El aspa de `ConversationList` no es un `Button`.** Es un `<button>` con
      tokens propios porque tiene que aparecer y desaparecer con el hover de su
      fila y voltear la tinta con el relleno de la fila, y `Button` ghost no
      expone eso. Si algún día el ghost admite «hereda del contenedor», pasarlo.
- [ ] **`UserMessage` no dice en texto que el mensaje es del usuario.** El
      `AssistantMessage` sí lo dice (el nombre del modelo); el del usuario se
      distingue por alineación y cola, que es información visual. En un hilo
      real el contexto lo resuelve, pero si un producto necesita atribución
      explícita hoy tiene que meterla como contenido del globo.
- [ ] **La marca de tiempo que no se puede interpretar no se pinta.** Es mejor
      que «Invalid Date», pero desaparece en silencio. Si el sistema añade
      algún canal de avisos en desarrollo, avisar ahí.

## Tanda 2 — Card, AppLauncher, Pagination, Skeleton a definitivos (2026-08-27)

Los cuatro salen de `Por revisar/`. MDX (nuevo en AppLauncher y Skeleton, ampliado en Card y
Pagination), story `EnSuperficieOscura` y story `Test — …` (`!dev`, con `play`) nuevos en los
cuatro salvo Pagination, que ya tenía tests de contrato de una revisión anterior.

- [x] **Card** — los cuatro fondos `accent-*`/`support-*`, primitivo directo en CSS, pasan a
      tokens de componente (`card.accent-1-bg`, …). La variante `primary` deja de usar
      `color.primary` como fondo (colisionaba con `.surface-dark`, invisible) y pasa al patrón
      autocontenido de `button.primary`: fondo `color.accent-1` (lavanda), texto `color.primary`
      (prussian), igual en los dos temas. `accent-*`/`support-*` son colores saturados que ya
      contrastan en cualquier superficie (mismo criterio que las variantes semánticas de
      Alert/Tag): sin par `surface-dark-*`. Token huérfano `card.shadow` (ya en `none`) retirado
      junto con su `box-shadow` en CSS, patrón Kbd.
- [x] **AppLauncher** — borradas 50 líneas de CSS bajo `.surface-dark`/`[data-theme]`/`html.dark`:
      el popup va en `Portal`, ese selector descendiente nunca casaba, y los tokens oscuros ya
      funcionan por el mecanismo estándar (activación root-level, que sí cascada a través del
      portal). `trigger-size`/`tile-icon-size` (2.5rem crudos) → `size-component.md` (mismo
      valor). `trigger-hover-bg`/`tile-hover-bg`/`tile-active-bg` salían de `grey-lightest`: pasan
      al relleno de marca (`color.primary`) del patrón Menu/Button ghost, con inversión en
      superficie oscura. El color de dato del icono de cada app (`style backgroundColor`) queda
      documentado en la prop y en el MDX. Comprobado que no tenía el bug
      `calc(var(*) * 1ms)` (ver nota en «Siete átomos a definitivos»).
- [x] **Pagination** — el subrayado del botón en hover tomaba `link.underline-width` prestado de
      `Link`; pasa a `pagination.btn-hover-underline-width`, token propio (mismo valor). MDX
      anota `btn-disabled-color` (`grey-dark`) como exención deliberada (control deshabilitado).
      Story de superficie oscura nueva — tenía la pareja de tokens completa sin ninguna story que
      la enseñara.
- [x] **Skeleton** — `skeleton.duration` pasa de número crudo (`1400`, consumido con
      `calc(var(*)*1ms)`) a `"1400ms"` directo, como `spinner.animation-duration`: un bucle no es
      una transición del sistema, así que se queda como token propio en vez de sumarse a
      `--motion-duration-*`. Añadido el apagado en `prefers-reduced-motion` (no lo cubría el
      `--motion-duration-*` global — mismo caso que Spinner antes de su fix).
      `skeleton--circle` usa `border-radius.round` en vez de `50%` a mano. `bg` pasa al rol
      `surface.secondary-on-light` (mismo valor, ya con nombre); `surface-dark-bg`/`-highlight`
      dejan los `rgba` cableados por `surface.secondary-on-dark` y `grey-dark`.

Sin decisiones pendientes nuevas de esta tanda: los cuatro componentes cierran sin cabos sueltos
propios (las líneas que compartían con otros componentes en las listas de arriba —hover/activo de
`grey-lightest`, tallas, movimiento— se han actualizado quitando `AppLauncher`).

## Tanda 3 — familia diálogo: Modal, Sheet, ImageCropDialog a definitivos (2026-08-27)

Los tres salen de `Por revisar/`, en orden (Sheet toma tokens de Modal;
ImageCropDialog compone Modal). MDX, story `En superficie oscura` con
`parameters: { surface: 'dark' }` nuevos en los tres.

- [x] **Modal** — aspa a `<Button variant="ghost" size="sm" iconOnly>` vía
      `Dialog.Close render`, precedente de `Alert`/`Toast`: fuera
      `close-color`/`close-hover-color`/`close-hover-bg` y el foco prestado de
      Button. `calc(-50% - 8px)` de los keyframes → token
      (`content-enter-offset`, `spacing.2`). Borde 1px en superficie oscura
      (`surface-dark-border-color`) que separa el panel del velo, también
      oscuro; transparente en superficie clara. `width-max`/`max-height`
      documentados como medidas de layout, no de espaciado.
- [x] **Sheet** — mismo patrón de aspa que Modal (antes tomaba prestados
      `--modal-close-*` y no tenía `:focus-visible`: bug de a11y real,
      resuelto al pasar a `Button`). `description-font-size`/`-color` dejan
      de tomar prestado `input-field.helper.*` y pasan a `{modal.description-*}`.
      Verificado en el CSS generado que Sheet hereda el modo oscuro de Modal
      por cascada real de custom properties (`--sheet-title-color:
      var(--modal-title-color)` se resuelve en el elemento de uso), sin
      declarar `surface-dark-*` propios — confirmado también visualmente.
      Story `Test — abre, cierra con el aspa y devuelve el foco` nueva (antes
      sin ningún `play`).
- [x] **ImageCropDialog** — `area-bg`/`surface-dark-area-bg` de
      `color.grey-lightest` + rgba cableada → rol `surface.secondary-on-light|dark`.
      Marco de `react-image-crop` verificado sobre superficie oscura: dibuja
      sus marcas (blanco/gris) sobre la imagen, no sobre `area-bg`, así que
      el contraste no depende del tema — no hace falta sobrescribir sus
      css-vars; documentado en el MDX. Story `busy` ya existía.
- CommandPalette compone `Modal` (ya reescrita sobre Base UI en v24.11.0,
  cmdk/Radix fuera del `dist`) pero no entraba en esta tanda: sigue en
  `Por revisar/` por su propio motivo, no por este cambio.
## Tanda 6 — calendarios: Calendar, CalendarPlanner, CalendarRoster, PrevNextNav (2026-08-27)

Los cuatro salen de `Por revisar/`. MDX, story `EnSuperficieOscura` y story
`Test — …` (`!dev`, con `play`) nuevos en los cuatro; `Calendar` estrena además
`Calendar.test.tsx`.

- [x] **Decisión 2a — teclado de la rejilla de `Calendar`** — hecho: roving
      tabindex (un mes es una parada de tabulador, no 35), flechas de día y de
      semana, Inicio/Fin dentro de la semana, RePág/AvPág de mes, Mayús+RePág/
      AvPág de año, y el cruce del borde del mes arrastra el mes visible.
      Enter/Espacio ya los resolvía el `<button>` nativo. Se comprobó que
      `DatePicker`, `DatePickerField` y `DateTimeField` siguen en verde.
- [x] **Decisión 7a — rejilla de mes compartida** —
      `src/stories/molecules/_shared/calendarGrid` (como `_shared/dropdownItems`):
      `getCalendarDays`, `chunkWeeks`, `isSameDay`/`isSameMonth`/`shiftMonth`,
      los nombres de día, la cabecera, la navegación de mes y el hook de teclado.
      `CalendarPlanner` no es literalmente `Calendar` con `renderDay` —su celda
      es una caja de contenido, no un botón— pero ya no duplica ni una línea de
      la rejilla, y sus tokens hacen cascada sobre `{calendar.*}`.
- [x] **`--calendar-planner-day-hover-bg`** no existía en los tokens generados:
      el hover de celda estaba muerto. Ahora `cell-hover-bg`/`cell-hover-color`.
- [x] **Huérfanos retirados** — `calendar-planner.nav-disabled-color` y
      `nav-disabled-cursor`; `calendar-roster.nav-*`, `title-*` y `transition-*`
      (se van con la navegación a mano); `calendar.today-border-color` pasa a
      `today-marker-color`.
- [x] **`PrevNextNav` en `CalendarRoster`** — sí se podía reutilizar, y se ha
      hecho. Para cubrir el caso, `PrevNextNav` gana `linkComponent` y `labelId`
      y sus handlers reciben el evento (`href` + handler = navegación SPA).
- [x] **Tokens de molécula en la carpeta de molécula** — `calendar`,
      `calendar-planner`, `calendar-roster` y `prev-next-nav` pasan de
      `tokens/component/` a `tokens/molecule/`. El CSS/SCSS generado no se mueve.
- [ ] **`calendar-roster.th-name-width` (10rem) y `th-day-width` (2.5rem)** son
      medidas de columna, no tallas de control ni aire: se quedan crudas. Mismo
      caso que las alturas de `ProgressBar` — si el sistema añade una escala de
      medidas, repuntar ahí.
- [ ] **`calendar-planner.cell-min-height`** (6/4/9rem) — ídem: altura de celda
      de parrilla, sin escala donde encajarla.
- [ ] **El «+N más» de `CalendarPlanner`** mantiene su propia parada de
      tabulador dentro de una celda de la rejilla. Es una acción distinta de
      «abrir el día», así que se ha dejado a propósito; si alguna vez la celda
      llega a tener varios controles, habrá que meterlos en el recorrido de
      flechas en vez de en el de tabulador.
- [ ] **`CalendarPlanner` no tiene `minDate`/`maxDate`**: su rejilla no acota
      meses. No se ha inventado la prop porque no hay caso que la pida.

## Fase 0.1/0.2 — piezas que faltaban en el DS (2026-08-28)

Encargo de los componentes que las apps de la suite rehacen a mano
(`slxd/notes/AUDITORIA-DS-2026-08-28.md` § «componentes que faltan»): subpartes
y modo `render` de `Card`, átomo `Separator`, y el par
`ConsentBanner`/`ConsentPreferences`.

- [x] **`Separator`** (átomo nuevo) — la línea del sistema, con `orientation`,
      `decorative` y `spacing`. Los separadores de `Menu`, `UserMenu`,
      `OrgSwitcher`, `Sidebar` y `Select` hacen cascada sobre sus tokens sin
      cambiar de elemento (el suyo se lo pide Base UI).
- [x] **Separador oscuro de `UserMenu`/`OrgSwitcher`** — apuntaban a
      `{menu.surface-dark-separator-color}`, que nunca llega a declararse como
      custom property. Corregido al rol directo. **Regla que conviene recordar:
      un token `surface-dark-*` no puede referenciar otro `surface-dark-*`.**
- [x] **`CardTitle` es un `Heading` y `CardDescription` un `Paragraph`** — con
      `level`/`size` desacoplados. `CardHeader` pasa a rejilla de dos columnas.
- [x] **`Card render`** — modo enlace sobre el `Link` del router, como `Button`.
- [x] **`ConsentBanner` + `ConsentPreferences`** — sin cookies dentro del DS.
- [ ] **`CopyButton` y `ConfirmDialog`** siguen pendientes de la fase 0.1: no
      entraban en este encargo, pero las ocho apps los rehacen igual.
- [ ] **No hay rol de color `border.*` en el sistema.** El encargo lo daba por
      existente; hoy toda línea (bordes de campo, separadores, cabeceras de
      tabla) apunta a `color.primary` en claro y a `color.text.on-dark` en
      oscuro, componente a componente. `separator.color` sigue esa convención.
      Si algún día se crea el rol, `separator.color` es el sitio por el que
      empezar a repuntar.
- [ ] **La banda de consentimiento no tiene animación de entrada.** El sistema
      tiene tokens de movimiento; se ha dejado sin transición a propósito
      (aparece en la primera pintura, no como respuesta a un gesto), pero es una
      decisión a revisar si el patrón se generaliza.
