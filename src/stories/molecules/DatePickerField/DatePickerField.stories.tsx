import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { DatePickerField } from './DatePickerField';

const meta: Meta<typeof DatePickerField> = {
  title: 'Molecules/DatePickerField',
  component: DatePickerField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'fecha', label: 'Fecha de inicio', onChange: fn() },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(args.value ?? null);
    return (
      <div style={{ inlineSize: '20rem' }}>
        <DatePickerField
          {...args}
          value={value}
          onChange={(d) => { setValue(d); args.onChange?.(d); }}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerField>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { value: new Date(2026, 4, 18) } };

export const ConAyuda: Story = {
  args: { helperText: 'La fecha en la que empieza el contrato.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Elige una fecha.',
    helperText: 'La fecha en la que empieza el contrato.',
  },
};

export const Deshabilitado: Story = { args: { disabled: true, value: new Date(2026, 4, 18) } };

export const SoloLectura: Story = { args: { readOnly: true, value: new Date(2026, 4, 18) } };

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

export const ConRango: Story = {
  args: {
    minDate: new Date(2026, 4, 10),
    maxDate: new Date(2026, 4, 25),
    value: new Date(2026, 4, 18),
    helperText: 'Solo del 10 al 25 de mayo.',
  },
};

/** Las tres tallas del sistema: el disparador mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '20rem' }}>
      <DatePickerField {...args} id="dp-sm" size="sm" label="Pequeño" />
      <DatePickerField {...args} id="dp-md" size="md" label="Mediano" />
      <DatePickerField {...args} id="dp-lg" size="lg" label="Grande" />
    </div>
  ),
};

/** Al elegir un día, el calendario se cierra y el valor sube al consumidor. */
export const ElegirFecha: Story = {
  args: { value: new Date(2026, 4, 1) },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /Fecha de inicio|mayo/ });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // El calendario se monta en un portal de Base UI, fuera del canvas
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole('gridcell', { name: '18' }));
    await expect(args.onChange).toHaveBeenCalled();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvasElement.querySelector('#fecha')!;
    await expect(canvasElement.querySelector('label[for="fecha"]')).toHaveTextContent('Fecha de inicio');
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'fecha-error fecha-helper');
    await expect(control).toHaveClass('date-picker__trigger--error');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'fecha-helper');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '20rem' }}>
      <div data-t="sm"><DatePickerField id="dt-sm" size="sm" label="Pequeño" /></div>
      <div data-t="md"><DatePickerField id="dt-md" size="md" label="Mediano" /></div>
      <div data-t="lg"><DatePickerField id="dt-lg" size="lg" label="Grande" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .date-picker__trigger')).toBe(32);
    await expect(alto('[data-t="md"] .date-picker__trigger')).toBe(40);
    await expect(alto('[data-t="lg"] .date-picker__trigger')).toBe(48);
  },
};

type Valores = { inicio: Date | null };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.inicio) return { values, errors: {} };
  return { values: {}, errors: { inicio: { type: 'required', message: 'Elige una fecha de inicio.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { inicio: null }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '20rem' }}
      >
        <FormField
          control={form.control}
          name="inicio"
          render={({ field, fieldState }) => (
            <DatePickerField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Fecha de inicio"
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
 * El control es de Base UI: el contrato es `value`/`onChange` + `name` + `ref`
 * al disparador, no el spread del `field`.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige una fecha de inicio.');
  },
};
