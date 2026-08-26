import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { DropdownField } from './DropdownField';
import { Icon } from '../../atoms/Icon/Icon';
import { Container } from '../../atoms/Container/Container';

const ORDEN = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'name', label: 'Por nombre' },
  { value: 'size', label: 'Por tamaño' },
];

function Controlado(props: Partial<React.ComponentProps<typeof DropdownField>>) {
  const [value, setValue] = useState('recent');
  const actual = ORDEN.find((o) => o.value === value)!;
  return (
    <DropdownField
      id="orden"
      label="Ordenar por"
      items={ORDEN.map((o) => ({ type: 'radio' as const, value: o.value, label: o.label }))}
      value={value}
      onValueChange={setValue}
      {...props}
    >
      {actual.label}
    </DropdownField>
  );
}

const meta: Meta<typeof DropdownField> = {
  title: 'Molecules/DropdownField',
  component: DropdownField,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => <Controlado {...args} />,
};
export default meta;

type Story = StoryObj<typeof DropdownField>;

/** Etiqueta encima, como cualquier campo de formulario. */
export const PorDefecto: Story = {};

/** Etiqueta delante, en línea: para barras y paneles. */
export const EnLinea: Story = { args: { inline: true } };

/** Sin etiqueta visible: el nombre accesible va en `aria-label`. */
export const SinEtiqueta: Story = { args: { label: undefined, 'aria-label': 'Ordenar por' } };

/** El contenido del control admite icono. */
export const ConIcono: Story = {
  render: () => (
    <Controlado>
      <Icon name="sun" size="sm" />
      Claro
    </Controlado>
  ),
};

export const Deshabilitado: Story = { args: { disabled: true } };

export const SuperficieOscura: Story = {
  render: () => (
    <Container surface="dark" space="md">
      <Controlado />
    </Container>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta enlazada, control a talla, opciones exclusivas',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('button', { name: 'Ordenar por' });
    await expect(Math.round(control.getBoundingClientRect().height)).toBe(40);
    await expect(control.textContent).toContain('Más recientes');
    await userEvent.click(control);
    const opciones = await within(document.body).findAllByRole('menuitemradio');
    await expect(opciones).toHaveLength(3);
    await userEvent.click(within(document.body).getByRole('menuitemradio', { name: 'Por nombre' }));
    await expect(canvas.getByRole('button', { name: 'Ordenar por' }).textContent).toContain('Por nombre');
  },
};

export const ContratoAriaLabel: Story = {
  name: 'Test — sin etiqueta visible, nombre por aria-label',
  tags: ['!dev'],
  args: { label: undefined, 'aria-label': 'Ordenar por' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Ordenar por' })).toBeInTheDocument();
    await expect(canvas.queryByText('Ordenar por')).toBeNull();
  },
};
