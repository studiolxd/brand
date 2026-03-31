import radio from '../../../tokens/component/radio.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(radio as never);

export const radioBaseTokens     = all.filter(t => !t.name.match(/--radio-(focus|disabled)/));
export const radioFocusTokens    = all.filter(t => t.name.includes('focus'));
export const radioDisabledTokens = all.filter(t => t.name.includes('disabled'));
