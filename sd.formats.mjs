import { formattedVariables, fileHeader } from 'style-dictionary/utils';

// Selectores que activan el modo oscuro: `.surface-dark` (contextual,
// aplicado a mano a un contenedor) y `[data-theme="dark"]`/`html.dark`
// (root-level, para theme managers como next-themes que ponen la clase/
// atributo en <html>). Las custom properties se heredan por cascada, así
// que un único selector sirve tanto para el caso contextual como para el
// root-level — no hace falta lógica distinta.
// Se exporta para que `src/stylesheets/color-scheme.test.ts` compruebe contra la
// fuente de verdad que el `color-scheme: dark` de base.css cubre estos mismos
// selectores, en vez de mantener una copia de la lista que se desincronice.
//
// `.surface-invert` es la superficie CONTRARIA a la ambiente: sobre una página
// clara activa los mismos valores oscuros que `.surface-dark` —por eso está en
// esta lista—, y sobre una oscura los vuelve a poner claros con el bloque que
// genera `sd.config.mjs` en `src/tokens/surface-invert.css`, que gana por
// especificidad. Sirve al interior de un relleno que invierte el lienzo (el
// `Alert` `default`: prusia sobre página clara, blanco sobre página oscura).
export const DARK_SELECTORS = ['.surface-dark', '.surface-invert', '[data-theme="dark"]', 'html.dark'];

// Marcador de los tokens auto-remapeados por este formato. Deliberadamente
// distinto de "dark-" a secas: algunos componentes (ej. header.json:
// `dark-bg`, `nav-dark-color`) ya usan ese prefijo/infijo para su propia
// variante BEM manual (`.header--dark`), consumida como una custom property
// aparte — no como un remapeo contextual. Colisionar con ese patrón haría
// desaparecer esas variables de `:root` y romper esos componentes.
const DARK_TOKEN_PREFIX = 'surface-dark-';

// Un token `surface-dark-<nombre>` es el par oscuro de `<nombre>` dentro del
// mismo grupo (ej. `button.primary.bg` + `button.primary.surface-dark-bg`).
// Exportado: la plataforma SCSS (consumidores no-React, sin modo runtime)
// filtra estos tokens para no exponerlos como variables sueltas.
export function isDarkToken(token) {
  const last = token.path[token.path.length - 1];
  return typeof last === 'string' && last.startsWith(DARK_TOKEN_PREFIX);
}

// La custom property generada por un token `surface-dark-<nombre>` debe
// llamarse igual que la de su par claro (`--button-primary-bg`, no
// `--button-primary-surface-dark-bg`) — solo cambia el bloque/selector en
// el que aparece, no el nombre de la variable que consume el componente.
function lightNameFromDarkToken(token) {
  const path = token.path;
  const last = path[path.length - 1];
  const stripped = last.slice(DARK_TOKEN_PREFIX.length);
  return [...path.slice(0, -1), stripped].join('-');
}

// Un token oscuro puede referenciar el par oscuro de OTRO componente
// (`{menu.surface-dark-item-color}`). Style Dictionary lo emitiría como
// `var(--menu-surface-dark-item-color)`, una variable que no existe: el par
// oscuro se publica con el nombre de su par claro. Dentro del bloque oscuro,
// donde `--menu-item-color` YA vale el valor oscuro sobre el mismo elemento,
// la referencia correcta es la del nombre claro — que es a lo que se reescribe
// aquí. Sin esto, la propiedad queda inválida y el componente pierde su color
// en superficie oscura.
function remapDarkReferences(css) {
  return css.replace(/var\(--([a-z0-9-]+?)-surface-dark-([a-z0-9-]+)\)/g, 'var(--$1-$2)');
}

/**
 * Registra el formato `css/variables-with-dark-mode`: igual que el
 * `css/variables` built-in de Style Dictionary, pero además emite un
 * segundo bloque con los tokens `dark-*` de cada grupo, remapeando la
 * MISMA custom property bajo los selectores de activación de tema oscuro.
 */
export function registerDarkModeFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'css/variables-with-dark-mode',
    format: async ({ dictionary, options = {}, file }) => {
      const selector = options.selector || ':root';
      const darkSelectors = options.darkSelectors || DARK_SELECTORS;
      const { outputReferences, outputReferenceFallbacks, usesDtcg, formatting } = options;

      const header = await fileHeader({ file, formatting, options });

      const lightTokens = dictionary.allTokens.filter((t) => !isDarkToken(t));
      const darkTokens = dictionary.allTokens.filter(isDarkToken);

      const lightVars = formattedVariables({
        format: 'css',
        dictionary: { ...dictionary, allTokens: lightTokens },
        outputReferences,
        outputReferenceFallbacks,
        formatting,
        usesDtcg,
      });

      let output = `${header}${selector} {\n${lightVars}\n}\n`;

      if (darkTokens.length) {
        const renamedDarkTokens = darkTokens.map((t) => ({ ...t, name: lightNameFromDarkToken(t) }));
        const darkVars = formattedVariables({
          format: 'css',
          dictionary: { ...dictionary, allTokens: renamedDarkTokens },
          outputReferences,
          outputReferenceFallbacks,
          formatting,
          usesDtcg,
        });
        output += `\n${darkSelectors.join(',\n')} {\n${remapDarkReferences(darkVars)}\n}\n`;
      }

      return output;
    },
  });
}

