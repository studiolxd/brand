# Plan de revisión de «Por revisar» (análisis 2026-08-27)

He inventariado los 26 componentes con `title: 'Por revisar/…'` (25 tras excluir Toast, ya en curso en `toast-definitivo`). Todo lo que sigue sale de leer `.tsx`/`.css`/`.stories`/`.mdx` y sus JSON de token, cruzado con `notes/REVISION-pendientes.md` y con un grep de consumo real en `/Users/suvi/Dev/slxd/{apps,packages}`.

---

# Inventario «Por revisar» — 25 componentes

## Tabla resumen

| Componente | Tier | Clase | Tamaño | Dependencias | ¿Lo usan las apps? |
|---|---|---|---|---|---|
| **Arrow** | Átomo | A | S | lo consumen `Card`, `Sidebar` | Sí (`/arrow`: localizia, lmsmcp ×2) |
| **Skeleton** | Átomo | A | S | lo consume `DataTable` | Sí (`/skeleton`: web, status, lmsmarketplace) |
| **Tabs** | Átomo | A | M | — (Base UI Tabs) | Sí (`/tabs`: bricks ×9, lmsmcp) |
| **MessageBubble** | Átomo | C (con la familia chat) | S | base de `UserMessage`/`AssistantMessage` | No directamente (interno) |
| **Breadcrumb** | Molécula | A | S | — | Sí (`/breadcrumb`: bricks, aipricing) |
| **EmptyState** | Molécula | A | S | lo consume `DataTable` | Sí (`/empty-state`: 22 usos) |
| **Card** | Molécula | A | M | usa `Arrow`, `Heading` | Sí (`/card`: 33 usos) |
| **Pagination** | Molécula | A | M | usa `Select`; lo consume `DataTable` | Sí (`/pagination`: 10 usos) |
| **PrevNextNav** | Molécula | **D** (o A barato) | S | — | **No** |
| **AppLauncher** | Molécula | A | M | Base UI Popover, `Tag`, `Icon` | Sí (`/app-launcher`: 12 usos) |
| **Modal** | Molécula | A | M | Base UI Dialog; **base de Sheet, CommandPalette, ImageCropDialog, CalendarPlanner** | Sí (`/modal`: 18 usos) |
| **Sheet** | Molécula | A | M | toma tokens de `Modal` | Sí (`/sheet`: 9 usos) |
| **ImageCropDialog** | Molécula | A | S | `Modal`, `Button`, react-image-crop | Sí (hub ×2, lrs, tender, sharescorm) |
| **CommandPalette** | Molécula | **C** | L | `Modal` + **cmdk (arrastra Radix)** | Sí (`/command-palette`: 16 usos) |
| **Table** | Molécula | **B** | L | lo consume `DataTable` | Sí (`/table`: 13 usos) |
| **ConversationList** | Molécula | **B** | M | — | Sí (lmsmcp ai-chat) |
| **MessageComposer** | Molécula | A | S | `Textarea`, `Button` | Sí (lmsmcp, lrs) |
| **UserMessage** | Molécula | C (familia chat) | S | `MessageBubble` | Sí (lmsmcp) |
| **AssistantMessage** | Molécula | C (familia chat) | S | `MessageBubble`, `TypingIndicator` | Sí (lmsmcp) |
| **Calendar** | Molécula | **B** | L | **lo consumen `DatePicker` y `DateTimeField` (ya definitivos)** | No directo, sí vía DatePicker |
| **CalendarPlanner** | Molécula | **C** | L | duplica `Calendar`; usa `Modal`, `Tag` | **No** |
| **CalendarRoster** | Molécula | **D** | L | `Tag`, `Icon` | **No** |
| **ConversationThread** | Organismo | C (familia chat) | S | `UserMessage`, `AssistantMessage` | Sí (lrs) |
| **DataTable** | Organismo | A (tras Table) | M | `Table`, `Pagination`, `EmptyState`, `Skeleton`, TanStack | Sí (hub, lmsmarketplace) |
| **Chat** | Plantilla | **D** (solo story) | S | AppShell, Sidebar, ConversationList/Thread, MessageComposer | No exportable (no tiene `.tsx`) |

**Dato transversal: ninguno de los 25 tiene una story `parameters: { surface: 'dark' }`** y solo tres tienen MDX (`Arrow`, `Card`, `Pagination`). Solo `ImageCropDialog` y `DataTable` tienen `.test.tsx`.

---

## Fichas por componente

### Átomos

**Arrow** — `src/stories/atoms/Arrow/`
- `Arrow.tsx:3` — `interface ArrowProps` **no se exporta**; `src/index.ts:11` exporta el componente pero no el tipo (único caso del bloque de átomos).
- `arrow.json` — las cuatro anchuras son fórmulas crudas (`max(3.125vw, 48px)`, `clamp(72px, 9.375vw, 144px)`), sin relación con ninguna escala del sistema. Es un grafismo decorativo, no un control: defendible, pero hay que dejarlo escrito en el MDX.
- `width-default` duplica `width-md` (token redundante).
- `aria-hidden` correcto. Falta story de superficie oscura (`currentColor`, debería ser trivial) y test de contrato.

