import emptyState from '../../../tokens/component/empty-state.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(emptyState as never);

export const emptyStateTokens     = all.filter(t => !t.name.startsWith('--empty-state-surface-dark-'));
export const emptyStateDarkTokens = all.filter(t => t.name.startsWith('--empty-state-surface-dark-'));
