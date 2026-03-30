import './Chevron.css';

interface ChevronProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Chevron({ size, className }: ChevronProps) {
  const classes = ['chevron', size ? `chevron--${size}` : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      className={classes}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 4 12 16"
      fill="none"
      stroke="currentColor"
    >
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M2 6 L8 12 L2 18" />
    </svg>
  );
}
