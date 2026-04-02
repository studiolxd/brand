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
export declare function MethodologySection({ id, intro, ctaLabel, ctaHref, steps, 'aria-label': ariaLabel, }: MethodologySectionProps): import("react/jsx-runtime").JSX.Element;
export {};
