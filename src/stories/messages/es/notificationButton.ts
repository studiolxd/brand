import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `notificationButton` (ver `../brandMessagesEs.ts`). */
export const notificationButtonEs: CompleteBrandMessages['notificationButton'] = {
  label: 'Notificaciones',
  countLabel: (count) => `Notificaciones: ${count} sin leer`,
};
