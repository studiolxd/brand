import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Icon } from '../Icon/Icon';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { closeButtonEs } from '../../messages/es/closeButton';
import './CloseButton.css';
import { markFocusableWhenDisabled } from '../../constants/focusable-when-disabled';

/**
 * El único texto del aspa suelta, y es **cromo**: «Cerrar». Los componentes
 * que la montan (`Modal`, `Sheet`, `Alert`, `Banner`, `Toaster`,
 * `FloatingDock`) le pasan siempre el suyo, de su propio espacio; esta clave
 * solo se lee cuando alguien usa el aspa por su cuenta sin `label`.
 */
export interface CloseButtonMessages {
  /** Nombre accesible del aspa. */
  label: string;
}

export interface CloseButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  /**
   * Nombre accesible del aspa. Dice **qué** cierra o quita, no qué forma
   * tiene: «Cerrar», «Descartar aviso», «Quitar a Ana». **Sin default**: sin
   * él, sale de `closeButton.label` del `BrandMessagesProvider`.
   */
  label?: string;
  /** Talla del botón: un cuadrado de 32, 40 o 48px. El glifo mide 24 en las tres. */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Con `disabled`, el aspa sigue en el orden de tabulación: deja el
   * `disabled` nativo, se anuncia con `aria-disabled="true"` y no ejecuta el
   * `onClick`. Mismo contrato que en `Button`; `Tooltip` lo activa solo en su
   * disparador deshabilitado.
   *
   * @default false
   */
  focusableWhenDisabled?: boolean;
}

/**
 * El aspa del sistema: el botón que cierra lo que lo contiene —un diálogo, un
 * cajón, un aviso—. Dibuja el icono `close` del catálogo, el mismo en el que
 * termina la animación de `MenuButton`.
 *
 * **No tiene estado de hover**: ni fondo ni cambio de color al pasar el
 * puntero. El aspa ya está en la tinta de la superficie desde el reposo, así
 * que no hay nada que revelar al acercarse; el único estado que marca es el
 * foco, con el anillo del sistema. Por eso es una pieza propia y no un
 * `Button` de solo icono: `ghost` pinta un relleno en hover, que es justo lo
 * que aquí sobra.
 */
export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(
  { label, size = 'md', className, disabled, focusableWhenDisabled = false, onClick, ...rest },
  ref,
) {
  const t = useBrandMessages('closeButton', closeButtonEs);
  const classes = ['close-button', size !== 'md' ? `close-button--${size}` : '', className]
    .filter(Boolean)
    .join(' ');
  const focusableDisabled = Boolean(disabled) && focusableWhenDisabled;
  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-label={t('label', label)}
      disabled={focusableDisabled ? undefined : disabled}
      aria-disabled={focusableDisabled ? true : undefined}
      onClick={(event) => {
        if (focusableDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      }}
      {...rest}
    >
      <Icon name="close" />
    </button>
  );
});

markFocusableWhenDisabled(CloseButton);
