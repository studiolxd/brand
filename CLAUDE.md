# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm storybook        # Launch Storybook on port 6006

# Build
pnpm build:tokens     # Regenerar tokens CSS+SCSS+JSON desde Style Dictionary (sd.config.mjs)
pnpm build:email-assets # Regenerar public/email/ (logotipo PNG + fuente): lo que se publica en el host de assets del correo
pnpm build:lib        # Build de librería React → dist/ (¡solo componentes JS/CSS!)
pnpm build:css        # Bundle CSS standalone → dist/brand.css
pnpm build:tokens-css # Bundle de tokens CSS → dist/tokens.css
pnpm build:fonts-css  # Bundle de @font-face → dist/fonts.css (@studiolxd/brand/fonts)
pnpm build:all        # Los cinco builds anteriores, en el orden obligatorio (ya no hay prepare: dist/ va committeado)
pnpm build-storybook  # Build estático de Storybook

# Quality
pnpm lint             # Run ESLint (flat config format)
pnpm test             # Vitest: proyectos unit (node) + components (jsdom + Testing Library)
pnpm test:stories     # Vitest: stories en navegador (Playwright/Chromium) — pesado
pnpm release:check    # Puerta de calidad: lint + tsc + test + build:all + sync de dist/ (añade --with-stories para incluir test:stories)

# Docker — Storybook image → ghcr.io
docker buildx build --platform linux/amd64 -t ghcr.io/studiolxd/studiolxd-brand:latest --push .
```

> **IMPORTANTE:** Cada vez que se modifique un archivo JSON de tokens, ejecutar `pnpm build:tokens` antes de commitear. Los CSS bajo `src/tokens/` son auto-generados y se sobreescriben en el siguiente build.
>
> **IMPORTANTE:** `pnpm build:lib` borra y regenera `dist/` pero **no** regenera `dist/brand.css`, `dist/tokens.css` ni `dist/fonts.css`. Después de `build:lib` ejecutar siempre `pnpm build:css && pnpm build:tokens-css && pnpm build:fonts-css`, o usar `pnpm build:all` para el build completo.
>
> **IMPORTANTE:** No se taggea (`git tag vX.Y.Z`) sin `pnpm release:check` en verde. El script (`scripts/release-check.mjs`) encadena `lint` → `tsc -b` → `test` → `build:all` y termina comprobando que `dist/` quedó realmente regenerado y en sync: (1) que existe un artefacto en `dist/` para cada entrada de `package.json#exports`, y (2) que `git status --porcelain -- dist` queda limpio tras el build — si el build cambia algo en `dist/`, es que el `dist/` committeado no correspondía al `src/` actual, exactamente el fallo que dejó pasar v27.1.0 sin `dist`. `test:stories` es un paso opcional (`pnpm release:check -- --with-stories`) porque depende de Chromium/Playwright y no siempre está disponible (p. ej. en redes restringidas). NO se engancha a ningún hook de ciclo de vida (`prepack`/`prepare`/`postinstall`): pnpm los ejecuta al instalar el paquete por git en cada consumidor y rompería la instalación de la suite (pasó en v25.28.0). El guardián es correr `release:check` a mano antes del `git tag`. Ver también § «Flujo al publicar cambios».

Testing: tres proyectos Vitest — `unit` (node, `src/**/*.test.ts`), `components` (jsdom + Testing Library, `src/**/*.test.tsx`, setup en `test/setup.ts`) y `storybook` (stories en Chromium vía Playwright). `pnpm test` corre los dos primeros; `pnpm test:stories` el tercero.

Fundamentos y componentes no se pisan: **Foundations explica el sistema** (reglas, escalas, catálogos, el porqué) y **la doc de un componente explica su API** (props, uso, contrato). Cada hecho vive en un solo sitio; el otro remite. Los tokens globales (`icon.size-*`, `breakpoint.*`…) se tabulan en Foundations; en la doc del componente solo van los tokens propios de ese componente.

Tests de story: toda story de prueba se llama `Test — …` y lleva `tags: ['!dev']`. Sigue ejecutándose en `test:stories` (cada story es un test; `play` añade las afirmaciones), pero no aparece en el catálogo ni en las docs: el Storybook solo enseña usos reales.

Chromatic: el token del proyecto NO va en el package.json ni en el repo. Vive en `.env` (ignorado por git) como `CHROMATIC_PROJECT_TOKEN`; el CLI lo lee solo. `pnpm chromatic` publica de verdad — para validar sin consumir snapshots, `npx chromatic --dry-run`.

