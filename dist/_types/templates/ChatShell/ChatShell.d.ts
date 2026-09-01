import { type ReactNode } from 'react';
import './ChatShell.css';
export interface ChatShellProps extends React.ComponentPropsWithoutRef<'div'> {
    /**
     * La columna de conversaciones, normalmente un `ConversationList`. Sin ella,
     * el armazón es solo hilo y composer — que es como se monta dentro de un
     * `AppShell`, donde la columna vive en el `Sidebar`.
     *
     * Por debajo del punto de ruptura no desaparece ni se encoge: se pliega a un
     * cajón (`Sheet`) que abre un botón en la cabecera.
     */
    list?: ReactNode;
    /** La cabecera del hilo: el título de la conversación y sus controles. */
    header?: ReactNode;
    /** El hilo: un `ConversationThread`. */
    children: ReactNode;
    /** La caja de escribir: un `MessageComposer`. */
    composer?: ReactNode;
    /**
     * `aria-label` de la columna de conversaciones y título del cajón en
     * pantallas estrechas. Default: "Conversaciones" (castellano). Solo se usa
     * si hay `list`.
     */
    listLabel?: string;
    /**
     * Nombre accesible del botón que abre el cajón de conversaciones. Default:
     * "Abrir conversaciones" (castellano).
     */
    listTriggerLabel?: string;
    /**
     * Estado controlado del cajón de conversaciones. Sin él, el armazón lo lleva
     * por dentro; con él, el producto puede cerrarlo al abrir una conversación.
     * En escritorio no se usa: ahí la lista es columna y siempre está a la vista.
     */
    listOpen?: boolean;
    /** Avisa de cada apertura y cierre del cajón de conversaciones. */
    onListOpenChange?: (open: boolean) => void;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * El armazón de una pantalla de chat: tres zonas —la columna de
 * conversaciones, el hilo y la caja de escribir— colocadas y con el scroll en
 * el sitio correcto.
 *
 * Es **solo maqueta**: no lleva estado de producto ni sabe nada de mensajes.
 * Quién habla, qué se manda y qué conversación está abierta lo lleva el
 * producto y entra por los slots. Lo único que sí lleva es el cajón de
 * conversaciones de las pantallas estrechas, que es maqueta también.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export declare const ChatShell: import("react").ForwardRefExoticComponent<ChatShellProps & import("react").RefAttributes<HTMLDivElement>>;
