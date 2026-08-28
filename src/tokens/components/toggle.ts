import toggle from '../../../tokens/component/toggle.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(toggle as never);

export const toggleTokens     = all.filter(t => !t.name.startsWith('--toggle-surface-dark-'));
export const toggleDarkTokens = all.filter(t => t.name.startsWith('--toggle-surface-dark-'));
