import './PasswordField.css';
export interface PasswordFieldProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
    /**
     * Etiqueta del campo. **Opcional**: si se omite, el componente renderiza solo
     * el campo + toggle (sin `<label>`, sin `__error`/`__helper`), para componerlo
     * dentro de una capa de formulario propia.
     */
    label?: string;
    /** Oculta visualmente el label (solo aplica cuando hay `label`). Default: true. */
    labelHidden?: boolean;
    /** Marca el estado de error (borde) y `aria-invalid` en el input. */
    error?: boolean;
    /** Mensaje de error propio del componente (solo se renderiza si hay `label`-mode completo). */
    errorMessage?: string;
    /** Texto de ayuda propio del componente. */
    helperText?: string;
    /** Tamaño del campo. */
    size?: 'sm' | 'md' | 'lg';
    /** aria-label del toggle cuando la contraseña está oculta. Default: "Mostrar contraseña". */
    showPasswordLabel?: string;
    /** aria-label del toggle cuando la contraseña es visible. Default: "Ocultar contraseña". */
    hidePasswordLabel?: string;
    /**
     * Se añade DESPUÉS de las clases propias, sobre el wrapper raíz `.password-field`.
     * (El `ref` y el resto de props nativas — `name`, `onChange`, `data-*`, `aria-*`… —
     * se reenvían al `<input>` interno, no al wrapper.)
     */
    className?: string;
}
/**
 * Campo de contraseña con toggle mostrar/ocultar integrado.
 *
 * El `ref` y `{...rest}` (props nativas de `<input>`) se reenvían al `<input>`
 * interno — no al wrapper — para soportar react-hook-form (`{...register()}`) y la
 * inyección de props del consumidor (`id`, `aria-describedby`, `aria-invalid`,
 * `data-*`…). El `className` se aplica al wrapper raíz.
 */
export declare const PasswordField: import("react").ForwardRefExoticComponent<PasswordFieldProps & import("react").RefAttributes<HTMLInputElement>>;
