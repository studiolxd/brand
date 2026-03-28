import textarea from '../../../tokens/component/textarea.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(textarea as never);

export const textareaBaseTokens     = all.filter(t => !t.name.match(/--textarea-(focus|error|disabled|dark)/));
export const textareaFocusTokens    = all.filter(t => t.name.includes('focus') && !t.name.includes('dark'));
export const textareaErrorTokens    = all.filter(t => t.name.includes('error') && !t.name.includes('dark'));
export const textareaDisabledTokens = all.filter(t => t.name.includes('disabled'));
export const textareaDarkTokens     = all.filter(t => t.name.includes('dark'));
