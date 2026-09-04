'use client';

import { forwardRef, type ReactNode } from 'react';
import { SiteShell } from '../../sections/SiteShell/SiteShell';
import { Container } from '../../atoms/Container/Container';
import { ErrorBoundary } from '../../atoms/ErrorBoundary/ErrorBoundary';

export interface PublicPageShellProps {
  /** El contenido de la página: lo que va dentro del `main`. */
  children: ReactNode;
  /** Cabecera del sitio. Va dentro de un `ErrorBoundary`: si lanza al renderizar, desaparece ella y la página sigue. */
  header?: ReactNode;
  /** Pie del sitio. Ídem. */
  footer?: ReactNode;
  /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
  id?: string;
  /**
   * Con `false` no monta `SiteShell` ni el `main`: devuelve solo los
   * `children`, para pintarlos dentro de un `AppShell` que ya tiene su `main`.
   * Por defecto `true`. Sin marco, `header`, `footer` e `id` no aplican —y
   * tampoco el `ref`, porque no hay marco al que engancharlo.
   */
  shell?: boolean;
}

/**
 * El marco de una página pública, en una sola pieza: `SiteShell` con cabecera
 * y pie opcionales y, dentro, el `main` acotado (`Container`) al que apunta el
 * `SkipLink`. Es el molde del que cuelgan las plantillas públicas
 * —`ErrorPage`, `NotFoundPage`, `OnboardingShell`, la maqueta de acceso—, para
 * que ninguna pueda divergir del marco real.
 *
 * Cabecera y pie van cada uno en su `ErrorBoundary`: una página de error no
 * puede depender del chrome que pudo fallar, y el resto de páginas heredan esa
 * garantía gratis.
 *
 * Con `shell={false}` devuelve solo el contenido: es lo que necesita una
 * plantilla pintada dentro de una app que ya tiene su marco y su `main`.
 *
 * **Reenvía el `ref` al nodo raíz del `SiteShell`** (`.site-shell`), el mismo
 * que reenvía `SiteShell` por su cuenta. Ese nodo es el `container` de un panel
 * flotante abierto desde la página —`ConsentPreferences`, un `Modal`, un
 * `Sheet`—: su portal monta por defecto en `document.body`, que no es
 * descendiente de `.site-shell` y por tanto no hereda el remapeo de superficie
 * pública. Apuntarlo al `main` no serviría: el `main` es un `Container`
 * acotado y con su aire, así que el panel quedaría metido dentro de la columna
 * de contenido en vez de flotar sobre la página. Con `shell={false}` no hay
 * marco y el `ref` se queda sin asignar: ahí el contenedor es el `AppShell` de
 * la app.
 */
export const PublicPageShell = forwardRef<HTMLDivElement, PublicPageShellProps>(function PublicPageShell(
  { children, header, footer, id = 'main-content', shell = true },
  ref,
) {
  if (!shell) return <>{children}</>;
  return (
    <SiteShell
      ref={ref}
      header={header && <ErrorBoundary>{header}</ErrorBoundary>}
      footer={footer && <ErrorBoundary>{footer}</ErrorBoundary>}
    >
      <Container as="main" id={id} tabIndex={-1} space="xl">
        {children}
      </Container>
    </SiteShell>
  );
});
