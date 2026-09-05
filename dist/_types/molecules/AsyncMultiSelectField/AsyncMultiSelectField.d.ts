import './AsyncMultiSelectField.css';
import { AsyncMultiSelect } from '../../atoms/AsyncMultiSelect/AsyncMultiSelect';
import type { AsyncMultiSelectOption } from '../../atoms/AsyncMultiSelect/AsyncMultiSelect';
export type { AsyncMultiSelectOption };
export interface AsyncMultiSelectFieldProps {
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
    /** Marca el control como obligatorio (`aria-required` en el combobox). */
    required?: boolean;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Milisegundos de rebote antes de llamar a `onSearch`. Default: 300. */
    debounceMs?: number;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
    /** Texto cuando la búsqueda no devuelve nada. Default: "Sin resultados". */
    emptyMessage?: string;
    /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
    removeLabel?: (label: string) => string;
    /** Etiqueta accesible del spinner mientras se busca. Default: "Buscando…". */
    loadingLabel?: string;
    /** Nodo DOM donde montar el portal del desplegable (ver `AsyncMultiSelect`). */
    container?: React.ComponentProps<typeof AsyncMultiSelect>['container'];
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
/**
 * El `AsyncMultiSelect` como campo de formulario. El `ref` va al `<input>` de
 * búsqueda, que es lo que se enfoca; el `className`, al contenedor.
 */
export declare const AsyncMultiSelectField: import("react").ForwardRefExoticComponent<AsyncMultiSelectFieldProps & import("react").RefAttributes<HTMLInputElement>>;
