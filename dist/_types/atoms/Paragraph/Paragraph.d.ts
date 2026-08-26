import './Paragraph.css';
export interface ParagraphProps {
    /** Tamaño: `small` para notas y metadatos, `large` para entradillas. */
    size?: 'small' | 'default' | 'large';
    /** Clases adicionales. */
    className?: string;
    children: React.ReactNode;
}
export declare function Paragraph({ size, className, children }: ParagraphProps): import("react/jsx-runtime").JSX.Element;
