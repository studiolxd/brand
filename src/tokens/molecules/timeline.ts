import timeline from '../../../tokens/molecule/timeline.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(timeline as never);

export const timelineBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const timelineDarkTokens = all.filter(t => t.name.includes('surface-dark'));