**Skeleton** — `atoms/Skeleton/`
- `Skeleton.css:20` — `calc(var(--skeleton-duration) * 1ms)`. Aquí el `calc` **sí funciona** (a diferencia de Tooltip/Table/AppLauncher…) porque `skeleton.duration` es el número crudo `1400`, no un token de motion. Es el reverso del bug: el token está fuera del sistema.
- Consecuencia a11y: al no usar `--motion-duration-*`, `src/stylesheets/reduced-motion.css` no lo apaga. **La animación sigue corriendo con `prefers-reduced-motion`.** Copiar el patrón de `Spinner.css:31` (`@media (prefers-reduced-motion: reduce) { animation: none }`).
- `skeleton.surface-dark-bg/-highlight` con `rgba(255,255,255,.08/.16)` cableados — mismo caso que se resolvió en Alert.
- `skeleton--circle` usa `border-radius: 50%` a mano (debería ser `border-radius.round`) y `bg` apunta a `grey-lightest` sin rol (pendiente global).
- Sin MDX, sin story oscura, sin test.

**Tabs** — `atoms/Tabs/`
- `Tabs.css:117` — `background-color: rgba(0, 0, 0, 0.06)` cableado en el hover de la variante pill. Sin token ni par oscuro.
- `Tabs.css:87,88,127,128` — `solid 2px` / `outline-offset: 2px` a mano en vez de `border-width.focus` + token de offset (el resto del DS ya usa `focus-ring-*`).
- `Tabs.css:81` — `opacity: 0.4` cruda (existe `tokens/opacity/scale.json`).
- Pendientes de `REVISION-pendientes.md` que le afectan: `trigger-color` es `grey-dark` sobre texto → `grey-darkest`; `trigger-indicator-width` ya está en `border-width.default` en el JSON (la nota puede tacharse) pero hay que comprobar visualmente que la pestaña activa se lee con 1px.
- `trigger-font-size: {font-size.2}` — es un control de interfaz, así que es correcto que tenga token propio; conviene documentarlo.
- Sin MDX, sin story oscura pese a tener 5 tokens `surface-dark-*` definidos y sin ejercitar.

**MessageBubble** — `atoms/MessageBubble/`
- `MessageBubble.css:16,23` — `border-end-end-radius: 0.25rem` / `border-end-start-radius: 0.25rem` cableados. **Contra la identidad de formas rectas decidida hoy**: la "colita" de 4px del globo es exactamente lo que se está retirando (`border-radius.default` = 0). Es la decisión de diseño de la familia chat.
- `message-bubble.assistant-bg` = `grey-lightest` (mismo caso documentado que `kbd.bg` y `code-block`: superficie clara secundaria, no estado → sobrevive, pero apuntará al rol nuevo).
- `user-bg` = `color.primary` (prusia): **colisión clásica con `color.background.dark`** — sobre `.surface-dark` el globo de usuario desaparece. Sin ningún token `surface-dark-*` (CLAUDE.md ya lo lista como «diseño pendiente»).
- Sin `className`, sin `...rest`, sin `forwardRef`; sin MDX ni stories oscuras.

### Moléculas — grupo diálogo

**Modal** — `molecules/Modal/`
- `Modal.css:95` — `transition: color 150ms ease, background-color 150ms ease` **con la duración escrita a mano** (pendiente listado).
- `Modal.css:104-105` — el foco del aspa usa `--button-focus-ring-width/-style/-offset` y `--color-primary` **prestados de Button**, saltándose el token propio. Precedente ya resuelto en Alert: el aspa pasa a `<Button variant="ghost" size="sm" iconOnly>` y desaparecen `close-color`/`close-hover-color`/`close-hover-bg`.
- `Modal.css:12,18` — `calc(-50% - 8px)` cableado en los keyframes.
- `modal.close-color` = `grey-dark` sobre `close-hover-bg` = `grey-lightest`: los dos pendientes abiertos de la lista (icono gris sobre gris de estado). Se resuelven solos al pasar a Button ghost.
- `modal.shadow` ya en `{shadow.default}` (= none): queda comprobar que el panel se separa del velo — la nota de pendientes pide **borde 1px en superficie oscura**; hoy `.modal__content` no declara ningún `border`.
- `modal.width-max: 560px` y `max-height: 90dvh` crudos (defendible: medida de layout, documentar).
- Sin MDX. Diez `play` en stories, bien cubierto de comportamiento.

