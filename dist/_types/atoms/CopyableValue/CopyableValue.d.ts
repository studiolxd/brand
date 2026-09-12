import { type ReactNode } from 'react';
import './CopyableValue.css';
export interface CopyableValueProps {
    /** El valor a mostrar y, por defecto, a copiar. Texto o nodos. */
    children: ReactNode;
    /**
     * Qué se copia. Por defecto, el texto de `children`. Solo hace falta cuando
     * lo que se ve y lo que se copia no coinciden (un valor abreviado, una URL
     * con el protocolo escondido).
     */
    copyText?: string;
    /**
     * Nombre accesible del botón de copiar. Default castellano.
     * @default 'Copiar'
     */
    copyLabel?: string;
    /**
     * Acuse tras copiar, anunciado en una región viva. Default castellano.
     * @default 'Copiado'
     */
    copiedLabel?: string;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Un valor con su botón de copiar pegado al final: nunca al margen ni en su
 * propia línea. Es el mecanismo de `DescriptionDetails copyable` suelto de la
 * lista de definición, para el dato que se copia y no vive en una `<dl>` —una
 * celda de tabla con una URL de endpoint, un identificador dentro de un
 * párrafo—. El valor sigue siendo **texto corriente**: un dato que se copia no
 * es código.
 */
export declare const CopyableValue: import("react").ForwardRefExoticComponent<CopyableValueProps & import("react").RefAttributes<HTMLSpanElement>>;
