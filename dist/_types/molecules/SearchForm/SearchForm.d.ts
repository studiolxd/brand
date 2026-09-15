import './SearchForm.css';
/**
 * Los tres textos que el buscador emite por su cuenta. Son cromo: el buscador
 * de sitio se llama igual en toda la suite, y ni el rótulo ni la pista dicen
 * nada de lo que se busca en ESTA pantalla.
 */
export interface SearchFormMessages {
    /** Etiqueta del campo; nombra también el punto de referencia `search`. */
    label: string;
    /** Pista dentro del campo. */
    placeholder: string;
    /** Nombre accesible del botón de envío. */
    submit: string;
}
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
     * **Sin default**: sale de `searchForm.label` del `BrandMessagesProvider`.
     */
    label?: string;
    /**
     * Oculta la etiqueta a la vista; el lector de pantalla la sigue leyendo.
     * @default true
     */
    labelHidden?: boolean;
    /**
     * Pista dentro del campo. **Sin default**: sale de
     * `searchForm.placeholder`.
     */
    placeholder?: string;
    /**
     * Nombre accesible del botón de envío. **Sin default**: sale de
     * `searchForm.submit`.
     */
    submitLabel?: string;
    /**
     * Talla del conjunto: la comparten campo y botón. `xl` es propia de este
     * componente —el buscador del menú del sitio—; el resto son las tallas de
     * formulario del sistema, y solo esas se heredan de un `Form`.
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';
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
