import popover from '../../../tokens/component/popover.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(popover as never);

export const popoverTokens     = all.filter(t => !t.name.startsWith('--popover-surface-dark-'));
export const popoverDarkTokens = all.filter(t => t.name.startsWith('--popover-surface-dark-'));
