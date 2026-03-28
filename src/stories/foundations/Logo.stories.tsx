import type { Meta, StoryObj } from '@storybook/react-vite';
import './Logo.css';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Fundamentos/Logotipo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    height: {
      control: { type: 'number' },
      description: 'Altura del logotipo en píxeles. El ancho se ajusta proporcionalmente.',
    },
    width: {
      control: { type: 'number' },
      description: 'Ancho del logotipo en píxeles. Si no se define, se ajusta a la altura.',
    },
    dark: {
      control: { type: 'boolean' },
      description: 'Versión en blanco para usar sobre fondos oscuros.',
    },
    className: { table: { disable: true } },
  },
  args: {
    dark: false,
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="logo-preview">
        <Story />
      </div>
    ),
  ],
};

export const SobreFondoOscuro: Story = {
  name: 'Oscuro',
  args: {
    dark: true,
  },
  decorators: [
    (Story) => (
      <div className="logo-preview logo-preview--dark">
        <Story />
      </div>
    ),
  ],
};
