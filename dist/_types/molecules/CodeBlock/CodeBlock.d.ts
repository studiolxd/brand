import './CodeBlock.css';
export interface CodeBlockProps extends React.ComponentPropsWithoutRef<'div'> {
    /** Código a mostrar. Texto plano o nodos ya resaltados por un highlighter externo. */
    children: React.ReactNode;
    /** Etiqueta de lenguaje opcional (ej. "tsx", "bash"), mostrada como Tag en la cabecera. */
    language?: string;
    /** Muestra un botón de copiar al portapapeles en la cabecera. Default: `false`. */
    copyable?: boolean;
    /**
     * Fuerza la variante de una línea (código a la izquierda con su propio
     * scroll horizontal, lenguaje y botón de copiar a la derecha, centrados en
     * vertical, sin cabecera aparte) o la multilínea (cabecera arriba, código
     * debajo). Sin la prop se detecta solo: `children` como cadena sin saltos
     * de línea es una línea; con saltos de línea, o con nodos ya resaltados por
     * un highlighter externo (no se pueden inspeccionar como cadena), es
     * multilínea.
     */
    singleLine?: boolean;
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
export declare function CodeBlock({ children, language, copyable, singleLine, copyLabel, copiedLabel, codeLabel, className, ...rest }: CodeBlockProps): import("react/jsx-runtime").JSX.Element;
/**
 * Los tipos de token que el sistema sabe pintar. Es un vocabulario cerrado a
 * propósito: un resaltador emite decenas de ámbitos y aquí se mapean a estos
 * quince, que son los que tienen tinta propia. Ver la doc de `CodeBlock`
 * § «Resaltado de sintaxis» para la tabla de equivalencias con shiki.
 */
export type CodeTokenType = 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'variable' | 'property' | 'punctuation' | 'operator' | 'tag' | 'attribute' | 'constant' | 'regexp' | 'inserted' | 'deleted';
export interface CodeTokenProps extends React.ComponentPropsWithoutRef<'span'> {
    /** Qué es este trozo de código. Decide la tinta, que sale de un token. */
    type: CodeTokenType;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
}
/**
 * Un trozo de código con su tinta, para meter dentro de `CodeBlock`.
 *
 * `CodeBlock` **no resalta sintaxis**: el resaltador (shiki, prism, el que sea)
 * es del producto. Lo que pone el sistema es el vocabulario: el consumidor
 * recorre los tokens que le devuelve su resaltador, traduce el ámbito a un
 * `CodeTokenType` y envuelve el texto con este componente. Así el color sale de
 * un token del sistema —con su par en superficie oscura— y no de un
 * `style={{ color }}` inline, que se salta la cascada y el tema.
 *
 * ```tsx
 * <CodeBlock language="ts">
 *   {tokens.map((t, i) => <CodeToken key={i} type={tipo(t.scope)}>{t.content}</CodeToken>)}
 * </CodeBlock>
 * ```
 */
export declare function CodeToken({ type, className, children, ...rest }: CodeTokenProps): import("react/jsx-runtime").JSX.Element;
