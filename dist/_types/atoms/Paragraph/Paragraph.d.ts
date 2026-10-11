import './Paragraph.css';
/** Talla del párrafo: un peldaño por debajo del cuerpo (`sm`), el cuerpo (`md`) y uno por encima (`lg`). */
export type ParagraphSize = 'sm' | 'md' | 'lg';
export interface ParagraphProps extends Omit<React.ComponentPropsWithoutRef<'p'>, 'children'> {
    /**
     * Talla: `sm` para notas y metadatos, `lg` para entradillas. Default `md`
     * (el cuerpo).
     */
    size?: ParagraphSize;
    children: React.ReactNode;
}
export declare const Paragraph: import("react").ForwardRefExoticComponent<ParagraphProps & import("react").RefAttributes<HTMLParagraphElement>>;
