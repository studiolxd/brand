import './Paragraph.css';
interface ParagraphProps {
    /** Tamaño del texto del párrafo. */
    size?: 'small' | 'default' | 'large';
    /** Clases adicionales. */
    className?: string;
    children: React.ReactNode;
}
export declare function Paragraph({ size, className, children }: ParagraphProps): import("react/jsx-runtime").JSX.Element;
export {};
