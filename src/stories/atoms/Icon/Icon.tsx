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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M2 12 C7 5 17 5 22 12 C17 19 7 19 2 12 Z" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="3.5" />
      </>
    ),
  },
  'eye-off': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M2 12 C7 5 17 5 22 12 C17 19 7 19 2 12 Z" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="3.5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M4 4 L20 20" />
      </>
    ),
  },
  briefcase: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 12l0 .01" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 13a20 20 0 0 0 18 0" />
      </>
    ),
  },
  'chart-infographic': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 3v4h4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 17l0 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M17 14l0 7" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M13 13l0 8" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M21 12l0 9" />
      </>
    ),
  },
  dashboard: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
      </>
    ),
  },
  headset: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 14v-3a8 8 0 1 1 16 0v3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M18 19c0 1.657 -2.686 3 -6 3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" />
      </>
    ),
  },
  'layout-kanban': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 4l6 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 4l6 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 10a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -8" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 10a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" />
      </>
    ),
  },
  'report-money': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 17v1m0 -8v1" />
      </>
    ),
  },
  'shield-lock': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 12l0 2.5" />
      </>
    ),
  },
  sparkles: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />
    ),
  },
  'users-group': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M17 10h2a2 2 0 0 1 2 2v1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 13v-1a2 2 0 0 1 2 -2h2" />
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
