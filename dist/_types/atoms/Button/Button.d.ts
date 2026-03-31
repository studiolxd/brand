import './Button.css';
interface ButtonProps {
    /** Visual variant of the button */
    variant?: 'primary' | 'ghost' | 'form';
    /** Size of the button */
    size?: 'sm' | 'md' | 'lg';
    /** Stretches the button to full container width */
    block?: boolean;
    /** Button label */
    children: React.ReactNode;
    /** HTML button type (ignored when href is set) */
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    /** Renders as <a> when provided */
    href?: string;
    /** Adds target="_blank" rel="noopener noreferrer" (solo con href) */
    external?: boolean;
}
export declare function Button({ variant, size, block, children, type, disabled, onClick, href, external, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
