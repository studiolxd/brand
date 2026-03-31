import textJson from '../../../tokens/component/text.json';
import { flattenTokens, type Token } from '../utils';

const all = flattenTokens(textJson as never);

export const headingBaseTokens = all.filter(t => t.name.startsWith('--text-heading-'));

export const headingLevelTokens = all.filter(t => /^--text-h[1-6]-/.test(t.name));

export const headingDarkTokens: Token[] = [
  { name: '--text-heading-dark-color', value: 'var(--color-text-dark)', description: 'Color del texto sobre fondo oscuro' },
];

export const paragraphBaseTokens = all.filter(t =>
  t.name.startsWith('--text-paragraph-') &&
  !t.name.startsWith('--text-paragraph-small-') &&
  !t.name.startsWith('--text-paragraph-large-'),
);

export const paragraphSizeTokens = all.filter(t =>
  t.name.startsWith('--text-paragraph-small-') ||
  t.name.startsWith('--text-paragraph-large-'),
);

export const paragraphDarkTokens: Token[] = [
  { name: '--text-paragraph-dark-color', value: 'var(--color-text-dark)', description: 'Color del texto sobre fondo oscuro' },
];

export const listBaseTokens = all.filter(t => t.name.startsWith('--text-list-'));

export const listDarkTokens: Token[] = [
  { name: '--text-list-dark-color', value: 'var(--color-text-dark)', description: 'Color del texto sobre fondo oscuro' },
];
