import { type ComponentPropsWithoutRef } from 'react';
import './NumberInput.css';
/**
 * Los dos textos que el control emite por su cuenta: los nombres accesibles de
 * sus dos botones. Cromo puro — no dicen nada de qué se cuenta.
 */
export interface NumberInputMessages {
    /** Nombre accesible del botón que resta un paso. */
    decrement: string;
    /** Nombre accesible del botón que suma un paso. */
    increment: string;
}
/**
 * Cuándo avisa `onChange` de lo escrito a mano: con cada tecla (`'change'`, lo de
 * siempre) o una sola vez al confirmar (`'blur'`). Los botones − y + avisan al
 * momento en los dos modos.
 */
export type NumberInputCommitMode = 'change' | 'blur';
export interface NumberInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
    /**
     * Valor controlado. `null` es «sin valor»: el campo se muestra vacío (y el
     * `placeholder` se ve). Sigue siendo controlado; `undefined` es no controlado.
     */
    value?: number | null;
    /** Valor inicial no controlado (default `0`). `null` arranca vacío. */
    defaultValue?: number | null;
    min?: number;
    max?: number;
    step?: number;
    decimal?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    /**
     * Variante para filas de lista (`trailing` de `ListItem`): botones y cifra
     * justos, del ancho de 2–3 dígitos, sin estirarse. Es una variante de la
     * talla `sm`, no una talla más: manda sobre `size`.
     */
    compact?: boolean;
    /**
     * Cuándo se avisa de lo escrito a mano. `'change'` (por defecto): con cada
     * tecla. `'blur'`: una sola vez al salir del campo o al pulsar Enter; Escape
     * descarta lo escrito y vuelve al último valor. Con `onEmpty`, dejar el campo
     * vacío se avisa igual, al confirmar. − y + avisan al momento en los dos modos.
     */
    commitMode?: NumberInputCommitMode;
    error?: boolean;
    id?: string;
    name?: string;
    /** @deprecated Usa el atributo nativo `aria-describedby`. */
    describedBy?: string;
    /** @deprecated Usa el atributo nativo `aria-label`. */
    ariaLabel?: string;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
    /**
     * aria-label del botón de decremento. **Sin default**: sale de
     * `numberInput.decrement` del `BrandMessagesProvider`.
     */
    decrementLabel?: string;
    /**
     * aria-label del botón de incremento. **Sin default**: sale de
     * `numberInput.increment` del `BrandMessagesProvider`.
     */
    incrementLabel?: string;
    onChange?: (value: number) => void;
    /**
     * Se llama cuando quien teclea deja el campo vacío. Sin ella el campo se
     * comporta como siempre (vaciar no emite nada y al salir recupera el último
     * número); con ella, vaciar **es** un valor: el campo pasa a «sin valor» y
     * esta función avisa de ello.
     */
    onEmpty?: () => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
/**
 * Campo numérico con incremento y decremento. El `ref` y el resto de props
 * nativas de `<input>` van al input real (react-hook-form, `aria-*`, `data-*`,
 * `autoComplete`, `required`…); `className` se concatena a las clases del
 * contenedor.
 */
export declare const NumberInput: import("react").ForwardRefExoticComponent<NumberInputProps & import("react").RefAttributes<HTMLInputElement>>;
