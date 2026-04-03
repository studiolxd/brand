# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run storybook        # Launch Storybook on port 6006

# Build
npm run build:tokens     # Regenerar tokens CSS+SCSS desde Style Dictionary (sd.config.mjs)
npm run build:lib        # Build de librería React → dist/ (¡solo componentes JS/CSS!)
npm run build:css        # Bundle CSS standalone → dist/brand.css
npm run build:scss       # Copiar tokens SCSS → dist/scss/
npm run prepare          # Ejecuta los cuatro builds anteriores (se lanza automáticamente en npm install)
npm run build-storybook  # Build estático de Storybook

# Quality
npm run lint             # Run ESLint (flat config format)
```

> **IMPORTANTE:** Cada vez que se modifique un archivo JSON de tokens, ejecutar `npm run build:tokens` antes de commitear. Los CSS bajo `src/tokens/` son auto-generados y se sobreescriben en el siguiente build.
>
> **IMPORTANTE:** `npm run build:lib` borra y regenera `dist/` pero **no** regenera `dist/brand.css` ni `dist/tokens.css`. Después de `build:lib` ejecutar siempre `npm run build:css && npm run build:tokens-css`, o usar `npm run prepare` para el build completo.

Testing: Storybook Vitest addon con Playwright (Chromium). No hay `npm test` separado.

## Architecture

Librería de componentes React distribuida como paquete npm vía git (`@studiolxd/brand`). Dos salidas de build:

- **`dist/index.js` + `dist/index.css`** — componentes React (ESM) + estilos. Para cualquier aplicación React.
- **`dist/scss/_index.scss`** — tokens SCSS sin `var()`, con valores resueltos. Para cualquier aplicación que no use React y necesite los tokens (PHP, servidor, herramientas de diseño…).

**Atomic Design** en `src/stories/`:
- `atoms/` — elementos básicos (Button, Input, Link…)
- `molecules/` — combinaciones de átomos (InputField, Form…)
- `organisms/` — secciones complejas (ContactForm…)
- `sections/` — bloques de página completos (Header, HighlightSection…)
- `pages/` — plantillas de página completas
- `foundations/` — documentación de tokens (colores, tipografía, espaciado…)

Cada componente tiene tres archivos co-localizados:
- `ComponentName.tsx` — componente funcional tipado
- `ComponentName.stories.tsx` — stories con `Meta<typeof Component>` / `StoryObj`; `title` sigue el patrón `'Átomos/Nombre'`, `'Moléculas/Nombre'`, etc.
- `ComponentName.css` — estilos BEM importados por el TSX

**Storybook MCP**: configurado en `localhost:6006`. Usar siempre las herramientas MCP para verificar props antes de usarlas — nunca asumir propiedades.

## CSS y tokens

### Reglas no negociables

1. **Token first, siempre.** Toda propiedad CSS debe referenciar un token (`var(--...)`). Sin valores hardcoded (colores, tamaños, espaciado, tipografía, radios…).
2. **Tokens en cascada.** Los tokens de componente heredan de tokens de control/base cuando aplica (ej. `--input-font-family: var(--control-font-family)`). Esto permite personalización solo con tokens, sin tocar CSS.
3. **Los archivos de token tienen fuente JSON obligatoria.** Todo CSS bajo `src/tokens/` se genera con Style Dictionary. Flujo para un nuevo conjunto de tokens: (1) crear `tokens/component/<name>.json`, (2) añadir entradas CSS y SCSS en `sd.config.mjs`, (3) ejecutar `npm run build:tokens`. La única excepción manual es `src/tokens/index.css` (manifiesto de imports).
4. **Especificidad BEM.** Los modificadores usan doble clase (`.block.block--modifier`) para ganar sobre el selector base.
5. **Ejes inline/block, nunca x/y.** Los tokens y propiedades CSS de padding y similares usan siempre `inline`/`block` (alineado con propiedades lógicas CSS). En CSS escribir siempre `padding-block` + `padding-inline` desdoblados, nunca la shorthand `padding: a b`.
6. **Documentación MDX en castellano.** Cualquier archivo `.mdx` nuevo o modificado debe estar íntegramente en castellano.

### Selectores de elemento vs. clase

Los átomos que representan elementos HTML semánticos usan **selectores de elemento** directamente, sin clase BEM:

- `Link.css` → estila `a { }`, `a:hover { }`, `a:focus-visible { }` — el componente `Link` no añade className
- Otros átomos que sigan este patrón deben documentarse aquí

Los átomos que no tienen un elemento HTML unívoco (Button con variantes, Input con estados de error…) siguen usando clases BEM.

### Theming de superficie (dark)

El theming oscuro se gestiona con la clase de contexto `.surface-dark` definida en `src/surface.css`. **No usar la clase `.dark` — está eliminada.**

- Añadir `.surface-dark` a cualquier contenedor para que todos los componentes descendientes adapten automáticamente sus tokens al tema oscuro.
- Los tokens oscuros se remapean en un único bloque `.surface-dark { }` en `surface.css` — **nunca en los CSS individuales de componente**.
- Excepción: Select e InputPhone mantienen clases `__content--dark` y `__country-content--dark` en sus portales Radix (fuera del árbol DOM, no pueden heredar la cascade).
- En Storybook, el decorator global de fondo oscuro ya añade `.surface-dark` automáticamente.

### Radix UI — cuándo usarlo

Usar Radix para componentes con **comportamiento complejo**: máquina de estados, gestión de foco, ARIA, teclado. No usarlo para elementos HTML simples que ya son accesibles por defecto.

| Usar Radix | No usar Radix |
|---|---|
| Checkbox (`@radix-ui/react-checkbox`) | Button, Input, Textarea, Link |
| Select (`@radix-ui/react-select`) | Heading, Paragraph, Label, List |
| Futuros: Tooltip, Dialog, Tabs, Accordion | Arrow, Chevron, Logo, Tag… |

**CSS con Radix:** los componentes Radix usan `data-*` attributes en lugar de pseudo-clases CSS:
- `data-state="checked"` en lugar de `:checked`
- `data-disabled` en lugar de `:disabled`
- `data-state="open"` / `data-state="closed"` para colapsables

**Portales Radix** (Select, InputPhone) renderizan fuera del árbol DOM y no heredan la cascade de `.surface-dark`. Excepción documentada: mantienen clases `__content--dark` y `__country-content--dark` aplicadas manualmente.

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

Las aplicaciones no-React reciben **solo los tokens SCSS** (`dist/scss/`), no los componentes ni el CSS de componentes. El CSS de componentes (clases BEM) es un detalle de implementación interno de React y no se expone. Los tokens SCSS tienen valores resueltos (`outputReferences: false`) para que puedan usarse sin dependencia de CSS custom properties.

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

El paquete sigue **semver** y se distribuye vía git tags. Los consumidores (la web) pinean a un tag específico (`github:studiolxd/brand#v0.1.0`).

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
