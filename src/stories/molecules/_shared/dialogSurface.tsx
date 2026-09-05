import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import './dialogSurface.css';

/* ─────────────────────────────────────────────────────────────────────────────
 * Superficie de diálogo compartida por TODOS los diálogos del sistema: `Modal`
 * (centrado) y `Sheet` (lateral) son dos colocaciones de ella, no dos árboles
 * paralelos. Aquí viven el velo, la cabecera y el pie —estructura y nada más—;
 * cada contenedor añade su clase BEM y mapea encima sus propios tokens.
 *
 * Lo que de verdad hace un diálogo —portal, trampa de foco, Escape, clic en el
 * velo, bloqueo del scroll, `aria-modal`— no está aquí ni estaba duplicado: lo
 * pone Base UI, y cada componente monta su `Dialog.Root`.
 * ───────────────────────────────────────────────────────────────────────────── */

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');

/**
 * Velo del diálogo. `className` es la clase BEM del contenedor, que es donde
 * este mapea sus tokens `*-backdrop-*` sobre las variables de la superficie.
 */
export function DialogOverlay({ className }: { className: string }) {
  return <Dialog.Backdrop className={cx('dialog-overlay', className)} />;
}

export interface DialogHeaderProps {
  /**
   * `inline`: título y aspa en la misma fila (el diálogo centrado).
   * `stacked`: título y descripción apilados, con sitio para el aspa que el
   * contenedor posiciona sobre la esquina (el cajón).
   */
  layout: 'inline' | 'stacked';
  /** Solo queda el aspa: se va a su esquina. Únicamente en `inline`. */
  noTitle?: boolean;
  className: string;
  children: ReactNode;
}

/** Cabecera del diálogo, en una de sus dos colocaciones. */
export function DialogHeader({ layout, noTitle = false, className, children }: DialogHeaderProps) {
  return (
    <header
      className={cx(
        'dialog-header',
        `dialog-header--${layout}`,
        noTitle && 'dialog-header--no-title',
        className,
      )}
    >
      {children}
    </header>
  );
}

/**
 * Pie de acciones. Fila a la derecha; por debajo del punto de ruptura, botones
 * apilados a todo el ancho con la acción principal arriba.
 */
export function DialogFooter({ className, children, ...rest }: { className: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('dialog-footer', className)} {...rest}>
      {children}
    </div>
  );
}
