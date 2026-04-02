import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import './Steps.css';

export interface Step {
  /** Texto del paso. */
  text: string;
}

interface StepsProps {
  /** Lista de pasos. */
  steps: Step[];
  /** Clase adicional. */
  className?: string;
}

export function Steps({ steps, className }: StepsProps) {
  return (
    <div className={['steps', className].filter(Boolean).join(' ')}>
      {steps.map((step, i) => (
        <div key={step.text} className="steps__item">
          <div className="steps__number">
            <span className="steps__number-inner">
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="steps__text">
            <Paragraph size="large" className="steps__text-inner">{step.text}</Paragraph>
          </div>
        </div>
      ))}
    </div>
  );
}
