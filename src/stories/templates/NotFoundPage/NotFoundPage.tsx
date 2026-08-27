'use client';

import type { ReactNode } from 'react';
import { SiteShell } from '../../sections/SiteShell/SiteShell';
import { Container } from '../../atoms/Container/Container';
import { Stack } from '../../atoms/Stack/Stack';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { ErrorBoundary } from '../../atoms/ErrorBoundary/ErrorBoundary';

export interface NotFoundPageProps {
  /** El título («Página no encontrada»): `Heading` de nivel 1 vía `PageIntro`. */
  title: ReactNode;
  /** La frase bajo el título (el código, una explicación corta). */
  description?: ReactNode;
  /** El enlace de vuelta: el `Link` del producto con su icono (`<Link icon="arrow-left" href="/">Ir al inicio</Link>`). Sin router dentro. */
  homeLink: ReactNode;
  /** Cabecera del sitio. Va dentro de un `ErrorBoundary`: si falla, la página sigue. */
  header?: ReactNode;
  /** Pie del sitio. Ídem. */
  footer?: ReactNode;
  /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
  id?: string;
}

/**
 * Plantilla de 404: el marco público (`SiteShell`) con cabecera y pie
 * opcionales, y dentro un `main` con la cabecera de página y el enlace de
 * vuelta. Cabecera y pie van cada uno en su `ErrorBoundary`, así que un chrome
 * roto no se lleva por delante el mensaje.
 */
export function NotFoundPage({ title, description, homeLink, header, footer, id = 'main-content' }: NotFoundPageProps) {
  return (
    <SiteShell
      header={header && <ErrorBoundary>{header}</ErrorBoundary>}
      footer={footer && <ErrorBoundary>{footer}</ErrorBoundary>}
    >
      <Container as="main" id={id} tabIndex={-1} space="xl">
        <Stack>
          <PageIntro title={title} description={description} />
          {homeLink}
        </Stack>
      </Container>
    </SiteShell>
  );
}
