import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `planningGrid` (ver `../brandMessagesEs.ts`). */
export const planningGridEs: CompleteBrandMessages['planningGrid'] = {
  label: 'Planificación',
  cellLabel: (row, column) => `Horas de ${row} en ${column}`,
  rowTotal: 'Total',
  columnTotal: 'Total',
  capacity: 'Disponible',
  remaining: 'Sin asignar',
  over: 'sobreasignado',
  saving: 'Guardando…',
};
