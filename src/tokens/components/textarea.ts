import textarea from '../../../tokens/component/textarea.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(textarea as never);
const notBare = all.filter(t => !t.name.startsWith('--textarea-bare-'));

export const textareaBaseTokens     = notBare.filter(t => !t.name.match(/--textarea-(focus|error|disabled|dark|sm|lg)/));
export const textareaFocusTokens    = notBare.filter(t => t.name.includes('focus') && !t.name.includes('dark'));
export const textareaErrorTokens    = notBare.filter(t => t.name.includes('error') && !t.name.includes('dark'));
export const textareaDisabledTokens = notBare.filter(t => t.name.includes('disabled'));
export const textareaDarkTokens     = notBare.filter(t => t.name.includes('dark'));
export const textareaSizeTokens     = notBare.filter(t => t.name.match(/--textarea-(sm|lg)-/));
export const textareaBareTokens     = all.filter(t => t.name.startsWith('--textarea-bare-'));
