# Entrega — Los correos de la suite, al DS

Rama `emails-ds`. Diez commits, sin tocar la versión y sin tag: el release lo
cierra quien decida el número.

Incluye las dos rondas de revisión del operador: el logotipo se veía roto en el
catálogo, se retiró el modo oscuro, la prosa salía en negrita y el correo leía a
la escala de aplicación cuando le toca la pública. Todo está integrado más
abajo, no en un apartado aparte.

## Qué hay nuevo

### 1. Los tokens, legibles desde JavaScript

En un correo no existen las custom properties —Outlook no resuelve `var()`—, así
que todo valor tiene que ir inline y ya resuelto. Hasta ahora brand solo
publicaba sus tokens como `.css` y `.scss`.

- **Plataforma `js` en Style Dictionary** (`sd.config.mjs`, formato
  `json/css-variables` en `sd.formats.mjs`) → `src/tokens/tokens.json`: un mapa
  plano `{ '--nombre': 'valor' }` con los valores resueltos. Comparte
  `transformGroup` con la plataforma css, así que cada valor es literalmente el
  que emite el `:root` generado — no es una segunda fuente que pueda
  desincronizarse.
- **`src/tokens/tokens.ts`** → export `@studiolxd/brand/tokens`.
- Documentado en Storybook: **Foundations › Tokens desde JavaScript**.

```ts
import { tokens, token, tokenPx } from '@studiolxd/brand/tokens';

tokens['--color-prussian']   // '#111e30'
token('--color-prussian')    // igual, pero lanza si el token no existe
tokenPx('--spacing-5')       // '24px' — la escala está en rem, y fuera del
                             //   navegador rem no significa nada
```

También `@studiolxd/brand/tokens.json` para quien no tenga empaquetador.

**Lo que no incluye:** los pares `surface-dark-*`. Se publican con el nombre de
su par claro, así que no pueden convivir con él en un mapa plano. Quien necesite
los dos temas los deriva de los roles `*-on-dark`, como hace el correo.

### 2. El correo, en el DS

`src/stories/email/` → export `@studiolxd/brand/email`. Portado de
`packages/mailer/src/templates/EmailLayout.tsx`, corrigiendo lo que ese fichero
confesaba en sus propios comentarios:

| Antes | Ahora |
| --- | --- |
| `Google Sans Code` (la mono, la de **código**) en títulos, prosa y botones | `--font-family-sans`, con su fallback |
| Hex sueltos copiados a mano de `lmsmarketplace` (`#111e30`, `#baabff`, `#4a4a4a`) | `tokens/component/email.json`, que solo referencia a tokens existentes |
| Espaciado a ojo en cada estilo (`0 0 12px`, `10px 18px`, `24px`) | La escala de espaciado |
| Cuerpo, título, letra menor y botón a la escala de **aplicación** | La escala **pública**: un correo es parte pública de la suite |
| La marca era el `appName` en texto plano | El isotipo, en PNG |
| Modo oscuro con media query, paleta doble y clases para engancharla | Retirado: el correo es solo claro |

Lo que **no** se ha movido: las 12 plantillas de `mailer` y las 8 de apps. Son
producto y se quedan donde están.

Se conserva la cicatriz que sigue teniendo función —el lienzo a todo ancho que
existe porque react-email pone el fondo de `<Body>` en un `<td>` envolvente, y
hay clientes que descartan el `<body>`—. Las demás eran del modo oscuro y se
fueron con él. Ocho tests vigilan el resultado (`EmailLayout.test.tsx`),
incluido uno que comprueba que el modo oscuro no vuelve.

### El correo es solo claro

Decisión del operador. No es que no se haya probado: se retiró el mecanismo
entero —paleta oscura, `@media (prefers-color-scheme: dark)`, las `meta` de
esquema y las clases `email-*` que existían solo para que esas reglas pudieran
engancharse—.

**Esto no impide que Outlook Windows o Gmail Android inviertan los colores por
su cuenta.** Lo hacen igual y no hay forma de pedirles que no. Lo que se deja de
hacer es *gestionarlo*: con fondo blanco y tinta oscura el resultado invertido
es legible, y el logotipo lleva su blanco horneado dentro, así que aguanta la
inversión sin quedarse sin marca.

Lo que simplifica: un solo juego de valores en vez de dos, ninguna clase que
mantener, ninguna regla que dependa de que el cliente conserve el `<body>` —que
es por donde se rompía— y una hoja de estilos que se queda en una línea,
`a:hover`, lo único que un correo no puede llevar inline.

