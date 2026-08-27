import prevNextNav from '../../../tokens/molecule/prev-next-nav.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(prevNextNav as never);

export const prevNextNavTokens     = all.filter(t => !t.name.startsWith('--prev-next-nav-surface-dark-'));
export const prevNextNavDarkTokens = all.filter(t => t.name.startsWith('--prev-next-nav-surface-dark-'));
