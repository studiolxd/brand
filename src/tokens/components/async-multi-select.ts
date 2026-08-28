import tokens from '../../../tokens/component/async-multi-select.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(tokens as never);
const light = all.filter(t => !t.name.startsWith('--async-multi-select-surface-dark-'));

export const asyncMultiSelectFaceTokens = light.filter(
  t => !t.name.match(/--async-multi-select-(loading|empty|item-selected)/),
);
export const asyncMultiSelectStateTokens = light.filter(
  t => t.name.match(/--async-multi-select-(loading|empty|item-selected)/),
);
export const asyncMultiSelectDarkTokens = all.filter(t => t.name.startsWith('--async-multi-select-surface-dark-'));