**Sheet** — `molecules/Sheet/`
- `Sheet.css:113,118,119` — usa `--modal-close-color`, `--modal-close-hover-color`, `--modal-close-hover-bg` **directamente**: los tokens del vecino, no propios (`sheet.json` no los declara).
- `Sheet.css:109,114` — `padding: var(--spacing-1)` (shorthand prohibida por la regla de ejes) y `--border-radius-default` global en vez de token de componente.
- `.sheet__close` **no tiene `:focus-visible`**: el aspa del panel no marca foco. A11y real.
- `sheet.description-font-size/-color` referencian `{input-field.helper.*}` — préstamo entre componentes no relacionados.
- `Sheet.css:38` usa `var(--sheet-transition-duration)` tal cual (correcto, ya trae `ms`) — sirve como referencia de cómo deben quedar Table/AppLauncher.
- Sin tokens `surface-dark-*` propios; hereda los de Modal por cascada de referencia — hay que verificarlo en el CSS generado, no darlo por hecho.
- Sin MDX, sin story oscura, sin `play`.

**ImageCropDialog** — `molecules/ImageCropDialog/`
- El más sano del grupo: tiene `.test.tsx`, tokens propios y CSS limpio.
- `image-crop-dialog.area-bg` = `grey-lightest` (superficie, no estado: sobrevive con el rol nuevo).
- Importa `react-image-crop/dist/ReactCrop.css`: **CSS de terceros sin tokenizar** dentro del bundle del DS (marco y tiradores con sus propios colores). Comprobar contraste del marco sobre superficie oscura.
- Sin MDX, sin story de superficie oscura, sin story de `busy`.

**CommandPalette** — `molecules/CommandPalette/`
- **El pendiente estructural**: `cmdk` arrastra `@radix-ui/react-dialog`, `react-primitive` y `react-id` a `dist/command-palette.js`, y CLAUDE.md declara Radix prohibido en el DS. No es un pendiente de estilo: es reescribir la paleta sobre `Modal` + lista propia de Base UI.
- El resto está muy bien resuelto (el `role="status"` sobre `Command.Empty` compensa el `role="presentation"` que fuerza cmdk; `listLabel` documentado).
- Sin MDX, sin story oscura, sin `play`.

### Moléculas — grupo tabla

**Table** — `molecules/Table/`
- `Table.css:58,59,60,79` — **cuatro `calc(var(--table-transition-duration) * 1ms)`: las transiciones de la tabla no ocurren.**
- `Table.css:37` — `gap: 0.375rem` (6px, fuera de escala; pendiente listado → `spacing.2`).
- `Table.css:125` — `width: 1px` para la columna de acciones (truco de layout legítimo, documentar).
- `Table.css:1,3` — es de los pocos CSS que hacen `@import` del CSS de tokens y del CSS de otro átomo. Patrón inconsistente con el resto (solo CodeBlock, Alert, Toast, PrevNextNav y TimeSelect lo hacen).
- Tokens huérfanos: `--table-border-color` y `--table-header-hover-bg` (declarados, nunca usados; el segundo es justo el `grey-lightest` de estado que se retira).
- Pendientes listados: `header-border-width`/`footer-border-width` de 2px a 1px; `sort-icon-color` (grey-dark) sobre `header-hover-bg`; `row-hover-bg` y `footer-bg` en `grey-lightest`.
- **A11y (esto es la decisión):** `Table.tsx:88-104` — la cabecera ordenable es un `<th tabIndex={0} onClick>` con `onKeyDown` manual. No es un botón; el nombre accesible se compone con `VisuallyHidden` dentro del `th`, así que el lector anuncia texto + estado mezclados con el `aria-sort`.
- Sin MDX. Tres stories `!dev` con `play` (buena base).

**DataTable** — `organisms/DataTable/`
- Limpio: tres tokens, CSS de 18 líneas, `.test.tsx`, props de i18n reenviadas a `Table` y `Pagination`. Hereda todos los defectos de sus piezas.
- `DataTable.tsx:211` — `data-state={row.getIsSelected() ? 'selected' : undefined}`: **`data-state` está prohibido** por la regla de Base UI («nada de `[data-state="…"]`»), y además ningún CSS lo lee → atributo muerto.
- Sin MDX, sin story oscura, sin story de `isLoading` en oscuro.

**Pagination** — `molecules/Pagination/`
- El más maduro del inventario: MDX de 140 líneas, tres stories `!dev` con `play`, tokens completos con pareja `surface-dark-*`, todos los textos como props.
- `Pagination.css:61` — `box-shadow: inset 0 calc(-1 * var(--link-underline-width)) 0 0 currentColor`: usa el token de **Link** para su propio subrayado.
- `btn-disabled-color` = `grey-dark`: exento por la regla (control deshabilitado), conviene anotarlo en el MDX para que no lo «arregle» la siguiente pasada.
- Falta story `parameters: { surface: 'dark' }` — es de los pocos con cobertura oscura completa en tokens y cero stories que lo enseñen.

