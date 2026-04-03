import './List.css';
interface ListProps {
    /** Tipo de lista: con viñetas, numerada o sin decoración. */
    type?: 'unordered' | 'ordered' | 'plain';
    className?: string;
    children: React.ReactNode;
}
export declare function List({ type, className, children }: ListProps): import("react/jsx-runtime").JSX.Element;
export {};
