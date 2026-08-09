import './Steps.css';
export interface Step {
    /** Texto del paso. */
    text: string;
}
interface StepsProps {
    /** Lista de pasos. */
    steps: Step[];
    /** Clase adicional. */
    className?: string;
}
export declare function Steps({ steps, className }: StepsProps): import("react/jsx-runtime").JSX.Element;
export {};
