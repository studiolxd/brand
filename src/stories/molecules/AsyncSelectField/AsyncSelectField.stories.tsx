import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { AsyncSelectField } from './AsyncSelectField';
import type { AsyncSelectOption } from './AsyncSelectField';

const EMPLOYEES: AsyncSelectOption[] = [
  { value: '1', label: 'Ana García' },
  { value: '2', label: 'Carlos López' },
  { value: '3', label: 'María Fernández' },
  { value: '4', label: 'Juan Martínez' },
  { value: '5', label: 'Laura Sánchez' },
];

function mockSearch(query: string): Promise<AsyncSelectOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(q ? EMPLOYEES.filter(e => e.label.toLowerCase().includes(q)) : EMPLOYEES.slice(0, 4));
    }, 400),
  );
}

const meta: Meta<typeof AsyncSelectField> = {
  title: 'Molecules/AsyncSelectField',
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  component: AsyncSelectField,
  parameters: { layout: 'padded' },
  args: {
    id: 'empleado',
    label: 'Empleado',
    onSearch: mockSearch,
    placeholder: 'Buscar empleado…',
  },
};

export default meta;
type Story = StoryObj<typeof AsyncSelectField>;

export const PorDefecto: Story = {};

export const ConValor: Story = {
  args: {
    value: '1',
    selectedOption: { value: '1', label: 'Ana García' },
  },
};

export const ConAyuda: Story = {
  args: { helperText: 'Escribe para buscar por nombre.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Elige un empleado.',
    helperText: 'Escribe para buscar por nombre.',
  },
};

export const Deshabilitado: Story = {
  args: {
    value: '2',
    selectedOption: { value: '2', label: 'Carlos López' },
    disabled: true,
  },
};

export const EtiquetaOculta: Story = {
  args: { labelHidden: true },
};

export const Controlado: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<AsyncSelectOption | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AsyncSelectField
          id="empleado-controlado"
          label="Empleado responsable"
          onSearch={mockSearch}
          placeholder="Buscar empleado…"
          value={value}
          selectedOption={selectedOption}
          onValueChange={(v, opt) => { setValue(v); setSelectedOption(opt ?? null); }}
        />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Seleccionado: <strong>{selectedOption?.label ?? '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};


/** Las tres tallas del sistema: el control mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '22rem' }}>
      <AsyncSelectField {...args} id="as-sm" size="sm" label="Pequeño" />
      <AsyncSelectField {...args} id="as-md" size="md" label="Mediano" />
      <AsyncSelectField {...args} id="as-lg" size="lg" label="Grande" />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('combobox', { name: 'Empleado' });
    await expect(control).toHaveAttribute('id', 'empleado');
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'empleado-error empleado-helper');
    await expect(canvasElement.querySelector('.async-select')).toHaveClass('async-select--error');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'empleado-helper');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '22rem' }}>
      <div data-t="sm"><AsyncSelectField id="at-sm" size="sm" label="Pequeño" onSearch={mockSearch} /></div>
      <div data-t="md"><AsyncSelectField id="at-md" size="md" label="Mediano" onSearch={mockSearch} /></div>
      <div data-t="lg"><AsyncSelectField id="at-lg" size="lg" label="Grande" onSearch={mockSearch} /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .async-select')).toBe(32);
    await expect(alto('[data-t="md"] .async-select')).toBe(40);
    await expect(alto('[data-t="lg"] .async-select')).toBe(48);
  },
};

type Valores = { empleado: string | null };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.empleado) return { values, errors: {} };
  return { values: {}, errors: { empleado: { type: 'required', message: 'Elige un empleado.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { empleado: null }, resolver });
  const [opcion, setOpcion] = useState<AsyncSelectOption | null>(null);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '22rem' }}
      >
        <FormField
          control={form.control}
          name="empleado"
          render={({ field, fieldState }) => (
            <AsyncSelectField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onValueChange={(v, opt) => { field.onChange(v); setOpcion(opt); }}
              onBlur={field.onBlur}
              disabled={field.disabled}
              selectedOption={opcion}
              label="Empleado"
              onSearch={mockSearch}
              placeholder="Buscar empleado…"
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
 * El control es de Base UI: el contrato es `value`/`onValueChange` + `name` +
 * `ref` al input de búsqueda. La etiqueta de la opción elegida la guarda el
 * consumidor (`selectedOption`): react-hook-form solo guarda el identificador.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige un empleado.');
    await expect(canvas.getByRole('combobox', { name: 'Empleado' })).toHaveAttribute('aria-invalid', 'true');
  },
};
