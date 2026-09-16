import { type ComponentProps, type ReactNode } from 'react';
import './MessageComposer.css';
/**
 * El cromo de la caja de escribir: el marcador del campo vacío y el rótulo del
 * botón que manda. Son las dos palabras que dicen lo mismo en cualquier chat
 * de la suite, así que van en el catálogo.
 *
 * Lo que NO va aquí es la línea de ayuda (`helperText`): la escribe el
 * producto —el atajo de teclado, un aviso de privacidad— y nunca tuvo default
 * en ningún idioma.
 */
export interface MessageComposerMessages {
    /** Marcador del campo vacío. */
    placeholder: string;
    /** Rótulo del botón de enviar. Es también su nombre accesible. */
    send: string;
}
export interface MessageComposerProps extends Omit<ComponentProps<'div'>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    /**
     * Marcador del campo vacío. **Sin default**: sin él, sale de
     * `messageComposer.placeholder` del `BrandMessagesProvider`.
     */
    placeholder?: string;
    disabled?: boolean;
    /**
     * Texto del botón de enviar. Es también su nombre accesible: no hay
     * `aria-label` que lo contradiga. **Sin default**: sin él, sale de
     * `messageComposer.send`.
     */
    sendLabel?: string;
    /**
     * Línea de ayuda bajo el marco, enlazada al campo con `aria-describedby`
     * (el atajo de teclado, un aviso de privacidad…). **Sin valor por defecto en
     * ningún idioma**: es la única prop de texto del sistema que no lo tiene,
     * porque su contenido depende del producto y no de la traducción de una
     * cadena. Sin ella no se pinta la línea.
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
 * La línea de ayuda (`helperText`) no trae texto por defecto: lo pone el
 * producto, en su idioma.
 *
 * El campo es un `Textarea` en variante `bare` —sin caja propia—, así que el
 * marco, el fondo y el anillo de foco los dibuja el composer: el átomo no se
 * pisa desde fuera.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export declare const MessageComposer: import("react").ForwardRefExoticComponent<Omit<MessageComposerProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
