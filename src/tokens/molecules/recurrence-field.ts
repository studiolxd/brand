import recurrenceField from '../../../tokens/molecule/recurrence-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(recurrenceField as never);

export const recurrenceFieldBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const recurrenceFieldDarkTokens = all.filter(t => t.name.includes('surface-dark'));
