import conversationList from '../../../tokens/molecule/conversation-list.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(conversationList as never);
const claros = all.filter(t => !t.name.includes('surface-dark'));

export const conversationListTokens       = claros.filter(t => !t.name.includes('delete') && !t.name.includes('focus'));
export const conversationListDeleteTokens = claros.filter(t => t.name.includes('delete'));
export const conversationListFocusTokens  = claros.filter(t => t.name.includes('focus'));
export const conversationListDarkTokens   = all.filter(t => t.name.includes('surface-dark'));
