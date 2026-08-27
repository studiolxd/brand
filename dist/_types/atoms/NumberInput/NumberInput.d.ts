import { type ComponentPropsWithoutRef } from 'react';
import './NumberInput.css';
export interface NumberInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    decimal?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
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
     * aria-label del botón de decremento. Default: "Decrementar" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    decrementLabel?: string;
    /**
     * aria-label del botón de incremento. Default: "Incrementar" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    incrementLabel?: string;
    onChange?: (value: number) => void;
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
