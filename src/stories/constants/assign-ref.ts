import type { Ref, RefObject } from 'react';

/**
 * Asigna un nodo a una `ref` de React, sea función u objeto. Es la pieza con
 * la que un componente que necesita su propio nodo (para enfocar, medir o
 * escribir por el CSSOM) lo comparte con la `ref` que le pasa el consumidor:
 * se llama desde una ref de callback que hace las dos cosas.
 *
 * Sin `ref` del consumidor no hace nada. El valor que devuelva una ref de
 * función (la limpieza de React 19) se descarta, igual que hacían las copias
 * en línea a las que sustituye.
 */
export function assignRef<T>(target: Ref<T> | undefined, node: T | null): void {
  if (typeof target === 'function') target(node);
  else if (target) (target as RefObject<T | null>).current = node;
}
