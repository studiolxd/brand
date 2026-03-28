import './ContrastMatrix.css';

interface PaletteColor {
  name: string;
  token: string;
  hex: string;
}

interface ContrastMatrixProps {
  /** Label shown in the preview swatch */
  foregroundLabel: string;
  /** Foreground hex color */
  foreground: string;
  /** Colors to test against, read from token JSON */
  colors: PaletteColor[];
}

function luminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lin = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function badge(ratio: number) {
  if (ratio >= 7) return { label: 'AAA', cls: 'contrast-matrix__badge--aaa' };
  if (ratio >= 4.5) return { label: 'AA', cls: 'contrast-matrix__badge--aa' };
  return { label: 'Fail', cls: 'contrast-matrix__badge--fail' };
}

export function ContrastMatrix({ foregroundLabel, foreground, colors }: ContrastMatrixProps) {
  return (
    <table className="contrast-matrix">
      <thead>
        <tr>
          <th>Fondo</th>
          <th>Vista previa</th>
          <th>Ratio</th>
          <th>WCAG</th>
        </tr>
      </thead>
      <tbody>
        {colors.map(({ name, token, hex }) => {
          const ratio = contrastRatio(foreground, hex);
          const { label, cls } = badge(ratio);
          return (
            <tr key={token}>
              <td>{name}</td>
              <td style={{ padding: 0 }}>
                <p
                  className="contrast-matrix__preview"
                  style={{ background: hex, color: foreground }}
                >
                  {foregroundLabel}
                </p>
              </td>
              <td className="contrast-matrix__ratio">{ratio.toFixed(2)}:1</td>
              <td>
                <span className={`contrast-matrix__badge ${cls}`}>{label}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
