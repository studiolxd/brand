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
  dot: {
    viewBox: '0 0 24 24',
    render: () => (
      <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
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
  folder: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M22 19a2 2 0 0 1 -2 2H4a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h5l2 3h9a2 2 0 0 1 2 2z" />
    ),
  },
  search: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="11" cy="11" r="8" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M21 21 L16.65 16.65" />
      </>
    ),
  },
  'zoom-in': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="11" cy="11" r="8" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M21 21 L16.65 16.65" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M11 8 L11 14 M8 11 L14 11" />
      </>
    ),
  },
  'zoom-out': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="11" cy="11" r="8" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M21 21 L16.65 16.65" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M8 11 L14 11" />
      </>
    ),
  },
  retry: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4.05 11 a8 8 0 1 1 .5 4 m-.5 5 v-5 h5" />
    ),
  },
  lifebuoy: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="9" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M15 15 L18.5 18.5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9 15 L5.5 18.5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M15 9 L18.5 5.5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9 9 L5.5 5.5" />
      </>
    ),
  },
  play: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinejoin="miter" d="M7 4 L20 12 L7 20 Z" />
    ),
  },
  pause: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
      </>
    ),
  },
  stop: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinejoin="miter" d="M5 5 H19 V19 H5 Z" />
    ),
  },
  sun: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M12 3l0 1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M12 20l0 1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M3 12l1 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M20 12l1 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M5.6 5.6l.7 .7" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M17.7 17.7l.7 .7" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M5.6 18.4l.7 -.7" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M17.7 6.3l.7 -.7" />
      </>
    ),
  },
  moon: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
    ),
  },
  bell: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 17v1a3 3 0 0 0 6 0v-1" />
      </>
    ),
  },
  'book-open': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 6l0 13" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 6l0 13" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M21 6l0 13" />
      </>
    ),
  },
  'chart-bar': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 17v-3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M13 17V5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M18 17V9" />
      </>
    ),
  },
  'circle-check': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
      </>
    ),
  },
  check: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5l10 -10" />
    ),
  },
  'chevrons-up-down': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 9l4 -4l4 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M16 15l-4 4l-4 -4" />
      </>
    ),
  },
  'credit-card': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 10l18 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 15l.01 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M11 15l2 0" />
      </>
    ),
  },
  download: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 11l5 5l5 -5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 4l0 12" />
      </>
    ),
  },
  'graduation-cap': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
      </>
    ),
  },
  key: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </>
    ),
  },
  logout: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 12h14l-3 -3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M18 15l3 -3" />
      </>
    ),
  },
  message: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 9l8 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 13l6 0" />
      </>
    ),
  },
  'device-desktop': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 5m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 20l10 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 16l0 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 16l0 4" />
      </>
    ),
  },
  dots: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  'layout-sidebar': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 4l0 16" />
      </>
    ),
  },
  plus: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 5l0 14" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 12l14 0" />
      </>
    ),
  },
  receipt: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 8l4 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 12l4 0" />
      </>
    ),
  },
  'file-text': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 9l1 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 13l6 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 17l6 0" />
      </>
    ),
  },
  settings: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      </>
    ),
  },
  'shield-check': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
      </>
    ),
  },
  shield: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
    ),
  },
  user: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </>
    ),
  },
  webhook: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="17" cy="17" r="3" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="6.5" cy="10" r="3.5" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="14" cy="6" r="3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9.5 8.7 L11.8 4.3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M8.5 12.8 L14.7 16.4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M15.7 8.2 L17 14" />
      </>
    ),
  },
} as const;

export type IconName = keyof typeof ICONS;

// API pública del subpath ./icon; solo penaliza el HMR de desarrollo
// (full reload en lugar de hot reload para este archivo).
// eslint-disable-next-line react-refresh/only-export-components
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

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
