import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Popover } from './Popover';
import { DotsButton } from '../DotsButton/DotsButton';
import { Button } from '../Button/Button';

const meta = {
  title: 'Atoms/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button>Abrir popover</Button>,
    children: (
      <p style={{ margin: 0, fontSize: '0.875rem' }}>
        Contenido arbitrario dentro del panel flotante.
      </p>
    ),
  },
};

export const ConDotsButton: Story = {
  name: 'Con DotsButton',
  args: {
    trigger: <DotsButton aria-label="Más opciones" />,
    children: (
      <p style={{ margin: 0, fontSize: '0.875rem' }}>
        Popover lanzado desde un DotsButton.
      </p>
    ),
  },
};

export const Posiciones: Story = {
  args: {
    trigger: <Button>bottom</Button>,
    children: <p style={{ margin: 0 }}>Panel</p>,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover
          key={side}
          side={side}
          trigger={<Button>{side}</Button>}
        >
          <p style={{ margin: 0, fontSize: '0.875rem' }}>side="{side}"</p>
        </Popover>
      ))}
    </div>
  ),
};

export const Controlado: Story = {
  args: {
    trigger: <Button>Trigger</Button>,
    children: <p style={{ margin: 0 }}>Panel</p>,
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Button onClick={() => setOpen((v) => !v)}>
          {open ? 'Cerrar' : 'Abrir'} programáticamente
        </Button>
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={<Button>Trigger</Button>}
        >
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Modo controlado — open={String(open)}</p>
        </Popover>
      </div>
    );
  },
};