/**
 * Registra el formato `json/css-variables`: el mismo diccionario que sale a
 * CSS, pero como un objeto JSON plano `{ "--nombre": "valor" }` con los
 * valores YA resueltos (sin `var()`), para consumidores que no pueden leer
 * custom properties — un correo HTML, por ejemplo, donde todo estilo tiene
 * que ir inline y resuelto en tiempo de render.
 *
 * La clave es el nombre de la custom property, no la ruta del token: así el
 * mismo identificador sirve para buscar el valor en JS y para leer el CSS
 * generado, sin traducción por medio.
 */
export function registerJsonVariablesFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'json/css-variables',
    format: ({ dictionary }) => {
      const entries = dictionary.allTokens.map((token) => [
        `--${token.name}`,
        String(token.$value ?? token.value),
      ]);
      return `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`;
    },
  });
}

/* ---------------------------------------------------------------------------
 * Tokens nativos (SwiftUI y Jetpack Compose)
 *
 * Dos formatos —`swift/brand-tokens` y `kotlin/brand-tokens`— que parten de UN
 * mismo modelo (`buildNativeModel`): lo que difiere entre plataformas es solo
 * la sintaxis, nunca qué tokens salen ni cómo se llaman. Los valores llegan ya
 * resueltos (plataforma con `transformGroup: 'css'`, igual que `tokens.json`),
 * y aquí se convierten: `rem` → puntos/dp con 1rem = 16, `ms` → segundos
 * (Swift) o milisegundos (Kotlin), `em` → fracción del cuerpo.
 *
 * Alcance: solo los grupos GLOBALES (`NATIVE_GLOBAL_GROUPS`). Los tokens de
 * componente (`tokens/component|molecule|organism/`) y sus `surface-dark-*`
 * se añadirán cuando se porte cada componente: el sitio es una tabla paralela
 * a `NATIVE_GLOBAL_GROUPS` que agrupe por `path[0]` y resuelva cada
 * `surface-dark-<nombre>` como el lado oscuro de `<nombre>` con `darkPairOf`,
 * la misma idea que ya aplican los roles de color de aquí.
 *
 * Se omiten, a propósito: `breakpoint` y `z-index` (no hay equivalente nativo
 * razonable), `form` y `section` (maquetación web), `content.measure` (`70ch`:
 * una unidad de CSS), cualquier valor con `var(` y las pilas de fuentes de
 * respaldo (solo sale la primera familia: el respaldo lo decide cada sistema).
 * ------------------------------------------------------------------------- */
export const NATIVE_GLOBAL_GROUPS = new Set([
  'color',
  'spacing',
  'border-radius',
  'border-width',
  'size-component',
  'size-target',
  'opacity',
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'shadow',
  'motion',
]);

/**
 * Grupos de tokens de COMPONENTE que se generan para nativo (`path[0]` del token).
 * Se amplía al portar un componente: la lista sale de los `var(--…)` que usa su CSS.
 * Cada grupo sale como `enum Brand<Grupo>Tokens` (Swift) con una constante por token que
 * se pueda expresar (dimensiones, colores, duraciones, curvas, números, sombras, familias);
 * los demás valores (`solid`, `center`, `pointer`, `100%`, `85vh`…) son CSS puro y se omiten.
 * Un `surface-dark-<nombre>` no sale suelto: es el lado oscuro de `<nombre>`.
 */
export const NATIVE_COMPONENT_GROUPS = [
  'button', 'close-button', 'control', 'input', 'input-field', 'label', 'form-field', 'field-row',
  'number-input', 'number-input-field', 'select', 'select-field', 'dropdown-field', 'checkbox',
  'switcher', 'switcher-field', 'toggle', 'toggle-group', 'theme-switcher', 'text', 'link',
  'tag', 'alert', 'text-inline', 'empty-state', 'skeleton', 'sheet', 'modal', 'confirm-dialog', 'toast', 'icon', 'spinner',
  'separator', 'form', 'fieldset', 'card', 'popover', 'menu', 'password-field',
];

// 1rem = 16: el sistema no toca el font-size del <html>.
const ROOT_FONT_SIZE = 16;

// Las curvas con nombre de CSS, como los cuatro puntos de control de un
// cubic-bezier (https://www.w3.org/TR/css-easing-1/#cubic-bezier-easing-functions).
const CSS_EASINGS = {
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  linear: null,
};

/** Filtro de la plataforma: lo que entra en los tokens nativos. */
export function isNativeToken(token) {
  if (isDarkToken(token)) return false;
  if (!NATIVE_GLOBAL_GROUPS.has(token.path[0])) return false;
  return !String(token.$value ?? token.value).includes('var(');
}

const camel = (parts) =>
  parts
    .flatMap((part) => String(part).split('-'))
    .map((word, i) => (i === 0 ? word : word[0].toUpperCase() + word.slice(1)))
    .join('');

const upperFirst = (s) => s[0].toUpperCase() + s.slice(1);

/** `#rgb`, `#rrggbb`, `#rrggbbaa` o `rgba(r,g,b,a)` → `{ r, g, b, a }` (0-255, a 0-1). */
export function parseColor(value) {
  const hex = value.match(/^#([0-9a-f]{3,8})$/i)?.[1];
  if (hex) {
    const full = hex.length <= 4 ? [...hex].map((c) => c + c).join('') : hex;
    if (full.length !== 6 && full.length !== 8) throw new Error(`Color no soportado: ${value}`);
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
      a: full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1,
    };
  }
  const rgba = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (rgba) return { r: +rgba[1], g: +rgba[2], b: +rgba[3], a: rgba[4] === undefined ? 1 : +rgba[4] };
  throw new Error(`Color no soportado: ${value}`);
}

