import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import './MethodologySection.css';

interface MethodologyStep {
  /** Texto del paso. */
  text: string;
}

interface MethodologySectionProps {
  /** Encabezado introductorio. */
  intro: string;
  /** Texto del botón CTA. */
  ctaLabel: string;
  /** URL del botón CTA. */
  ctaHref: string;
  /** Lista de pasos (normalmente 4). */
  steps: MethodologyStep[];
  /** Nombre accesible de la sección (aria-label). */
  'aria-label'?: string;
}

export function MethodologySection({
  intro,
  ctaLabel,
  ctaHref,
  steps,
  'aria-label': ariaLabel,
}: MethodologySectionProps) {
  return (
    <section className="methodology-section" aria-label={ariaLabel}>
      <div className="methodology-section__intro">
        <Heading level={2} weight="semibold">{intro}</Heading>
        <Button href={ctaHref} variant="primary">{ctaLabel}</Button>
      </div>
      <div className="methodology-section__steps">
        {steps.map((step, i) => (
          <div key={step.text} className="methodology-section__step">
            <div className="methodology-section__number">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="methodology-section__text">{step.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
