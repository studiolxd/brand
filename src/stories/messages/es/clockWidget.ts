import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `clockWidget` (ver `../brandMessagesEs.ts`). */
export const clockWidgetEs: CompleteBrandMessages['clockWidget'] = {
  title: 'Fichaje',
  clockIn: 'Fichar entrada',
  clockOut: 'Fichar salida',
  pending: 'Fichando…',
  elapsed: 'Trabajado hoy',
  entries: 'Fichajes de hoy',
  in: 'Entrada',
  out: 'Salida',
  duration: 'Duración',
  running: 'en curso',
  total: 'Total',
  nonWorking: 'Día no laborable',
  vacation: 'Día de vacaciones',
  absence: 'Día de ausencia',
  durationValue: (hours, minutes) =>
    hours === 0 ? `${minutes} min` : minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`,
};
