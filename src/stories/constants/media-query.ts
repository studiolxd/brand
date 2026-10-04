import { useCallback, useSyncExternalStore } from 'react';

const getServerSnapshot = () => null;

/**
 * Lee una media query **sin romper la hidratación**.
 *
 * El servidor no conoce el ancho de la ventana. Si el primer render del
 * cliente leyera `matchMedia` (en el `useState` inicial, por ejemplo), pintaría
 * otro marcado que el servidor y React 19 tiraría la hidratación con «server
 * rendered HTML didn't match the client». Con `useSyncExternalStore` el
 * servidor y el render de hidratación leen la misma instantánea fija —`null`,
 * «todavía no se sabe»— y React vuelve a pintar con el valor real nada más
 * hidratar. Un render solo de cliente (sin SSR) lee el valor real desde el
 * primer momento.
 *
 * Mientras valga `null`, el componente pinta su forma de partida y es su CSS,
 * con la misma media query, quien la corrige a la vista: así no hay parpadeo
 * entre el HTML del servidor y el render hidratado.
 *
 * Sin `matchMedia` en el entorno, `null` siempre.
 */
export function useMediaQuery(query: string): boolean | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window.matchMedia !== 'function') return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query],
  );
  const getSnapshot = () =>
    typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : null;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
