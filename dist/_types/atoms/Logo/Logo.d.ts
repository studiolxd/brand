import './Logo.css';
/** Alto del logotipo: las tallas de componente y, para la cabecera del sitio, `xl` (64px, la talla ilustrativa de la escala de iconos) y `2xl` (85px, un peldaño más por el mismo salto de la escala). El ancho sale de la proporción. */
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
/** @deprecated `xxl` es `2xl` desde la v51 (las tallas del sistema se escriben `xs`…`4xl`). Se retira en la v52. */
export type LogoSizeDeprecated = 'xxl';
export interface LogoProps {
    /**
     * Talla. `md` (40px de alto) por defecto: la de una cabecera. `xxl` es un
     * alias obsoleto de `2xl`, que sigue funcionando con un aviso en desarrollo
     * hasta la v52.
     */
    size?: LogoSize | LogoSizeDeprecated;
    className?: string;
}
/**
 * Logotipo de Studio LXD. Es decorativo (`aria-hidden`): el nombre lo da el
 * enlace o el elemento que lo envuelve. Hereda el color de la superficie —en
 * `surface-dark` pasa a claro por tokens— y su alto es una talla de componente,
 * de modo que en una barra de 40px mide 40px sin que nadie lo ajuste.
 */
export declare function Logo({ size: sizeProp, className }: LogoProps): import("react/jsx-runtime").JSX.Element;
