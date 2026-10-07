import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `otpInput` (ver `../brandMessagesEs.ts`). */
export const otpInputEs: CompleteBrandMessages['otpInput'] = {
  group: 'Código de verificación',
  digit: (index, length) => `Dígito ${index} de ${length}`,
};
