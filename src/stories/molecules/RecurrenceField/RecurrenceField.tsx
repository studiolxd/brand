'use client';

import { useId, useMemo, type ReactNode } from 'react';
import { Fieldset } from '../../atoms/Fieldset/Fieldset';
import { Toggle } from '../../atoms/Toggle/Toggle';
import { ToggleGroup } from '../../atoms/ToggleGroup/ToggleGroup';
import { SelectField } from '../SelectField/SelectField';
import { NumberInputField } from '../NumberInputField/NumberInputField';
import { DatePickerField } from '../DatePickerField/DatePickerField';
import {
  DEFAULT_RECURRENCE,
  RECURRENCE_WEEKDAYS,
  type RecurrenceFrequency,
  type RecurrenceValue,
  type RecurrenceWeekday,
} from './recurrenceRule';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './RecurrenceField.css';

export type {
  RecurrenceValue,
  RecurrenceFrequency,
  RecurrenceWeekday,
  RecurrenceEnd,
} from './recurrenceRule';

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

const FRECUENCIAS: RecurrenceFrequency[] = ['daily', 'weekly', 'monthly', 'yearly'];

/** El 1 de enero de 2024 fue lunes: de ahí salen los siete nombres con `Intl`. */
const LUNES = Date.UTC(2024, 0, 1);

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
export function RecurrenceField({
  value,
  onValueChange,
  id: idProp,
  legend,
  disabled,
  size,
  locale = 'es-ES',
  weekStartsOn = 'monday',
  minDate,
  maxDate,
  className,
  frequencyLabel,
  weekdaysLabel,
  endLabel,
}: RecurrenceFieldProps) {
  const t = useBrandMessages('recurrenceField');
  const generado = useId();
  const id = idProp ?? generado;

  // Los nombres de los días salen del locale, no del catálogo de textos: es lo
  // que manda el sistema para meses, días y formatos de fecha.
  const días = useMemo(() => {
    const corto = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
    const largo = new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' });
    const lista = RECURRENCE_WEEKDAYS.map((key, i) => {
      const fecha = new Date(LUNES + i * 86_400_000);
      return { key, short: corto.format(fecha), long: largo.format(fecha) };
    });
    return weekStartsOn === 'sunday' ? [lista[6], ...lista.slice(0, 6)] : lista;
  }, [locale, weekStartsOn]);

  const cambia = (parcial: Partial<RecurrenceValue>) => {
    if (!value) return;
    onValueChange({ ...value, ...parcial });
  };

  const opcionesFrecuencia = [
    { value: '', label: t('never') },
    ...FRECUENCIAS.map((f) => ({ value: f, label: t(f) })),
  ];

  const opcionesFinal = [
    { value: 'never', label: t('endNever') },
    { value: 'until', label: t('endUntil') },
    { value: 'count', label: t('endCount') },
  ];

  const cuerpo = (
    <div className={['recurrence-field', className].filter(Boolean).join(' ')}>
      <SelectField
        id={`${id}-frequency`}
        label={t('frequency', frequencyLabel)}
        options={opcionesFrecuencia}
        value={value?.frequency ?? ''}
        disabled={disabled}
        size={size}
        onValueChange={(siguiente) => {
          if (!siguiente) return onValueChange(null);
          onValueChange({ ...(value ?? DEFAULT_RECURRENCE), frequency: siguiente as RecurrenceFrequency });
        }}
      />

      {value ? (
        <>
          <div className="recurrence-field__row">
            <NumberInputField
              id={`${id}-interval`}
              className="recurrence-field__interval"
              label={t('interval')(value.frequency)}
              value={value.interval}
              min={1}
              max={99}
              disabled={disabled}
              size={size}
              onChange={(siguiente) => cambia({ interval: Number.isFinite(siguiente) ? Math.max(1, siguiente) : 1 })}
            />
          </div>

          {value.frequency === 'weekly' ? (
            <div>
              {/* No es un `<label>`: el grupo no es un control único, así que
                  lo nombra un `aria-labelledby` sobre el propio grupo. */}
              <span className="recurrence-field__weekdays-label" id={`${id}-weekdays-label`}>
                {t('weekdays', weekdaysLabel)}
              </span>
              <ToggleGroup
                className="recurrence-field__weekdays"
                multiple
                size={size}
                value={value.weekdays}
                aria-labelledby={`${id}-weekdays-label`}
                onValueChange={(siguiente) => cambia({ weekdays: siguiente as RecurrenceWeekday[] })}
              >
                {días.map((día) => (
                  <Toggle key={día.key} value={día.key} aria-label={día.long} disabled={disabled}>
                    {día.short}
                  </Toggle>
                ))}
              </ToggleGroup>
            </div>
          ) : null}

          <div className="recurrence-field__row">
            <SelectField
              id={`${id}-end`}
              className="recurrence-field__end"
              label={t('end', endLabel)}
              options={opcionesFinal}
              value={value.end.type}
              disabled={disabled}
              size={size}
              onValueChange={(siguiente) => {
                if (siguiente === 'until') return cambia({ end: { type: 'until', date: null } });
                if (siguiente === 'count') return cambia({ end: { type: 'count', count: 10 } });
                cambia({ end: { type: 'never' } });
              }}
            />

            {value.end.type === 'until' ? (
              <DatePickerField
                id={`${id}-until`}
                className="recurrence-field__end"
                label={t('until')}
                value={value.end.date}
                locale={locale}
                minDate={minDate}
                maxDate={maxDate}
                disabled={disabled}
                size={size}
                onChange={(fecha) => cambia({ end: { type: 'until', date: fecha } })}
              />
            ) : null}

            {value.end.type === 'count' ? (
              <NumberInputField
                id={`${id}-count`}
                className="recurrence-field__end"
                label={t('count')}
                value={value.end.count}
                min={1}
                max={999}
                disabled={disabled}
                size={size}
                onChange={(siguiente) =>
                  cambia({ end: { type: 'count', count: Number.isFinite(siguiente) ? Math.max(1, siguiente) : 1 } })
                }
              />
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );

  return legend ? <Fieldset legend={legend} disabled={disabled}>{cuerpo}</Fieldset> : cuerpo;
}
