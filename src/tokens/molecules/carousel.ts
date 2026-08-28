import carousel from '../../../tokens/molecule/carousel.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(carousel as never);

export const carouselTokens     = all.filter(t => !t.name.includes('-surface-dark-'));
export const carouselDarkTokens = all.filter(t => t.name.includes('-surface-dark-'));
