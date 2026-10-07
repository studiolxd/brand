import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `avatarUpload` (ver `../brandMessagesEs.ts`). */
export const avatarUploadEs: CompleteBrandMessages['avatarUpload'] = {
  button: 'Subir',
  // `buttonFor` CONTIENE a `button`: WCAG 2.5.3 (Label in Name) exige que el
  // nombre accesible incluya el texto visible.
  buttonFor: (subject) => `Subir ${subject}`,
  subject: 'el avatar',
  dropHint: (subject) => `…o arrastra la imagen hasta ${subject}`,
  dropActive: (subject) => `Suelta la imagen sobre ${subject} para subirla`,
  maxSize: (max) => `máx. ${max}`,
  // Los formatos llegan ya unidos con la conjunción del locale.
  invalidType: (formats) => `Formato no admitido. Se aceptan ${formats}.`,
  tooLarge: (max) => `El archivo pesa demasiado. El máximo es ${max}.`,
  cropCancel: 'Cancelar',
  cropConfirm: 'Guardar',
};
