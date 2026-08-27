import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { Toaster } from './Toaster';

const meta = {
  title: 'Molecules/Toast',
  component: Toaster,
  parameters: { layout: 'centered' },
  decorators: [
    (Story, context) => (
      <>
        <Toaster {...context.args} />
        <Story />
      </>
    ),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center'],
      description: 'Esquina de la ventana donde se monta la pila.',
    },
    duration: { control: 'number', description: 'Milisegundos que vive un aviso. Default 5000.' },
    gap: { control: 'number', description: 'Aire entre avisos apilados, en píxeles.' },
    visibleToasts: { control: 'number', description: 'Avisos visibles a la vez. Default 3.' },
    expand: { control: 'boolean', description: 'Despliega la pila en vez de recogerla.' },
    closeButton: { control: 'boolean', description: 'Muestra el aspa de cierre.' },
    closeLabel: { control: 'text', description: 'Etiqueta accesible del aspa. Default «Cerrar».' },
  },
  args: { position: 'bottom-right' },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {
  render: () => (
    <Button onClick={() => toast('Cambios guardados')}>Mostrar aviso</Button>
  ),
};

/** Las cuatro intenciones del `Alert`: mismo relleno, mismo borde, misma tipografía. */
export const Variantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button onClick={() => toast('Cambios guardados')}>Neutro</Button>
      <Button onClick={() => toast.success('Proyecto guardado correctamente')}>Éxito</Button>
      <Button onClick={() => toast.error('No se pudo guardar el proyecto')}>Error</Button>
      <Button onClick={() => toast.warning('Tienes cambios sin guardar')}>Aviso</Button>
    </div>
  ),
};

export const ConDescripcion: Story = {
  name: 'Con descripción',
  render: () => (
    <Button
      onClick={() =>
        toast.success('Proyecto guardado', {
          description: 'Los cambios se han guardado correctamente.',
        })
      }
    >
      Mostrar con descripción
    </Button>
  ),
};

/**
 * Los avisos se apilan por orden de llegada, el más nuevo delante. `visibleToasts`
 * limita cuántos se ven a la vez y `expand` despliega la pila.
 */
export const Apilado: Story = {
  args: { expand: true },
  render: () => (
    <Button
      onClick={() => {
        toast('Primer aviso');
        toast.success('Segundo aviso');
        toast.error('Tercer aviso');
      }}
    >
      Lanzar tres avisos
    </Button>
  ),
};

/**
 * Un aviso vive `duration` milisegundos y se cierra solo. El reloj se detiene
 * mientras el puntero o el foco están dentro de la pila, así que un aviso nunca
 * desaparece mientras se está leyendo o usando.
 */
export const AutoCierre: Story = {
  name: 'Auto-cierre',
  args: { duration: 3000 },
  render: () => (
    <Button onClick={() => toast('Este aviso se cierra en tres segundos')}>
      Mostrar aviso breve
    </Button>
  ),
};

/** `duration: Infinity` deja el aviso fijo: solo se va con el aspa. */
export const Persistente: Story = {
  render: () => (
    <Button onClick={() => toast('Este aviso no desaparece solo', { duration: Infinity })}>
      Mostrar persistente
    </Button>
  ),
};

/**
 * El relleno es autocontenido, como el del `Alert`: el aviso se ve igual sobre una
 * página clara y sobre una oscura, y el borde del neutro es lo que dibuja el
 * contorno cuando la página ya es prusia.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button onClick={() => toast('Cambios guardados')}>Neutro</Button>
      <Button onClick={() => toast.warning('Tienes cambios sin guardar')}>Aviso</Button>
    </div>
  ),
};

/** Test: la tarjeta del aviso es un `Alert` — mismas clases, mismos tokens. */
export const ContratoCara: Story = {
  name: 'Test — la tarjeta es un Alert',
  tags: ['!dev'],
  render: () => <Button onClick={() => toast.error('Se ha roto algo')}>Lanzar</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Lanzar' }));
    const aviso = await waitFor(() => {
      const el = canvasElement.querySelector('.toast');
      if (!el) throw new Error('sin aviso');
      return el;
    });
    await expect(aviso.classList.contains('alert')).toBe(true);
    await expect(aviso.classList.contains('alert--error')).toBe(true);
    await expect(aviso.classList.contains('alert--dismissible')).toBe(true);
    await expect(aviso.querySelector('.alert__title')).not.toBeNull();
  },
};

/** Test: el aspa mide la talla `sm` del sistema (32px) y lleva nombre accesible traducible. */
export const ContratoCierre: Story = {
  name: 'Test — el aspa es un objetivo de 32px con nombre accesible',
  tags: ['!dev'],
  args: { closeLabel: 'Close' },
  render: () => <Button onClick={() => toast('Un aviso')}>Lanzar</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Lanzar' }));
    const aspa = await canvas.findByRole('button', { name: 'Close' });
    const caja = aspa.getBoundingClientRect();
    await expect(Math.round(caja.width)).toBe(32);
    await expect(Math.round(caja.height)).toBe(32);
  },
};

/** Test: `theme` y `containerAriaLabel` se reenvían a la cola. */
export const ContratoRegion: Story = {
  name: 'Test — theme + containerAriaLabel',
  tags: ['!dev'],
  args: { theme: 'dark', containerAriaLabel: 'Notificaciones DS' },
  render: () => <span />,
  play: async ({ canvasElement }) => {
    // El motor compone el nombre como `${containerAriaLabel} ${atajo}`.
    await waitFor(async () => {
      await expect(
        canvasElement.querySelector('[aria-label^="Notificaciones DS"]'),
      ).not.toBeNull();
    });
  },
};
