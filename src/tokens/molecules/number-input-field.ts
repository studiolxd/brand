import numberInputFieldJson from '../../../tokens/molecule/number-input-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(numberInputFieldJson as never);

export const numberInputFieldBaseTokens   = all.filter(t => t.name === '--number-input-field-gap');
export const numberInputFieldErrorTokens  = all.filter(t => t.name.startsWith('--number-input-field-error-'));
export const numberInputFieldHelperTokens = all.filter(t => t.name.startsWith('--number-input-field-helper-'));
