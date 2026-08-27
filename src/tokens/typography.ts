/*
 * Datos de la página de Tipografía. Todo sale de los JSON de tokens.
 */
import family from '../../tokens/typography/family.json';
import size from '../../tokens/typography/size.json';
import weight from '../../tokens/typography/weight.json';
import lineHeight from '../../tokens/typography/line-height.json';
import letterSpacing from '../../tokens/typography/letter-spacing.json';
import content from '../../tokens/size/content.json';
import text from '../../tokens/component/text.json';
import { flattenTokens, resolveRef } from './utils';

type TokenEntry = { $value: string; $type: string; $description?: string };
type Group = Record<string, TokenEntry>;

export const familyTokens = flattenTokens(family as never);
export const sizeTokens = flattenTokens(size as never);
export const lineHeightTokens = flattenTokens(lineHeight as never);
export const letterSpacingTokens = flattenTokens(letterSpacing as never);
export const measureTokens = flattenTokens(content as never);

/* ---- Pesos: la escala de la fuente y los dos roles que usa el sistema ---- */
const allWeights = flattenTokens(weight as never);
export const weightRoleTokens  = allWeights.filter((t) => /--font-weight-(default|emphasis)$/.test(t.name));
export const weightScaleTokens = allWeights.filter((t) => !/--font-weight-(default|emphasis)$/.test(t.name));

/* ---- Familias ---- */
type FontExtensions = { 'studio-lxd': { intro: string; link: string } };
type FontToken = { $value: string; $description?: string; $extensions: FontExtensions };

export const fontFamilies = Object.entries(family['font-family'] as Record<string, FontToken>).map(([key, token]) => ({
  key,
  name: token.$value.split(',')[0].trim().replace(/['"]/g, ''),
  fontFamily: token.$value,
  intro: token.$extensions['studio-lxd'].intro,
  link: token.$extensions['studio-lxd'].link,
}));

/* ---- Estilos compuestos (text.json) resueltos a valores ---- */
const entries = (group: Group, prefix: string) =>
  Object.fromEntries(Object.entries(group).map(([k, v]) => [`${prefix}.${k}`, v.$value]));

const refMap: Record<string, string> = {
  ...entries(family['font-family'] as Group, 'font-family'),
  ...entries(size['font-size'] as Group, 'font-size'),
  ...entries(weight['font-weight'] as Group, 'font-weight'),
  ...entries(lineHeight['line-height'] as Group, 'line-height'),
  ...entries(letterSpacing['letter-spacing'] as Group, 'letter-spacing'),
};
// text.* se referencia a sí mismo (h1.font-family → text.heading.font-family): aplanar
const walk = (tree: Record<string, unknown>, path: string[]) => {
  for (const [k, v] of Object.entries(tree)) {
    if (v && typeof v === 'object' && '$value' in (v as object)) refMap[[...path, k].join('.')] = (v as TokenEntry).$value;
    else if (v && typeof v === 'object') walk(v as Record<string, unknown>, [...path, k]);
  }
};
walk(text as Record<string, unknown>, []);
const resolve = (ref: string) => resolveRef(ref, refMap);

export interface TextStyle {
  name: string;
  /** Prefijo de las custom properties: --text-h1-*, --text-paragraph-* … */
  cssPrefix: string;
  size: string; weight: string; lineHeight: string; letterSpacing: string;
  sizeRef: string; weightRef: string; lineHeightRef: string; letterSpacingRef: string;
}

const t = text.text as unknown as Record<string, Record<string, TokenEntry> | TokenEntry>;
const style = (name: string, path: string, node: Record<string, TokenEntry>): TextStyle => ({
  name,
  cssPrefix: path ? `--text-${path}` : '--text',
  size: resolve(node['font-size'].$value),
  weight: resolve(node['font-weight'].$value),
  lineHeight: resolve(node['line-height'].$value),
  letterSpacing: resolve(node['letter-spacing'].$value),
  sizeRef: node['font-size'].$value,
  weightRef: node['font-weight'].$value,
  lineHeightRef: node['line-height'].$value,
  letterSpacingRef: node['letter-spacing'].$value,
});

// El párrafo no tiene nodo propio: es el cuerpo del lienzo (`text.*`), y las
// variantes solo le pisan tamaño e interlineado.
const base = t as unknown as Record<string, TokenEntry>;
const para = t.paragraph as Record<string, Record<string, TokenEntry>>;
export const textStyles: TextStyle[] = [
  ...(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((h) => style(h.toUpperCase(), h, t[h] as Record<string, TokenEntry>)),
  style('Párrafo', '', base),
  style('Párrafo grande', 'paragraph-large', { ...base, ...para.large }),
  style('Párrafo pequeño', 'paragraph-small', { ...base, ...para.small }),
];
