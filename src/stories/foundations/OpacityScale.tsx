import type { Token } from '../../tokens/utils';
import './OpacityScale.css';

interface OpacityScaleProps {
  tokens: Token[];
}

export function OpacityScale({ tokens }: OpacityScaleProps) {
  return (
    <div className="opacity-scale">
      {tokens.map(({ name, value, description }) => (
        <div key={name} className="opacity-scale__row">
          <div className="opacity-scale__swatch-wrap">
            <div
              className="opacity-scale__swatch"
              style={{ opacity: value }}
            />
          </div>
          <div className="opacity-scale__meta">
            <code className="opacity-scale__name">{name}</code>
            <span className="opacity-scale__value">{value}</span>
            <span className="opacity-scale__description">{description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
