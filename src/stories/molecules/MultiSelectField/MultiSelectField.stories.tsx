import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { MultiSelectField } from './MultiSelectField';

const options = [
  { value: 'design', label: 'Diseño' },
  { value: 'dev', label: 'Desarrollo' },
  { value: 'branding', label: 'Branding' },
  { value: 'strategy', label: 'Estrategia' },
  { value: 'motion', label: 'Motion' },
];

const meta: Meta<typeof MultiSelectField> = {
  title: 'Molecules/MultiSelectField',
  component: MultiSelectField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: {
    id: 'servicios',
    label: 'Servicios',
    options,
    placeholder: 'Seleccionar servicios…',
  },
  render: (args) => <div style={{ inlineSize: '22rem' }}><MultiSelectField {...args} /></div>,
};

export default meta;
type Story = StoryObj<typeof MultiSelectField>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { defaultValue: ['design', 'dev'] } };

export const ConAyuda: Story = {
  args: { helperText: 'Puedes elegir varios servicios.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Elige al menos un servicio.',
    helperText: 'Puedes elegir varios servicios.',
  },
};

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: ['design'] } };

export const SoloLectura: Story = { args: { readOnly: true, defaultValue: ['design', 'motion'] } };

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** Controlado desde fuera: el consumidor manda el valor. */
export const Controlado: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(['branding']);
    return (
      <div style={{ inlineSize: '22rem' }}>
        <MultiSelectField {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
};

/** El disparador mide la talla del sistema con una línea; crece si las pills envuelven. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '22rem' }}>
      <MultiSelectField {...args} id="ms-sm" size="sm" label="Pequeño" />
      <MultiSelectField {...args} id="ms-md" size="md" label="Mediano" />
      <MultiSelectField {...args} id="ms-lg" size="lg" label="Grande" />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // El disparador es un div: lo nombra la etiqueta por aria-labelledby
    const control = canvas.getByRole('combobox', { name: 'Servicios' });
    await expect(control).toHaveAttribute('aria-labelledby', 'servicios-label');
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'servicios-error servicios-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'servicios-helper');
    // La caja es la que se ve y la que mide: el `role="combobox"` es la parte
    // enfocable de dentro, para que las píldoras queden fuera del rol
    const caja = control.closest('.multi-select')!;
    await expect(caja).toHaveClass('multi-select--error');
    await expect(Math.round(caja.getBoundingClientRect().height)).toBe(40);
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '22rem' }}>
      <MultiSelectField id="mt-sm" size="sm" label="Pequeño" options={options} />
      <MultiSelectField id="mt-md" size="md" label="Mediano" options={options} />
      <MultiSelectField id="mt-lg" size="lg" label="Grande" options={options} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alto = (name: string) =>
      Math.round(
        canvas.getByRole('combobox', { name }).closest('.multi-select')!.getBoundingClientRect().height,
      );
    await expect(alto('Pequeño')).toBe(32);
    await expect(alto('Mediano')).toBe(40);
    await expect(alto('Grande')).toBe(48);
  },
};

type Valores = { servicios: string[] };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.servicios?.length) return { values, errors: {} };
  return { values: {}, errors: { servicios: { type: 'required', message: 'Elige al menos un servicio.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { servicios: [] }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '22rem' }}
      >
        <FormField
          control={form.control}
          name="servicios"
          render={({ field, fieldState }) => (
            <MultiSelectField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Servicios"
              options={options}
              placeholder="Seleccionar servicios…"
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
 * El control es de Base UI: el contrato es `value`/`onValueChange` + `name`
 * + `ref` al disparador, no el spread del `field`.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige al menos un servicio.');
    await expect(canvas.getByRole('combobox', { name: 'Servicios' })).toHaveAttribute('aria-invalid', 'true');
  },
};
