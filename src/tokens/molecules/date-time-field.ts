import tokens from '../../../tokens/molecule/date-time-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const dateTimeFieldBaseTokens   = all.filter(t => !t.name.startsWith('--date-time-field-error-') && !t.name.startsWith('--date-time-field-helper-'));
export const dateTimeFieldErrorTokens  = all.filter(t => t.name.startsWith('--date-time-field-error-'));
export const dateTimeFieldHelperTokens = all.filter(t => t.name.startsWith('--date-time-field-helper-'));
