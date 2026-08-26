import './Link.css';
export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
    /** URL de destino. */
    href: string;
    children: React.ReactNode;
    /** Abre en nueva pestaña con `rel="noopener noreferrer"`. */
    external?: boolean;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Enlace de texto. La cara la pone la base para cualquier `<a>`; el
 * componente aporta `external` con su `rel` seguro y reenvía `ref` y
 * atributos (`aria-*`, `data-*`, `download`…). Para el router del producto no
 * hace falta: un `<Link>` de Next.js ya es un `<a>` y hereda la misma cara.
 */
export declare const Link: import("react").ForwardRefExoticComponent<LinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
