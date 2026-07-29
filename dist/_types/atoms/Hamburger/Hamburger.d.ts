import type { ComponentPropsWithRef } from 'react';
import './Hamburger.css';
interface HamburgerProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
    isOpen?: boolean;
    onClick?: () => void;
    label?: string;
}
export declare function Hamburger({ isOpen, onClick, label, ...rest }: HamburgerProps): import("react").JSX.Element;
export {};
