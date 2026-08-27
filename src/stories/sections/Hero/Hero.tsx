import type { ReactNode } from 'react';
import { Container } from '../../atoms/Container/Container';
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
  className?: string;
  id?: string;
}

/**
 * Cabecera de portada de un sitio público: el título a talla display, una
 * frase y, si hace falta, sus botones, todo alineado a la izquierda en una
 * banda amplia (`Container` `section` a ancho `xl`). Título y frase se limitan
 * a la medida de lectura (`--content-measure`); el fondo lo pone la
 * superficie (`SiteShell`, `.surface-dark`), no la sección.
 */
export function Hero({ title, description, actions, className, id }: HeroProps) {
  return (
    <Container as="section" width="xl" space="2xl" id={id} className={['hero', className].filter(Boolean).join(' ')}>
      <Heading level={1} size={10} className="hero__title">{title}</Heading>
      {description && <Paragraph size="large" className="hero__description">{description}</Paragraph>}
      {actions && <Inline className="hero__actions">{actions}</Inline>}
    </Container>
  );
}
