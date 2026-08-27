import assistantMessage from '../../../tokens/molecule/assistant-message.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(assistantMessage as never);

export const assistantMessageTokens     = all.filter(t => !t.name.includes('surface-dark'));
export const assistantMessageDarkTokens = all.filter(t => t.name.includes('surface-dark'));
