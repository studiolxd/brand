import { forwardRef, useCallback } from 'react';
import { Switch as BaseSwitch } from '@base-ui-components/react/switch';
import './Switcher.css';

type BaseSwitchRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
  'className'
>;

export interface SwitcherProps extends Omit<BaseSwitchRootProps, 'onCheckedChange'> {
  /** Cambio de estado. Solo el estado: el DS no expone los detalles del evento. */
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  /** Valor enviado con el formulario cuando está activo. Default del navegador: `"on"`. */
  value?: string;
  className?: string;
}

/**
 * Switcher (Base UI Switch). `ref` y `{...rest}` se reenvían al **Root de Base UI** —
 * el elemento interactivo con `role="switch"` — para soportar react-hook-form
 * (`Controller`) y la inyección de props del consumidor (`aria-*`, `data-*`, `id`,
 * `name`, `checked`, `onCheckedChange`…). `className` se concatena tras las propias.
 * Para componer con otro elemento, usa la prop `render` de Base UI.
 */
export const Switcher = forwardRef<HTMLElement, SwitcherProps>(function Switcher(
  { size = 'md', className, value, onCheckedChange, id, ...rest }, ref) {
  const classes = ['switcher', size !== 'md' ? `switcher--${size}` : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  // Base UI no expone `value`: el input oculto usa el default del navegador ("on").
  // Lo fijamos sobre el propio input para conservar la API pública.
  const inputRef = useCallback((node: HTMLInputElement | null) => {
    if (node && value !== undefined) {
      node.value = value;
    }
  }, [value]);

  return (
    <BaseSwitch.Root
      ref={ref}
      className={classes}
      inputRef={inputRef}
      // Un <button> de verdad, y con el `id` en él: Base UI se lo daría al
      // input oculto, y entonces un <label htmlFor> nombraría al input y no
      // al interruptor. `disabled` es nativo y el teclado viene de serie.
      render={<button type="button" id={id} />}
      nativeButton
      // Contrato del DS: solo el estado. Base UI añade un segundo argumento
      // (detalles del evento) que aquí no forma parte de la API.
      onCheckedChange={onCheckedChange ? (checked) => onCheckedChange(checked) : undefined}
      {...rest}
    >
      <BaseSwitch.Thumb className="switcher__thumb" />
    </BaseSwitch.Root>
  );
});