**EmptyState** — `molecules/EmptyState/`
- Pendiente listado y confirmado: `empty-state.title-color` y `description-color` son `{color.grey-dark}` → **texto en grey-dark**, prohibido. Van a `grey-darkest`. `icon-color` puede quedarse.
- `icon-size: 3rem` y `icon-size-sm: 2rem` crudos; las stories usan `size="xl"` (64) mientras el token dice 48. Pendiente listado: unificar a `icon.size-lg`.
- `title-font-size: {font-size.4}` — un estado vacío es texto corriente, no interfaz: candidato a `{text.*}`.
- Cero tokens `surface-dark-*` (CLAUDE.md lo lista entre los que nunca tuvieron oscuro) y el fondo es transparente, así que en `.surface-dark` el título queda en `grey-darkest` sobre prusia: **ilegible hoy**.
- Sin MDX, sin test.

### Moléculas — sueltas

**Card** — `molecules/Card/`
- `Card.css:41-44` — `background-color: var(--color-accent-1 / -2 / --color-support-1 / -2)`: **cuatro primitivos directos en el CSS**, sin token de componente. Es exactamente el criterio de revisión («todo color pasa por un token propio»).
- `Card.css:12` — `box-shadow: var(--card-shadow)` con el token ya en `none`: sombra huérfana, se retira como en Kbd.
- `Card.css:27-32` — remapea seis `--text-hN-color` a mano en la variante primary.
- Solo tiene par oscuro la variante `outline`; `primary`, `accent-*` y `support-*` no. `card--primary` es prusia = `color.background.dark` → **colisión invisible en oscuro** (el patrón que avisa CLAUDE.md).
- Bien: `forwardRef`, `...rest`, dos modos documentados, MDX, dos stories `!dev`. Falta story oscura.

**Breadcrumb** — `molecules/Breadcrumb/`
- `Breadcrumb.css:41` — `border-radius: 2px` cableado en el `:focus-visible`.
- `renderLink` **no propaga las props que le llegan** más allá de las tres que compone (`href`, `children`, `className`): distinto de la regla que se aplicó a los menús, aunque aquí no hay motor que inyecte teclado.
- `breadcrumb.font-size: {font-size.1}` (14px fijo): una miga es texto de navegación, no control — candidato a `{text.paragraph.small.font-size}` para que respire en la superficie pública.
- Tiene cinco `surface-dark-*` definidos y **ninguna story que los enseñe**.
- Sin MDX, sin `play`, sin test.

**PrevNextNav** — `molecules/PrevNextNav/`
- `PrevNextNav.css:27` — `calc(… * 1ms)`: **la transición no ocurre** (pendiente listado).
- `PrevNextNav.css:1` — `@import '../../../tokens/molecules/prev-next-nav.css'` pero el JSON vive en `tokens/component/prev-next-nav.json`: inconsistencia de carpeta entre fuente y salida.
- `PrevNextNav.css:37` — `border-radius: 2px` cableado.
- Cero tokens `surface-dark-*`; cero `play`; cero stories con `Default` nombrado; sin MDX.
- **Cero consumidores en slxd.** Y `CalendarRoster`/`Calendar` llevan su propia navegación de mes en vez de usarlo, que era su razón de ser.

**AppLauncher** — `molecules/AppLauncher/`
- **Hallazgo gordo: `AppLauncher.css:129-186` es CSS muerto.** El bloque `.surface-dark .app-launcher__…` referencia ocho custom properties `--app-launcher-surface-dark-*` que **el generador nunca emite** (el formato `css/variables-with-dark-mode` remapea la propiedad base, no crea una con el prefijo). Verificado por diferencia entre las `var()` usadas y las declaradas en `src/tokens/**`. Es decir: los tokens oscuros del JSON sí funcionan por el mecanismo estándar, y encima hay 58 líneas de CSS a mano que no pintan nada. Se borran enteras.
- Segundo motivo para borrarlas: el popup va en `Portal`, así que un selector descendiente `.surface-dark X` nunca casaría — justo el caso que resuelve la decisión de hoy de mover el decorator a `html`.
- `AppLauncher.css:39` — `calc(… * 1ms)`: **la animación de apertura no ocurre**.
- `app-launcher.trigger-size: 2.5rem` y `tile-icon-size: 2.5rem` crudos → `size-component.md` (pendiente listado, explícito para AppLauncher).
- `trigger-hover-bg`, `tile-hover-bg`, `tile-active-bg` = `grey-lightest` como estado: los tres pendientes listados de AppLauncher.
- `AppLauncher.tsx:73` — `style={{ backgroundColor: app.accent }}` inline: correcto (color de dato, documentado en la prop), pero merece nota en el MDX.
- Sin MDX, sin `play`, sin story oscura.

### Familia chat

