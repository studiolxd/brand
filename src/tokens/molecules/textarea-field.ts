import textareaFieldJson from '../../../tokens/molecule/textarea-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(textareaFieldJson as never);

export const textareaFieldBaseTokens = all.filter(t => t.name === '--textarea-field-gap');

export const textareaFieldErrorTokens = all.filter(t => t.name.startsWith('--textarea-field-error-'));

export const textareaFieldHelperTokens = all.filter(t => t.name.startsWith('--textarea-field-helper-'));
