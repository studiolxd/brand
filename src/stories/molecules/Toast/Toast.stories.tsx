import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { Toaster } from './Toaster';
import { toast } from './toast';

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
    gap: { control: 'number', description: 'Aire entre avisos desplegados, en píxeles.' },
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
 * Un aviso puede llevar **una** acción: el atajo para deshacer lo que se acaba de
 * hacer o para ir a lo que se acaba de crear. No es sitio para una decisión: lo
 * que hay que decidir va en un `Modal`.
 */
export const ConAccion: Story = {
  name: 'Con acción',
  render: () => (
    <Button
      onClick={() =>
        toast('Proyecto archivado', {
          action: { label: 'Deshacer', onClick: () => toast.success('Proyecto restaurado') },
        })
      }
    >
      Archivar proyecto
    </Button>
  ),
};

/**
 * Los avisos se apilan por orden de llegada, el más nuevo delante. La pila se
 * despliega al pasar el ratón o al entrar el foco; `expand` la deja desplegada
 * siempre y `visibleToasts` limita cuántos se ven a la vez.
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
 * Un aviso de espera se resuelve **en su sitio**: `toast.loading` devuelve un
 * `id` y la llamada siguiente lo reutiliza. `toast.promise` hace lo mismo atado
 * al ciclo de una promesa.
 */
export const Espera: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button
        onClick={() => {
          const id = toast.loading('Exportando el proyecto…');
          setTimeout(() => toast.success('Proyecto exportado', { id }), 1500);
        }}
      >
        Con id
      </Button>
      <Button
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: 'Guardando…',
            success: 'Proyecto guardado',
            error: 'No se pudo guardar',
          })
        }
      >
        Con promesa
      </Button>
    </div>
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
      const el = document.querySelector('.toast');
      if (!el) throw new Error('sin aviso');
      return el;
    });
    await expect(aviso.classList.contains('alert')).toBe(true);
    await expect(aviso.classList.contains('alert--error')).toBe(true);
    await expect(aviso.classList.contains('alert--dismissible')).toBe(true);
    await expect(aviso.querySelector('.alert__title')).not.toBeNull();
    toast.dismiss();
  },
};

/**
 * Test: el rol lo pone la intención. `error` y `warning` interrumpen
 * (`alertdialog`); el resto informa sin interrumpir (`dialog`).
 */
export const ContratoRol: Story = {
  name: 'Test — el rol sale de la intención',
  tags: ['!dev'],
  render: () => (
    <>
      <Button onClick={() => toast('Neutro')}>Neutro</Button>
      <Button onClick={() => toast.error('Roto')}>Error</Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Neutro' }));
    await waitFor(async () => {
      await expect(document.querySelector('.toast')?.getAttribute('role')).toBe('dialog');
    });
    toast.dismiss();

    await userEvent.click(canvas.getByRole('button', { name: 'Error' }));
    await waitFor(async () => {
      await expect(document.querySelector('.toast')?.getAttribute('role')).toBe('alertdialog');
    });
    toast.dismiss();
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
    const aspa = await waitFor(() => {
      const el = document.querySelector<HTMLElement>('.toast .alert__close');
      if (!el) throw new Error('sin aspa');
      return el;
    });
    await expect(aspa.getAttribute('aria-label')).toBe('Close');
    // Sin `getBoundingClientRect`: la tarjeta entra con una escala, y lo que se
    // mide aquí es la caja del botón, no el fotograma de la animación.
    await expect(aspa.offsetWidth).toBe(32);
    await expect(aspa.offsetHeight).toBe(32);
    toast.dismiss();
  },
};

/** Test: `containerAriaLabel` nombra la región de notificaciones. */
export const ContratoRegion: Story = {
  name: 'Test — containerAriaLabel',
  tags: ['!dev'],
  args: { containerAriaLabel: 'Notificaciones DS' },
  render: () => <span />,
  play: async () => {
    await waitFor(async () => {
      await expect(
        document.querySelector('.toaster[aria-label="Notificaciones DS"]'),
      ).not.toBeNull();
    });
  },
};
