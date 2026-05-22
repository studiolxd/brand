import './Icon.css';

const ICONS = {
  arrow: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M0 12 H24 M18 6 L24 12 L18 18" />
    ),
  },
  chevron: {
    viewBox: '0 0 12 12',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M3 0 L9 6 L3 12" />
    ),
  },
  close: {
    viewBox: '0 0 12 12',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M2 2 L10 10 M10 2 L2 10" />
    ),
  },
  eye: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
      </>
    ),
  },
  'eye-off': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="1" y1="1" x2="23" y2="23" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Icon({ name, size = 'md', className }: IconProps) {
  const icon = ICONS[name];
  const classes = ['icon', `icon--${size}`, className ?? ''].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      fill="none"
      stroke="currentColor"
    >
      {icon.render()}
    </svg>
  );
}
