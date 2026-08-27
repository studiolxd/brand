import inputPhoneField from '../../../tokens/molecule/input-phone-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(inputPhoneField as never);

export const inputPhoneFieldBaseTokens   = all.filter(t => t.name === '--input-phone-field-gap');
export const inputPhoneFieldErrorTokens  = all.filter(t => t.name.startsWith('--input-phone-field-error-'));
export const inputPhoneFieldHelperTokens = all.filter(t => t.name.startsWith('--input-phone-field-helper-'));
