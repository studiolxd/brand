import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { MenuButton } from './MenuButton';
import { Container } from '../Container/Container';

function Interactivo(props: React.ComponentProps<typeof MenuButton>) {
  const [open, setOpen] = useState(props.isOpen ?? false);
  return <MenuButton {...props} isOpen={open} onClick={() => setOpen(!open)} />;
}

const meta: Meta<typeof MenuButton> = {
  title: 'Atoms/MenuButton',
  component: MenuButton,
  parameters: { layout: 'padded' },
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  },
  args: { isOpen: false, label: 'Menú', size: 'md' },
  render: (args) => <Interactivo {...args} />,
};
export default meta;

type Story = StoryObj<typeof MenuButton>;

/** Cerrado. Pulsa para verlo pasar a aspa. */
export const PorDefecto: Story = {};

/** Abierto: las barras forman un aspa. */
export const Abierto: Story = { args: { isOpen: true } };

/** Talla compacta, para barras de 32px. */
export const Compacto: Story = { args: { size: 'sm' } };

/** La cabecera del sitio: 48px con el glifo a 48. */
export const Grande: Story = { args: { size: 'lg' } };

/** Sobre superficie oscura las barras pasan a claro por tokens. */
export const SuperficieOscura: Story = {
  render: (args) => (
    <Container surface="dark" space="md">
      <Interactivo {...args} />
    </Container>
  ),
};

/** Con el foco visible, para ver el anillo. */
export const FocoVisible: Story = {
  name: 'Foco visible',
  parameters: { pseudo: { focusVisible: true } },
};

export const Comportamiento: Story = {
  name: 'Test — alterna y lo anuncia, y mide su talla',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Menú' });
    await expect(boton).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(boton);
    await expect(boton).toHaveAttribute('aria-expanded', 'true');
    const r = boton.getBoundingClientRect();
    await expect(Math.round(r.width)).toBe(40);
    await expect(Math.round(r.height)).toBe(40);
    // el glifo es el icono `menu` del catálogo: tres líneas con trazo de 1px
    const lineas = canvasElement.querySelectorAll('.menu-button__icon .icon__line');
    await expect(lineas.length).toBe(3);
    await expect(getComputedStyle(lineas[0]).strokeWidth).toBe('1px');
  },
};
