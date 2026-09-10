import './Banner.css';
export type BannerVariant = 'info' | 'warning';
export interface BannerProps extends React.ComponentPropsWithoutRef<'div'> {
    /** Intención de la barra. Default `'info'` (relleno prusia); `'warning'` es el relleno de aviso. */
    variant?: BannerVariant;
    /** El mensaje. Texto corriente: una frase, no un bloque. */
    children?: React.ReactNode;
    /** Ranura para las acciones — normalmente un `Button` del sistema. */
    actions?: React.ReactNode;
    /**
     * Qué hacer al descartar. Si se pasa, la barra pinta el aspa. La barra **no
     * se oculta sola**: es de sistema y quien decide si sigue en pantalla es la
     * aplicación, que sabe si la condición que la provocó sigue vigente.
     */
    onDismiss?: () => void;
    /**
     * Nombre accesible del aspa. Default: «Descartar aviso» (castellano). Una app
     * multiidioma debe pasarlo traducido.
     */
    dismissLabel?: string;
}
/**
 * Barra de sistema: un aviso persistente, a ancho completo, que acompaña a toda
 * la sesión y vive **fuera** del contenido —el caso de referencia es «estás
 * viendo la aplicación como alguien» con el botón de dejar de suplantar—.
 *
 * No es un `Alert`: el alert va **en el flujo**, dentro del contenido, y habla
 * de lo que hay a su alrededor (un formulario que falló, un dato que hace
 * falta). El banner habla del estado de la sesión entera y por eso no se
 * intercala en la lectura: se pega arriba (o abajo) del chrome.
 *
 * No fija su posición: `sticky` lo decide la aplicación con el layout del
 * sistema. Tampoco se oculta sola — `onDismiss` avisa y la app decide.
 *
 * Anuncia como `role="status"` con `aria-live="polite"`, que es lo que
 * corresponde a un aviso que no interrumpe. Ambos se pueden sobrescribir.
 *
 * Extiende los atributos nativos de `<div>` y reenvía `{...rest}` al raíz.
 */
export declare const Banner: import("react").ForwardRefExoticComponent<BannerProps & import("react").RefAttributes<HTMLDivElement>>;
