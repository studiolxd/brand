import { Popover as BasePopover } from '@base-ui-components/react/popover';
import './MultiSelect.css';
export interface MultiSelectOption {
    value: string;
    label: string;
    'aria-label'?: string;
}
export interface MultiSelectProps {
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onValueChange?: (value: string[]) => void;
    id?: string;
    /** Nombre del campo en el formulario: se monta un input oculto por valor elegido. */
    name?: string;
    /** Marca el estado de error: aplica la clase `multi-select--error` y `aria-invalid`. */
    error?: boolean;
    /** Se llama al salir del disparador (react-hook-form lo usa para validar). */
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
    /**
     * Nombre accesible cuando el control va suelto. En un campo lo nombra la
     * etiqueta por `aria-labelledby`: no lo pongas ahí.
     */
    'aria-label'?: string;
    /** Id de la etiqueta que nombra el control (lo pone el campo). */
    'aria-labelledby'?: string;
    /** Ids de ayuda/error que describen el control (lo pone el campo). */
    'aria-describedby'?: string;
    /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
    removeLabel?: (label: string) => string;
    /**
     * Nodo DOM donde montar el portal del dropdown (reenviado a Base UI
     * `Portal.container`). Por defecto se monta en `document.body`, que
     * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasarlo cuando el
     * MultiSelect vive dentro de un `.surface-dark` **anidado** (no en la
     * raíz), ya que ese contexto no llega a `document.body` por la cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof BasePopover.Portal>['container'];
}
/**
 * Selección múltiple. El `ref` va al **disparador** (el `div` con
 * `role="combobox"`), para que react-hook-form pueda enfocarlo al fallar la
 * validación.
 */
export declare const MultiSelect: import("react").ForwardRefExoticComponent<MultiSelectProps & import("react").RefAttributes<HTMLDivElement>>;
