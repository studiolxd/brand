import userMessage from '../../../tokens/molecule/user-message.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(userMessage as never);

export const userMessageTokens     = all.filter(t => !t.name.includes('surface-dark'));
export const userMessageDarkTokens = all.filter(t => t.name.includes('surface-dark'));
