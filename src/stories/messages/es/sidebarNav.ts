import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `sidebarNav` (ver `../brandMessagesEs.ts`). */
export const sidebarNavEs: CompleteBrandMessages['sidebarNav'] = {
  label: 'Navegación principal',
  empty: 'sin docs',
  emptyEntry: (label, empty) => `${label} — ${empty}`,
};
