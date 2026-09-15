export type DatePartName = 'day' | 'month' | 'year';
/**
 * Letras de la máscara del marcador de posición, una por parte.
 *
 * **No hay juego por defecto, y es deliberado**: las letras se traducen
 * (`aaaa` es «año», `yyyy` es *year*, `jjjj` es *Jahr*), así que salen del
 * catálogo de la aplicación —`datePicker.maskLetters`— igual que cualquier
 * otro rótulo. Lo que este módulo decide es el **orden** y el **separador**,
 * que son formato y salen del `locale`.
 */
export interface DateMaskLetters {
    day: string;
    month: string;
    year: string;
}
export interface DateMask {
    /** Orden de las partes en ese locale, p. ej. `['day', 'month', 'year']`. */
    order: DatePartName[];
    /** Literal que separa las partes: `/`, `.`, `-`… */
    separator: string;
    /** La fecha escrita en ese orden, con las cifras rellenadas: `25/09/2026`. */
    format(date: Date): string;
    /** La máscara de ejemplo con las letras dadas: `dd/mm/aaaa`. */
    mask(letters: DateMaskLetters): string;
    /** Lee la fecha tecleada. `null` si está incompleta o no existe. */
    parse(text: string): Date | null;
}
export declare function getDateMask(locale: string): DateMask;
