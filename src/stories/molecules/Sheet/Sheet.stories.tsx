import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms/Button/Button';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Sheet } from './Sheet';

const meta = {
  title: 'Por revisar/Molecules/Sheet',
  component: Sheet,
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const body = (
  <>
    <Paragraph>
      El panel deja ver el contexto que hay detrás, a diferencia de un modal
      centrado: sirve para editar algo sin perder de vista dónde estabas.
    </Paragraph>
    <Paragraph>
      Base UI se encarga del foco, del cierre con Escape y del clic fuera.
    </Paragraph>
  </>
);

function Demo(args: Parameters<typeof Sheet>[0]) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet
      {...args}
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="outline">Abrir panel</Button>}
    />
  );
}

export const Default: Story = {
  name: 'Desde la derecha',
  args: {
    open: false,
    onOpenChange: () => {},
    title: 'Ajustes del bloque',
    description: 'Los cambios se guardan al cerrar.',
    children: body,
  },
  render: Demo,
};

export const Izquierda: Story = {
  name: 'Desde la izquierda',
  args: { ...Default.args, side: 'left', title: 'Navegación' },
  render: Demo,
};

export const Abajo: Story = {
  name: 'Desde abajo',
  args: { ...Default.args, side: 'bottom', title: 'Detalle' },
  render: Demo,
};

export const ConPie: Story = {
  name: 'Con acciones al pie',
  args: {
    ...Default.args,
    footer: (
      <>
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar</Button>
      </>
    ),
  },
  render: Demo,
};

export const TituloOculto: Story = {
  name: 'Título solo accesible',
  args: {
    ...Default.args,
    title: 'Panel de accesibilidad',
    titleHidden: true,
    description: undefined,
  },
  render: Demo,
};
