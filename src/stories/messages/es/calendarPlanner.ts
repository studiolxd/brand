import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `calendarPlanner` (ver `../brandMessagesEs.ts`). */
export const calendarPlannerEs: CompleteBrandMessages['calendarPlanner'] = {
  more: (count) => `+${count} más`,
  previousWeek: 'Semana anterior',
  nextWeek: 'Semana siguiente',
  monthView: 'Mes',
  weekView: 'Semana',
  viewSwitcher: 'Vista del calendario',
};