/** `0.5rem` / `8px` / `0` → número de puntos/dp. */
export function toPoints(value) {
  const m = String(value).match(/^(-?[\d.]+)(rem|px)?$/);
  if (!m) throw new Error(`Dimensión no soportada: ${value}`);
  return m[2] === 'rem' ? +m[1] * ROOT_FONT_SIZE : +m[1];
}

/** `0 2px 8px rgba(17,30,48,0.10)` → `{ x, y, blur, color }`; `none` → `null`. */
export function parseShadow(value) {
  if (value.trim() === 'none') return null;
  const m = value.match(/^(-?[\d.]+)(?:px)?\s+(-?[\d.]+)(?:px)?\s+([\d.]+)(?:px)?\s+(.+)$/);
  if (!m) throw new Error(`Sombra no soportada: ${value}`);
  return { x: +m[1], y: +m[2], blur: +m[3], color: parseColor(m[4]) };
}

/**
 * Agrupa los tokens de color en singles (un solo valor, universal en las dos
 * superficies: primitivos, marca, `*-fill`) y roles (par claro/oscuro, por los
 * sufijos `-on-light`/`-on-dark` o `background.light|dark`). Un rol al que solo
 * le definen un lado cae, en el otro, al mismo valor.
 */
function buildColors(tokens) {
  const singles = [];
  const roles = new Map();
  for (const token of tokens) {
    const [, ...rest] = token.path;
    const last = rest[rest.length - 1];
    const value = token.$value ?? token.value;
    const doc = token.$description ?? token.comment ?? '';
    const side = last.match(/^(?:(.*)-)?on-(light|dark)$/);
    const background = rest[0] === 'background' && (last === 'light' || last === 'dark');
    // Sin sufijo `-on-light`, el token base de un grupo con lado oscuro es el claro:
    // `chart.series-1` y `chart.series-1-on-dark` son el mismo rol.
    const chartLight = rest[0] === 'chart';
    let key;
    let which;
    if (side) {
      key = [...rest.slice(0, -1), ...(side[1] ? [side[1]] : [])];
      which = side[2];
    } else if (background) {
      key = rest.slice(0, -1);
      which = last;
    } else {
      singles.push({ name: camel(rest), value, token: token.path.join('.'), doc, chart: chartLight });
      continue;
    }
    const name = camel(key);
    const role = roles.get(name) ?? { name, tokens: {} };
    role[which] = value;
    role.tokens[which] = token.path.join('.');

    roles.set(name, role);
  }

  // Las series de gráfico no llevan `-on-light`: la variante sin sufijo es la clara.
  const rolesByName = new Map(roles);
  const lightSingles = [];
  for (const single of singles) {
    const dark = rolesByName.get(single.name);
    if (single.chart && dark) {
      dark.light = single.value;
      dark.tokens.light = single.token;
    } else lightSingles.push(single);
  }

  return {
    singles: lightSingles,
    // Los roles de gráfico, al final: son una familia aparte dentro de la misma clase.
    roles: [...rolesByName.values()]
      .sort((a, b) => Number(a.name.startsWith('chart')) - Number(b.name.startsWith('chart')))
      .map((r) => ({
        ...r,
        tokens: Object.fromEntries(['light', 'dark'].filter((k) => r.tokens[k]).map((k) => [k, r.tokens[k]])),
        light: r.light ?? r.dark,
        dark: r.dark ?? r.light,
        oneSided: r.light === undefined ? 'dark' : r.dark === undefined ? 'light' : null,
      })),
  };
}

