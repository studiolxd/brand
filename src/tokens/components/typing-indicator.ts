import typingIndicator from '../../../tokens/component/typing-indicator.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(typingIndicator as never);

export const typingIndicatorTokens     = all.filter(t => !t.name.startsWith('--typing-indicator-surface-dark-'));
export const typingIndicatorDarkTokens = all.filter(t => t.name.startsWith('--typing-indicator-surface-dark-'));
