import type { ReactNode } from 'react';
import './CoursesSection.css';
interface CoursesSectionProps {
    id?: string;
    /** Contenido: CardSquare y/o CardSplit. */
    children: ReactNode;
}
export declare function CoursesSection({ id, children }: CoursesSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
