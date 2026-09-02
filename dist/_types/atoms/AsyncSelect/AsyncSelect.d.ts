import { Popover as BasePopover } from '@base-ui/react/popover';
import './AsyncSelect.css';
export interface AsyncSelectOption {
    value: string;
    label: string;
}
export interface AsyncSelectProps {
    onSearch: (query: string) => Promise<AsyncSelectOption[]>;
    value?: string | null;
    onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
    /** Label of the currently selected option — required when `value` is set so the component can display it */
    selectedOption?: AsyncSelectOption | null;
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
    /** Nombre del campo en el formulario: se monta un input oculto con el valor. */
    name?: string;
    /** Marca el estado de error: aplica la clase `async-select--error` y `aria-invalid`. */
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
     * aria-label del botón de limpiar selección. Default: "Limpiar selección" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    clearLabel?: string;
    /**
     * Nodo DOM donde montar el portal del dropdown (reenviado a Base UI
     * `Portal.container`). Por defecto se monta en `document.body`, que
     * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasarlo cuando el
     * AsyncSelect vive dentro de un `.surface-dark` **anidado** (no en la
     * raíz), ya que ese contexto no llega a `document.body` por la cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof BasePopover.Portal>['container'];
}
/**
 * Búsqueda con resultados asíncronos y un solo valor. El `ref` va al `<input>`
 * de búsqueda, que es lo que se enfoca.
 */
export declare const AsyncSelect: import("react").ForwardRefExoticComponent<AsyncSelectProps & import("react").RefAttributes<HTMLInputElement>>;
