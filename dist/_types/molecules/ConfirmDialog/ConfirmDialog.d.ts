import { type ReactNode } from 'react';
import { type ModalProps } from '../Modal/Modal';
import './ConfirmDialog.css';
export interface ConfirmDialogProps {
    open: boolean;
    /** Título del diálogo: la pregunta, no «Confirmar». */
    title: string;
    /** El cuerpo de la pregunta: qué va a pasar y qué no se puede deshacer. */
    description?: ReactNode;
    /** Contenido extra bajo la descripción (un aviso, la lista de lo que se borra). */
    children?: ReactNode;
    /**
     * Se llama al confirmar. Si devuelve una promesa, el diálogo se queda
     * abierto y ocupado hasta que resuelve; si rechaza, sigue abierto para que
     * el consumidor cuente qué ha fallado.
     */
    onConfirm: () => void | Promise<void>;
    /** Se llama al cancelar, al cerrar con el aspa y al pulsar `Esc`. */
    onCancel: () => void;
    /**
     * Se llama cuando la promesa de `onConfirm` rechaza. El diálogo se queda
     * abierto y no cuenta nada por su cuenta: el error lo explica el consumidor,
     * que es quien sabe qué ha pasado (un `Toast`, un `Alert` en `children`).
     */
    onConfirmError?: (error: unknown) => void;
    /**
     * La acción destructiva no se puede deshacer: el botón de confirmar cambia
     * al lenguaje destructivo del sistema.
     */
    destructive?: boolean;
    /**
     * Rótulo del botón que confirma. Default castellano.
     * @default 'Confirmar'
     */
    confirmLabel?: string;
    /**
     * Rótulo del botón que cancela. Default castellano.
     * @default 'Cancelar'
     */
    cancelLabel?: string;
    /**
     * Rótulo del botón de confirmar mientras la acción está en curso. Default castellano.
     * @default 'Confirmando…'
     */
    pendingLabel?: string;
    /**
     * Etiqueta del aspa de cierre. Default castellano.
     * @default 'Cerrar'
     */
    closeLabel?: string;
    /** Nodo donde montar el portal, como en `Modal`. */
    container?: ModalProps['container'];
    /** Se añade DESPUÉS de las clases propias del pie del diálogo. */
    className?: string;
}
/**
 * La pregunta antes de una acción que no se puede deshacer: borrar una
 * organización, revocar una clave, expulsar a alguien de un equipo.
 *
 * Es el `Modal` del sistema con dos botones y una decisión de diseño: **el
 * foco arranca en «Cancelar»**. Un diálogo destructivo que abre con el foco en
 * el botón que destruye convierte un `Enter` de más en una pérdida de datos.
 *
 * `onConfirm` puede devolver una promesa. Mientras está en curso el diálogo se
 * queda abierto y ocupado —no se cierra en falso ni deja pulsar dos veces— y
 * se cierra solo al resolver. Si rechaza, sigue abierto: el error lo cuenta el
 * consumidor, que es quien sabe qué ha pasado.
 */
export declare function ConfirmDialog({ open, title, description, children, onConfirm, onCancel, onConfirmError, destructive, confirmLabel, cancelLabel, pendingLabel, closeLabel, container, className, }: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