### El correo lee a la talla pública

Un correo es parte **pública** de la suite, como la web y las páginas de acceso.
En el DS eso es la superficie de `SiteShell`: cuerpo a 20px, títulos un peldaño
arriba y controles en `lg`. Sube con ella todo lo que el correo escribe: cuerpo,
título, letra menor (la nota tras el botón y los enlaces de baja) y el botón.
Hay además una razón del medio: el correo se lee sobre todo en el móvil, y una
nota de baja a 13px es incómoda de leer y de tocar.

El remapeo de la superficie pública se genera como CSS y el correo no consume
CSS, así que los tokens apuntan a los **tokens fuente** de esa superficie
(`{site-shell.text-font-size}`, `{site-shell.heading-size-4}`,
`{site-shell.paragraph-small-font-size}`, `{button.lg-font-size}`,
`{button.lg-padding-inline}`). Ningún valor escrito a mano.

**El ancho no sube**: los 600px del contenedor son el estándar del medio.
Comprobado a 600, 375 y 320px: nada desborda ni se corta. El botón, que con el
inset de `lg` partía en dos líneas en el móvil, va ahora a ancho completo — ver
más abajo.

### La caja y los pesos

Tres superficies, tres tokens: lienzo (`--email-canvas-bg`) y caja
(`--email-bg`) en blanco, borde de la caja (`--email-border-color`) en el rol de
tinta sobre superficie clara.

La prosa va en el peso normal del sistema y **el único elemento con peso fuerte
es el título**; el botón conserva el suyo de `Button primary`. Esto último
arregló un fallo silencioso: la `@font-face` del correo declaraba dos caras, una
por peso, apuntando al mismo fichero, y como la sans es variable eso deja al
navegador sin eje que variar — emparejaba la prosa con la cara del título y el
correo salía entero en negrita. Ahora se declara con el **rango** del eje
(`1 1000`), igual que `fonts.css`.

### 3. El catálogo

Categoría `Email/` en Storybook, con `EmailLayout` (sus tres pies), las
primitivas y **dos correos enteros de ejemplo** con datos falsos. Un correo es
un documento HTML completo, así que no se monta dentro de la página:
`EmailPreview` lo renderiza a texto y lo mete en un `<iframe>`, que es lo más
parecido a lo que hace un cliente.

Ese iframe recibe el HTML por `srcDoc`, y un documento cargado así tiene URL
base `about:srcdoc`: la ruta relativa con la que las stories sirven el logotipo
y la fuente desde `public/` no resolvía contra nada y el correo salía sin marca.
El visor le inyecta un `<base>` con la URL del catálogo. Es un apaño del visor y
solo del visor — en un correo de verdad la URL es absoluta y el problema no
existe.

Hasta hoy los correos eran el único rincón de la suite que no se podía mirar sin
enviarse uno a sí mismo.

## La API

```tsx
import {
  EmailLayout,
  EmailHeading, EmailText, EmailNote, EmailLink, EmailButton,
  emailStyles, emailPalette, emailStyleSheet,
  emailLogo, emailFontFilename, emailAssetsBaseUrl, emailMaxWidth,
  emailFontFamily, emailFontWeightRange,
} from '@studiolxd/brand/email';
```

### `EmailLayout`

| Prop | Tipo | Por defecto |
| --- | --- | --- |
| `preview` | `string` | — |
| `appName` | `string` | — |
| `locale` | `string` | `'es'` |
| `assetsBaseUrl` | `string` | `'https://slxd.app/brand/email'` |
| `logoAlt` | `string` | `appName` |
| `optOut` | `EmailOptOut` | — (omitir en transaccional) |
| `children` | `ReactNode` | — |

`EmailOptOut`: `unsubscribeUrl` (obligatorio), `preferencesUrl` (opcional — sin
él sale el pie de un solo enlace, como el que ya construían las apps), y cinco
props de texto con default castellano (`manageLabel`, `unsubscribeLabel`,
`manageBeforeLabel`, `managePreferencesLabel`, `manageAfterLabel`).

### Primitivas

`EmailHeading`, `EmailText`, `EmailNote` (`tone?: 'muted' | 'plain'`),
`EmailLink` y `EmailButton`. Todas aceptan `style`, que se mezcla **encima** del
estilo base. Cierran dentro del componente, y con un nombre, el estilo que hoy
cada plantilla escribe a mano.

### Dependencia

`react-email` es un **peer opcional** (`peerDependenciesMeta`) y está en los
externals del build. Por eso el correo va en su propio subpath y **no** en el
barril `@studiolxd/brand`: si colgara de ahí, cualquier app que importe un
`Button` tendría que instalarlo para resolver el import.

