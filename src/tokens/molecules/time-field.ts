import tokens from '../../../tokens/molecule/time-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const timeFieldBaseTokens   = all.filter(t => !t.name.startsWith('--time-field-error-') && !t.name.startsWith('--time-field-helper-'));
export const timeFieldErrorTokens  = all.filter(t => t.name.startsWith('--time-field-error-'));
export const timeFieldHelperTokens = all.filter(t => t.name.startsWith('--time-field-helper-'));
