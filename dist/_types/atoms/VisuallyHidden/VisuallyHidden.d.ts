import './VisuallyHidden.css';
interface VisuallyHiddenProps {
    children: React.ReactNode;
    className?: string;
}
/** Oculta contenido visualmente pero lo mantiene accesible para lectores de pantalla. */
export declare function VisuallyHidden({ children, className }: VisuallyHiddenProps): import("react/jsx-runtime").JSX.Element;
export {};
