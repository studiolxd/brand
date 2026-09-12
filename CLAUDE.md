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
>
> **IMPORTANTE — caja de ficheros en `dist/` (macOS):** macOS trae `git` con `core.ignorecase=true` por defecto. Bajo eso, un rename a otra caja (`Logo.js` → `logo.js`) dentro de `dist/` puede dejar el DISCO al día pero el ÍNDICE de git con el nombre viejo, y `git status --porcelain` no lo marca como sucio porque en un filesystem insensible a mayúsculas ambos nombres «son» el mismo fichero — así se publicó v37.5.2 con `dist/` en mayúscula y los imports en minúscula, rompiendo la resolución en Turbopack (sensible a mayúsculas incluso en macOS). `release-check.mjs` ya lo detecta (compara `git ls-files -z dist` contra el disco con `readdirSync`, sensible a mayúsculas, en `scripts/lib/case-guard.mjs`), pero además conviene `git config core.ignorecase false` en este repo (no se versiona — es de `.git/config`, cada clon/worktree lo necesita por su cuenta) para que `git status` deje de ocultar estos renames. Si el guardián falla: `git rm -r --cached dist && git -c core.ignorecase=false add -A dist`.

Testing: tres proyectos Vitest — `unit` (node, `src/**/*.test.ts` + `scripts/**/*.test.ts`), `components` (jsdom + Testing Library, `src/**/*.test.tsx`, setup en `test/setup.ts`) y `storybook` (stories en Chromium vía Playwright). `pnpm test` corre los dos primeros; `pnpm test:stories` el tercero.

Fundamentos y componentes no se pisan: **Foundations explica el sistema** (reglas, escalas, catálogos, el porqué) y **la doc de un componente explica su API** (props, uso, contrato). Cada hecho vive en un solo sitio; el otro remite. Los tokens globales (`icon.size-*`, `breakpoint.*`…) se tabulan en Foundations; en la doc del componente solo van los tokens propios de ese componente.

Tests de story: toda story de prueba se llama `Test — …` y lleva `tags: ['!dev']`. Sigue ejecutándose en `test:stories` (cada story es un test; `play` añade las afirmaciones), pero no aparece en el catálogo ni en las docs: el Storybook solo enseña usos reales.

**Un `play` no puede dar por hecho lo que en local le regala el runner.** `pnpm test:stories` renderiza dentro de `act()`, que vacía los efectos de React antes de llamar al `play`; un navegador de verdad —el Storybook compilado, el de captura de Chromatic— no lo hace. De ahí tres reglas, salidas de las 19 stories que rompían en Chromatic y pasaban en local (v34.0.2):

- **Lo que monta un efecto se espera, no se busca.** Un portal (`Modal`, `Sheet`, `Popover`) o un escucha de `window` (el arrastre de `AvatarUpload`) puede no existir todavía cuando arranca el `play`: `await screen.findByRole('dialog')` en vez de `document.querySelector('.modal__content')`, y el evento sintético dentro del `waitFor` que comprueba su efecto, para que se reintente.
- **Se espera al valor final, nunca a `animationend`/`transitionend`.** Donde las animaciones están desactivadas —el navegador de captura— ese evento no llega nunca y el `play` se cuelga hasta el timeout, que Chromatic cuenta como *component error*. `await waitFor(() => expect(getComputedStyle(el).opacity).toBe('1'))`.
- **Un color no se parsea a mano y una fuente no se da por cargada.** El CSS del Storybook compilado va minificado, así que un token puede llegar como `#fff` y no como `#ffffff`: el valor se resuelve con el navegador (una sonda con `color: var(--token)` y su `getComputedStyle`). Y `document.fonts.ready` resuelve en vacío si el `play` corre antes de la primera maqueta: las caras que se vayan a comprobar o a medir se piden con `document.fonts.load(...)`.

Chromatic (regresión visual): el token del proyecto NO va en el `package.json` ni en el repo. Vive **fuera del repo**, en `~/.config/slxd/chromatic.env` como `CHROMATIC_PROJECT_TOKEN`; se carga con `set -a; . ~/.config/slxd/chromatic.env; set +a` antes de llamar al CLI, que lo lee solo.

