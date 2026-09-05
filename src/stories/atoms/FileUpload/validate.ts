/**
 * La validación de cliente de una subida: peso y tipo. Vive aparte del
 * `FileUpload` porque no es suya — es la del sistema. `AvatarUpload` dibuja
 * otra cosa (la diana es el avatar, no una zona de arrastre), pero acepta y
 * rechaza exactamente por la misma regla, y una segunda copia de esta función
 * sería una segunda definición de qué archivo vale.
 */

/** El peso de un archivo, en la unidad que toque. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * `null` si el archivo pasa; si no, el mensaje que lo explica. Los mensajes
 * los pone quien llama: son texto de producto, no de esta función.
 */
export function validateFile(
  file: File,
  accept: string | undefined,
  maxSize: number | undefined,
  tooLargeError: (maxSize: string) => string,
  invalidTypeError: string,
): string | null {
  if (maxSize !== undefined && file.size > maxSize) {
    return tooLargeError(formatBytes(maxSize));
  }
  if (accept) {
    const patterns = accept.split(',').map(s => s.trim());
    const ok = patterns.some(p => {
      if (p.startsWith('.')) return file.name.toLowerCase().endsWith(p.toLowerCase());
      if (p.endsWith('/*')) return file.type.startsWith(p.slice(0, -2));
      return file.type === p;
    });
    if (!ok) return invalidTypeError;
  }
  return null;
}
