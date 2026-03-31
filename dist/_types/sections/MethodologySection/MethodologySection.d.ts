import './MethodologySection.css';
interface MethodologyStep {
    /** Texto del paso. */
    text: string;
}
interface MethodologySectionProps {
    /** Encabezado introductorio. */
    intro: string;
    /** Texto del botón CTA. */
    ctaLabel: string;
    /** URL del botón CTA. */
    ctaHref: string;
    /** Lista de pasos (normalmente 4). */
    steps: MethodologyStep[];
    /** Nombre accesible de la sección (aria-label). */
    'aria-label'?: string;
}
export declare function MethodologySection({ intro, ctaLabel, ctaHref, steps, 'aria-label': ariaLabel, }: MethodologySectionProps): import("react/jsx-runtime").JSX.Element;
export {};
