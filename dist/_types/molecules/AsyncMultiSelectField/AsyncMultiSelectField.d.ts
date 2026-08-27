import './AsyncMultiSelectField.css';
import type { AsyncMultiSelectOption } from '../../atoms/AsyncMultiSelect/AsyncMultiSelect';
export type { AsyncMultiSelectOption };
export interface AsyncMultiSelectFieldProps {
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve.
     */
    labelHidden?: boolean;
    onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    /** Opciones elegidas: hacen falta para poder mostrar sus etiquetas. */
    selectedOptions?: AsyncMultiSelectOption[];
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
    /** Texto cuando la búsqueda no devuelve nada. Default: "Sin resultados". */
    emptyMessage?: string;
    /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
    removeLabel?: (label: string) => string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
/**
 * El `AsyncMultiSelect` como campo de formulario. El `ref` va al `<input>` de
 * búsqueda, que es lo que se enfoca; el `className`, al contenedor.
 */
export declare const AsyncMultiSelectField: import("react").ForwardRefExoticComponent<AsyncMultiSelectFieldProps & import("react").RefAttributes<HTMLInputElement>>;
