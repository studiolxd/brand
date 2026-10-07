/**
 * Marca de los controles que entienden `focusableWhenDisabled` (D46): `Button`,
 * `CloseButton`, `DotsButton`, `CopyButton` y `Toggle`. Con `disabled` y esa
 * prop, el control deja el `disabled` nativo, se anuncia con `aria-disabled`,
 * sigue en el orden de tabulación y no ejecuta nada.
 *
 * `Tooltip` la lee para saber si puede pedírselo a su disparador: pasarle la
 * prop a un componente que no la conoce la dejaría caer al DOM. Va por
 * `Symbol.for` para que la marca sobreviva a que el paquete quede partido en
 * varios trozos (cada subruta es una entrada y el código compartido puede
 * duplicarse).
 */
const MARK = Symbol.for('@studiolxd/brand:focusableWhenDisabled');

export function markFocusableWhenDisabled<T extends object>(component: T): T {
  (component as Record<symbol, unknown>)[MARK] = true;
  return component;
}

export function supportsFocusableWhenDisabled(type: unknown): boolean {
  return (
    (typeof type === 'object' || typeof type === 'function') &&
    type !== null &&
    (type as Record<symbol, unknown>)[MARK] === true
  );
}
