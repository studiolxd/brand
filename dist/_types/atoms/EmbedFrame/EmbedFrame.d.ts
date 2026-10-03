import './EmbedFrame.css';
export interface EmbedFrameProps extends Omit<React.ComponentPropsWithoutRef<'iframe'>, 'title' | 'width' | 'height' | 'frameBorder'> {
    /**
     * Nombre accesible del marco: lo que anuncia el lector de pantalla al entrar
     * en él. Obligatorio — un `<iframe>` sin título es un hueco sin nombre.
     */
    title: string;
    /** Dirección del documento que se pinta dentro. */
    src?: string;
    /**
     * Qué alto llena. `container` (por defecto): el de la caja que le dan.
     * `viewport`: el de la ventana, para cuando el marco no tiene un contenedor
     * con alto —solo en la página, o como celda de `Columns`—.
     */
    fill?: 'container' | 'viewport';
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Un documento dentro de la página: el `<iframe>` del sistema. Ocupa todo el
 * ancho y todo el alto de su contenedor, sin borde ni fondo propios, y el
 * desplazamiento ocurre dentro del documento embebido, no en la página.
 *
 * **El alto lo pone el contenedor**: el marco llena la caja que le dan. Dentro
 * de `AppShell` esa caja es el contenido principal, que ya mide el resto de la
 * ventana bajo la cabecera y junto a la barra lateral. Sin contenedor con alto,
 * `fill="viewport"` le da el de la ventana.
 *
 * `ref` apunta al `<iframe>` —de ahí sale `contentWindow` para `postMessage`—
 * y `{...rest}` (`allow`, `sandbox`, `loading`, `referrerPolicy`, `name`,
 * `onLoad`, `aria-*`, `data-*`…) se reenvía tal cual.
 */
export declare const EmbedFrame: import("react").ForwardRefExoticComponent<EmbedFrameProps & import("react").RefAttributes<HTMLIFrameElement>>;
