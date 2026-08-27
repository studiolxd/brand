/*
 * Datos de la página de Colores. TODO sale de los JSON de tokens: la página no
 * lleva un solo hex escrito a mano, así que no puede desincronizarse de la
 * fuente. (Antes duplicaba 25 hex a mano y ya mostraba un valor equivocado.)
 */
import palette from '../../tokens/color/palette.json';
import neutral from '../../tokens/color/neutral.json';
import brand from '../../tokens/color/brand.json';
import semantic from '../../tokens/color/semantic.json';
import system from '../../tokens/color/system.json';
import feedback from '../../tokens/color/feedback.json';
import tag from '../../tokens/component/tag.json';
import { flattenTokens, resolveRef } from './utils';

type TokenEntry = { $value: string; $type: string; $description: string };
type Group = Record<string, TokenEntry>;

/* ---- Mapa de resolución: todas las capas de color ------------------------ */
const entries = (group: Group, prefix: string) =>
  Object.fromEntries(Object.entries(group).map(([k, v]) => [`${prefix}.${k}`, v.$value]));

const refMap: Record<string, string> = {
  ...entries(palette.color as Group, 'color'),
  ...entries(neutral.color as Group, 'color'),
  ...entries(system.color as Group, 'color'),
  ...entries(feedback.color as Group, 'color'),
  ...entries(brand.color as Group, 'color'),
  ...entries(semantic.color.text as Group, 'color.text'),
  ...entries(semantic.color.background as Group, 'color.background'),
  ...entries(semantic.color.surface as Group, 'color.surface'),
};

const hex = (value: string) => resolveRef(value, refMap);

/* ---- Tablas de tokens ---------------------------------------------------- */
export const paletteTokens  = flattenTokens(palette as never);
export const neutralTokens  = flattenTokens(neutral as never);
export const brandTokens    = flattenTokens(brand as never);
export const systemTokens   = flattenTokens(system as never);
export const feedbackTokens = flattenTokens(feedback as never);
export const semanticTokens = flattenTokens(semantic as never);

/* ---- Muestras para <ColorPalette> ---------------------------------------- */
export interface Swatch {
  title: string;
  subtitle: string;
  colors: Record<string, string>;
}

const p = palette.color as Group;
const n = neutral.color as Group;
const b = brand.color as Group;
const sys = system.color as Group;
const fb = feedback.color as Group;
const txt = semantic.color.text as Group;
const bg = semantic.color.background as Group;
const surf = semantic.color.surface as Group;

const swatch = (title: string, subtitle: string, tokens: string[], group: Group, prefix = '--color-'): Swatch => ({
  title,
  subtitle,
  colors: Object.fromEntries(tokens.map((t) => [`${prefix}${t}`, hex(group[t].$value)])),
});

const PALETTE_ES: Record<string, string> = {
  prussian: 'Prusia', lavender: 'Lavanda', yellow: 'Amarillo', emerald: 'Esmeralda', cayenne: 'Cayena',
};

const rgb = (h: string) => {
  const v = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)).join(', ');
};

export const paletteSwatches: Swatch[] = Object.keys(p).map((k) =>
  swatch(PALETTE_ES[k] ?? k, `RGB ${rgb(p[k].$value)}`, [k], p),
);

export const brandSwatches: Swatch[] = [
  swatch('Primario', '~50% de uso', ['primary'], b),
  swatch('Acento 1', '~20% de uso', ['accent-1'], b),
  swatch('Acento 2', '~20% de uso', ['accent-2'], b),
  swatch('Soporte 1', '~5% de uso', ['support-1'], b),
  swatch('Soporte 2', '~5% de uso', ['support-2'], b),
];

export const neutralSwatches: Swatch[] = [
  swatch('Blanco', 'Fondo claro', ['white'], n),
  swatch('Gris', 'lightest · light · dark · darkest', ['grey-lightest', 'grey-light', 'grey-dark', 'grey-darkest'], n),
  swatch('Negro', 'Solo para usos puntuales', ['black'], n),
];

export const systemSwatches: Swatch[] = [
  swatch('Rojo', 'base · light', ['red', 'red-light'], sys),
  swatch('Verde', 'base · light', ['green', 'green-light'], sys),
];

const role = (name: string, label: string): Swatch[] => [
  swatch(`${label} — texto`, `${name}-text-on-light · ${name}-text-on-dark`, [`${name}-text-on-light`, `${name}-text-on-dark`], fb),
  swatch(`${label} — relleno`, `${name}-fill · ${name}-fill-text`, [`${name}-fill`, `${name}-fill-text`], fb),
];
export const feedbackSwatches: Swatch[] = [
  ...role('error', 'Error'),
  ...role('success', 'Éxito'),
  ...role('destructive', 'Destructivo'),
];

