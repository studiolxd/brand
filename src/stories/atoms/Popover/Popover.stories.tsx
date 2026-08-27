import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within, screen } from 'storybook/test';
import { Popover } from './Popover';
import { DotsButton } from '../DotsButton/DotsButton';
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

/** Sobre superficie oscura el panel toma fondo y borde oscuros de `floating-panel`. */
export const SuperficieOscura: Story = {
  name: 'Superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    label: 'Detalles',
    trigger: <Button>Abrir popover</Button>,
    children: <Paragraph size="small">Contenido libre dentro del panel flotante.</Paragraph>,
  },
  decorators: [
    (Story) => (
      <div className="surface-dark" style={{ padding: '4rem', background: 'var(--color-background-dark)' }}>
        <Story />
      </div>
    ),
  ],
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
