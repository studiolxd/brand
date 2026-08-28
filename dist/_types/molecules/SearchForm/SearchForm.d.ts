import './SearchForm.css';
export interface SearchFormProps {
    /** `id` del campo. Si no se pasa, el componente genera uno estable. */
    id?: string;
    /**
     * Nombre del parámetro con el que viaja la consulta en el envío sin JS.
     * @default 'q'
     */
    name?: string;
    /** Texto escrito. Con `value` el componente es controlado. */
    value?: string;
    /** Texto inicial cuando el componente no es controlado. */
    defaultValue?: string;
    /** Se llama en cada tecla, con el evento nativo del `<input>`. */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Se llama al enviar, con la consulta **recortada**. Previene el envío
     * nativo, así que sustituye a `action`/`method`. Con el campo vacío no se
     * llama: un buscador sin consulta no tiene a dónde ir.
     */
    onSubmit?: (query: string) => void;
    /** Destino del envío sin JS. Solo se usa cuando no hay `onSubmit`. */
    action?: string;
    /**
     * Método del envío sin JS. Una búsqueda es una lectura: `get`.
     * @default 'get'
     */
    method?: 'get' | 'post';
    /**
     * Etiqueta del campo. Nombra también el punto de referencia `search`.
     * Default castellano.
     * @default 'Buscar'
     */
    label?: string;
    /**
     * Oculta la etiqueta a la vista; el lector de pantalla la sigue leyendo.
     * @default true
     */
    labelHidden?: boolean;
    /**
     * Pista dentro del campo. Default castellano.
     * @default 'Buscar…'
     */
    placeholder?: string;
    /**
     * Nombre accesible del botón de envío. Default castellano.
     * @default 'Buscar'
     */
    submitLabel?: string;
    /** Talla del conjunto: la comparten campo y botón. */
    size?: 'sm' | 'md' | 'lg';
    /** Deshabilita el campo y el botón. */
    disabled?: boolean;
}
/**
 * Buscador de sitio: un campo y un botón de envío que llevan a una página de
 * resultados. No sugiere, no autocompleta y no guarda estado de búsqueda —
 * para eso está `DocsSearch`.
 *
 * El `ref` va al `<input>` interno.
 */
export declare const SearchForm: import("react").ForwardRefExoticComponent<SearchFormProps & import("react").RefAttributes<HTMLInputElement>>;
