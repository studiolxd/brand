import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AsyncSelect } from './AsyncSelect';
import type { AsyncSelectOption } from './AsyncSelect';

const EMPLOYEES: AsyncSelectOption[] = [
  { value: '1', label: 'Ana García' },
  { value: '2', label: 'Carlos López' },
  { value: '3', label: 'María Fernández' },
  { value: '4', label: 'Juan Martínez' },
  { value: '5', label: 'Laura Sánchez' },
  { value: '6', label: 'Pedro Ruiz' },
];

function mockSearch(query: string): Promise<AsyncSelectOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(q ? EMPLOYEES.filter(e => e.label.toLowerCase().includes(q)) : EMPLOYEES.slice(0, 4));
    }, 400),
  );
}

const meta: Meta<typeof AsyncSelect> = {
  title: 'Atoms/AsyncSelect',
  component: AsyncSelect,
  parameters: { layout: 'padded' },
  args: {
    onSearch: mockSearch,
    placeholder: 'Buscar empleado…',
  },
};

export default meta;
type Story = StoryObj<typeof AsyncSelect>;

export const Default: Story = {};

export const WithInitialValue: Story = {
  name: 'With initial value',
  args: {
    value: '1',
    selectedOption: { value: '1', label: 'Ana García' },
  },
};

export const Disabled: Story = {
  args: {
    value: '2',
    selectedOption: { value: '2', label: 'Carlos López' },
    disabled: true,
  },
};

export const SmSize: Story = {
  name: 'Size sm',
  args: { size: 'sm' },
};

export const LgSize: Story = {
  name: 'Size lg',
  args: { size: 'lg' },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<AsyncSelectOption | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AsyncSelect
          onSearch={mockSearch}
          value={value}
          selectedOption={selectedOption}
          placeholder="Buscar empleado…"
          onValueChange={(v, opt) => {
            setValue(v);
            setSelectedOption(opt ?? null);
          }}
        />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Seleccionado: <strong>{selectedOption?.label ?? '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};
