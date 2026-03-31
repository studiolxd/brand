import linkJson from '../../../tokens/component/link.json';
import { flattenTokens, type Token } from '../utils';

const all = flattenTokens(linkJson as never);

export const linkBaseTokens = all;

export const linkDarkTokens: Token[] = [
  { name: '--link-dark-color', value: 'var(--color-text-dark)', description: 'Color sobre fondo oscuro' },
];
