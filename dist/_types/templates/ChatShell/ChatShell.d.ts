import { type ReactNode } from 'react';
import './ChatShell.css';
export interface ChatShellProps extends React.ComponentPropsWithoutRef<'div'> {
    /**
     * La columna de conversaciones, normalmente un `ConversationList`. Sin ella,
     * el armazón es solo hilo y composer — que es como se monta dentro de un
     * `AppShell`, donde la columna vive en el `Sidebar`.
     */
    list?: ReactNode;
    /** La cabecera del hilo: el título de la conversación y sus controles. */
    header?: ReactNode;
    /** El hilo: un `ConversationThread`. */
    children: ReactNode;
    /** La caja de escribir: un `MessageComposer`. */
    composer?: ReactNode;
    /**
     * `aria-label` de la columna de conversaciones. Default: "Conversaciones"
     * (castellano). Solo se usa si hay `list`.
     */
    listLabel?: string;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * El armazón de una pantalla de chat: tres zonas —la columna de
 * conversaciones, el hilo y la caja de escribir— colocadas y con el scroll en
 * el sitio correcto.
 *
 * Es **solo maqueta**: no lleva estado ni sabe nada de mensajes. Quién habla,
 * qué se manda y qué conversación está abierta lo lleva el producto y entra
 * por los slots.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export declare const ChatShell: import("react").ForwardRefExoticComponent<ChatShellProps & import("react").RefAttributes<HTMLDivElement>>;
