import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import './Sheet.css';
export interface SheetProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Borde por el que entra el panel. */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Título del panel. Su texto es también el nombre accesible del diálogo. */
    title: ReactNode;
    /** Oculta el título visualmente y lo deja solo como nombre accesible. */
    titleHidden?: boolean;
    description?: ReactNode;
    /** Fila de acciones al pie del panel. */
    footer?: ReactNode;
    children: ReactNode;
    closeLabel?: string;
    /** Elemento que abre el panel. Sin él, la apertura la controla el consumidor. */
    trigger?: ReactNode;
    /**
     * Nodo DOM donde montar el portal del panel (reenviado a Base UI
     * `Portal.container`). Por defecto se monta en `document.body`, que
     * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasarlo cuando el Sheet
     * vive dentro de una superficie **anidada** (un `.surface-dark` que no está
     * en la raíz, o dentro de `SiteShell`/`.site-shell`), ya que ese contexto
     * no llega a `document.body` por la cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof Dialog.Portal>['container'];
    /**
     * Se dispara cuando termina la animación de entrada o de salida del panel.
     * Sirve para desmontar el panel solo después de que haya salido de pantalla.
     */
    onAnimationEndCapture?: (event: React.AnimationEvent) => void;
    className?: string;
}
/**
 * Fila de acciones del panel. El caso normal se resuelve con la prop `footer`
 * de `Sheet`; esta pieza es para los paneles que cambian de pie según el paso
 * en el que estén y lo renderizan dentro de su propio contenido.
 */
export declare function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
/**
 * Panel que entra deslizándose por un borde de la pantalla. Es el patrón que
 * `Modal` no cubre — este no se centra, ocupa un lateral (o el borde superior
 * o inferior) y deja ver el contexto detrás.
 *
 * Base UI Dialog aporta el portal, el velo, la trampa de foco y el cierre con
 * Escape; el DS pone la superficie y la dirección de entrada.
 *
 * `{...rest}` (`id`, `data-*`, `aria-*` y los **handlers de evento**) se
 * reenvía al popup, y `className` se concatena tras las clases propias. Los
 * handlers son lo que permite montar la barrera de eventos cuando el panel se
 * abre desde dentro de una tarjeta clicable, sin `div`s de producto alrededor.
 */
export declare function Sheet({ open, onOpenChange, side, title, titleHidden, description, footer, children, closeLabel, trigger, container, onAnimationEndCapture, className, ...rest }: SheetProps): import("react/jsx-runtime").JSX.Element;
