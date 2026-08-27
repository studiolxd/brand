import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SiteShell } from './SiteShell';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import { SiteNav } from '../../molecules/SiteNav/SiteNav';
import { LegalFooter } from '../LegalFooter/LegalFooter';
import { Container } from '../../atoms/Container/Container';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

const indice = [{ id: 'sitio', label: 'Sitio', href: '#sitio', items: [{ id: 'inicio', label: 'Inicio', href: '#inicio' }, { id: 'precios', label: 'Precios', href: '#precios' }] }];
const legal = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso-legal' },
  { id: 'privacidad', label: 'Privacidad', href: '#privacidad' },
];

const meta: Meta<typeof SiteShell> = {
  title: 'Sections/SiteShell',
  component: SiteShell,
  parameters: { layout: 'fullscreen' },
  args: {
    header: <SiteHeader><SiteNav groups={indice} /></SiteHeader>,
    footer: <LegalFooter links={legal} />,
  },
  argTypes: { header: { table: { disable: true } }, footer: { table: { disable: true } }, children: { table: { disable: true } }, className: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof SiteShell>;

/** Poco contenido: el pie baja hasta el borde inferior de la pantalla. */
export const PocoContenido: Story = {
  args: {
    children: (
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Heading level={1} size={7}>Una página corta</Heading>
        <Paragraph>El pie no flota a media pantalla: el marco lo empuja abajo.</Paragraph>
      </Container>
    ),
  },
};

/** Mucho contenido: la página entera hace scroll y el pie va al final del documento. */
export const MuchoContenido: Story = {
  args: {
    children: (
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Heading level={1} size={7}>Una página larga</Heading>
        {Array.from({ length: 24 }, (_, i) => (
          <Paragraph key={i}>Párrafo {i + 1}: el documento crece y el scroll es el de la página, no el de un contenedor interno.</Paragraph>
        ))}
      </Container>
    ),
  },
};

export const Contrato: Story = {
  name: 'Test — el pie queda en el borde inferior con poco contenido',
  tags: ['!dev'],
  args: PocoContenido.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shell = canvasElement.querySelector('.site-shell') as HTMLElement;
    await expect(shell.getBoundingClientRect().height).toBeGreaterThanOrEqual(window.innerHeight - 1);
    const pie = canvas.getByRole('contentinfo');
    await expect(Math.round(pie.getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(Math.round(shell.getBoundingClientRect().bottom) - 1);
    await expect(canvas.getByRole('main')).toBeInTheDocument();
    // la superficie pública lee a 20px (font-size.3)
    await expect(getComputedStyle(canvas.getByText(/no flota/)).fontSize).toBe('20px');
  },
};
