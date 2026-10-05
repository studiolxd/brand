import type { EmptyStateAction } from '../EmptyState/EmptyState';
import './LoadingState.css';
export interface LoadingStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role' | 'children'> {
    /**
     * Lo que se espera, con puntos suspensivos («Cargando revisión…»: ver
     * Foundations → Redacción). **No se ve**: es el nombre accesible de la
     * espera y lo que anuncian los lectores de pantalla. **Sin default**: sin
     * él, sale de `spinner.label` del `BrandMessagesProvider` — el mismo texto
     * que el `Spinner`.
     */
    label?: string;
    /**
     * `md` para una página o una zona; `sm` para el cuerpo de un diálogo, una
     * hoja, un popover o una barra lateral.
     */
    size?: 'sm' | 'md';
    /**
     * A página completa: la caja toma el alto visible bajo la cabecera del
     * `AppShell` (la ventana menos el cromo del armazón y el relleno del
     * contenido) y centra el girador en él, sin provocar desplazamiento. Para el
     * `loading.tsx` de una ruta cuya forma no se conoce. Sin `fill`, la caja ya
     * ocupa el alto de una zona que lo tenga definido y, si no, reserva el
     * mínimo de su talla.
     */
    fill?: boolean;
    /** Una salida mientras se espera (cancelar un proceso largo). */
    action?: EmptyStateAction;
}
/**
 * La espera de un bloque cuya forma no se conoce: un girador centrado en una
 * caja que **reserva alto** y, si hace falta, una salida. A la vista solo está
 * el girador; el texto de la espera es solo para los lectores de pantalla. Cuando la forma sí se conoce (tabla, lista, ficha), la respuesta es
 * `LoadingRegion` con esqueletos.
 *
 * Anuncia: la caja es `role="status"` con `aria-busy`, y su nombre es el texto
 * de la espera, oculto a la vista. El girador va decorativo, para no
 * anunciarla dos veces.
 */
export declare function LoadingState({ label, size, fill, action, className, ...rest }: LoadingStateProps): import("react/jsx-runtime").JSX.Element;
