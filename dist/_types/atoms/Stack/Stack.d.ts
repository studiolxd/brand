import type { ReactNode } from 'react';
import './Stack.css';
export interface StackProps extends React.ComponentPropsWithoutRef<'div'> {
    /** Aire entre piezas: base o amplio. */
    gap?: 'md' | 'lg';
    /**
     * Alineación de las piezas en el eje cruzado. `'start'` (por defecto):
     * cada pieza mide lo suyo, sin estirarse —el caso de uso documentado de
     * agrupar piezas pequeñas—. `'stretch'`: las piezas ocupan todo el ancho
     * disponible —para cuando `Stack` hace de raíz de una página con
     * contenido ancho (tablas, formularios, tarjetas) que debe llegar al
     * borde del contenedor.
     */
    align?: 'start' | 'stretch';
    /**
     * Orden en móvil (por debajo de `md`): el del JSX o el inverso. En
     * escritorio manda siempre el JSX. Invierte solo el orden visual —no el del
     * DOM ni el de tabulación—, así que solo para piezas donde eso no importa
     * (un enlace de vuelta sobre la cabecera).
     */
    mobileOrder?: 'normal' | 'reverse';
    children: ReactNode;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Apila piezas con aire por token. Es el envoltorio explícito de «estas piezas
 * van juntas» (una cabecera y su enlace de vuelta en una celda de `Columns`),
 * sin fondo ni semántica: `div.stack`.
 *
 * `{...rest}` (`role`, `aria-*`, `id`, `data-*`…) se reenvía al `<div>`: una
 * pila puede ser el grupo con nombre accesible que pide un formulario sin
 * tener que envolverla en un elemento nativo aparte.
 */
export declare function Stack({ gap, align, mobileOrder, children, className, ...rest }: StackProps): import("react/jsx-runtime").JSX.Element;
