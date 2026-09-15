import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Slider } from './Slider';
import { Stack } from '../Stack/Stack';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    showValue: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    orientation: { control: { type: 'inline-radio' }, options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

/** Un valor suelto: devuelve un número, no una lista de uno. */
export const PorDefecto: Story = {
  args: { label: 'Espaciado', defaultValue: 40 },
};

/** `showValue` pinta el valor formateado junto a la banda. */
export const ConValor: Story = {
  args: { label: 'Opacidad', defaultValue: 60, showValue: true },
};

/** Con una lista, un pulgar por entrada: es un rango. */
export const Rango: Story = {
  args: { label: 'Precio', defaultValue: [20, 80], showValue: true },
};

/** Pasos de 10: el deslizador es discreto. */
export const Pasos: Story = {
  args: { label: 'Ancho de columna', defaultValue: 50, step: 10, showValue: true },
};

/** `onValueChange` mientras se arrastra; `onValueCommitted` al soltar. */
export const Controlado: Story = {
  render: function Controlado() {
    const [valor, setValor] = useState<number | number[]>(30);
    const [guardado, setGuardado] = useState<number | number[]>(30);
    return (
      <Stack>
        <Slider label="Espaciado" value={valor} onValueChange={setValor} onValueCommitted={setGuardado} />
        <span>Mientras se mueve: {String(valor)} · Al soltar: {String(guardado)}</span>
      </Stack>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ blockSize: '12rem' }}>
      <Slider label="Volumen" orientation="vertical" defaultValue={70} />
    </div>
  ),
};

export const Deshabilitado: Story = {
  args: { label: 'Espaciado', defaultValue: 40, disabled: true },
};

export const TestTeclado: Story = {
  name: 'Test — el pulgar se mueve con el teclado',
  tags: ['!dev'],
  args: { label: 'Espaciado', defaultValue: 40 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pulgar = canvas.getByRole('slider', { name: 'Espaciado' });

    await expect(pulgar).toHaveValue('40');
    pulgar.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(pulgar).toHaveValue('41');
  },
};

export const TestRango: Story = {
  name: 'Test — el rango monta un pulgar por valor, con su nombre',
  tags: ['!dev'],
  args: { label: 'Precio', defaultValue: [20, 80] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('slider')).toHaveLength(2);
    await expect(canvas.getByRole('slider', { name: 'Mínimo' })).toHaveValue('20');
    await expect(canvas.getByRole('slider', { name: 'Máximo' })).toHaveValue('80');
  },
};

/**
 * Los nombres de los pulgares salen de `slider.*`: con uno solo, el `label` de
 * la pantalla y en su defecto `slider.value`; con dos, `slider.min` y
 * `slider.max`; con más, `slider.valueAt`. Cada clave se lee **donde se
 * pinta**, así que un deslizador de un pulgar no exige las del rango.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <Stack gap="lg">
        <Slider defaultValue={40} />
        <Slider label="Price" defaultValue={[20, 80]} />
      </Stack>
    </BrandMessagesProvider>
  ),
};

/** Test: el rango toma sus dos nombres del catálogo. */
export const ContratoProveedor: Story = {
  name: 'Test — los pulgares leen su nombre del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <Slider label="Price" defaultValue={[20, 80]} />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('slider', { name: 'Minimum' })).toBeInTheDocument();
    await expect(canvas.getByRole('slider', { name: 'Maximum' })).toBeInTheDocument();
  },
};
