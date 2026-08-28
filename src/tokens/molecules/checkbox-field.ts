import checkboxField from '../../../tokens/molecule/checkbox-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(checkboxField as never);

export const checkboxFieldErrorTokens  = all.filter(t => t.name.startsWith('--checkbox-field-error-') || t.name.startsWith('--checkbox-field-surface-dark-error-'));
export const checkboxFieldHelperTokens = all.filter(t => t.name.startsWith('--checkbox-field-helper-'));
export const checkboxFieldLabelTokens  = all.filter(t => t.name.includes('-label-'));
export const checkboxFieldBaseTokens   = all.filter(t => !t.name.startsWith('--checkbox-field-error-') && !t.name.startsWith('--checkbox-field-helper-') && !t.name.includes('-label-'));
