import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `multiSelect` (ver `../brandMessagesEs.ts`). */
export const multiSelectEs: CompleteBrandMessages['multiSelect'] = {
  placeholder: 'Seleccionar…',
  remove: (label) => `Quitar ${label}`,
};
