import kbd from '../../../tokens/component/kbd.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(kbd as never);

export const kbdTokens     = all.filter(t => !/^--kbd-(sm|lg)-/.test(t.name) && !t.name.startsWith('--kbd-surface-dark-'));
export const kbdSizeTokens = all.filter(t => /^--kbd-(sm|lg)-/.test(t.name));
export const kbdDarkTokens = all.filter(t => t.name.startsWith('--kbd-surface-dark-'));
