import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { RadioGroup } from './RadioGroup';
import { Fieldset } from '../Fieldset/Fieldset';
import { RadioField } from '../../molecules/RadioField/RadioField';

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: { type: 'inline-radio' }, options: ['vertical', 'horizontal'] },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const opciones = (
  <>
    <RadioField value="mensual" label="Mensual" />
    <RadioField value="anual" label="Anual" />
    <RadioField value="perpetua" label="Licencia perpetua" />
  </>
);

/** No controlado: el grupo se queda con el estado a partir de `defaultValue`. */
export const PorDefecto: Story = {
  args: { defaultValue: 'anual', children: opciones, 'aria-label': 'Periodicidad' },
};

/** Con `Fieldset` alrededor, el rótulo del grupo es su `legend`. */
export const ConFieldset: Story = {
  render: () => (
    <Fieldset legend="Periodicidad del pago">
      <RadioGroup defaultValue="anual">{opciones}</RadioGroup>
    </Fieldset>
  ),
};

/** En fila, para dos o tres opciones cortas. */
export const EnFila: Story = {
  name: 'En fila',
  render: () => (
    <Fieldset legend="Periodicidad del pago">
      <RadioGroup orientation="horizontal" defaultValue="mensual">
        <RadioField value="mensual" label="Mensual" />
        <RadioField value="anual" label="Anual" />
      </RadioGroup>
    </Fieldset>
  ),
};

/** Controlado: el valor lo lleva el consumidor y `onValueChange` le avisa. */
export const Controlado: Story = {
  render: () => {
    const [value, setValue] = useState('anual');
    return (
      <Fieldset legend="Periodicidad del pago">
        <RadioGroup value={value} onValueChange={setValue}>
          {opciones}
        </RadioGroup>
        <p>Elegido: {value}</p>
      </Fieldset>
    );
  },
};

/** `size`, `disabled` y `error` bajan a todas las opciones del grupo. */
export const EstadoDelGrupo: Story = {
  name: 'Estado del grupo',
  render: () => (
    <>
      <Fieldset legend="Talla sm">
        <RadioGroup size="sm" defaultValue="mensual">{opciones}</RadioGroup>
      </Fieldset>
      <Fieldset legend="Deshabilitado">
        <RadioGroup disabled defaultValue="mensual">{opciones}</RadioGroup>
      </Fieldset>
      <Fieldset legend="En error">
        <RadioGroup error>{opciones}</RadioGroup>
      </Fieldset>
    </>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <Fieldset legend="Periodicidad del pago">
      <RadioGroup defaultValue="anual">{opciones}</RadioGroup>
    </Fieldset>
  ),
};

/** Test: el grupo reparte `name`, marca una sola opción y avisa al cambiar. */
export const Contrato: Story = {
  name: 'Test — name compartido, exclusión y aviso',
  tags: ['!dev'],
  render: () => {
    const [value, setValue] = useState('anual');
    return (
      <>
        <RadioGroup value={value} onValueChange={setValue} aria-label="Periodicidad" name="periodicidad">
          {opciones}
        </RadioGroup>
        <p data-testid="elegido">{value}</p>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grupo = canvas.getByRole('radiogroup', { name: 'Periodicidad' });
    await expect(grupo).toBeInTheDocument();

    const opcionesDom = within(grupo).getAllByRole('radio') as HTMLInputElement[];
    await expect(opcionesDom).toHaveLength(3);
    // Un solo `name` para todas: es lo que las hace excluyentes de verdad.
    await expect(opcionesDom.every((o) => o.name === 'periodicidad')).toBe(true);
    // Y una sola marcada, la del valor del grupo.
    await expect(canvas.getByRole('radio', { name: 'Anual' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: 'Mensual' })).not.toBeChecked();

    await userEvent.click(canvas.getByRole('radio', { name: 'Licencia perpetua' }));
    await expect(canvas.getByTestId('elegido')).toHaveTextContent('perpetua');
    await expect(canvas.getByRole('radio', { name: 'Anual' })).not.toBeChecked();
  },
};

/** Test: `size`, `disabled` y `error` del grupo llegan a cada opción. */
export const ContratoEstado: Story = {
  name: 'Test — el estado del grupo baja a las opciones',
  tags: ['!dev'],
  render: () => (
    <RadioGroup size="sm" disabled error aria-label="Periodicidad">
      <RadioField value="mensual" label="Mensual" />
      <RadioField value="anual" label="Anual" size="lg" />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mensual = canvas.getByRole('radio', { name: 'Mensual' });
    await expect(mensual).toBeDisabled();
    await expect(mensual).toHaveClass('radio--sm');
    await expect(mensual).toHaveAttribute('aria-invalid', 'true');
    // Lo que se pasa a mano manda sobre lo que dice el grupo.
    await expect(canvas.getByRole('radio', { name: 'Anual' })).toHaveClass('radio--lg');
  },
};
