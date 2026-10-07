import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `userMenu` (ver `../brandMessagesEs.ts`). */
export const userMenuEs: CompleteBrandMessages['userMenu'] = {
  trigger: (name) => `Cuenta de ${name}`,
  unread: (count) => `${count} notificaciones sin leer`,
};
