import './Input.css';
export interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
    /** Tamaño del input. Redeclara el `size` nativo (que es numérico). */
    size?: 'sm' | 'md' | 'lg';
    /** Marca el estado de error: aplica la clase `input--error` y `aria-invalid`. */
    error?: boolean;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
    /** @deprecated Usa el atributo nativo `aria-describedby`. */
    describedBy?: string;
    /** @deprecated Usa el atributo nativo `aria-label`. */
    ariaLabel?: string;
}
/**
 * Input de texto. Extiende los atributos nativos de `<input>` y reenvía `{...rest}`
 * al elemento (incluye `ref`, para react-hook-form; `data-*`, `aria-*`, `required`,
 * `min`/`max`/`step`, etc.).
 *
 * Nota: `type` hereda la unión nativa completa (incluye `date`, `datetime-local`…).
 * Pasar `type="checkbox"/"radio"/"file"…` renderiza pero no aplica su estilado
 * específico — para eso existen los átomos dedicados del design system.
 */
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
