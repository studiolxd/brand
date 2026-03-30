import input from '../../../tokens/component/input.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(input as never);

export const inputBaseTokens     = all.filter(t => !t.name.match(/--input-(focus|error|disabled|dark|sm|lg)/));
export const inputFocusTokens    = all.filter(t => t.name.includes('focus') && !t.name.includes('dark'));
export const inputErrorTokens    = all.filter(t => t.name.includes('error') && !t.name.includes('dark'));
export const inputDisabledTokens = all.filter(t => t.name.includes('disabled'));
export const inputDarkTokens     = all.filter(t => t.name.includes('dark'));
export const inputSizeTokens     = all.filter(t => t.name.match(/--input-(sm|lg)-/));
