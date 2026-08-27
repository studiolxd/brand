import { type ComponentProps, type ReactNode } from 'react';
import './MessageComposer.css';
export interface MessageComposerProps extends Omit<ComponentProps<'div'>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    placeholder?: string;
    disabled?: boolean;
    /** Texto del botón de enviar. Es también su nombre accesible: no hay `aria-label` que lo contradiga. */
    sendLabel?: string;
    /**
     * Línea de ayuda bajo el marco, enlazada al campo con `aria-describedby`.
     * Por defecto, el atajo de teclado en castellano. `null` la quita.
     */
    helperText?: ReactNode;
    /** Contenido extra a la derecha del botón de enviar (p. ej. un botón de detener envío, o un selector de modelo). */
    actions?: ReactNode;
    /** `id` del textarea interno, para asociarlo con un `<label htmlFor>` externo. */
    inputId?: string;
    /** `aria-label` del textarea interno. */
    inputLabel?: string;
    /** `aria-labelledby` del textarea interno, alternativa a `inputLabel`. */
    inputLabelledBy?: string;
    /** Líneas que mide el campo en reposo. */
    rows?: number;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * La caja de escribir de un chat: el campo, el botón de enviar y la línea que
 * cuenta el atajo de teclado, todo dentro de un solo marco.
 *
 * El campo es un `Textarea` en variante `bare` —sin caja propia—, así que el
 * marco, el fondo y el anillo de foco los dibuja el composer: el átomo no se
 * pisa desde fuera.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export declare const MessageComposer: import("react").ForwardRefExoticComponent<Omit<MessageComposerProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
