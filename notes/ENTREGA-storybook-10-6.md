# Entrega — Storybook 10.5.10 → 10.6.0

Rama `storybook-10-6`. **Sin release**: no se toca `package.json#version` ni
`CHANGELOG.md`. `dist/` **no cambia** con esta subida —`release:check` lo
regeneró y quedó en sync sin diferencias—, así que no hay `dist/` que
commitear; quien publique volverá a correr `pnpm release:check` antes del tag,
como manda `CLAUDE.md`.

## De dónde a dónde

Se subió con el camino oficial, `storybook upgrade` de la propia 10.6.0
(`pnpm dlx storybook@10.6.0 upgrade --yes`), no editando el `package.json`:
el CLI local era 10.5.10 y `upgrade` sube a **su** versión, así que el binario
tiene que ser el de destino.

| Paquete | Antes | Ahora |
| --- | --- | --- |
| `storybook` | ^10.5.10 | **^10.6.0** |
| `@storybook/react-vite` | ^10.5.10 | **^10.6.0** |
| `@storybook/addon-docs` | ^10.5.10 | **^10.6.0** |
| `@storybook/addon-a11y` | ^10.4.6 | **^10.6.0** |
| `@storybook/addon-vitest` | ^10.5.10 | **^10.6.0** |
| `storybook-addon-pseudo-states` | ^10.5.10 | **^10.6.0** |
| `@storybook/addon-mcp` | ^0.7.0 | **^10.6.0** |
| `@chromatic-com/storybook` | ^5.2.1 | **^5.3.1** |
| `eslint-plugin-storybook` | ^10.4.6 | **^10.6.0** |

Los dos de versionado propio:

- **`@storybook/addon-mcp` deja de tenerlo.** El addon se ha absorbido en el
  versionado del monorepo: después de `0.7.0` la siguiente publicada es
  `10.6.0`, y su `peerDependencies` exige `storybook@^10.6.0` y
  `@storybook/addon-vitest@^10.6.0`. Ya no es un paquete que se pueda dejar
  atrás: va pegado al core.
- **`@chromatic-com/storybook` sí lo mantiene** (5.x). El brief apuntaba 5.2.1;
  en el registro ya está **5.3.1**, y es la que dejó el `upgrade`. Su peer
  admite de `10.1` a `11.0.0-0`, así que la subida no la obligaba: viene de que
  el CLI actualiza los addons de Storybook que encuentra. Sigue **comentada**
  en `.storybook/main.ts` (instalada para el CLI de Chromatic, no cargada como
  addon), igual que antes.

`playwright` se queda en **1.58.2** y `vitest` en **4.1.2**: la subida no los
mueve, así que **no ha pedido ningún Chromium nuevo** y el enlace a mano de la
caché (`chromium_headless_shell-1208` → `1217`) no ha hecho falta tocarlo.

## Migraciones automáticas aplicadas

Una sola, y no toca configuración:

- **`addon-mcp`** — el CLI detecta que la subida corre desde un agente y que
  `@storybook/addon-mcp` ya está en `main.ts`; lo que hace es **fijar el addon
  a la versión de Storybook** (de `^0.7.0` a `^10.6.0`). No añade ni quita
  entradas de `addons`, ni escribe en `.storybook/`.

El diff de la subida es exactamente ese: `package.json` (bloque
`devDependencies`) y `pnpm-lock.yaml`. **`.storybook/main.ts`, `preview.tsx`,
`manager.ts` y `vite.config.ts` quedan sin tocar.**

## Qué trae 10.6.0 que roce este catálogo

Del `MIGRATION.md` de 10.6, lo que aplica aquí (lo demás es Vue y
Angular-Vite: docgen server, `propsTable`, deprecación de `vue-docgen-api`):

- **Fuera `@storybook/csf-plugin`.** Ya no se publica; el enriquecido de CSF
  vive dentro de `@storybook/addon-docs` y se registra por sus presets. No lo
  usábamos ni directa ni indirectamente — sin efecto.
- **Fuera la integración experimental de Playwright CT**
  (`@storybook/*/experimental-playwright`, `createPlaywrightTest`). Aquí las
  stories se prueban con `@storybook/addon-vitest` en navegador
  (`pnpm test:stories`), no con esa API — sin efecto.
- **`addon-vitest`**: arreglos, no cambios de contrato — fija `storybook/test`
  en `optimizeDeps`, resuelve los globs de stories contra la raíz del proyecto
  y filtra la instrumentación de Storybook de los stacks. El `vite.config.ts`
  con `storybookTest({ configDir })` sigue valiendo tal cual.

### Lo único que cambia de criterio: los nombres de las herramientas MCP

**No lo he aplicado, porque no es de este repo.** En 10.6 las herramientas MCP
pasan a nombrarse `toolset-método`. Comprobado contra el servidor del propio
catálogo levantado en el 6007:

| Antes | Ahora |
| --- | --- |
| `preview-stories` | `stories-preview` |
| `get-changed-stories` | `stories-changed` |
| `get-stories-by-component` | `stories-find-by-component` |
| `run-story-tests` | `test-run` |
| `list-all-documentation` | `docs-list` |
| `get-documentation` | `docs-show` |
| `get-documentation-for-story` | `docs-show-story` |

(`get-storybook-story-instructions` conserva el nombre.)

Esto afecta **fuera** del repo: al cliente MCP que apunta al Storybook del 6006
y a cualquier lista de herramientas permitidas o prompt que nombre las
antiguas. `CLAUDE.md` menciona el MCP pero no nombra herramientas concretas, así
que no he tocado nada; queda dicho para que el operador actualice su
configuración cuando el 6006 corra con 10.6.

## Comprobación

Todo en verde, con las versiones ya subidas:

| Comprobación | Resultado |
| --- | --- |
| `pnpm lint` | limpio |
| `npx tsc -b` | limpio |
| `pnpm test` | verde (proyectos `unit` + `components`) |
| **`pnpm test:stories`** | **161 ficheros, 1329 tests, todos pasan** |
| `pnpm release:check` | verde de punta a punta, `dist/` en sync |

`test:stories` da **exactamente la misma cifra que antes de subir** —161/1329,
medida en este mismo worktree con 10.5.10—: la puerta que se abrió ayer sigue
abierta y no se ha perdido ni un contrato.

## Los addons, mirados de verdad

Catálogo levantado en el **6007** (`storybook dev -p 6007`; el 6006 del
operador no se ha tocado, y el 6007 quedó cerrado al terminar):

- **Accesibilidad** — el panel calcula: en `Atoms/Button › Primary`, 0
  violaciones, 5 comprobaciones pasadas, 0 no concluyentes. No es solo que la
  pestaña aparezca: hay resultados.
- **Docs (MDX)** — la página de `Button` renderiza descripciones, bloques de
  story con «Show code» y su índice. En `Foundations › Iconografía`, la tabla
  de pipes (`--icon-size-*`) sale **como tabla**: `remark-gfm` sigue enganchado
  por las `mdxPluginOptions` de `main.ts`.
- **Pseudo-estados** — el menú de la barra lista los ocho estados y **surten
  efecto**: marcando `:hover` el botón primario pasa a su fondo de hover
  (amarillo) sin puntero encima.
- **Vitest** — «Run tests» en la barra lateral, y la prueba de verdad es el
  `pnpm test:stories` de arriba.
- **MCP** — el endpoint `/mcp` del catálogo responde y lista sus herramientas
  (las de la tabla de arriba, ya con los nombres nuevos).

Sin errores de consola en el navegador más allá de un `NoStoryMatchError`
provocado por una URL mía mal escrita al navegar.
