import './Close.css';

interface CloseProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Close({ size, className }: CloseProps) {
  const classes = ['close', size ? `close--${size}` : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      className={classes}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
    >
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M2 2 L10 10 M10 2 L2 10" />
    </svg>
  );
}
