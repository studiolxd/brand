import type { ReactNode } from 'react';
import { type HeadingLevel, type HeadingSize } from '../../atoms/Heading/Heading';
import { type IconName } from '../../atoms/Icon/Icon';
import { type NumberBadgeVariant } from '../../atoms/NumberBadge/NumberBadge';
import './Steps.css';
export interface StepItem {
    /** Clave de React. Sin ella se usa la posición. */
    id?: string;
    /** Título del paso. */
    title: ReactNode;
    /** Qué pasa en este paso. */
    description?: ReactNode;
    /** Icono junto al título, del catálogo del sistema. */
    icon?: IconName;
}
export interface StepsProps {
    /** Los pasos, en orden. El número lo pone el componente. */
    items: StepItem[];
    /** Uno debajo de otro (por defecto) o en fila. */
    orientation?: 'vertical' | 'horizontal';
    /** Color del número. Por defecto `primary`. */
    badgeVariant?: NumberBadgeVariant;
    /** Nivel semántico del título de cada paso. Por defecto `3`. */
    titleLevel?: HeadingLevel;
    /** Talla del título de cada paso. Por defecto `4` (20px). */
    titleSize?: HeadingSize;
    /** Nombre accesible de la lista, si la sección que la contiene no lo da ya. */
    label?: string;
    className?: string;
    id?: string;
}
/**
 * Un proceso numerado: los pasos de una metodología, de un alta, de una
 * matrícula. Es una lista ordenada de verdad (`ol`), así que el lector de
 * pantalla anuncia «lista de 4 elementos» y el orden sin que nadie lo escriba.
 *
 * El número se pinta con `NumberBadge` y va marcado como decorativo: la
 * posición ya la da el `ol`, y repetirla en voz alta sobraría. La línea que
 * une un paso con el siguiente es la línea de separación del sistema.
 */
export declare function Steps({ items, orientation, badgeVariant, titleLevel, titleSize, label, className, id, }: StepsProps): import("react/jsx-runtime").JSX.Element;
