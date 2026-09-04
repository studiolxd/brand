# Entrega — Los correos de la suite, al DS

Rama `emails-ds`. Cinco commits, sin tocar la versión y sin tag: el release lo
cierra quien decida el número.

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
| La marca era el `appName` en texto plano | El isotipo, en PNG |

Lo que **no** se ha movido: las 12 plantillas de `mailer` y las 8 de apps. Son
producto y se quedan donde están.

Se conservan intactas las cicatrices que el layout ya había aprendido a las
malas —el lienzo `.email-surface` que existe porque react-email pone el fondo de
`<Body>` en un `<td>` sin clase; las reglas oscuras como override sobre el
inline claro; ningún selector colgado de `<body>`— y ahora además hay nueve
tests que las vigilan (`EmailLayout.test.tsx`).

### 3. El catálogo

Categoría `Email/` en Storybook, con `EmailLayout` (sus tres pies), las
primitivas y **dos correos enteros de ejemplo** con datos falsos, cada uno en
claro y en oscuro. Un correo es un documento HTML completo, así que no se monta
dentro de la página: `EmailPreview` lo renderiza a texto y lo mete en un
`<iframe>`, que es lo más parecido a lo que hace un cliente.

Para el oscuro el visor aplica las **mismas** reglas del correo sin la media
query (dentro de un iframe no se puede pedir el ajuste del sistema): lo que se
ve es el override que aplicaría Apple Mail, no una imitación.

Hasta hoy los correos eran el único rincón de la suite que no se podía mirar sin
enviarse uno a sí mismo.

## La API

```tsx
import {
  EmailLayout,
  EmailHeading, EmailText, EmailNote, EmailLink, EmailButton,
  emailStyles, emailClasses, emailPalette, emailDarkModeCss,
  emailLogo, emailFontFilename, emailAssetsBaseUrl, emailMaxWidth, emailFontFamily,
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
estilo base. Cierran dentro del componente el par clase+estilo que hoy cada
plantilla escribe a mano — y olvidar la clase significa que ese trozo del correo
se queda en claro cuando el cliente pinta en oscuro.

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
   export { EmailLayout, emailClasses, emailStyles } from '@studiolxd/brand/email';
   export type { EmailOptOut } from '@studiolxd/brand/email';
   ```

3. **Dos ajustes de API** al hacerlo:
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
4. **`emailStyles` y `emailClasses` conservan las mismas claves** (`heading`,
   `text`, `muted`, `footnote`, `button`, `link`), así que las 12 plantillas de
   `mailer` siguen compilando sin tocarlas. Migrarlas a las primitivas
   (`<EmailHeading>` en vez de `<Heading className={…} style={…}>`) es una
   limpieza posterior, no un requisito.
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
colores, Apple Mail es el único que honra de verdad la fuente web y el modo
oscuro.

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
  sobrevive; una imagen sí. Por eso la banda de marca es blanca también en
  oscuro — el logotipo cae siempre sobre blanco.
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

## Pendiente en este repo, para quien cierre el release

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
- `pnpm lint`, `npx tsc -b` y `pnpm test` (300 tests) en verde.
  `pnpm test:stories` no se ha podido correr: falta el Chromium que pide
  Playwright en esta máquina (`pnpm exec playwright install`).
