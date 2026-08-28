import { type ReactNode } from 'react';
import { ToggleGroup as BaseToggleGroup } from '@base-ui-components/react/toggle-group';
import './ToggleGroup.css';
type BaseToggleGroupProps = Omit<React.ComponentPropsWithoutRef<typeof BaseToggleGroup>, 'className' | 'value' | 'defaultValue' | 'onValueChange'>;
export interface ToggleGroupProps extends BaseToggleGroupProps {
    /**
     * Valores pulsados (controlado). Siempre una lista, también en exclusivo:
     * ahí tiene como mucho un elemento, `value[0]`.
     */
    value?: string[];
    /** Valores pulsados al montar (no controlado). */
    defaultValue?: string[];
    /** Se llama con la lista de valores pulsados. */
    onValueChange?: (value: string[]) => void;
    /**
     * `false` (por defecto) para conmutación **exclusiva**: elegir uno suelta el
     * anterior. `true` para poder tener varios pulsados a la vez.
     */
    multiple?: boolean;
    /** Talla que heredan todos los `Toggle` del grupo. */
    size?: 'sm' | 'md' | 'lg';
    /** En fila (por defecto) o en columna. Fija también las flechas del teclado. */
    orientation?: 'horizontal' | 'vertical';
    children: ReactNode;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Una serie de `Toggle` que comparten estado (Base UI Toggle Group): la
 * conmutación es **exclusiva** por defecto —elegir uno suelta el anterior, como
 * el selector de plan o la vista de un listado— y `multiple` la abre a varios.
 *
 * El grupo es un único parada de tabulación: dentro se recorre con las flechas.
 * El **nombre accesible** no es una prop: lo pone un `aria-label` /
 * `aria-labelledby` sobre el grupo (`role="group"`) o un `Fieldset` alrededor.
 *
 * Ninguno de los botones pinta fondo al pasar el ratón: el relleno significa
 * «este es el valor elegido», no «aquí está el puntero».
 */
export declare const ToggleGroup: import("react").ForwardRefExoticComponent<ToggleGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
