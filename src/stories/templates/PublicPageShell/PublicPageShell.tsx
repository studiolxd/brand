'use client';

import type { ReactNode } from 'react';
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
   * Por defecto `true`. Sin marco, `header`, `footer` e `id` no aplican.
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
 */
export function PublicPageShell({ children, header, footer, id = 'main-content', shell = true }: PublicPageShellProps) {
  if (!shell) return <>{children}</>;
  return (
    <SiteShell
      header={header && <ErrorBoundary>{header}</ErrorBoundary>}
      footer={footer && <ErrorBoundary>{footer}</ErrorBoundary>}
    >
      <Container as="main" id={id} tabIndex={-1} space="xl">
        {children}
      </Container>
    </SiteShell>
  );
}
