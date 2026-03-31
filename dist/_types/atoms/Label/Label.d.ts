import './Label.css';
interface LabelProps {
    htmlFor: string;
    children: React.ReactNode;
    hidden?: boolean;
}
export declare function Label({ htmlFor, children, hidden }: LabelProps): import("react/jsx-runtime").JSX.Element;
export {};
