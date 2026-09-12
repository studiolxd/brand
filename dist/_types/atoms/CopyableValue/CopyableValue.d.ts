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
export declare const CopyableValue: import("react").ForwardRefExoticComponent<CopyableValueProps & import("react").RefAttributes<HTMLSpanElement>>;
