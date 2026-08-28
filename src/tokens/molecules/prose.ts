import prose from '../../../tokens/molecule/prose.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(prose as never);

export const proseBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const proseDarkTokens = all.filter(t => t.name.includes('surface-dark'));
