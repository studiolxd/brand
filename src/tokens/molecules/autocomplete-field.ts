import tokens from '../../../tokens/molecule/autocomplete-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const autocompleteFieldBaseTokens   = all.filter(t => t.name === '--autocomplete-field-gap');
export const autocompleteFieldErrorTokens  = all.filter(t => t.name.startsWith('--autocomplete-field-error-'));
export const autocompleteFieldHelperTokens = all.filter(t => t.name.startsWith('--autocomplete-field-helper-'));
