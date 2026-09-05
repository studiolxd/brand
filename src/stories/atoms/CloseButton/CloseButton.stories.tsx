import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { CloseButton } from './CloseButton';

const meta: Meta<typeof CloseButton> = {
  title: 'Atoms/CloseButton',
  component: CloseButton,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: { type: 'text' } },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  },
  args: { label: 'Cerrar', size: 'md' },
};
export default meta;

type Story = StoryObj<typeof CloseButton>;

/** El aspa del sistema, a su talla por defecto (40px). Al pasar el puntero no cambia nada: no hay hover. */
export const PorDefecto: Story = {};

/** Talla compacta (32px), la de un aviso o un panel del dock. El glifo no encoge: lo que encoge es la caja. */
export const Compacto: Story = { args: { size: 'sm' } };

/** Talla holgada (48px), para objetivo táctil generoso. */
export const Grande: Story = { args: { size: 'lg' } };

/** El nombre dice qué se cierra o qué se quita, no qué forma tiene el glifo. */
export const ConNombrePropio: Story = {
  name: 'Con nombre propio',
  args: { label: 'Descartar aviso' },
};

/** Con el foco visible: el único estado que marca el aspa. */
export const FocoVisible: Story = {
  name: 'Foco visible',
  parameters: { pseudo: { focusVisible: true } },
};

/** Sobre superficie oscura toma la tinta clara, sin configuración. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const SinHover: Story = {
  name: 'Test — mide su caja y no pinta fondo en ningún estado',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Cerrar' });
    const r = boton.getBoundingClientRect();
    await expect(Math.round(r.width)).toBe(40);
    await expect(Math.round(r.height)).toBe(40);
    // Sin relleno en reposo: es la diferencia con `Button` ghost, que sí lo
    // pinta en hover. Como el fondo no se declara en ninguna regla, tampoco
    // hay nada que revelar al pasar el puntero.
    const fondo = getComputedStyle(boton).backgroundColor;
    await expect(['rgba(0, 0, 0, 0)', 'transparent']).toContain(fondo);
    await expect(boton).toHaveAttribute('type', 'button');
  },
};
