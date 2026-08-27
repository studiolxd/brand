import messageComposer from '../../../tokens/molecule/message-composer.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(messageComposer as never);

export const messageComposerTokens       = all.filter(t => !t.name.includes('surface-dark') && !t.name.includes('helper') && !t.name.includes('focus'));
export const messageComposerFocusTokens  = all.filter(t => !t.name.includes('surface-dark') && t.name.includes('focus'));
export const messageComposerHelperTokens = all.filter(t => !t.name.includes('surface-dark') && t.name.includes('helper'));
export const messageComposerDarkTokens   = all.filter(t => t.name.includes('surface-dark'));
