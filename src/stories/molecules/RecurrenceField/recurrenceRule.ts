/**
 * El subconjunto de `RRULE` (RFC 5545) que el editor expone, en las dos
 * direcciones: de la forma que edita una persona a la cadena que guarda el
 * servidor, y al revés.
 *
 * **Es un trozo de gramática, no una librería de calendario.** No expande
 * ocurrencias, no sabe de husos y no valida contra un calendario: eso lo hace
 * quien guarda la regla, del lado del servidor, con la librería que use. Aquí
 * solo se escribe y se lee la cadena, que es lo que un campo de formulario
 * necesita — y por eso el sistema de diseño no se trae ninguna dependencia
 * para esto.
 *
 * Lo que se cubre: `FREQ`, `INTERVAL`, `BYDAY` (en la frecuencia semanal) y el
 * final, que puede ser ninguno, `UNTIL` o `COUNT`. Lo que no se cubre
 * —`BYMONTHDAY`, `BYSETPOS`, `WKST`, excepciones— se conserva al leer y se
 * vuelve a escribir tal cual, para que editar la repetición de un evento no
 * destruya lo que el editor no sabe enseñar.
 */

/** Cada cuánto se repite. */
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

/** Un día de la semana, con el código de dos letras de la especificación. */
export type RecurrenceWeekday = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

/** Los siete días, de lunes a domingo. */
export const RECURRENCE_WEEKDAYS: RecurrenceWeekday[] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

/** Cuándo deja de repetirse. */
export type RecurrenceEnd =
  | { type: 'never' }
  | { type: 'until'; date: Date | null }
  | { type: 'count'; count: number };

/** La repetición, tal y como la edita una persona. */
export interface RecurrenceValue {
  frequency: RecurrenceFrequency;
  /** Cada cuántos periodos. 1 o más. */
  interval: number;
  /** Días elegidos, solo en la frecuencia semanal. */
  weekdays: RecurrenceWeekday[];
  end: RecurrenceEnd;
  /**
   * Las partes de la regla que el editor no enseña (`BYMONTHDAY`, `WKST`…),
   * en el orden en que venían. Se conservan al leer y se vuelven a escribir:
   * editar la repetición no destruye lo que no se ve.
   */
  rest?: string[];
}

/** La repetición de partida al activarla: cada semana, sin fin. */
export const DEFAULT_RECURRENCE: RecurrenceValue = {
  frequency: 'weekly',
  interval: 1,
  weekdays: [],
  end: { type: 'never' },
};

const FREQ_A_CADENA: Record<RecurrenceFrequency, string> = {
  daily: 'DAILY',
  weekly: 'WEEKLY',
  monthly: 'MONTHLY',
  yearly: 'YEARLY',
};

const CADENA_A_FREQ: Record<string, RecurrenceFrequency> = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

/** Las claves que el editor sí conoce: el resto se conserva sin tocar. */
const CONOCIDAS = new Set(['FREQ', 'INTERVAL', 'BYDAY', 'UNTIL', 'COUNT']);

const dosCifras = (n: number) => String(n).padStart(2, '0');

/**
 * `UNTIL` en UTC y al final del día: una regla que termina «el 30 de junio»
 * incluye el 30 de junio. La hora se fija a 23:59:59 Z, que es lo que hace
 * cualquier calendario con un final por fecha.
 */
function escribeUntil(date: Date): string {
  return (
    `${date.getUTCFullYear()}${dosCifras(date.getUTCMonth() + 1)}${dosCifras(date.getUTCDate())}` +
    'T235959Z'
  );
}

function leeUntil(raw: string): Date | null {
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(raw);
  if (!m) return null;
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}

/**
 * La cadena `RRULE` de una repetición. `null` —«no se repite»— da la cadena
 * vacía, que es lo que se guarda cuando no hay regla.
 */
export function buildRecurrenceRule(value: RecurrenceValue | null): string {
  if (!value) return '';
  const partes = [`FREQ=${FREQ_A_CADENA[value.frequency]}`];

  const interval = Math.max(1, Math.round(value.interval));
  if (interval > 1) partes.push(`INTERVAL=${interval}`);

  if (value.frequency === 'weekly' && value.weekdays.length > 0) {
    // En el orden de la semana, no en el que se fueron pulsando: dos reglas
    // iguales tienen que dar la misma cadena.
    const días = RECURRENCE_WEEKDAYS.filter((día) => value.weekdays.includes(día));
    partes.push(`BYDAY=${días.join(',')}`);
  }

  if (value.end.type === 'until' && value.end.date) partes.push(`UNTIL=${escribeUntil(value.end.date)}`);
  if (value.end.type === 'count') partes.push(`COUNT=${Math.max(1, Math.round(value.end.count))}`);

  if (value.rest?.length) partes.push(...value.rest);

  return partes.join(';');
}

/**
 * La repetición que describe una cadena `RRULE`. Una cadena vacía, ausente o
 * sin `FREQ` reconocible es **«no se repite»** (`null`): una regla sin
 * frecuencia no es una regla.
 */
export function parseRecurrenceRule(rule: string | null | undefined): RecurrenceValue | null {
  if (!rule) return null;

  const pares = rule
    .replace(/^RRULE:/i, '')
    .split(';')
    .map((parte) => parte.trim())
    .filter(Boolean);

  const mapa = new Map<string, string>();
  const rest: string[] = [];
  for (const par of pares) {
    const i = par.indexOf('=');
    if (i === -1) continue;
    const clave = par.slice(0, i).toUpperCase();
    const valor = par.slice(i + 1);
    if (CONOCIDAS.has(clave)) mapa.set(clave, valor);
    else rest.push(par);
  }

  const frequency = CADENA_A_FREQ[(mapa.get('FREQ') ?? '').toUpperCase()];
  if (!frequency) return null;

  const interval = Math.max(1, Math.round(Number(mapa.get('INTERVAL') ?? '1')) || 1);

  const byday = (mapa.get('BYDAY') ?? '')
    .split(',')
    .map((día) => día.trim().toUpperCase())
    .filter((día): día is RecurrenceWeekday => (RECURRENCE_WEEKDAYS as string[]).includes(día));
  const weekdays = RECURRENCE_WEEKDAYS.filter((día) => byday.includes(día));

  const until = mapa.get('UNTIL');
  const count = Math.round(Number(mapa.get('COUNT') ?? '0')) || 0;

  let end: RecurrenceEnd = { type: 'never' };
  if (until) {
    const date = leeUntil(until);
    if (date) end = { type: 'until', date };
  } else if (count > 0) {
    end = { type: 'count', count };
  }

  return rest.length > 0
    ? { frequency, interval, weekdays, end, rest }
    : { frequency, interval, weekdays, end };
}
