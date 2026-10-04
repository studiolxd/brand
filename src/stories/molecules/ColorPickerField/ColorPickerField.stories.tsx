import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { ColorPickerField } from './ColorPickerField';
import { Stack } from '../../atoms/Stack/Stack';
import type { ColorPickerPreset } from '../ColorPicker/ColorPicker';

/** La paleta de brand como predefinidos: los primitivos de `tokens/color/`. */
const PALETA: ColorPickerPreset[] = [
  { color: '#111e30', title: 'Prusia' },
  { color: '#baabff', title: 'Lavanda' },
  { color: '#ffcd00', title: 'Amarillo' },
  { color: '#20e38e', title: 'Esmeralda' },
  { color: '#f05e1c', title: 'Cayena' },
  { color: '#ffffff', title: 'Blanco' },
];

const meta: Meta<typeof ColorPickerField> = {
  title: 'Molecules/ColorPickerField',
  component: ColorPickerField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { label: 'Color de acento', presets: PALETA, onValueChange: fn(), onValueCommitted: fn() },
  render: function Render(args) {
    const [valor, setValor] = useState<string | null>(args.value ?? '#baabff');
    return (
      <ColorPickerField
        {...args}
        value={valor}
        onValueChange={(hex) => { setValor(hex); args.onValueChange?.(hex); }}
        onClear={() => setValor(null)}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof ColorPickerField>;

export const PorDefecto: Story = {};

export const ConAyuda: Story = {
  args: { helperText: 'El color de los enlaces y de los botones principales.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: { errorMessage: 'Elige un color.', value: null },
};

export const ConTransparencia: Story = {
  args: { label: 'Velo de la portada', alpha: true, value: '#111e3080' },
};

export const ConQuitar: Story = {
  name: 'Con quitar color',
  args: { label: 'Fondo de la celda', clearable: true },
};

export const Deshabilitado: Story = { args: { disabled: true } };

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** Las tres tallas del sistema: el disparador mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <Stack gap="md">
      <ColorPickerField {...args} size="sm" label="Pequeño" value="#ffcd00" />
      <ColorPickerField {...args} size="md" label="Mediano" value="#ffcd00" />
      <ColorPickerField {...args} size="lg" label="Grande" value="#ffcd00" />
    </Stack>
  ),
};

/** Test: la etiqueta nombra el disparador y también el panel que abre. */
export const ContratoEtiqueta: Story = {
  name: 'Test — la etiqueta nombra el disparador y el panel',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    // Pulsar la etiqueta de un botón lo activa, como en HTML: abre el panel.
    await userEvent.click(canvas.getByText('Color de acento'));
    await expect(await body.findByRole('dialog', { name: 'Color de acento' })).toBeInTheDocument();
  },
};
