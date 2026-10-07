import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `conversationList` (ver `../brandMessagesEs.ts`). */
export const conversationListEs: CompleteBrandMessages['conversationList'] = {
  new: 'Nueva conversación',
  nav: 'Conversaciones',
  delete: (label) => `Eliminar la conversación «${label}»`,
  empty: 'Todavía no hay conversaciones',
  error: 'No se pudieron cargar las conversaciones',
};
