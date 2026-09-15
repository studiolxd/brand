'use client';

import { forwardRef, useCallback, useId, useMemo, useRef, useState } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { Input } from '../../atoms/Input/Input';
import { Popover } from '../../atoms/Popover/Popover';
import { Calendar } from '../Calendar/Calendar';
import type { CalendarProps } from '../Calendar/Calendar';
import { getDateMask, type DateMaskLetters } from './dateMask';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './DatePicker.css';

/**
 * El cromo del selector de fecha: el botón que abre el calendario, el aviso de
 * fecha incompleta, el nombre del panel y **las letras de la máscara**.
 *
 * Las letras están aquí a propósito, y son el caso interesante de esta
 * familia. `dd/mm/aaaa` tiene dos mitades que no se deciden igual:
 *
 * - **El orden y el separador son formato**: que `es` escriba 25/09/2026,
 *   `en-US` 09/25/2026 y `de` 25.09.2026 sale del `locale` con `Intl`
 *   (`dateMask.ts`), no de una prop ni del catálogo. Una app en inglés
 *   mostrando fechas españolas las quiere en orden español.
 * - **Las letras son idioma**: `aaaa` es «año», `yyyy` es *year* y `jjjj` es
 *   *Jahr*. Son la abreviatura de una palabra, así que se traducen — y por eso
 *   son cromo y salen del catálogo, como cualquier otro rótulo.
 *
 * Por eso el catálogo trae solo las tres letras y no la máscara montada: la
 * máscara la arma el componente poniendo las letras en el orden del locale.
 */
export interface DatePickerMessages {
  /** Nombre accesible del botón que abre el calendario. */
  openCalendar: string;
  /** Aviso de fecha incompleta o inexistente, anunciado con `role="alert"`. */
  invalid: string;
  /** Nombre accesible del panel del calendario (`role="dialog"`). */
  calendar: string;
  /**
   * Las letras de la máscara, una por parte: `{ day: 'dd', month: 'mm',
   * year: 'aaaa' }`. El orden y el separador NO están aquí: salen del
   * `locale`.
   */
  maskLetters: DateMaskLetters;
}

export interface DatePickerProps {
  value?: Date | null;
  /**
   * Se llama con la fecha escrita o elegida, y con `null` al vaciar el campo.
   * Una fecha a medio escribir no lo llama: el campo se pone en error.
   */
  onChange?: (date: Date | null) => void;
  /**
   * Pista dentro del campo. Sin ella, la máscara del locale con las letras
   * del catálogo (`dd/mm/aaaa`, `mm/dd/aaaa` en `en-US`). Es la anulación
   * puntual: un campo que quiere decir otra cosa («Desde») la pasa.
   */
  placeholder?: string;
  /**
   * Letras de la máscara del marcador de posición. **Sin default**: sin
   * ellas, salen de `datePicker.maskLetters` del `BrandMessagesProvider`. El
   * orden y el separador no son props ni catálogo: salen del `locale` con
   * `Intl`.
   */
  maskLetters?: DateMaskLetters;
  /**
   * Mensaje cuando lo escrito no es una fecha completa y válida. **Sin
   * default**: sin él, sale de `datePicker.invalid` del
   * `BrandMessagesProvider`; se anuncia con `role="alert"`.
   */
  invalidMessage?: string;
  /**
   * Nombre accesible del botón que abre el calendario. **Sin default**: sin
   * él, sale de `datePicker.openCalendar` del `BrandMessagesProvider`.
   */
  openCalendarLabel?: string;
  minDate?: CalendarProps['minDate'];
  maxDate?: CalendarProps['maxDate'];
  disabledDates?: CalendarProps['disabledDates'];
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  locale?: string;
  /** id aplicado al campo de texto */
  id?: string;
  /** @deprecated Usa el atributo nativo `aria-describedby`. */
  describedBy?: string;
  /** Ids de ayuda/error que describen el control (lo pone el campo). */
  'aria-describedby'?: string;
  /** Nombre accesible cuando el control va suelto. En un campo lo nombra la etiqueta. */
  'aria-label'?: string;
  /**
   * Nombre accesible del panel del calendario (`role="dialog"`). **Sin
   * default**: sin él, sale de `datePicker.calendar` del
   * `BrandMessagesProvider`. En un campo lo pone la etiqueta del campo, que es
   * contenido de la pantalla y gana como cualquier prop.
   */
  calendarLabel?: string;
  /* Los cinco textos del calendario se reenvían tal cual. **Sin default**:
     sin ellos, el `Calendar` de dentro los lee él mismo de su espacio
     `calendar` del `BrandMessagesProvider` — el proveedor llega por contexto,
     así que no hay nada que enhebrar desde fuera. La prop sigue siendo la
     anulación puntual de ese uso. */
  /** aria-label del botón de mes anterior. Sin él, `calendar.previousMonth`. */
  previousMonthLabel?: CalendarProps['previousMonthLabel'];
  /** aria-label del botón de mes siguiente. Sin él, `calendar.nextMonth`. */
  nextMonthLabel?: CalendarProps['nextMonthLabel'];
  /** aria-label del retroceso en la vista de años. Sin él, `calendar.previousYears`. */
  previousYearsLabel?: CalendarProps['previousYearsLabel'];
  /** aria-label del avance en la vista de años. Sin él, `calendar.nextYears`. */
  nextYearsLabel?: CalendarProps['nextYearsLabel'];
  /** aria-label de la rejilla de años. Sin él, `calendar.yearGrid`. */
  yearGridLabel?: CalendarProps['yearGridLabel'];
  /**
   * aria-label de la rejilla de días. Por defecto toma `calendarLabel`, que ya
   * nombra el panel entero.
   */
  gridLabel?: CalendarProps['gridLabel'];
  /** Nombre del campo en el formulario: se monta un input oculto con la fecha en ISO. */
  name?: string;
  /** Se llama al salir del campo (react-hook-form lo usa para validar). */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

/**
 * `yyyy-mm-dd` en el huso local, no en UTC: `toISOString()` recorta al huso
 * UTC y desplaza un día en husos al este del meridiano a horas tempranas.
 */
function toLocalDateInputValue(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Selector de fecha: un campo de texto que se escribe y se borra, con el
 * calendario a un botón de distancia. El `ref` va al **campo**, para que
 * react-hook-form pueda enfocarlo al fallar la validación.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker({
  value,
  onChange,
  placeholder,
  maskLetters,
  invalidMessage,
  openCalendarLabel,
  minDate,
  maxDate,
  disabledDates,
  size = 'md',
  disabled,
  readOnly,
  error = false,
  locale = 'es-ES',
  id,
  name,
  describedBy,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  calendarLabel,
  previousMonthLabel,
  nextMonthLabel,
  previousYearsLabel,
  nextYearsLabel,
  yearGridLabel,
  gridLabel,
  onBlur,
  className,
}: DatePickerProps, ref) {
  const t = useBrandMessages('datePicker');
  const [open, setOpen] = useState(false);
  const mask = useMemo(() => getDateMask(locale), [locale]);

  // Lo que se ve escrito. Solo se vuelve a sincronizar cuando cambia la fecha
  // de fuera —comparada por su texto, no por identidad de `Date`: un padre que
  // reconstruye el objeto en cada render borraría lo que se está tecleando.
  const valueText = value instanceof Date ? mask.format(value) : '';
  const [text, setText] = useState(valueText);
  const [lastValueText, setLastValueText] = useState(valueText);

  // Ajuste de estado durante el render, el patrón de React para derivar de una
  // prop: no es un efecto porque no hay nada externo que sincronizar.
  if (valueText !== lastValueText) {
    setLastValueText(valueText);
    setText(valueText);
  }

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    },
    [ref]
  );

