import './CodeBlock.css';
export interface CodeBlockProps {
    /** Código a mostrar. Texto plano o nodos ya resaltados por un highlighter externo. */
    children: React.ReactNode;
    /** Etiqueta de lenguaje opcional (ej. "tsx", "bash"), mostrada como Tag en la cabecera. */
    language?: string;
    /** Muestra un botón de copiar al portapapeles en la cabecera. Default: `false`. */
    copyable?: boolean;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
}
export declare function CodeBlock({ children, language, copyable, className }: CodeBlockProps): import("react").JSX.Element;
