/*
 * La paleta, la escala y los estilos inline del correo, resueltos desde los
 * tokens del sistema (`tokens/component/email.json` → `@studiolxd/brand/tokens`).
 *
 * Un correo es un documento HTML suelto: no hay hoja de estilos que valga y no
 * hay custom properties que leer —Outlook no resuelve `var()`—, así que todo
 * valor tiene que ir inline y ya resuelto en tiempo de render. De ahí que esto
 * sean objetos JS y no un `.css`: es la única forma de que el correo beba de
 * los mismos tokens que el resto del sistema en vez de copiarlos a mano.
 *
 * Los valores llegan de `emailTokens.ts`, que genera `pnpm build:tokens`: ya
 * resueltos y en píxeles absolutos, porque la escala del sistema está en `rem`
 * y fuera del navegador `rem` no significa nada.
 *
 * EXCEPCIÓN a la regla de ejes lógicos del CLAUDE.md (`inline`/`block`, nunca
 * `x`/`y`): aquí los estilos se escriben en propiedades FÍSICAS y con las
 * shorthands `margin`/`padding`. Outlook de escritorio renderiza con el motor
 * de Word, que no conoce `margin-block` ni `padding-inline`: un botón con
 * `paddingInline` sale sin padding. Los tokens sí siguen la convención lógica
 * —es el nombre lo que la respeta—; lo que se dobla es la propiedad CSS de
 * destino, porque el medio no da para más.
 */
import type { CSSProperties } from 'react';

import { emailTokens, type EmailTokenName } from './emailTokens';

/** El valor de un token del correo, ya resuelto y en píxeles. */
export function emailToken(name: EmailTokenName): string {
  return emailTokens[name];
}

/** Los dos temas del correo. El oscuro solo llega donde el cliente lo soporta. */
export const emailPalette = {
  light: {
    background: emailToken('--email-light-bg'),
    text: emailToken('--email-light-color'),
    muted: emailToken('--email-light-muted-color'),
    border: emailToken('--email-light-border-color'),
  },
  dark: {
    background: emailToken('--email-dark-bg'),
    text: emailToken('--email-dark-color'),
    muted: emailToken('--email-dark-muted-color'),
    border: emailToken('--email-dark-border-color'),
  },
} as const;

/** La sans del sistema con su pila de reserva, tal cual la define el token. */
export const emailFontFamily = emailToken('--email-font-family');

/** Ancho del correo. Fuera de 600px, el panel de lectura obliga a scroll. */
export const emailMaxWidth = emailToken('--email-max-width');

/**
 * El logotipo, tal como lo sirve el PNG generado por `scripts/build-email-logo.mjs`:
 * el isotipo a `logo-mark-size` con `logo-padding` de blanco horneado alrededor.
 * `width`/`height` van explícitos en el `<img>` — el archivo es el doble.
 */
export const emailLogo = {
  size: Number.parseFloat(emailToken('--email-logo-mark-size')) + Number.parseFloat(emailToken('--email-logo-padding')) * 2,
  /** El nombre lleva versión: Gmail cachea las imágenes y no admite refresco. */
  filename: 'logo-v1.png',
} as const;

/**
 * De dónde cuelgan los assets del correo (logotipo y fuente web).
 *
 * Es el valor POR DEFECTO, no una constante escondida: `EmailLayout` acepta
 * `assetsBaseUrl` para que un consumidor la cambie sin tocar el DS. `slxd.app`
 * es el dominio de la marca y el más estable a largo plazo.
 */
export const emailAssetsBaseUrl = 'https://slxd.app/brand/email';

/** La cara latina de la sans, servida desde el mismo sitio que el logotipo. */
export const emailFontFilename = 'google-sans-flex-normal-latin-v1.woff2';

/**
 * Estilos inline compartidos por las plantillas.
 *
 * Se exportan además de las primitivas porque una plantilla siempre acaba
 * necesitando un caso que las primitivas no cubren (una celda de tabla, un
 * bloque compuesto), y ahí la alternativa a esto es volver a escribir píxeles
 * a mano.
 */
