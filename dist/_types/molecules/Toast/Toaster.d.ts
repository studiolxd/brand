import './Toast.css';
export interface ToasterProps {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center';
}
export declare function Toaster({ position }: ToasterProps): import("react/jsx-runtime").JSX.Element;
