import { type ReactNode } from 'react';
import './AnnotationThread.css';
export interface AnnotationEntry {
    /** Identificador único dentro del hilo. */
    id: string;
    /** Quién la escribió, tal cual se muestra. */
    author: string;
    /** Cuándo. `Date` o cadena ISO: el componente pone el `datetime` legible por máquina. */
    date: string | Date;
    /** El texto de la anotación. */
    body: ReactNode;
    /** Marca opcional delante del autor (un avatar, una inicial). */
    avatar?: ReactNode;
    /** Se marca como editada junto a la fecha. */
    edited?: boolean;
    /** Acciones de **esta** anotación: editar, borrar, citar. */
    actions?: ReactNode;
}
export interface AnnotationThreadProps extends React.ComponentPropsWithoutRef<'article'> {
    /** La anotación que abre el hilo. */
    annotation: AnnotationEntry;
    /** Las respuestas, en orden. */
    replies?: AnnotationEntry[];
    /** Estado del hilo. Un hilo resuelto se retira visualmente sin desaparecer. */
    status?: 'open' | 'resolved';
    /** Acciones del hilo entero: resolver, reabrir, seguir. Van al pie. */
    actions?: ReactNode;
    /** Con qué se responde: un `MessageComposer`, un `TextareaField`, un `Button`. */
    reply?: ReactNode;
    /** Idioma con el que se escribe la fecha. */
    locale?: string;
    /** Formato de la fecha. Por defecto, día y hora cortos. */
    dateFormat?: Intl.DateTimeFormatOptions;
    /** Rótulo del estado abierto. Por defecto, en castellano: «Abierta». */
    openLabel?: string;
    /** Rótulo del estado resuelto. Por defecto, en castellano: «Resuelta». */
    resolvedLabel?: string;
    /** Marca de anotación editada. Por defecto, en castellano: «editada». */
    editedLabel?: string;
    /**
     * Rótulo que cuenta las respuestas. Por defecto, en castellano:
     * «1 respuesta» / «N respuestas».
     */
    repliesLabel?: (count: number) => string;
    /** Nombre accesible del hilo. Por defecto, en castellano: «Hilo de anotaciones». */
    label?: string;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Un hilo de anotaciones sobre algo: el comentario de revisión de una lección,
 * la nota sobre un segmento de traducción. Cada anotación lleva **autor, fecha
 * y sus propias acciones**, el hilo tiene **estado** (abierta o resuelta) y se
 * responde al pie.
 *
 * No es `ConversationThread`: aquello es una conversación de usuario y
 * asistente, con burbujas, orden de emisor y desplazamiento automático. Aquí
 * todas las anotaciones son iguales, lo que importa es quién dijo qué y cuándo,
 * y si el asunto sigue abierto.
 */
export declare function AnnotationThread({ annotation, replies, status, actions, reply, locale, dateFormat, openLabel, resolvedLabel, editedLabel, repliesLabel, label, className, ...rest }: AnnotationThreadProps): import("react/jsx-runtime").JSX.Element;
