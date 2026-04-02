import type { ReactNode } from 'react';
import './CoursesSection.css';

interface CoursesSectionProps {
  id?: string;
  /** Contenido: CardSquare y/o CardSplit. */
  children: ReactNode;
}

export function CoursesSection({ id, children }: CoursesSectionProps) {
  return (
    <section id={id} className="courses-section">
      {children}
    </section>
  );
}