## Qué queda pendiente en el otro repo (`/Users/suvi/Dev/slxd`)

Nada de esto se ha tocado: `slxd` era solo lectura para este encargo.

### `packages/mailer`

1. **`package.json`**: subir el pin de `@studiolxd/brand` al tag que se corte.
2. **Borrar `src/templates/EmailLayout.tsx`** y dejar `src/templates/index.ts`
   reexportando desde brand, para que las 20 plantillas no cambien su import:

   ```ts
   export { EmailLayout, emailStyles } from '@studiolxd/brand/email';
   export type { EmailOptOut } from '@studiolxd/brand/email';
   ```

3. **Tres ajustes de API** al hacerlo:
   - `EmailLayout` ya **no recibe `t`**. Los textos del pie de baja son props con
     default castellano, así que hay que traducirlos en la llamada:
     ```tsx
     optOut={{
       unsubscribeUrl,
       preferencesUrl,
       unsubscribeLabel: t('footer.unsubscribe'),
       manageBeforeLabel: t('footer.manageBefore'),
       managePreferencesLabel: t('footer.managePreferences'),
       manageAfterLabel: t('footer.manageAfter'),
     }}
     ```
     Es la regla del DS: ningún componente lleva texto cableado ni un traductor
     dentro. Las claves de mensaje se quedan donde están.
   - `EmailOptOutLinks` pasa a llamarse **`EmailOptOut`**. Alias en el reexport
     si se prefiere no tocar los tipos de golpe.
   - **`emailClasses` ya no existe.** Esas clases solo servían para enganchar
     las reglas de modo oscuro; sin modo oscuro, sobran. Las 12 plantillas de
     `mailer` las pasan como `className`, así que hay que quitar ese atributo:
     ```diff
     -<Heading className={emailClasses.heading} style={emailStyles.heading}>
     +<Heading style={emailStyles.heading}>
     ```
     O, mejor, migrar de una vez a las primitivas (`<EmailHeading>`), que es el
     mismo número de líneas tocadas y deja el estilo dentro del componente.
4. **`emailStyles` conserva las mismas claves** (`heading`, `text`, `muted`,
   `footnote`, `button`, `link`): los estilos de las 12 plantillas no cambian,
   solo se les cae el `className`.
5. **`src/templates/preview.ts`** y el servidor de `react-email` siguen igual.

### Las 8 plantillas de apps

`apps/bricks/src/emails/` (4), `apps/localizia/src/emails/` (3),
`apps/lmsmcp/src/emails/` (1).

Hoy usan `Heading`, `Text` y `Button` **de `react-email` a pelo, sin estilo
ninguno**: dentro del recuadro se ven con los defaults del navegador, no con la
tipografía de la marca. Adoptar las primitivas de brand las arregla, y es un
cambio de una línea por elemento:

```diff
-import { Button, Heading, Text } from "react-email";
+import { EmailButton, EmailHeading, EmailText } from "@slxd/mailer/templates";
...
-      <Heading>{t("exportReady.heading")}</Heading>
-      <Text>{t("exportReady.body", …)}</Text>
-      <Button href={downloadUrl}>{t("exportReady.button")}</Button>
+      <EmailHeading>{t("exportReady.heading")}</EmailHeading>
+      <EmailText>{t("exportReady.body", …)}</EmailText>
+      <EmailButton href={downloadUrl}>{t("exportReady.button")}</EmailButton>
```

(Reexportando también las primitivas desde `@slxd/mailer/templates`, para que las
apps no dependan de brand directamente.)

### Verificación recomendada tras adoptar

Mandarse los correos a Gmail, a Outlook Windows y a Apple Mail. Son los tres que
generaron todas las cicatrices del layout: Gmail descarta `<html>`/`<body>` y
cachea las imágenes, Outlook Windows renderiza con el motor de Word e invierte
colores, Apple Mail es el único que honra de verdad la fuente web.

Merece la pena mirar en concreto **cómo queda la inversión de colores** de
Outlook Windows y Gmail Android, ya que es lo que el correo deja de gestionar.
Se espera que aguante —fondo blanco, tinta oscura, logotipo con su blanco
dentro—, pero conviene verlo con los ojos.

## Lo que asume el logotipo

**Hay que subir la carpeta `public/email/` de este repo, tal cual, a
`https://slxd.app/brand/email/`.** Son dos ficheros:

