'use client';

import { forwardRef } from 'react';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { useToggleGroup } from '../ToggleGroup/ToggleGroupContext';
import './Toggle.css';
import { markFocusableWhenDisabled } from '../../constants/focusable-when-disabled';

type BaseToggleProps = Omit<React.ComponentPropsWithoutRef<typeof BaseToggle>, 'className'>;

/** La misma disyuntiva que en `Button`: solo icono ⇒ nombre accesible obligatorio. */
export type ToggleIconOnlyProps =
  | { iconOnly: true; 'aria-label': string }
  | { iconOnly: true; 'aria-labelledby': string }
  | { iconOnly?: false | undefined };

/** Todo lo que no es la disyuntiva de `iconOnly`. */
export interface ToggleBaseProps extends Omit<BaseToggleProps, 'onPressedChange'> {
  /** Cambio de estado. Solo el estado: el DS no expone los detalles del evento. */
  onPressedChange?: (pressed: boolean) => void;
  /** Talla del sistema. Dentro de un `ToggleGroup` la hereda de él. */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Solo icono: el botón se hace cuadrado. Con `iconOnly` el tipo exige
   * `aria-label` o `aria-labelledby`: no hay texto que nombre el control.
   */
  iconOnly?: boolean;
  /**
   * Con `disabled`, el botón sigue en el orden de tabulación: deja el
   * `disabled` nativo, se anuncia con `aria-disabled="true"`, conserva la cara
   * de apagado (`data-disabled`) y no conmuta. Mismo contrato que en `Button`;
   * `Tooltip` lo activa solo en su disparador deshabilitado.
   *
   * @default false
   */
  focusableWhenDisabled?: boolean;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

export type ToggleProps = ToggleBaseProps & ToggleIconOnlyProps;

/**
 * Botón de dos estados: pulsado o no (Base UI Toggle). Es un **valor que se
 * conmuta** —negrita en una barra de texto, «solo pendientes» en un filtro—, no
 * una acción: por eso queda relleno mientras está pulsado.
 *
 * El hover no pone fondo (solo marca el borde), como el resto del sistema: el
 * relleno significa «elegido», y usarlo también para el paso del ratón haría
 * ambiguo lo que está activo.
 *
 * Dentro de un `ToggleGroup` toma de él la talla; el estado marcado y la
 * exclusividad las lleva el grupo.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle({
  size: sizeProp,
  iconOnly = false,
  className,
  onPressedChange,
  disabled,
  focusableWhenDisabled = false,
  onClick,
  ...rest
}, ref) {
  const focusableDisabled = Boolean(disabled) && focusableWhenDisabled;
  const group = useToggleGroup();
  const size = sizeProp ?? group?.size ?? 'md';

  const classes = [
    'toggle',
    size !== 'md' ? `toggle--${size}` : '',
    iconOnly ? 'toggle--icon-only' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <BaseToggle
      ref={ref}
      className={classes}
      // Contrato del DS: solo el estado. Base UI añade un segundo argumento
      // (detalles del evento) que aquí no forma parte de la API.
      onPressedChange={(pressed, details) => {
        // Enfocable pero apagado: el clic llega, y aquí se veta el cambio
        // (también el del grupo, que comparte `details`).
        if (focusableDisabled) {
          details.cancel();
          return;
        }
        onPressedChange?.(pressed);
      }}
      onClick={(event) => {
        if (focusableDisabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      disabled={focusableDisabled ? false : disabled}
      {...(focusableDisabled ? { 'aria-disabled': true, 'data-disabled': '' } : {})}
      {...rest}
    />
  );
});

markFocusableWhenDisabled(Toggle);
