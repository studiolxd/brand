import { type IconName } from '../Icon/Icon';
import './Link.css';
export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
    /** URL de destino. Con `render`, la lleva el elemento del router. */
    href?: string;
    children: React.ReactNode;
    /** Abre en nueva pestaña con `rel="noopener noreferrer"`. */
    external?: boolean;
    /** Un icono junto al texto («← Volver», «Descargar ↓»). Decorativo: el texto ya lo dice. */
    icon?: IconName;
    /** Dónde va el icono: delante (`start`, por defecto) o detrás del texto. */
    iconPosition?: 'start' | 'end';
    /** Elemento sobre el que renderizar el enlace: el `Link` del router del producto (`render={<NextLink href="…" />}`), que recibe icono, clases y texto. */
    render?: React.ReactElement<Record<string, unknown>>;
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
