import type { Token } from '../../tokens/utils';
import './SpacingScale.css';

interface SpacingScaleProps {
  tokens: Token[];
}

export function SpacingScale({ tokens }: SpacingScaleProps) {
  return (
    <div className="spacing-scale">
      {tokens.map(({ name, value }) => (
        <div key={name} className="spacing-scale__row">
          <span className="spacing-scale__name">{name}</span>
          <span className="spacing-scale__value">{value}</span>
          <div
            className="spacing-scale__bar"
            style={{ width: value }}
          />
        </div>
      ))}
    </div>
  );
}
