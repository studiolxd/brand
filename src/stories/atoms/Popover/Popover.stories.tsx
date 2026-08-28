import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within, screen } from 'storybook/test';
import { Popover } from './Popover';
import { DotsButton } from '../DotsButton/DotsButton';
import { Tooltip, TooltipProvider } from '../Tooltip/Tooltip';
import { Button } from '../Button/Button';
import { Paragraph } from '../Paragraph/Paragraph';

const meta = {
  title: 'Atoms/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  argTypes: {
    side: {
      control: { type: 'inline-radio' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Lado del disparador en el que aparece el panel.',
    },
    align: {
      control: { type: 'inline-radio' },
      options: ['start', 'center', 'end'],
      description: 'Alineación del panel dentro de ese lado.',
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {
  args: {
    label: 'Detalles',
    trigger: <Button>Abrir popover</Button>,
    children: <Paragraph size="small">Contenido libre dentro del panel flotante.</Paragraph>,
  },
};

/** Cualquier nodo sirve de disparador; con `DotsButton` queda una acción discreta. */
export const ConDotsButton: Story = {
  name: 'Con DotsButton',
  args: {
    label: 'Más opciones',
    trigger: <DotsButton aria-label="Más opciones" />,
    children: <Paragraph size="small">Panel lanzado desde un DotsButton.</Paragraph>,
  },
};

/** `side` elige el lado; `align`, la alineación dentro de ese lado. */
export const Posiciones: Story = {
  args: {
    label: 'Panel',
    trigger: <Button>bottom</Button>,
    children: <Paragraph size="small">Panel</Paragraph>,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side} side={side} label={`Panel ${side}`} trigger={<Button>{side}</Button>}>
          <Paragraph size="small">side=«{side}»</Paragraph>
        </Popover>
      ))}
    </div>
  ),
};

/** Con `open` y `onOpenChange` el estado lo lleva quien lo usa. */
export const Controlado: Story = {
  args: {
    label: 'Panel',
    trigger: <Button>Disparador</Button>,
    children: <Paragraph size="small">Panel</Paragraph>,
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Button onClick={() => setOpen((v) => !v)}>
          {open ? 'Cerrar' : 'Abrir'} desde fuera
        </Button>
        <Popover open={open} onOpenChange={setOpen} label="Panel" trigger={<Button>Disparador</Button>}>
          <Paragraph size="small">Modo controlado — open={String(open)}</Paragraph>
        </Popover>
      </div>
    );
  },
};

/** El panel es un portal fuera del árbol de la story: hereda el tema oscuro de `document.documentElement`, no de un envoltorio local. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    label: 'Detalles',
    trigger: <Button>Abrir popover</Button>,
    children: <Paragraph size="small">Contenido libre dentro del panel flotante.</Paragraph>,
  },
};

/** Test: el disparador anuncia el panel, el panel es un diálogo con nombre y Escape cierra. */
export const Contrato: Story = {
  name: 'Test — contrato ARIA y cierre con Escape',
  tags: ['!dev'],
  args: {
    label: 'Detalles del proyecto',
    trigger: <Button>Abrir</Button>,
    children: <Paragraph size="small">Contenido</Paragraph>,
  },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Abrir' });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    const panel = await screen.findByRole('dialog', { name: 'Detalles del proyecto' });
    await expect(panel).toHaveClass('popover');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{Escape}');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * Los tres motivos de cierre automático tienen su propio handler y cada uno
 * puede cancelarse. Aquí el panel **no** se cierra al pulsar fuera —el
 * consumidor cancela el cierre— y sí con Escape.
 */
export const EscapesDeCierre: Story = {
  name: 'Escapes de cierre',
  args: { trigger: <Button>Abrir</Button>, children: null },
  render: () => {
    const [intentos, setIntentos] = useState(0);
    return (
      <Popover
        defaultOpen
        trigger={<Button>Abrir</Button>}
        onPointerDownOutside={(details) => {
          details.cancel();
          setIntentos((n) => n + 1);
        }}
      >
        <Paragraph>El clic fuera no lo cierra: {intentos} intentos.</Paragraph>
        <Paragraph>Escape sí.</Paragraph>
      </Popover>
    );
  },
};

/**
 * El mismo botón lleva bocadillo y panel: el `Tooltip` es el disparador del
 * `Popover`, y reenvía a su botón las props que le inyecta el motor del panel.
 */
export const ConTooltipEnElDisparador: Story = {
  name: 'Con tooltip en el disparador',
  args: { trigger: <Button>Abrir</Button>, children: null },
  render: () => (
    <TooltipProvider>
      <Popover
        trigger={
          <Tooltip label="Ver los detalles del proyecto">
            <Button variant="outline">Detalles</Button>
          </Tooltip>
        }
        label="Detalles del proyecto"
      >
        <Paragraph>Contenido del panel.</Paragraph>
      </Popover>
    </TooltipProvider>
  ),
};

/** Test: el clic fuera se puede cancelar y Escape sigue cerrando. */
export const ContratoEscapes: Story = {
  name: 'Test — el cierre por clic fuera se puede cancelar',
  tags: ['!dev'],
  args: { trigger: <Button>Abrir</Button>, children: null },
  render: () => (
    <>
      <Popover
        defaultOpen
        trigger={<Button>Abrir</Button>}
        label="Panel"
        onPointerDownOutside={(details) => details.cancel()}
      >
        <Paragraph>Contenido</Paragraph>
      </Popover>
      <Button>Fuera</Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(screen.getByRole('dialog', { name: 'Panel' })).toBeInTheDocument();

    // El clic fuera lo cancela el consumidor: el panel sigue abierto.
    await userEvent.click(canvas.getByRole('button', { name: 'Fuera' }));
    await expect(screen.getByRole('dialog', { name: 'Panel' })).toBeInTheDocument();

    // Escape no está cancelado y sí cierra (tras la animación de salida).
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Panel' })).toBeNull());
  },
};

/** Test: el `Tooltip` puede ser el disparador del `Popover` sobre el mismo botón. */
export const ContratoTooltipDisparador: Story = {
  name: 'Test — tooltip y popover sobre el mismo disparador',
  tags: ['!dev'],
  args: { trigger: <Button>Abrir</Button>, children: null },
  render: () => (
    <TooltipProvider>
      <Popover
        trigger={
          <Tooltip label="Ver los detalles">
            <Button variant="outline">Detalles</Button>
          </Tooltip>
        }
        label="Detalles"
      >
        <Paragraph>Contenido del panel.</Paragraph>
      </Popover>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Detalles' });
    // Hay un solo botón: el bocadillo no ha metido un envoltorio extra.
    await expect(canvas.getAllByRole('button')).toHaveLength(1);
    // Y las props del panel han llegado al botón de verdad.
    await expect(boton).toHaveAttribute('aria-haspopup', 'dialog');

    await userEvent.click(boton);
    await expect(await screen.findByRole('dialog', { name: 'Detalles' })).toBeInTheDocument();
  },
};
