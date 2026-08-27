import tokens from '../../../tokens/molecule/file-upload-field.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);

export const fileUploadFieldBaseTokens   = all.filter(t => !t.name.startsWith('--file-upload-field-error-') && !t.name.startsWith('--file-upload-field-helper-'));
export const fileUploadFieldErrorTokens  = all.filter(t => t.name.startsWith('--file-upload-field-error-'));
export const fileUploadFieldHelperTokens = all.filter(t => t.name.startsWith('--file-upload-field-helper-'));
