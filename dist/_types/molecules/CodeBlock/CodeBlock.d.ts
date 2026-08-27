import './CodeBlock.css';
export interface CodeBlockProps extends React.ComponentPropsWithoutRef<'div'> {
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
    /**
     * Texto que se anuncia al lector de pantalla tras copiar. Default: "Copiado"
     * (castellano).
     */
    copiedLabel?: string;
    /**
     * Nombre accesible del área de código, que es focalizable por tener scroll
     * horizontal propio. Recibe el `language` cuando lo hay. Default en castellano.
     */
    codeLabel?: (language?: string) => string;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
}
/**
 * Bloque de código sobre superficie gris clara, con etiqueta de lenguaje y
 * botón de copiar opcionales. Extiende los atributos nativos de `<div>` y
 * reenvía `{...rest}` al raíz.
 */
export declare function CodeBlock({ children, language, copyable, copyLabel, copiedLabel, codeLabel, className, ...rest }: CodeBlockProps): import("react/jsx-runtime").JSX.Element;
