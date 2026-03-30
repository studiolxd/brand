import './SolutionsSection.css';
import { Card } from '../../molecules/Card/Card';

type CardProps = React.ComponentPropsWithoutRef<typeof Card>;

interface SolutionsSectionProps {
  /** Lista de tarjetas a mostrar. */
  items: CardProps[];
  /** Nombre accesible de la sección (aria-label). */
  'aria-label'?: string;
}

export function SolutionsSection({ items, 'aria-label': ariaLabel }: SolutionsSectionProps) {
  return (
    <section className="solutions-section" aria-label={ariaLabel}>
      {items.map((item) => (
        <Card key={item.title} {...item} />
      ))}
    </section>
  );
}
