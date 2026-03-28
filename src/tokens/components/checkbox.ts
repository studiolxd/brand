import checkbox from '../../../tokens/component/checkbox.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(checkbox as never);

export const checkboxBaseTokens     = all.filter(t => !t.name.match(/--checkbox-(focus|disabled|dark)/));
export const checkboxFocusTokens    = all.filter(t => t.name.includes('focus'));
export const checkboxDisabledTokens = all.filter(t => t.name.includes('disabled'));
export const checkboxDarkTokens     = all.filter(t => t.name.includes('dark'));
