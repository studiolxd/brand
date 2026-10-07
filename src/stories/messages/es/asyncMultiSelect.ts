import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `asyncMultiSelect` (ver `../brandMessagesEs.ts`). */
export const asyncMultiSelectEs: CompleteBrandMessages['asyncMultiSelect'] = {
  placeholder: 'Buscar…',
  empty: 'Sin resultados',
  loading: 'Buscando…',
  remove: (label) => `Quitar ${label}`,
};
