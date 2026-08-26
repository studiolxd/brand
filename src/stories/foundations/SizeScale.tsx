import type { Token } from '../../tokens/utils';
import './SizeScale.css';

/** Cada talla como control y como cuadrado: lo mismo mide un campo que un avatar. */
export function SizeScale({ tokens }: { tokens: Token[] }) {
  return (
    <div className="size-scale">
      {tokens.map(({ name, value }) => (
        <div key={name} className="size-scale__row">
          <div className="size-scale__control" style={{ blockSize: value }}>Control</div>
          <div className="size-scale__square" style={{ inlineSize: value, blockSize: value }} aria-hidden="true" />
          <div className="size-scale__meta">
            <code>{name}</code>
            <span>{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
