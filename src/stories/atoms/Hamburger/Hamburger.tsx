import './Hamburger.css';

interface HamburgerProps {
  isOpen?: boolean;
  onClick?: () => void;
  label?: string;
}

export function Hamburger({
  isOpen = false,
  onClick,
  label = 'Menu',
}: HamburgerProps) {
  return (
    <button
      type="button"
      className="hamburger"
      aria-label={label}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <span className="hamburger__bar" aria-hidden="true" />
      <span className="hamburger__bar" aria-hidden="true" />
      <span className="hamburger__bar" aria-hidden="true" />
    </button>
  );
}
