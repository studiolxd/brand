import { forwardRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import './Checkbox.css';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Checkbox (Radix). `ref` y `{...rest}` se reenvían al **Radix Root** — el elemento
 * interactivo con `role="checkbox"` — para soportar react-hook-form (`Controller`) y
 * la inyección de props del consumidor (`aria-*`, `data-*`, `id`, `name`, `checked`,
 * `onCheckedChange`…). `className` se concatena tras las clases propias.
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { size = 'md', className, ...rest }, ref) {
  const classes = ['checkbox', size !== 'md' ? `checkbox--${size}` : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <RadixCheckbox.Root ref={ref} className={classes} {...rest}>
      <RadixCheckbox.Indicator className="checkbox__indicator" />
    </RadixCheckbox.Root>
  );
});
