import './Logo.css';
/** Alto del logotipo: las tallas de componente y, para la cabecera del sitio, `xl` (64px, la talla ilustrativa de la escala de iconos). El ancho sale de la proporción. */
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';
export interface LogoProps {
    /** Talla. `md` (40px de alto) por defecto: la de una cabecera. */
    size?: LogoSize;
    className?: string;
}
/**
 * Logotipo de Studio LXD. Es decorativo (`aria-hidden`): el nombre lo da el
 * enlace o el elemento que lo envuelve. Hereda el color de la superficie —en
 * `surface-dark` pasa a claro por tokens— y su alto es una talla de componente,
 * de modo que en una barra de 40px mide 40px sin que nadie lo ajuste.
 */
export declare function Logo({ size, className }: LogoProps): import("react/jsx-runtime").JSX.Element;
