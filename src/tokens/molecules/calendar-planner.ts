import calendarPlanner from '../../../tokens/molecule/calendar-planner.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(calendarPlanner as never);

export const calendarPlannerTokens     = all.filter(t => !t.name.startsWith('--calendar-planner-surface-dark-'));
export const calendarPlannerDarkTokens = all.filter(t => t.name.startsWith('--calendar-planner-surface-dark-'));
