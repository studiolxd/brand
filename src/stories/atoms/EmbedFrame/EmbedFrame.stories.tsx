import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { EmbedFrame } from './EmbedFrame';
import { AppShell } from '../../sections/AppShell/AppShell';
import { AppHeader } from '../../sections/AppHeader/AppHeader';
import { Sidebar } from '../../sections/Sidebar/Sidebar';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
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
    className: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof EmbedFrame>;

/** El marco llena la caja que le dan; aquí, una caja de 24rem de alto. */
export const PorDefecto: Story = {
  render: (args) => (
    <div style={{ blockSize: '24rem' }}>
      <EmbedFrame {...args} />
    </div>
  ),
};

/**
 * Como contenido de `AppShell`: el marco ocupa el alto que queda bajo la
 * cabecera y junto a la barra lateral, y la página no se desplaza.
 */
export const EnElArmazon: Story = {
  name: 'En el armazón de la aplicación',
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <AppShell
      header={<AppHeader sidebarId="sidebar" />}
      sidebar={
        <Sidebar id="sidebar">
          <SidebarNav entries={navEntries} />
        </Sidebar>
      }
    >
      <EmbedFrame {...args} />
    </AppShell>
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