**UserMessage / AssistantMessage** — `molecules/UserMessage/`, `molecules/AssistantMessage/`
- `UserMessage.css:9-12` y `AssistantMessage.css:9-20` — **ningún token propio**: `--message-bubble-font-family` (del vecino), `--font-size-1`, `--color-grey-dark` y `--spacing-1` globales directos. No existen `user-message.json` ni `assistant-message.json`.
- `--color-grey-dark` en el modelo y en la marca de tiempo: **texto en grey-dark**, prohibido.
- `<time>` sin atributo `datetime`: el timestamp es una cadena ya formateada (`"14:32"`), no legible por máquina.
- Ninguno acepta `className` ni `...rest`.
- Sin MDX, sin `play`, sin story oscura.

**ConversationThread** — `organisms/ConversationThread/`
- Lo mejor de la familia: `role="log"`, `ariaLabel` como prop, tokens propios, dos `play`.
- `ConversationThread.tsx:40` — `scrollIntoView({ behavior: 'smooth' })` **incondicional**: ignora `prefers-reduced-motion` (hay que consultarlo en JS, el token no llega aquí).
- El `<div ref={bottomRef} aria-hidden>` es un centinela sin altura; funciona pero conviene documentarlo.
- Sin MDX ni story oscura.

**MessageComposer** — `molecules/MessageComposer/`
- `MessageComposer.css:12-29` — **estila el átomo ajeno desde fuera** (`.message-composer .textarea { border: none; box-shadow: none; min-height: unset }`). Es el mismo antipatrón que se corrigió en `AppHeader.css` con UserMenu/OrgSwitcher: la solución fue dar variantes al átomo (`compact`, `block`), no pisarlo. Aquí haría falta algo como `Textarea variant="bare"` o `borderless`.
- `MessageComposer.css:8` — `border: 1px solid` con el `1px` cableado (existe `border-width.default`).
- `Enter` envía y `Shift+Enter` salta línea, sin ninguna pista visible ni accesible del atajo. Candidato a `Kbd` en el `helperText`.
- El botón sigue siendo `<Button>` con texto **y** `aria-label="Enviar mensaje"`: el `aria-label` **sustituye** al texto visible, rompiendo la regla WCAG «label in name» (quien dicta «Enviar» no activa un control que se llama «Enviar mensaje»).
- Sin tokens `surface-dark-*`, sin MDX.

**ConversationList** — `molecules/ConversationList/`
- **Cuatro custom properties que no existen en el sistema**, verificadas por diferencia contra `src/tokens/**`:
  - `ConversationList.css:20,74` — `var(--font-size-body)` → no existe.
  - `ConversationList.css:21,75` — `var(--font-family-ui)` → no existe.
  - `ConversationList.css:34,90,118` — `var(--color-focus)` → no existe: **los tres anillos de foco de la lista no se pintan.**
  - `ConversationList.css:24,25,108,109` — `var(--motion-ease-default)` → no existe (se llama `--motion-easing-default`).
  - `ConversationList.css:30` — `var(--color-grey)` → no existe (solo `-lightest`, `-light`, `-dark`, `-darkest`).
- Token huérfano: `--conversation-list-item-active-bg` (declarado, nunca usado) — y era `grey-lightest` como estado activo, justo lo que se retira.
- `ConversationList.css:86` — `font-weight: 500` cableado.
- `ConversationList.tsx:57` — el botón de borrar lleva `tabIndex={-1}` y `opacity: 0` hasta el hover: **inalcanzable por teclado**. Hay una regla `:focus-visible { opacity: 1 }` que nunca se dispara porque el elemento no está en el orden de tabulación.
- `item-color` = `grey-dark` es texto (pendiente listado, confirmado); `item-hover-bg`/`item-active-bg` = `grey-lightest` (pendiente listado).
- `.conversation-list__new` es un `<button>` a mano con `border: 1px dashed`, en vez de `Button variant="outline"`.

**Chat** (plantilla) — `templates/Chat/Chat.stories.tsx`
- **No hay componente.** Solo un `.stories.tsx` de 278 líneas que monta a mano `AppShell` + `Sidebar` + `ConversationList` + `ConversationThread` + `MessageComposer` con estado local. No está en `entry-points.mjs`, ni en `package.json › exports`, ni en `src/index.ts`.
- Según CLAUDE.md, `Templates/` son «layouts reutilizables»: esto es una demo de integración, no un layout.

### Calendarios

**Calendar** — `molecules/Calendar/`
- `Calendar.css:135,138,139` — `bottom: 3px`, `width: 4px`, `height: 4px` del punto marcador, cableados (3px además está fuera de escala).
- Pendientes listados: `outside-color` = `grey-dark` es texto (los días fuera de mes se leen) → `grey-darkest`; `disabled-color` exento; `nav-hover-bg` y `day-hover-bg` = `grey-lightest` como estado; celdas de fin de semana / no laborable / fuera de mes.
- **A11y de rejilla:** no hay `role="grid"`/`gridcell`, ni navegación con flechas, ni patrón roving-tabindex; cada día es un `<button>` suelto → un mes son 35 paradas de tabulador. Base UI no cubre calendario, así que el DS lo implementa a mano: es la deuda de fondo.
- **Es la única del trío que no se puede retirar**: `DatePicker.tsx:3` y `DateTimeField.tsx:7` la consumen, y ambos ya son definitivos. Además hay un pendiente abierto explícito: *«DatePicker abre su Popover sin `label`»*, que se cierra en esta revisión.
- Sin MDX; cuatro `play` y un `!dev` (base decente).

