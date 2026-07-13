import './Textarea.css';
export interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
    /** Tamaño del textarea. */
    size?: 'sm' | 'md' | 'lg';
    /** Marca el estado de error: aplica la clase `textarea--error` y `aria-invalid`. */
    error?: boolean;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
    /** @deprecated Usa el atributo nativo `aria-describedby`. */
    describedBy?: string;
}
/**
 * Textarea. Extiende los atributos nativos de `<textarea>` y reenvía `{...rest}`
 * al elemento (incluye `ref` para react-hook-form; `data-*`, `aria-*`, `maxLength`,
 * `required`, etc.).
 */
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
