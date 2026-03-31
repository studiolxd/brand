import './List.css';
interface ListProps {
    /** Tipo de lista: con viñetas o numerada. */
    type?: 'unordered' | 'ordered';
    children: React.ReactNode;
}
export declare function List({ type, children }: ListProps): import("react/jsx-runtime").JSX.Element;
export {};
