import palette from '../../tokens/color/palette.json';
import neutral from '../../tokens/color/neutral.json';
import brand from '../../tokens/color/brand.json';
import semantic from '../../tokens/color/semantic.json';
import system from '../../tokens/color/system.json';
import feedback from '../../tokens/color/feedback.json';
import { flattenTokens, resolveRef } from './utils';

type TokenEntry = { $value: string; $type: string; $description: string };
const p = palette.color as Record<string, TokenEntry>;

export const paletteColors = Object.entries(p).map(([name, token]) => ({
  name: name.charAt(0).toUpperCase() + name.slice(1),
  token: `--color-${name}`,
  hex: token.$value,
}));

export const systemColors = Object.entries(system.color as Record<string, TokenEntry>).map(([name, token]) => ({
  name: name.charAt(0).toUpperCase() + name.slice(1),
  token: `--color-${name}`,
  hex: token.$value,
}));

export const paletteTokens   = flattenTokens(palette as never);
export const neutralTokens   = flattenTokens(neutral as never);
export const brandTokens     = flattenTokens(brand as never);
export const feedbackTokens  = flattenTokens(feedback as never);
export const semanticTokens  = flattenTokens(semantic as never);
export const systemTokens    = flattenTokens(system as never);

// Flat key→value map for resolving DTCG references
const refMap: Record<string, string> = {
  ...Object.fromEntries(Object.entries(palette.color).map(([k, v]) => [`color.${k}`, (v as TokenEntry).$value])),
  ...Object.fromEntries(Object.entries(neutral.color).map(([k, v]) => [`color.${k}`, (v as TokenEntry).$value])),
  ...Object.fromEntries(Object.entries(system.color).map(([k, v]) => [`color.${k}`, (v as TokenEntry).$value])),
};


export const textDefault        = resolveRef(semantic.color.text.default.$value, refMap);
export const textDark           = resolveRef(semantic.color.text.dark.$value, refMap);
export const textMuted          = resolveRef(semantic.color.text.muted.$value, refMap);
export const textMutedDark      = resolveRef(semantic.color.text['muted-dark'].$value, refMap);
export const errorColor          = resolveRef(feedback.color.error.$value, refMap);
export const successColor        = resolveRef(feedback.color.success.$value, refMap);
export const errorDarkColor      = resolveRef(feedback.color['error-dark'].$value, refMap);
export const successDarkColor    = resolveRef(feedback.color['success-dark'].$value, refMap);

export const backgroundColors = [
  { name: 'Background default', token: '--color-background-default', hex: resolveRef(semantic.color.background.default.$value, refMap) },
  { name: 'Background dark',    token: '--color-background-dark',    hex: resolveRef(semantic.color.background.dark.$value, refMap) },
];

export const brandColors = Object.entries(brand.color as Record<string, TokenEntry>).map(([name, token]) => ({
  name: name.charAt(0).toUpperCase() + name.slice(1),
  token: `--color-${name}`,
  hex: resolveRef(token.$value, refMap),
}));

export const feedbackColors = Object.entries(feedback.color as Record<string, TokenEntry>).map(([name, token]) => ({
  name: name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c: string) => ` ${c.toUpperCase()}`),
  token: `--color-${name}`,
  hex: resolveRef(token.$value, refMap),
}));

export const logoTokens = semanticTokens.filter(t => t.name.startsWith('--color-text'));