## Architecture

Librería de componentes React distribuida como paquete npm vía git (`@studiolxd/brand`). Dos salidas de build:

- **`dist/index.js` + `dist/index.css`** — componentes React (ESM) + estilos. Para cualquier aplicación React.
- **`src/tokens/scss/`** — tokens SCSS sin `var()`, con valores resueltos, distribuidos directamente desde el repo (no pasan por `dist/`). Para cualquier aplicación que no use React y necesite los tokens (PHP, servidor, herramientas de diseño…). Dos entrypoints auto-generados por `build:tokens`: `_index.scss` (`@forward`, Sass moderno — export `./scss`) y `_index.legacy.scss` (`@import`, para compiladores sin `@use`/`@forward` como el scssphp de Moodle — export `./scss/legacy`). También hay exports por fichero: `./scss/global/*`, `./scss/components/*`, `./scss/molecules/*`.

**Atomic Design** en `src/stories/`:
- `atoms/` — elementos básicos (Button, Input, Link…)
- `molecules/` — combinaciones de átomos (InputField, Form…)
- `organisms/` — secciones complejas (ContactForm…)
- `sections/` — bloques de página completos (AppHeader, SiteHeader, SiteShell…)
- `pages/` — plantillas de página completas
- `foundations/` — documentación de tokens (colores, tipografía, espaciado…)
- `email/` — el correo: layout y primitivas sobre `react-email`. Categoría aparte porque el medio no es la web (ver § «El correo»)

Cada componente tiene tres archivos co-localizados:
- `ComponentName.tsx` — componente funcional tipado
- `ComponentName.stories.tsx` — stories con `Meta<typeof Component>` / `StoryObj`; `title` sigue el patrón `'Átomos/Nombre'`, `'Moléculas/Nombre'`, etc.
- `ComponentName.css` — estilos BEM importados por el TSX

**Storybook MCP**: configurado en `localhost:6006`. Usar siempre las herramientas MCP para verificar props antes de usarlas — nunca asumir propiedades.

### Checklist para añadir un nuevo componente

Cada componente nuevo debe registrarse en **tres sitios** o no estará disponible para los consumidores del paquete:

1. **`scripts/entry-points.mjs`** — añadir entrada en `entryPoints` con la ruta al `.tsx`. Si el componente tiene estado interno, eventos o usa hooks del browser, añadirlo también a `clientComponents` (genera el `'use client'` en el `.js` compilado).
2. **`package.json` › `exports`** — añadir entrada `"./nombre"` con `types` apuntando a `dist/_types/.../Component.d.ts` e `import` apuntando a `dist/nombre.js`.
3. **`src/index.ts`** — añadir `export { Componente }` y `export type { ComponenteProps }` en la sección correspondiente (Atoms / Molecules / …), en orden alfabético.

> **IMPORTANTE:** Olvidar `entry-points.mjs` o `package.json › exports` deja el componente con tipos pero sin `.js` compilado — el consumidor puede importar el tipo pero falla en runtime.
>
> **Excepción — `src/stories/email/`:** los componentes de correo NO van en `src/index.ts`. Se construyen sobre `react-email`, que es un peer **opcional**: si colgaran del barril, cualquier app que importe un `Button` tendría que instalarlo para resolver el import. Se publican solo por su subpath, `@studiolxd/brand/email`.

## CSS y tokens

### Reglas no negociables

