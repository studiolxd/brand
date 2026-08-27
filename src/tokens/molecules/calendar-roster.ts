import calendarRoster from '../../../tokens/molecule/calendar-roster.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(calendarRoster as never);

export const calendarRosterTokens     = all.filter(t => !t.name.startsWith('--calendar-roster-surface-dark-'));
export const calendarRosterDarkTokens = all.filter(t => t.name.startsWith('--calendar-roster-surface-dark-'));
