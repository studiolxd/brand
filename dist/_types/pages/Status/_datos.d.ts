/**
 * El modelo del panel de estado y sus datos de ejemplo: qué aplicaciones vigila
 * el monitor, cómo se dice que están y cómo les ha ido en treinta días.
 *
 * Vive aparte del componente por la regla de siempre —un fichero de componente
 * solo exporta componentes—, y porque el catálogo de aplicaciones es un dato,
 * no una pieza.
 */
import type { UptimeBarsThresholds } from '../../molecules/UptimeBars/UptimeBars';
/** Cómo está una aplicación ahora mismo. */
export type SaludAplicacion = 'operational' | 'failing' | 'unknown';
/** Cómo está el conjunto. */
export type SaludConjunto = 'operational' | 'degraded' | 'down' | 'unknown';
export interface AplicacionEstado {
    id: string;
    /** El nombre visible. Un producto es nombre propio; una pieza de plataforma se traduce. */
    nombre: string;
    /** URL pública. Sin ella (colas, websocket) no hay página que visitar. */
    url?: string;
    salud: SaludAplicacion;
    /**
     * Minutos caídos cada día, del más antiguo (hace 30 días) al de hoy. `null`
     * es **sin dato** —el monitor todavía no vigilaba esto—, que no es 0 %.
     */
    minutosCaidos: (number | null)[];
}
/** Días que enseña la tira. */
export declare const DIAS = 30;
/** Minutos caídos en un día → porcentaje de disponibilidad de ese día. */
export declare const disponibilidad: (minutos: number) => number;
export declare const CORTES: UptimeBarsThresholds;
/**
 * Las aplicaciones que vigila el monitor, en el orden en que se pintan: la web
 * y el hub primero, después cada producto seguido de sus servicios (edición
 * colaborativa, worker), y al final lo externo. Los procesos en segundo plano
 * laten contra el monitor y no atienden peticiones: ninguno lleva enlace.
 *
 * Los treinta días llevan una historia creíble y no ruido: un par de días
 * tocados en Bricks y su worker, una tarde entera caída en Localizia, y LMS
 * MCP sin monitorizar la primera semana porque se dio de alta después.
 */
export declare const APLICACIONES: readonly AplicacionEstado[];
/**
 * El mismo catálogo con las aplicaciones dichas sin responder: se les marca la
 * salud y se les añaden al día de hoy los minutos que llevan caídas.
 */
export declare function sinResponder(ids: readonly string[], minutosHoy: number): AplicacionEstado[];
