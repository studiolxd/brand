import menu from '../../../tokens/component/menu.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(menu as never);

export const menuPanelTokens = all.filter(t => !t.name.match(/--menu-item|--menu-label|--menu-separator|--menu-disabled/));
export const menuItemTokens  = all.filter(t => t.name.match(/--menu-item/) && !t.name.match(/destructive/));
export const menuDestructiveTokens = all.filter(t => t.name.match(/destructive/));
export const menuLabelSeparatorTokens = all.filter(t => t.name.match(/--menu-label|--menu-separator|--menu-disabled/));
