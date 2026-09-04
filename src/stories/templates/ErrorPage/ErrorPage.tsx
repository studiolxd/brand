'use client';

import type { ReactNode } from 'react';
import { Stack } from '../../atoms/Stack/Stack';
import { Columns } from '../../atoms/Columns/Columns';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { PublicPageShell } from '../PublicPageShell/PublicPageShell';

export interface ErrorPageProps {
  /** El título («Error»): `Heading` de nivel 1 vía `PageIntro`, columna izquierda. */
  title: ReactNode;
  /** La frase bajo el título («Algo ha salido mal»), columna izquierda. */
  description?: ReactNode;
  /** El enlace de vuelta, bajo la frase, misma columna izquierda: `<Link icon="arrow-left" href="/">Volver al inicio</Link>`. Sin router dentro. */
  homeAction: ReactNode;
  /** La frase de la columna derecha, sobre el botón («Puedes volver a intentarlo»). */
  retryDescription?: ReactNode;
  /** El `Button` «Reintentar», columna derecha, debajo de `retryDescription` — pásalo con `block` (mismo patrón que las acciones de `AuthPage`/`Form`). */
  retryAction: ReactNode;
  /** Cabecera del sitio, SIN auth. Va dentro de un `ErrorBoundary`. En `global-error.tsx` no se pasa. */
  header?: ReactNode;
  /** Pie del sitio. Ídem. */
  footer?: ReactNode;
  /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
  id?: string;
  /**
   * Con `false` no monta `SiteShell` ni el `main`: solo el contenido (las dos
   * columnas), para pintarlo dentro de un `AppShell` que ya tiene su `main`.
   * Por defecto `true`. Sin marco, `header`, `footer` e `id` no aplican.
   */
  shell?: boolean;
}

/**
 * Plantilla de «algo ha salido mal»: dos columnas, mismo molde que `AuthPage`
 * (`Columns` de dos celdas). Izquierda: título, frase y el enlace de vuelta.
 * Derecha: la frase de reintento y el botón en bloque, como las acciones de un
 * formulario de acceso. El marco lo pone `PublicPageShell`, así que cabecera y
 * pie van cada uno en su `ErrorBoundary`: la página de error no puede depender
 * del layout que pudo fallar. Con `shell={false}` devuelve solo el contenido,
 * para una app que ya tiene su `main`.
 */
export function ErrorPage({ title, description, homeAction, retryDescription, retryAction, header, footer, id = 'main-content', shell = true }: ErrorPageProps) {
  return (
    <PublicPageShell header={header} footer={footer} id={id} shell={shell}>
      <Columns className="error-page__content">
        <Stack>
          <PageIntro title={title} description={description} />
          {homeAction}
        </Stack>
        <Stack>
          {retryDescription && <Paragraph size="large">{retryDescription}</Paragraph>}
          {retryAction}
        </Stack>
      </Columns>
    </PublicPageShell>
  );
}
