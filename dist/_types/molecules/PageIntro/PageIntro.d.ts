import type { ReactNode } from 'react';
import { type HeadingProps } from '../../atoms/Heading/Heading';
import './PageIntro.css';
export interface PageIntroProps {
    /** El título de la página: un `Heading` de nivel 1 (o el que diga `level`). */
    title: ReactNode;
    /** La frase bajo el título, opcional: va como entradilla (`Paragraph size="large"`, un peldaño por encima del cuerpo). */
    description?: ReactNode;
    /** Más texto bajo la frase (otro `Paragraph`, una lista…): mismo aire. */
    children?: ReactNode;
    /** Nivel del título: 1 por defecto (una cabecera de página). */
    level?: HeadingProps['level'];
    /** Talla tipográfica del título; si no, la que el Heading da a su nivel. */
    size?: HeadingProps['size'];
    className?: string;
}
/**
 * Cabecera de una página: el título y, si hace falta, una frase debajo, con
 * el aire justo entre los dos. Es un `header`: lo que abre acceso, registro,
 * recuperación… y cualquier página que empiece por su nombre. Va como celda
 * de `Columns` o directamente en el `Container`.
 */
export declare function PageIntro({ title, description, level, size, className, children }: PageIntroProps): import("react/jsx-runtime").JSX.Element;
