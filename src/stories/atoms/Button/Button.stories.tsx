import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
const hero = 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1280&q=80';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'primary-dark', 'ghost', 'form'],
      description: 'Variante visual del botón.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón.',
    },
    block: {
      control: { type: 'boolean' },
      description: 'Ocupa todo el ancho del contenedor.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el botón.',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del botón.',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Tipo HTML del botón.',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    block: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const PrimaryDark: Story = {
  args: { variant: 'primary-dark' },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  decorators: [
    (Story) => (
      <div style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const Form: Story = {
  args: { variant: 'form' },
};

export const Block: Story = {
  args: { variant: 'primary', block: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
};

export const FormDisabled: Story = {
  args: { variant: 'form', disabled: true, block: true },
};
