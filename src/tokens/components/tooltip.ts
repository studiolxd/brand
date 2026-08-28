import tooltip from '../../../tokens/component/tooltip.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tooltip as never);

export const tooltipTokens     = all.filter(t => !t.name.startsWith('--tooltip-surface-dark-'));
export const tooltipDarkTokens = all.filter(t => t.name.startsWith('--tooltip-surface-dark-'));
