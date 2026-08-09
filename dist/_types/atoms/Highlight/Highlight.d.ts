import './Highlight.css';
type HighlightWeight = 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
type HighlightSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
interface HighlightProps {
    /** Texto destacado. */
    text: string;
    /** Tamaño tipográfico. Por defecto usa el token del componente (size 8 = 40px). */
    size?: HighlightSize;
    /** Peso tipográfico. Por defecto usa el token del componente (medium). */
    weight?: HighlightWeight;
    /** Alineación horizontal del bloque. */
    align?: 'left' | 'center' | 'right';
    /** Alineación del texto dentro del bloque. */
    textAlign?: 'left' | 'center' | 'right';
    /** Clases adicionales. */
    className?: string;
}
export declare function Highlight({ text, size, weight, align, textAlign, className }: HighlightProps): import("react/jsx-runtime").JSX.Element;
export {};
