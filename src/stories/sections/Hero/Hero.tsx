import type { ReactNode } from 'react';
import { Container, type ContainerWidth } from '../../atoms/Container/Container';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Inline } from '../../atoms/Inline/Inline';
import './Hero.css';

export interface HeroProps {
  /** El título de la portada: un `Heading` de nivel 1 a talla 10 (display). */
  title: ReactNode;
  /** La frase bajo el título, opcional: `Paragraph size="large"`. */
  description?: ReactNode;
  /** Uno o varios botones (`Button`), en fila con envoltura (`Inline`), bajo el texto. */
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
export function Hero({ title, description, actions, width = 'xl', className, id }: HeroProps) {
  return (
    <section id={id} className={['hero', className].filter(Boolean).join(' ')}>
      <Container width={width} innerClassName="hero__inner">
        <Heading level={1} size={10} className="hero__title">{title}</Heading>
        {description && <Paragraph size="large" className="hero__description">{description}</Paragraph>}
        {actions && <Inline className="hero__actions">{actions}</Inline>}
      </Container>
    </section>
  );
}
