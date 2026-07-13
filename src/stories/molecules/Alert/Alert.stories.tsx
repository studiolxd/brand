import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Alert } from './Alert';

const meta = {
  title: 'Moléculas/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning'],
    },
  },
  args: {
    title: 'Título del alert',
    variant: 'default',
    dismissible: false,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Test: modo composición (`<Alert.Title>`/`<Alert.Description>` + children arbitrarios),
 * override de `role` y passthrough de `data-*`/`className`.
 */
export const Composition: Story = {
  name: 'Test — composición + rest-spread',
  render: () => (
    <Alert variant="success" role="status" data-slot="alert" className="extra">
      <Alert.Title data-slot="title">Guardado</Alert.Title>
      <Alert.Description>
        Los cambios se guardaron <strong>correctamente</strong>.
      </Alert.Description>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.alert')!;
    await expect(root).toHaveClass('alert', 'alert--success', 'extra');
    await expect(root.className.trim().endsWith('extra')).toBe(true);
    await expect(root).toHaveAttribute('role', 'status'); // override del default 'alert'
    await expect(root).toHaveAttribute('data-slot', 'alert');
    // subpartes con sus clases BEM
    const title = within(canvasElement).getByText('Guardado');
    await expect(title.tagName).toBe('P');
    await expect(title).toHaveClass('alert__title');
    await expect(title).toHaveAttribute('data-slot', 'title');
    await expect(canvasElement.querySelector('.alert__description')).toBeInTheDocument();
  },
};

export const Default: Story = {};

export const Success: Story = {
  args: { variant: 'success', title: 'Operación completada' },
};

export const Error: Story = {
  args: { variant: 'error', title: 'Ha ocurrido un error' },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Atención requerida' },
};

export const WithDescription: Story = {
  args: {
    title: 'Título del alert',
    description: 'Descripción adicional con más contexto sobre el mensaje principal.',
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Este alert se puede cerrar',
    description: 'Pulsa la X para ocultarlo.',
    dismissible: true,
  },
};

export const DismissibleSuccess: Story = {
  args: {
    variant: 'success',
    title: 'Guardado correctamente',
    description: 'Los cambios se han guardado.',
    dismissible: true,
  },
};

export const DismissibleWarning: Story = {
  args: {
    variant: 'warning',
    title: 'Revisa los datos',
    description: 'Algunos campos requieren tu atención.',
    dismissible: true,
  },
};
