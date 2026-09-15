import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { PublicPageShell } from './PublicPageShell';
import { ConsentPreferences, type ConsentCategory, type ConsentValue } from '../../molecules/Consent/Consent';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Stack } from '../../atoms/Stack/Stack';
import { SiteHeader } from '../../sections/SiteHeader/SiteHeader';
import { SiteNav } from '../../molecules/SiteNav/SiteNav';
import { LegalFooter } from '../../sections/LegalFooter/LegalFooter';
import { Hero } from '../../sections/Hero/Hero';
import { Container } from '../../atoms/Container/Container';
import { Button } from '../../atoms/Button/Button';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from '../../molecules/ThemeSwitcher/ThemeSwitcher';

const indice = [{ id: 'sitio', label: 'Sitio', href: '#sitio', items: [{ id: 'inicio', label: 'Inicio', href: '#inicio' }, { id: 'precios', label: 'Precios', href: '#precios' }] }];
const legal = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso-legal' },
  { id: 'privacidad', label: 'Privacidad', href: '#privacidad' },
];

const categorias: ConsentCategory[] = [
  { id: 'necessary', name: 'Necesarias', description: 'Sesión, idioma y seguridad.', required: true },
  { id: 'analytics', name: 'Analítica', description: 'Qué páginas se visitan, de forma agregada.' },
];

const decisionInicial: ConsentValue = { necessary: true, analytics: false };

/** Los dos conmutadores de la banda de preferencias, sueltos: la banda es del marco. */
const conmutadores = (
  <>
    <LanguageSwitcher size="lg" value="es" languages={[{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }]} />
    <ThemeSwitcher size="lg" value="light" />
  </>
);

function CabeceraRota(): never {
  throw new Error('La cabecera lanza al renderizar');
}

const contenido = (
  <Stack>
    <PageIntro title="Una página pública" description="El marco lo pone la plantilla; esto es solo el contenido." />
    <Paragraph>El `main` ya viene acotado y centrado, con el `id` al que apunta el enlace de salto.</Paragraph>
  </Stack>
);

const meta: Meta<typeof PublicPageShell> = {
  title: 'Templates/PublicPageShell',
  component: PublicPageShell,
  parameters: { layout: 'fullscreen' },
  args: { children: contenido },
  argTypes: {
    children: { table: { disable: true } },
    header: { table: { disable: true } },
    footer: { table: { disable: true } },
    preferences: { table: { disable: true } },
    id: { table: { disable: true } },
    mainFlush: { control: { type: 'boolean' } },
  },
};
export default meta;
type Story = StoryObj<typeof PublicPageShell>;

/** Solo el marco y el contenido: lo que se pinta cuando no hay proveedores para el chrome. */
export const SinCabeceraNiPie: Story = { name: 'Sin cabecera ni pie' };

/** El chrome público completo: `SiteHeader` con su `SiteNav` y `LegalFooter`. */
export const ConCabeceraYPie: Story = {
  name: 'Con cabecera y pie',
  args: {
    header: <SiteHeader><SiteNav groups={indice} /></SiteHeader>,
    footer: <LegalFooter links={legal} />,
  },
};

/**
 * La banda de preferencias entre el contenido y el pie: idioma y tema, en una
 * `section` con nombre y al ancho de la página. Es lo que cierra el panel de
 * estado y el alta.
 */
export const ConPreferencias: Story = {
  name: 'Con preferencias',
  args: {
    header: <SiteHeader><SiteNav groups={indice} /></SiteHeader>,
    preferences: conmutadores,
    footer: <LegalFooter links={legal} />,
  },
};

/** La cabecera lanza al renderizar: desaparece ella, no la página. */
export const CabeceraQueFalla: Story = {
  name: 'Con una cabecera que falla',
  args: { header: <CabeceraRota />, footer: <LegalFooter links={legal} /> },
};

/** `shell={false}`: solo los `children`, dentro de una app que ya tiene su `main`. */
export const DentroDeUnaApp: Story = {
  name: 'Dentro de una app',
  parameters: { layout: 'padded' },
  args: { shell: false },
  render: (args) => (
    <main id="app-main">
      <PublicPageShell {...args} />
    </main>
  ),
};

/**
 * El `ref` llega al nodo raíz del marco (`.site-shell`): es lo que un panel
 * flotante abierto desde la página necesita como `container` para heredar la
 * superficie pública, aquí el panel de preferencias de cookies.
 */
export const ConPanelAnclado: Story = {
  name: 'Con un panel anclado al marco',
  render: (args) => {
    function Demo() {
      const marco = useRef<HTMLDivElement>(null);
      const [decision, setDecision] = useState<ConsentValue>(decisionInicial);
      return (
        <>
          <PublicPageShell {...args} ref={marco} />
          <ConsentPreferences
            open
            onOpenChange={() => {}}
            categories={categorias}
            value={decision}
            onChange={setDecision}
            container={marco}
          />
        </>
      );
    }
    return <Demo />;
  },
};

export const Contrato: Story = {
  name: 'Test — main acotado con id y tabindex, cabecera y pie',
  tags: ['!dev'],
  args: ConCabeceraYPie.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = canvas.getByRole('main');
    await expect(main).toHaveAttribute('id', 'main-content');
    await expect(main).toHaveAttribute('tabindex', '-1');
    await expect(main).toHaveClass('container');
    await expect(canvasElement.querySelector('.site-shell')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.site-header')).toBeInTheDocument();
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  },
};