/** El modelo común a las dos plataformas. */
export function buildNativeModel(allTokens) {
  const tokens = allTokens.filter(isNativeToken);
  const group = (name) => tokens.filter((t) => t.path[0] === name);
  const entry = (token, name) => ({
    name,
    value: String(token.$value ?? token.value),
    token: token.path.join('.'),
    doc: token.$description ?? token.comment ?? '',
  });
  const numbered = (name) => (/^\d/.test(name) ? `s${name}` : name);
  const byNames = (groupName, skip = 1) =>
    group(groupName).map((t) => entry(t, numbered(camel(t.path.slice(skip)))));

  const motion = group('motion');
  return {
    colors: buildColors(group('color')),
    spacing: byNames('spacing').map((e) => ({ ...e, points: toPoints(e.value) })),
    radius: byNames('border-radius').map((e) => ({ ...e, points: toPoints(e.value) })),
    borderWidth: byNames('border-width').map((e) => ({ ...e, points: toPoints(e.value) })),
    size: group('size-component')
      .concat(group('size-target'))
      .map((t) => entry(t, camel([t.path[0].replace(/^size-/, ''), ...t.path.slice(1)])))
      .map((e) => ({ ...e, points: toPoints(e.value) })),
    opacity: byNames('opacity').map((e) => ({ ...e, number: +e.value })),
    fontFamily: byNames('font-family').map((e) => ({ ...e, family: e.value.match(/^\s*"?([^",]+)"?/)[1] })),
    fontSize: byNames('font-size').map((e) => ({ ...e, points: toPoints(e.value) })),
    fontWeight: byNames('font-weight').map((e) => ({ ...e, number: +e.value })),
    lineHeight: byNames('line-height').map((e) => ({ ...e, number: +e.value })),
    letterSpacing: byNames('letter-spacing').map((e) => ({ ...e, em: parseFloat(e.value) })),
    shadow: byNames('shadow').map((e) => ({ ...e, shadow: parseShadow(e.value) })),
    duration: motion
      .filter((t) => t.path[1] === 'duration')
      .map((t) => ({ ...entry(t, camel(t.path.slice(2))), ms: parseFloat(t.$value ?? t.value) })),
    easing: motion
      .filter((t) => t.path[1] === 'easing')
      .map((t) => {
        const e = entry(t, camel(t.path.slice(2)));
        if (!(e.value in CSS_EASINGS)) throw new Error(`Curva no soportada: ${e.value}`);
        return { ...e, bezier: CSS_EASINGS[e.value] };
      }),
  };
}

const trimNum = (n) => String(Number(n.toFixed(4)));
const oneLine = (s) => s.replace(/\s+/g, ' ').replace(/\*\//g, '* /').trim();
const docLine = (e) => oneLine(`Token \`${e.token}\`${e.doc ? ` — ${e.doc}` : ''}`);
const roleDocLine = (r) => {
  const tokens = Object.values(r.tokens).map((t) => `\`${t}\``).join(' / ');
  const note = r.oneSided ? ` El token solo define el lado ${r.oneSided === 'dark' ? 'oscuro' : 'claro'}; en el otro lado vale lo mismo.` : '';
  return oneLine(`Rol claro/oscuro. Tokens ${tokens}.${note}`);
};

const SWIFT_KEYWORDS = new Set(['default', 'class', 'struct', 'enum', 'protocol', 'extension', 'func', 'var', 'let', 'in', 'is', 'as', 'if', 'else', 'for', 'while', 'return', 'self', 'super', 'init', 'true', 'false', 'nil', 'switch', 'case', 'static', 'public', 'private', 'internal', 'import', 'where', 'repeat', 'operator', 'subscript', 'throw', 'throws', 'try', 'catch', 'do', 'break', 'continue', 'fallthrough', 'guard', 'defer', 'inout', 'Type', 'Protocol', 'Self', 'Any']);
const KOTLIN_KEYWORDS = new Set(['as', 'break', 'class', 'continue', 'do', 'else', 'false', 'for', 'fun', 'if', 'in', 'interface', 'is', 'null', 'object', 'package', 'return', 'super', 'this', 'throw', 'true', 'try', 'typealias', 'typeof', 'val', 'var', 'when', 'while']);

function assertUnique(label, names) {
  const seen = new Set();
  for (const name of names) {
    if (seen.has(name)) throw new Error(`Nombre nativo duplicado en ${label}: ${name}`);
    seen.add(name);
  }
}

function checkModel(model) {
  assertUnique('colores', [...model.colors.singles.map((c) => c.name), ...model.colors.roles.map((r) => r.name)]);
  for (const key of ['spacing', 'radius', 'borderWidth', 'size', 'opacity', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'shadow', 'duration', 'easing']) {
    assertUnique(key, model[key].map((e) => e.name));
  }
}

const swiftColor = ({ r, g, b, a }) => {
  const hex = `0x${[r, g, b].map((n) => Math.round(n).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  return a === 1 ? `Color(brandHex: ${hex})` : `Color(brandHex: ${hex}, opacity: ${trimNum(a)})`;
};

const kotlinColor = ({ r, g, b, a }) => {
  const channel = (n) => Math.round(n).toString(16).padStart(2, '0');
  const alpha = channel(a * 255);
  return `Color(0x${(alpha + channel(r) + channel(g) + channel(b)).toUpperCase()})`;
};

function swiftSource(model, header) {
  const sw = (n) => (SWIFT_KEYWORDS.has(n) ? `\`${n}\`` : n);
  const block = (name, docs, members) => [
    `/// ${docs}`,
    `public enum ${name} {`,
    ...members.flatMap((m) => m.split('\n').map((l) => `    ${l}`)),
    '}',
    '',
  ];
  const member = (e, type, literal) => `/// ${docLine(e)}\npublic static let ${sw(e.name)}: ${type} = ${literal}`;
  const pt = (type) => (e) => member(e, type, trimNum(e.points));
  const rgb = (v) => parseColor(v);
  const out = [
    `// ${header}`,
    '',
    'import SwiftUI',
    '',
    ...block('BrandColors', 'Colores primitivos, de marca y rellenos universales: el mismo valor en superficie clara y oscura.',
      model.colors.singles.map((c) => member(c, 'Color', swiftColor(rgb(c.value))))),
    ...block('BrandColorRoles', 'Roles de color: cada uno es un `Color` dinámico que resuelve su valor claro u oscuro según el esquema.',
      [
        ...model.colors.roles.map((r) => `/// ${roleDocLine(r)}\npublic static let ${sw(r.name)} = Color(brandLight: ${swiftColor(rgb(r.light))}, dark: ${swiftColor(rgb(r.dark))})`),
        '/// Todos los roles por nombre, por ejemplo para pintar una paleta de muestra.',
        `public static let all: [(name: String, color: Color)] = [\n${model.colors.roles.map((r) => `    ("${r.name}", ${sw(r.name)}),`).join('\n')}\n]`,
      ]),
    ...block('BrandSpacing', 'Escala de espaciado, en puntos (`spacing.*`).', model.spacing.map(pt('CGFloat'))),
    ...block('BrandRadius', 'Radios de esquina, en puntos (`border-radius.*`).', model.radius.map(pt('CGFloat'))),
    ...block('BrandBorderWidth', 'Anchos de borde, en puntos (`border-width.*`).', model.borderWidth.map(pt('CGFloat'))),
    ...block('BrandSize', 'Tallas de control y objetivo táctil mínimo, en puntos (`size-component.*`, `size-target.*`).', model.size.map(pt('CGFloat'))),
    ...block('BrandOpacity', 'Escala de opacidad (`opacity.*`).', model.opacity.map((e) => member(e, 'Double', trimNum(e.number)))),
    ...block('BrandFontFamily', 'Nombres de familia tipográfica (`font-family.*`), sin la pila de respaldo.',
      model.fontFamily.map((e) => member(e, 'String', JSON.stringify(e.family)))),
    ...block('BrandFontSize', 'Escala de tamaños de fuente, en puntos (`font-size.*`).', model.fontSize.map(pt('CGFloat'))),
    ...block('BrandFontWeight', 'Pesos de la fuente variable (`font-weight.*`), como el valor numérico del eje `wght`.',
      model.fontWeight.map((e) => member(e, 'Int', trimNum(e.number)))),
    ...block('BrandLineHeight', 'Interlineado como múltiplo del tamaño (`line-height.*`).', model.lineHeight.map((e) => member(e, 'CGFloat', trimNum(e.number)))),
    ...block('BrandLetterSpacing', 'Tracking como fracción del tamaño de fuente, en em (`letter-spacing.*`).', model.letterSpacing.map((e) => member(e, 'CGFloat', trimNum(e.em)))),
    ...block('BrandShadows', 'Sombras (`shadow.*`). `blur` es el desenfoque de CSS: en SwiftUI, `radius` ≈ blur / 2.',
      model.shadow.map((e) => member(e, 'BrandShadow', e.shadow
        ? `BrandShadow(x: ${trimNum(e.shadow.x)}, y: ${trimNum(e.shadow.y)}, blur: ${trimNum(e.shadow.blur)}, color: ${swiftColor(e.shadow.color)})`
        : 'BrandShadow.none')),),
    ...block('BrandDuration', 'Duraciones de movimiento, en segundos (`motion.duration.*`).', model.duration.map((e) => member(e, 'TimeInterval', trimNum(e.ms / 1000)))),
    ...block('BrandEasing', 'Curvas de movimiento (`motion.easing.*`), como cubic-bezier de CSS.',
      model.easing.map((e) => member(e, 'BrandCubicBezier', e.bezier ? `BrandCubicBezier(${e.bezier.map(trimNum).join(', ')})` : 'BrandCubicBezier.linear'))),
  ];
  return out.join('\n').replace(/\n+$/, '\n');
}

function kotlinSource(model, header) {
  const kt = (n) => (KOTLIN_KEYWORDS.has(n) ? `\`${n}\`` : n);
  const block = (name, docs, members) => [
    `/** ${docs} */`,
    `object ${name} {`,
    ...members.flatMap((m) => m.split('\n').map((l) => `    ${l}`)),
    '}',
    '',
  ];
  const member = (e, literal, type = '') => `/** ${docLine(e)} */\nval ${kt(e.name)}${type ? `: ${type}` : ''} = ${literal}`;
  const unit = (suffix) => (e) => member(e, `${trimNum(e.points)}.${suffix}`);
  const roles = model.colors.roles;
  const roleArgs = (side) => roles.map((r) => `        ${kt(r.name)} = ${kotlinColor(parseColor(r[side]))},`).join('\n');
  const out = [
    `// ${header}`,
    '',
    'package com.studiolxd.brand.tokens',
    '',
    'import androidx.compose.animation.core.CubicBezierEasing',
    'import androidx.compose.animation.core.Easing',
    'import androidx.compose.animation.core.LinearEasing',
    'import androidx.compose.runtime.Immutable',
    'import androidx.compose.runtime.staticCompositionLocalOf',
    'import androidx.compose.ui.graphics.Color',
    'import androidx.compose.ui.text.font.FontWeight',
    'import androidx.compose.ui.unit.Dp',
    'import androidx.compose.ui.unit.dp',
    'import androidx.compose.ui.unit.em',
    'import androidx.compose.ui.unit.sp',
    '',
    ...block('BrandColors', 'Colores primitivos, de marca y rellenos universales: el mismo valor en superficie clara y oscura.',
      model.colors.singles.map((c) => member(c, kotlinColor(parseColor(c.value))))),
    '/**',
    ' * Roles de color: una instancia por esquema, [BrandColorRoles.light] y [BrandColorRoles.dark].',
    ' * La vigente en la composición sale de [LocalBrandColorRoles] (la provee `BrandTheme`).',
    ' */',
    '@Immutable',
    'class BrandColorRoles(',
    ...roles.flatMap((r) => [`    /** ${roleDocLine(r)} */`, `    val ${kt(r.name)}: Color,`]),
    ') {',
    '    companion object {',
    '        /** Valores para superficie clara (`-on-light`). */',
    '        val light = BrandColorRoles(',
    roleArgs('light').split('\n').map((l) => `    ${l}`).join('\n'),
    '        )',
    '',
    '        /** Valores para superficie oscura (`-on-dark`). */',
    '        val dark = BrandColorRoles(',
    roleArgs('dark').split('\n').map((l) => `    ${l}`).join('\n'),
    '        )',
    '    }',
    '}',
    '',
    '/** Los roles de color del esquema vigente. Por defecto, el claro. */',
    'val LocalBrandColorRoles = staticCompositionLocalOf { BrandColorRoles.light }',
    '',
    ...block('BrandSpacing', 'Escala de espaciado (`spacing.*`).', model.spacing.map(unit('dp'))),
    ...block('BrandRadius', 'Radios de esquina (`border-radius.*`).', model.radius.map(unit('dp'))),
    ...block('BrandBorderWidth', 'Anchos de borde (`border-width.*`).', model.borderWidth.map(unit('dp'))),
    ...block('BrandSize', 'Tallas de control y objetivo táctil mínimo (`size-component.*`, `size-target.*`).', model.size.map(unit('dp'))),
    ...block('BrandOpacity', 'Escala de opacidad (`opacity.*`).', model.opacity.map((e) => member(e, `${trimNum(e.number)}f`))),
    ...block('BrandFontFamilyName', 'Nombres de familia tipográfica (`font-family.*`), sin la pila de respaldo. Las `FontFamily` de Compose están en `BrandFontFamily`.',
      model.fontFamily.map((e) => member(e, JSON.stringify(e.family)))),
    ...block('BrandFontSize', 'Escala de tamaños de fuente (`font-size.*`).', model.fontSize.map(unit('sp'))),
    ...block('BrandFontWeight', 'Pesos de la fuente variable (`font-weight.*`).', model.fontWeight.map((e) => member(e, `FontWeight(${trimNum(e.number)})`))),
    ...block('BrandLineHeight', 'Interlineado como múltiplo del tamaño (`line-height.*`).', model.lineHeight.map((e) => member(e, `${trimNum(e.number)}f`))),
    ...block('BrandLetterSpacing', 'Tracking como fracción del tamaño de fuente (`letter-spacing.*`).', model.letterSpacing.map((e) => member(e, `${trimNum(e.em)}.em`))),
    '/** Una sombra de CSS: desplazamiento, desenfoque y color. */',
    '@Immutable',
    'class BrandShadow(val x: Dp, val y: Dp, val blur: Dp, val color: Color) {',
    '    companion object {',
    '        /** Sin sombra. */',
    '        val None = BrandShadow(0.dp, 0.dp, 0.dp, Color.Transparent)',
    '    }',
    '}',
    '',
    ...block('BrandShadows', 'Sombras (`shadow.*`).',
      model.shadow.map((e) => member(e, e.shadow
        ? `BrandShadow(${trimNum(e.shadow.x)}.dp, ${trimNum(e.shadow.y)}.dp, ${trimNum(e.shadow.blur)}.dp, ${kotlinColor(e.shadow.color)})`
        : 'BrandShadow.None'))),
    ...block('BrandDuration', 'Duraciones de movimiento, en milisegundos (`motion.duration.*`).', model.duration.map((e) => member(e, trimNum(e.ms)))),
    ...block('BrandEasing', 'Curvas de movimiento (`motion.easing.*`).',
      model.easing.map((e) => member(e, e.bezier ? `CubicBezierEasing(${e.bezier.map((n) => `${trimNum(n)}f`).join(', ')})` : 'LinearEasing', 'Easing'))),
  ];
  return out.join('\n').replace(/\n+$/, '\n');
}

/* ---------------------------------------------------------------------------
 * Tokens de componente nativos (solo Swift por ahora)
 *
 * Un `enum Brand<Grupo>Tokens` por grupo de `NATIVE_COMPONENT_GROUPS`. El lado
 * oscuro de un token sale de dos sitios, igual que en CSS: su hermano
 * `surface-dark-<nombre>` y la derivación por referencias (un token que apunta
 * a otro con par oscuro hereda ese par: es el fichero `surface-dark-derived.css`).
 * Con par oscuro el valor es un `Color` dinámico; sin él, uno fijo.
 * ------------------------------------------------------------------------- */

const REF = /\{([^{}]+)\}/g;

/** `calc(2.5rem + 2 * 0.5rem)` → número de puntos, o `null` si no es aritmética pura de rem/px. */
function evalCalc(value) {
  if (!value.startsWith('calc(')) return null;
  const expr = value
    .replace(/calc\(/g, '(')
    .replace(/(-?[\d.]+)rem/g, (_, n) => `(${n}*${ROOT_FONT_SIZE})`)
    .replace(/(-?[\d.]+)px/g, '$1');
  if (!/^[\d\s.+\-*/()]+$/.test(expr)) return null;
  try {
    const n = Function(`"use strict"; return (${expr});`)();
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

/** El valor CSS de un token en modo `light` o `dark`, resuelto a partir de sus referencias. */
function resolveToken(tokenMap, token, mode, depth = 0) {
  if (depth > 20) throw new Error(`Referencias circulares en ${token.path.join('.')}`);
  const own = String(token.$value ?? token.value);
  if (mode === 'light') return own;
  const path = token.path;
  const last = path[path.length - 1];
  const sibling = tokenMap.get(`{${[...path.slice(0, -1), `${DARK_TOKEN_PREFIX}${last}`].join('.')}}`);
  const source = sibling ?? token;
  const raw = source.original?.$value ?? source.original?.value;
  if (typeof raw !== 'string' || !/\{[^{}]+\}/.test(raw)) {
    return sibling ? String(sibling.$value ?? sibling.value) : own;
  }
  return raw.replace(REF, (_, ref) => {
    const target = tokenMap.get(`{${ref}}`);
    if (!target) throw new Error(`Referencia sin resolver {${ref}} en ${path.join('.')}`);
    return resolveToken(tokenMap, target, 'dark', depth + 1);
  });
}

/** Clasifica un valor CSS ya resuelto en un tipo nativo; `null` si es CSS puro (se omite). */
function nativeValue(path, value) {
  const last = path[path.length - 1];
  if (/^(#|rgba?\()/.test(value)) return { kind: 'color', color: parseColor(value) };
  if (value === 'transparent') return { kind: 'color', color: { r: 0, g: 0, b: 0, a: 0 } };
  if (/^-?[\d.]+m?s$/.test(value)) {
    const n = parseFloat(value);
    return { kind: 'duration', seconds: value.endsWith('ms') ? n / 1000 : n };
  }
  if (value in CSS_EASINGS) return { kind: 'easing', bezier: CSS_EASINGS[value] };
  if (/^-?[\d.]+em$/.test(value)) return { kind: 'em', number: parseFloat(value) };
  if (/^-?[\d.]+(rem|px)?$/.test(value)) {
    if (/font-weight$/.test(last)) return { kind: 'weight', number: +value };
    // `unitless`: un número sin `rem`/`px` (y distinto de 0) es un factor (`line-height: 1.5`), no una medida: Kotlin lo
    // emite como `Float`; Swift no distingue y sigue con `CGFloat`.
    return { kind: 'points', points: toPoints(value), unitless: !/(rem|px)$/.test(value) && +value !== 0 };
  }
  const calc = evalCalc(value);
  if (calc !== null) return { kind: 'points', points: calc };
  if (/(^|-)font-family$/.test(last)) return { kind: 'family', family: value.match(/^\s*"?([^",]+)"?/)[1] };
  if (/shadow$/.test(last)) {
    if (value.trim() === 'none') return { kind: 'shadow', shadow: null };
    try {
      return { kind: 'shadow', shadow: parseShadow(value) };
    } catch {
      return null;
    }
  }
  return null;
}

/** Modelo de los tokens de componente: `[{ group, tokens: [{ name, token, doc, light, dark? }] }]`. */
export function buildComponentModel(dictionary) {
  const { allTokens, tokenMap } = dictionary;
  const numbered = (name) => (/^\d/.test(name) ? `s${name}` : name);
  return NATIVE_COMPONENT_GROUPS.map((group) => {
    const tokens = [];
    for (const t of allTokens) {
      if (t.path[0] !== group || isDarkToken(t)) continue;
      const light = nativeValue(t.path, resolveToken(tokenMap, t, 'light'));
      if (!light) continue;
      let dark = null;
      if (light.kind === 'color' || light.kind === 'points') {
        const d = nativeValue(t.path, resolveToken(tokenMap, t, 'dark'));
        if (d?.kind === light.kind && JSON.stringify(d.color ?? d.points) !== JSON.stringify(light.color ?? light.points)) dark = d;
      }
      tokens.push({
        name: numbered(camel(t.path.slice(1))),
        token: t.path.join('.'),
        doc: t.$description ?? t.comment ?? '',
        light,
        dark,
      });
    }
    return { group, tokens };
  }).filter((g) => g.tokens.length);
}

function swiftComponentSource(groups, header) {
  const sw = (n) => (SWIFT_KEYWORDS.has(n) ? `\`${n}\`` : n);
  const pascal = (g) => g.split('-').map(upperFirst).join('');
  const lines = [`// ${header}`, '', 'import SwiftUI', ''];
  for (const { group, tokens } of groups) {
    assertUnique(`componente ${group}`, tokens.map((t) => t.name));
    lines.push(
      `/// Tokens del componente \`${group}\` (\`tokens/**/${group}.json\`). Un token con par \`surface-dark-*\` (o que lo hereda) es un \`Color\` dinámico.`,
      `public enum Brand${pascal(group)}Tokens {`,
    );
    for (const t of tokens) {
      const { light, dark } = t;
      const doc = docLine(t);
      let type;
      let literal;
      switch (light.kind) {
        case 'color':
          type = 'Color';
          literal = dark
            ? `Color(brandLight: ${swiftColor(light.color)}, dark: ${swiftColor(dark.color)})`
            : swiftColor(light.color);
          break;
        case 'points':
          // Una medida con par oscuro (el subrayado de `Link`, que en oscuro desaparece en reposo) no puede ser un
          // número suelto: sale como `BrandSchemeValue`, que el componente resuelve con su `colorScheme`.
          type = dark ? 'BrandSchemeValue<CGFloat>' : 'CGFloat';
          literal = dark ? `BrandSchemeValue(light: ${trimNum(light.points)}, dark: ${trimNum(dark.points)})` : trimNum(light.points);
          break;
        case 'em': type = 'CGFloat'; literal = trimNum(light.number); break;
        case 'weight': type = 'Int'; literal = trimNum(light.number); break;
        case 'duration': type = 'TimeInterval'; literal = trimNum(light.seconds); break;
        case 'easing':
          type = 'BrandCubicBezier';
          literal = light.bezier ? `BrandCubicBezier(${light.bezier.map(trimNum).join(', ')})` : 'BrandCubicBezier.linear';
          break;
        case 'family': type = 'String'; literal = JSON.stringify(light.family); break;
        case 'shadow':
          type = 'BrandShadow';
          literal = light.shadow
            ? `BrandShadow(x: ${trimNum(light.shadow.x)}, y: ${trimNum(light.shadow.y)}, blur: ${trimNum(light.shadow.blur)}, color: ${swiftColor(light.shadow.color)})`
            : 'BrandShadow.none';
          break;
        default: throw new Error(`Tipo nativo desconocido: ${light.kind}`);
      }
      const unitNote = light.kind === 'em' ? ' Fracción del tamaño de fuente del propio componente (em).' : '';
      lines.push(`    /// ${doc}${unitNote}`, `    public static let ${sw(t.name)}: ${type} = ${literal}`);
    }
    lines.push('}', '');
  }
  return lines.join('\n').replace(/\n+$/, '\n');
}


function kotlinComponentSource(groups, header) {
  const kt = (n) => (KOTLIN_KEYWORDS.has(n) ? `\`${n}\`` : n);
  const pascal = (g) => g.split('-').map(upperFirst).join('');
  const lines = [];
  const body = [];
  const used = new Set(['Color']);
  for (const { group, tokens } of groups) {
    assertUnique(`componente ${group}`, tokens.map((t) => t.name));
    body.push(
      `/** Tokens del componente \`${group}\` (\`tokens/**/${group}.json\`). Todo color es un [BrandSchemeValue]: se resuelve con \`.current\` (los que no tienen par oscuro valen lo mismo en los dos esquemas). */`,
      `object Brand${pascal(group)}Tokens {`,
    );
    for (const t of tokens) {
      const { light, dark } = t;
      const last = t.token.split('.').pop();
      const doc = docLine(t);
      let type;
      let literal;
      switch (light.kind) {
        case 'color':
          used.add('Color');
          type = 'BrandSchemeValue<Color>';
          literal = `BrandSchemeValue(${kotlinColor(light.color)}, ${kotlinColor((dark ?? light).color)})`;
          break;
        case 'points': {
          const isFont = /(^|-)font-size(-|$)/.test(last);
          const unit = isFont ? 'sp' : 'dp';
          used.add(unit);
          if (light.unitless) {
            type = 'Float';
            literal = `${trimNum(light.points)}f`;
          } else if (dark) {
            type = isFont ? 'BrandSchemeValue<TextUnit>' : 'BrandSchemeValue<Dp>';
            if (isFont) used.add('TextUnit'); else used.add('Dp');
            literal = `BrandSchemeValue(${trimNum(light.points)}.${unit}, ${trimNum(dark.points)}.${unit})`;
          } else {
            type = isFont ? 'TextUnit' : 'Dp';
            used.add(isFont ? 'TextUnit' : 'Dp');
            literal = `${trimNum(light.points)}.${unit}`;
          }
          break;
        }
        case 'em': type = 'Float'; literal = `${trimNum(light.number)}f`; break;
        case 'weight': used.add('FontWeight'); type = 'FontWeight'; literal = `FontWeight(${trimNum(light.number)})`; break;
        case 'duration': type = 'Int'; literal = trimNum(light.seconds * 1000); break;
        case 'easing':
          used.add('Easing');
          type = 'Easing';
          if (light.bezier) { used.add('CubicBezierEasing'); literal = `CubicBezierEasing(${light.bezier.map((n) => `${trimNum(n)}f`).join(', ')})`; } else { used.add('LinearEasing'); literal = 'LinearEasing'; }
          break;
        case 'family': type = 'String'; literal = JSON.stringify(light.family); break;
        case 'shadow':
          used.add('Dp');
          type = 'BrandShadow';
          used.add('dp');
          literal = light.shadow
            ? `BrandShadow(${trimNum(light.shadow.x)}.dp, ${trimNum(light.shadow.y)}.dp, ${trimNum(light.shadow.blur)}.dp, ${kotlinColor(light.shadow.color)})`
            : 'BrandShadow.None';
          break;
        default: throw new Error(`Tipo nativo desconocido: ${light.kind}`);
      }
      const unitNote = light.kind === 'em' ? ' Fracción del tamaño de fuente del propio componente (em).' : light.kind === 'duration' ? ' En milisegundos.' : light.unitless ? ' Factor sin unidad.' : '';
      body.push(`    /** ${doc}${unitNote} */`, `    val ${kt(t.name)}: ${type} = ${literal}`);
    }
    body.push('}', '');
  }
  const imports = {
    Color: 'androidx.compose.ui.graphics.Color',
    Dp: 'androidx.compose.ui.unit.Dp',
    dp: 'androidx.compose.ui.unit.dp',
    sp: 'androidx.compose.ui.unit.sp',
    TextUnit: 'androidx.compose.ui.unit.TextUnit',
    FontWeight: 'androidx.compose.ui.text.font.FontWeight',
    Easing: 'androidx.compose.animation.core.Easing',
    CubicBezierEasing: 'androidx.compose.animation.core.CubicBezierEasing',
    LinearEasing: 'androidx.compose.animation.core.LinearEasing',
  };
  const used2 = [...used].map((k) => imports[k]).sort();
  lines.push(`// ${header}`, '', 'package com.studiolxd.brand.tokens', '', ...used2.map((i) => `import ${i}`), '', ...body);
  return lines.join('\n').replace(/\n+$/, '\n');
}

/**
 * Registra los formatos `swift/brand-tokens` y `kotlin/brand-tokens`: un único
 * fichero por plataforma con todos los tokens globales (ver
 * `NATIVE_GLOBAL_GROUPS`). El único sitio donde se decide qué sale y cómo se
 * llama es `buildNativeModel`.
 */
export function registerNativeFormats(StyleDictionary) {
  const render = (emit) => async ({ dictionary }) => {
    const model = buildNativeModel(dictionary.allTokens);
    checkModel(model);
    const header = 'Do not edit directly, this file was auto-generated by Style Dictionary (sd.config.mjs). Run `pnpm build:tokens`.';
    return emit(model, header);
  };
  StyleDictionary.registerFormat({ name: 'swift/brand-tokens', format: render(swiftSource) });
  StyleDictionary.registerFormat({ name: 'kotlin/brand-tokens', format: render(kotlinSource) });
  StyleDictionary.registerFormat({
    name: 'swift/brand-component-tokens',
    format: async ({ dictionary }) => {
      const header = 'Do not edit directly, this file was auto-generated by Style Dictionary (sd.config.mjs). Run `pnpm build:tokens`.';
      return swiftComponentSource(buildComponentModel(dictionary), header);
    },
  });
  StyleDictionary.registerFormat({
    name: 'kotlin/brand-component-tokens',
    format: async ({ dictionary }) => {
      const header = 'Do not edit directly, this file was auto-generated by Style Dictionary (sd.config.mjs). Run `pnpm build:tokens`.';
      return kotlinComponentSource(buildComponentModel(dictionary), header);
    },
  });
}
