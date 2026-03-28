import './Button.css';

interface ButtonProps {
  /** Visual variant of the button */
  variant?: 'primary' | 'primary-dark' | 'ghost' | 'form';
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
