import './Link.css';
interface LinkProps {
    /** URL de destino. */
    href: string;
    children: React.ReactNode;
    /** Abre el enlace en una nueva pestaña con rel seguro. */
    external?: boolean;
    /** Clase adicional para variantes contextuales. */
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
export declare function Link({ href, children, external, className, onClick }: LinkProps): import("react/jsx-runtime").JSX.Element;
export {};
