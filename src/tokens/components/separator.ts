import separator from '../../../tokens/component/separator.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(separator as never);

export const separatorTokens     = all.filter(t => !t.name.startsWith('--separator-spacing-') && !t.name.startsWith('--separator-surface-dark-'));
export const separatorSpacingTokens = all.filter(t => t.name.startsWith('--separator-spacing-'));
export const separatorDarkTokens = all.filter(t => t.name.startsWith('--separator-surface-dark-'));
