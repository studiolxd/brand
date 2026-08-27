import chatShell from '../../../tokens/organism/chat-shell.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(chatShell as never);

export const chatShellTokens     = all.filter(t => !t.name.includes('surface-dark'));
export const chatShellDarkTokens = all.filter(t => t.name.includes('surface-dark'));
