import figure from '../../../tokens/component/figure.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(figure as never);

export const figureTokens     = all.filter(t => !t.name.startsWith('--figure-surface-dark-'));
export const figureDarkTokens = all.filter(t => t.name.startsWith('--figure-surface-dark-'));