export const semanticSwatches: Swatch[] = [
  swatch('Texto', 'on-light · on-dark', ['on-light', 'on-dark'], txt, '--color-text-'),
  swatch('Texto atenuado', 'muted-on-light · muted-on-dark', ['muted-on-light', 'muted-on-dark'], txt, '--color-text-'),
  swatch('Placeholder', 'placeholder-on-light · placeholder-on-dark', ['placeholder-on-light', 'placeholder-on-dark'], txt, '--color-text-'),
  swatch('Fondo', 'light · dark', ['light', 'dark'], bg, '--color-background-'),
  swatch('Superficie secundaria', 'secondary-on-light · secondary-on-dark', ['secondary-on-light', 'secondary-on-dark'], surf, '--color-surface-'),
  swatch('Superficie invertida', 'inverse-on-light · inverse-on-dark', ['inverse-on-light', 'inverse-on-dark'], surf, '--color-surface-'),
];

/* ---- Contraste ------------------------------------------------------------ */
export interface NamedColor { name: string; token: string; hex: string }

export const surfaces: NamedColor[] = [
  { name: 'Blanco', token: '--color-background-light', hex: hex(bg.light.$value) },
  { name: 'Prusia', token: '--color-background-dark', hex: hex(bg.dark.$value) },
];

/** Todo color que pueda acabar como tinta (texto, icono, borde) sobre una superficie. */
export const inks: NamedColor[] = [
  ...Object.keys(p).filter((k) => k !== 'prussian').map((k) => ({ name: PALETTE_ES[k] ?? k, token: `--color-${k}`, hex: hex(p[k].$value) })),
  { name: 'Texto', token: '--color-text-on-light', hex: hex(txt['on-light'].$value) },
  { name: 'Texto (oscuro)', token: '--color-text-on-dark', hex: hex(txt['on-dark'].$value) },
  { name: 'Texto atenuado', token: '--color-text-muted-on-light', hex: hex(txt['muted-on-light'].$value) },
  { name: 'Texto atenuado (oscuro)', token: '--color-text-muted-on-dark', hex: hex(txt['muted-on-dark'].$value) },
  { name: 'Placeholder', token: '--color-text-placeholder-on-light', hex: hex(txt['placeholder-on-light'].$value) },
  { name: 'Placeholder (oscuro)', token: '--color-text-placeholder-on-dark', hex: hex(txt['placeholder-on-dark'].$value) },
  { name: 'Error — texto', token: '--color-error-text-on-light', hex: hex(fb['error-text-on-light'].$value) },
  { name: 'Error — texto (oscuro)', token: '--color-error-text-on-dark', hex: hex(fb['error-text-on-dark'].$value) },
  { name: 'Éxito — texto', token: '--color-success-text-on-light', hex: hex(fb['success-text-on-light'].$value) },
  { name: 'Éxito — texto (oscuro)', token: '--color-success-text-on-dark', hex: hex(fb['success-text-on-dark'].$value) },
];

/** Los rellenos de marca y feedback, con la tinta que llevan encima. */
export const fills: { name: string; fill: NamedColor; ink: NamedColor }[] = [
  ...(['accent-1', 'accent-2', 'support-1', 'support-2'] as const).map((k) => ({
    name: brandSwatches.find((s) => Object.keys(s.colors)[0] === `--color-${k}`)?.title ?? k,
    fill: { name: k, token: `--color-${k}`, hex: hex(b[k].$value) },
    ink: { name: 'Texto', token: '--color-text-on-light', hex: hex(txt['on-light'].$value) },
  })),
  { name: 'Primario', fill: { name: 'primary', token: '--color-primary', hex: hex(b.primary.$value) }, ink: { name: 'Texto (oscuro)', token: '--color-text-on-dark', hex: hex(txt['on-dark'].$value) } },
  { name: 'Error — relleno', fill: { name: 'error-fill', token: '--color-error-fill', hex: hex(fb['error-fill'].$value) }, ink: { name: 'error-fill-text', token: '--color-error-fill-text', hex: hex(fb['error-fill-text'].$value) } },
  { name: 'Éxito — relleno', fill: { name: 'success-fill', token: '--color-success-fill', hex: hex(fb['success-fill'].$value) }, ink: { name: 'success-fill-text', token: '--color-success-fill-text', hex: hex(fb['success-fill-text'].$value) } },
];

/* ---- Tag: lo consume la doc del componente, no la de fundamentos --------- */
const t = tag.tag as Group;
const tagPair = (variant: string, label: string) => ({
  label,
  ink: hex(t[`${variant}-color`].$value),
  bg: { name: `${label} — fondo`, token: `--tag-${variant}-bg`, hex: hex(t[`${variant}-bg`].$value) },
});
export const tagPairs = [
  tagPair('info', 'Info'), tagPair('warning', 'Aviso'), tagPair('success', 'Éxito'),
  tagPair('danger', 'Peligro'), tagPair('neutral', 'Neutral'),
  tagPair('support-1', 'Soporte 1'), tagPair('support-2', 'Soporte 2'),
];

export const logoTokens = semanticTokens.filter((tk) => tk.name.startsWith('--color-text'));
