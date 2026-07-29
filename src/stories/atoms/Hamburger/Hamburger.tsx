import type { ComponentPropsWithRef } from 'react';
import './Hamburger.css';

interface HamburgerProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  isOpen?: boolean;
  onClick?: () => void;
  label?: string;
}

export function Hamburger({
  isOpen = false,
  onClick,
  label = 'Menu',
  ...rest
}: HamburgerProps) {
  return (
    <button
      type="button"
      className="hamburger"
      aria-label={label}
      aria-expanded={isOpen}
      onClick={onClick}
      {...rest}
    >
      <span className="hamburger__bar" aria-hidden="true" />
      <span className="hamburger__bar" aria-hidden="true" />
      <span className="hamburger__bar" aria-hidden="true" />
    </button>
  );
}
