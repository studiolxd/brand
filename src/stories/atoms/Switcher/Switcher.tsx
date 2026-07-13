import { forwardRef } from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import './Switcher.css';

export interface SwitcherProps
  extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Switcher (Radix Switch). `ref` y `{...rest}` se reenvían al **Radix Root** — el
 * elemento interactivo con `role="switch"` — para soportar react-hook-form
 * (`Controller`) y la inyección de props del consumidor (`aria-*`, `data-*`, `id`,
 * `name`, `checked`, `onCheckedChange`…). `className` se concatena tras las propias.
 */
export const Switcher = forwardRef<HTMLButtonElement, SwitcherProps>(function Switcher(
  { size = 'md', className, ...rest }, ref) {
  const classes = ['switcher', size !== 'md' ? `switcher--${size}` : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <RadixSwitch.Root ref={ref} className={classes} {...rest}>
      <RadixSwitch.Thumb className="switcher__thumb" />
    </RadixSwitch.Root>
  );
});
