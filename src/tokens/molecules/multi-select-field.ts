import tokens from '../../../tokens/molecule/multi-select-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const multiSelectFieldBaseTokens   = all.filter(t => !t.name.startsWith('--multi-select-field-error-') && !t.name.startsWith('--multi-select-field-helper-'));
export const multiSelectFieldErrorTokens  = all.filter(t => t.name.startsWith('--multi-select-field-error-'));
export const multiSelectFieldHelperTokens = all.filter(t => t.name.startsWith('--multi-select-field-helper-'));
