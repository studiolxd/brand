import collapsible from '../../../tokens/component/collapsible.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(collapsible as never);

export const collapsibleTokens     = all.filter(t => !t.name.startsWith('--collapsible-surface-dark-'));
export const collapsibleDarkTokens = all.filter(t => t.name.startsWith('--collapsible-surface-dark-'));
