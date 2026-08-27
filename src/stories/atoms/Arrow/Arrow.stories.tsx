import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Arrow } from './Arrow';

const meta: Meta<typeof Arrow> = {
  title: 'Atoms/Arrow',
  component: Arrow,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la flecha.',
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Arrow>;

export const PorDefecto: Story = {};

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Arrow size="sm" />
      <Arrow size="md" />
      <Arrow size="lg" />
    </div>
  ),
};

/** `currentColor` hereda el color del contexto: sobre `.surface-dark` se lee en blanco. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Arrow size="sm" />
      <Arrow size="md" />
      <Arrow size="lg" />
    </div>
  ),
};

export const TestContrato: Story = {
  name: 'Test — decorativa y oculta a lectores de pantalla',
  tags: ['!dev'],
  render: () => (
    <div data-testid="wrapper">
      <Arrow className="custom-class" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvas.getByTestId('wrapper');
    const svg = wrapper.querySelector('svg');
    await expect(svg).not.toBeNull();
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
    await expect(svg).toHaveClass('arrow', 'arrow--md', 'custom-class');
  },
};
