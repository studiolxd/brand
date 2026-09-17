import { forwardRef, useCallback } from 'react';
import { useCssProperties } from '../../constants/css-properties';
import './Sortable.css';

/** Elementos con los que puede montarse el envoltorio ordenable. */
export type SortableElement = 'div' | 'li';

/**
 * Desplazamiento que la biblioteca de arrastre calcula en cada fotograma, en
 * píxeles. Es la forma que devuelven los motores de arrastre al uso (dnd-kit
 * entre ellos), así que se les pasa tal cual: el DS no depende de ninguno.
 */
export interface SortableTransform {
  x: number;
  y: number;
  scaleX?: number;
  scaleY?: number;
}

export interface SortableProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> {
  /** Elemento del envoltorio. `div` por defecto; `li` dentro de una lista. */
  as?: SortableElement;
  /**
   * Desplazamiento del elemento mientras se reordena la lista, tal y como lo
   * devuelve el motor de arrastre. `null` (o ausente) es la posición de
   * reposo. Se escribe por el CSSOM en `--sortable-x`/`--sortable-y` (y las
   * dos escalas), que es lo que consume el `transform` de la hoja.
   */
  transform?: SortableTransform | null;
  /**
   * Transición que acompaña al desplazamiento, la que dicte el motor (`transform
   * 200ms ease`). `null` o ausente: sin transición. Con
   * `prefers-reduced-motion` la hoja la anula.
   */
  transition?: string | null;
  /**
   * El elemento es el que se está arrastrando ahora mismo. Pone
   * `data-dragging` —de donde cuelga el CSS— y atenúa el original, que se
   * queda como hueco mientras la copia viaja con el puntero.
   */
  dragging?: boolean;
}

/**
 * Envoltorio de un elemento **ordenable por arrastre**.
 *
 * El sistema no trae motor de arrastre y no va a traerlo: quien lo pone es la
 * aplicación (dnd-kit, en la suite). Lo que faltaba era dónde aterriza lo que
 * ese motor calcula en tiempo de ejecución, porque la respuesta evidente —un
 * `style` inline con el `transform`— es justo lo que el sistema no puede
 * emitir: una app servida con `style-src 'self'` descarta el atributo `style`
 * sin dejar ni una violación en consola, y el arrastre se queda quieto sin
 * que nadie sepa por qué.
 *
 * `Sortable` es ese aterrizaje: recibe el desplazamiento como **dato**, lo
 * escribe por el CSSOM (que la CSP sí permite) en las variables que consume su
 * hoja, y publica el estado como atributo (`data-dragging`). El aspecto —qué
 * `transform` se aplica, cuánto se atenúa el original— vive en el CSS del
 * sistema, no en la app.
 *
 * Reenvía `ref`: es lo que necesita el motor para medir y registrar el nodo
 * (`setNodeRef` de dnd-kit).
 *
 * ```tsx
 * const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
 *
 * <Sortable ref={setNodeRef} transform={transform} transition={transition} dragging={isDragging}>
 *   <Card>…</Card>
 * </Sortable>
 * ```
 */
export const Sortable = forwardRef<HTMLElement, SortableProps>(function Sortable({
  as: Element = 'div',
  transform,
  transition,
  dragging = false,
  className,
  children,
  ...rest
}, ref) {
  const setCssProperties = useCssProperties({
    '--sortable-x': transform ? `${transform.x}px` : undefined,
    '--sortable-y': transform ? `${transform.y}px` : undefined,
    '--sortable-scale-x': transform?.scaleX !== undefined ? String(transform.scaleX) : undefined,
    '--sortable-scale-y': transform?.scaleY !== undefined ? String(transform.scaleY) : undefined,
    '--sortable-transition': transition ?? undefined,
  });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      setCssProperties(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    [setCssProperties, ref],
  );

  // `li` y `div` no comparten la firma de sus manejadores de evento, así que el
  // elemento se monta como `ElementType`: las props ya están tipadas arriba
  // contra `div`, que es el caso común y el más ancho de los dos.
  const Tag = Element as React.ElementType;

  return (
    <Tag
      ref={setRefs as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={['sortable', className].filter(Boolean).join(' ')}
      data-dragging={dragging ? '' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
});
