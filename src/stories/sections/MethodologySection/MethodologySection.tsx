import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Steps } from '../../organisms/Steps/Steps';
import type { Step } from '../../organisms/Steps/Steps';
import './MethodologySection.css';

interface MethodologySectionProps {
  id?: string;
  /** Encabezado introductorio. */
  intro: string;
  /** Texto del botón CTA. */
  ctaLabel: string;
  /** URL del botón CTA. */
  ctaHref: string;
  /** Lista de pasos. */
  steps: Step[];
  /** Nombre accesible de la sección (aria-label). */
  'aria-label'?: string;
}

export function MethodologySection({
  id,
  intro,
  ctaLabel,
  ctaHref,
  steps,
  'aria-label': ariaLabel,
}: MethodologySectionProps) {
  return (
    <section id={id} className="methodology-section" aria-label={ariaLabel}>
      <div className="methodology-section__intro">
        <Heading level={2} weight="semibold">{intro}</Heading>
        <Button href={ctaHref} variant="primary">{ctaLabel}</Button>
      </div>
      <Steps steps={steps} />
    </section>
  );
}
