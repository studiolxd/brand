import './PasswordField.css';
import { type FieldOptionalProps } from '../_shared/FieldShell';
/**
 * Los dos textos que el campo emite por su cuenta: las dos caras del
 * interruptor de mostrar/ocultar. Son cromo —dicen lo mismo en toda la
 * suite—, y por eso salen del catálogo común.
 *
 * El `label`, el `placeholder`, el `helperText` y el `errorMessage` no están
 * aquí: son el contenido de ESTE campo.
 */
export interface PasswordFieldMessages {
    /** Nombre accesible del interruptor con la contraseña oculta. */
    show: string;
    /** Nombre accesible del interruptor con la contraseña a la vista. */
    hide: string;
}
export interface PasswordFieldProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'>, FieldOptionalProps {
    /**
     * Etiqueta del campo. **Opcional**: si se omite, el componente renderiza solo
     * el campo + toggle, sin `<label>`, para componerlo dentro de una capa de
     * formulario propia (el error y la ayuda se pintan igual si se pasan).
     */
    label?: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Solo aplica cuando hay `label`. Por defecto `false`: la etiqueta se ve,
     * como en `InputField`. Con la etiqueta oculta y sin `placeholder`, el
     * control usa el texto de la etiqueta como placeholder para no quedarse sin
     * pista visible. Sin valor, lo decide quien lo envuelva: dentro de un
     * `FieldRow` que no es la primera de la lista, la etiqueta se oculta sola.
     */
    labelHidden?: boolean;
    /** Marca el estado de error (borde) y `aria-invalid` en el input. */
    error?: boolean;
    /** Mensaje de error propio del componente. Se pinta bajo el campo y se enlaza con `aria-describedby`, haya o no `label`. */
    errorMessage?: string;
    /** Texto de ayuda propio del componente. */
    helperText?: string;
    /** Una acción bajo el campo: «¿Olvidaste tu contraseña?» (un `Link` del router). No es ayuda: enlace normal, a la izquierda, con su aire. */
    action?: React.ReactNode;
    /** Tamaño del campo. */
    size?: 'sm' | 'md' | 'lg';
    /**
     * aria-label del toggle cuando la contraseña está oculta. **Sin default**:
     * sale de `passwordField.show` del `BrandMessagesProvider`.
     */
    showPasswordLabel?: string;
    /**
     * aria-label del toggle cuando la contraseña es visible. **Sin default**:
     * sale de `passwordField.hide` del `BrandMessagesProvider`.
     */
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
