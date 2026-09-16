'use client';

import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './TypingIndicator.css';

/**
 * El verbo, y solo el verbo: «… está escribiendo…».
 *
 * La frase entera —«El asistente está escribiendo…»— tiene **dos mitades que
 * no se deciden en el mismo sitio**. Que alguien esté escribiendo es cromo: lo
 * dice igual cualquier chat de la suite, y el orden de las piezas es del
 * idioma. **Quién** escribe es contenido: el asistente se llama como lo llame
 * el producto, y un catálogo común lo dejaría diciendo «El asistente» en un
 * chat cuyo asistente tiene nombre propio.
 *
 * De ahí que la clave sea una **función**: el catálogo pone la plantilla y el
 * nombre entra por la prop `name`, que es obligatoria.
 */
export interface TypingIndicatorMessages {
  /** Plantilla del anuncio. Recibe el nombre de quien escribe. */
  typing: (name: string) => string;
}

export interface TypingIndicatorProps {
  /**
   * Quién está escribiendo. **Obligatoria y sin default**: el nombre del
   * asistente es contenido del producto, no cromo del sistema — ver
   * `TypingIndicatorMessages`.
   */
  name: string;
  /**
   * La frase entera, cuando la plantilla del catálogo no vale. **Sin
   * default**: sin ella, sale de `typingIndicator.typing(name)` del
   * `BrandMessagesProvider`.
   */
  label?: string;
}

/** Tres puntos cuadrados que laten en secuencia: «alguien está escribiendo». */
export function TypingIndicator({ name, label }: TypingIndicatorProps) {
  const t = useBrandMessages('typingIndicator');

  return (
    <span className="typing-indicator" role="status">
      <span className="typing-indicator__dot" aria-hidden="true" />
      <span className="typing-indicator__dot" aria-hidden="true" />
      <span className="typing-indicator__dot" aria-hidden="true" />
      <VisuallyHidden>{label ?? t('typing')(name)}</VisuallyHidden>
    </span>
  );
}
