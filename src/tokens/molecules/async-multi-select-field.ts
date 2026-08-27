import tokens from '../../../tokens/molecule/async-multi-select-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const asyncMultiSelectFieldBaseTokens   = all.filter(t => t.name === '--async-multi-select-field-gap');
export const asyncMultiSelectFieldErrorTokens  = all.filter(t => t.name.startsWith('--async-multi-select-field-error-'));
export const asyncMultiSelectFieldHelperTokens = all.filter(t => t.name.startsWith('--async-multi-select-field-helper-'));
