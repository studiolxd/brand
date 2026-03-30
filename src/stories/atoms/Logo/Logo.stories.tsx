import type { Meta, StoryObj } from '@storybook/react-vite';
import './Logo.css';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
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
    className: { table: { disable: true } },
  },
  args: {
    height: 100,
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

export const Dark: Story = {
  decorators: [
    (Story) => (
      <div className="logo-preview logo-preview--dark">
        <Story />
      </div>
    ),
  ],
};
