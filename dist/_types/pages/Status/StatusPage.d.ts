import type { ReactNode } from 'react';
import { type AplicacionEstado, type SaludConjunto } from './_datos';
export interface StatusPageProps {
    /** El tablero: lo único vivo de la página. */
    children: ReactNode;
    /** Tema que enseña el conmutador. Solo eso: el oscuro del lienzo lo pone la story. */
    theme?: 'light' | 'dark';
}
/**
 * El panel de estado (`status.slxd.app`) montado con las piezas del DS:
 * `AppRoot` + `PublicPageShell` con la cabecera de la marca y, en el pie, las
 * preferencias y las legales.
 *
 * La cabecera **no lleva índice**: el panel es un sitio de una sola página que
 * debe seguir de pie cuando la suite no lo está, y un menú lleno de enlaces a
 * servicios caídos sería una promesa que no puede cumplir. Sin índice ni
 * ajustes, `SiteHeader` no monta el panel y su botón de menú desaparece solo,
 * así que los dos conmutadores —idioma y tema— bajan al pie, como en el alta.
 */
export declare function StatusPage({ children, theme }: StatusPageProps): import("react/jsx-runtime").JSX.Element;
export interface StatusBoardProps {
    /** Cómo fue la consulta al monitor: pidiéndola, contestada, o sin respuesta. */
    estado: 'cargando' | 'listo' | 'incomunicado';
    /** Cómo está el conjunto. Solo con `listo`. */
    salud?: SaludConjunto;
    /** Las aplicaciones, en el orden en que se pintan. Solo con `listo`. */
    aplicaciones?: readonly AplicacionEstado[];
}
/**
 * El tablero: un apartado por aplicación con su nombre, su enlace, cómo está
 * ahora y su tira de 30 días.
 *
 * La página se sirve estática, así que el dato lo pide el navegador al monitor
 * —que vive en otro servidor— al cargar y cada minuto. Que el monitor no
 * conteste no es un error de la página: es información, y se enseña como tal.
 */
export declare function StatusBoard({ estado, salud, aplicaciones }: StatusBoardProps): import("react/jsx-runtime").JSX.Element;
