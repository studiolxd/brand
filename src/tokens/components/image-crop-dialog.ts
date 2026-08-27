import imageCropDialog from '../../../tokens/molecule/image-crop-dialog.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(imageCropDialog as never);

export const imageCropDialogTokens     = all.filter(t => !t.name.startsWith('--image-crop-dialog-surface-dark-'));
export const imageCropDialogDarkTokens = all.filter(t => t.name.startsWith('--image-crop-dialog-surface-dark-'));
