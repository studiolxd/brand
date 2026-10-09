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

import { EMAIL_FONT_FILENAME, EMAIL_LOGO_FILENAME, emailLogoWidthFor } from '../../assets/brand-assets';
import { emailTokens, type EmailTokenName } from './emailTokens';

/** El valor de un token del correo, ya resuelto y en píxeles. */
export function emailToken(name: EmailTokenName): string {
  return emailTokens[name];
}

/**
 * El negativo de un token del correo, para un margen que saca un elemento
 * fuera de su caja (el logotipo de la banda de marca, ver `EmailLayout`).
 *
 * No se escribe `calc(-1 * ...)`: `emailToken` ya devuelve píxeles resueltos
 * — un correo no tiene `var()` que negar — y el soporte de `calc()` en
 * estilos en línea es flojo en los clientes de correo (el motor de Word de
 * Outlook, notablemente). Con un número fijo no hace falta arriesgarlo.
 */
export function negatedEmailToken(name: EmailTokenName): string {
  return `${-Number.parseFloat(emailToken(name))}px`;
}

/**
 * La paleta del correo. Un solo juego: el correo es solo claro.
 *
 * No hay paleta oscura, y a propósito: el correo se pide SIEMPRE en claro
 * (`emailStyleSheet`, `EmailLayout`). Lo que hace el DS es pedirlo, en capas;
 * no puede impedir que Outlook Windows clásico o Gmail Android inviertan los
 * colores por su cuenta. Con fondo blanco y tinta oscura el resultado
 * invertido es legible, y el logotipo lleva su blanco horneado, así que aguanta.
 */
export const emailPalette = {
  /** Fondo general, fuera de la caja. */
  canvas: emailToken('--email-canvas-bg'),
  /** Fondo de la caja del mensaje. */
  background: emailToken('--email-bg'),
  text: emailToken('--email-color'),
  muted: emailToken('--email-muted-color'),
  border: emailToken('--email-border-color'),
} as const;

/** La sans del sistema con su pila de reserva, tal cual la define el token. */
export const emailFontFamily = emailToken('--email-font-family');

/**
 * El rango del eje de peso de la sans, para la `@font-face` del correo.
 *
 * Es una fuente variable y `fonts.css` la declara así, `1 1000`. Declararla con
 * un peso suelto —o con dos caras, una por peso, apuntando al mismo fichero—
 * deja al navegador sin eje que variar: acaba emparejando la prosa con la cara
 * del título y el correo sale entero en negrita.
 */
export const emailFontWeightRange = emailToken('--email-font-weight-range');

/** Ancho del correo. Fuera de 600px, el panel de lectura obliga a scroll. */
export const emailMaxWidth = emailToken('--email-max-width');

/**
 * El logotipo, tal como lo sirve el PNG generado por `scripts/build-email-assets.mjs`:
 * el logotipo completo ("Studio LXD") a `logo-height` con `logo-padding` de
 * blanco horneado alrededor. No es cuadrado —el alto lo dice el token y el ancho
 * sale de la proporción del trazado, con `emailLogoWidthFor`—, así que van las
 * dos medidas. `width`/`height` van explícitos en el `<img>`: el archivo es el
 * doble.
 */
const emailLogoHeight = Number.parseFloat(emailToken('--email-logo-height'));
const emailLogoPadding = Number.parseFloat(emailToken('--email-logo-padding'));

