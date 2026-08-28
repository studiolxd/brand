import radio from '../../../tokens/component/radio.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(radio as never);

const light = all.filter(t => !t.name.startsWith('--radio-surface-dark-'));

export const radioBaseTokens     = light.filter(t => !t.name.match(/--radio-(focus|disabled)/));
export const radioFocusTokens    = light.filter(t => t.name.includes('focus'));
export const radioDisabledTokens = light.filter(t => t.name.includes('disabled'));
export const radioDarkTokens     = all.filter(t => t.name.startsWith('--radio-surface-dark-'));
