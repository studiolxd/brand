import { forwardRef } from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import './Checkbox.css';

type BaseCheckboxRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>,
  'checked' | 'onCheckedChange' | 'className'
>;

export interface CheckboxProps extends BaseCheckboxRootProps {
  size?: 'sm' | 'md' | 'lg';
  /** Estado controlado. `'indeterminate'` se traduce al estado mixto de Base UI. */
  checked?: boolean | 'indeterminate';
  /** Callback al cambiar el estado. */
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/**
 * Checkbox (Base UI). `ref` y `{...rest}` se reenvían al **Root de Base UI** — el
 * elemento interactivo con `role="checkbox"` — para soportar react-hook-form
 * (`Controller`) y la inyección de props del consumidor (`aria-*`, `data-*`, `id`,
 * `name`, `checked`, `onCheckedChange`…). `className` se concatena tras las clases
 * propias. Para componer con otro elemento, usa la prop `render` de Base UI.
 */
export const Checkbox = forwardRef<HTMLElement, CheckboxProps>(function Checkbox(
  { size = 'md', className, checked, indeterminate, ...rest }, ref) {
  const classes = ['checkbox', size !== 'md' ? `checkbox--${size}` : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  const isIndeterminate = checked === 'indeterminate' || indeterminate;

  return (
    <BaseCheckbox.Root
      ref={ref}
      className={classes}
      checked={checked === 'indeterminate' ? false : checked}
      indeterminate={isIndeterminate}
      aria-checked={isIndeterminate ? 'mixed' : undefined}
      {...rest}
    >
      <BaseCheckbox.Indicator className="checkbox__indicator" keepMounted />
    </BaseCheckbox.Root>
  );
});