export const emailStyles = {
  heading: {
    color: emailPalette.light.text,
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-heading-font-size'),
    fontWeight: Number(emailToken('--email-heading-font-weight')),
    lineHeight: emailToken('--email-heading-line-height'),
    margin: `0 0 ${emailToken('--email-heading-margin-block-end')}`,
  },
  text: {
    color: emailPalette.light.text,
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-font-size'),
    lineHeight: emailToken('--email-line-height'),
    margin: `0 0 ${emailToken('--email-text-margin-block-end')}`,
  },
  /** Letra menor y tinta secundaria, dentro del recuadro. */
  muted: {
    color: emailPalette.light.muted,
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-note-font-size'),
    lineHeight: emailToken('--email-note-line-height'),
    margin: 0,
  },
  /*
   * Como `muted` pero en la tinta normal: esta nota va FUERA del recuadro,
   * sobre el fondo de la página, donde el gris se lee como deshabilitado y no
   * como secundario.
   */
  footnote: {
    color: emailPalette.light.text,
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-note-font-size'),
    lineHeight: emailToken('--email-note-line-height'),
    margin: 0,
  },
  button: {
    backgroundColor: emailToken('--email-button-bg'),
    /*
     * Tinta fija, sin par oscuro: el relleno es el par autocontenido de
     * `Button primary` (lavanda con tinta prusia), que se ve igual sobre
     * superficie clara y oscura.
     */
    color: emailToken('--email-button-color'),
    display: 'inline-block',
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-button-font-size'),
    fontWeight: Number(emailToken('--email-button-font-weight')),
    padding: `${emailToken('--email-button-padding-block')} ${emailToken('--email-button-padding-inline')}`,
    textDecoration: 'none',
    /*
     * El descargo que sigue a todo botón quedaría pegado a él. Va en el botón
     * y no en un envoltorio para que viaje con `emailStyles.button` a todas
     * las plantillas.
     */
    marginBottom: emailToken('--email-button-margin-block-end'),
  },
  link: {
    color: emailPalette.light.text,
    fontFamily: emailFontFamily,
    textDecoration: 'underline',
  },
} as const satisfies Record<string, CSSProperties>;

/**
 * Las clases que emparejan con las reglas oscuras. Van SIEMPRE junto al estilo
 * inline correspondiente: el inline es el estado real y la clase, el override.
 */
export const emailClasses = {
  body: 'email-body',
  surface: 'email-surface',
  container: 'email-container',
  /** La banda de marca: blanca siempre, también en oscuro. No lleva override. */
  brand: 'email-brand',
  heading: 'email-text',
  text: 'email-text',
  muted: 'email-muted',
  footnote: 'email-text',
  link: 'email-text',
} as const;

/**
 * Modo oscuro, donde el cliente lo soporta (Apple Mail, Mail de iOS, Outlook
 * para macOS). Gmail y Outlook Windows ignoran tanto las meta como la media
 * query, así que los estilos claros inline son el estado real y CADA regla
 * oscura es un override encima — nunca al revés.
 *
 * Tres cicatrices que este bloque no puede perder:
 *
 * 1. Todo selector es una clase que el propio layout pone en el elemento. Un
 *    selector descendiente colgado de la clase del `<body>` (o de `html` a
 *    secas) deja de matchear en cuanto el cliente descarta `<html>`/`<body>` e
 *    inyecta el contenido en su propio documento — Gmail, y la vista previa de
 *    Mailpit. Así se rompió el modo oscuro una vez.
 * 2. `!important` en todas: compiten con los estilos inline, que si no ganan
 *    por especificidad.
 * 3. `.email-brand` NO aparece aquí. La banda de marca lleva fondo blanco
 *    siempre, para que el logotipo caiga sobre blanco en los dos temas.
 */
export const emailDarkModeCss = `
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  @media (prefers-color-scheme: dark) {
    .${emailClasses.body}, .${emailClasses.surface} { background-color: ${emailPalette.dark.background} !important; }
    .${emailClasses.container} {
      background-color: ${emailPalette.dark.background} !important;
      border-color: ${emailPalette.dark.border} !important;
    }
    .email-text { color: ${emailPalette.dark.text} !important; }
    .email-muted { color: ${emailPalette.dark.muted} !important; }
  }
  a:hover { text-decoration: none !important; }
`;
