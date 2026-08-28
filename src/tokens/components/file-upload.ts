import tokens from '../../../tokens/component/file-upload.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);
const light = all.filter(t => !t.name.startsWith('--file-upload-surface-dark-'));
const isSize = (name: string) => /^--file-upload-(sm|lg)-/.test(name);

export const fileUploadDropzoneTokens = light.filter(
  t => !isSize(t.name) && !t.name.match(/--file-upload-(item|thumb|progress|remove)/),
);
export const fileUploadSizeTokens = light.filter(t => isSize(t.name) || t.name === '--file-upload-thumb-size' || t.name === '--file-upload-icon-size');
export const fileUploadItemTokens = light.filter(
  t => t.name.match(/--file-upload-(item|thumb|remove)/) && !isSize(t.name) && t.name !== '--file-upload-thumb-size',
);
export const fileUploadProgressTokens = light.filter(t => t.name.startsWith('--file-upload-progress'));
export const fileUploadDarkTokens = all.filter(t => t.name.startsWith('--file-upload-surface-dark-'));
