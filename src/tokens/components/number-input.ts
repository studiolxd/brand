import numberInput from '../../../tokens/component/number-input.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(numberInput as never);

export const numberInputBaseTokens     = all.filter(t => !t.name.match(/--number-input-(focus|error|disabled|sm|lg|btn-hover|btn-separator|disabled)/));
export const numberInputBtnTokens      = all.filter(t => t.name.includes('btn'));
export const numberInputFocusTokens    = all.filter(t => t.name.includes('focus'));
export const numberInputErrorTokens    = all.filter(t => t.name.includes('error'));
export const numberInputDisabledTokens = all.filter(t => t.name.includes('disabled'));
export const numberInputSizeTokens     = all.filter(t => t.name.match(/--number-input-(sm|lg)-/));
