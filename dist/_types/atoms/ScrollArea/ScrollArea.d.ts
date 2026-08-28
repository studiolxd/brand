import { type ReactNode } from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import './ScrollArea.css';
export interface ScrollAreaProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>, 'className'> {
    /**
     * Qué barras se muestran. `vertical` por defecto; `both` para contenido que
     * también se sale de ancho (una tabla, un diagrama).
     */
    orientation?: 'vertical' | 'horizontal' | 'both';
    /**
     * Nombre accesible del área. Un recuadro que se desplaza con el teclado tiene
     * que decir de qué es; sin él el lector solo anuncia «región desplazable».
     */
    label?: string;
    children: ReactNode;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Un recuadro con desplazamiento propio y barra del sistema (Base UI Scroll
 * Area): la lista de un panel lateral, el resultado largo de una consulta, el
 * lienzo de un editor.
 *
 * **El alto lo pone quien lo usa** (`className` o el contenedor): el componente
 * no decide cuánto mide el hueco, solo cómo se desplaza dentro.
 *
 * Base UI hace la zona alcanzable con el teclado cuando de verdad hay
 * desplazamiento, y la barra aparece al usarla.
 */
export declare const ScrollArea: import("react").ForwardRefExoticComponent<ScrollAreaProps & import("react").RefAttributes<HTMLDivElement>>;
