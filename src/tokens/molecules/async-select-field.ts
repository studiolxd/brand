import tokens from '../../../tokens/molecule/async-select-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const asyncSelectFieldBaseTokens   = all.filter(t => t.name === '--async-select-field-gap');
export const asyncSelectFieldErrorTokens  = all.filter(t => t.name.startsWith('--async-select-field-error-'));
export const asyncSelectFieldHelperTokens = all.filter(t => t.name.startsWith('--async-select-field-helper-'));
