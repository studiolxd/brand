import type { ReactNode } from 'react';
import { type ContainerWidth } from '../../atoms/Container/Container';
import './Hero.css';
export interface HeroProps {
    /** El título de la portada: un `Heading` de nivel 1 a talla 10 (display). */
    title: ReactNode;
    /** La frase bajo el título, opcional: `Paragraph size="large"`. */
    description?: ReactNode;
    /** Uno o varios botones (`Button`), en fila con envoltura (`Inline`), bajo el texto. Van a talla `lg`: la escala del Hero lo pide, y el consumidor no tiene que acordarse de pasarla. */
    actions?: ReactNode;
    /** Ancho del contenido; la banda siempre llega de lado a lado. El mismo de la barra del `SiteHeader`. */
    width?: ContainerWidth;
    className?: string;
    id?: string;
}
/**
 * Cabecera de portada de un sitio público: el título a talla display, una
 * frase y, si hace falta, sus botones, todo alineado a la izquierda.
 *
 * Se monta **a sangre**, sin envoltorio: la sección trae su propio aire
 * vertical (`--hero-space-block-start/-end`, un peldaño menor en móvil) y su
 * `Container` interior para el aire lateral, con el mismo ancho que la barra
 * del `SiteHeader`. Así la portada se ve igual en cualquier página, sin
 * depender de dónde se cuelgue. Título y frase se limitan a la medida de
 * lectura (`--content-measure`); el fondo lo pone la superficie (`SiteShell`,
 * `.surface-dark`), no la sección.
 */
export declare function Hero({ title, description, actions, width, className, id }: HeroProps): import("react/jsx-runtime").JSX.Element;
