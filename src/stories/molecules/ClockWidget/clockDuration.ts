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
export function clockEntryMinutes(entry: ClockEntry, now: Date): number {
  const end = entry.end ?? now;
  return Math.max(0, Math.round((end.getTime() - entry.start.getTime()) / 60_000));
}

/** Los minutos del día: la suma de todos los tramos, con el abierto medido contra `now`. */
export function clockedMinutes(entries: ClockEntry[], now: Date): number {
  return entries.reduce((total, entry) => total + clockEntryMinutes(entry, now), 0);
}

/** Si hay algún tramo sin salida: el turno está abierto. */
export function isClockRunning(entries: ClockEntry[]): boolean {
  return entries.some((entry) => entry.end === null || entry.end === undefined);
}
