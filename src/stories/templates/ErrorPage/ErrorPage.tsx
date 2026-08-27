'use client';

import type { ReactNode } from 'react';
import { SiteShell } from '../../sections/SiteShell/SiteShell';
import { Container } from '../../atoms/Container/Container';
import { Stack } from '../../atoms/Stack/Stack';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Inline } from '../../atoms/Inline/Inline';
import { ErrorBoundary } from '../../atoms/ErrorBoundary/ErrorBoundary';

export interface ErrorPageProps {
  /** El título («Algo ha salido mal»): `Heading` de nivel 1 vía `PageIntro`. */
  title: ReactNode;
  /** La frase bajo el título. */
  description?: ReactNode;
  /** Las salidas: el `Button` «Reintentar» y el enlace «Ir al inicio» del producto. Sin router dentro. */
  actions: ReactNode;
  /** Cabecera del sitio, SIN auth. Va dentro de un `ErrorBoundary`. En `global-error.tsx` no se pasa. */
  header?: ReactNode;
  /** Pie del sitio. Ídem. */
  footer?: ReactNode;
  /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
  id?: string;
  /**
   * Con `false` no monta `SiteShell` ni el `main`: solo el contenido (título,
   * frase y acciones), para pintarlo dentro de un `AppShell` que ya tiene su
   * `main`. Por defecto `true`. Sin marco, `header`, `footer` e `id` no aplican.
   */
  shell?: boolean;
}

/**
 * Plantilla de «algo ha salido mal»: misma maqueta que `NotFoundPage` con las
 * acciones en lugar del enlace de vuelta. Cabecera y pie, si se pasan, van
 * cada uno en su `ErrorBoundary`: la página de error no puede depender del
 * layout que pudo fallar. Con `shell={false}` devuelve solo el contenido,
 * para una app que ya tiene su `main`.
 */
export function ErrorPage({ title, description, actions, header, footer, id = 'main-content', shell = true }: ErrorPageProps) {
  const content = (
    <Stack>
      <PageIntro title={title} description={description} />
      <Inline className="error-page__actions">{actions}</Inline>
    </Stack>
  );
  if (!shell) return content;
  return (
    <SiteShell
      header={header && <ErrorBoundary>{header}</ErrorBoundary>}
      footer={footer && <ErrorBoundary>{footer}</ErrorBoundary>}
    >
      <Container as="main" id={id} tabIndex={-1} space="xl">
        {content}
      </Container>
    </SiteShell>
  );
}
