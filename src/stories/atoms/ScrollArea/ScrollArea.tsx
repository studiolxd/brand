'use client';

import { forwardRef, type ReactNode } from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui-components/react/scroll-area';
import './ScrollArea.css';

export interface ScrollAreaProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>, 'className'> {
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
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea({
  orientation = 'vertical',
  label,
  children,
  className,
  ...rest
}, ref) {
  const vertical = orientation === 'vertical' || orientation === 'both';
  const horizontal = orientation === 'horizontal' || orientation === 'both';

  return (
    <BaseScrollArea.Root
      ref={ref}
      className={['scroll-area', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <BaseScrollArea.Viewport
        className="scroll-area__viewport"
        // Base UI marca el viewport como `presentation` y le da tabIndex cuando
        // hay desplazamiento; con nombre pasa a ser una región anunciable.
        role={label ? 'region' : undefined}
        aria-label={label}
      >
        {children}
      </BaseScrollArea.Viewport>
      {vertical && (
        <BaseScrollArea.Scrollbar orientation="vertical" className="scroll-area__scrollbar">
          <BaseScrollArea.Thumb className="scroll-area__thumb" />
        </BaseScrollArea.Scrollbar>
      )}
      {horizontal && (
        <BaseScrollArea.Scrollbar orientation="horizontal" className="scroll-area__scrollbar">
          <BaseScrollArea.Thumb className="scroll-area__thumb" />
        </BaseScrollArea.Scrollbar>
      )}
      {vertical && horizontal && <BaseScrollArea.Corner className="scroll-area__corner" />}
    </BaseScrollArea.Root>
  );
});