1. **Token first, siempre.** Toda propiedad CSS debe referenciar un token (`var(--...)`). Sin valores hardcoded (colores, tamaños, espaciado, tipografía, radios…).
2. **Tokens en cascada.** Los tokens de componente heredan de tokens de control/base cuando aplica (ej. `--input-font-family: var(--control-font-family)`). Esto permite personalización solo con tokens, sin tocar CSS.
3. **Los archivos de token tienen fuente JSON obligatoria.** Todo CSS bajo `src/tokens/` se genera con Style Dictionary. Flujo para un nuevo conjunto de tokens: (1) crear `tokens/component/<name>.json`, (2) añadir entradas CSS y SCSS en `sd.config.mjs`, (3) ejecutar `pnpm build:tokens`. La única excepción manual es `src/tokens/index.css` (manifiesto de imports).
4. **Especificidad BEM.** Los modificadores usan doble clase (`.block.block--modifier`) para ganar sobre el selector base.
5. **Ejes inline/block, nunca x/y.** Los tokens y propiedades CSS de padding y similares usan siempre `inline`/`block` (alineado con propiedades lógicas CSS). En CSS escribir siempre `padding-block` + `padding-inline` desdoblados, nunca la shorthand `padding: a b`. **Única excepción: `src/stories/email/`** — Outlook de escritorio renderiza con el motor de Word, que no conoce `margin-block` ni `padding-inline`; ahí los *tokens* siguen la convención lógica, pero la propiedad CSS de destino va en físicas.
6. **Documentación MDX en castellano.** Cualquier archivo `.mdx` nuevo o modificado debe estar íntegramente en castellano.
7. **El subrayado es una línea, no `text-decoration`.** En el DS no se usa `text-decoration: underline`: subrayar es pintar una línea bajo el elemento con `box-shadow: inset 0 calc(-1 * <grosor>) 0 0 currentColor` y reservarle el hueco con `padding-block-end: <separación>`, como hacen `Link` y `Button --text`. Dos motivos: (1) `text-decoration` no cubre un SVG, así que un enlace o un botón con icono queda con la línea cortada bajo el texto y ausente bajo el icono; (2) así todos los subrayados del sistema tienen el mismo grosor (`border-width.default`, 1px) y la misma separación (`link.underline-offset`), cosa que `text-decoration` no garantiza porque su grosor y su posición los decide la fuente y el navegador. El grosor y la separación van en tokens del componente que apuntan a esos roles, nunca a un número. Un componente que viste sus propios enlaces anula antes la línea de la base con `box-shadow: none; padding-block-end: 0`. **Dos excepciones, y no se amplían:** `src/vendor/normalize.css`, que es de terceros y no se toca, y `src/stories/email/`, donde el medio no es un navegador —Outlook renderiza con el motor de Word, que no pinta `box-shadow`, y el correo no tiene hoja de estilos donde poner la línea—: ahí el enlace se subraya con `text-decoration: underline` y se desubraya en hover, que es el mismo dibujo con la única técnica disponible. La regla completa, con el porqué, en Foundations → Bordes § «El subrayado es una línea, no `text-decoration`».
8. **Tokens de feedback (error/success/warning/destructive): el sufijo dice la propiedad CSS de destino.** `*-text-on-light|dark` SOLO `color`/borde/outline sobre la superficie ambiente, jamás `background`; `*-fill` SOLO fondos sólidos (universal: mismo color en superficie clara y oscura); `*-fill-text` para el contenido sobre un fill. NO existe par "tint" (contenedor suave): se retiró el 2026-08-24 por inventado — no reintroducir. `warning-*` (el tramo intermedio) se añadió el 2026-09-05 sobre el ámbar de sistema (`color.amber`/`color.amber-light`), NO sobre el amarillo de marca (`accent-2`), que es identidad y no llega a 3:1 sobre blanco.

### Selectores de elemento vs. clase

Los átomos que representan elementos HTML semánticos usan **selectores de elemento** directamente, sin clase BEM:

- `Link.css` → estila `a { }`, `a:hover { }`, `a:focus-visible { }` — el componente `Link` no añade className
- Otros átomos que sigan este patrón deben documentarse aquí

Los átomos que no tienen un elemento HTML unívoco (Button con variantes, Input con estados de error…) siguen usando clases BEM.

### Theming de superficie (dark)

El theming oscuro se genera desde el propio sistema de tokens. Un token de componente `surface-dark-<nombre>` (ej. `button.primary.surface-dark-bg`) es el par oscuro de `<nombre>` (`button.primary.bg`) dentro del mismo grupo JSON. El formato custom `css/variables-with-dark-mode` (`sd.formats.mjs`, registrado en `sd.config.mjs`) separa esos tokens al generar el CSS: los tokens normales van a `:root` de siempre, y cada `surface-dark-<nombre>` remapea la MISMA custom property (`--button-primary-bg`, no `--button-primary-surface-dark-bg`) bajo un selector combinado:

```css
.surface-dark,
[data-theme="dark"],
html.dark {
  --button-primary-bg: var(--color-background-dark);
}
```

