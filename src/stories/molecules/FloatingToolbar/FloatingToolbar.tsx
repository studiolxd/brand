'use client';

import { createContext, forwardRef, useContext, type ReactNode } from 'react';
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { Button } from '../../atoms/Button/Button';
import { Tooltip } from '../../atoms/Tooltip/Tooltip';
import { useMediaQuery } from '../../constants/media-query';
import './FloatingToolbar.css';

/** Mismo punto de ruptura que `--breakpoint-lg`: donde la barra pasa de arriba a los lados. */
const DESKTOP_MQ = '(min-width: 1024px)';

type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

/** Lo que la barra pone por su cuenta y `toolbarProps` no puede pisar. */
const GOVERNED_BAR_PROPS = new Set(['className', 'role', 'aria-label', 'aria-orientation', 'children']);

/**
 * Los atributos que se pueden poner en la barra (`role="toolbar"`). Sin
 * `className`, `role`, `aria-label`, `aria-orientation` ni `children`: esos
 * los gobierna el componente. Los `data-*` se admiten tipados para poder
 * pasarlos en un objeto (`{ 'data-editor-ui': '' }`).
 */
export type FloatingToolbarBarProps =
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'role' | 'aria-label' | 'aria-orientation' | 'children'>
  & { [attribute: `data-${string}`]: string | undefined };

/** El lado del bocadillo de cada botón: hacia fuera del elemento, nunca encima de él. */
const GroupContext = createContext<TooltipSide>('top');

export interface FloatingToolbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  /**
   * Las acciones del **principio**: a la izquierda del elemento en
   * `sides`, al principio de la fila en `top`. Van como
   * `FloatingToolbarButton`.
   */
  start?: ReactNode;
  /**
   * Las acciones del **final**: a la derecha del elemento en `sides`, al
   * final de la fila en `top`.
   */
  end?: ReactNode;
  /**
   * Dónde se pinta la barra.
   *
   * - `auto` (por defecto): encima del elemento por debajo de `breakpoint.lg`
   *   y en dos raíles a sus lados desde `lg`. Las acciones se declaran **una
   *   vez**: es el CSS quien las coloca, no hay una barra por anchura.
   * - `top`: siempre encima.
   * - `sides`: siempre a los lados.
   *
   * @default 'auto'
   */
  layout?: 'auto' | 'top' | 'sides';
  /**
   * La barra se ve siempre, no solo al pasar el puntero o al tener el foco
   * dentro. Para el elemento **seleccionado** —el que se está editando—,
   * sobre todo en pantallas táctiles, donde no hay puntero que pase.
   *
   * @default false
   */
  alwaysVisible?: boolean;
  /**
   * Nombre accesible de la barra (`aria-label` del `role="toolbar"`).
   * **Obligatorio y sin default**: tiene que decir **de qué** son las
   * acciones —«Acciones del bloque 3: Texto»—, porque en una lista hay una
   * barra por elemento y un nombre fijo las haría indistinguibles. Es un
   * dato del producto, no un texto del sistema: por eso no está en el
   * proveedor de textos.
   */
  label: string;
  /**
   * Atributos para la **barra** (el `role="toolbar"`), no para el ancla: la
   * misma barra en `top` y en los raíles de `sides`. Para marcarla —un
   * `data-*` que la saque del alcance de otra hoja, un `id`— o escuchar en
   * ella. Lo que el componente gobierna (clase, rol, nombre, orientación) no
   * se acepta.
   */
  toolbarProps?: FloatingToolbarBarProps;
  /** El elemento al que se ancla la barra. */
  children: ReactNode;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Barra de botones de icono **anclada a un elemento**: aparece al pasar el
 * puntero por él o al entrar el foco, y se pinta encima (pantallas estrechas)
 * o en dos raíles a sus lados (escritorio). Es la barra de acciones de un
 * bloque en un editor —mover, duplicar, borrar, convertir—.
 *
 * Es un `role="toolbar"` (Base UI Toolbar): **una sola parada de
 * tabulación**, y dentro se recorre con las flechas (`roving tabindex`). Sigue
 * en el orden de tabulación aunque no se vea, así que con teclado siempre se
 * alcanza; al recibir el foco aparece.
 *
 * Reenvía `ref` y `{...rest}` al elemento ancla (el contenedor), no a la barra;
 * los atributos de la barra van en `toolbarProps`.
 */
