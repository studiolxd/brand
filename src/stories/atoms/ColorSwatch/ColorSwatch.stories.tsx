import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ColorSwatch } from './ColorSwatch';
import { Inline } from '../Inline/Inline';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof ColorSwatch> = {
  title: 'Atoms/ColorSwatch',
  component: ColorSwatch,
  args: { color: '#baabff' },
  argTypes: {
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    color: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<typeof ColorSwatch>;

export const Default: Story = {};

/** `sm` junto a un texto de una línea, `md` en listas, `lg` cuando la muestra es el asunto. */
export const Tallas: Story = {
  render: () => (
    <Inline gap="md" align="center">
      <ColorSwatch size="sm" color="#111e30" />
      <ColorSwatch size="md" color="#111e30" />
      <ColorSwatch size="lg" color="#111e30" />
    </Inline>
  ),
};

/**
 * El damero asoma solo donde el color deja ver: opaco, a medias y del todo
 * transparente. Sin color, solo el damero.
 */
export const Transparencia: Story = {
  render: () => (
    <Inline gap="md" align="center">
      <ColorSwatch size="lg" color="#f05e1c" />
      <ColorSwatch size="lg" color="#f05e1c80" />
      <ColorSwatch size="lg" color="transparent" />
      <ColorSwatch size="lg" color={null} />
    </Inline>
  ),
};

/**
 * Con `label` la muestra se anuncia; sin él es decorativa, que es lo correcto
 * cuando el color ya se dice al lado.
 */
export const ConNombre: Story = {
  name: 'Con nombre accesible',
  render: () => (
    <Stack gap="sm">
      <Inline gap="sm" align="center">
        <ColorSwatch color="#20e38e" label="Esmeralda" />
      </Inline>
      <Inline gap="sm" align="center">
        <ColorSwatch size="sm" color="#ffcd00" />
        <span>Geografía</span>
      </Inline>
    </Stack>
  ),
};

/** Test: el color va en el `fill` del SVG, sin atributo `style` en ningún nodo. */
export const ContratoSinStyle: Story = {
  name: 'Test — el color es un atributo de presentación',
  tags: ['!dev'],
  args: { color: '#ffcd00', size: 'lg', label: 'Amarillo' },
  play: async ({ canvas, canvasElement }) => {
    const muestra = canvas.getByRole('img', { name: 'Amarillo' });
    await expect(muestra.querySelector('rect')).toHaveAttribute('fill', '#ffcd00');
    await expect(canvasElement.querySelector('[style]')).toBeNull();
    const rect = muestra.getBoundingClientRect();
    await expect([Math.round(rect.width), Math.round(rect.height)]).toEqual([48, 48]);
  },
};