- **Activación contextual** (`.surface-dark` en cualquier contenedor anidado) y **activación root-level** (`[data-theme="dark"]` o `html.dark`, para theme managers como `next-themes`) usan el mismo mecanismo — las custom properties se heredan por cascada, así que basta con que el selector matchee un ancestro. **No usar la clase `.dark` a secas fuera de este selector combinado.**
- **Añadir soporte oscuro a un token existente**: añadir el token hermano `surface-dark-<nombre>` en el JSON de `tokens/component/` o `tokens/molecule/` correspondiente (mismo grupo, mismo nombre con el prefijo) y ejecutar `pnpm build:tokens` — sin CSS a mano.
- `src/stylesheets/surface.css` **no existe** (retirado en v21.0.0): todo el modo oscuro sale de tokens `surface-dark-*`; no hay overrides a mano. `.surface-dark` es un lienzo (fondo y color emparejados, en `base.css`).
- El prefijo del token es `surface-dark-`, no `dark-` a secas — evita colisión con convenciones de nombre ad-hoc que pudiera tener algún componente para su propia variante BEM manual. Antes de añadir un token `surface-dark-*` nuevo, comprobar que no colisiona con un `dark-`/`-dark-` ya existente en ese JSON con otro propósito (histórico: `header.json` tuvo este caso — `dark-bg`/`nav-dark-color` eran una variante BEM manual `.header--dark`, ya migrada al sistema estándar, ver más abajo).
- En Storybook, el decorator global de fondo oscuro ya añade `.surface-dark` automáticamente.
- Cobertura: todo lo que alguna vez tuvo remapeo oscuro (definido antes a mano en `surface.css`) está migrado a este sistema, más Table, Sidebar/SidebarNav, Switcher, Modal (ya no tiene prop `dark` — reacciona solo a `html.dark`/`[data-theme="dark"]`), Header (ya no tiene prop `dark` ni clase `.header--dark` — idem), y Alert/Tag (solo las variantes cuyo color de marca colisiona con el fondo de `.surface-dark`: `default` en Alert, `primary`/`info` en Tag — el resto de variantes semánticas de Alert/Tag usan colores saturados que ya contrastan en cualquier fondo y no necesitan override).
- Patrón para variantes "prussian" (`color.primary`): varios componentes tienen una variante cuyo color de marca es `color.primary`, que resuelve al mismo valor que `color.background.dark` (ambos son `color.prussian`) — esa variante se vuelve invisible sin un override `surface-dark-*`. Al añadir cobertura a un componente nuevo, comprobar primero si tiene esta colisión antes de asumir que "no necesita cambios en dark".
- `Button` variante `primary` es una excepción deliberada: NO tiene tokens `surface-dark-*` (se quitaron a propósito) — su fondo es `color.accent-1` (lavender) con texto `color.primary`, un par de color autocontenido que no depende de la superficie ambiente, así que se ve y contrasta igual en `.surface-dark`/`html.dark` que en claro. No añadir un override `surface-dark-*` a `button.primary` sin que sea una decisión de diseño explícita — la instrucción vigente es que se mantenga idéntico en ambos temas.
- **La regla de derivación** (Foundations → Colores § «Tema claro y oscuro»): el valor oscuro no se decide, se deriva del rol al que apunta el claro. Texto → el mismo rol `-on-dark`; superficie → el mismo rol `-on-dark`; borde, separador, anillo de foco y las líneas/barras de estado → `color.text.on-dark`; marca (relleno prusia) → el par de `Button primary` (relleno `color.accent-1` con tinta `color.primary`), y si el componente ya usa lavanda para otra variante (`Tag`, `NumberBadge`, `ProgressBar`) se invierte a blanco/prusia; feedback → `*-text-on-dark`, y los `*-fill` no cambian (son universales); deshabilitado → opacidad, sin par.
- **Un relleno autocontenido no lleva par oscuro**: `Button primary`, `Card primary`, los rellenos saturados (`accent-*`, `support-*`) de Card/Tag/Alert y los `*-fill` de feedback se ven igual en las dos superficies. Añadirles un `surface-dark-*` es el error contrario. `Alert`/`Toast` variante `default` son la excepción declarada: relleno prusia en ambas, separado por su borde blanco.
- **`src/tokens/surface-dark-derived.css` es generado** (`pnpm build:tokens`, cola de `sd.config.mjs`). Un `var()` dentro de una custom property se sustituye en el elemento que la declara: `--sheet-title-color: var(--modal-title-color)` vive en `:root` y llega al Sheet ya resuelto en claro, así que remapear `--modal-title-color` bajo `.surface-dark` no lo arrastraba. El fichero vuelve a declarar bajo los selectores oscuros todo token que referencie a otro con par oscuro, por punto fijo — mismo mecanismo que `surface-public.css`. No editarlo a mano: apuntar al token en el JSON basta.
- `sd.formats.mjs` reescribe las referencias a un `surface-dark-*` de **otro** componente al nombre claro de esa variable (`{menu.surface-dark-separator-color}` → `var(--menu-separator-color)`): el par oscuro se publica con el nombre del claro, así que la referencia literal apuntaba a una variable inexistente.
- Cobertura tras la fase 0 (2026-08-28): quedaban sin ningún valor oscuro FileUpload, NumberInput, NumberBadge, Tooltip, TypingIndicator, TimeSelect, Radio, EmptyState (icono), InputPhone (separador de país), Sidebar (asa), CommandPalette (placeholder), MultiSelect (pills) y ProgressBar (relleno primary); todos tienen ya sus pares por la regla, con story «En superficie oscura». Popover, Sheet, Menu, UserMenu, OrgSwitcher y Checkbox/Switcher/Avatar/Spinner/PasswordField no necesitaban tokens propios: heredan por el fichero derivado. Si un componente nuevo se ve mal en oscuro, la respuesta es su par `surface-dark-*` por la regla de derivación — nunca CSS a mano.

