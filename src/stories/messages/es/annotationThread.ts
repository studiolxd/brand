import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `annotationThread` (ver `../brandMessagesEs.ts`). */
export const annotationThreadEs: CompleteBrandMessages['annotationThread'] = {
  label: 'Hilo de anotaciones',
  open: 'Abierta',
  acknowledged: 'Atendida',
  resolved: 'Resuelta',
  edited: 'editada',
  replies: (count) => (count === 1 ? '1 respuesta' : `${count} respuestas`),
};
