import { type ReactNode } from 'react';
import './RadioGroup.css';
export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
    /** Opción marcada (controlado). Con él, el estado lo lleva el consumidor. */
    value?: string;
    /** Opción marcada al montar (no controlado). */
    defaultValue?: string;
    /** Se llama con el `value` de la opción elegida. */
    onValueChange?: (value: string) => void;
    /**
     * `name` que comparten todas las opciones — lo que las hace un grupo para el
     * navegador y para el envío del formulario. Sin él se genera uno.
     */
    name?: string;
    /** Deshabilita todas las opciones del grupo. */
    disabled?: boolean;
    /** Talla del sistema para todas las opciones. */
    size?: 'sm' | 'md' | 'lg';
    /** Pone en error todas las opciones del grupo. */
    error?: boolean;
    /** Apiladas (por defecto) o en fila. */
    orientation?: 'vertical' | 'horizontal';
    children: ReactNode;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * La raíz de un grupo de opciones excluyentes: reparte el `name`, sabe cuál
 * está marcada y avisa cuando cambia. Hasta ahora `Radio` era un input suelto
 * y cada producto se montaba el estado y el `name` por su cuenta.
 *
 * Funciona **controlado** (`value` + `onValueChange`) o **no controlado**
 * (`defaultValue`), como el resto de controles del sistema. Las opciones son
 * `RadioField` —marca y texto— o `Radio` a pelo; las dos lo leen del grupo, así
 * que dentro no hay que repetir `name`, `checked` ni `size`.
 *
 * El **nombre accesible** no es una prop: lo pone un `Fieldset` alrededor (su
 * `legend` es el rótulo del grupo) o un `aria-label`/`aria-labelledby`, que
 * viajan al `role="radiogroup"` con el resto de `{...rest}`.
 */
export declare function RadioGroup({ value: valueProp, defaultValue, onValueChange, name: nameProp, disabled, size, error, orientation, children, className, ...rest }: RadioGroupProps): import("react/jsx-runtime").JSX.Element;
