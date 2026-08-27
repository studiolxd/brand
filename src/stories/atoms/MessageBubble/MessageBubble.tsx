import { forwardRef } from 'react';
import './MessageBubble.css';

export interface MessageBubbleProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'role'> {
  /**
   * Quién envía el mensaje. No es el `role` de ARIA: decide de qué lado se
   * alinea el globo y en qué esquina nace la cola.
   */
  role: 'user' | 'assistant';
  children: React.ReactNode;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * El globo de un mensaje de chat. **No lleva relleno**: es contorno de 1px y
 * esquinas rectas, como el resto del sistema. Quien distingue al emisor es la
 * alineación —el usuario a la derecha, el asistente a la izquierda— y la cola
 * triangular que nace en la esquina inferior de su lado.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `aria-*`, `id`…) y el `ref`.
 */
export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(function MessageBubble({
  role,
  children,
  className,
  ...rest
}, ref) {
  const classes = [
    'message-bubble',
    `message-bubble--${role}`,
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});
