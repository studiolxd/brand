import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';
import { Button } from '../../atoms/Button/Button';
import { Toaster } from './Toaster';

const meta: Meta<typeof Toaster> = {
  title: 'Molecules/Toaster',
  component: Toaster,
  parameters: { layout: 'centered' },
  decorators: [
    (Story, context) => (
      <>
        <Toaster position={context.args.position} />
        <Story />
      </>
    ),
  ],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center'],
      description: 'Posición del toast en pantalla',
    },
  },
  args: { position: 'bottom-right' },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <Button onClick={() => toast('Cambios guardados')}>Mostrar toast</Button>
  ),
};

export const Success: Story = {
  name: 'Success',
  render: () => (
    <Button onClick={() => toast.success('Proyecto guardado correctamente')}>
      Mostrar success
    </Button>
  ),
};

export const Error: Story = {
  name: 'Error',
  render: () => (
    <Button onClick={() => toast.error('No se pudo guardar el proyecto')}>
      Mostrar error
    </Button>
  ),
};

export const Warning: Story = {
  name: 'Warning',
  render: () => (
    <Button onClick={() => toast.warning('Tienes cambios sin guardar')}>
      Mostrar warning
    </Button>
  ),
};

export const WithDescription: Story = {
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

export const Persistent: Story = {
  name: 'Persistente',
  render: () => (
    <Button
      onClick={() =>
        toast('Esta notificación no desaparece sola', {
          duration: Infinity,
        })
      }
    >
      Mostrar persistente
    </Button>
  ),
};
