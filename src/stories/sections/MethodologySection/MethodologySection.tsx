import './MethodologySection.css';

interface MethodologyStep {
  /** Texto del paso. */
  text: string;
}

interface MethodologySectionProps {
  /** Párrafo introductorio. */
  intro: string;
  /** Texto del botón CTA. */
  ctaLabel: string;
  /** URL del botón CTA. */
  ctaHref: string;
  /** Lista de pasos (normalmente 4). */
  steps: MethodologyStep[];
}

export function MethodologySection({
  intro,
  ctaLabel,
  ctaHref,
  steps,
}: MethodologySectionProps) {
  return (
    <section
      className="methodology-section"
    >
      <div className="methodology-section__intro">
        <p>{intro}</p>
        <a
          href={ctaHref}
          className="btn btn-primary"
        >
          {ctaLabel}
        </a>
      </div>
      <div className="methodology-section__steps">
        {steps.map((step, i) => (
          <div key={i} className="methodology-section__step">
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
