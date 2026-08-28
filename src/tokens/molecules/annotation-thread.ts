import annotationThread from '../../../tokens/organism/annotation-thread.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(annotationThread as never);

export const annotationThreadTokens     = all.filter(t => !t.name.startsWith('--annotation-thread-surface-dark-'));
export const annotationThreadDarkTokens = all.filter(t => t.name.startsWith('--annotation-thread-surface-dark-'));
