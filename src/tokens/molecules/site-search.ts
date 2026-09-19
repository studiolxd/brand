import siteSearch from '../../../tokens/organism/site-search.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(siteSearch as never);

export const siteSearchBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const siteSearchDarkTokens = all.filter(t => t.name.includes('surface-dark'));
