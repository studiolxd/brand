import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `slider` (ver `../brandMessagesEs.ts`). */
export const sliderEs: CompleteBrandMessages['slider'] = {
  value: 'Valor',
  min: 'Mínimo',
  max: 'Máximo',
  valueAt: (index) => `Valor ${index}`,
};
