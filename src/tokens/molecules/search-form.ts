import searchForm from '../../../tokens/molecule/search-form.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(searchForm as never);

export const searchFormBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const searchFormDarkTokens = all.filter(t => t.name.includes('surface-dark'));
