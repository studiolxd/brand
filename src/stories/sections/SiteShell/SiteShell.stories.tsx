import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SiteShell } from './SiteShell';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import { SiteNav } from '../../molecules/SiteNav/SiteNav';
import { LegalFooter } from '../LegalFooter/LegalFooter';
import { Container } from '../../atoms/Container/Container';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Alert } from '../../molecules/Alert/Alert';

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

export const ContratoTipografia: Story = {
  name: 'Test — la superficie pública lee un peldaño más arriba',
  tags: ['!dev'],
  args: {
    children: (
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Heading level={5}>Un título de nivel 5</Heading>
        <Heading level={2} size={4}>Un título con el tamaño desacoplado</Heading>
        <Paragraph>El cuerpo de la superficie pública.</Paragraph>
        <Paragraph size="large">Una entradilla.</Paragraph>
        <Paragraph size="small">Una nota al pie.</Paragraph>
        <Alert title="Un aviso" description="Con su descripción." />
      </Container>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const px = (el: Element) => parseFloat(getComputedStyle(el).fontSize);

    // El cuerpo va a 20px (font-size.3), la talla de los controles lg.
    const cuerpo = px(canvas.getByText('El cuerpo de la superficie pública.'));
    await expect(cuerpo).toBe(20);

    // Un H5 mide más que el cuerpo: la escala de títulos sube con él.
    await expect(px(canvas.getByRole('heading', { level: 5 }))).toBeGreaterThan(cuerpo);

    // El tamaño desacoplado bebe de la misma escala, así que sube igual.
    await expect(px(canvas.getByText('Un título con el tamaño desacoplado'))).toBe(24);

    // Los peldaños del párrafo son relativos al cuerpo, no absolutos.
    await expect(px(canvas.getByText('Una entradilla.'))).toBeGreaterThan(cuerpo);
    await expect(px(canvas.getByText('Una nota al pie.'))).toBeLessThan(cuerpo);

    // El texto corriente de los componentes hereda el cuerpo de la superficie.
    await expect(px(canvas.getByText('Un aviso'))).toBe(20);
    await expect(px(canvas.getByText('Con su descripción.'))).toBe(20);
  },
};
