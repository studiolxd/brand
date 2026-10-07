import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { EmbedFrame } from './EmbedFrame';
import { Button } from '../Button/Button';
import { Columns } from '../Columns/Columns';
import { Container } from '../Container/Container';
import { Heading } from '../Heading/Heading';
import { Inline } from '../Inline/Inline';
import { Link } from '../Link/Link';
import { Paragraph } from '../Paragraph/Paragraph';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import { Stack } from '../Stack/Stack';
import { Form } from '../../molecules/Form/Form';
import { TextareaField } from '../../molecules/TextareaField/TextareaField';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { AppShell } from '../../sections/AppShell/AppShell';
import { AppHeader } from '../../sections/AppHeader/AppHeader';
import { Sidebar } from '../../sections/Sidebar/Sidebar';
import { navEntries } from '../../sections/AppShell/_datos';

/** Un documento largo, para que se vea que el desplazamiento ocurre dentro del marco. */
const DOC = `<!doctype html><html lang="es"><body style="font-family:sans-serif;margin:0;padding:24px">${Array.from(
  { length: 40 },
  (_, i) => `<p>Pantalla del curso, bloque ${i + 1}.</p>`,
).join('')}</body></html>`;

const meta: Meta<typeof EmbedFrame> = {
  title: 'Atoms/EmbedFrame',
  component: EmbedFrame,
  parameters: { layout: 'padded' },
  args: { title: 'Reproductor del curso', srcDoc: DOC },
  argTypes: {
    fill: { control: { type: 'inline-radio' }, options: ['container', 'viewport'] },
    device: { control: { type: 'inline-radio' }, options: ['mobile', 'tablet', 'desktop'] },
    className: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof EmbedFrame>;

/** Solo en la página, a ventana completa. */
function Ventana(args: Story['args']) {
  return <EmbedFrame title="Reproductor del curso" {...args} fill="viewport" />;
}

/** Junto a un panel con su propio desplazamiento: el marco a ventana completa, el panel al lado. */
function JuntoAUnPanel(args: Story['args']) {
  return (
    <Columns ratio="2:1" align="stretch">
      <EmbedFrame title="Reproductor del curso" {...args} fill="viewport" />
      <Stack align="stretch">
        <Heading level={2} size={5}>Comentarios</Heading>
        <ScrollArea fill label="Comentarios">
          <Stack>
            {Array.from({ length: 40 }, (_, i) => (
              <Paragraph key={i}>Comentario {i + 1} sobre la pantalla.</Paragraph>
            ))}
          </Stack>
        </ScrollArea>
        <Form actions={<Button type="submit">Enviar</Button>}>
          <TextareaField id="comentario" label="Comentario" />
        </Form>
      </Stack>
    </Columns>
  );
}

/** Dentro del armazón, a sangre, bajo una fila con el enlace de vuelta y el título. */
function EnArmazon(args: Story['args']) {
  return (
    <AppShell
      contentFlush
      header={<AppHeader sidebarId="sidebar" />}
      sidebar={
        <Sidebar id="sidebar">
          <SidebarNav entries={navEntries} />
        </Sidebar>
      }
    >
      <Stack fill gap="sm" align="stretch">
        <Container width="full" space="sm">
          <Inline>
            <Link href="#volver" icon="arrow-left">Volver</Link>
            <Heading level={1} size={5}>Introducción al curso</Heading>
          </Inline>
        </Container>
        <EmbedFrame title="Reproductor del curso" {...args} />
      </Stack>
    </AppShell>
  );
}

/** El marco llena la caja que le dan; aquí, una caja de 24rem de alto. */
export const PorDefecto: Story = {
  render: (args) => (
    <div style={{ blockSize: '24rem' }}>
      <EmbedFrame {...args} />
    </div>
  ),
};

/** `fill="viewport"`: sin contenedor con alto, el marco toma el de la ventana. */
export const AVentanaCompleta: Story = {
  name: 'A ventana completa',
  parameters: { layout: 'fullscreen' },
  render: (args) => <Ventana {...args} />,
};

/**
 * Como celda de `Columns`: el marco a ventana completa y, al lado, un panel cuya
 * lista se desplaza por dentro (`ScrollArea fill`). En móvil, el panel va debajo.
 */
export const JuntoAUnPanelLateral: Story = {
  name: 'Junto a un panel',
  parameters: { layout: 'fullscreen' },
  render: (args) => <JuntoAUnPanel {...args} />,
};

/**
 * Dentro de `AppShell` a sangre (`contentFlush`), bajo una fila con el enlace de
 * vuelta y el título: `Stack fill` da el alto del contenido y el marco se queda
 * con lo que deja la fila.
 */
export const EnElArmazon: Story = {
  name: 'En el armazón de la aplicación',
  parameters: { layout: 'fullscreen' },
  render: (args) => <EnArmazon {...args} />,
};

const DISPOSITIVOS = [
  { device: 'mobile', nombre: 'Móvil' },
  { device: 'tablet', nombre: 'Tableta' },
  { device: 'desktop', nombre: 'Escritorio' },
] as const;

/**
 * `device`: la vista previa en otro dispositivo. Móvil (375px) y tableta
 * (768px) dan al marco su ancho, centrado; escritorio llena el contenedor. El
 * documento de dentro ve ese ancho como su ventana, así que sus media queries
 * responden como en el dispositivo real.
 */
export const PorDispositivo: Story = {
  name: 'Por dispositivo',
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'desktop' } },
  render: (args) => (
    <Stack gap="lg">
      {DISPOSITIVOS.map(({ device, nombre }) => (
        <Stack key={device} gap="sm" align="stretch">
          <Heading level={2} size={5}>{nombre}</Heading>
          <div style={{ blockSize: '16rem' }}>
            <EmbedFrame {...args} title={`Reproductor del curso en ${nombre.toLowerCase()}`} device={device} />
          </div>
        </Stack>
      ))}
    </Stack>
  ),
};

