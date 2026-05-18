import button from '../../../tokens/component/button.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(button as never);

export const buttonBaseTokens        = all.filter(t => !t.name.match(/--button-(primary|outline|destructive|ghost|text|sm|lg|block)/));
export const buttonPrimaryTokens     = all.filter(t => t.name.startsWith('--button-primary') && !t.name.startsWith('--button-primary-dark'));
export const buttonPrimaryDarkTokens = all.filter(t => t.name.startsWith('--button-primary-dark'));
export const buttonOutlineTokens     = all.filter(t => t.name.startsWith('--button-outline'));
export const buttonDestructiveTokens = all.filter(t => t.name.startsWith('--button-destructive'));
export const buttonGhostTokens       = all.filter(t => t.name.startsWith('--button-ghost'));
export const buttonTextTokens        = all.filter(t => t.name.startsWith('--button-text'));
export const buttonSizeTokens        = all.filter(t => t.name.match(/--button-(sm|lg)-/));
