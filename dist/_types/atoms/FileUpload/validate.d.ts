/**
 * La validación de cliente de una subida: peso y tipo. Vive aparte del
 * `FileUpload` porque no es suya — es la del sistema. `AvatarUpload` dibuja
 * otra cosa (la diana es el avatar, no una zona de arrastre), pero acepta y
 * rechaza exactamente por la misma regla, y una segunda copia de esta función
 * sería una segunda definición de qué archivo vale.
 */
/** El peso de un archivo, en la unidad que toque. */
export declare function formatBytes(bytes: number): string;
/**
 * `null` si el archivo pasa; si no, el mensaje que lo explica. Los mensajes
 * los pone quien llama: son texto de producto, no de esta función.
 */
export declare function validateFile(file: File, accept: string | undefined, maxSize: number | undefined, tooLargeError: (maxSize: string) => string, invalidTypeError: string): string | null;
