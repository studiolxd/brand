import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `stepper` (ver `../brandMessagesEs.ts`). */
export const stepperEs: CompleteBrandMessages['stepper'] = {
  label: 'Progreso',
  compact: (current, total) => `Paso ${current} de ${total}`,
  completed: 'Completado',
  current: 'Paso actual',
  pending: 'Pendiente',
};
