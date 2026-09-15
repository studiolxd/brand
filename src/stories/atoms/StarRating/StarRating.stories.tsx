import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { StarRating } from './StarRating';
import { Stack } from '../Stack/Stack';
import { Inline } from '../Inline/Inline';

const meta: Meta<typeof StarRating> = {
  title: 'Atoms/StarRating',
  component: StarRating,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    reviewCount: { control: { type: 'number', min: 0 } },
    max: { control: { type: 'number', min: 1, max: 10 } },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    readOnly: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

/** La media de un producto, con media estrella. El valor exacto va en el nombre accesible. */
export const PorDefecto: Story = {
  args: { value: 4.5 },
};

/** Cualquier media cae en la media estrella más cercana. */
export const Medias: Story = {
  render: () => (
    <Stack>
      {[0, 1.2, 2.5, 3.7, 5].map((v) => (
        <Inline key={v} gap="sm" align="center">
          <StarRating value={v} />
          <span>{v}</span>
        </Inline>
      ))}
    </Stack>
  ),
};

/** La estrella se mide contra el texto que la rodea: tres tallas del sistema. */
export const Tallas: Story = {
  render: () => (
    <Stack>
      <StarRating value={4} size="sm" />
      <StarRating value={4} size="md" />
      <StarRating value={4} size="lg" />
    </Stack>
  ),
};

/** `readOnly={false}` convierte la escala en un grupo de radios: ratón y teclado. */
export const Entrada: Story = {
  render: function Entrada() {
    const [valor, setValor] = useState(0);
    return (
      <Stack>
        <StarRating readOnly={false} value={valor} onValueChange={setValor} size="lg" />
        <span>Valoración elegida: {valor || '—'}</span>
      </Stack>
    );
  },
};

/**
 * Con `reviewCount`, la media viene acompañada de cuántas reseñas la sostienen:
 * «4,5 ★★★★☆ (24)». El recuento entra también en el nombre accesible, que se lee
 * entero de una vez.
 */
export const ConRecuento: Story = {
  name: 'Con recuento de reseñas',
  args: { value: 4.5, reviewCount: 24 },
};

/**
 * **Sin `reviewCount`** la nota es la de UNA reseña suelta —la que firma una
 * persona al pie de su comentario—, donde un recuento no significa nada.
 */
export const SinRecuento: Story = {
  name: 'Sin recuento (una reseña suelta)',
  args: { value: 4 },
};

/**
 * `value={null}` es «todavía sin reseñas», que **no es cero**. No se dibuja la
 * escala: cinco estrellas vacías son el dibujo de «valorado con 0» —una nota de
 * verdad, y la peor—, así que el estado sin datos se dice con palabras.
 */
export const SinResenas: Story = {
  name: 'Todavía sin reseñas (null)',
  args: { value: null },
};

/** Una escala de diez, para cuando el producto no puntúa sobre cinco. */
export const EscalaDeDiez: Story = {
  args: { value: 7.5, max: 10 },
};

/** La entrada deshabilitada mantiene el valor y no responde. */
export const Deshabilitada: Story = {
  args: { readOnly: false, disabled: true, defaultValue: 3 },
};

export const TestNombreAccesible: Story = {
  name: 'Test — el nombre accesible lleva el valor exacto',
  tags: ['!dev'],
  args: { value: 3.5 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('img', { name: '3,5 de 5 estrellas' })).toBeInTheDocument();
  },
};

export const TestEntrada: Story = {
  name: 'Test — la entrada elige por teclado',
  tags: ['!dev'],
  args: { readOnly: false, defaultValue: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grupo = canvas.getByRole('radiogroup', { name: 'Valoración' });
    await expect(within(grupo).getAllByRole('radio')).toHaveLength(5);

    const dos = canvas.getByRole('radio', { name: '2 de 5 estrellas' });
    await expect(dos).toBeChecked();

    dos.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: '3 de 5 estrellas' })).toBeChecked();
  },
};

export const TestSinResenas: Story = {
  name: 'Test — null no dibuja estrellas ni se anuncia como una nota',
  tags: ['!dev'],
  args: { value: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Todavía sin reseñas')).toBeInTheDocument();
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
    await expect(canvasElement.querySelectorAll('.star-rating__star')).toHaveLength(0);
  },
};

export const TestRecuento: Story = {
  name: 'Test — el recuento se ve y entra en el nombre accesible',
  tags: ['!dev'],
  args: { value: 4.5, reviewCount: 24 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('img', { name: '4,5 de 5 estrellas, 24 reseñas' })).toBeInTheDocument();
    await expect(canvas.getByText('(24)')).toBeInTheDocument();
  },
};