export const emailLogo = {
  width: emailLogoWidthFor(emailLogoHeight) + emailLogoPadding * 2,
  // Redondeado: el alto puede venir de un `calc()` fraccionario (la talla 2xl
  // da 85,33px) y el PNG que genera `build-email-assets.mjs` redondea igual —
  // un `height` con decimales en el `<img>` no puede coincidir con un fichero
  // que sí tiene un número entero de píxeles.
  height: Math.round(emailLogoHeight + emailLogoPadding * 2),
  /** El nombre lleva versión: Gmail cachea las imágenes y no admite refresco. */
  filename: EMAIL_LOGO_FILENAME,
  /**
   * El texto alternativo, fijo: la imagen es SIEMPRE el logotipo «Studio LXD»,
   * lo mande la app que lo mande, así que el `alt` dice lo que la imagen es y
   * no quién escribe. Muchos clientes bloquean las imágenes de serie y es lo
   * único que se lee entonces en la cabecera.
   */
  alt: 'Studio LXD',
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
export const emailFontFilename = EMAIL_FONT_FILENAME;

/**
 * Un fondo liso que sobrevive a la inversión de colores.
 *
 * Los clientes que pintan el correo en oscuro por su cuenta reescriben
 * `background-color` y no tocan `background-image`: un degradado de un solo
 * color, igual al del fondo, lo mantiene. En un cliente sin modo oscuro es
 * indistinguible de `background-color` a secas, y donde no se entiende (el
 * motor de Word de Outlook) cae a él.
 */
export function emailSolidBackground(color: string): Pick<CSSProperties, 'backgroundColor' | 'backgroundImage'> {
  return { backgroundColor: color, backgroundImage: `linear-gradient(${color}, ${color})` };
}

/**
 * Las clases estables del correo. Ninguna da estilo —todo va inline—: existen
 * para que `emailStyleSheet` pueda reafirmar los colores claros cuando un
 * cliente pinta el correo en oscuro, que desde un atributo `style` no se puede.
 */
export const emailClassNames = {
  /** El lienzo: `Body`, la sección que lo envuelve y el pie de baja. */
  canvas: 'email-canvas',
  /** La banda del logotipo y el recuadro del mensaje. */
  surface: 'email-surface',
  /** El recuadro del mensaje (además de `surface`): lleva el borde. */
  box: 'email-box',
  /** La tinta del cuerpo: título, párrafos, listas, la nota del pie y los enlaces de respaldo. */
  text: 'email-text',
  /** La tinta secundaria: `EmailNote`. */
  muted: 'email-muted',
  /** El título de un bloque (`EmailHeading level={2}`). */
  heading2: 'email-heading-2',
  /** Un enlace del texto o del pie de baja. */
  link: 'email-link',
  /** El botón. Es además el gancho de su `:hover`. */
  button: 'email-button',
  /** La cita (su barra). */
  quote: 'email-quote',
  /** El separador. */
  divider: 'email-divider',
  tag: {
    success: 'email-tag-success',
    warning: 'email-tag-warning',
    error: 'email-tag-error',
  },
} as const;

/**
 * Estilos inline compartidos por las plantillas.
 *
 * Se exportan además de las primitivas porque una plantilla siempre acaba
 * necesitando un caso que las primitivas no cubren (una celda de tabla, un
 * bloque compuesto), y ahí la alternativa a esto es volver a escribir píxeles
 * a mano.
 */
/**
 * Letra menor y tinta secundaria, dentro del recuadro. Se extrae de
 * `emailStyles` porque `buttonFallback` deriva de ella (mismo color, tamaño y
 * altura de línea que la nota) y un objeto no puede referenciarse a sí mismo
 * dentro de su propio literal.
 */
const muted = {
  color: emailPalette.muted,
  fontFamily: emailFontFamily,
  fontWeight: Number(emailToken('--email-font-weight')),
  fontSize: emailToken('--email-note-font-size'),
  lineHeight: emailToken('--email-note-line-height'),
  margin: 0,
} as const satisfies CSSProperties;

export const emailStyles = {
  heading: {
    color: emailPalette.text,
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-heading-font-size'),
    fontWeight: Number(emailToken('--email-heading-font-weight')),
    lineHeight: emailToken('--email-heading-line-height'),
    margin: `0 0 ${emailToken('--email-heading-margin-block-end')}`,
  },
  text: {
    color: emailPalette.text,
    fontFamily: emailFontFamily,
    fontWeight: Number(emailToken('--email-font-weight')),
    fontSize: emailToken('--email-font-size'),
    lineHeight: emailToken('--email-line-height'),
    margin: `0 0 ${emailToken('--email-text-margin-block-end')}`,
  },
  /*
   * El párrafo destacado: la frase que resume el correo antes de entrar en el
   * detalle. Solo cambia el peso — mismo tamaño, misma tinta, mismo aire—,
   * porque lo que hace es entonar, no titular.
   */
  textEmphasis: {
    fontWeight: Number(emailToken('--email-text-emphasis-font-weight')),
  },
  muted,
  /*
   * Como `muted` pero en la tinta normal: esta nota va FUERA del recuadro,
   * sobre el fondo de la página, donde el gris se lee como deshabilitado y no
   * como secundario.
   */
  footnote: {
    color: emailPalette.text,
    fontFamily: emailFontFamily,
    fontWeight: Number(emailToken('--email-font-weight')),
    fontSize: emailToken('--email-note-font-size'),
    lineHeight: emailToken('--email-note-line-height'),
    margin: 0,
  },
  button: {
    ...emailSolidBackground(emailToken('--email-button-bg')),
    /*
     * Tinta fija, sin par oscuro: el relleno es el par autocontenido de
     * `Button primary` (lavanda con tinta prusia), que se ve igual sobre
     * superficie clara y oscura.
     */
    color: emailToken('--email-button-color'),
    /*
     * A ancho completo, SIEMPRE y sin media query: Outlook las ignora y una
     * solución a medias es peor que ninguna. En los 600px del correo se lee
     * bien, y en el móvil es lo que hace que la etiqueta quepa en una línea y
     * que el objetivo táctil sea el botón entero.
     */
    display: 'block',
    width: emailToken('--email-button-width'),
    textAlign: 'center',
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-button-font-size'),
    fontWeight: Number(emailToken('--email-button-font-weight')),
    /*
     * Sin padding horizontal, y no es un descuido: siendo de ancho completo, el
     * botón ya no se mide a sí mismo —lo mide la columna—, así que el inset de
     * la talla lg (64px por lado) no añadiría aire, solo estrecharía la caja
     * del texto hasta partir en dos etiquetas de dos palabras en el móvil.
     * De paso el botón deja de depender de `box-sizing`, que el motor de Word
     * de Outlook no entiende.
     */
    padding: `${emailToken('--email-button-padding-block')} 0`,
    textDecoration: 'none',
    /*
     * El descargo que sigue a todo botón quedaría pegado a él. Va en el botón
     * y no en un envoltorio para que viaje con `emailStyles.button` a todas
     * las plantillas.
     */
    marginBottom: emailToken('--email-button-margin-block-end'),
  },
  /*
   * El enlace de respaldo que va bajo el botón: la misma dirección en texto,
   * para copiar y pegar. Va con el mismo formato que `EmailNote` —color,
   * tamaño y altura de línea de la nota (`muted`)—, porque es letra de pie de
   * correo, no un párrafo del cuerpo; conserva solo sus propios márgenes, que
   * son los del bloque botón + respaldo. La dirección en sí recupera la tinta
   * normal (`buttonFallbackUrl`): es lo que hay que leer y copiar.
   */
  buttonFallback: {
    ...muted,
    margin: `${emailToken('--email-button-fallback-margin-block-start')} 0 ${emailToken('--email-button-margin-block-end')}`,
  },
  /*
   * La dirección en sí, dentro de esa frase. En la tinta normal y no en la
   * secundaria: es lo que hay que leer y copiar, y en gris se leería como
   * deshabilitada.
   *
   * Los dos cortes de palabra son el mismo remedio en dos dialectos: una URL
   * con token no cabe en 600px y sacaría barra horizontal. `word-break` para
   * los clientes modernos y `word-wrap`, el nombre viejo, para el motor de
   * Word de Outlook. Se corta la palabra a propósito — la alternativa sería
   * `overflow`, que esconde justo lo que hay que copiar.
   */
  buttonFallbackUrl: {
    color: emailPalette.text,
    wordBreak: 'break-all',
    wordWrap: 'break-word',
  },
  link: {
    color: emailPalette.text,
    fontFamily: emailFontFamily,
    fontWeight: Number(emailToken('--email-font-weight')),
    textDecoration: 'underline',
  },
  /*
   * El segundo escalón de `EmailHeading`: el título de un bloque dentro del
   * cuerpo. Es un título más pequeño, no un metadato — ni versalitas ni gris,
   * que son las tres decisiones que `TenderBatchEmail` se inventó por su cuenta
   * (12px, mayúsculas, gris) y que el sistema no tiene.
   *
   * El margen superior es lo que hace de él un corte: separa del bloque
   * anterior más de lo que lo une a su propio texto.
   */
  heading2: {
    color: emailToken('--email-heading-2-color'),
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-heading-2-font-size'),
    fontWeight: Number(emailToken('--email-heading-2-font-weight')),
    lineHeight: emailToken('--email-heading-2-line-height'),
    margin: `${emailToken('--email-heading-2-margin-block-start')} 0 ${emailToken('--email-heading-2-margin-block-end')}`,
  },
  /*
   * La lista. El sangrado va aquí, en el `<ul>`, y no en el ítem: el
   * `padding-left` de la lista es lo único que respetan todos los clientes,
   * el motor de Word incluido.
   */
  list: {
    color: emailPalette.text,
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-font-size'),
    fontWeight: Number(emailToken('--email-font-weight')),
    lineHeight: emailToken('--email-line-height'),
    margin: `0 0 ${emailToken('--email-list-margin-block-end')}`,
    paddingLeft: emailToken('--email-list-padding-inline-start'),
  },
  listItem: {
    margin: `0 0 ${emailToken('--email-list-item-margin-block-end')}`,
  },
  /*
   * La cita: una barra a la izquierda y el texto separado de ella. Marca
   * palabras que no son nuestras —lo que escribió quien denunció un plugin, el
   * motivo de un rechazo— y por eso la barra va en la tinta secundaria.
   *
   * `borderLeft` en físicas y en la shorthand, como todo aquí: el motor de Word
   * no conoce `border-inline-start`.
   */
  quote: {
    borderLeft: `${emailToken('--email-quote-border-width')} solid ${emailToken('--email-quote-border-color')}`,
    margin: `0 0 ${emailToken('--email-quote-margin-block-end')}`,
    paddingLeft: emailToken('--email-quote-padding-inline-start'),
  },
  /*
   * La etiqueta de estado. En línea, para que pueda ir dentro de un párrafo o
   * suelta sobre su propia línea.
   *
   * `display: inline-block` es lo que le da el padding vertical; sin él, un
   * `<span>` en línea pinta el relleno pero no empuja la línea, y la etiqueta
   * se come el renglón de arriba.
   */
  tag: {
    borderRadius: emailToken('--email-tag-border-radius'),
    display: 'inline-block',
    fontFamily: emailFontFamily,
    fontSize: emailToken('--email-tag-font-size'),
    fontWeight: Number(emailToken('--email-tag-font-weight')),
    padding: `${emailToken('--email-tag-padding-block')} ${emailToken('--email-tag-padding-inline')}`,
  },
  /*
   * El separador. `border: 0` + `borderTop` porque el `<hr>` trae de serie un
   * borde en relieve de los cuatro lados que los clientes heredan del navegador.
   */
  divider: {
    border: 0,
    borderTop: `${emailToken('--email-divider-width')} solid ${emailToken('--email-divider-color')}`,
    margin: `${emailToken('--email-divider-margin-block')} 0`,
    width: '100%',
  },
} as const satisfies Record<string, CSSProperties>;

/**
 * Los tres tonos de `EmailTag`, cada uno un par relleno/tinta autocontenido.
 *
 * Son los tres veredictos que hoy pinta un correo de la suite —el de validación
 * de `lmsmarketplace`, que los tenía escritos a mano como `#006616`, `#ffcd00` y
 * `#b30000`: exactamente estos—. No hay un cuarto tono neutro ni uno
 * informativo porque ningún correo los pide todavía.
 *
 * Son RELLENOS, los tres, y lo decide el aviso: el amarillo de marca da 1,50:1
 * sobre blanco y no llega al 3:1 de WCAG como tinta, así que solo existe como
 * relleno con tinta prusia. Darles a los otros dos otra forma habría dejado
 * tres veredictos que no se parecen entre sí.
 */
export const emailTones = {
  success: {
    ...emailSolidBackground(emailToken('--email-tone-success-bg')),
    color: emailToken('--email-tone-success-color'),
  },
  warning: {
    ...emailSolidBackground(emailToken('--email-tone-warning-bg')),
    color: emailToken('--email-tone-warning-color'),
  },
  error: {
    ...emailSolidBackground(emailToken('--email-tone-error-bg')),
    color: emailToken('--email-tone-error-color'),
  },
} as const satisfies Record<string, CSSProperties>;

/** El veredicto que pinta una `EmailTag`. */
export type EmailTone = keyof typeof emailTones;

/** La clase del botón, gancho de su `:hover` y de su color forzado en claro. */
export const emailButtonClassName = emailClassNames.button;

/*
 * Lo que `emailStyleSheet` reafirma cuando un cliente pinta el correo en oscuro:
 * por clase, los colores CLAROS de siempre, los mismos tokens que van inline.
 * Una sola tabla para las tres capas (media query, `[data-ogsc]` y
 * `[data-ogsb]`), de modo que no puedan discrepar entre sí.
 */
const forcedLight: ReadonlyArray<{
  selector: string;
  /** Fondo liso. */
  background?: string;
  /** Tinta. */
  color?: string;
  /** Color del borde que ya pinta el elemento (solo el lado que lleva). */
  border?: { side: 'left' | 'top' | 'all'; color: string };
}> = [
  { selector: emailClassNames.canvas, background: emailPalette.canvas },
  { selector: emailClassNames.surface, background: emailPalette.background },
  { selector: emailClassNames.box, border: { side: 'all', color: emailPalette.border } },
  { selector: emailClassNames.text, color: emailPalette.text },
  { selector: emailClassNames.muted, color: emailPalette.muted },
  { selector: emailClassNames.heading2, color: emailToken('--email-heading-2-color') },
  { selector: emailClassNames.link, color: emailPalette.text },
  {
    selector: emailClassNames.button,
    background: emailToken('--email-button-bg'),
    color: emailToken('--email-button-color'),
  },
  { selector: emailClassNames.quote, border: { side: 'left', color: emailToken('--email-quote-border-color') } },
  { selector: emailClassNames.divider, border: { side: 'top', color: emailToken('--email-divider-color') } },
  {
    selector: emailClassNames.tag.success,
    background: emailToken('--email-tone-success-bg'),
    color: emailToken('--email-tone-success-color'),
  },
  {
    selector: emailClassNames.tag.warning,
    background: emailToken('--email-tone-warning-bg'),
    color: emailToken('--email-tone-warning-color'),
  },
  {
    selector: emailClassNames.tag.error,
    background: emailToken('--email-tone-error-bg'),
    color: emailToken('--email-tone-error-color'),
  },
];

const BORDER_PROPERTY = { all: 'border-color', left: 'border-left-color', top: 'border-top-color' } as const;

/** Las declaraciones de una entrada de `forcedLight`, filtradas por lo que cada capa puede tocar. */
function forcedLightDeclarations(
  entry: (typeof forcedLight)[number],
  only?: 'color' | 'background',
): string {
  const out: string[] = [];
  if (entry.background && only !== 'color') {
    out.push(`background-color: ${entry.background} !important;`);
    out.push(`background-image: linear-gradient(${entry.background}, ${entry.background}) !important;`);
  }
  if (entry.color && only !== 'background') out.push(`color: ${entry.color} !important;`);
  if (entry.border && only !== 'background') {
    out.push(`${BORDER_PROPERTY[entry.border.side]}: ${entry.border.color} !important;`);
  }
  return out.join(' ');
}

function forcedLightRules(prefix: string, only?: 'color' | 'background', indent = '  '): string {
  return forcedLight
    .map((entry) => ({ entry, decl: forcedLightDeclarations(entry, only) }))
    .filter(({ decl }) => decl !== '')
    .map(({ entry, decl }) => `${indent}${prefix}.${entry.selector} { ${decl} }`)
    .join('\n');
}

/**
 * El hover del botón. Lleva también `background-image`: el botón tiene inline un
 * degradado de su color de reposo (ver `emailSolidBackground`) que taparía el
 * `background-color` del hover. Se repite dentro de la media query oscura,
 * después de las reglas forzadas, para que ahí tampoco pierda el orden.
 */
const buttonHoverBg = emailToken('--email-button-hover-bg');
const buttonHoverRule = `a.${emailButtonClassName}:hover {
    background-color: ${buttonHoverBg} !important;
    background-image: linear-gradient(${buttonHoverBg}, ${buttonHoverBg}) !important;
    color: ${emailToken('--email-button-hover-color')} !important;
  }`;

/**
 * La hoja del correo: lo que no cabe en un atributo `style`.
 *
 * Dos asuntos:
 *
 * **1. Las pseudoclases.**
 *
 * - El enlace se desubraya bajo el puntero, como en la web.
 * - El botón hace el salto de `Button primary`: del lavanda al amarillo, con la
 *   tinta prusia quieta. Va con `!important` porque compite con el estilo
 *   inline del propio botón, que le gana por especificidad. Y engancha por la
 *   clase `email-button`, no por `a`: el enlace de respaldo y los de baja son
 *   enlaces del correo y no deben ponerse amarillos.
 *
 * Esto solo se ve donde el cliente respeta el `<style>` del head —Gmail web,
 * Apple Mail—; en Outlook de escritorio, que renderiza con el motor de Word, no,
 * y en el móvil no hay puntero. Donde no llegue, el botón se queda en su reposo,
 * que es la lectura correcta: es pulido, no una señal de la que dependa nada.
 *
 * **2. El correo se pide siempre en claro.** No hay paleta oscura: lo que hay
 * son capas que piden al cliente no pintar el correo en oscuro, de la más
 * limpia a la más tosca —el `color-scheme` de `:root` (y las `meta` del
 * layout), la media query `prefers-color-scheme: dark` que reafirma con
 * `!important` los colores claros por clase, y los selectores `[data-ogsc]` /
 * `[data-ogsb]` con los que Outlook.com y el nuevo Outlook marcan lo que
 * recolorean—. Los valores son los mismos tokens que van inline; ningún color
 * nuevo. Las clases son las de `emailClassNames`.
 */
export const emailStyleSheet = `
  :root { color-scheme: light only; supported-color-schemes: light only; }
  a:hover { text-decoration: none !important; }
  ${buttonHoverRule}
  @media (prefers-color-scheme: dark) {
${forcedLightRules('', undefined, '    ')}
    ${buttonHoverRule}
  }
${forcedLightRules('[data-ogsc] ', 'color')}
${forcedLightRules('[data-ogsb] ', 'background')}
`;
