import type { ReactNode } from 'react';
import { AppRoot } from '../../sections/AppRoot/AppRoot';
import { SiteShell } from '../../sections/SiteShell/SiteShell';
import { SiteHeader } from '../../sections/SiteHeader/SiteHeader';
import { SiteNav } from '../../molecules/SiteNav/SiteNav';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from '../../molecules/ThemeSwitcher/ThemeSwitcher';
import { LegalFooter } from '../../sections/LegalFooter/LegalFooter';
import { Container } from '../../atoms/Container/Container';
import { Columns } from '../../atoms/Columns/Columns';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Button } from '../../atoms/Button/Button';

const PROVIDER_LABELS: Record<string, string> = { google: 'Google', github: 'GitHub', keycloak: 'Keycloak' };

const INDICE = [
  { id: 'principal', label: 'Principal', items: [
    { id: 'precios', label: 'Precios', href: '#precios' },
    { id: 'contacto', label: 'Contacto', href: '#contacto' },
  ] },
];

const LEGAL = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso' },
  { id: 'privacidad', label: 'Política de privacidad', href: '#privacidad' },
  { id: 'cookies', label: 'Política de cookies', href: '#cookies' },
  { id: 'condiciones', label: 'Términos y condiciones', href: '#condiciones' },
];

export interface AuthPageProps {
  /** Título de la página. */
  title: string;
  /** Frase bajo el título (opcional). */
  description?: string;
  /** Más texto bajo la frase. */
  intro?: ReactNode;
  /** Lo que va a la derecha: el formulario. */
  children: ReactNode;
  /** Superficie oscura. */
  surface?: 'light' | 'dark';
}

/** El chrome público de la suite con la página de acceso dentro: es el layout `(auth)` de hub, con piezas del DS y datos falsos. */
export function AuthPage({ title, description, intro, children, surface = 'light' }: AuthPageProps) {
  const page = (
    <SiteShell
      header={
        <SiteHeader
          language={<LanguageSwitcher size="lg" value="es" languages={[{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }]} />}
          settings={<ThemeSwitcher size="lg" value={surface === 'dark' ? 'dark' : 'light'} />}
        >
          <SiteNav groups={INDICE} />
        </SiteHeader>
      }
      footer={<LegalFooter links={LEGAL} surface={surface === 'dark' ? 'dark' : undefined} />}
    >
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Columns>
          <PageIntro title={title} description={description}>{intro}</PageIntro>
          {children}
        </Columns>
      </Container>
    </SiteShell>
  );
  return (
    <div className={surface === 'dark' ? 'surface-dark' : undefined}>
      <AppRoot>{page}</AppRoot>
    </div>
  );
}

/** Botones de acceso con terceros (Google, GitHub, un OIDC…). */
export function SocialButtons({ providers }: { providers: string[] }) {
  return (
    <>
      {providers.map((id) => (
        <Button key={id} variant="outline">{PROVIDER_LABELS[id] ?? id}</Button>
      ))}
    </>
  );
}

/** El hueco del captcha (Turnstile mide 300×65). */
export function Captcha() {
  return (
    <div aria-label="Captcha" role="img" style={{ inlineSize: '300px', blockSize: '65px', border: '1px dashed currentColor', display: 'grid', placeItems: 'center' }}>
      Captcha
    </div>
  );
}
