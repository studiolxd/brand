/**
 * La validación de cliente de una subida: peso y tipo. Vive aparte del
 * `FileUpload` porque no es suya — es la del sistema. `AvatarUpload` dibuja
 * otra cosa (la diana es el avatar, no una zona de arrastre), pero acepta y
 * rechaza exactamente por la misma regla, y una segunda copia de esta función
 * sería una segunda definición de qué archivo vale.
 *
 * Aquí vive además la mitad **de formato** de esta familia: el peso escrito y
 * la lista de formatos. La regla de la campaña del proveedor es la misma que
 * en la máscara de fecha: *si cambia al cambiar de idioma es cromo y va al
 * catálogo; si cambia al cambiar de país es formato y sale del `locale`*.
 */
/** El locale que se usa cuando el componente no recibe ninguno. */
export declare const DEFAULT_LOCALE = "es-ES";
/**
 * El peso de un archivo, escrito **en el locale**: `2,5 MB` en `es-ES` y
 * `2.5 MB` en `en-US`.
 *
 * «2,5 MB» tiene dos mitades, igual que `dd/mm/aaaa`:
 *
 * - **El símbolo no se traduce.** `MB` es `MB` en las seis lenguas de la
 *   suite; no es una palabra, es una unidad del SI.
 * - **El separador decimal y la colocación del sufijo son formato.** La coma
 *   o el punto, el espacio antes de la unidad y hasta si va delante o detrás
 *   los decide el `locale`, no el idioma de la interfaz.
 *
 * Por eso esto no es una plantilla del catálogo sino `Intl.NumberFormat` con
 * `style: 'unit'`: la cifra la escribe el navegador. Al catálogo va solo la
 * frase que la envuelve («Máximo {size}»), que sí es cromo.
 */
export declare function formatFileSize(bytes: number, locale?: string): string;
/**
 * Una lista de cosas escrita con la conjunción del idioma: `JPEG, PNG o WEBP`
 * en castellano, `JPEG, PNG, or WEBP` en inglés, `JPEG, PNG oder WEBP` en
 * alemán.
 *
 * Es `Intl.ListFormat` y no un `join(', ')` con una «o» pegada: la conjunción,
 * la coma de Oxford y el espaciado cambian de una lengua a otra, y pegarlos a
 * mano deja el texto en castellano dentro de una frase traducida. `disjunction`
 * porque se acepta **uno** de los formatos, no todos.
 */
export declare function formatList(items: string[], locale?: string): string;
/**
 * `null` si el archivo pasa; si no, el mensaje que lo explica. Los mensajes
 * los pone quien llama: son texto de producto, no de esta función.
 */
export declare function validateFile(file: File, accept: string | undefined, maxSize: number | undefined, tooLargeError: (maxSize: string) => string, invalidTypeError: string, locale?: string): string | null;
