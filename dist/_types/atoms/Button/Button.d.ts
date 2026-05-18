import './Button.css';
export interface ButtonProps {
    /** Visual variant of the button */
    variant?: 'primary' | 'outline' | 'ghost' | 'text';
    /** Applies destructive (red) color intent — composable with outline and text */
    destructive?: boolean;
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
    /** Merges props onto the child element instead of rendering a wrapper (e.g. Next.js Link) */
    asChild?: boolean;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLElement>>;
