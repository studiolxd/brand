import orgChart from '../../../tokens/organism/org-chart.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(orgChart as never);

export const orgChartBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const orgChartDarkTokens = all.filter(t => t.name.includes('surface-dark'));
