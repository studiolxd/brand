import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import './Sheet.css';
/**
 * El cromo del panel. Solo hay uno: el aspa cierra el cajón, aquí y en
 * cualquier otro, así que es catálogo. El `title` y la `description` son
 * contenido y los sigue pasando quien abre el panel — este componente los
 * exige como props, y el título además es obligatorio.
 */
export interface SheetMessages {
    /** Nombre accesible del aspa que cierra el panel. */
    close: string;
}
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
    /**
     * Nombre accesible del aspa de cierre. **Sin default**: sin él, sale de
     * `sheet.close` del `BrandMessagesProvider`. Solo se lee cuando el aspa se
     * pinta: un panel con `hideClose` no lo exige.
     */
    closeLabel?: string;
    /**
     * Oculta el aspa de la esquina. Para un cajón cuyo propio disparador queda
     * a la vista y ya sirve para cerrarlo: dos controles de cierre en la misma
     * pantalla, con glifos distintos, son dos formas de decir lo mismo.
     */
    hideClose?: boolean;
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
export declare function Sheet({ open, onOpenChange, side, title, titleHidden, description, footer, children, closeLabel, hideClose, trigger, container, onAnimationEndCapture, className, ...rest }: SheetProps): import("react/jsx-runtime").JSX.Element;
