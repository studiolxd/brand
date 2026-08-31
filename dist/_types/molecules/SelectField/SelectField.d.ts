import './SelectField.css';
import type { SelectOptionOrGroup } from '../../atoms/Select/Select';
export interface SelectFieldProps {
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve.
     */
    labelHidden?: boolean;
    /**
     * Opciones del campo. Cada entrada es una opción (`{ value, label }`) o un
     * grupo con cabecera (`{ label, options }`); las dos formas se pueden
     * mezclar. La cabecera es una etiqueta, no una opción elegible.
     */
    options: SelectOptionOrGroup[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    /** Nombre del campo en el formulario: Base UI monta un input oculto con el valor. */
    name?: string;
    disabled?: boolean;
    required?: boolean;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
    onValueChange?: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}
/**
 * El `Select` como campo de formulario. El control es de Base UI: el `ref` va
 * al **disparador** para que react-hook-form pueda enfocarlo al fallar la
 * validación; el `className`, al contenedor.
 */
export declare const SelectField: import("react").ForwardRefExoticComponent<SelectFieldProps & import("react").RefAttributes<HTMLButtonElement>>;
