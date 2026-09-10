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
    /**
     * La acción principal de la página —«Invitar miembro», «Crear webhook»—, a la
     * derecha del título y en su misma fila. Una, o dos como mucho: la principal
     * y una alternativa (`Button variant="outline"`), en ese orden en el JSX. Las
     * acciones sobre los filtros van en `FilterBar actions`, y las que operan
     * sobre la tabla, en el `toolbar` del `DataTable`.
     */
    actions?: ReactNode;
    /** Nivel del título: 1 por defecto (una cabecera de página). */
    level?: HeadingProps['level'];
    /** Talla tipográfica del título; si no, la que el Heading da a su nivel. */
    size?: HeadingProps['size'];
    /**
     * El elemento que envuelve la cabecera: `header` por defecto. `div` para
     * cuando la cabecera abre una sección que ya vive dentro de otro `header`, o
     * cuando el molde de fuera necesita un elemento neutro.
     */
    as?: 'header' | 'div';
    className?: string;
}
/**
 * Cabecera de una página: el título y, si hace falta, una frase debajo, con
 * el aire justo entre los dos. Es un `header`: lo que abre acceso, registro,
 * recuperación… y cualquier página que empiece por su nombre. Va como celda
 * de `Columns` o directamente en el `Container`.
 *
 * Con `actions` sirve además de cabecera de una sección dentro de la página
 * (`level={2}`): el título a la izquierda y la acción principal a la derecha.
 */
export declare function PageIntro({ title, description, actions, level, size, as: Tag, className, children, }: PageIntroProps): import("react/jsx-runtime").JSX.Element;
