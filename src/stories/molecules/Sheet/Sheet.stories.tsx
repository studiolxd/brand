import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Sheet } from './Sheet';

const meta = {
  title: 'Molecules/Sheet',
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

/**
 * El decorator `withSurface` activa `data-theme="dark"` en `document.documentElement`;
 * como el panel se monta en el portal de Base UI (`document.body`), las
 * custom properties `surface-dark-*` de `Modal` —de las que `Sheet` toma
 * prestadas `bg`, `title-color` y `description-color`— cascadean hasta él
 * sin configuración adicional.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: Default.args,
  render: Demo,
};

export const Contrato: Story = {
  name: 'Test — abre, cierra con el aspa y devuelve el foco',
  tags: ['!dev'],
  args: Default.args,
  render: Demo,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Abrir panel' });

    await userEvent.click(trigger);

    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole('dialog', { name: 'Ajustes del bloque' });
    const closeButton = within(dialog).getByRole('button', { name: 'Cerrar' });

    // El aspa marca foco visible (lo pone `Button`, no un override local).
    closeButton.focus();
    await expect(closeButton).toHaveFocus();

    await userEvent.click(closeButton);
    await expect(dialog).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};
