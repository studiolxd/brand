import json from '../../../tokens/molecule/radio-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(json as never);

export const radioFieldErrorTokens  = all.filter(t => t.name.startsWith('--radio-field-error-') || t.name.startsWith('--radio-field-surface-dark-error-'));
export const radioFieldHelperTokens = all.filter(t => t.name.startsWith('--radio-field-helper-'));
export const radioFieldLabelTokens  = all.filter(t => t.name.includes('-label-'));
export const radioFieldBaseTokens   = all.filter(t => !t.name.startsWith('--radio-field-error-') && !t.name.startsWith('--radio-field-helper-') && !t.name.includes('-label-'));
