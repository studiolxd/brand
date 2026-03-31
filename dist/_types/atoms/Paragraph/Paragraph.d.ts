import './Paragraph.css';
interface ParagraphProps {
    /** Tamaño del texto del párrafo. */
    size?: 'small' | 'default' | 'large';
    children: React.ReactNode;
}
export declare function Paragraph({ size, children }: ParagraphProps): import("react/jsx-runtime").JSX.Element;
export {};
