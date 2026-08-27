import json from '../../../tokens/molecule/switcher-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(json as never);

export const switcherFieldErrorTokens  = all.filter(t => t.name.startsWith('--switcher-field-error-') || t.name.startsWith('--switcher-field-surface-dark-error-'));
export const switcherFieldHelperTokens = all.filter(t => t.name.startsWith('--switcher-field-helper-'));
export const switcherFieldLabelTokens  = all.filter(t => t.name.includes('-label-'));
export const switcherFieldBaseTokens   = all.filter(t => !t.name.startsWith('--switcher-field-error-') && !t.name.startsWith('--switcher-field-helper-') && !t.name.includes('-label-'));