### Dos superficies de lectura (aplicación / pública)

El sistema lee a dos tamaños emparejados con las tallas de control: **aplicación** (cuerpo 16px, controles `md`) y **pública** (dentro de `SiteShell`: cuerpo 20px, controles `lg`, escala de títulos un peldaño arriba). La regla completa está en `src/stories/foundations/Typography.mdx` § «Dos superficies de lectura».

- Los seis niveles y las props `size` de `Heading`/`Fieldset` beben de una sola escala de títulos, `text.size.1`…`text.size.10` (`--text-size-N`). No usar `--font-size-N` crudo para el tamaño de un título: rompe el peldaño de la superficie pública.
- `text.paragraph.small|large.font-size` son **peldaños relativos al cuerpo**, no cifras: uno por debajo y uno por encima.
- Un componente que muestra **texto corriente** referencia `{text.font-size}` (y `{text.line-height}` si lo tiene) o, para letra menor, `{text.paragraph.small.font-size}`. Un componente de **interfaz** (todo lo que tiene tallas `sm`/`md`/`lg`) mantiene su token propio. Un campo dentro de una tabla sigue siendo un campo.
- **`src/tokens/surface-public.css` es generado** (`pnpm build:tokens`, cola de `sd.config.mjs`). Vuelve a declarar bajo `.site-shell` todo token que referencie esos tokens base, porque un `var()` dentro de una custom property se sustituye en el elemento que la declara: `--alert-title-font-size: var(--text-font-size)` vive en `:root` y llega ya resuelto a 16px. No editarlo a mano; añadir la referencia en el JSON y rebuildear basta.

### Base UI — el motor de conducta

- `render` recibe un elemento de React: solo desde componentes **cliente**. Desde un Server Component el elemento no cruza al cliente (falla con «Element type is invalid»); ahí, `Button href`.

Todo comportamiento accesible complejo (menús, popovers, diálogos, tooltips, select, tabs, acordeón, switch, checkbox, radio) se construye sobre **`@base-ui-components/react`**. **Radix queda prohibido** (`@radix-ui/*` no puede aparecer en `src/`): Base UI es su sucesor, de los mismos autores, y el DS no mezcla motores. Reglas:

- **`render`, nunca `asChild`.** Para poner las clases y handlers de un componente sobre otro elemento (un `Link` del router, un botón propio) se usa la prop `render` de Base UI o el hook `useRender` (`@base-ui-components/react/use-render`). `Button` lo expone como `render`.
- **Estados por atributos de Base UI** en el CSS: `[data-open]` / `[data-closed]` en popups, `[data-popup-open]` en triggers, `[data-highlighted]`, `[data-checked]`, `[data-disabled]`. Nada de `[data-state="…"]`.
- **Posicionamiento**: `Portal` → `Positioner` (side, align, sideOffset) → `Popup`. La variable `--transform-origin` la pone el Positioner.
- Los `renderLink` que recibe un menú deben propagar **todas** las props que les llegan: el motor inyecta rol, tabIndex y handlers de teclado en el enlace.

