import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `fileUpload` (ver `../brandMessagesEs.ts`). */
export const fileUploadEs: CompleteBrandMessages['fileUpload'] = {
  dropzone: 'Arrastra archivos aquí',
  dropzoneActive: 'Suelta los archivos aquí',
  dropzoneHint: 'o haz clic para seleccionar',
  // El peso llega ya escrito en el locale («2,5 MB»): la plantilla solo lo
  // envuelve. Escribir aquí la cifra metería el separador decimal de una
  // lengua en la interfaz de otro país.
  maxSize: (max) => `máx. ${max}`,
  maxFiles: (n) => `hasta ${n} archivos`,
  files: 'Archivos seleccionados',
  progress: 'Progreso de subida',
  removeFile: (fileName) => `Eliminar ${fileName}`,
  tooLarge: (max) => `Archivo demasiado grande (máx. ${max})`,
  invalidType: 'Tipo de archivo no permitido',
  uploading: 'Subiendo…',
};
