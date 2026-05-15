import contextMenu from '../../../tokens/component/context-menu.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(contextMenu as never);

export const contextMenuPanelTokens       = all.filter(t => !t.name.match(/--context-menu-item|--context-menu-separator|--context-menu-disabled/));
export const contextMenuItemTokens        = all.filter(t => t.name.match(/--context-menu-item/) && !t.name.match(/destructive/));
export const contextMenuDestructiveTokens = all.filter(t => t.name.match(/destructive/));
export const contextMenuSeparatorTokens   = all.filter(t => t.name.match(/separator/));
