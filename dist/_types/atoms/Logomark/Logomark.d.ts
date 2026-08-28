import './Logomark.css';
/** Lado del isotipo: las tallas de componente y, para piezas de marca, `xl` (64px). Es cuadrado. */
export type LogomarkSize = 'sm' | 'md' | 'lg' | 'xl';
export interface LogomarkProps {
    /** Talla. `md` (40px de lado) por defecto: la de una cabecera. */
    size?: LogomarkSize;
    /**
     * Nombre accesible. Sin él el isotipo es decorativo (`aria-hidden`), que es
     * lo correcto cuando lo envuelve un enlace con su propia etiqueta.
     */
    title?: string;
    className?: string;
}
/**
 * Isotipo de Studio LXD: la parte gráfica del logotipo, sin la firma. Cuadrado,
 * para donde no cabe el logotipo completo —favicon, icono de aplicación, avatar
 * de organización, la marca de una barra estrecha—. Hereda el color de la
 * superficie: en `surface-dark` pasa a claro por tokens.
 */
export declare function Logomark({ size, title, className }: LogomarkProps): import("react/jsx-runtime").JSX.Element;
