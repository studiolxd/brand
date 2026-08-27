import progressBar from '../../../tokens/component/progress-bar.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(progressBar as never);

const VARIANT = /^--progress-bar-(primary|accent-1|accent-2|support-1|support-2)-/;

export const progressBarBaseTokens    = all.filter(t => !VARIANT.test(t.name) && !t.name.startsWith('--progress-bar-surface-dark-'));
export const progressBarVariantTokens = all.filter(t => VARIANT.test(t.name));
export const progressBarDarkTokens    = all.filter(t => t.name.startsWith('--progress-bar-surface-dark-'));
