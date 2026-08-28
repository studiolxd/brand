import './Paragraph.css';
export interface ParagraphProps extends Omit<React.ComponentPropsWithoutRef<'p'>, 'children'> {
    /** Tamaño: `small` para notas y metadatos, `large` para entradillas. */
    size?: 'small' | 'default' | 'large';
    children: React.ReactNode;
}
export declare const Paragraph: import("react").ForwardRefExoticComponent<ParagraphProps & import("react").RefAttributes<HTMLParagraphElement>>;