### Textos de componente — siempre prop, nunca cableados

Todo texto que un componente emita **por su cuenta** (no vía `children` ni vía sus datos) va en una
prop opcional cuyo **default es el texto castellano**. Aplica igual a `aria-label`, a texto para
lectores de pantalla y a texto visible.

```tsx
// ✗ Incorrecto — el consumidor multiidioma no puede traducirlo
<button aria-label="Página siguiente">

// ✓ Correcto
function Pagination({ nextLabel = 'Página siguiente' }: PaginationProps) {
  return <button aria-label={nextLabel}>;
}
```

- Nombres: `<cosa>Label` para etiquetas y textos cortos, `<cosa>Message` para mensajes,
  `<cosa>Error` para errores, `<cosa>Hint`/`<cosa>Placeholder` para pistas.
- Si el texto interpola un valor, la prop es una **función**: `pageLabel?: (page: number) => string`.
- Las **listas** de opciones se traducen pasando la lista entera (`pageSizeOptions`,
  `legendItems`), no con una prop de texto por elemento.
- El JSDoc de la prop indica el default y que es castellano.
- Meses, días y formatos de fecha **no** son props de texto: van por `locale` (default `'es-ES'`)
  delegando en `Intl`.

Documentado para los consumidores en `src/stories/foundations/Internacionalizacion.mdx`, que lleva
la tabla de componentes con props de texto — actualizarla al añadir props nuevas.

### Accesibilidad — VisuallyHidden

Para texto que debe ser leído por lectores de pantalla pero invisible visualmente, usar el átomo `<VisuallyHidden>` en lugar de `className="visually-hidden"` directamente:

```tsx
// ✓ Correcto
<VisuallyHidden>Descripción para lectores de pantalla</VisuallyHidden>

// ✗ Evitar en componentes nuevos
<span className="visually-hidden">...</span>
```

Excepciones — **cuando la receta tiene que ir sobre un elemento que ya existe**, porque el
`<span>` envolvente de `VisuallyHidden` rompería algo. Son estas tres, y no se amplían sin
apuntarlas aquí:

- `Label` aplica `visually-hidden` sobre el propio `<label>` cuando `hidden={true}`: lo que se
  oculta es la etiqueta entera, no un texto dentro de ella.
- `StarRating` la aplica sobre cada `<input type="radio">`: envolverlo en un `<span>` rompería
  la relación `<label>`↔`<input>` de la que vive el control.
- `Table` la aplica sobre el `<caption>`: el modelo de contenido de `<table>` no admite un
  `<span>` ahí.

El patrón común: si el nodo que hay que ocultar ya está fijado por el HTML (es el elemento del
componente, o su sitio en la tabla no admite otro), la clase va sobre él; en cualquier otro
caso, `<VisuallyHidden>`.

### Button como enlace

`Button` acepta prop `href?: string`. Cuando se pasa, renderiza `<a>` en lugar de `<button>`. El estado `disabled` en links añade `aria-disabled="true"` y elimina el `href` (en lugar de `disabled` nativo, que no existe en `<a>`):

```tsx
<Button href="/contacto">Ir a contacto</Button>
<Button href="/contacto" external>Enlace externo</Button>
```

### Distribución SCSS

Las aplicaciones no-React reciben **solo los tokens SCSS** (`src/tokens/scss/`, vía los exports `./scss`, `./scss/legacy` y `./scss/{global,components,molecules}/*`), no los componentes ni el CSS de componentes. El CSS de componentes (clases BEM) es un detalle de implementación interno de React y no se expone. Los tokens SCSS tienen valores resueltos (`outputReferences: false`) para que puedan usarse sin dependencia de CSS custom properties.

## Tokens desde JavaScript

Los mismos JSON de `tokens/**` salen además a `src/tokens/tokens.json` (plataforma `js` de `sd.config.mjs`, formato `json/css-variables`): un mapa plano `{ '--nombre': 'valor' }` con los valores **ya resueltos**, con el mismo `transformGroup` que la plataforma css — así el JSON no puede desincronizarse del `:root` generado. Encima va `src/tokens/tokens.ts` (export `./tokens`) con `tokens`, `token()` y `tokenPx()`.

Es para consumidores que necesitan el valor **como dato** y no como CSS: el correo, un canvas, un PDF. Para estilar una página la respuesta sigue siendo el CSS — leer un token en JS para escribirlo inline se salta la cascada, el tema oscuro y la superficie pública.

