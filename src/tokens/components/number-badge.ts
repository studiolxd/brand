import numberBadge from '../../../tokens/component/number-badge.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(numberBadge as never);

export const numberBadgeTokens     = all.filter(t => !t.name.startsWith('--number-badge-surface-dark-'));
export const numberBadgeDarkTokens = all.filter(t => t.name.startsWith('--number-badge-surface-dark-'));
