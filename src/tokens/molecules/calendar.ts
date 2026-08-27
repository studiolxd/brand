import calendar from '../../../tokens/molecule/calendar.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(calendar as never);

export const calendarTokens     = all.filter(t => !t.name.startsWith('--calendar-surface-dark-'));
export const calendarDarkTokens = all.filter(t => t.name.startsWith('--calendar-surface-dark-'));
