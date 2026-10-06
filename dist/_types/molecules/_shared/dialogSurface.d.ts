import type { ReactNode } from 'react';
import './dialogSurface.css';
/**
 * Velo del diálogo. `className` es la clase BEM del contenedor, que es donde
 * este mapea sus tokens `*-backdrop-*` sobre las variables de la superficie.
 */
export declare function DialogOverlay({ className }: {
    className: string;
}): import("react/jsx-runtime").JSX.Element;
export interface DialogHeaderProps {
    /**
     * `inline`: título y aspa en la misma fila (el diálogo centrado).
     * `stacked`: título y descripción apilados, con sitio para el aspa que el
     * contenedor posiciona sobre la esquina (el cajón).
     */
    layout: 'inline' | 'stacked';
    /** Solo queda el aspa: se va a su esquina. Únicamente en `inline`. */
    noTitle?: boolean;
    className: string;
    children: ReactNode;
}
/**
 * Cabecera del diálogo, en una de sus dos colocaciones. Es un `<div>`, no un
 * `<header>`: el diálogo sale por un portal al `<body>`, fuera de cualquier
 * `<main>`/`<section>`, y ahí un `<header>` es un `banner` — el segundo de la
 * página, junto al de la aplicación. El diálogo ya se nombra por su título.
 */
export declare function DialogHeader({ layout, noTitle, className, children }: DialogHeaderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Pie de acciones. Fila a la derecha; por debajo del punto de ruptura, botones
 * apilados a todo el ancho con la acción principal arriba.
 */
export declare function DialogFooter({ className, children, ...rest }: {
    className: string;
} & React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
