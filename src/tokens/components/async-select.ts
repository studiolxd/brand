import tokens from '../../../tokens/component/async-select.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);
const light = all.filter(t => !t.name.startsWith('--async-select-surface-dark-'));

export const asyncSelectFaceTokens = light.filter(
  t => !t.name.match(/--async-select-(loading|empty|item-selected)/),
);
export const asyncSelectStateTokens = light.filter(
  t => t.name.match(/--async-select-(loading|empty|item-selected)/),
);
export const asyncSelectDarkTokens = all.filter(t => t.name.startsWith('--async-select-surface-dark-'));
