import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { AsyncMultiSelectField } from './AsyncMultiSelectField';
import type { AsyncMultiSelectOption } from './AsyncMultiSelectField';

const EMPLOYEES: AsyncMultiSelectOption[] = [
  { value: '1', label: 'Ana García' },
  { value: '2', label: 'Carlos López' },
  { value: '3', label: 'María Fernández' },
  { value: '4', label: 'Juan Martínez' },
  { value: '5', label: 'Laura Sánchez' },
  { value: '6', label: 'Pedro Ruiz' },
];

function mockSearch(query: string): Promise<AsyncMultiSelectOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(q ? EMPLOYEES.filter(e => e.label.toLowerCase().includes(q)) : EMPLOYEES.slice(0, 4));
    }, 400),
  );
}

const meta: Meta<typeof AsyncMultiSelectField> = {
  title: 'Molecules/AsyncMultiSelectField',
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  component: AsyncMultiSelectField,
  parameters: { layout: 'padded' },
  args: {
    id: 'empleados',
    label: 'Empleados',
    onSearch: mockSearch,
    placeholder: 'Buscar empleados…',
  },
};

export default meta;
type Story = StoryObj<typeof AsyncMultiSelectField>;

export const PorDefecto: Story = {};

export const ConValores: Story = {
  args: {
    value: ['1', '3'],
    selectedOptions: [
      { value: '1', label: 'Ana García' },
      { value: '3', label: 'María Fernández' },
    ],
  },
};

export const ConAyuda: Story = {
  args: { helperText: 'Escribe para buscar. Puedes seleccionar varios.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Elige al menos un empleado.',
    helperText: 'Escribe para buscar. Puedes elegir varios.',
  },
};

export const Deshabilitado: Story = {
  args: {
    value: ['1', '2'],
    selectedOptions: [
      { value: '1', label: 'Ana García' },
      { value: '2', label: 'Carlos López' },
    ],
    disabled: true,
  },
};

export const EtiquetaOculta: Story = {
  args: { labelHidden: true },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    value: ['1', '3'],
    selectedOptions: [
      { value: '1', label: 'Ana García' },
      { value: '3', label: 'María Fernández' },
    ],
    helperText: 'Escribe para buscar por nombre.',
  },
};

export const Controlado: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<AsyncMultiSelectOption[]>([]);

    function handleValueChange(next: string[]) {
      setValues(next);
      setSelectedOptions(prev => {
        const added = next
          .filter(v => !prev.some(o => o.value === v))
          .map(v => EMPLOYEES.find(e => e.value === v)!)
          .filter(Boolean);
        return [...prev.filter(o => next.includes(o.value)), ...added];
      });
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AsyncMultiSelectField
          id="empleados-controlado"
          label="Miembros del equipo"
          onSearch={mockSearch}
          placeholder="Buscar empleados…"
          value={values}
          selectedOptions={selectedOptions}
          onValueChange={handleValueChange}
        />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Seleccionados: <strong>{selectedOptions.length ? selectedOptions.map(o => o.label).join(', ') : '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};


/** El disparador mide la talla del sistema con una línea; crece si las pills envuelven. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '22rem' }}>
      <AsyncMultiSelectField {...args} id="ams-sm" size="sm" label="Pequeño" />
      <AsyncMultiSelectField {...args} id="ams-md" size="md" label="Mediano" />
      <AsyncMultiSelectField {...args} id="ams-lg" size="lg" label="Grande" />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('combobox', { name: 'Empleados' });
    await expect(control).toHaveAttribute('id', 'empleados');
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'empleados-error empleados-helper');
    await expect(canvasElement.querySelector('.async-multi-select')).toHaveClass('async-multi-select--error');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'empleados-helper');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '22rem' }}>
      <div data-t="sm"><AsyncMultiSelectField id="amt-sm" size="sm" label="Pequeño" onSearch={mockSearch} /></div>
      <div data-t="md"><AsyncMultiSelectField id="amt-md" size="md" label="Mediano" onSearch={mockSearch} /></div>
      <div data-t="lg"><AsyncMultiSelectField id="amt-lg" size="lg" label="Grande" onSearch={mockSearch} /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .async-multi-select')).toBe(32);
    await expect(alto('[data-t="md"] .async-multi-select')).toBe(40);
    await expect(alto('[data-t="lg"] .async-multi-select')).toBe(48);
  },
};

type Valores = { empleados: string[] };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.empleados?.length) return { values, errors: {} };
  return { values: {}, errors: { empleados: { type: 'required', message: 'Elige al menos un empleado.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { empleados: [] }, resolver });
  const [opciones, setOpciones] = useState<AsyncMultiSelectOption[]>([]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '22rem' }}
      >
        <FormField
          control={form.control}
          name="empleados"
          render={({ field, fieldState }) => (
            <AsyncMultiSelectField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onValueChange={(next) => {
                field.onChange(next);
                setOpciones(next.map((v) => EMPLOYEES.find((e) => e.value === v)!).filter(Boolean));
              }}
              onBlur={field.onBlur}
              disabled={field.disabled}
              selectedOptions={opciones}
              label="Empleados"
              onSearch={mockSearch}
              placeholder="Buscar empleados…"
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
 * `ref` al input de búsqueda. Las etiquetas de lo elegido las guarda el
 * consumidor (`selectedOptions`): react-hook-form solo guarda identificadores.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige al menos un empleado.');
    await expect(canvas.getByRole('combobox', { name: 'Empleados' })).toHaveAttribute('aria-invalid', 'true');
  },
};
