# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm storybook        # Launch Storybook on port 6006

# Build
pnpm build:tokens     # Regenerar tokens CSS+SCSS desde Style Dictionary (sd.config.mjs)
pnpm build:lib        # Build de librería React → dist/ (¡solo componentes JS/CSS!)
pnpm build:css        # Bundle CSS standalone → dist/brand.css
pnpm build:tokens-css # Bundle de tokens CSS → dist/tokens.css
pnpm build:all        # Los cuatro builds anteriores, en el orden obligatorio (ya no hay prepare: dist/ va committeado)
pnpm build-storybook  # Build estático de Storybook

# Quality
pnpm lint             # Run ESLint (flat config format)
pnpm test             # Vitest: proyectos unit (node) + components (jsdom + Testing Library)
pnpm test:stories     # Vitest: stories en navegador (Playwright/Chromium) — pesado

# Docker — Storybook image → ghcr.io
docker buildx build --platform linux/amd64 -t ghcr.io/studiolxd/studiolxd-brand:latest --push .
```

> **IMPORTANTE:** Cada vez que se modifique un archivo JSON de tokens, ejecutar `pnpm build:tokens` antes de commitear. Los CSS bajo `src/tokens/` son auto-generados y se sobreescriben en el siguiente build.
>
> **IMPORTANTE:** `pnpm build:lib` borra y regenera `dist/` pero **no** regenera `dist/brand.css` ni `dist/tokens.css`. Después de `build:lib` ejecutar siempre `pnpm build:css && pnpm build:tokens-css`, o usar `pnpm build:all` para el build completo.

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

## CSS y tokens

### Reglas no negociables

1. **Token first, siempre.** Toda propiedad CSS debe referenciar un token (`var(--...)`). Sin valores hardcoded (colores, tamaños, espaciado, tipografía, radios…).
2. **Tokens en cascada.** Los tokens de componente heredan de tokens de control/base cuando aplica (ej. `--input-font-family: var(--control-font-family)`). Esto permite personalización solo con tokens, sin tocar CSS.
3. **Los archivos de token tienen fuente JSON obligatoria.** Todo CSS bajo `src/tokens/` se genera con Style Dictionary. Flujo para un nuevo conjunto de tokens: (1) crear `tokens/component/<name>.json`, (2) añadir entradas CSS y SCSS en `sd.config.mjs`, (3) ejecutar `pnpm build:tokens`. La única excepción manual es `src/tokens/index.css` (manifiesto de imports).
4. **Especificidad BEM.** Los modificadores usan doble clase (`.block.block--modifier`) para ganar sobre el selector base.
5. **Ejes inline/block, nunca x/y.** Los tokens y propiedades CSS de padding y similares usan siempre `inline`/`block` (alineado con propiedades lógicas CSS). En CSS escribir siempre `padding-block` + `padding-inline` desdoblados, nunca la shorthand `padding: a b`.
6. **Documentación MDX en castellano.** Cualquier archivo `.mdx` nuevo o modificado debe estar íntegramente en castellano.
7. **Tokens de feedback (error/success/destructive): el sufijo dice la propiedad CSS de destino.** `*-text-on-light|dark` SOLO `color`/borde/outline sobre la superficie ambiente, jamás `background`; `*-fill` SOLO fondos sólidos (universal: mismo color en superficie clara y oscura); `*-fill-text` para el contenido sobre un fill. NO existe par "tint" (contenedor suave): se retiró el 2026-08-24 por inventado — no reintroducir.

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
- Quedan sin **ningún** estilo oscuro definido — ni antes ni ahora — los componentes que nunca lo tuvieron: Toast, Radio, Avatar, Accordion, Popover, Spinner, EmptyState, PasswordField, NumberInput, FileUpload (átomo), NumberBadge, MessageBubble, TypingIndicator, MessageComposer, ConversationThread/List, OrgSwitcher, UserMenu, DatePicker/DateTime/NumberInput fields. Si uno de estos se ve mal en `.surface-dark`/modo oscuro root-level, no es un bug de regresión — es diseño pendiente: hay que decidir el valor oscuro por primera vez y añadir sus tokens `surface-dark-*`, no parchear con CSS a mano en `surface.css`.

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

Excepción: `Label` aplica `visually-hidden` directamente sobre el elemento `<label>` cuando `hidden={true}`, lo que es intencional (el label completo se oculta visualmente).

### Button como enlace

`Button` acepta prop `href?: string`. Cuando se pasa, renderiza `<a>` en lugar de `<button>`. El estado `disabled` en links añade `aria-disabled="true"` y elimina el `href` (en lugar de `disabled` nativo, que no existe en `<a>`):

```tsx
<Button href="/contacto">Ir a contacto</Button>
<Button href="/contacto" external>Enlace externo</Button>
```

### Distribución SCSS

Las aplicaciones no-React reciben **solo los tokens SCSS** (`src/tokens/scss/`, vía los exports `./scss`, `./scss/legacy` y `./scss/{global,components,molecules}/*`), no los componentes ni el CSS de componentes. El CSS de componentes (clases BEM) es un detalle de implementación interno de React y no se expone. Los tokens SCSS tienen valores resueltos (`outputReferences: false`) para que puedan usarse sin dependencia de CSS custom properties.

## Storybook

### Nomenclatura
- Nombres técnicos (títulos de categoría, exports, props) en inglés. Prosa MDX en castellano.
- Categorías: `Atoms/`, `Molecules/`, `Organisms/`, `Sections/`, `Templates/`, `Pages/`.
- Distinción `Templates/` vs `Pages/`: Templates son layouts reutilizables con contenido variable (Project, Legal). Pages son instancias únicas con contenido real no replicable (Home).

### Imports
Importar siempre desde `@storybook/react-vite`, nunca desde `@storybook/react`:
```ts
// ✓ Correcto
import type { Meta, StoryObj } from '@storybook/react-vite';

// ✗ Incorrecto
import type { Meta, StoryObj } from '@storybook/react';
```

### Stories de dark mode
No crear stories dedicadas para dark mode. El decorator global `withDarkBackground` en `preview.tsx` aplica `.surface-dark` automáticamente al cambiar el fondo a oscuro desde el switcher de Storybook. Cualquier story se puede explorar en dark mode sin necesidad de duplicarla.

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

1. Actualizar `"version"` en `package.json` según el tipo de cambio.
2. Commit con mensaje que refleje el cambio (ej. `feat: add plain type to List atom`).
3. Crear tag y push:
   ```bash
   git tag v<version>
   git push origin main --tags
   ```

> **IMPORTANTE:** Cada push a `main` debe ir acompañado de un tag si incluye cambios funcionales. Los commits puramente internos (docs, refactors sin impacto en consumidores) pueden agruparse bajo un solo tag.
