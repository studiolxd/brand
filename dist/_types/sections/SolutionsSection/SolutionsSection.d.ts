import './SolutionsSection.css';
import { Card } from '../../molecules/Card/Card';
type CardProps = React.ComponentPropsWithoutRef<typeof Card>;
interface SolutionsSectionProps {
    /** Lista de tarjetas a mostrar. */
    items: CardProps[];
    /** Nombre accesible de la sección (aria-label). */
    'aria-label'?: string;
}
export declare function SolutionsSection({ items, 'aria-label': ariaLabel }: SolutionsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
