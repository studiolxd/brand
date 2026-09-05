/** Los cortes que deciden el color de la barrita, en porcentaje. */
export interface UptimeBarsThresholds {
    /** A partir de aquí, el tramo bueno (rol `success`). */
    ok?: number;
    /** A partir de aquí y hasta `ok`, el tramo intermedio (rol `warning`). Por debajo, el malo (rol `error`). */
    degraded?: number;
}
export type UptimeBarsStatus = 'ok' | 'degraded' | 'down' | 'empty';
/**
 * Los cortes por defecto, pensados en **tiempo caído al día**: hasta 5 minutos
 * el día está bien (99,65 %), de 5 minutos a 1 hora está tocado (95,83 %), y de
 * ahí para abajo está caído. El margen del verde es deliberado: un fallo
 * aislado de comprobación no es un incidente y no debe pintar el día entero.
 */
export declare const UPTIME_BARS_DEFAULT_THRESHOLDS: Required<UptimeBarsThresholds>;
/** El tramo de un punto según los cortes. `null` no es 0 %: es la ausencia de medida. */
export declare function uptimeStatus(value: number | null, thresholds: Required<UptimeBarsThresholds>): UptimeBarsStatus;