Se corre **en cada release, después de `pnpm release:check` y antes del `git tag`**: `pnpm chromatic`, que ya lleva `--exit-zero-on-changes` (un cambio visual no rompe el flujo; un error de componente sí devuelve código distinto de cero). Para iterar sobre un subconjunto sin subir el catálogo entero, `pnpm chromatic --only-story-names "Molecules/Modal/**"`; para validar sin consumir snapshots, `npx chromatic --dry-run`.

Cada story se captura en **dos modos**, `claro` y `oscuro` (§ «Stories de dark mode y superficie oscura»), así que el coste por story es de dos snapshots. Lo que acota la factura no es recortar modos sino `onlyChanged` (TurboSnap, ya activo en `chromatic.config.json`): solo se vuelve a fotografiar lo que toca el commit.

La **revisión y la aceptación** de los cambios visuales se hacen en chromatic.com, nunca desde el CLI: no se usa `--auto-accept-changes`.

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
8. **Tokens de feedback (error/success/warning/destructive): el sufijo dice la propiedad CSS de destino.** `*-text-on-light|dark` SOLO `color`/borde/outline sobre la superficie ambiente, jamás `background`; `*-fill` SOLO fondos sólidos (universal: mismo color en superficie clara y oscura); `*-fill-text` para el contenido sobre un fill. NO existe par "tint" (contenedor suave): se retiró el 2026-08-24 por inventado — no reintroducir. **Excepción declarada: `warning-*` (el tramo intermedio) tiene DOS tokens, no cuatro** — `warning-fill` (`{color.yellow}`, el amarillo de marca) y `warning-fill-text` (`{color.primary}`, el prusia, 11,17:1). No existen `warning-text-on-light` ni `warning-text-on-dark` y no se añaden: un aviso va SIEMPRE como relleno con tinta prusia, nunca como tinta suelta — el amarillo da 1,50:1 sobre blanco (no llega al 3:1 de WCAG 1.4.11) y sobre prusia se confundiría con la marca. El intento de darle un ámbar propio (`color.amber`/`color.amber-light`) entró en v30.10.0 y se revirtió: la paleta no se amplía para tapar un rol. El porqué completo, en Foundations › Colores § «El aviso tiene dos tokens, no cuatro».
9. **No se inventan colores.** Un token de color nuevo —de rol, de componente, de estado— solo puede referenciar **primitivos que ya existan** en `tokens/color/` (`palette.json`, `brand.json`, y los de sistema/neutros ya definidos). Añadir un hex nuevo a la paleta es una **decisión explícita del operador**, nunca un efecto lateral de un encargo: si al resolver una tarea parece que falta un color, **se dice y no se crea**. El caso de hoy es el ejemplo de lo que NO se hace: para dar cuerpo al rol `warning` se inventaron `color.amber` (#7D4C00) y `color.amber-light` (#F59E0B) —dos colores de sistema que nadie había aprobado— en el mismo commit que el rol. Se revirtieron enteros el 2026-09-05: el aviso se pinta con `{color.yellow}`, que la paleta ya tenía. Ampliar la paleta para tapar un rol es siempre peor que dejar el rol con la forma que le corresponde (ver la regla 8).
10. **El pie de un diálogo: `Cancelar` solo si el diálogo ejecuta algo.** (a) Si el modal tiene un botón principal que **ejecuta** —formulario, acción, confirmación— lleva `Cancelar`: `Button variant="outline"`, **siempre el primero en el DOM** del `footer` del `Modal`, y el principal después. De ese orden sale la colocación sola: en escritorio `Cancelar` a la izquierda y el principal a la derecha; por debajo de `md` el pie invierte la columna (`column-reverse`, ya en `dialogSurface.css`) y el principal queda arriba. (b) Si el modal **solo se mira** (informativo) o **elegir un ítem ya lo cierra** (selector), NO lleva `Cancelar`: no hay nada que cancelar, y se cierra con el aspa y con `Escape` — como mucho, un `Cerrar`. (c) Los botones **nunca** van en las acciones del `Form` dentro de un `Modal`: van en el `footer` del `Modal` y el submit se ata al formulario con el atributo nativo `form={id}`. (d) `ConfirmDialog` ya lo cumple por construcción; un diálogo de confirmación se escribe con él, no a mano. La regla completa, con los tres ejemplos, en la doc de `Modal` § «El pie: cuándo hay Cancelar».

11. **Ningún componente emite un atributo `style`.** Las apps sirven `style-src 'self'` sin `'unsafe-inline'`, y el navegador descarta en silencio cualquier atributo `style` del HTML (sin violación en consola). Un valor calculado va por `data-*` + una regla por valor en la hoja (`SiteNav` `data-columns`, `ProgressBar` `data-value`), por atributos de presentación de SVG (`Chart`, `Sparkline`, `Skeleton`: `fill`, `stroke`, `width`, `height`…), o —solo para lo que se pinta en cliente, nunca para el primer render del servidor— por el CSSOM con `useCssProperties` (`src/stories/constants/css-properties.ts`). Regla ESLint activa sobre `src/stories/**/*.tsx`; excepciones declaradas: `email/` y `og/` (medios sin CSS), y el catálogo (`*.stories.tsx`, `*.test.tsx`, `foundations/`), que no viaja en el paquete. Entró en v33.0.0 (2026-09-10).

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
- **`color-scheme` es la única declaración oscura escrita a mano**, en `src/stylesheets/base.css`: `color-scheme: light` en `html` y `color-scheme: dark` bajo los tres selectores de `DARK_SELECTORS`. No va por token porque no toma un valor de diseño sino una palabra clave del motor, como el `border-box` y el `scroll-behavior: smooth` que ya conviven en ese fichero; un token solo añadiría una indirección sin ahorrar la escritura de los selectores. Y no se anuncia `light dark`: eso promete al navegador un modo oscuro por `prefers-color-scheme` que el DS no hace, y el chrome nativo que no podemos repintar (scrollbars, pickers nativos, autofill) salía oscuro sobre un CSS claro — el bug de las barras negras en los campos autorrellenados, arreglado en v34.0.1. Lo vigila `src/stylesheets/color-scheme.test.ts` contra `DARK_SELECTORS`, que `sd.formats.mjs` exporta para eso.
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

**No se crean stories «en oscuro» de un componente.** Chromatic fotografía **cada** story en las dos superficies con dos modos (`claro` y `oscuro`, declarados en `parameters.chromatic.modes` de `.storybook/preview.tsx` desde `src/stories/utils/chromaticModes.ts`), y el switcher de fondos de Storybook enseña lo mismo en local: el decorator global `withSurface` lee el global `backgrounds` y activa el tema. Duplicar la story solo duplica la captura. Se borraron 110 stories así el 2026-09-12.

Solo se hace story oscura cuando el oscuro **cambia el componente**, y entonces se cuenta en su texto:

- una **prop** lo pinta (`AuthPage surface="dark"`, `Container surface="dark"`): es una story de esa prop, no de la superficie;
- una **variante invierte** (`Tag`/`NumberBadge`/`ProgressBar` primary, `Switcher`, `Tooltip`, `StepMarker`);
- un **relleno autocontenido NO cambia** y eso es lo que hay que enseñar (`Alert`/`Toast`/`Banner`/`Card`);
- es un **test** (`Test — …` con `tags: ['!dev']`) que comprueba valores oscuros.

Esa story fuerza el oscuro con `parameters.surface` y apaga el modo claro, que daría la misma captura:

```ts
import { SOLO_OSCURO } from '../../utils/chromaticModes';

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
};
```

Al revés, lo que no tiene superficie oscura apaga el modo oscuro en su `meta` con `parameters: { chromatic: SOLO_CLARO }`: el correo (`Email/*`, ver § «El correo») y la tarjeta social (`Foundations/Tarjeta social`), que es una imagen de colores fijos.

`withSurface` no envuelve la story en un `<div class="surface-dark">`: eso deja fuera los portales (Popover, Menu, Tooltip, Modal, Select renderizan en `document.body`, fuera del árbol de la story). En su lugar pone `data-theme="dark"` en `document.documentElement` (con `useEffect`, limpiando el atributo al desmontar o al volver a claro) — las custom properties `surface-dark-*` cascadean por herencia a cualquier descendiente del `<html>`, portales incluidos, y `body` ya pinta su propio fondo/color desde esos tokens (`base.css`), así que el lienzo del canvas queda coherente sin div adicional. En la página de **docs** sí acota el oscuro a un contenedor `.surface-dark` por story, para no teñir a las demás.

Nunca con estilos inline: no usar `<div className="surface-dark" style={{ background: … }}>` ni la utilidad `.bg-dark` en stories nuevas. Si lo que se enseña es la banda en sí (no el componente sobre ella), `Container surface="dark"` dentro del `render` sigue siendo válido.

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
