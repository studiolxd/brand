/**
 * La aritmética del fichaje, aparte del componente para poder probarla sin
 * montar nada: cuántos minutos suma un tramo, cuántos suma el día y si el
 * turno sigue abierto.
 */
/** Un tramo fichado: la entrada y, si ya se fichó, la salida. */
export interface ClockEntry {
    id: string;
    /** Cuándo se fichó la entrada. */
    start: Date;
    /** Cuándo se fichó la salida. `null` o ausente mientras el tramo sigue abierto. */
    end?: Date | null;
}
/**
 * Los minutos de un tramo. Uno abierto se mide contra `now`; uno que acaba
 * antes de empezar —un reloj que se movió hacia atrás— cuenta cero en vez de
 * restar del total del día.
 */
export declare function clockEntryMinutes(entry: ClockEntry, now: Date): number;
/** Los minutos del día: la suma de todos los tramos, con el abierto medido contra `now`. */
export declare function clockedMinutes(entries: ClockEntry[], now: Date): number;
/** Si hay algún tramo sin salida: el turno está abierto. */
export declare function isClockRunning(entries: ClockEntry[]): boolean;
