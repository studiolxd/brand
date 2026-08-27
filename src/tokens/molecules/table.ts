import table from '../../../tokens/component/table.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(table as never);

const light = all.filter(t => !t.name.startsWith('--table-surface-dark-'));

export const tableBaseTokens   = light.filter(t => !t.name.match(/--table-(header|sort-icon|cell|row|footer|focus|sm)-/));
export const tableHeaderTokens = light.filter(t => t.name.match(/--table-(header|sort-icon)-/));
export const tableRowTokens    = light.filter(t => t.name.match(/--table-(cell|row)-/));
export const tableFooterTokens = light.filter(t => t.name.startsWith('--table-footer-'));
export const tableFocusTokens  = light.filter(t => t.name.startsWith('--table-focus-'));
export const tableSmTokens     = light.filter(t => t.name.startsWith('--table-sm-'));
export const tableDarkTokens   = all.filter(t => t.name.startsWith('--table-surface-dark-'));
