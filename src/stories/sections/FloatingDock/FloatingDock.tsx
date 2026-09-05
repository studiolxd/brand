'use client';

import { useState, type ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Button } from '../../atoms/Button/Button';
import { CloseButton } from '../../atoms/CloseButton/CloseButton';
import { Icon } from '../../atoms/Icon/Icon';
import { NumberBadge } from '../../atoms/NumberBadge/NumberBadge';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './FloatingDock.css';

/** Esquina de la ventana a la que se ancla el dock. */
export type FloatingDockPosition = 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';

export interface FloatingDockProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title' | 'children'> {
  /**
   * Nombre accesible del lanzador — obligatorio: es un botón de solo icono y
   * sin él no tendría nombre. Castellano en el consumidor, como todo texto.
   */
  label: string;
  /** Título del panel. Su texto es también el nombre accesible del diálogo. */
  title: ReactNode;
  /** Oculta el título visualmente y lo deja solo como nombre accesible. */
  titleHidden?: boolean;
  /** Línea de contexto bajo el título. */
  description?: ReactNode;
  /** Contenido del panel: aquí entra el `ChatShell` (o lo que monte el producto). */
  children: ReactNode;
  /** Glifo del lanzador. Por defecto, el bocadillo (`Icon name="message"`). */
  icon?: ReactNode;
  /** Esquina de anclaje. Por defecto, abajo a la derecha (`bottom-end`). */
  position?: FloatingDockPosition;
  /** Estado controlado. Sin él, el dock se gobierna solo (`defaultOpen`). */
  open?: boolean;
  /** Estado inicial en modo no controlado. */
  defaultOpen?: boolean;
  /** Se llama al abrirse y al cerrarse, en controlado y en no controlado. */
  onOpenChange?: (open: boolean) => void;
  /** `aria-label` del aspa. Default: «Cerrar» (castellano). */
  closeLabel?: string;
  /** Novedades sin ver. Con 0 (o sin él) no hay contador. */
  badge?: number;
  /** Tope del contador («99+»). */
  badgeMax?: number;
  /**
   * Cómo se lee el contador. Default: «N mensajes nuevos» (castellano).
   * Interpola el número, así que es una función.
   */
  badgeLabel?: (count: number) => string;
  /**
   * Anuncia el contador por `aria-live="polite"` cuando cambia. Se apaga para
   * los contadores que no son novedades (un número de tareas pendientes, por
   * ejemplo): anunciarlos interrumpiría sin aportar.
   */
  badgeLive?: boolean;
  /**
   * Cierra el panel al pulsar fuera de él. Apagado por defecto: el dock es un
   * ayudante que acompaña mientras se trabaja en la página, y cerrarse al
   * primer clic en el contenido lo haría inservible.
   */
  dismissOnOutsidePress?: boolean;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

/**
 * El ancla fija de la aplicación: un lanzador siempre visible en una esquina
 * de la ventana que abre un panel sobre el contenido, sin sacar a nadie de la
 * página en la que está. Es donde vive un asistente.
 *
 * El panel es un **diálogo no modal**: no hay velo, no atrapa el foco y la
 * página sigue viva detrás — se puede seguir leyendo, desplazando y escribiendo
 * mientras está abierto. Lo que sí hace Base UI `Dialog` es lo que un diálogo
 * debe: nombrarlo, meter el foco dentro al abrirlo, devolverlo al lanzador al
 * cerrarlo y cerrar con Escape.
 *
 * El contenido lo pone el producto (`children`): el DS aporta el sitio, la
 * conducta y la superficie, no lo que se hace dentro.
 *
 * `{...rest}` (`id`, `data-*`, `aria-*` y los handlers) viaja al contenedor
 * anclado, y `className` se concatena tras las clases propias.
 */
export function FloatingDock({
  label,
  title,
  titleHidden = false,
  description,
  children,
  icon,
  position = 'bottom-end',
  open,
  defaultOpen,
  onOpenChange,
  closeLabel = 'Cerrar',
  badge = 0,
  badgeMax = 99,
  badgeLabel = (count) => `${count} mensajes nuevos`,
  badgeLive = true,
  dismissOnOutsidePress = false,
  className,
  ...rest
}: FloatingDockProps) {
  /**
   * El panel se monta DENTRO del ancla (`Dialog.Portal container`), no en
   * `document.body`: así hereda por cascada la superficie donde el consumidor
   * haya puesto el dock —clara u oscura, aplicación o pública— sin prop de
   * `container`, y el lanzador y el panel se colocan con el mismo flex.
   * Base UI exige `Portal`, de ahí el rodeo por estado en vez de un `ref`.
   */
  const [dockNode, setDockNode] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setDockNode}
      className={['floating-dock', className].filter(Boolean).join(' ')}
      data-position={position}
      {...rest}
    >
      <Dialog.Root
        open={open}
        defaultOpen={defaultOpen}
        // No modal: la página de detrás sigue usable con el panel abierto.
        modal={false}
        disablePointerDismissal={!dismissOnOutsidePress}
        onOpenChange={(next) => onOpenChange?.(next)}
      >
        <Dialog.Trigger
          render={
            (
              <Button variant="primary" size="lg" iconOnly aria-label={label} className="floating-dock__trigger">
                {icon ?? <Icon name="message" size="md" />}
                {badge > 0 && (
                  <NumberBadge
                    count={badge}
                    max={badgeMax}
                    variant="danger"
                    aria-hidden="true"
                    className="floating-dock__badge"
                  />
                )}
              </Button>
            ) as React.ReactElement<Record<string, unknown>>
          }
        />

        {/* El contador se lee cuando cambia, sin robar el foco. */}
        {badgeLive && badge > 0 && (
          <VisuallyHidden aria-live="polite">{badgeLabel(badge)}</VisuallyHidden>
        )}

        {dockNode && (
          <Dialog.Portal container={dockNode} className="floating-dock__portal">
            <Dialog.Popup className="floating-dock__panel">
              <header className="floating-dock__header">
                {titleHidden ? (
                  <Dialog.Title render={<VisuallyHidden>{title}</VisuallyHidden>} />
                ) : (
                  <Dialog.Title className="floating-dock__title">{title}</Dialog.Title>
                )}
                {description != null && (
                  <Dialog.Description className="floating-dock__description">
                    {description}
                  </Dialog.Description>
                )}
              </header>

              <Dialog.Close className="floating-dock__close" render={<CloseButton label={closeLabel} />} />

              <div className="floating-dock__body">{children}</div>
            </Dialog.Popup>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </div>
  );
}
