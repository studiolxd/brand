import multiSelect from '../../../tokens/component/multi-select.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(multiSelect as never);
const dark = (t: { name: string }) => t.name.startsWith('--multi-select-surface-dark-');

export const multiSelectTriggerTokens = all.filter(t => !dark(t) && !t.name.match(/--multi-select-(content|item|pill|sm|lg)-/));
export const multiSelectPillTokens    = all.filter(t => !dark(t) && t.name.match(/--multi-select-(pill|values)-/));
export const multiSelectContentTokens = all.filter(t => !dark(t) && t.name.match(/--multi-select-(content|item)-/));
export const multiSelectSizeTokens    = all.filter(t => !dark(t) && t.name.match(/--multi-select-(sm|lg)-/));
export const multiSelectDarkTokens    = all.filter(dark);
