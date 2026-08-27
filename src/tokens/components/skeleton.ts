import skeleton from '../../../tokens/component/skeleton.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(skeleton as never);

export const skeletonTokens     = all.filter(t => !t.name.startsWith('--skeleton-surface-dark-'));
export const skeletonDarkTokens = all.filter(t => t.name.startsWith('--skeleton-surface-dark-'));
