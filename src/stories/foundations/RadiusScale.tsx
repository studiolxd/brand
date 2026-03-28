import type { Token } from '../../tokens/utils';
import './RadiusScale.css';

interface RadiusScaleProps {
  tokens: Token[];
}

export function RadiusScale({ tokens }: RadiusScaleProps) {
  return (
    <div className="radius-scale">
      {tokens.map(({ name, value, description }) => (
        <div key={name} className="radius-scale__row">
          <div
            className="radius-scale__swatch"
            style={{ borderRadius: value }}
          />
          <div className="radius-scale__meta">
            <code className="radius-scale__name">{name}</code>
            <span className="radius-scale__value">{value}</span>
            <span className="radius-scale__description">{description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
