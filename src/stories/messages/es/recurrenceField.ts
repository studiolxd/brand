import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `recurrenceField` (ver `../brandMessagesEs.ts`). */
export const recurrenceFieldEs: CompleteBrandMessages['recurrenceField'] = {
  legend: 'Repetición',
  frequency: 'Frecuencia',
  never: 'No se repite',
  daily: 'Cada día',
  weekly: 'Cada semana',
  monthly: 'Cada mes',
  yearly: 'Cada año',
  interval: (frequency) =>
    ({
      daily: 'Cada cuántos días',
      weekly: 'Cada cuántas semanas',
      monthly: 'Cada cuántos meses',
      yearly: 'Cada cuántos años',
    })[frequency],
  weekdays: 'Días de la semana',
  end: 'Termina',
  endNever: 'Nunca',
  endUntil: 'En una fecha',
  endCount: 'Tras un número de veces',
  until: 'Hasta',
  count: 'Número de repeticiones',
};
