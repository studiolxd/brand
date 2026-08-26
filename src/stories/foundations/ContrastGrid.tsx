import './ContrastMatrix.css';
import './ContrastGrid.css';

interface NamedColor { name: string; token: string; hex: string }

interface ContrastGridProps {
  /** Tintas: lo que se lee o se dibuja encima. */
  inks: NamedColor[];
  /** Superficies: sobre qué se pone. */
  surfaces: NamedColor[];
}

function luminance(hex: string): number {
  const c = (i: number) => parseInt(hex.slice(i, i + 2), 16) / 255;
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(c(1)) + 0.7152 * lin(c(3)) + 0.0722 * lin(c(5));
}

function contrastRatio(a: string, b: string): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/*
 * Umbrales WCAG 2.2: 4,5:1 es el mínimo (AA) para texto; 3:1 vale solo para
 * texto grande (≥24px, o ≥18,7px en negrita), iconos y bordes; 7:1 (AAA) es
 * el objetivo, no el mínimo.
 */
function grade(ratio: number) {
  if (ratio >= 7) return { label: 'AAA', cls: 'contrast-matrix__badge--aaa' };
  if (ratio >= 4.5) return { label: 'AA', cls: 'contrast-matrix__badge--aa' };
  if (ratio >= 3) return { label: '3:1', cls: 'contrast-matrix__badge--large' };
  return { label: 'No', cls: 'contrast-matrix__badge--fail' };
}

/** Una tinta por fila, una superficie por columna: toda la verdad en una tabla. */
export function ContrastGrid({ inks, surfaces }: ContrastGridProps) {
  return (
    <table className="contrast-matrix contrast-grid">
      <thead>
        <tr>
          <th>Tinta</th>
          {surfaces.map((s) => (
            <th key={s.token}>Sobre {s.name.toLowerCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {inks.map((ink) => (
          <tr key={ink.token}>
            <td>
              <span className="contrast-grid__ink" style={{ background: ink.hex }} aria-hidden="true" />
              {ink.name}
              <code className="contrast-grid__token">{ink.token}</code>
            </td>
            {surfaces.map((s) => {
              const ratio = contrastRatio(ink.hex, s.hex);
              const g = grade(ratio);
              return (
                <td key={s.token}>
                  <p className="contrast-matrix__preview" style={{ background: s.hex, color: ink.hex }}>
                    Texto de ejemplo
                  </p>
                  <span className="contrast-matrix__ratio">{ratio.toFixed(2)}:1</span>{' '}
                  <span className={`contrast-matrix__badge ${g.cls}`}>{g.label}</span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface FillGridProps {
  fills: { name: string; fill: NamedColor; ink: NamedColor }[];
}

/** Rellenos con su tinta encima: el uso correcto de los colores de marca. */
export function FillGrid({ fills }: FillGridProps) {
  return (
    <table className="contrast-matrix contrast-grid">
      <thead>
        <tr>
          <th>Relleno</th>
          <th>Tinta encima</th>
          <th>Vista previa</th>
          <th>Ratio</th>
          <th>WCAG</th>
        </tr>
      </thead>
      <tbody>
        {fills.map(({ name, fill, ink }) => {
          const ratio = contrastRatio(ink.hex, fill.hex);
          const g = grade(ratio);
          return (
            <tr key={fill.token}>
              <td>{name}<code className="contrast-grid__token">{fill.token}</code></td>
              <td><code className="contrast-grid__token">{ink.token}</code></td>
              <td style={{ padding: 0 }}>
                <p className="contrast-matrix__preview" style={{ background: fill.hex, color: ink.hex }}>Texto de ejemplo</p>
              </td>
              <td className="contrast-matrix__ratio">{ratio.toFixed(2)}:1</td>
              <td><span className={`contrast-matrix__badge ${g.cls}`}>{g.label}</span></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
