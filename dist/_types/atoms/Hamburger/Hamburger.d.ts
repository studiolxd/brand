import './Hamburger.css';
interface HamburgerProps {
    isOpen?: boolean;
    onClick?: () => void;
    label?: string;
}
export declare function Hamburger({ isOpen, onClick, label, }: HamburgerProps): import("react/jsx-runtime").JSX.Element;
export {};
