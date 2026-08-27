# Revisión del DS — pendientes por componente

Lo que se detecta al revisar fundamentos y hay que corregir cuando cada
componente salga de `Por revisar`. Se tacha al hacerlo.

## `grey-lightest` deja de ser fondo de estado (Colores, 2026-08-25)

Decisión: **el gris claro NO es el fondo de hover / activo / deshabilitado del
sistema.** Queda solo como superficie clara secundaria (código, kbd, burbujas,
pie de tabla). Cómo se representa cada estado se decide componente a
componente al revisarlo — no con un gris de fondo por defecto. Hoy lo usan así
36 tokens; van cayendo con la revisión:

- [ ] hover de ítem: ContextMenu, UserMenu, OrgSwitcher, SidebarNav,
      ConversationList, AppLauncher, Table (fila y cabecera), Calendar (día y
      nav), CalendarPlanner, CalendarRoster, Modal (cierre), DotsButton,
      NumberInput, Button (variante con hover gris)
- [ ] activo: OrgSwitcher, AppLauncher, ConversationList
- [ ] deshabilitado: Button, Input, Textarea
- [ ] celdas de calendario: fin de semana, no laborable, fuera de mes

## Texto gris sobre `grey-lightest` (Colores, 2026-08-25)

Regla cerrada (Foundations/Colores → "Los grises de texto"):

1. **Todo texto va en prusia o `grey-darkest`** (AAA en blanco y en el gris de
   estado). El placeholder también: `text.placeholder-on-light` → grey-darkest.
2. **`grey-dark` no es texto**: solo iconos de acción secundarios y controles
   deshabilitados.

Con el gris claro fuera de los estados, el problema "gris sobre gris" deja de
existir por diseño; lo que queda es corregir los textos que aún usan grey-dark.

- [ ] **ConversationList** — `item-color` (grey-dark) es texto → 
      `text-muted-on-light`. Además recibe `item-active-bg` gris encima.
- [ ] **EmptyState** — `title-color` y `description-color` son grey-dark: es
      texto → grey-darkest. (`icon-color` puede quedarse: icono.)
- [ ] **Tabs** — `trigger-color` (grey-dark) es texto → grey-darkest.
- [ ] **Table** — `sort-icon-color` (grey-dark) sobre `header-hover-bg`
      (grey-lightest). Icono: pasa a 3:1, pero rompe la regla.
- [ ] **Modal** — `close-color` (grey-dark) sobre `close-hover-bg`
      (grey-lightest). Ídem, icono.
- [ ] **Calendar / CalendarPlanner / CalendarRoster** — `outside-color`
      (grey-dark) es texto (los días fuera de mes se leen): → grey-darkest.
      `disabled-color` puede quedarse: deshabilitado, exento.
- [x] **Input / Textarea / MultiSelect / CommandPalette** — placeholder.
      Resuelto en tokens: `text.placeholder-on-light|dark` (grey-darkest /
      grey-light), y fuera los `surface-dark-placeholder-color` que lo
      remapeaban a mano. Queda por ver en cada componente si el placeholder
      debe ocultarse en deshabilitado.
- [ ] **FileUpload** — `thumb-icon-color` (grey-dark) sobre `thumb-bg`
      (grey-lightest). Icono. (Sigue pendiente: al hacer definitivo el campo
      solo se tocó el contrato, no la paleta de la miniatura.)

## Deudas de capa detectadas en neutrales (Colores, 2026-08-25)

- [ ] **`grey-lightest` no tiene rol semántico.** Sus 36 usos referencian el
      primitivo directamente. Al revisar neutrales, darle un rol
      (`background.subtle` / fondo de estado) y que los componentes apunten a él.
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
- [ ] **FileUpload** — `--_gap: 10px` → `spacing-2` o `spacing-3`; y un
      `gap: 0.125rem` (2px) → `spacing-1`.
- [ ] **Table** — `gap: 0.375rem` (6px) → `spacing-2`.

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
- [ ] Suben a `sm` (32px): **Kbd** sm y md (1.5 / 1.75rem).
- [x] **UserMenu** avatar, **OrgSwitcher** logo y **SidebarNav** icono → `sm`
      (2026-08-25; Avatar entero a tallas 32/40/48, sin `xl`).
- [x] **DotsButton** → Button ghost iconOnly a talla (32/40/48), sin tokens propios (2026-08-26).
- [ ] Pasan a token sin cambiar de tamaño: **AppLauncher** trigger 2.5rem, **FileUpload** miniatura
      2.5rem, **DotsButton** lg 2.5rem → `md`; **EmptyState** icono 3rem → `lg`.
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

- [ ] **Table** — `header-border-width` y `footer-border-width` bajan de 2px a
      1px. Comprobar que la cabecera sigue leyéndose como tal (peso/fondo).
- [ ] **Tabs** — `trigger-indicator-width` baja de 2px a 1px. Si el indicador
      de pestaña activa necesita más presencia, resolverlo con color, no con
      grosor.
- [ ] **Spinner** — anillos a 2px / 2px / 3px crudos. No son bordes de diseño
      pero tampoco están en ningún token: decidir grosor al revisar.
- [x] **RadioField** — el `offset` de 3px se retiró (2026-08-27): la marca se
      alinea con la primera línea derivando `(altura de línea × cuerpo − lado
      del radio) / 2`, sin número suelto.
