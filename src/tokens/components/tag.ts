import tag from '../../../tokens/component/tag.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tag as never);

const VARIANT = /^--tag-(primary|accent-1|accent-2|support-1|support-2|neutral|info|warning|success|danger)-/;
const BRAND = /^--tag-(primary|accent-1|accent-2|support-1|support-2)-/;

export const tagTokens = all;

/** Caja y letra: comunes a las diez variantes. */
export const tagBaseTokens = all.filter(t => !VARIANT.test(t.name) && !t.name.startsWith('--tag-surface-dark-'));

/** Las cinco variantes de marca. */
export const tagBrandTokens = all.filter(t => BRAND.test(t.name));

/** Las cinco variantes semánticas de estado. */
export const tagSemanticTokens = all.filter(t => VARIANT.test(t.name) && !BRAND.test(t.name));

/** Los remapeos de superficie oscura (solo las variantes que colisionan con el fondo). */
export const tagDarkTokens = all.filter(t => t.name.startsWith('--tag-surface-dark-'));
