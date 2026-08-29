import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { SelectField } from './SelectField';

const options = [
  { value: '', label: 'Selecciona un tipo' },
  { value: 'full-time', label: 'Jornada completa' },
  { value: 'part-time', label: 'Media jornada' },
  { value: 'freelance', label: 'Autónomo' },
];

const meta: Meta<typeof SelectField> = {
  title: 'Molecules/SelectField',
  component: SelectField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'tipo-contrato', label: 'Tipo de contrato', options },
  render: (args) => <div style={{ inlineSize: '20rem' }}><SelectField {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof SelectField>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { value: 'full-time' } };

export const ConAyuda: Story = {
  args: { helperText: 'El tipo de contrato determina la duración y las condiciones.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: { errorMessage: 'Este campo es obligatorio.', helperText: 'El tipo de contrato determina la duración y las condiciones.' },
};

export const Deshabilitado: Story = { args: { disabled: true, value: 'part-time' } };

/** Etiqueta oculta a la vista, presente para el lector de pantalla. */
export const EtiquetaOculta: Story = { args: { labelHidden: true } };

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('combobox', { name: 'Tipo de contrato' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'tipo-contrato-error tipo-contrato-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'tipo-contrato-helper');
    await expect(Math.round(control.getBoundingClientRect().height)).toBe(40);
  },
};

/** Las tres tallas del sistema: el control mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '20rem' }}>
      <SelectField {...args} id="sf-sm" size="sm" label="Pequeño" />
      <SelectField {...args} id="sf-md" size="md" label="Mediano" />
      <SelectField {...args} id="sf-lg" size="lg" label="Grande" />
    </div>
  ),
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '20rem' }}>
      <SelectField id="ct-sm" size="sm" label="Pequeño" options={options} />
      <SelectField id="ct-md" size="md" label="Mediano" options={options} />
      <SelectField id="ct-lg" size="lg" label="Grande" options={options} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alto = (name: string) =>
      Math.round(canvas.getByRole('combobox', { name }).getBoundingClientRect().height);
    await expect(alto('Pequeño')).toBe(32);
    await expect(alto('Mediano')).toBe(40);
    await expect(alto('Grande')).toBe(48);
  },
};

export const ContratoIdGenerado: Story = {
  name: 'Test — sin `id`, el campo genera uno',
  tags: ['!dev'],
  render: () => <SelectField label="Sin id" options={options} helperText="Ayuda" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('combobox', { name: 'Sin id' });
    const id = control.getAttribute('id');
    await expect(id).toBeTruthy();
    await expect(control).toHaveAttribute('aria-describedby', `${id}-helper`);
  },
};

type Valores = { contrato: string };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.contrato) return { values, errors: {} };
  return { values: {}, errors: { contrato: { type: 'required', message: 'Elige un tipo de contrato.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { contrato: '' }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '20rem' }}
      >
        <FormField
          control={form.control}
          name="contrato"
          render={({ field, fieldState }) => (
            <SelectField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Tipo de contrato"
              options={options.slice(1)}
              placeholder="Selecciona un tipo"
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
 * `value=""` sin ninguna opción de valor `""` en la lista: no hay ítem que
 * reclame el centinela interno, así que el trigger tiene que enseñar el
 * placeholder — nunca el centinela en crudo (bug real visto en
 * lmsmarketplace, filtro «Visibility», F1 2026-08-30).
 */
export const ContratoValorVacioSinOpcion: Story = {
  name: 'Test — value="" sin opción vacía enseña el placeholder, no el centinela',
  tags: ['!dev'],
  args: {
    value: '',
    options: options.slice(1),
    placeholder: 'Todas',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('combobox', { name: 'Tipo de contrato' });
    await expect(control).toHaveTextContent('Todas');
    await expect(control).not.toHaveTextContent('__empty__');
  },
};

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
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige un tipo de contrato.');
    await expect(canvas.getByRole('combobox', { name: 'Tipo de contrato' })).toHaveAttribute('aria-invalid', 'true');
  },
};