Los `surface-dark-*` se filtran, igual que en SCSS: se publican con el nombre de su par claro y sobrescribirían la misma clave. Quien necesite los dos temas los deriva de los roles `*-on-dark`.

## El correo

`src/stories/email/` es el único rincón del repo cuyo medio no es un navegador, y de ahí salen todas sus rarezas. Las reglas propias, además de las dos ya citadas (fuera de `src/index.ts`; propiedades físicas):

- **Todo estilo va inline y resuelto.** No hay hoja de estilos ni custom properties: Outlook no resuelve `var()`. De ahí que los estilos sean objetos JS (`emailTheme.ts`) y no un `.css`.
- **El correo lee a la talla PÚBLICA, no a la de aplicación.** Un correo es parte pública de la suite, como la web y las páginas de acceso: cuerpo, título, letra menor y botón (talla `lg`) salen de la superficie de `SiteShell`. Como ese remapeo se genera en CSS y el correo no consume CSS, los tokens apuntan a los **tokens fuente** (`{site-shell.*}`, `{button.lg-*}`), nunca a los `--site-shell-*` ya remapeados. El ancho no sube con la talla: los 600px son del medio, no de la retícula.
- **`EmailButton` pinta el botón Y, debajo, la misma dirección en texto.** Son un solo componente para que viajen juntos: hay clientes que destrozan los botones y la gente reenvía correos, así que el enlace en texto es el plan B. Su prop `fallbackLabel` es **obligatoria y sin default castellano** — la única así del repo, anotada como excepción en Foundations › Internacionalización: el correo vive en seis idiomas que conoce `mailer`, y hacerla obligatoria es lo que impide que una plantilla se deje el respaldo. La dirección va entera, en texto plano (no en un `<a>`), y con `word-break`/`word-wrap` — nunca `overflow`, que escondería justo lo que hay que copiar.
- **El botón del correo va a ancho completo (`{button.block-width}`), siempre y sin media query**: Outlook las ignora. Y sin padding horizontal — siendo de ancho completo lo mide la columna, así que el inset de `lg` solo estrecharía el texto (partía la etiqueta en dos líneas a 375px) y además obligaría a un `box-sizing` que el motor de Word no entiende.
- **`tokens/component/email.json` no sale a CSS ni a SCSS** —no hay CSS de correo que los consuma—; sale a `src/stories/email/emailTokens.ts`, generado por `pnpm build:tokens`, con los valores en píxeles absolutos. No editarlo a mano.
- **El correo es solo claro: no gestiona modo oscuro.** Se retiró el mecanismo entero (paleta oscura, `prefers-color-scheme`, las `meta` de esquema y las clases `email-*` que solo servían para engancharlo). Esto NO impide que Outlook Windows o Gmail Android inviertan los colores por su cuenta — lo que se deja de hacer es gestionarlo; con fondo blanco, tinta oscura y el blanco horneado del logotipo, el resultado invertido aguanta. Hay un test que vigila que no vuelva (`EmailLayout.test.tsx`).
- **La única hoja de estilos del correo es `a:hover`**, lo único que no cabe en un atributo `style`. Todo lo demás va inline.
- **`react-email` es un peer opcional** y va en los externals de `vite.lib.config.ts`. Radix sigue prohibido; esta es la única otra dependencia de comportamiento del repo, y solo para el correo.

Las **plantillas concretas** (verificar el correo, restablecer la contraseña…) son producto y viven en `@slxd/mailer`, no aquí.

## Storybook

### Nomenclatura
- Nombres técnicos (títulos de categoría, exports, props) en inglés. Prosa MDX en castellano.
- Categorías: `Atoms/`, `Molecules/`, `Organisms/`, `Sections/`, `Templates/`, `Pages/`, `Email/`.
- `Email/` es categoría propia y no un peldaño del Atomic Design: sus piezas no se combinan con las de la web ni se ven en un navegador. Sus stories se miran en un `<iframe>` (`EmailPreview`), que es lo más parecido a un cliente de correo.
- Distinción `Templates/` vs `Pages/`: Templates son layouts reutilizables con contenido variable (Project, Legal). Pages son instancias únicas con contenido real no replicable (Home).