| Fichero | Qué es | Tamaño |
| --- | --- | --- |
| `logo-v1.png` | El isotipo, 128×128 px (se ve a 64×64), fondo blanco horneado | 3,7 KB |
| `google-sans-flex-normal-latin-v1.woff2` | La cara latina de la sans | 117 KB |

Los genera `pnpm build:email-assets` desde `src/assets/logomark.svg` y
`src/assets/fonts/google-sans-flex/`, con las medidas de los tokens
`--email-logo-mark-size` y `--email-logo-padding`.

Decisiones que van con ellos:

- **PNG y no SVG**: Gmail y Outlook no renderizan SVG.
- **Fondo blanco dentro de la imagen**, con su aire: Outlook Windows y Gmail
  Android invierten colores por su cuenta y un `background-color` blanco no
  sobrevive a esa inversión; una imagen sí. Es lo que deja al logotipo a salvo
  aunque el correo ya no gestione tema.
- **Nombre versionado**: Gmail proxea y cachea las imágenes y no admite forzar
  un refresco. Si algún día cambia el logotipo se sube `logo-v2.png` y se cambia
  el nombre en `emailTheme.ts` (`emailLogo.filename`) y en
  `scripts/build-email-assets.mjs`. **Nunca sobrescribir un fichero ya
  publicado.**
- **La URL base es configurable**: `assetsBaseUrl`. `https://slxd.app/brand/email`
  es el valor por defecto, no una constante escondida.

Mientras esa ruta no exista, los correos enviados saldrán **sin logotipo** (con
el `alt`, que es el nombre de quien manda) y **con la fuente de sistema**. Se
degrada, no se rompe — pero el despliegue es parte del día D.

## El botón, a ancho completo

Quedó abierto en la ronda anterior y **está decidido**: el botón principal del
correo va a `{button.block-width}` —el token de ancho completo que el DS ya
tenía—, **siempre y sin media query**.

*Por qué sin media query*: Outlook las ignora, así que una regla que solo se
aplicara en el móvil no llegaría justo donde hace falta. Una solución a medias
es peor que ninguna.

*Por qué ancho completo y no un aire interior propio del correo*: esa segunda
salida inventaría una talla intermedia que solo existiría aquí, y contradiría el
criterio de controles en `lg` recién fijado.

*Qué arregla*: con el inset de la talla `lg` (64px por lado) la caja del texto
se quedaba en ~173px a 375px y «Descargar el archivo» partía en dos líneas. A
ancho completo cabe en una, y el objetivo táctil pasa a ser el botón entero en
vez de una pastilla en medio de la columna.

*Lo que arrastra*: el botón va **sin padding horizontal**. Siendo de ancho
completo ya no se mide a sí mismo —lo mide la columna—, así que ese inset no
añadiría aire, solo estrecharía el texto; el aire vertical (`spacing.4`) es el
único que sigue dimensionándolo. Efecto lateral bueno: el botón deja de depender
de `box-sizing`, que el motor de Word de Outlook no entiende. El token
`email.button-padding-inline` desaparece por eso, sustituido por
`email.button-width`.

Comprobado a 320, 375 y 600px: el botón mide exactamente el ancho de la columna
(246 / 301 / 546px), 56px de alto, etiqueta en una línea en los tres.

## Pendiente en este repo, para quien cierre el release## Pendiente en este repo, para quien cierre el release

- **`dist/` NO se ha regenerado**, a propósito: el brief pedía no publicar
  release y hay otro agente trabajando en paralelo. `pnpm release:check` lo
  regenera y falla hasta que se commitee.
  Aviso: en este entorno el build reescribe ~103 ficheros de `dist/` que nada
  tienen que ver con este trabajo (orden de imports e identificadores del
  minificador — la versión de rollup/vite del `dist/` committeado no es la de
  ahora). Es ruido, pero entra en el commit de release.
- **Versión**: sin tocar. Es un **minor**: entry points nuevos (`./email`,
  `./tokens`, `./tokens.json`), tokens nuevos, ningún breaking.
- **`CHANGELOG.md`**: sin entrada, porque la entrada cuelga del número de
  versión. Va con el bump.
- **Comprobado a ojo en el Storybook del operador (6008)**: las tres entradas de
  `Email/` con el logotipo, la caja blanca de borde tinta y los pesos ya
  correctos.
- `pnpm lint`, `npx tsc -b` y `pnpm test` (300 tests) en verde.
  `pnpm test:stories` no se ha podido correr: falta el Chromium que pide
  Playwright en esta máquina (`pnpm exec playwright install`).
