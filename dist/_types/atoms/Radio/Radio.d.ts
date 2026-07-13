import './Radio.css';
export interface RadioProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
    /** Tamaño del radio. Redeclara el `size` nativo (que es numérico). */
    size?: 'sm' | 'md' | 'lg';
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * Radio (input nativo `type="radio"`). Extiende los atributos nativos de `<input>`
 * y reenvía `{...rest}` al elemento (incluye `ref` para react-hook-form; `data-*`,
 * `aria-*`, `required`, `checked`, `value`, handlers, etc.).
 */
export declare const Radio: import("react").ForwardRefExoticComponent<RadioProps & import("react").RefAttributes<HTMLInputElement>>;
