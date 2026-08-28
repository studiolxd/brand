import type { ReactNode } from 'react';
import { Columns } from '../../atoms/Columns/Columns';
import { Container, type ContainerWidth } from '../../atoms/Container/Container';
import { Heading, type HeadingLevel, type HeadingSize } from '../../atoms/Heading/Heading';
import { Inline } from '../../atoms/Inline/Inline';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import './Highlight.css';

export interface HighlightProps {
  /** El titular de la banda. */
  title: ReactNode;
  /** El texto bajo el titular. */
  description?: ReactNode;
  /** Uno o varios `Button`, en fila con envoltura (`Inline`). */
  actions?: ReactNode;
  /** Slot libre al lado del texto: una imagen, un vídeo, una tarjeta. */
  media?: ReactNode;
  /** De qué lado va la media. Por defecto a la derecha del texto. */
  mediaPosition?: 'start' | 'end';
  /** Superficie de la banda. Por defecto oscura: es una banda destacada. */
  surface?: 'dark' | 'light';
  /** Nivel semántico del titular. Por defecto `2`. */
  titleLevel?: HeadingLevel;
  /** Talla del titular. Por defecto `8` (40px), un peldaño por debajo del `Hero`. */
  titleSize?: HeadingSize;
  /** Ancho del contenido, como en el resto de bandas. */
  width?: ContainerWidth;
  className?: string;
  id?: string;
}

/**
 * La banda destacada de una página pública: un titular, un texto, sus botones
 * y, si hace falta, algo al lado —una imagen, un vídeo, una tarjeta—. Es lo
 * que corta una portada en dos y dice «esto es lo importante».
 *
 * Va sobre superficie oscura por defecto y no pinta ningún color propio: el
 * lienzo lo pone el `Container`, y con `surface="light"` la banda entera
 * voltea. El reparto en dos columnas es el `Columns` del sistema, así que en
 * móvil se apila sin punto de ruptura escrito aquí.
 */
export function Highlight({
  title,
  description,
  actions,
  media,
  mediaPosition = 'end',
  surface = 'dark',
  titleLevel = 2,
  titleSize = 8,
  width = 'xl',
  className,
  id,
}: HighlightProps) {
  const text = (
    <div className="highlight__text">
      <Heading level={titleLevel} size={titleSize} className="highlight__title">{title}</Heading>
      {description && <Paragraph size="large" className="highlight__description">{description}</Paragraph>}
      {actions && <Inline className="highlight__actions">{actions}</Inline>}
    </div>
  );

  return (
    <Container
      as="section"
      id={id}
      width={width}
      space="2xl"
      surface={surface === 'dark' ? 'dark' : undefined}
      className={['highlight', className].filter(Boolean).join(' ')}
    >
      {media ? (
        <Columns align="center" gap="lg">
          {mediaPosition === 'start' ? (
            <>
              <div className="highlight__media">{media}</div>
              {text}
            </>
          ) : (
            <>
              {text}
              <div className="highlight__media">{media}</div>
            </>
          )}
        </Columns>
      ) : (
        text
      )}
    </Container>
  );
}