export const ContratoPreferencias: Story = {
  name: 'Test — la banda de preferencias, nombrada y entre el contenido y el pie',
  tags: ['!dev'],
  args: ConPreferencias.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const banda = canvas.getByRole('region', { name: 'Preferencias' });
    await expect(banda.tagName).toBe('SECTION');
    // Entre el contenido y el pie: ni dentro del `main` ni dentro del pie
    // legal, que es un `footer` y no admite invitados.
    const main = canvas.getByRole('main');
    const pie = canvas.getByRole('contentinfo');
    await expect(main).not.toContainElement(banda);
    await expect(pie).not.toContainElement(banda);
    await expect(main.compareDocumentPosition(banda) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await expect(banda.compareDocumentPosition(pie) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await expect(banda.querySelector('.public-page-shell__preferences-row')).not.toBeNull();
  },
};

export const ContratoPreferenciasLabel: Story = {
  name: 'Test — el nombre de la banda es una prop, no un texto cableado',
  tags: ['!dev'],
  args: { ...ConPreferencias.args, preferencesLabel: 'Settings' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('region', { name: 'Settings' })).toBeInTheDocument();
  },
};

export const ContratoCabeceraRota: Story = {
  name: 'Test — una cabecera que lanza no tumba la página',
  tags: ['!dev'],
  args: CabeceraQueFalla.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement.querySelector('.site-header')).not.toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  },
};

export const ContratoRef: Story = {
  name: 'Test — el ref llega al nodo del marco',
  tags: ['!dev'],
  args: ConCabeceraYPie.args,
  render: (args) => (
    <PublicPageShell
      {...args}
      ref={(node) => {
        node?.setAttribute('data-ref-recibido', 'sí');
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    // El nodo que recibe el ref tiene que ser el marco, no el `main`: un panel
    // anclado al `main` quedaría dentro de la columna de contenido.
    const marcado = canvasElement.querySelector('[data-ref-recibido]');
    await expect(marcado).toHaveClass('site-shell');
    await expect(marcado).not.toHaveClass('container');
  },
};

export const ContratoSinShell: Story = {
  name: 'Test — sin shell no hay SiteShell ni main propio',
  tags: ['!dev'],
  args: { ...ConPreferencias.args, shell: false },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.site-shell')).not.toBeInTheDocument();
    await expect(canvasElement.querySelector('main')).not.toBeInTheDocument();
    await expect(canvasElement.querySelector('.site-header')).not.toBeInTheDocument();
    await expect(within(canvasElement).getByRole('heading', { level: 1 })).toBeInTheDocument();
    // Sin marco tampoco hay banda de preferencias: no hay ranura de pie donde
    // ponerla, igual que con `header` y `footer`.
    await expect(canvasElement.querySelector('.public-page-shell__preferences')).not.toBeInTheDocument();
  },
};

/**
 * **El `main` a sangre.** El marco pone el `main` acotado y con su aire, que es
 * lo que quiere una página corriente. Una **portada** no: abre con un `Hero` que
 * llega de lado a lado, y el aire vertical lo trae cada sección por su cuenta
 * (ver `Container` § «Las secciones traen su aire»).
 *
 * Para eso el `main` lleva los mismos tres mandos que un `Container`:
 * `mainWidth="full"`, `mainSpace="none"` y `mainFlush`. La portada pasa a
 * apilar secciones, y lo que necesite columna se pone su propio `Container`
 * dentro — como hace el párrafo de debajo del `Hero`.
 *
 * Es exactamente la maqueta que una portada tenía que montar a mano con
 * `SiteShell` + `Container` para no poder usar esta plantilla.
 */
export const MainASangre: Story = {
  name: 'El main a sangre',
  args: {
    header: <SiteHeader><SiteNav groups={indice} /></SiteHeader>,
    footer: <LegalFooter links={legal} />,
    mainWidth: 'full',
    mainSpace: 'none',
    mainFlush: true,
    children: (
      <>
        <Hero
          title="Precios que se entienden"
          description="Una portada abre de lado a lado: el Hero trae su propio aire y su propia columna."
          actions={<Button>Ver planes</Button>}
        />
        <Container space="xl">
          <Paragraph>
            Debajo del Hero, lo que quiera columna se pone su propio `Container`: el
            marco ya no decide por la página.
          </Paragraph>
        </Container>
      </>
    ),
  },
};

/**
 * Test: los tres mandos llegan al `Container` del `main`, y el `main` sigue
 * siendo el `main` —con su `id` y su `tabindex`— para que el salto al contenido
 * no se rompa por abrir la portada a sangre.
 */
export const ContratoMainASangre: Story = {
  name: 'Test — el main a sangre sigue siendo el destino del salto',
  tags: ['!dev'],
  args: MainASangre.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = canvas.getByRole('main');

    // Sigue siendo el destino del `SkipLink`.
    await expect(main).toHaveAttribute('id', 'main-content');
    await expect(main).toHaveAttribute('tabindex', '-1');
    await expect(main).toHaveClass('container');

    // `mainSpace="none"` y `mainFlush`: sin aire vertical y sin aire lateral.
    await expect(main).not.toHaveClass('container--space-xl');
    await expect(main).toHaveClass('container--flush');

    // `mainWidth="full"`: el interior no lleva modificador de medida, así que
    // el contenido llega tan lejos como la banda.
    const inner = main.querySelector('.container__inner')!;
    await expect(inner.className).toBe('container__inner');

    // Y el Hero de dentro sí tiene su columna: el ancho lo decide la sección.
    await expect(canvasElement.querySelector('.hero .container__inner--xl')).toBeInTheDocument();
  },
};

/** Test: sin pasar nada, el `main` sigue exactamente como antes de la v47. */
export const ContratoMainPorDefecto: Story = {
  name: 'Test — el main por defecto no cambia',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = canvas.getByRole('main');
    await expect(main).toHaveClass('container--space-xl');
    await expect(main).not.toHaveClass('container--flush');
    await expect(main.querySelector('.container__inner--xl')).toBeInTheDocument();
  },
};
