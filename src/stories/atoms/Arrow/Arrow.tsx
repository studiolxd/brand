import './Arrow.css';

interface ArrowProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Arrow({ size = 'md', className }: ArrowProps) {
  const classes = ['arrow', size ? `arrow--${size}` : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      className={classes}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 5.5 27 13"
      fill="none"
      stroke="currentColor"
    >
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M0 12 H26 M20 6 L26 12 L20 18" />
    </svg>
  );
}
