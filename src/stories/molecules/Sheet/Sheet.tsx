'use client';

import type { ReactNode } from 'react';
import { Dialog } from '@base-ui-components/react/dialog';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Sheet.css';

export interface SheetProps {
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
export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['sheet__footer', className].filter(Boolean).join(' ')} {...props} />;
}

/**
 * Panel que entra deslizándose por un borde de la pantalla. Es el patrón que
 * `Modal` no cubre — este no se centra, ocupa un lateral (o el borde superior
 * o inferior) y deja ver el contexto detrás.
 *
 * Base UI Dialog aporta el portal, el velo, la trampa de foco y el cierre con
 * Escape; el DS pone la superficie y la dirección de entrada.
 */
export function Sheet({
  open,
  onOpenChange,
  side = 'right',
  title,
  titleHidden = false,
  description,
  footer,
  children,
  closeLabel = 'Cerrar',
  trigger,
  onAnimationEndCapture,
  className,
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      {trigger && (
        <Dialog.Trigger render={trigger as React.ReactElement<Record<string, unknown>>} />
      )}

      <Dialog.Portal>
        <Dialog.Backdrop className="sheet__overlay" />
        <Dialog.Popup
          className={['sheet', className].filter(Boolean).join(' ')}
          data-side={side}
          onAnimationEndCapture={onAnimationEndCapture}
        >
          <header className="sheet__header">
            {titleHidden ? (
              <Dialog.Title render={<VisuallyHidden>{title}</VisuallyHidden>} />
            ) : (
              <Dialog.Title className="sheet__title">{title}</Dialog.Title>
            )}
            {description != null && (
              <Dialog.Description className="sheet__description">
                {description}
              </Dialog.Description>
            )}
          </header>

          <Dialog.Close
            className="sheet__close"
            aria-label={closeLabel}
            render={<Button variant="ghost" size="sm" iconOnly />}
          >
            <Icon name="close" size="sm" />
          </Dialog.Close>

          <div className="sheet__body">{children}</div>

          {footer && <SheetFooter>{footer}</SheetFooter>}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
