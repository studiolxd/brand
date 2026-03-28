import checkboxField from '../../../tokens/molecule/checkbox-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(checkboxField as never);

export const checkboxFieldBaseTokens  = all.filter(t => !t.name.includes('dark'));
export const checkboxFieldDarkTokens  = all.filter(t => t.name.includes('dark'));
