import './Button.css';

interface ButtonProps {
  /** Visual variant of the button */
  variant?: 'primary' | 'primary-dark' | 'ghost' | 'form';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Stretches the button to full container width */
  block?: boolean;
  /** Button label */
  children: React.ReactNode;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={[
        'button',
        `button--${variant}`,
        size !== 'md' ? `button--${size}` : '',
        block ? 'button--block' : '',
      ].filter(Boolean).join(' ')}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
