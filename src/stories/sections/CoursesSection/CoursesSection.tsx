import './CoursesSection.css';
import { CardSquare } from '../../molecules/CardSquare/CardSquare';
import { CardSplit } from '../../molecules/CardSplit/CardSplit';
import type { CardColor } from '../../molecules/Card/Card';

interface CourseSquare {
  href: string;
  title: string;
  description: string;
  ctaLabel: string;
  color: CardColor;
  image: { src: string; alt: string };
}

interface CourseSplit {
  href: string;
  title: string;
  description: string;
  ctaLabel: string;
  color: CardColor;
  image: { src: string; alt: string };
}

interface CoursesSectionProps {
  id?: string;
  squareCards: CourseSquare[];
  splitCards: CourseSplit[];
}

export function CoursesSection({ id, squareCards, splitCards }: CoursesSectionProps) {
  return (
    <section id={id} className="courses-section">
      <div className="cards-square">
        {squareCards.map((card) => (
          <CardSquare key={card.href} {...card} />
        ))}
      </div>
      <div className="cards-split">
        {splitCards.map((card) => (
          <CardSplit key={card.href} {...card} />
        ))}
      </div>
    </section>
  );
}
