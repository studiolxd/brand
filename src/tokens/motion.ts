import duration from '../../tokens/motion/duration.json';
import easing from '../../tokens/motion/easing.json';
import { flattenTokens } from './utils';

export const durationTokens = flattenTokens(duration as never);
export const easingTokens = flattenTokens(easing as never);
