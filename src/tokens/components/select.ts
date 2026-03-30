import select from '../../../tokens/component/select.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(select as never);

export const selectTriggerTokens  = all.filter(t => !t.name.match(/--select-(content|item|focus)/));
export const selectFocusTokens    = all.filter(t => t.name.includes('focus'));
export const selectDropdownTokens = all.filter(t => t.name.match(/--select-(content|item)/));
