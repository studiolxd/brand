import scrollArea from '../../../tokens/component/scroll-area.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(scrollArea as never);

export const scrollAreaTokens     = all.filter(t => !t.name.startsWith('--scroll-area-surface-dark-'));
export const scrollAreaDarkTokens = all.filter(t => t.name.startsWith('--scroll-area-surface-dark-'));
