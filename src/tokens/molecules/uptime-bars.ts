import uptimeBars from '../../../tokens/molecule/uptime-bars.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(uptimeBars as never);

export const uptimeBarsBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const uptimeBarsDarkTokens = all.filter(t => t.name.includes('surface-dark'));
