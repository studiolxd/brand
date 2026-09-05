import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { type UptimeBarsThresholds } from './uptimeStatus';
import './UptimeBars.css';
export type { UptimeBarsThresholds, UptimeBarsStatus } from './uptimeStatus';
/** Un punto de la serie: un día, una hora, un despliegue. La tira no lo sabe. */
export interface UptimeBarsPoint {
    /**
     * Porcentaje de disponibilidad del punto, de 0 a 100. `null` es **sin dato**
     * —el monitor todavía no existía—, que no es lo mismo que 0 %.
     */
    value: number | null;
    /** Cómo se llama el punto, ya escrito: «5 de septiembre». */
    label: string;
    /** Una línea de detalle para el bocadillo: «Sin incidencias», «Caído 2 h 14 min». */
    detail?: string;
}
export interface UptimeBarsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    /** La serie, en orden: el punto más antiguo primero. */
    points: UptimeBarsPoint[];
    /**
     * La media del periodo, **ya escrita** por quien la calcula («99,98 % de
     * disponibilidad»). Es obligatoria porque es la alternativa principal a la
     * tira: el dato que se lee sin mirar treinta rectángulos ni abrir un bocadillo.
     */
    summary: ReactNode;
    /** Nombre accesible de la tira. Default castellano: «Disponibilidad». */
    label?: string;
    /** Rótulo del extremo antiguo, bajo la primera barrita: «Hace 30 días». */
    startLabel?: ReactNode;
    /** Rótulo del extremo reciente, bajo la última barrita: «Hoy». */
    endLabel?: ReactNode;
    /** Cortes de color. Sin ellos, `UPTIME_BARS_DEFAULT_THRESHOLDS`. */
    thresholds?: UptimeBarsThresholds;
    /** Locale para formatear el porcentaje. Default `'es-ES'`. */
    locale?: string;
    /** Decimales del porcentaje. Default 2. */
    maximumFractionDigits?: number;
    /**
     * Nombre accesible de cada barrita. Recibe el punto y su porcentaje ya
     * formateado (`null` cuando no hay dato). Default castellano:
     * «5 de septiembre: 100 %. Sin incidencias».
     */
    pointLabel?: (point: UptimeBarsPoint, formattedValue: string | null) => string;
    /** Cómo se dice que un punto no tiene dato. Default castellano: «sin datos». */
    noDataLabel?: string;
    /**
     * Bocadillo por barrita, con ratón y con teclado. Default `true`. Sin él las
     * barritas dejan de recibir el foco: el detalle sigue en el nombre accesible,
     * que un lector de pantalla recorre sin necesidad de tabular.
     */
    tooltips?: boolean;
}
/**
 * La tira de disponibilidad: una barrita por punto de la serie y la media del
 * periodo debajo.
 *
 * **No sabe de tiempo ni de dónde salen los datos.** No hay días, ni monitores,
 * ni husos horarios: recibe N puntos con su porcentaje y su etiqueta, y pinta.
 * Quien la usa decide si un punto es un día o una hora, y escribe las fechas.
 *
 * La lectura no depende del color: cada barrita lleva su nombre accesible
 * completo, la serie es una lista ordenada y la media va siempre en texto.
 */
export declare const UptimeBars: import("react").ForwardRefExoticComponent<UptimeBarsProps & import("react").RefAttributes<HTMLDivElement>>;
