import { Popover as BasePopover } from '@base-ui/react/popover';
import './AsyncMultiSelect.css';
export interface AsyncMultiSelectOption {
    value: string;
    label: string;
}
export interface AsyncMultiSelectProps {
    onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
    value?: string[];
    /**
     * Valores iniciales en modo no controlado. Sus etiquetas no se conocen hasta
     * que se buscan: para enseñarlas desde el primer pintado hay que pasar
     * también `selectedOptions`. Sin ellas la pill muestra el valor crudo.
     */
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    /**
     * Etiquetas de los valores elegidos. En modo controlado es la vía normal de
     * dárselas al componente. En modo no controlado no hace falta para lo que se
     * elige con el ratón o el teclado —esas opciones vienen de `onSearch` y el
     * componente las recuerda—, solo para los valores de `defaultValue`.
     */
    selectedOptions?: AsyncMultiSelectOption[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    /**
     * Milisegundos de rebote entre la última tecla y la llamada a `onSearch`.
     * Default: 300. A 0 se busca en cada tecla.
     */
    debounceMs?: number;
    id?: string;
    /** Nombre del campo en el formulario: se monta un input oculto por valor elegido. */
    name?: string;
    /** Marca el estado de error: aplica la clase `async-multi-select--error` y `aria-invalid`. */
    error?: boolean;
    /**
     * Marca el control como obligatorio: pone `aria-required` en el combobox.
     * No se traslada a un `required` nativo porque lo que viaja en el formulario
     * es un input oculto —un control no enfocable con `required` bloquea el envío
     * sin poder enseñar el mensaje—: la validación la lleva el consumidor (o
     * react-hook-form), como en el resto de campos compuestos del sistema.
     */
    required?: boolean;
    /** Se llama al salir del control (react-hook-form lo usa para validar). */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
    /**
     * Nombre accesible cuando el control va suelto. En un campo lo nombra la
     * etiqueta (`htmlFor`), que este atributo pisaría: no lo pongas ahí.
     */
    'aria-label'?: string;
    'aria-describedby'?: string;
    /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
    removeLabel?: (label: string) => string;
    /**
     * Texto mostrado cuando la búsqueda no devuelve opciones. Default: "Sin resultados"
     * (castellano). Es texto **visible**: una app multiidioma debe pasarlo traducido.
     */
    emptyMessage?: string;
    /**
     * Etiqueta accesible del spinner mientras se busca. Default: "Buscando…" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    loadingLabel?: string;
    /**
     * Nodo DOM donde montar el portal del dropdown (reenviado a Base UI
     * `Portal.container`). Por defecto se monta en `document.body`, que
     * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasarlo cuando el
     * AsyncMultiSelect vive dentro de un `.surface-dark` **anidado** (no en
     * la raíz), ya que ese contexto no llega a `document.body` por la
     * cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof BasePopover.Portal>['container'];
}
/**
 * Búsqueda con resultados asíncronos y varios valores. El `ref` va al
 * `<input>` de búsqueda, que es lo que se enfoca.
 */
export declare const AsyncMultiSelect: import("react").ForwardRefExoticComponent<AsyncMultiSelectProps & import("react").RefAttributes<HTMLInputElement>>;
