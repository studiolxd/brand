import tokens from '../../../tokens/component/autocomplete.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const autocompleteFaceTokens = all.filter(t => !t.name.startsWith('--autocomplete-surface-dark-'));
export const autocompleteDarkTokens = all.filter(t => t.name.startsWith('--autocomplete-surface-dark-'));
