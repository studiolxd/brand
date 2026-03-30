import './SolutionsSection.css';
import { Card } from '../../molecules/Card/Card';

type CardProps = React.ComponentPropsWithoutRef<typeof Card>;

interface SolutionsSectionProps {
  /** Lista de tarjetas a mostrar. */
  items: CardProps[];
}

export function SolutionsSection({ items }: SolutionsSectionProps) {
  return (
    <section className="solutions-section">
      {items.map((item, i) => (
        <Card key={i} {...item} />
      ))}
    </section>
  );
}
