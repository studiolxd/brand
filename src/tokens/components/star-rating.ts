import starRating from '../../../tokens/component/star-rating.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(starRating as never);

export const starRatingTokens     = all.filter(t => !t.name.startsWith('--star-rating-surface-dark-'));
export const starRatingDarkTokens = all.filter(t => t.name.startsWith('--star-rating-surface-dark-'));
