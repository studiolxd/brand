'use client';

import { type ReactNode } from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { Icon } from '../Icon/Icon';
import './Collapsible.css';

/* ─── Raíz ───────────────────────────────────────────────── */
export interface CollapsibleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseCollapsible.Root>, 'onOpenChange' | 'className'> {
  /** Se llama al abrir o cerrar. Solo el estado: sin los detalles del evento. */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Un bloque que se pliega y se despliega (Base UI Collapsible): los detalles de
 * un panel de ajustes, una sección larga de un editor.
 *
 * Es **una sola sección**: para varias que se coordinan entre sí —y para el
 * patrón WAI-ARIA de acordeón, con su recorrido de teclado— está `Accordion`.
 */
export function Collapsible({ onOpenChange, children, className, ...rest }: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={['collapsible', className].filter(Boolean).join(' ')}
      onOpenChange={onOpenChange ? (open) => onOpenChange(open) : undefined}
      {...rest}
    >
      {children}
    </BaseCollapsible.Root>
  );
}

/* ─── Disparador ─────────────────────────────────────────── */
export interface CollapsibleTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger>, 'className'> {
  /** Oculta el chevron, para cuando el disparador es otra cosa (una fila, un icono). */
  chevron?: boolean;
  /** Talla del chevron. */
  chevronSize?: 'xs' | 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

/**
 * El botón que abre y cierra. Con `render` puede ser otro elemento (una fila
 * entera de una tabla, un `Button` del sistema) sin perder el contrato ARIA.
 */
export function CollapsibleTrigger({
  chevron = true,
  chevronSize = 'sm',
  children,
  className,
  ...rest
}: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      className={['collapsible__trigger', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="collapsible__trigger-text">{children}</span>
      {chevron && <Icon name="chevron" className="collapsible__chevron" size={chevronSize} />}
    </BaseCollapsible.Trigger>
  );
}

/* ─── Contenido ──────────────────────────────────────────── */
export interface CollapsibleContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>, 'className'> {
  children: ReactNode;
  className?: string;
}

/** El contenido que se pliega. Base UI mide su altura para la animación. */
export function CollapsibleContent({ children, className, ...rest }: CollapsibleContentProps) {
  return (
    <BaseCollapsible.Panel
      className={['collapsible__content', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className="collapsible__content-inner">{children}</div>
    </BaseCollapsible.Panel>
  );
}
