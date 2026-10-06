'use client';

import type { ReactNode } from 'react';
import { Stack } from '../../atoms/Stack/Stack';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { PublicPageShell } from '../PublicPageShell/PublicPageShell';

export interface NotFoundPageProps {
  /** El título («Página no encontrada»): `Heading` de nivel 1 vía `PageIntro`. */
  title: ReactNode;
  /** La frase bajo el título (el código, una explicación corta). */
  description?: ReactNode;
  /** El enlace de vuelta: el `Link` del producto con su icono (`<Link icon="arrow-left" href="/">Volver al inicio</Link>`). Sin router dentro. */
  homeLink: ReactNode;
  /** Cabecera del sitio. Va dentro de un `ErrorBoundary`: si falla, la página sigue. */
  header?: ReactNode;
  /** Pie del sitio. Ídem. */
  footer?: ReactNode;
  /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
  id?: string;
  /**
   * Con `false` no monta `SiteShell` ni el `main`: solo el contenido (título,
   * frase y enlace de vuelta), para pintarlo dentro de un `AppShell` que ya
   * tiene su `main`. Por defecto `true`. Sin marco, `header`, `footer` e `id`
   * no aplican.
   */
  shell?: boolean;
  /**
   * Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye).
   * Va al contenido propio de la plantilla (título, frase y enlace), con marco
   * y sin él, como en `OnboardingShell` y `ConnectorAuthShell`.
   */
  className?: string;
}

/**
 * Plantilla de 404: el marco público (`PublicPageShell`) con cabecera y pie
 * opcionales, y dentro un `main` con la cabecera de página y el enlace de
 * vuelta. Cabecera y pie van cada uno en su `ErrorBoundary`, así que un chrome
 * roto no se lleva por delante el mensaje. Con `shell={false}` devuelve solo
 * el contenido, para una app que ya tiene su `main`.
 */
export function NotFoundPage({ title, description, homeLink, header, footer, id = 'main-content', shell = true, className }: NotFoundPageProps) {
  return (
    <PublicPageShell header={header} footer={footer} id={id} shell={shell}>
      <Stack className={className}>
        <PageIntro title={title} description={description} />
        {homeLink}
      </Stack>
    </PublicPageShell>
  );
}
