import './SolutionsSection.css';
import { Card } from '../../molecules/Card/Card';
type CardProps = React.ComponentPropsWithoutRef<typeof Card>;
interface SolutionsSectionProps {
    id?: string;
    /** Lista de tarjetas a mostrar. */
    items: CardProps[];
    /** Nombre accesible de la sección (aria-label). */
    'aria-label'?: string;
}
export declare function SolutionsSection({ id, items, 'aria-label': ariaLabel }: SolutionsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
