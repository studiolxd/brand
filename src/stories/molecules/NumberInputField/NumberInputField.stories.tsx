import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { NumberInputField } from './NumberInputField';

const meta: Meta<typeof NumberInputField> = {
  title: 'Molecules/NumberInputField',
  component: NumberInputField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'cantidad', label: 'Cantidad', defaultValue: 1 },
  render: (args) => <div style={{ inlineSize: '14rem' }}><NumberInputField {...args} /></div>,
};

export default meta;
type Story = StoryObj<typeof NumberInputField>;

export const PorDefecto: Story = {};

export const ConAyuda: Story = {
  args: { helperText: 'Máximo 10 unidades por pedido.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: { errorMessage: 'Tiene que ser al menos 1.', helperText: 'Máximo 10 unidades por pedido.' },
};

export const ConMinimoYMaximo: Story = {
  args: { min: 0, max: 10, helperText: 'Entre 0 y 10.' },
};

export const ConDecimales: Story = {
  args: { decimal: true, step: 0.5, defaultValue: 1.5, label: 'Horas' },
};

export const Deshabilitado: Story = { args: { disabled: true } };

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** Las tres tallas del sistema: el control mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '14rem' }}>
      <NumberInputField {...args} id="talla-sm" size="sm" label="Pequeño" />
      <NumberInputField {...args} id="talla-md" size="md" label="Mediano" />
      <NumberInputField {...args} id="talla-lg" size="lg" label="Grande" />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('textbox', { name: 'Cantidad' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'cantidad-error cantidad-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'cantidad-helper');
    await expect(canvasElement.querySelector('.number-input')).toHaveClass('number-input--error');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><NumberInputField id="c-sm" size="sm" label="Pequeño" /></div>
      <div data-t="md"><NumberInputField id="c-md" size="md" label="Mediano" /></div>
      <div data-t="lg"><NumberInputField id="c-lg" size="lg" label="Grande" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .number-input')).toBe(32);
    await expect(alto('[data-t="md"] .number-input')).toBe(40);
    await expect(alto('[data-t="lg"] .number-input')).toBe(48);
  },
};

type Valores = { cantidad: number };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.cantidad > 0) return { values, errors: {} };
  return { values: {}, errors: { cantidad: { type: 'min', message: 'Pide al menos una unidad.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { cantidad: 0 }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '14rem' }}
      >
        <FormField
          control={form.control}
          name="cantidad"
          render={({ field, fieldState }) => (
            <NumberInputField
              {...field}
              min={0}
              label="Cantidad"
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  );
}

/** Montado con `FormProvider` + `FormField`: el error del resolver llega al campo. */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Pide al menos una unidad.');
    await expect(canvas.getByRole('textbox', { name: 'Cantidad' })).toHaveAttribute('aria-invalid', 'true');
  },
};
