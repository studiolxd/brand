import accordion from '../../../tokens/component/accordion.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(accordion as never);

export const accordionTokens     = all.filter(t => !t.name.startsWith('--accordion-surface-dark-'));
export const accordionDarkTokens = all.filter(t => t.name.startsWith('--accordion-surface-dark-'));
