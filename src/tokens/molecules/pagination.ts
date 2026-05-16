import pagination from '../../../tokens/component/pagination.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(pagination as never);

export const paginationLayoutTokens  = all.filter(t => !t.name.match(/btn|ellipsis|focus/));
export const paginationButtonTokens  = all.filter(t => t.name.match(/--pagination-btn/));
export const paginationFocusTokens   = all.filter(t => t.name.match(/focus/));
export const paginationEllipsisTokens = all.filter(t => t.name.match(/ellipsis/));
