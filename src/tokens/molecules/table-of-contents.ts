import tableOfContents from '../../../tokens/molecule/table-of-contents.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tableOfContents as never);

export const tableOfContentsBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const tableOfContentsDarkTokens = all.filter(t => t.name.includes('surface-dark'));