### Imports
Importar siempre desde `@storybook/react-vite`, nunca desde `@storybook/react`:
```ts
// ✓ Correcto
import type { Meta, StoryObj } from '@storybook/react-vite';

// ✗ Incorrecto
import type { Meta, StoryObj } from '@storybook/react';
```

### Stories de dark mode y superficie oscura
No crear stories dedicadas para dark mode. El decorator global `withSurface` en `preview.tsx` activa el tema oscuro automáticamente al cambiar el fondo a oscuro desde el switcher de Storybook. Cualquier story se puede explorar en dark mode sin necesidad de duplicarla.

`withSurface` no envuelve la story en un `<div class="surface-dark">`: eso deja fuera los portales (Popover, Menu, Tooltip, Modal, Select renderizan en `document.body`, fuera del árbol de la story). En su lugar pone `data-theme="dark"` en `document.documentElement` (con `useEffect`, limpiando el atributo al desmontar o al volver a claro) — las custom properties `surface-dark-*` cascadean por herencia a cualquier descendiente del `<html>`, portales incluidos, y `body` ya pinta su propio fondo/color desde esos tokens (`base.css`), así que el lienzo del canvas queda coherente sin div adicional.

Distinto es **enseñar** en el catálogo que un componente vive sobre superficie oscura (un `Hero` en una banda oscura, un `SiteNav` en la cabecera). Para eso el mismo decorator lee `parameters.surface`:

```ts
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};
```

Envuelve la story en `.surface-dark` —el lienzo del sistema (fondo y color emparejados en `base.css`), el mismo que pinta `Container surface="dark"`— sin estilos inline ni `background` a mano. Es el patrón para toda story oscura: no usar `<div className="surface-dark" style={{ background: … }}>` ni la utilidad `.bg-dark` en stories nuevas. Si lo que se enseña es la banda en sí (no el componente sobre ella), `Container surface="dark"` dentro del `render` sigue siendo válido.

## TypeScript

Strict mode (`tsconfig.app.json`). Sin locals ni parámetros sin usar — el build falla si hay violaciones. Target ES2023, module resolution `bundler`.

## ESLint

ESLint 9 flat config (`eslint.config.js`). TypeScript, React Hooks, React Refresh y Storybook. Ignora `dist/`.

## Versionado

El paquete sigue **semver** y se distribuye vía git tags. Los consumidores pinean a un tag específico (`github:studiolxd/brand#vX.Y.Z`): la web, 360, learn-app, rubik, keycloakify-starter y **las 10 apps de la suite slxd** (monorepo `/Users/suvi/Dev/slxd`, que desde v14 consume este paquete en lugar de su copia `@slxd/ui`, ya retirada). Un breaking aquí rompe a todos al hacer bump: majors con cuidado.

### Reglas

- **patch** (`0.1.0` → `0.1.1`): bug fixes, regeneración de dist, ajustes de tokens que no cambian la API.
- **minor** (`0.1.0` → `0.2.0`): nuevos componentes, nuevas props, nuevas variantes, nuevos tokens.
- **major** (`0.2.0` → `1.0.0`): breaking changes — props renombradas/eliminadas, clases BEM renombradas, tokens eliminados.

### Flujo al publicar cambios

1. Actualizar `"version"` en `package.json` según el tipo de cambio y añadir la entrada correspondiente en `CHANGELOG.md`.
2. `pnpm release:check` en verde (añadir `-- --with-stories` cuando haya Chromium disponible). El script regenera `dist/` (`build:all`) y falla si `dist/` no queda en sync — commitear el `dist/` regenerado forma parte de este paso, no del siguiente.
3. Commit con mensaje que refleje el cambio (ej. `feat: add plain type to List atom`), incluyendo `dist/` si `release:check` lo regeneró.
4. Crear tag anotado y push:
   ```bash
   git tag -a v<version> -m "v<version>"
   git push origin main --tags
   ```

> **IMPORTANTE:** Cada push a `main` debe ir acompañado de un tag si incluye cambios funcionales. Los commits puramente internos (docs, refactors sin impacto en consumidores) pueden agruparse bajo un solo tag.

> **Propuesta pendiente (no instalada):** un hook `pre-push` que rechace el push de un tag `vX.Y.Z` si `git status --porcelain -- dist` no está limpio en ese commit, como red de seguridad adicional a correr `release:check` a mano. No se instala aquí — requiere decidir dónde vive (`.husky/`, `simple-git-hooks`, script propio) y si se quiere obligatorio para todo el equipo.
