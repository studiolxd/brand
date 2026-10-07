import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `heatmap` (ver `../brandMessagesEs.ts`). */
export const heatmapEs: CompleteBrandMessages['heatmap'] = {
  label: 'Matriz',
  empty: 'sin dato',
  scale: 'Escala de color',
  midpoint: (value) => `Centro: ${value}`,
};
