import './Logo.css';
interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
    /** Versión clara para fondos oscuros. Aplica .logo--dark. */
    dark?: boolean;
}
export declare function Logo({ width, height, className, dark }: LogoProps): import("react/jsx-runtime").JSX.Element;
export {};
