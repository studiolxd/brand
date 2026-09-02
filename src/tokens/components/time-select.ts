import timeSelect from '../../../tokens/component/time-select.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(timeSelect as never);

export const timeSelectTokens     = all.filter(t => !t.name.startsWith('--time-select-surface-dark-'));
export const timeSelectDarkTokens = all.filter(t => t.name.startsWith('--time-select-surface-dark-'));
