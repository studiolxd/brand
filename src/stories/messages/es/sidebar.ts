import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `sidebar` (ver `../brandMessagesEs.ts`). */
export const sidebarEs: CompleteBrandMessages['sidebar'] = {
  label: 'Barra lateral',
  resizer: 'Ancho de la barra lateral',
  resizerValue: (width) => `${width} píxeles`,
};