**CalendarPlanner** — `molecules/CalendarPlanner/`
- **Duplicación literal**: `CalendarPlanner.tsx:71` reimplementa `getCalendarDays` idéntica a `Calendar.tsx:58`, con su propia `interface CalendarDay`, su propio encabezado de días, su propia navegación de mes y su propio JSON de tokens de 66 entradas que replica `calendar.json` casi entrada por entrada.
- `--calendar-planner-day-hover-bg` usado en el CSS **no existe** en los tokens generados (el JSON declara `cell-*`, no `day-hover-bg`): hover muerto.
- Tokens huérfanos: `--calendar-planner-nav-disabled-color`, `--calendar-planner-nav-disabled-cursor`.
- `cell-outside-bg` = `grey-lightest` (pendiente listado: celdas fuera de mes).
- **Cero consumidores en slxd.**

**CalendarRoster** — `molecules/CalendarRoster/`
- `calendar-roster.chip-padding-block: "2px"` — pendiente listado explícito, fuera de la escala de 4px.
- `CalendarRoster.css:130,131` — `width/height: 1.5rem` crudos; `:182-183` — `outline: 2px solid` y `outline-offset: -2px` a mano.
- Token huérfano: `--calendar-roster-nav-disabled-color`.
- `cell-weekend-bg` y `cell-non-working-bg` = `grey-lightest` (pendiente listado).
- Es el componente más grande del inventario (753 líneas) con **cero consumidores** y un dominio muy específico (cuadrante de turnos de RR. HH.).

---

## Propuesta de tandas

Cada tanda es un worktree independiente; dentro de una tanda no hay dos componentes que toquen el mismo fichero (ni CSS, ni JSON de token, ni MDX). Se listan en orden de ejecución: las A primero para acumular precedentes limpios antes de las decisiones.

**Tanda 1 — átomos y moléculas sueltas (A, mecánica pura · Sonnet)**
`Arrow` · `Breadcrumb` · `EmptyState` · `Tabs` · `Skeleton`
Sin solapes. Cierra cuatro pendientes de la lista (texto grey-dark de EmptyState y Tabs, icono de EmptyState, indicador de Tabs) y arregla el reduced-motion de Skeleton. Es la tanda que fija el patrón de «story oscura + MDX + test de contrato» para las siguientes.

**Tanda 2 — superficies y navegación (A, mecánica · Sonnet)**
`Card` · `AppLauncher` · `Pagination` · `PrevNextNav` *(si no se retira)*
Sin solapes. AppLauncher aporta el borrado de las 58 líneas de CSS oscuro muerto y dos `calc(*1ms)`; Card, los cuatro primitivos de color; Pagination es casi solo MDX + story oscura.

**Tanda 3 — familia diálogo (A, secuencial dentro del worktree · Sonnet, con Opus para la revisión final)**
`Modal` → `Sheet` → `ImageCropDialog`
**No paralelizable**: Sheet consume tokens de Modal y ImageCropDialog compone Modal. El orden importa. El aspa a `Button ghost` sigue el precedente de Alert, así que es mecánico.

**Tanda 4 — familia tabla (B + A, secuencial · Opus para Table, Sonnet para DataTable)**
`Table` → `DataTable`
Depende de que la tanda 1 y 2 hayan cerrado `EmptyState`, `Skeleton` y `Pagination`. Lleva la única decisión de a11y del inventario (cabecera ordenable).

**Tanda 5 — familia chat (C, un solo worktree · Opus)**
`MessageBubble` · `UserMessage` · `AssistantMessage` · `ConversationThread` · `MessageComposer` · `ConversationList` · plantilla `Chat`
Es una redefinición conjunta: la forma del globo, el par de color en oscuro, los tokens propios de las dos moléculas y la variante `bare` de `Textarea` son una sola decisión de familia. Va entera o no va. Consumidor real que hay que avisar al subir el pin: `apps/lmsmcp/src/components/ai-chat/*` y `apps/lrs/src/components/chat/StoreChat.tsx`.

**Tanda 6 — calendarios (B + C/D · Opus)**
`Calendar` → (según decisión) `CalendarPlanner`, `CalendarRoster`
Calendar primero y sola, porque de ella cuelgan `DatePicker` y `DateTimeField`, ya definitivos. Planner y Roster solo si el usuario decide conservarlos.

**Tanda 7 — CommandPalette (C · Opus)**
En solitario: sacar Radix del `dist` es reescribir el componente sobre Base UI, con 16 consumidores en la suite. No mezclar con nada.

---

## Decisiones pendientes para ti (B / C / D)