export const TestContrato: Story = {
  name: 'Test — nombre accesible, sin borde y alto del contenedor',
  tags: ['!dev'],
  render: (args) => (
    <div data-testid="caja" style={{ blockSize: '300px' }}>
      <EmbedFrame {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const frame = canvas.getByTitle('Reproductor del curso');
    const caja = canvas.getByTestId('caja');
    await expect(frame.tagName).toBe('IFRAME');
    await waitFor(() => {
      const estilo = getComputedStyle(frame);
      expect(estilo.borderTopWidth).toBe('0px');
      expect(estilo.borderInlineStartWidth).toBe('0px');
    });
    await waitFor(() => {
      expect(frame.getBoundingClientRect().height).toBe(caja.getBoundingClientRect().height);
      expect(frame.getBoundingClientRect().width).toBe(caja.getBoundingClientRect().width);
    });
  },
};

/** La página no se desplaza: lo que se desplaza es el marco o el panel. */
function sinDesplazamientoDePagina() {
  expect(document.documentElement.scrollHeight).toBeLessThanOrEqual(window.innerHeight + 1);
}

export const TestUsoShare: Story = {
  name: 'Test — uso real: share',
  tags: ['!dev'],
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'desktop' } },
  render: (args) => <Ventana {...args} />,
  play: async ({ canvasElement }) => {
    const frame = within(canvasElement).getByTitle('Reproductor del curso');
    await waitFor(() => {
      expect(frame.getBoundingClientRect().height).toBeCloseTo(window.innerHeight, 0);
      sinDesplazamientoDePagina();
    });
  },
};

export const TestUsoReview: Story = {
  name: 'Test — uso real: review',
  tags: ['!dev'],
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'desktop' } },
  render: (args) => <JuntoAUnPanel {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const frame = canvas.getByTitle('Reproductor del curso');
    const lista = canvas.getByRole('region', { name: 'Comentarios' });
    await waitFor(() => {
      expect(frame.getBoundingClientRect().height).toBeCloseTo(window.innerHeight, 0);
      // La lista mide menos que su contenido: se desplaza por dentro.
      const alto = lista.getBoundingClientRect().height;
      expect(alto).toBeGreaterThan(0);
      expect(alto).toBeLessThan(lista.scrollHeight);
      sinDesplazamientoDePagina();
    });
  },
};

