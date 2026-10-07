import { type FieldOptionalProps } from '../_shared/FieldShell';
import type { ColorPickerProps } from '../ColorPicker/ColorPicker';
import './ColorPickerField.css';
export interface ColorPickerFieldProps extends Omit<ColorPickerProps, 'id' | 'aria-describedby' | 'aria-label' | 'aria-labelledby'>, FieldOptionalProps {
    /** `id` del disparador. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`. Sin valor, lo decide quien lo envuelva: dentro de un
     * `FieldRow` que no es la primera de la lista, la etiqueta se oculta sola.
     */
    labelHidden?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el disparador en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    /**
     * Campo obligatorio. El disparador es un botón, que no admite
     * `aria-required`: lo obligatorio lo lleva el **grupo** que envuelve el
     * campo (`role="group"`, nombrado por la etiqueta, con `aria-required`), y
     * el `<form>` no se envía sin color (`required` en el campo que sincroniza
     * el hex).
     */
    required?: boolean;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * El `ColorPicker` como campo de formulario: etiqueta, disparador, ayuda y
 * error. La etiqueta nombra el disparador y el panel; el `ref` va al
 * **disparador**, para que react-hook-form pueda enfocarlo al fallar la
 * validación; el `className`, al contenedor.
 */
export declare const ColorPickerField: import("react").ForwardRefExoticComponent<ColorPickerFieldProps & import("react").RefAttributes<HTMLButtonElement>>;
