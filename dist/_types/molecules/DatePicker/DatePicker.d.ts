import type { CalendarProps } from '../Calendar/Calendar';
import { type DateMaskLetters } from './dateMask';
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
 * Selector de fecha: un campo de texto que se escribe y se borra, con el
 * calendario a un botón de distancia. El `ref` va al **campo**, para que
 * react-hook-form pueda enfocarlo al fallar la validación.
 */
export declare const DatePicker: import("react").ForwardRefExoticComponent<DatePickerProps & import("react").RefAttributes<HTMLInputElement>>;
