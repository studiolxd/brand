import modal from '../../../tokens/component/modal.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(modal as never);

export const modalTokens     = all.filter(t => !t.name.startsWith('--modal-surface-dark-'));
export const modalDarkTokens = all.filter(t => t.name.startsWith('--modal-surface-dark-'));
