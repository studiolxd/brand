import heatmap from '../../../tokens/molecule/heatmap.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(heatmap as never);

export const heatmapBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const heatmapDarkTokens = all.filter(t => t.name.includes('surface-dark'));
