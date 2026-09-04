# Entrega — el pie del alta se sujeta al fondo de la ventana

Rama `pie-alta`. **Sin release**: no se ha tocado `package.json#version` ni
`CHANGELOG.md`, y **`dist/` no se ha regenerado** (sigue correspondiendo a
v30.3.0). Quien publique tendrá que correr `pnpm release:check` —que regenera
`dist/`— antes del tag, como manda `CLAUDE.md`.

Verde: `pnpm lint`, `npx tsc -b`, `pnpm test` (48 ficheros, 300 tests).

## El fallo

En `OnboardingShell`, el pie con los conmutadores de idioma y tema se quedaba
pegado al contenido en vez de caer al borde inferior de la ventana. En el paso
del perfil —un campo y un botón— quedaba media pantalla vacía por debajo.

El diagnóstico era correcto: `SiteShell` sí sujeta el pie —columna de `100dvh`
con el `main` a `flex: 1`—, pero el pie del alta **no iba en esa ranura**. Iba
como un bloque más dentro del `main`, en la rejilla de `.onboarding-shell`, que
no tiene alto ni distribución vertical.

## Qué se ha hecho, y por qué así

**El pie de preferencias se pinta en la ranura de pie del `SiteShell`**, vía la
prop `footer` de `PublicPageShell`. No hay CSS de sujeción nuevo.

Las otras dos salidas se descartaron por lo mismo: las dos consisten en dar alto
a la plantilla, y el alto ya lo tiene el marco.

- **Alto mínimo en `.onboarding-shell`.** Sería `calc(100dvh - 2 *
  var(--container-padding-block-xl))`: la plantilla tendría que saber que su
  `main` es un `Container` con `space="xl"`, y cualquier cambio ahí le sacaría
  una barra de scroll de 96px — exactamente el riesgo del `100dvh` anidado. Y
  con `shell={false}` el número no significa nada.
- **Estirar la cadena de alturas.** Falta un eslabón: `.site-shell__main > *`
  ya pone `flex: 1` al `main`, pero `.container` es `display: block`, así que
  el alto no llega a `.container__inner` ni a la plantilla. Cerrarlo obliga a
  volver flex al `Container` —un átomo compartido por todas las páginas
  públicas— o a alcanzarlo desde el CSS del alta con un `:has()`. Un arreglo de
  una plantilla no puede pagarse cambiando el átomo de banda de todo el sistema.

La ranura, en cambio, es el mecanismo que ya existe y que `SiteShell` documenta
como norma: *«ningún producto necesita CSS propio para sujetar el pie»*. Con el
pie ahí, el paso corto lo deja en el borde inferior y el paso largo —la lista de
invitaciones— lo empuja hacia abajo, sin que la plantilla declare ningún alto.

De regalo, queda mejor semánticamente: las preferencias globales de la pantalla
no eran contenido del `main`, y ahora son un `contentinfo` hermano suyo.

### El reparto horizontal no se toca

El pie se pinta como banda `Container` al ancho de página, igual que el `main`:
la marca abre la pantalla y los conmutadores la cierran en la misma vertical, y
lo único acotado y centrado sigue siendo `.onboarding-shell__step`. El test de
contrato de la story lo sigue vigilando, y ahora comprueba además que el pie
**no** está dentro del `main` y que es el último hijo del `.site-shell`.

### El aire de abajo

Token nuevo, `onboarding-shell.settings-padding-block-end` →
`{container.padding-block-xl}` (48px), la única regla propia del pie:

```css
.onboarding-shell__settings.onboarding-shell__settings--band {
  padding-block-end: var(--onboarding-shell-settings-padding-block-end);
}
```

Apunta al aire vertical del `main`, no a un valor suyo: la pantalla cierra con
el mismo aire con el que abre. Entre las acciones del paso y los conmutadores
queda ahora el `padding-block-end` del `main` (48px) en lugar del
`--onboarding-shell-gap` (32px) de antes — es una separación de página, no de
bloque dentro de la columna, y esa es la medida que le toca.

### `shell={false}`

Sin marco no hay ranura de pie: ahí el pie vuelve al final de la columna, con
el mismo marcado de antes y **sin** la banda ni su aire, porque quien sujeta el
fondo de la pantalla es el `AppShell` de la app. Es la única bifurcación del
componente y está anotada en el JSDoc de `switchers`.

## Comprobado

Midiendo la geometría real en Chrome con la cadena de CSS del sistema
(`tokens` + `SiteShell.css` + `Container.css` + `OnboardingShell.css`):

| caso | alto del documento | scroll | borde inferior del pie |
| --- | --- | --- | --- |
| paso corto (un campo) | 738px = alto de la ventana | 0 | 738px — al ras |
| paso largo (+900px de cuerpo) | 1359px | 621px | 1358.5px — empujado |

Lo importante de la primera fila es el `scroll: 0`: el documento mide
**exactamente** la ventana. No hay `100dvh` de más ni barra de scroll fantasma.
La ventana baja es el mismo caso que el paso largo: el contenido pasa del alto
de la ventana y el pie va detrás.

## Ficheros

- `src/stories/templates/OnboardingShell/OnboardingShell.tsx` — el pie va a la
  prop `footer` de `PublicPageShell`; se queda en la columna con `shell={false}`.
- `src/stories/templates/OnboardingShell/OnboardingShell.css` — fuera el
  `display: flex` inútil del pie; entra la regla de banda.
- `src/stories/templates/OnboardingShell/OnboardingShell.stories.tsx` — stories
  «Paso corto» y «Paso largo», los dos extremos; el test de contrato comprueba
  la ranura.
- `src/stories/templates/OnboardingShell/OnboardingShell.mdx` — sección «El pie
  de preferencias, sujeto abajo».
- `tokens/organism/onboarding-shell.json` + regenerados de `pnpm build:tokens`.

## Pendiente

`pnpm test:stories` **no se ha podido correr**: falta el Chromium de Playwright
(`chromium_headless_shell-1208`) y la descarga de `npx playwright install
chromium` se quedó parada en 428 KB — la red restringida que `CLAUDE.md` ya da
por supuesta al dejar `test:stories` como paso opcional de `release:check`. Las
stories nuevas y el test de contrato ampliado están escritos pero no ejecutados;
quien publique deberá correrlos con `pnpm release:check -- --with-stories`.
