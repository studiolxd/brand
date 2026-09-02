import switcher from '../../../tokens/component/switcher.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(switcher as never);
const dark = (t: { name: string }) => t.name.startsWith('--switcher-surface-dark-');

export const switcherBaseTokens     = all.filter(t => !dark(t) && !t.name.match(/--switcher-(focus|error|disabled|sm|lg)-/));
export const switcherStateTokens    = all.filter(t => !dark(t) && t.name.match(/--switcher-(focus|error|disabled)-/));
export const switcherSizeTokens     = all.filter(t => !dark(t) && t.name.match(/--switcher-(sm|lg)-/));
export const switcherDarkTokens     = all.filter(dark);
