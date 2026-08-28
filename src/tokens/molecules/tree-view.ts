import treeView from '../../../tokens/molecule/tree-view.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(treeView as never);

export const treeViewTokens     = all.filter(t => !t.name.startsWith('--tree-view-surface-dark-'));
export const treeViewDarkTokens = all.filter(t => t.name.startsWith('--tree-view-surface-dark-'));
