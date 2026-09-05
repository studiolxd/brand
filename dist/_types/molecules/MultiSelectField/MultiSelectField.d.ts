import './MultiSelectField.css';
import type { MultiSelectOption } from '../../atoms/MultiSelect/MultiSelect';
export type { MultiSelectOption };
export interface MultiSelectFieldProps {
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve.
     * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
     * es la primera de la lista, la etiqueta se oculta sola.
     */
    labelHidden?: boolean;
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    placeholder?: string;
    /** Nombre del campo en el formulario: se monta un input oculto por valor elegido. */
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
    /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
    removeLabel?: (label: string) => string;
    onValueChange?: (value: string[]) => void;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
}
/**
 * El `MultiSelect` como campo de formulario. El control es de Base UI: el
 * `ref` va al **disparador** para que react-hook-form pueda enfocarlo al
 * fallar la validación; el `className`, al contenedor.
 */
export declare const MultiSelectField: import("react").ForwardRefExoticComponent<MultiSelectFieldProps & import("react").RefAttributes<HTMLDivElement>>;
