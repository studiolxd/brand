/**
 * Momento de un mensaje: un `Date` o una cadena **ISO 8601**
 * (`'2026-08-27T14:32:00Z'`). Nunca una hora ya formateada (`'14:32'`): el
 * componente necesita el instante para poder escribirlo en el atributo
 * `datetime` del `<time>`, que es lo que leen las máquinas.
 */
export type MessageTimestamp = Date | string;
export interface FormattedTimestamp {
    /** Valor del atributo `datetime`, en ISO 8601. */
    dateTime: string;
    /** Texto visible, formateado con `Intl` en el `locale` que toque. */
    label: string;
}
/**
 * Convierte el momento de un mensaje en el par que necesita un `<time>`.
 * Devuelve `null` si no hay marca de tiempo o si no se puede interpretar
 * (una hora ya formateada, por ejemplo): mejor no pintar nada que pintar
 * «Invalid Date».
 */
export declare function formatMessageTimestamp(timestamp: MessageTimestamp | undefined, locale?: string, format?: Intl.DateTimeFormatOptions): FormattedTimestamp | null;
