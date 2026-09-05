import fieldRow from '../../../tokens/molecule/field-row.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(fieldRow as never);

export const fieldRowBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const fieldRowDarkTokens = all.filter(t => t.name.includes('surface-dark'));
