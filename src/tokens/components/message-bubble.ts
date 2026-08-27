import messageBubble from '../../../tokens/component/message-bubble.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(messageBubble as never);

export const messageBubbleTokens     = all.filter(t => !t.name.includes('tail') && !t.name.includes('surface-dark'));
export const messageBubbleTailTokens = all.filter(t => t.name.includes('tail') && !t.name.includes('surface-dark'));
export const messageBubbleDarkTokens = all.filter(t => t.name.includes('surface-dark'));
