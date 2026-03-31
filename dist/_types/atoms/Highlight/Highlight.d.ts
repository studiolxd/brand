import './Highlight.css';
interface HighlightProps {
    /** Texto destacado. */
    text: string;
    /** Alineación horizontal del bloque. */
    align?: 'left' | 'center' | 'right';
    /** Alineación del texto dentro del bloque. */
    textAlign?: 'left' | 'center' | 'right';
    /** Clases adicionales. */
    className?: string;
}
export declare function Highlight({ text, align, textAlign, className }: HighlightProps): import("react/jsx-runtime").JSX.Element;
export {};