  const typed = text.trim();
  const parsed = typed ? mask.parse(text) : null;
  // Una fecha a medio escribir es un error del campo, igual que uno de fuera.
  const invalid = typed !== '' && !parsed;
  const hasError = error || invalid;

  const instanceId = useId();
  const invalidId = `${instanceId}-date-picker-invalid`;
  const describedByValue =
    [describedBy ?? ariaDescribedBy, invalid ? invalidId : undefined].filter(Boolean).join(' ') ||
    undefined;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if ((readOnly || disabled) && nextOpen) return;
      setOpen(nextOpen);
    },
    [disabled, readOnly]
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      setText(next);

      if (next.trim() === '') {
        // Vaciar el campo es borrar la fecha, no dejarla como estaba.
        onChange?.(null);
        return;
      }

      const date = mask.parse(next);
      if (date) onChange?.(date);
    },
    [mask, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown' && !readOnly && !disabled) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false);
      }
    },
    [disabled, open, readOnly]
  );

  const handleSelect = useCallback(
    (date: Date) => {
      setText(mask.format(date));
      onChange?.(date);
      setOpen(false);
      // El motor devuelve el foco al disparador al cerrar; el sitio del que
      // salió quien eligió con el ratón o el teclado es el campo, así que se
      // recupera en el fotograma siguiente, ya cerrado el panel.
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [mask, onChange]
  );

  const trigger = (
    <button
      type="button"
      className="date-picker__button"
      aria-label={t('openCalendar', openCalendarLabel)}
      aria-haspopup="dialog"
      aria-expanded={open}
      disabled={disabled}
      // De solo lectura el botón se queda a la vista pero fuera del recorrido:
      // no abre nada —lo corta `handleOpenChange`— y una parada de tabulador
      // que no hace nada es una trampa.
      tabIndex={readOnly ? -1 : undefined}
    >
      <Icon name="calendar" size="sm" className="date-picker__glyph" />
    </button>
  );

  // El panel se nombra una vez y sirve dos veces: al diálogo y, salvo que se
  // pase `gridLabel`, a la rejilla de días de dentro.
  const panelLabel = t('calendar', calendarLabel);

  const rootClass = [
    'date-picker',
    size !== 'md' ? `date-picker--${size}` : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      {/* Lo que se envía con el formulario: la fecha en ISO (yyyy-mm-dd). */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value instanceof Date ? toLocalDateInputValue(value) : ''}
        />
      )}
      <div className="date-picker__control">
        <Input
          ref={setInputRef}
          id={id}
          className="date-picker__input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          size={size}
          error={hasError}
          value={text}
          placeholder={placeholder ?? mask.mask(t('maskLetters', maskLetters))}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={ariaLabel}
          aria-describedby={describedByValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
        />
        <Popover
          trigger={trigger}
          label={panelLabel}
          open={open}
          onOpenChange={handleOpenChange}
          side="bottom"
          align="end"
          sideOffset={-1}
          className="date-picker__popover"
        >
          <Calendar
            value={parsed ?? value ?? null}
            onChange={handleSelect}
            gridLabel={gridLabel ?? panelLabel}
            previousMonthLabel={previousMonthLabel}
            nextMonthLabel={nextMonthLabel}
            previousYearsLabel={previousYearsLabel}
            nextYearsLabel={nextYearsLabel}
            yearGridLabel={yearGridLabel}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
            locale={locale}
            size={size}
          />
        </Popover>
      </div>
      {invalid && (
        <span id={invalidId} className="date-picker__message" role="alert">
          {t('invalid', invalidMessage)}
        </span>
      )}
    </div>
  );
});
