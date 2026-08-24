import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Tooltip, TooltipProvider } from './Tooltip';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 4rem' }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Guardar los cambios',
    children: <Button variant="outline">Guardar</Button>,
  },
};

export const Abajo: Story = {
  name: 'Abajo (side=bottom)',
  args: {
    label: 'Se abre por debajo del disparador',
    children: <Button variant="outline">Abajo</Button>,
    side: 'bottom',
  },
};

export const Derecha: Story = {
  name: 'Derecha (side=right)',
  args: {
    label: 'Se abre a la derecha',
    children: <Button variant="outline">Derecha</Button>,
    side: 'right',
  },
};

export const TextoLargo: Story = {
  name: 'Texto largo (rompe a varias líneas)',
  args: {
    label:
      'Este bocadillo lleva un texto largo para comprobar que el ancho máximo lo parte en varias líneas en vez de desbordar la pantalla.',
    children: <Button variant="outline">Explicación</Button>,
  },
};

export const ContenidoRico: Story = {
  name: 'Contenido rico (ReactNode)',
  args: {
    label: (
      <>
        <strong>3 avisos</strong> de accesibilidad
      </>
    ),
    children: <Button variant="outline">A11y</Button>,
  },
};

export const Abierto: Story = {
  name: 'Abierto por defecto',
  args: {
    label: 'Visible sin interacción',
    children: <Button variant="outline">Abierto</Button>,
    defaultOpen: true,
  },
};