export const TestUsoReviewMovil: Story = {
  name: 'Test — uso real: review en móvil',
  tags: ['!dev'],
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'mobile1' } },
  render: (args) => <JuntoAUnPanel {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const frame = canvas.getByTitle('Reproductor del curso');
    const lista = canvas.getByRole('region', { name: 'Comentarios' });
    await waitFor(() => {
      // El marco a pantalla; el panel debajo, con la lista entera.
      expect(frame.getBoundingClientRect().height).toBeCloseTo(window.innerHeight, 0);
      expect(lista.getBoundingClientRect().top).toBeGreaterThanOrEqual(frame.getBoundingClientRect().bottom);
      expect(lista.getBoundingClientRect().height).toBeCloseTo(lista.scrollHeight, 0);
    });
  },
};

export const TestUsoPreview: Story = {
  name: 'Test — uso real: preview',
  tags: ['!dev'],
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'desktop' } },
  render: (args) => <EnArmazon {...args} />,
  play: async ({ canvasElement }) => {
    const frame = within(canvasElement).getByTitle('Reproductor del curso');
    const main = canvasElement.querySelector('.app-shell__content') as HTMLElement;
    await waitFor(() => {
      const marco = frame.getBoundingClientRect();
      const zona = main.getBoundingClientRect();
      // A sangre: de lado a lado del contenido y hasta su borde inferior.
      expect(marco.left).toBeCloseTo(zona.left, 0);
      expect(marco.right).toBeCloseTo(zona.right, 0);
      expect(marco.bottom).toBeCloseTo(zona.bottom, 0);
      expect(marco.height).toBeGreaterThan(0);
      // El contenido no se desplaza: el marco ocupa lo que deja la fila.
      expect(main.scrollHeight).toBeLessThanOrEqual(main.clientHeight);
      sinDesplazamientoDePagina();
    });
  },
};

export const TestDispositivo: Story = {
  name: 'Test — device da el ancho, centrado y sin pasar del hueco',
  tags: ['!dev'],
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'desktop' } },
  render: (args) => (
    <Stack gap="sm" align="stretch">
      <div data-testid="ancha" style={{ blockSize: '8rem', inlineSize: '1000px' }}>
        <EmbedFrame {...args} title="Móvil" device="mobile" />
      </div>
      <div style={{ blockSize: '8rem', inlineSize: '1000px' }}>
        <EmbedFrame {...args} title="Tableta" device="tablet" />
      </div>
      <div style={{ blockSize: '8rem', inlineSize: '1000px' }}>
        <EmbedFrame {...args} title="Escritorio" device="desktop" />
      </div>
      <div data-testid="estrecha" style={{ blockSize: '8rem', inlineSize: '300px' }}>
        <EmbedFrame {...args} title="Móvil en un hueco estrecho" device="mobile" />
      </div>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const caja = canvas.getByTestId('ancha').getBoundingClientRect();
    const ancho = (title: string) => canvas.getByTitle(title).getBoundingClientRect();
    await waitFor(() => {
      const movil = ancho('Móvil');
      expect(movil.width).toBeCloseTo(375, 0);
      // Centrado: el mismo hueco a cada lado.
      expect(movil.left - caja.left).toBeCloseTo(caja.right - movil.right, 0);
      // El alto sigue siendo el del contenedor.
      expect(movil.height).toBeCloseTo(caja.height, 0);
      expect(ancho('Tableta').width).toBeCloseTo(768, 0);
      expect(ancho('Escritorio').width).toBeCloseTo(1000, 0);
      expect(ancho('Móvil en un hueco estrecho').width).toBeCloseTo(300, 0);
    });
  },
};
