import { type RefObject } from 'react';
/**
 * ¿Desborda el contenedor? Un contenedor con scroll tiene que poder recibir el
 * foco para que el teclado lo desplace (WCAG 2.1.1; regla de axe
 * `scrollable-region-focusable`): sin un descendiente enfocable, quien no usa
 * ratón no llega a lo que queda fuera. Pero una parada de tabulador de más en
 * cada tabla que cabe entera estorba, así que esto devuelve `true` solo
 * mientras el contenido desborda — y el componente pone entonces
 * `tabIndex={0}`.
 *
 * Mide en cliente (`ResizeObserver` sobre el contenedor y su primer hijo, que
 * crece con las filas): el primer render del servidor sale sin parada, que es
 * lo correcto mientras no se sepa si desborda.
 */
export declare function useOverflowFocusable(ref: RefObject<HTMLElement | null>): boolean;
