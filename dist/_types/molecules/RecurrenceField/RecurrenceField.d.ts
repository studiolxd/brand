import { type ReactNode } from 'react';
import { type RecurrenceFrequency, type RecurrenceValue } from './recurrenceRule';
import './RecurrenceField.css';
export type { RecurrenceValue, RecurrenceFrequency, RecurrenceWeekday, RecurrenceEnd, } from './recurrenceRule';
/**
 * Los textos del editor de recurrencia. Todo es **cromo**: las etiquetas de
 * los cuatro campos y los nombres de las opciones.
 *
 * Los **días de la semana no están aquí**: salen del `locale` con `Intl`, como
 * manda el sistema para meses, días y formatos de fecha.
 */
export interface RecurrenceFieldMessages {
    /** Título del grupo de campos. */
    legend: string;
    /** Etiqueta del campo de frecuencia. */
    frequency: string;
    /** La opción de no repetir. */
    never: string;
    /** Cada día. */
    daily: string;
    /** Cada semana. */
    weekly: string;
    /** Cada mes. */
    monthly: string;
    /** Cada año. */
    yearly: string;
    /** Etiqueta del intervalo, que depende de la frecuencia: «Cada cuántas semanas». */
    interval: (frequency: RecurrenceFrequency) => string;
    /** Etiqueta del grupo de días de la semana. */
    weekdays: string;
    /** Etiqueta del campo de final. */
    end: string;
    /** El final que no llega. */
    endNever: string;
    /** El final por fecha. */
    endUntil: string;
    /** El final por número de veces. */
    endCount: string;
    /** Etiqueta del campo de fecha final. */
    until: string;
    /** Etiqueta del campo de número de repeticiones. */
    count: string;
}
export interface RecurrenceFieldProps {
    /**
     * La repetición, **controlada**. `null` es «no se repite», que no es lo
     * mismo que una repetición con los campos a cero.
     */
    value: RecurrenceValue | null;
    /** Se llama con la repetición entera, o con `null` al dejar de repetirse. */
    onValueChange: (value: RecurrenceValue | null) => void;
    /** `id` base de los campos. Sin él, se genera con `useId`. */
    id?: string;
    /**
     * Título del grupo. Con él, el editor se envuelve en un `Fieldset`; **sin
     * él, no** —el editor va suelto dentro del formulario que lo monta—. Para el
     * texto del catálogo, pásale `recurrenceField.legend`.
     */
    legend?: ReactNode;
    /** Deshabilita el editor entero. */
    disabled?: boolean;
    /** Talla de los campos. Sin ella, la del contexto de formulario. */
    size?: 'sm' | 'md' | 'lg';
    /** Locale de los nombres de los días y del campo de fecha. Default `'es-ES'`. */
    locale?: string;
    /** Por dónde empieza la semana en los días. Default `'monday'`. */
    weekStartsOn?: 'monday' | 'sunday';
    /** Tope inferior de la fecha de final. */
    minDate?: Date;
    /** Tope superior de la fecha de final. */
    maxDate?: Date;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
    /** Etiqueta del campo de frecuencia. Sin ella, sale de `recurrenceField.frequency`. */
    frequencyLabel?: string;
    /** Etiqueta del grupo de días. Sin ella, sale de `recurrenceField.weekdays`. */
    weekdaysLabel?: string;
    /** Etiqueta del campo de final. Sin ella, sale de `recurrenceField.end`. */
    endLabel?: string;
}
/**
 * El editor de recurrencia de un evento: cada cuánto se repite, qué días y
 * hasta cuándo. Produce y lee una regla `RRULE` con
 * `buildRecurrenceRule` / `parseRecurrenceRule`.
 *
 * **Enseña solo lo que hace falta.** Sin frecuencia no hay nada más que
 * decidir, y los días de la semana solo aparecen en la frecuencia semanal: un
 * formulario que enseña siempre los siete campos obliga a leerlos siempre.
 *
 * Es **controlado**, como el resto de campos del sistema: recibe `value` y
 * llama a `onValueChange` con el valor entero. `null` es «no se repite».
 */
export declare function RecurrenceField({ value, onValueChange, id: idProp, legend, disabled, size, locale, weekStartsOn, minDate, maxDate, className, frequencyLabel, weekdaysLabel, endLabel, }: RecurrenceFieldProps): import("react/jsx-runtime").JSX.Element;
