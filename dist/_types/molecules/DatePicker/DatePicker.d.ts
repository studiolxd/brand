import type { CalendarProps } from '../Calendar/Calendar';
import { type DateMaskLetters } from './dateMask';
import './DatePicker.css';
export interface DatePickerProps {
    value?: Date | null;
    /**
     * Se llama con la fecha escrita o elegida, y con `null` al vaciar el campo.
     * Una fecha a medio escribir no lo llama: el campo se pone en error.
     */
    onChange?: (date: Date | null) => void;
    /**
     * Pista dentro del campo. Por defecto, la máscara del locale con las letras
     * castellanas (`dd/mm/aaaa`, `mm/dd/aaaa` en `en-US`). Una app multiidioma
     * pasa `maskLetters` para traducir las letras sin tocar el orden.
     */
    placeholder?: string;
    /**
     * Letras de la máscara del marcador de posición. Default castellano
     * (`{ day: 'dd', month: 'mm', year: 'aaaa' }`). El orden y el separador no
     * son props: salen del `locale` con `Intl`.
     */
    maskLetters?: DateMaskLetters;
    /**
     * Mensaje cuando lo escrito no es una fecha completa y válida. Default
     * castellano; se anuncia con `role="alert"`.
     */
    invalidMessage?: string;
    /** Nombre accesible del botón que abre el calendario. Default castellano. */
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
    /** Nombre accesible del panel del calendario (`role="dialog"`). */
    calendarLabel?: string;
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
