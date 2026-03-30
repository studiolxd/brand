import type { Token } from '../../tokens/utils';
import './TypeScale.css';

interface TypeScaleProps {
  tokens: Token[];
}

const SAMPLE = 'El veloz murciélago hindú comía feliz cardillo';

export function TypeScale({ tokens }: TypeScaleProps) {
  return (
    <div className="type-scale">
      {[...tokens].reverse().map(({ name, value, description }) => (
        <div key={name} className="type-scale__row">
          <div
            className="type-scale__sample"
            style={{ fontSize: value }}
          >
            {SAMPLE}
          </div>
          <div className="type-scale__meta">
            <span className="type-scale__token">{name}</span>
            <span className="type-scale__value">{value}</span>
            {description && (
              <span className="type-scale__desc">{description}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
