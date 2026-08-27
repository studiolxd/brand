# Changelog

Este fichero arranca en `v13.5.0`. El histórico anterior vive en los mensajes de commit
de cada tag (`git log --tags`).

El paquete sigue [semver](https://semver.org/lang/es/): **patch** para bug fixes y
regeneración de `dist`, **minor** para componentes/props/variantes/tokens nuevos, **major**
para breaking changes.

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
