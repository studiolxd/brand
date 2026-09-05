import './AsyncSelectField.css';
import { AsyncSelect } from '../../atoms/AsyncSelect/AsyncSelect';
import type { AsyncSelectOption } from '../../atoms/AsyncSelect/AsyncSelect';
export type { AsyncSelectOption };
export interface AsyncSelectFieldProps {
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
    onSearch: (query: string) => Promise<AsyncSelectOption[]>;
    value?: string | null;
    onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
    /** Opción elegida: hace falta para poder mostrar su etiqueta cuando hay `value`. */
    selectedOption?: AsyncSelectOption | null;
    placeholder?: string;
    /** Nombre del campo en el formulario: se monta un input oculto con el valor. */
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
    /** Etiqueta accesible del spinner mientras se busca. Default: "Buscando…". */
    loadingLabel?: string;
    /** aria-label del botón de limpiar selección. Default: "Limpiar selección". */
    clearLabel?: string;
    /** Nodo DOM donde montar el portal del desplegable (ver `AsyncSelect`). */
    container?: React.ComponentProps<typeof AsyncSelect>['container'];
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
/**
 * El `AsyncSelect` como campo de formulario. El `ref` va al `<input>` de
 * búsqueda, que es lo que se enfoca; el `className`, al contenedor.
 */
export declare const AsyncSelectField: import("react").ForwardRefExoticComponent<AsyncSelectFieldProps & import("react").RefAttributes<HTMLInputElement>>;