- [ ] **CheckboxField** — sigue con `checkbox-offset: 3px`, y **CalendarRoster**
      con `chip-padding-block` 2px: espaciado fuera de escala (mínimo 4px).
- [ ] Componentes que pasan de 4px a esquina recta (29 usos, ya repuntados):
      AppLauncher, Avatar (variante cuadrada), Calendar, CalendarPlanner,
      CalendarRoster, CommandPalette, ContextMenu, ConversationList,
      FileUpload, ImageCropDialog, Kbd, MessageBubble, OrgSwitcher,
      Pagination, SidebarNav, Skeleton, Tabs, Tooltip, UserMenu, Alert,
      Toast, Modal, Sheet. Comprobar que ninguno dependía del radio para
      leerse (chips, burbujas).

## Sombras (2026-08-25)

Regla: nada proyecta sombra (`shadow.default` = none). La elevación es fondo +
borde 1px (+ velo en modales). Ya repuntado en tokens; al revisar cada uno,
comprobar que sigue separándose de lo que tiene debajo:

- [ ] **Modal** (tenía `xl`) — el velo hace el trabajo; comprobar borde en
      superficie oscura.
- [ ] **Toast** (tenía `lg`) — flota sobre contenido arbitrario: necesita
      borde 1px visible en claro y oscuro.
- [ ] **Sidebar** y **AppHeader** (sombra cruda) — barra fija sobre
      contenido que hace scroll: sustituir por borde inferior/derecho 1px.
- [ ] **Kbd** — comprobar si `kbd.shadow` era el "relieve" de la tecla;
      si lo era, resolver con borde.
- [ ] **Header** (Por revisar) — misma sombra cruda que AppHeader.

## Movimiento (2026-08-25)

Regla: ninguna duración va escrita a mano (reduced-motion las anula todas vía
token). Curvas `in` y `linear` declaradas sin uso.

- [ ] **Spinner** — `animation-duration: 600ms` crudo. Es un bucle, no una
      transición: decidir si va a `slow` o si un bucle merece su propio token.
- [ ] Transiciones con ms a mano en CSS: **CardSplit, PrevNextNav, Table,
      AppLauncher, Modal, Tooltip, Skeleton, Popover** → `--motion-duration-*`.

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

- [ ] `icon.size-sm` pasa de 18px a **16px** (a la retícula de 4). 21 usos
      con `size="sm"`: comprobar en Button, Tag, Table, campos con icono.
- [ ] **EmptyState** — usa `xl` (64) en stories y `lg` (48) en el token
      `icon-size` crudo (3rem): unificar al revisar.

## Logo y MenuButton (2026-08-25) — hechos

- [x] **Logo** — `size` por tallas (32/40/48), sin `width`/`height` ni `dark`;
      color por token con par oscuro. Consumidores actualizados: Sidebar,
      AppShell, Footer (`lg`), LoginForm (`md`), templates.
- [x] **MenuButton** (antes Hamburger) — cuadrado a talla, barras 1px del
      borde, movimiento por tokens, label "Menú". Header viejo repuntado.

## SkipLink (2026-08-25) — hecho

- [x] Tokens propios (bg, color, aire, foco, capa) con par oscuro; compone
      `visually-hidden` en vez de duplicar la receta; `href` con `#`.
- [ ] **AppShell** no lleva SkipLink ni `<main id="main-content" tabIndex={-1}>`:
      la app con sesión no tiene salto al contenido. Al revisarlo, que el shell
      renderice ambos (es quien sabe dónde está el contenido).
- [ ] **hub** (`app/[locale]/layout.tsx`) lleva su propio `<a class="slot-skip-link">`
      → desaparece al migrar a `SiteHeader` (público) y `AppShell` (app).

## Base UI (2026-08-25) — migración hecha

Todo el DS corre sobre `@base-ui-components/react`; `@radix-ui/*` ya no está en
`src/` ni en `package.json`.

- [ ] **cmdk (CommandPalette)** arrastra Radix transitivamente (`react-dialog`,
      `react-primitive`, `react-id` en `dist/command-palette.js`). Quitarlo exige
      reescribir CommandPalette sobre Dialog + lista propia de Base UI.
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

- [ ] **CheckboxField** no entró en la tanda (no estaba en la lista) y ahora es
      el único campo de casilla sin `helperText` / `error` / `errorMessage` /
      `className` / `forwardRef`, y el único cuyo texto sigue en `font-size.2`
      en vez de `{text.font-size}`: en la superficie pública se lee un peldaño
      por debajo del `RadioField`. Decidir si se le aplica el mismo contrato.
- [ ] **AsyncSelect / AsyncMultiSelect** siguen sin tokens visuales propios:
      consumen los de `multi-select.*`. Es deliberado (misma cara) pero rompe
      la regla de «todo color pasa por un token del componente».
- [ ] **FileUpload** no tiene tallas: `size` en `FileUploadField` solo mueve la
      etiqueta. Si la zona de arrastre debe responder a la talla del formulario,
      hay que decidir su medida.
- [ ] **DatePicker / DateTimeField**: el input oculto que monta `name` lleva la
      fecha en ISO local (`yyyy-mm-dd`) recortada de `toISOString()`, que es
      UTC. Con husos al este del meridiano y horas tempranas puede desplazar un
      día en un envío nativo. Sin impacto en react-hook-form, que guarda el
      `Date`.
