import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `codeBlock` (ver `../brandMessagesEs.ts`). */
export const codeBlockEs: CompleteBrandMessages['codeBlock'] = {
  copy: 'Copiar código',
  region: (language) => (language ? `Bloque de código ${language}` : 'Bloque de código'),
};
