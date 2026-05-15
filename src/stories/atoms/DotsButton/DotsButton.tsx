import { forwardRef } from 'react';
import './DotsButton.css';

export interface DotsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

export const DotsButton = forwardRef<HTMLButtonElement, DotsButtonProps>(function DotsButton(
  {
    size = 'md',
    orientation = 'horizontal',
    'aria-label': ariaLabel = 'Más opciones',
    className,
    ...rest
  },
  ref,
) {
  const classes = [
    'dots-button',
    size !== 'md' ? `dots-button--${size}` : '',
    orientation === 'vertical' ? 'dots-button--vertical' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-label={ariaLabel}
      {...rest}
    >
      <span className="dots-button__dot" aria-hidden="true" />
      <span className="dots-button__dot" aria-hidden="true" />
      <span className="dots-button__dot" aria-hidden="true" />
    </button>
  );
});
