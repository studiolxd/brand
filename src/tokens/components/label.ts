import labelJson from '../../../tokens/component/label.json';
import { flattenTokens, type Token } from '../utils';

const all = flattenTokens(labelJson as never);

export const labelBaseTokens = all;

export const labelDarkTokens: Token[] = [
  { name: '--label-dark-color', value: 'var(--color-text-dark)', description: 'Color del texto sobre fondo oscuro' },
];
