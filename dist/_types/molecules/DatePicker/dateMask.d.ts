export type DatePartName = 'day' | 'month' | 'year';
/** Letras de la máscara del marcador de posición: `dd/mm/aaaa` en castellano. */
export interface DateMaskLetters {
    day: string;
    month: string;
    year: string;
}
export declare const SPANISH_MASK_LETTERS: DateMaskLetters;
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
