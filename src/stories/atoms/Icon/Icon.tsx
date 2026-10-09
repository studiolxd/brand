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

/**
 * Chevron: punta a 90° de 9×18 en el centro de la retícula, tan grande como
 * cabe en el área de 18 sin perder los 45° de cada brazo. Los componentes lo giran por CSS sobre el
 * centro, así que la caja centrada es lo que hace que cualquier giro caiga en
 * su sitio. Un solo objeto para `chevron` y `chevron-right`: dos nombres, un
 * dibujo, que no pueden divergir.
 */
const CHEVRON = {
  viewBox: '0 0 24 24',
  render: () => (
    <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7.5 3 L16.5 12 L7.5 21" />
  ),
};

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
  chevron: CHEVRON,
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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M3 12 C7.5 5.7 16.5 5.7 21 12 C16.5 18.3 7.5 18.3 3 12 Z" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="3.15" />
      </>
    ),
  },
  'eye-off': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" d="M3 12 C7.5 5.7 16.5 5.7 21 12 C16.5 18.3 7.5 18.3 3 12 Z" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="3.15" />
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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.5h4.5a1 1 0 0 1 1 1v6.5a1 1 0 0 1 -1 1h-4.5a1 1 0 0 1 -1 -1v-6.5a1 1 0 0 1 1 -1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4.5 16h4.5a1 1 0 0 1 1 1v2.5a1 1 0 0 1 -1 1h-4.5a1 1 0 0 1 -1 -1v-2.5a1 1 0 0 1 1 -1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 12h4.5a1 1 0 0 1 1 1v6.5a1 1 0 0 1 -1 1h-4.5a1 1 0 0 1 -1 -1v-6.5a1 1 0 0 1 1 -1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 3.5h4.5a1 1 0 0 1 1 1v2.5a1 1 0 0 1 -1 1h-4.5a1 1 0 0 1 -1 -1v-2.5a1 1 0 0 1 1 -1" />
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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3.5 3.5l6.5 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 3.5l6.5 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3.5 9.5a2 2 0 0 1 2 -2h2.5a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-2.5a2 2 0 0 1 -2 -2l0 -9" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 9.5a2 2 0 0 1 2 -2h2.5a2 2 0 0 1 2 2v2.5a2 2 0 0 1 -2 2h-2.5a2 2 0 0 1 -2 -2l0 -2.5" />
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
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 12l16 0" />
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
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M21 18a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2V6a2 2 0 0 1 2 -2h4l2 3h8a2 2 0 0 1 2 2z" />
    ),
  },
  'folder-open': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 20a2 2 0 0 1 -2 -2V6a2 2 0 0 1 2 -2h4l2 3h6a2 2 0 0 1 2 2v2M5 20l2.21 -8.26a1 1 0 0 1 .97 -.74H20a1 1 0 0 1 .98 1.2l-1.25 6.2a2 2 0 0 1 -1.96 1.6z" />
    ),
  },
  trash: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 7l16 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 11l0 6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14 11l0 6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </>
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
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3.07 10.875a9 9 0 1 1 .587 4.5m-.587 5.625v-5.625h5.625" />
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
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6.5 3 L21 12 L6.5 21 Z" />
    ),
  },
  pause: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5.25 4a1 1 0 0 1 1 -1h2.5a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-2.5a1 1 0 0 1 -1 -1z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M14.25 4a1 1 0 0 1 1 -1h2.5a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-2.5a1 1 0 0 1 -1 -1z" />
      </>
    ),
  },
  stop: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z" />
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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 3v16a2 2 0 0 0 2 2h16" />
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
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 12l5.33 5.33l10.67 -10.67" />
    ),
  },
  // Dos chevrons a 45° de 14×7, separados 4: lo más grandes que caben en el
  // área de 18 con ese hueco (7 + 4 + 7 = 18).
  'chevrons-up-down': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 10l7 -7l7 7" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7l-7 -7" />
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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 10l6 6l6 -6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3l0 13" />
      </>
    ),
  },
  'graduation-cap': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M21 9.3l-9 -3.6l-9 3.6l9 3.6l9 -3.6v5.4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6.6 10.74v4.86a5.4 2.7 0 0 0 10.8 0v-4.86" />
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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3.5 3.5m0 2a2 2 0 0 1 2 -2h13a2 2 0 0 1 2 2v13a2 2 0 0 1 -2 2h-13a2 2 0 0 1 -2 -2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 3.5l0 17" />
      </>
    ),
  },
  plus: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 4l0 16" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 12l16 0" />
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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 17V3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 -6l6 6" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
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
  // `chevron` (el mismo objeto, `CHEVRON`) con nombre explícito para quien
  // migra 1:1 desde `ChevronRightIcon`; no resuelve el caso del triángulo de expandir/colapsar
  // del árbol de carpetas de bricks (necesita rotación y evento sobre el
  // propio `<svg>`, que `Icon` no reenvía) — ese hueco sigue documentado y en
  // lucide, ver ICONOS-2026-08-29.md.
  'chevron-right': CHEVRON,
  'chevron-down': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M21 7.5 L12 16.5 L3 7.5" />
    ),
  },
  'chevron-up': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5 L12 7.5 L21 16.5" />
    ),
  },
  // `chevron` reflejado: los mismos tres puntos girados 180° sobre el centro.
  'chevron-left': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M16.5 3 L7.5 12 L16.5 21" />
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
  // Enchufe: patillas, cuerpo y cable, todo dentro del área de 18 (el cable
  // ya no baja hasta el borde del lienzo).
  connection: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9 3l0 3M15 3l0 3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6.5 6h11v2.5a5.5 5.5 0 0 1 -11 0z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 14l0 2l-2 2.5h4l-2 2.5" />
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
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 21l0 -16a2 2 0 0 1 2 -2l10 0a2 2 0 0 1 2 2l0 16" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M3 21l18 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M9 8l.01 0M15 8l.01 0M9 12l.01 0M15 12l.01 0M9 16l.01 0M15 16l.01 0" />
      </>
    ),
  },
  send: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 21l18 -9l-18 -9l0 7.31l11.25 1.69l-11.25 1.69z" />
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
  // Bandeja: borde superior estrecho, costados que abren hacia el canto
  // (pendiente 1:2) y la muesca del canto, por donde entra lo que llega.
  // Esquinas de radio 2, como todo marco del sistema.
  inbox: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 12L6.45 5.11A2 2 0 0 1 8.24 4H15.76A2 2 0 0 1 17.55 5.11L21 12V18A2 2 0 0 1 19 20H5A2 2 0 0 1 3 18Z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M21 12h-5l-2 3h-4l-2 -3H3" />
      </>
    ),
  },
  // Tres lomos de libro a distinta altura sobre una balda: la misma idea de
  // "colección" que `book-open`, en vertical.
  // Los lomos llevan radio 1, no el 2 de los marcos: con 4 de ancho, el
  // radio 2 los cierra en semicírculo y se leen como arcos, no como libros.
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
  // Hoja de calendario: marco con esquinas de radio 2 (las de `folder`,
  // `copy`, `credit-card`), la línea de la cabecera y las dos anillas que la
  // cruzan por arriba.
  calendar: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" d="M3 10 H21" />
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
  // Glifos del reproductor de creator (2026-10-10): los iconos de los bricks
  // y de la navegación que el catálogo no tenía. Mismo criterio que el resto
  // (Foundations → Iconografía): retícula de 24, área útil de 18, trazo de 1.
  // Candado: cuerpo de 14×10 con radio 2 y arco de radio 4, sin bocallave (la
  // lleva `shield-lock`, que es otra cosa: protección, no bloqueo).
  lock: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 10.5h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 10.5v-3a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  // Capas: el rombo de `package` (pendiente 1:2) y dos capas más a 4,5 de
  // paso. `layers-2` es el mismo dibujo con una capa menos, centrado.
  layers: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 4.5l-9 4.5l-9 -4.5z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 12l9 4.5l9 -4.5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5l9 4.5l9 -4.5" />
      </>
    ),
  },
  'layers-2': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 5.25l9 4.5l-9 4.5l-9 -4.5z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 14.25l9 4.5l9 -4.5" />
      </>
    ),
  },
  // Pieza de puzle: un marco de 13 con radio 2 y dos lengüetas de radio 2,5
  // centradas en su lado (arriba y a la derecha), que llegan al borde del área.
  puzzle: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5.5 7.5h2.5a2.5 2.5 0 1 1 4 0h2.5a2 2 0 0 1 2 2v2.5a2.5 2.5 0 1 1 0 4v2.5a2 2 0 0 1 -2 2h-9a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2z" />
    ),
  },
  // Varias imágenes: la construcción de `copy` (marco delante, el de detrás
  // solo asoma) con el monte y el sol dentro del marco delantero.
  images: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 7v-2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5 7h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 18l4 -4l7 7" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12.5" cy="11.5" r="1.5" />
      </>
    ),
  },
  // Clip: dibujado en vertical (tres tramos rectos y tres medias vueltas de
  // radio 3,5, 2,5 y 1,75) y girado 45° sobre el centro, con la caja recentrada.
  paperclip: {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M16.74 12.91L11.44 18.22A3.5 3.5 0 0 1 6.49 13.27L14.27 5.49A2.5 2.5 0 0 1 17.8 9.03L10.03 16.8A1.75 1.75 0 0 1 7.55 14.33L12.85 9.03" />
    ),
  },
  // Lista plegable: tres renglones y, delante del primero y del último, un
  // chevron de 3×6 a 45° (el de `chevron`, en pequeño) que indica que se despliega.
  'list-collapse': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 3l3 3l-3 3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 15l3 3l-3 3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 6h11" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 12h11" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 18h11" />
      </>
    ),
  },
  // Panel con franja superior: el marco de `layout-sidebar` con la división en
  // horizontal, a la misma distancia del borde.
  'panel-top': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5.5 3.5h13a2 2 0 0 1 2 2v13a2 2 0 0 1 -2 2h-13a2 2 0 0 1 -2 -2v-13a2 2 0 0 1 2 -2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3.5 9l17 0" />
      </>
    ),
  },
  // Galería horizontal: la pieza visible en el centro (radio 2) y el canto de
  // la anterior y la siguiente a los lados, a la altura del marco.
  'gallery-horizontal': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3.5 3.5l0 17" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M20.5 3.5l0 17" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 3.5h6a2 2 0 0 1 2 2v13a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-13a2 2 0 0 1 2 -2z" />
      </>
    ),
  },
  // Puntero haciendo clic: la flecha del puntero, simétrica sobre la diagonal y
  // con la punta en (9, 9), y cuatro rayos de 2,5 alrededor de la punta.
  'mouse-pointer-click': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 9l11 4.5l-4.5 2l-2 4.5z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 3l0 2.5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 9l2.5 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l-1.75 1.75" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4.5 13.5l1.75 -1.75" />
      </>
    ),
  },
  clock: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="9" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 7l0 5l3 3" />
      </>
    ),
  },
  // Círculo de contorno: el de `info`, `target` o `clock`, solo. `circle-dot` le
  // añade el centro de `target`, y `circle-dot-dashed` parte el contorno en ocho
  // arcos de 30° con huecos de 15°, dibujados (no con `stroke-dasharray`, que
  // con `non-scaling-stroke` no guarda la proporción y que no llega a nativo).
  circle: {
    viewBox: '0 0 24 24',
    render: () => (
      <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="9" />
    ),
  },
  'circle-dot': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="9" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="1" />
      </>
    ),
  },
  'circle-dot-dashed': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M13.17 3.08A9 9 0 0 1 17.48 4.86M19.14 6.52A9 9 0 0 1 20.92 10.83M20.92 13.17A9 9 0 0 1 19.14 17.48M17.48 19.14A9 9 0 0 1 13.17 20.92M10.83 20.92A9 9 0 0 1 6.52 19.14M4.86 17.48A9 9 0 0 1 3.08 13.17M3.08 10.83A9 9 0 0 1 4.86 6.52M6.52 4.86A9 9 0 0 1 10.83 3.08" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="12" r="1" />
      </>
    ),
  },
  // Casilla marcada: el marco de `layout-sidebar` con la marca de `circle-check`.
  'square-check': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5.5 3.5h13a2 2 0 0 1 2 2v13a2 2 0 0 1 -2 2h-13a2 2 0 0 1 -2 -2v-13a2 2 0 0 1 2 -2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
      </>
    ),
  },
  // Interruptor apagado: cápsula de 18×11 con el mando a la izquierda.
  'toggle-left': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8.5 6.5h7a5.5 5.5 0 0 1 0 11h-7a5.5 5.5 0 0 1 0 -11z" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="8.5" cy="12" r="2.5" />
      </>
    ),
  },
  // Flechas arriba/abajo: dos astas de 18 con la punta a 45° (brazos de 4, la
  // misma abertura que `upload`/`download` a la escala de dos flechas juntas).
  'arrow-up-down': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 21l0 -18" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 7l4 -4l4 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M17 3l0 18" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M13 17l4 4l4 -4" />
      </>
    ),
  },
  // Enlace: dos eslabones abiertos de radio 3,5 y el trazo que los une,
  // dibujados en horizontal y girados 45° sobre el centro.
  link: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8.11 10.94L5.64 13.41A3.5 3.5 0 0 0 10.59 18.36L13.06 15.89" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10.94 8.11L13.41 5.64A3.5 3.5 0 0 1 18.36 10.59L15.89 13.06" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9.88 14.12L14.12 9.88" />
      </>
    ),
  },
  // Carpeta con tablero: el dibujo de `folder` con las tres columnas dentro.
  'folder-kanban': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M21 18a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2V6a2 2 0 0 1 2 -2h4l2 3h8a2 2 0 0 1 2 2z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M8 11l0 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 11l0 2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M16 11l0 6" />
      </>
    ),
  },
  // Campo con cursor de texto: el campo (radio 2) se interrumpe donde lo cruza
  // el cursor, con remates rectos (sin las curvas de la letra de lucide).
  'text-cursor-input': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 8h-1a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-7" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 4l0 16" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 4l4 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 20l4 0" />
      </>
    ),
  },
  // Lápiz con línea: el lápiz en diagonal, de la punta (4, 20) a la goma, y la
  // línea que escribe sobre la misma base.
  'pen-line': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M13.5 6.5l4 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 20l8 0" />
      </>
    ),
  },
  'move-horizontal': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 12l18 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 8l-4 4l4 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4l-4 4" />
      </>
    ),
  },
  // Texto con inicial: una «A» de trazo (base y altura de los dos primeros
  // renglones) y los renglones que la siguen.
  'letter-text': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 12.5l4 -8l4 8" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.5l5 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 5.5l6 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 12.5l6 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 19.5l18 0" />
      </>
    ),
  },
  'person-standing': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="12" cy="4.5" r="1.5" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 8.5l6 2l6 -2" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 10.5l0 4" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 21l3 -6.5l3 6.5" />
      </>
    ),
  },
  // Gema: corona de 5, pabellón hasta la punta y las facetas que bajan de la
  // tabla a la punta.
  gem: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7 4h10l4 5l-9 11l-9 -11z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M3 9l18 0" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M10 4l-2 5l4 11l4 -11l-2 -5" />
      </>
    ),
  },
  // Bocadillo redondo: círculo de radio 9 abierto entre 120° y 150° para la
  // cola, que llega a la esquina del área. `message` es el bocadillo cuadrado
  // con renglones; `message-square-quote` es ese mismo bocadillo con comillas.
  // Las comillas de cierre (”): cabeza de anillo de radio 1 (el centro de
  // `target`) y cola que baja curvada a la izquierda, separadas 4 y centradas
  // en el cuerpo del bocadillo. Un trazo recto con la cola curva se leía «JJ».
  'message-circle': {
    viewBox: '0 0 24 24',
    render: () => (
      <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7.5 19.79A9 9 0 1 0 4.21 16.5L3 21z" />
    ),
  },
  'message-square-quote': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="10.25" cy="9.5" r="1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M11.25 9.5c0 2 -1 3.5 -2.5 4" />
        <circle vectorEffect="non-scaling-stroke" strokeWidth="1" cx="14.25" cy="9.5" r="1" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15.25 9.5c0 2 -1 3.5 -2.5 4" />
      </>
    ),
  },
  // Auriculares: el arco y las copas de `headset`, sin micro, y bajados una
  // unidad para quedar centrados (sin el micro el dibujo cabe en el área).
  headphones: {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 15v-3a8 8 0 1 1 16 0v3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M4 15a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M15 15a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" />
      </>
    ),
  },
  // Tecla de borrar (⌫): la tecla con la punta hacia la izquierda y el aspa
  // de `alert-error` centrada en su parte recta.
  'delete-left': {
    viewBox: '0 0 24 24',
    render: () => (
      <>
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10l-6 -7z" />
        <path vectorEffect="non-scaling-stroke" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12.5 9.5l5 5M17.5 9.5l-5 5" />
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
  /**
   * Talla del glifo. Las cinco fijas del sistema (`xs`…`xl`) o `text`, que no
   * es una talla sino una instrucción: el icono mide `1em`, o sea el tamaño
   * de la tipografía que lo rodea, y sube y baja con ella. Es la que usan el
   * enlace y el botón para que el glifo acompañe a su texto.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'text';
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
