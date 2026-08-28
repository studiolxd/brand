import steps from '../../../tokens/organism/steps.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(steps as never);

export const stepsTokens     = all.filter(t => !t.name.includes('-surface-dark-'));
export const stepsDarkTokens = all.filter(t => t.name.includes('-surface-dark-'));
