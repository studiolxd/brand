import { isDevelopment } from '../../constants/env';

/**
 * Momento de un mensaje: un `Date` o una cadena **ISO 8601**
 * (`'2026-08-27T14:32:00Z'`). Nunca una hora ya formateada (`'14:32'`): el
 * componente necesita el instante para poder escribirlo en el atributo
 * `datetime` del `<time>`, que es lo que leen las máquinas.
 */
export type MessageTimestamp = Date | string;

/** Hora y minutos: lo que se lee en un hilo de chat. */
const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

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
export function formatMessageTimestamp(
  timestamp: MessageTimestamp | undefined,
  locale = 'es-ES',
  format: Intl.DateTimeFormatOptions = DEFAULT_FORMAT,
): FormattedTimestamp | null {
  if (timestamp === undefined || timestamp === null) return null;

  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    if (isDevelopment()) {
      console.warn(
        `[UserMessage/AssistantMessage] \`timestamp\` no es interpretable: ${JSON.stringify(timestamp)}. ` +
          'Se espera un `Date` o una cadena ISO 8601 (ej. "2026-08-27T14:32:00Z"), no una hora ya formateada. No se pinta ninguna marca de tiempo.',
      );
    }
    return null;
  }

  return {
    dateTime: date.toISOString(),
    label: new Intl.DateTimeFormat(locale, format).format(date),
  };
}