**1 · `Table` — cabecera ordenable (B)**
Hoy es un `<th tabIndex={0} onClick onKeyDown>` con el estado dentro de un `VisuallyHidden`.
- (a) Envolver el contenido en un `<button>` dentro del `th`, dejando `aria-sort` en el `th`. Patrón WAI-ARIA canónico.
- (b) Dejarlo como está y solo pulir el texto accesible.
→ **Recomiendo (a)**. Es la práctica estándar, arregla la activación con Espacio en Safari y no cambia la API pública (`sortable`/`sorted`/`onSort` siguen igual); solo cambia el DOM interno y `.table__header-content` pasa a ser el botón. Afecta a 13 usos en la suite, ninguno estila ese nodo.

**2 · `Calendar` — teclado de la rejilla (B)**
- (a) Implementar `role="grid"` + roving tabindex + flechas ahora, en esta revisión.
- (b) Pasarlo a definitivo con lo visual arreglado y abrir un pendiente explícito de a11y de rejilla.
→ **Recomiendo (b)**, pero con la condición de que `DatePicker` reciba ya su `label` (pendiente ya anotado) para que el panel tenga nombre accesible. El teclado de rejilla es un componente-semana de trabajo por sí solo y `Calendar` no tiene consumidores directos fuera del DatePicker.

**3 · Familia chat — forma del globo (C)**
`MessageBubble` cablea una esquina de 4px (`border-end-*-radius: 0.25rem`) para hacer la «colita» del globo.
- (a) Esquinas rectas en las cuatro, como el resto del sistema: el emisor se distingue por color y alineación (ya lo hace: `margin-inline-start/end: auto`).
- (b) Conservar la colita como excepción documentada de la familia conversacional, tokenizada.
→ **Recomiendo (a)**. Spinner y TypingIndicator ya son cuadrados; un globo con una esquina redonda dentro de un hilo de indicadores cuadrados es incoherente, y la alineación izquierda/derecha más el par de color ya identifican al emisor sin ayuda de la forma.

**4 · Familia chat — el globo del usuario en oscuro (C)**
`message-bubble.user-bg` = `color.primary` = prusia = `color.background.dark`: sobre `.surface-dark` el globo del usuario desaparece.
- (a) En oscuro, invertir el par: usuario con relleno claro (`grey-lightest`) y texto prusia; asistente con relleno transparente y borde 1px.
- (b) Usuario con `color.accent-1` (lavanda) en ambos temas, como el `Button primary` — par de color autocontenido, cero tokens `surface-dark-*`.
- (c) Dejar los dos globos sin relleno y separarlos solo por alineación y borde.
→ **Recomiendo (b)**: es el patrón que el sistema ya bendice explícitamente para `Button primary`, no añade tokens de superficie oscura y sobrevive a los dos temas sin decisión adicional. **(c) es la más coherente con «la elevación es fondo + borde»** si prefieres apurar la identidad.

**5 · `MessageComposer` — el `Textarea` pisado desde fuera (B)**
El composer anula borde, sombra, padding y `min-height` del átomo con `.message-composer .textarea`.
- (a) Dar a `Textarea` una variante (`bare` / `borderless`) y que el composer la use. Es lo que se hizo con `UserMenu compact` y `OrgSwitcher block`.
- (b) Dejar el override y documentarlo como excepción.
→ **Recomiendo (a)**. `Textarea` ya es definitivo, así que es una prop nueva (minor), no un breaking; y elimina el único caso vivo del antipatrón que se corrigió en `AppHeader`.

**6 · `CommandPalette` — cmdk y Radix (C)**
- (a) Reescribir sobre `Modal` + lista propia de Base UI (o `Menu` con filtro). Saca Radix del `dist` y cumple CLAUDE.md. Coste: alto, 16 consumidores.
- (b) Mantener cmdk y documentar la excepción en CLAUDE.md.
- (c) Mantener cmdk ahora y pasar la paleta a definitiva solo cuando exista un `Combobox` de Base UI estable que la sustituya.
→ **Recomiendo (c)**: la paleta funciona y está bien resuelta en a11y; reescribirla hoy es riesgo puro por una dependencia transitiva que no llega al usuario. Pero entonces **no debe salir de «Por revisar»** — que se quede ahí con el motivo escrito, en vez de declararla definitiva con una violación conocida.

**7 · `CalendarPlanner` — duplicación de `Calendar` (C)**
Reimplementa `getCalendarDays`, el encabezado de días, la navegación de mes y 66 tokens paralelos.
- (a) Extraer la rejilla de mes a un `_shared/calendarGrid` (como se hizo con `_shared/dropdownItems` para los menús) y que Planner sea `Calendar` con `renderDay`.
- (b) Retirarlo (ver decisión 8).
→ **Recomiendo (a) solo si se conserva**; si se retira, la duplicación deja de ser problema.

