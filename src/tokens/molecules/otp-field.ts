import otpField from '../../../tokens/molecule/otp-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(otpField as never);

export const otpFieldBaseTokens   = all.filter(t => t.name === '--otp-field-gap');
export const otpFieldErrorTokens  = all.filter(t => t.name.startsWith('--otp-field-error-'));
export const otpFieldHelperTokens = all.filter(t => t.name.startsWith('--otp-field-helper-'));
