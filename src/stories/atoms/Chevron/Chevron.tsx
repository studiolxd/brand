import './Chevron.css';

interface ChevronProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
    >
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M3 0 L9 6 L3 12" />
    </svg>
  );
}
