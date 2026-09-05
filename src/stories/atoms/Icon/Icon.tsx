import './Icon.css';

/**
 * Geometría del glifo `menu` en la retícula de 24: tres líneas de 18 unidades
 * (margen 3) a 6, 12 y 18. `close` se deriva de ella: es la línea 1 y la 3
 * giradas 45° sobre el centro, así que sus extremos son centro ± 9·cos(45°).
 */
// eslint-disable-next-line react-refresh/only-export-components -- geometría compartida por `menu` y `close`; vive junto al catálogo a propósito
export const MENU_GLYPH = (() => {
  const size = 24, inset = 3, rows = [6, 12, 18];
  const half = ((size - 2 * inset) / 2) * Math.SQRT1_2;
  const r = (n: number) => Math.round(n * 100) / 100;
  return { size, inset, rows, step: rows[1] - rows[0], diag: { a: r(size / 2 - half), b: r(size / 2 + half) } };
})();

const ICONS = {
  // Flecha: la punta es un tercio del largo y abre a 45° (proporción de la
  // marca), en trazo como el resto de iconos.
  arrow: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M0 12 H24 M16 4 L24 12 L16 20" />
    ),
  },
  'arrow-left': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M24 12 H0 M8 4 L0 12 L8 20" />
    ),
  },
  chevron: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M6 0 L18 12 L6 24" />
    ),
  },
  close: {
    viewBox: '0 0 24 24',
    // El aspa es exactamente lo que resulta de girar 45° las líneas 1 y 3 del
    // glifo `menu` sobre el centro: misma longitud, mismos extremos. Así el
    // MenuButton anima de uno a otro sin que las dos formas puedan divergir.
    render: () => (
      <path
        vectorEffect="non-scaling-stroke"
        strokeWidth="1"
        d={`M${MENU_GLYPH.diag.a} ${MENU_GLYPH.diag.a} L${MENU_GLYPH.diag.b} ${MENU_GLYPH.diag.b} M${MENU_GLYPH.diag.b} ${MENU_GLYPH.diag.a} L${MENU_GLYPH.diag.a} ${MENU_GLYPH.diag.b}`}
      />
    ),
  },
  menu: {
    viewBox: '0 0 24 24',
    // Tres líneas separadas (no un path) para que el MenuButton pueda animar
    // cada una por su cuenta hasta formar el aspa de `close`.
    render: () => (
      <>
        {MENU_GLYPH.rows.map((y) => (
          <line key={y} className="icon__line" vectorEffect="non-scaling-stroke" strokeWidth="1" x1={MENU_GLYPH.inset} y1={y} x2={MENU_GLYPH.size - MENU_GLYPH.inset} y2={y} />
        ))}
      </>
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
  minus: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 12l14 0" />
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
  copy: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 8m0 2a2 2 0 0 1 2 -2h9a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-9a2 2 0 0 1 -2 -2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M16 8v-2a2 2 0 0 0 -2 -2h-9a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h2" />
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
        <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
  },
  grid: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="19" r="1.5" fill="currentColor" stroke="none" />
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
  // Estrella de cinco puntas en la retícula de 24: radio exterior 9.2 desde el
  // centro y radio interior 3.6 (la proporción del pentagrama), primer vértice
  // arriba. Contorno como el resto del set; el relleno lo pone quien la usa
  // (`StarRating` pinta una segunda capa con `fill`).
  star: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 2.8 L14.12 9.09 L20.75 9.16 L15.42 13.11 L17.41 19.44 L12 15.6 L6.59 19.44 L8.58 13.11 L3.25 9.16 L9.88 9.09 Z" />
    ),
  },
  upload: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 16V4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 10l6-6 6 6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
      </>
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
  // Fase 2 de la unificación de iconos (huecos de `notes/ICONOS-2026-08-29.md`
  // en slxd). `chevron-down`/`chevron-up` son `chevron` girado 90° sobre el
  // centro de la retícula — mismos tres puntos, mismo trazo — para los sitios
  // que necesitan una dirección fija (sin la rotación por CSS que ya usan
  // Pagination/PrevNextNav sobre `chevron`). `chevron-right` es el propio
  // `chevron` con nombre explícito para quien migra 1:1 desde
  // `ChevronRightIcon`; no resuelve el caso del triángulo de expandir/colapsar
  // del árbol de carpetas de bricks (necesita rotación y evento sobre el
  // propio `<svg>`, que `Icon` no reenvía) — ese hueco sigue documentado y en
  // lucide, ver ICONOS-2026-08-29.md.
  'chevron-right': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M6 0 L18 12 L6 24" />
    ),
  },
  'chevron-down': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M24 6 L12 18 L0 6" />
    ),
  },
  'chevron-up': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M0 18 L12 6 L24 18" />
    ),
  },
  info: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="9" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M12 7.5l0 .01" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M12 11l0 5" />
      </>
    ),
  },
  'alert-triangle': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3 L21 20 H3 Z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M12 9l0 5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M12 17l0 .01" />
      </>
    ),
  },
  // Octágono (misma señal que la señal de "stop" vial) para distinguirlo de
  // `alert-triangle`: el error detiene, el aviso solo advierte.
  'alert-error': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 3h8l5 5v8l-5 5h-8l-5 -5v-8z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9 9l6 6M15 9l-6 6" />
      </>
    ),
  },
  connection: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9 3l0 4M15 3l0 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v3a5 5 0 0 1 -5 5a5 5 0 0 1 -5 -5z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 15l0 3l-2 3h4l-2 3" />
      </>
    ),
  },
  package: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 12l8 -4.5M12 12l0 9M12 12l-8 -4.5" />
      </>
    ),
  },
  archive: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 9l0 9a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2l0 -9" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M10 13l4 0" />
      </>
    ),
  },
  // Tres arcos apilados (patrón habitual del icono de base de datos): elipse
  // superior completa y dos tramos de lados + arco inferior.
  database: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 6a9 3 0 1 0 18 0a9 3 0 1 0 -18 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 6l0 6a9 3 0 0 0 18 0l0 -6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 12l0 6a9 3 0 0 0 18 0l0 -6" />
      </>
    ),
  },
  building: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 21l0 -17a1 1 0 0 1 1 -1l12 0a1 1 0 0 1 1 1l0 17" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M3 21l18 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9 8l.01 0M15 8l.01 0M9 12l.01 0M15 12l.01 0M9 16l.01 0M15 16l.01 0" />
      </>
    ),
  },
  send: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 20l16 -8l-16 -8l0 6.5l10 1.5l-10 1.5z" />
    ),
  },
  'external-link': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M19 13l0 6a2 2 0 0 1 -2 2l-10 0a2 2 0 0 1 -2 -2l0 -10a2 2 0 0 1 2 -2l6 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 3l6 0l0 6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9 15l12 -12" />
      </>
    ),
  },
  // Mazo: cabeza romboidal (la cara de impacto) + mango + base de sonido.
  // Sin la curva decorativa de la empuñadura de lucide/heroicons: tres trazos
  // rectos, como el resto del set.
  gavel: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M19 8l-3 -3l-8 8l3 3z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M11 13l-5 5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M3 21l8 0" />
      </>
    ),
  },
  inbox: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 5l4 0l2 4l6 0l2 -4l4 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 5l0 11a2 2 0 0 0 2 2l14 0a2 2 0 0 0 2 -2l0 -11" />
      </>
    ),
  },
  // Tres lomos de libro a distinta altura sobre una balda: la misma idea de
  // "colección" que `book-open`, en vertical.
  library: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 21l0 -15a1 1 0 0 1 1 -1l2 0a1 1 0 0 1 1 1l0 15" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 21l0 -17a1 1 0 0 1 1 -1l2 0a1 1 0 0 1 1 1l0 17" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M16 21l0 -13a1 1 0 0 1 1 -1l2 0a1 1 0 0 1 1 1l0 13" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M3 21l18 0" />
      </>
    ),
  },
  // Hoja de calendario: marco recto (como toda esquina del sistema), la línea
  // de la cabecera y las dos anillas que la cruzan por arriba.
  calendar: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M3 6 H21 V21 H3 Z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M3 10 H21" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M8 4 V8" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M16 4 V8" />
      </>
    ),
  },
  target: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="9" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="5" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="1" />
      </>
    ),
  },
  // Globo (círculo + ecuador + meridiano): construcción propia con la misma
  // lógica que `sun` (círculo + trazos), no el par de caracteres superpuestos
  // de lucide/heroicons.
  languages: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="9" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M3 12l18 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0 -18" />
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
