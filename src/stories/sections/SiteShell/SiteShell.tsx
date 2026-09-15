'use client';

import { forwardRef, useCallback, useState, type ReactNode } from 'react';
import { PortalContainerContext } from '../../constants/portal-container';
import './SiteShell.css';

export interface SiteShellProps {
  /** La cabecera del sitio (`SiteHeader` o la del producto). */
  header?: ReactNode;
  /** El pie (`LegalFooter`, el del producto…). Siempre queda abajo del todo. */
  footer?: ReactNode;
  /** El contenido de la página: normalmente el `main` con `id="main-content"`. */
  children?: ReactNode;
  className?: string;
}

/**
 * El marco de una página pública: cabecera, contenido y pie en columna,
 * con la altura mínima de la pantalla. Con poco contenido, el pie se queda
 * pegado al borde inferior; con mucho, la página entera hace scroll. Es la
 * norma del sistema: ningún producto necesita CSS propio para sujetar el pie.
 * Para las aplicaciones con barra y sidebar está `AppShell`.
 */
/**
 * **Los portales que se abran dentro heredan la superficie.** El shell publica
 * su nodo raíz por `PortalContainerContext`, y todo componente con portal
 * —`Select`, `MultiSelect`, `DatePicker`, `Popover`, `Tooltip`, `Menu`,
 * `Modal`, `Sheet`, `Toaster`…— lo toma como destino cuando no recibe
 * `container`. Sin eso, la lista de un `Select` montaba en `document.body`,
 * fuera de `.site-shell`, y se abría a la talla de aplicación mientras su
 * campo iba a la pública. No hay nada que pasar en cada uso; la prop
 * `container` sigue ahí para quien quiera otro destino y gana siempre.
 *
 * Reenvía además el `ref` al nodo raíz (`.site-shell`), para quien necesite
 * apuntar ahí a mano.
 */
export const SiteShell = forwardRef<HTMLDivElement, SiteShellProps>(function SiteShell(
  { header, footer, children, className },
  ref,
) {
  /*
   * El nodo raíz, en estado y no en una ref: el destino del portal tiene que
   * estar disponible en el render en el que el portal se monta, y una ref no
   * provoca repintado cuando se rellena. Es el mismo patrón que `ChatShell`
   * usa para el `container` de su cajón.
   */
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      setRoot(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const classes = ['site-shell', className].filter(Boolean).join(' ');
  return (
    <div ref={setRefs} className={classes}>
      <PortalContainerContext.Provider value={root}>
        {header}
        <div className="site-shell__main">{children}</div>
        {footer}
      </PortalContainerContext.Provider>
    </div>
  );
});
