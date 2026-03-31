import inputFieldJson from '../../../tokens/molecule/input-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(inputFieldJson as never);

export const inputFieldBaseTokens = all.filter(t => t.name === '--input-field-gap');

export const inputFieldErrorTokens = all.filter(t => t.name.startsWith('--input-field-error-'));

export const inputFieldHelperTokens = all.filter(t => t.name.startsWith('--input-field-helper-'));