**8 · `CalendarPlanner`, `CalendarRoster` y `PrevNextNav` — retirada (D)**
Los tres tienen **cero consumidores** en `/Users/suvi/Dev/slxd/{apps,packages}`, y suman ~1 700 líneas más tres JSON de tokens.
- (a) Retirarlos (`entry-points.mjs`, `package.json › exports`, `src/index.ts`, tokens y carpetas). Major.
- (b) Conservarlos y meterlos en la cola de revisión.
- (c) Congelarlos: dejarlos en «Por revisar» indefinidamente, sin invertir en ellos.
→ **Antes de decidir hay que comprobar los repos que no he podido mirar** (la web, 360, learn-app, rubik, keycloakify-starter): `CalendarRoster` huele a cuadrante de turnos de 360, no de la suite. Con esa comprobación en verde, **recomiendo (a) para `PrevNextNav`** (60 líneas, cero uso, y los calendarios que debían usarlo llevan su propia navegación) y **(a) para `CalendarRoster`**; para `CalendarPlanner`, (a) también, ya que `Calendar` + `renderDay` cubriría el caso el día que aparezca.

**9 · Plantilla `Chat` (D)**
Es una story de 278 líneas sin componente, sin export y sin entrada de build, catalogada como `Templates/` cuando CLAUDE.md reserva esa categoría para layouts reutilizables.
- (a) Retirar la story: el mismo montaje ya lo enseñan `ConversationThread` + `MessageComposer` + `AppShell` por separado.
- (b) Convertirla en un `ChatShell.tsx` real (layout de tres zonas: lista · hilo · composer) y exportarlo. Es literalmente el shell que `lmsmcp/ai-chat` y `lrs/StoreChat` están montando cada uno por su cuenta.
→ **Recomiendo (b)**. Hay dos apps duplicando ese montaje; es el mismo argumento que justificó las subpartes de `Card` («cinco apps repetían estas mismas reglas en su CSS»). Si no quieres abrir componente nuevo ahora, (a) y que la demo viva en el MDX de `ConversationThread`.

**10 · `Alert`/`Toast` — nota de coordinación (no es decisión nueva)**
La rama `toast-definitivo` decide si Toast comparte la cara de Alert. Sea cual sea el resultado, **`Modal` y `Sheet` de la tanda 3 heredan esa decisión** para el aspa de cierre (`Button ghost` vs. botón propio). Conviene cerrar Toast antes de arrancar la tanda 3, o al menos fijar el criterio del aspa.

---

## Ficheros críticos para la implementación

- `/Users/suvi/Dev/studiolxd/brand/notes/REVISION-pendientes.md` — la lista viva que se tacha; hay que actualizarla en cada tanda.
- `/Users/suvi/Dev/studiolxd/brand/src/stories/molecules/AppLauncher/AppLauncher.css` — 58 líneas de CSS oscuro muerto (129-186) y `calc(*1ms)` en `:39`.
- `/Users/suvi/Dev/studiolxd/brand/src/stories/molecules/ConversationList/ConversationList.css` — cinco custom properties inexistentes, incluidos los tres anillos de foco.
- `/Users/suvi/Dev/studiolxd/brand/src/stories/molecules/Table/Table.css` — cuatro `calc(*1ms)` que anulan las transiciones, más el `gap: 0.375rem`.
- `/Users/suvi/Dev/studiolxd/brand/src/stories/molecules/Modal/Modal.css` — `150ms` cableado y tokens de foco prestados de Button; es la base de Sheet, CommandPalette, ImageCropDialog y CalendarPlanner.
- `/Users/suvi/Dev/studiolxd/brand/scripts/entry-points.mjs` y `/Users/suvi/Dev/studiolxd/brand/package.json` — los tres sitios de registro, si se retiran Planner/Roster/PrevNextNav.

## Decisiones del usuario (2026-08-27, tras el análisis)
1. Table: (a) `<button>` dentro del `th`, `aria-sort` en el `th`.
2. Calendar: (a) rejilla accesible completa ahora (`role="grid"`, roving tabindex, flechas, PageUp/Down, Home/End).
3. MessageBubble: esquinas rectas + **colita triangular** (pseudo-elemento, solo contorno, tamaño por token) en la esquina inferior del lado del emisor; además alineación y color.
4. Globo del usuario: (c) ningún globo lleva relleno; se separan por alineación y borde 1px (par claro/oscuro por token).
5. MessageComposer: (a) variante `bare` en `Textarea`; fuera el override desde fuera.
6. CommandPalette: (a) reescribir sobre `Modal` + lista propia de Base UI; fuera cmdk/Radix del dist.
7. CalendarPlanner: (a) rejilla de mes compartida en `_shared/calendarGrid`; Planner = Calendar + `renderDay`.
8. CalendarPlanner, CalendarRoster y PrevNextNav: SE CONSERVAN (los usan otros repos de Studio LXD fuera de la suite) → entran en la cola de revisión, no se retiran.
9. Plantilla Chat: (b) convertir en `ChatShell` real (lista · hilo · composer) exportado.
