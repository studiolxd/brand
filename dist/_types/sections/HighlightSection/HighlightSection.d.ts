import './HighlightSection.css';
interface HighlightSectionProps {
    id?: string;
    /** Texto destacado. */
    text: string;
    /** Alineación horizontal del bloque de texto. */
    align?: 'left' | 'center' | 'right';
    /** Alineación del texto dentro del bloque. */
    textAlign?: 'left' | 'center' | 'right';
    /** Clases adicionales para el container. */
    className?: string;
}
export declare function HighlightSection({ id, text, align, textAlign, className }: HighlightSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
