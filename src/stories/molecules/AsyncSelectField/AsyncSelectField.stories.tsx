import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
  component: AsyncSelectField,
  parameters: { layout: 'padded' },
  args: {
    id: 'employee',
    label: 'Empleado',
    onSearch: mockSearch,
    placeholder: 'Buscar empleado…',
  },
};

export default meta;
type Story = StoryObj<typeof AsyncSelectField>;

export const Default: Story = {};

export const WithInitialValue: Story = {
  name: 'With initial value',
  args: {
    value: '1',
    selectedOption: { value: '1', label: 'Ana García' },
  },
};

export const WithHelper: Story = {
  name: 'With helper text',
  args: { helperText: 'Escribe para buscar por nombre.' },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    error: true,
    errorMessage: 'Selecciona un empleado.',
    helperText: 'Este campo es obligatorio.',
  },
};

export const Disabled: Story = {
  args: {
    value: '2',
    selectedOption: { value: '2', label: 'Carlos López' },
    disabled: true,
  },
};

export const LabelHidden: Story = {
  name: 'Label hidden',
  args: { labelHidden: true },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<AsyncSelectOption | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AsyncSelectField
          id="employee-controlled"
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
