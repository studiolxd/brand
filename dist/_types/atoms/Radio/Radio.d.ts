import './Radio.css';
export interface RadioProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
    /** Tamaño del radio. Redeclara el `size` nativo (que es numérico). */
    size?: 'sm' | 'md' | 'lg';
    /** Marca el estado de error: aplica la clase `radio--error` y `aria-invalid`. */
    error?: boolean;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * Radio (input nativo `type="radio"`). Extiende los atributos nativos de `<input>`
 * y reenvía `{...rest}` al elemento (incluye `ref` para react-hook-form; `data-*`,
 * `aria-*`, `required`, `checked`, `value`, handlers, etc.).
 *
 * Dentro de un `RadioGroup` toma de él el `name`, si está marcado, la talla, el
 * error y el estado deshabilitado, y le avisa al elegirse. Lo que se pase a
 * mano manda sobre lo que dice el grupo.
 */
export declare const Radio: import("react").ForwardRefExoticComponent<RadioProps & import("react").RefAttributes<HTMLInputElement>>;
