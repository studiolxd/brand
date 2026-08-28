import docsSearch from '../../../tokens/molecule/docs-search.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(docsSearch as never);

export const docsSearchBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const docsSearchDarkTokens = all.filter(t => t.name.includes('surface-dark'));
