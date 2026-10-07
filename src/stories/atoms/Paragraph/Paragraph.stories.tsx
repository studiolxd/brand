import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Paragraph } from './Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'Atoms/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Talla del párrafo.',
    },
    children: {
      control: { type: 'text' },
      description: 'Contenido del párrafo.',
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const PorDefecto: Story = {};

export const Pequeno: Story = {
  args: { size: 'sm' },
};

export const Grande: Story = {
  args: { size: 'lg' },
};

export const Tamanos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Paragraph size="sm">Small — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
      <Paragraph size="md">Default — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
      <Paragraph size="lg">Large — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
    </div>
  ),
};

export const ContratoTamanos: Story = {
  name: 'Test — fuera del SiteShell los peldaños salen del cuerpo base',
  tags: ['!dev'],
  render: () => (
    <div>
      <Paragraph>Cuerpo</Paragraph>
      <Paragraph size="sm">Pequeño</Paragraph>
      <Paragraph size="lg">Grande</Paragraph>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const px = (el: Element) => parseFloat(getComputedStyle(el).fontSize);
    // La superficie de aplicación lee a 16px; small y large son sus vecinos.
    await expect(px(canvas.getByText('Cuerpo'))).toBe(16);
    await expect(px(canvas.getByText('Pequeño'))).toBe(14);
    await expect(px(canvas.getByText('Grande'))).toBe(20);
  },
};
