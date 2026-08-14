import './CodeBlock.css';
export interface CodeBlockProps {
    /** Código a mostrar. Texto plano o nodos ya resaltados por un highlighter externo. */
    children: React.ReactNode;
    /** Etiqueta de lenguaje opcional (ej. "tsx", "bash"), mostrada como Tag en la cabecera. */
    language?: string;
    /** Muestra un botón de copiar al portapapeles en la cabecera. Default: `false`. */
    copyable?: boolean;
    /**
     * aria-label del botón de copiar. Default: "Copiar código" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    copyLabel?: string;
    /** aria-label del botón tras copiar. Default: "Copiado" (castellano). */
    copiedLabel?: string;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
}
export declare function CodeBlock({ children, language, copyable, copyLabel, copiedLabel, className, }: CodeBlockProps): import("react/jsx-runtime").JSX.Element;
