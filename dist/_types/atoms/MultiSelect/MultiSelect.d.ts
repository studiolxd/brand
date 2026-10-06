import { Select as BaseSelect } from '@base-ui/react/select';
import './MultiSelect.css';
/**
 * Los dos textos que el control emite por su cuenta: el marcador de sitio sin
 * nada elegido y el nombre del aspa de cada ficha. Los dos son cromo — dicen
 * lo mismo en toda la suite, y el segundo solo interpola la etiqueta de la
 * opción, que es un dato.
 */
export interface MultiSelectMessages {
    /** Marcador de sitio de la caja sin valores elegidos. */
    placeholder: string;
    /** Nombre accesible del aspa de una ficha, con la etiqueta de su opción. */
    remove: (label: string) => string;
}
export interface MultiSelectOption {
    value: string;
    label: string;
    'aria-label'?: string;
}
export interface MultiSelectProps {
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    /**
     * Marcador de sitio sin valores elegidos. **Sin default**: sale de
     * `multiSelect.placeholder` del `BrandMessagesProvider`.
     */
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
    /**
     * aria-label del botón que quita un valor. **Sin default**: sale de
     * `multiSelect.remove` del `BrandMessagesProvider`.
     */
    removeLabel?: (label: string) => string;
    /**
     * Nodo DOM donde montar el portal del dropdown (reenviado a Base UI `Portal.container`).
     * Por defecto, el nodo de la superficie que llegue por contexto:
     * `SiteShell` publica el suyo, de modo que la capa hereda la talla de la
     * superficie pública en vez de abrirse a la de aplicación. Si no hay
     * superficie, `document.body` — que ya hereda el tema activado en la raíz
     * (`html.dark`/`[data-theme="dark"]`) sin configuración adicional. Pásalo
     * solo para llevar la capa a otro sitio: un `.surface-dark` **anidado**, el
     * cajón de un shell propio. Gana siempre.
     */
    container?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>['container'];
}
/**
 * Selección múltiple sin campo de texto, sobre el `Select` múltiple de Base UI
 * (no sobre su `Combobox`: sin `<input>`, la guía de Base UI manda al
 * `Select`). El teclado es suyo: flechas, Intro y Espacio abren; dentro de la
 * lista las flechas y Inicio/Fin recorren, Intro y Espacio marcan y desmarcan,
 * escribir salta a la opción que empieza por lo tecleado y Escape cierra y
 * devuelve el foco a la caja. La lista **sí recibe el foco** (es una lista de
 * Base UI, no un foco virtual). El `ref` va al elemento con `role="combobox"`,
 * que es lo enfocable, para que react-hook-form pueda enfocarlo al fallar la
 * validación.
 */
export declare const MultiSelect: import("react").ForwardRefExoticComponent<MultiSelectProps & import("react").RefAttributes<HTMLDivElement>>;
