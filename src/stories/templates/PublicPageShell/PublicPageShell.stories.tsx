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
    id: { table: { disable: true } },
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

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: ConCabeceraYPie.args,
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
  args: { ...ConCabeceraYPie.args, shell: false },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.site-shell')).not.toBeInTheDocument();
    await expect(canvasElement.querySelector('main')).not.toBeInTheDocument();
    await expect(canvasElement.querySelector('.site-header')).not.toBeInTheDocument();
    await expect(within(canvasElement).getByRole('heading', { level: 1 })).toBeInTheDocument();
  },
};
