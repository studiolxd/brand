import clockWidget from '../../../tokens/molecule/clock-widget.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(clockWidget as never);

export const clockWidgetBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const clockWidgetDarkTokens = all.filter(t => t.name.includes('surface-dark'));
