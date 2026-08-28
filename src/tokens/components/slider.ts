import slider from '../../../tokens/component/slider.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(slider as never);

export const sliderTokens     = all.filter(t => !t.name.startsWith('--slider-surface-dark-'));
export const sliderDarkTokens = all.filter(t => t.name.startsWith('--slider-surface-dark-'));
