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
export declare const RECURRENCE_WEEKDAYS: RecurrenceWeekday[];
/** Cuándo deja de repetirse. */
export type RecurrenceEnd = {
    type: 'never';
} | {
    type: 'until';
    date: Date | null;
} | {
    type: 'count';
    count: number;
};
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
export declare const DEFAULT_RECURRENCE: RecurrenceValue;
/**
 * La cadena `RRULE` de una repetición. `null` —«no se repite»— da la cadena
 * vacía, que es lo que se guarda cuando no hay regla.
 */
export declare function buildRecurrenceRule(value: RecurrenceValue | null): string;
/**
 * La repetición que describe una cadena `RRULE`. Una cadena vacía, ausente o
 * sin `FREQ` reconocible es **«no se repite»** (`null`): una regla sin
 * frecuencia no es una regla.
 */
export declare function parseRecurrenceRule(rule: string | null | undefined): RecurrenceValue | null;