export const FloatingToolbar = forwardRef<HTMLDivElement, FloatingToolbarProps>(function FloatingToolbar({
  start,
  end,
  layout = 'auto',
  alwaysVisible = false,
  label,
  toolbarProps,
  children,
  className,
  ...rest
}, ref) {
  // Solo para lo que el CSS no puede decidir: las flechas que recorren la
  // barra y el lado de los bocadillos. La colocación la decide la hoja con la
  // misma media query, así que antes de hidratar (`null`) no hay salto.
  const isWide = useMediaQuery(DESKTOP_MQ);
  const sides = layout === 'sides' || (layout === 'auto' && isWide === true);

  // Lo que gobierna el componente no se acepta, tampoco colado sin tipos.
  const barProps = toolbarProps
    ? Object.fromEntries(Object.entries(toolbarProps).filter(([key]) => !GOVERNED_BAR_PROPS.has(key)))
    : undefined;

  const classes = [
    'floating-toolbar',
    `floating-toolbar--${layout}`,
    alwaysVisible ? 'floating-toolbar--always-visible' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      <BaseToolbar.Root
        {...barProps}
        className="floating-toolbar__bar"
        aria-label={label}
        orientation={sides ? 'vertical' : 'horizontal'}
      >
        {start !== undefined && start !== null && (
          <GroupContext.Provider value={sides ? 'left' : 'top'}>
            <BaseToolbar.Group className="floating-toolbar__group floating-toolbar__group--start">
              {start}
            </BaseToolbar.Group>
          </GroupContext.Provider>
        )}
        {end !== undefined && end !== null && (
          <GroupContext.Provider value={sides ? 'right' : 'top'}>
            <BaseToolbar.Group className="floating-toolbar__group floating-toolbar__group--end">
              {end}
            </BaseToolbar.Group>
          </GroupContext.Provider>
        )}
      </BaseToolbar.Root>
      <div className="floating-toolbar__content">{children}</div>
    </div>
  );
});

export interface FloatingToolbarButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'aria-label'> {
  /**
   * Nombre de la acción. Es a la vez el `aria-label` del botón y el texto del
   * bocadillo: un botón de solo icono no tiene otro nombre.
   */
  label: string;
  /** El glifo (`<Icon … />`). Decorativo: el nombre lo da `label`. */
  icon: ReactNode;
  /** Pinta la acción en rojo (borrar). */
  destructive?: boolean;
  /** Se añade DESPUÉS de las clases propias del `Button`. */
  className?: string;
}

/**
 * Un botón de `FloatingToolbar`: `Button` `ghost` `sm` de solo icono, con su
 * `Tooltip` y dentro del recorrido con flechas de la barra.
 *
 * Reenvía `ref` y `{...rest}` al `<button>`, así que sirve de `trigger` de un
 * `Popover` o un `Menu` y de asa de arrastre (el `handleRef` de dnd-kit).
 */
export const FloatingToolbarButton = forwardRef<HTMLButtonElement, FloatingToolbarButtonProps>(function FloatingToolbarButton({
  label,
  icon,
  destructive = false,
  className,
  ...rest
}, ref) {
  const side = useContext(GroupContext);
  return (
    // `describe={false}`: el bocadillo repite el nombre que ya da el
    // `aria-label`; describir con el mismo texto lo haría leer dos veces.
    <Tooltip label={label} side={side} describe={false} ref={ref} {...rest}>
      <BaseToolbar.Button
        render={
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            destructive={destructive}
            aria-label={label}
            className={className}
          />
        }
      >
        {icon}
      </BaseToolbar.Button>
    </Tooltip>
  );
});
