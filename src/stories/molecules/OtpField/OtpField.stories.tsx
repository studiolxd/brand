import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { OtpField } from './OtpField';

const meta: Meta<typeof OtpField> = {
  title: 'Molecules/OtpField',
  component: OtpField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'codigo', label: 'Código de verificación', length: 6 },
};

export default meta;
type Story = StoryObj<typeof OtpField>;

export const PorDefecto: Story = {};

export const ConAyuda: Story = {
  args: { helperText: 'Te lo hemos enviado por SMS. Caduca en 10 minutos.' },
};

/** El error se dice en texto y en el borde de las celdas; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'El código no es correcto.',
    helperText: 'Te lo hemos enviado por SMS. Caduca en 10 minutos.',
    defaultValue: '123456',
  },
};

export const ConValor: Story = { args: { defaultValue: '482913' } };

export const CuatroDigitos: Story = { args: { length: 4, label: 'PIN' } };

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: '482913' } };

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** Las tres tallas del sistema: cada celda mide 32, 40 y 48. */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <OtpField id="otp-sm" size="sm" label="Pequeño" length={4} />
      <OtpField id="otp-md" size="md" label="Mediano" length={4} />
      <OtpField id="otp-lg" size="lg" label="Grande" length={4} />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio', length: 4 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // La etiqueta nombra la primera celda: es donde entra el foco
    await expect(canvasElement.querySelector('label[for="codigo-0"]')).toHaveTextContent('Código de verificación');
    const primera = canvasElement.querySelector('#codigo-0')!;
    await expect(primera).toHaveAttribute('aria-invalid', 'true');
    await expect(primera).toHaveAttribute('aria-describedby', 'codigo-error codigo-helper');
    // El grupo entero también queda descrito y marcado
    const grupo = canvas.getByRole('group', { name: 'Código de verificación' });
    await expect(grupo).toHaveAttribute('aria-describedby', 'codigo-error codigo-helper');
    await expect(grupo).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'codigo-helper');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — cada celda mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><OtpField id="ct-sm" size="sm" label="Pequeño" length={4} /></div>
      <div data-t="md"><OtpField id="ct-md" size="md" label="Mediano" length={4} /></div>
      <div data-t="lg"><OtpField id="ct-lg" size="lg" label="Grande" length={4} /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .input')).toBe(32);
    await expect(alto('[data-t="md"] .input')).toBe(40);
    await expect(alto('[data-t="lg"] .input')).toBe(48);
  },
};

type Valores = { codigo: string };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.codigo.length === 6) return { values, errors: {} };
  return { values: {}, errors: { codigo: { type: 'minLength', message: 'El código tiene 6 dígitos.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { codigo: '' }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}
      >
        <FormField
          control={form.control}
          name="codigo"
          render={({ field, fieldState }) => (
            <OtpField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Código de verificación"
              length={6}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit">Verificar</Button>
      </form>
    </FormProvider>
  );
}

/** `onChange` entrega el código completo, no el evento: va directo a `field.onChange`. */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Verificar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('El código tiene 6 dígitos.');
    await expect(canvas.getByRole('group', { name: 'Código de verificación' })).toHaveAttribute('aria-invalid', 'true');
  },
};
