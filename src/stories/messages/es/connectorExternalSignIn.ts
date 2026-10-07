import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `connectorExternalSignIn` (ver `../brandMessagesEs.ts`). */
export const connectorExternalSignInEs: CompleteBrandMessages['connectorExternalSignIn'] = {
  title: 'Autorizar la conexión',
  organization: 'Tu organización',
  submit: (platform) => `Iniciar sesión con ${platform}`,
};
