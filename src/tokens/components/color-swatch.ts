import colorSwatch from '../../../tokens/component/color-swatch.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(colorSwatch as never);

export const colorSwatchTokens     = all.filter(t => !t.name.startsWith('--color-swatch-surface-dark-'));
export const colorSwatchDarkTokens = all.filter(t => t.name.startsWith('--color-swatch-surface-dark-'));
