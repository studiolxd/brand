import tabs from '../../../tokens/component/tabs.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tabs as never);

export const tabsTokens     = all.filter(t => !t.name.startsWith('--tabs-surface-dark-'));
export const tabsDarkTokens = all.filter(t => t.name.startsWith('--tabs-surface-dark-'));
