import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { InputPhoneField } from './InputPhoneField';

const meta: Meta<typeof InputPhoneField> = {
  title: 'Molecules/InputPhoneField',
  component: InputPhoneField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'telefono', label: 'Teléfono' },
  render: (args) => <div style={{ inlineSize: '20rem' }}><InputPhoneField {...args} /></div>,
};

export default meta;
type Story = StoryObj<typeof InputPhoneField>;

export const PorDefecto: Story = {};

export const ConAyuda: Story = {
  args: { helperText: 'Solo lo usamos para avisarte del pedido.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'El número no es válido.',
    helperText: 'Solo lo usamos para avisarte del pedido.',
  },
};

export const OtroPaisPorDefecto: Story = { args: { defaultCountry: 'PT' } };

export const Deshabilitado: Story = { args: { disabled: true } };

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** Las tres tallas del sistema: el control mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '20rem' }}>
      <InputPhoneField {...args} id="tel-sm" size="sm" label="Pequeño" />
      <InputPhoneField {...args} id="tel-md" size="md" label="Mediano" />
      <InputPhoneField {...args} id="tel-lg" size="lg" label="Grande" />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvasElement.querySelector('input.input-phone__number')!;
    await expect(control).toHaveAttribute('id', 'telefono');
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'telefono-error telefono-helper');
    await expect(canvasElement.querySelector('label[for="telefono"]')).toHaveTextContent('Teléfono');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'telefono-helper');
    await expect(canvasElement.querySelector('.input-phone')).toHaveClass('input-phone--error');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><InputPhoneField id="t-sm" size="sm" label="Pequeño" /></div>
      <div data-t="md"><InputPhoneField id="t-md" size="md" label="Mediano" /></div>
      <div data-t="lg"><InputPhoneField id="t-lg" size="lg" label="Grande" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .input-phone')).toBe(32);
    await expect(alto('[data-t="md"] .input-phone')).toBe(40);
    await expect(alto('[data-t="lg"] .input-phone')).toBe(48);
  },
};

type Valores = { telefono: string };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.telefono && values.telefono.length > 8) return { values, errors: {} };
  return { values: {}, errors: { telefono: { type: 'pattern', message: 'El número no es válido.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { telefono: '' }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '20rem' }}
      >
        <FormField
          control={form.control}
          name="telefono"
          render={({ field, fieldState }) => (
            <InputPhoneField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Teléfono"
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  );
}

/**
 * `onChange` entrega el número en formato E.164, no el evento: se enchufa
 * directo a `field.onChange`.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('El número no es válido.');
    await expect(canvasElement.querySelector('input.input-phone__number')).toHaveAttribute('aria-invalid', 'true');
  },
};
