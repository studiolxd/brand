import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { TimeField } from './TimeField';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';

const meta: Meta<typeof TimeField> = {
  title: 'Molecules/TimeField',
  component: TimeField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'hora', label: 'Hora de inicio', onChange: fn() },
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>(args.value ?? null);
    return (
      <TimeField
        {...args}
        value={value}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof TimeField>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { value: { h: 9, m: 30 } } };

export const ConAyuda: Story = {
  args: { helperText: 'Horario de oficina: de 9:00 a 18:00.' },
};

/** El error se dice en texto y en el borde de los dos desplegables; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Elige una hora.',
    helperText: 'Horario de oficina: de 9:00 a 18:00.',
  },
};

export const Deshabilitado: Story = { args: { disabled: true, value: { h: 9, m: 0 } } };

export const SoloLectura: Story = { args: { readOnly: true, value: { h: 9, m: 0 } } };

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** `step` decide el salto de los minutos: 5 por defecto, 15 para franjas. */
export const PasoDeQuince: Story = { args: { step: 15, value: { h: 10, m: 15 } } };

/** Las tres tallas del sistema: cada desplegable mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TimeField {...args} id="tf-sm" size="sm" label="Pequeño" />
      <TimeField {...args} id="tf-md" size="md" label="Mediano" />
      <TimeField {...args} id="tf-lg" size="lg" label="Grande" />
    </div>
  ),
};

/**
 * En superficie oscura los dos desplegables los vuelca el `TimeSelect`; el
 * campo solo pone su ayuda (tinta de la superficie) y su error (rojo de
 * superficie oscura), como el resto de la familia de campos.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { value: { h: 9, m: 30 }, helperText: 'Horario de oficina: de 9:00 a 18:00.' },
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Los dos desplegables forman un grupo: la etiqueta nombra al grupo
    const grupo = canvas.getByRole('group', { name: 'Hora de inicio' });
    await expect(grupo).toHaveAttribute('aria-describedby', 'hora-error hora-helper');
    await expect(grupo).toHaveAttribute('aria-invalid', 'true');
    // Y cada desplegable conserva su propio nombre
    await expect(canvas.getByRole('combobox', { name: 'Horas' })).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('combobox', { name: 'Minutos' })).toHaveAttribute('aria-invalid', 'true');
    await expect(canvasElement.querySelector('#hora')).not.toBeNull();
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'hora-helper');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <TimeField id="tt-sm" size="sm" label="Pequeño" />
      <TimeField id="tt-md" size="md" label="Mediano" />
      <TimeField id="tt-lg" size="lg" label="Grande" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (id: string) =>
      Math.round(canvasElement.querySelector(`#${id}`)!.getBoundingClientRect().height);
    await expect(alto('tt-sm')).toBe(32);
    await expect(alto('tt-md')).toBe(40);
    await expect(alto('tt-lg')).toBe(48);
  },
};

/** Elegir hora sube el valor al consumidor. */
export const ElegirHora: Story = {
  args: { value: { h: 9, m: 0 } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox', { name: 'Horas' }));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('option', { name: '14' }));
    await expect(args.onChange).toHaveBeenCalledWith({ h: 14, m: 0 });
  },
};

type Valores = { hora: TimeValue | null };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.hora) return { values, errors: {} };
  return { values: {}, errors: { hora: { type: 'required', message: 'Elige una hora.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { hora: null }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}
      >
        <FormField
          control={form.control}
          name="hora"
          render={({ field, fieldState }) => (
            <TimeField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Hora de inicio"
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
 * El control son dos desplegables de Base UI: el contrato es `value`/`onChange`
 * + `name` + `ref` al de horas, no el spread del `field`.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige una hora.');
    await expect(canvas.getByRole('group', { name: 'Hora de inicio' })).toHaveAttribute('aria-invalid', 'true');
  },
};
