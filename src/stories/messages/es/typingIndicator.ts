import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `typingIndicator` (ver `../brandMessagesEs.ts`). */
export const typingIndicatorEs: CompleteBrandMessages['typingIndicator'] = {
  typing: (name) => `${name} está escribiendo…`,
};
