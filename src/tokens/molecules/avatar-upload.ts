import avatarUpload from '../../../tokens/molecule/avatar-upload.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(avatarUpload as never);

export const avatarUploadBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const avatarUploadDarkTokens = all.filter(t => t.name.includes('surface-dark'));
