import type { Token } from '../../tokens/utils';
import './MotionScale.css';

interface MotionScaleProps {
  tokens: Token[];
  type: 'duration' | 'easing';
}

export function MotionScale({ tokens, type }: MotionScaleProps) {
  return (
    <div className="motion-scale">
      {tokens.map(({ name, value, description }) => {
        const transition =
          type === 'duration'
            ? `background-color ${value} var(--motion-easing-default)`
            : `background-color var(--motion-duration-base) ${value}`;
        return (
          <div key={name} className="motion-scale__row">
            <div
              className="motion-scale__swatch"
              style={{ transition }}
              title="Pasa el cursor para ver la transición"
            />
            <div className="motion-scale__meta">
              <code className="motion-scale__name">{name}</code>
              <span className="motion-scale__value">{value}</span>
              <span className="motion-scale__description">{description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
