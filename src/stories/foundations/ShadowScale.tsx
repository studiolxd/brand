import type { Token } from '../../tokens/utils';
import './ShadowScale.css';

interface ShadowScaleProps {
  tokens: Token[];
}

export function ShadowScale({ tokens }: ShadowScaleProps) {
  return (
    <div className="shadow-scale">
      {tokens.map(({ name, value, description }) => (
        <div key={name} className="shadow-scale__row">
          <div
            className="shadow-scale__swatch"
            style={{ boxShadow: value === 'none' ? 'none' : value }}
          />
          <div className="shadow-scale__meta">
            <code className="shadow-scale__name">{name}</code>
            <span className="shadow-scale__value">{value}</span>
            <span className="shadow-scale__description">{description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
