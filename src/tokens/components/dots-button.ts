import dotsButton from '../../../tokens/component/dots-button.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(dotsButton as never);

export const dotsButtonTokens      = all.filter(t => !t.name.match(/--dots-button-(sm|md|lg)-/));
export const dotsButtonSizeTokens  = all.filter(t => t.name.match(/--dots-button-(sm|md|lg)-/));
