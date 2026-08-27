import tokens from '../../../tokens/molecule/date-picker-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const datePickerFieldBaseTokens   = all.filter(t => !t.name.startsWith('--date-picker-field-error-') && !t.name.startsWith('--date-picker-field-helper-'));
export const datePickerFieldErrorTokens  = all.filter(t => t.name.startsWith('--date-picker-field-error-'));
export const datePickerFieldHelperTokens = all.filter(t => t.name.startsWith('--date-picker-field-helper-'));
