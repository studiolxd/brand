import type { TextStyle } from '../../tokens/typography';
import './TextStyles.css';

const SAMPLE = 'El diseño instruccional convierte objetivos en experiencias';

/** Espécimen vivo de cada estilo compuesto, con sus cuatro tokens resueltos. */
export function TextStyles({ styles }: { styles: TextStyle[] }) {
  return (
    <div className="text-styles">
      {styles.map((s) => (
        <div key={s.cssPrefix} className="text-styles__row">
          <p
            className="text-styles__sample"
            style={{
              fontSize: s.size,
              fontWeight: s.weight,
              lineHeight: s.lineHeight,
              letterSpacing: s.letterSpacing,
            }}
          >
            {SAMPLE}
          </p>
          <dl className="text-styles__meta">
            <div><dt>{s.name}</dt><dd><code>{s.cssPrefix}-*</code></dd></div>
            <div><dt>Tamaño</dt><dd>{s.size} <code>{s.sizeRef}</code></dd></div>
            <div><dt>Peso</dt><dd>{s.weight} <code>{s.weightRef}</code></dd></div>
            <div><dt>Interlineado</dt><dd>{s.lineHeight} <code>{s.lineHeightRef}</code></dd></div>
            <div><dt>Tracking</dt><dd>{s.letterSpacing} <code>{s.letterSpacingRef}</code></dd></div>
          </dl>
        </div>
      ))}
    </div>
  );
}
