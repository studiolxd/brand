import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Toggle } from './Toggle';
import { Icon } from '../Icon/Icon';
import { Inline } from '../Inline/Inline';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    iconOnly: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    pressed: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/** Sin pulsar: contorno y nada de relleno. */
export const PorDefecto: Story = {
  args: { children: 'Solo pendientes' },
};

/** Pulsado: el relleno es lo que dice que el valor está elegido. */
export const Pulsado: Story = {
  args: { children: 'Solo pendientes', defaultPressed: true },
};

/** Cuadrado a la altura de la talla, para barras de herramientas. Necesita `aria-label`. */
export const SoloIcono: Story = {
  render: () => (
    <Inline gap="sm">
      <Toggle iconOnly aria-label="Vista de cuadrícula" defaultPressed><Icon name="grid" size="sm" /></Toggle>
      <Toggle iconOnly aria-label="Vista de lista"><Icon name="dashboard" size="sm" /></Toggle>
    </Inline>
  ),
};

export const Tallas: Story = {
  render: () => (
    <Inline gap="sm">
      <Toggle size="sm">Pequeño</Toggle>
      <Toggle size="md">Mediano</Toggle>
      <Toggle size="lg">Grande</Toggle>
    </Inline>
  ),
};

export const Deshabilitado: Story = {
  render: () => (
    <Inline gap="sm">
      <Toggle disabled>Sin pulsar</Toggle>
      <Toggle disabled defaultPressed>Pulsado</Toggle>
    </Inline>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <Stack>
      <Inline gap="sm">
        <Toggle>Sin pulsar</Toggle>
        <Toggle defaultPressed>Pulsado</Toggle>
      </Inline>
    </Stack>
  ),
};

export const TestConmuta: Story = {
  name: 'Test — conmuta y publica aria-pressed',
  tags: ['!dev'],
  args: { children: 'Negrita' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Negrita' });

    await expect(boton).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(boton);
    await expect(boton).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(boton);
    await expect(boton).toHaveAttribute('aria-pressed', 'false');
  },
};
