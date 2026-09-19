import planningGrid from '../../../tokens/organism/planning-grid.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(planningGrid as never);

export const planningGridBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const planningGridDarkTokens = all.filter(t => t.name.includes('surface-dark'));
