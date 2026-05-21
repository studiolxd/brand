import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
  component: AsyncMultiSelectField,
  parameters: { layout: 'padded' },
  args: {
    id: 'employees',
    label: 'Empleados',
    onSearch: mockSearch,
    placeholder: 'Buscar empleados…',
  },
};

export default meta;
type Story = StoryObj<typeof AsyncMultiSelectField>;

export const Default: Story = {};

export const WithInitialValues: Story = {
  name: 'With initial values',
  args: {
    value: ['1', '3'],
    selectedOptions: [
      { value: '1', label: 'Ana García' },
      { value: '3', label: 'María Fernández' },
    ],
  },
};

export const WithHelper: Story = {
  name: 'With helper text',
  args: { helperText: 'Escribe para buscar. Puedes seleccionar varios.' },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    error: true,
    errorMessage: 'Selecciona al menos un empleado.',
    helperText: 'Este campo es obligatorio.',
  },
};

export const Disabled: Story = {
  args: {
    value: ['1', '2'],
    selectedOptions: [
      { value: '1', label: 'Ana García' },
      { value: '2', label: 'Carlos López' },
    ],
    disabled: true,
  },
};

export const LabelHidden: Story = {
  name: 'Label hidden',
  args: { labelHidden: true },
};

export const Controlled: Story = {
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
          id="employees-controlled"
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
