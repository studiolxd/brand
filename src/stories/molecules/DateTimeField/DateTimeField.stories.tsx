import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { DateTimeField } from './DateTimeField';

const meta: Meta<typeof DateTimeField> = {
  title: 'Molecules/DateTimeField',
  component: DateTimeField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'cita', label: 'Fecha y hora de la cita', onChange: fn() },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(args.value ?? null);
    return (
      <div style={{ inlineSize: '28rem' }}>
        <DateTimeField
          {...args}
          value={value}
          onChange={(d) => { setValue(d); args.onChange?.(d); }}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof DateTimeField>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { value: new Date(2026, 4, 18, 10, 30) } };

export const ConAyuda: Story = {
  args: { helperText: 'Puedes cambiarla hasta 24 horas antes.' },
};

/** El error se dice en texto y en el borde de los dos controles; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Elige fecha y hora.',
    helperText: 'Puedes cambiarla hasta 24 horas antes.',
  },
};

export const Deshabilitado: Story = {
  args: { disabled: true, value: new Date(2026, 4, 18, 10, 30) },
};

export const SoloLectura: Story = {
  args: { readOnly: true, value: new Date(2026, 4, 18, 10, 30) },
};

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** `timeStep` decide el salto de los minutos: 5 por defecto, 30 para franjas. */
export const PasoDeTreinta: Story = {
  args: { timeStep: 30, value: new Date(2026, 4, 18, 11, 0) },
};

/** Las tres tallas del sistema: los dos controles miden 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '28rem' }}>
      <DateTimeField {...args} id="dtf-sm" size="sm" label="Pequeño" />
      <DateTimeField {...args} id="dtf-md" size="md" label="Mediano" />
      <DateTimeField {...args} id="dtf-lg" size="lg" label="Grande" />
    </div>
  ),
};

/** La hora solo se aplica si ya hay fecha: primero el día, después la hora. */
export const ElegirFechaYHora: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvasElement.querySelector('#cita-date')!);
    // El nombre accesible de la celda es la fecha entera, no el número suelto
    await userEvent.click(await body.findByRole('gridcell', { name: /\b18 de \w+ de \d{4}$/ }));
    await expect(args.onChange).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole('combobox', { name: 'Horas' }));
    await userEvent.click(await body.findByRole('option', { name: '14' }));
    const ultima = (args.onChange as ReturnType<typeof fn>).mock.calls.at(-1)![0] as Date;
    await expect(ultima.getHours()).toBe(14);
  },
};

/**
 * En superficie oscura los dos controles los vuelcan `DatePickerField` y
 * `TimeField`; el campo solo pone su ayuda (tinta de la superficie) y su error
 * (rojo de superficie oscura), como el resto de la familia de campos.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { value: new Date(2026, 4, 18, 10, 30), helperText: 'Puedes cambiarla hasta 24 horas antes.' },
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Fecha y hora forman un grupo: la etiqueta lo nombra
    const grupo = canvas.getByRole('group', { name: 'Fecha y hora de la cita' });
    await expect(grupo).toHaveAttribute('aria-describedby', 'cita-error cita-helper');
    await expect(grupo).toHaveAttribute('aria-invalid', 'true');
    // La etiqueta apunta al disparador de la fecha, que es lo primero
    await expect(canvasElement.querySelector('label[for="cita-date"]')).toHaveTextContent('Fecha y hora de la cita');
    await expect(canvasElement.querySelector('#cita-date')).toHaveClass('date-picker__trigger--error');
    await expect(canvas.getByRole('combobox', { name: 'Horas' })).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'cita-helper');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '28rem' }}>
      <DateTimeField id="dt-sm" size="sm" label="Pequeño" />
      <DateTimeField id="dt-md" size="md" label="Mediano" />
      <DateTimeField id="dt-lg" size="lg" label="Grande" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (id: string) =>
      Math.round(canvasElement.querySelector(`#${id}`)!.getBoundingClientRect().height);
    await expect(alto('dt-sm-date')).toBe(32);
    await expect(alto('dt-md-date')).toBe(40);
    await expect(alto('dt-lg-date')).toBe(48);
  },
};

type Valores = { cita: Date | null };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.cita) return { values, errors: {} };
  return { values: {}, errors: { cita: { type: 'required', message: 'Elige fecha y hora.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { cita: null }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '28rem' }}
      >
        <FormField
          control={form.control}
          name="cita"
          render={({ field, fieldState }) => (
            <DateTimeField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Fecha y hora de la cita"
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
 * Los dos controles son de Base UI: el contrato es `value`/`onChange` + `name`
 * + `ref` al disparador de la fecha, no el spread del `field`.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige fecha y hora.');
    await expect(canvas.getByRole('group', { name: 'Fecha y hora de la cita' })).toHaveAttribute('aria-invalid', 'true');
  },
};
