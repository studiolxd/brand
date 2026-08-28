import textInline from '../../../tokens/component/text-inline.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(textInline as never);

export const textInlineTokens     = all.filter(t => !t.name.startsWith('--text-inline-surface-dark-'));
export const textInlineDarkTokens = all.filter(t => t.name.startsWith('--text-inline-surface-dark-'));
