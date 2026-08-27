import type { ReactNode } from 'react';
import { Heading, type HeadingProps } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import './PageIntro.css';

export interface PageIntroProps {
  /** El título de la página: un `Heading` de nivel 1 (o el que diga `level`). */
  title: ReactNode;
  /** Una frase bajo el título, opcional. */
  description?: ReactNode;
  /** Nivel del título: 1 por defecto (una cabecera de página). */
  level?: HeadingProps['level'];
  /** Talla tipográfica del título; si no, la que el Heading da a su nivel. */
  size?: HeadingProps['size'];
  className?: string;
}

/**
 * Cabecera de una página: el título y, si hace falta, una frase debajo, con
 * el aire justo entre los dos. Es un `header`: lo que abre acceso, registro,
 * recuperación… y cualquier página que empiece por su nombre. Va como celda
 * de `Columns` o directamente en el `Container`.
 */
export function PageIntro({ title, description, level = 1, size, className }: PageIntroProps) {
  return (
    <header className={['page-intro', className].filter(Boolean).join(' ')}>
      <Heading level={level} size={size}>{title}</Heading>
      {description && <Paragraph>{description}</Paragraph>}
    </header>
  );
}
