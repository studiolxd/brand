import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent } from 'storybook/test';
import { DatePickerField } from './DatePickerField';

const meta: Meta<typeof DatePickerField> = {
  title: 'Molecules/DatePickerField',
  component: DatePickerField,
  tags: ['autodocs'],
  args: {
    id: 'fecha',
    label: 'Fecha',
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePickerField
        {...args}
        value={value}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 4, 18));
    return (
      <DatePickerField
        {...args}
        value={value}
        labelHidden={false}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const WithHelperText: Story = {
  name: 'Con texto de ayuda',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePickerField
        {...args}
        value={value}
        helperText="Selecciona la fecha de inicio del proyecto"
        labelHidden={false}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const WithError: Story = {
  name: 'Con error',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePickerField
        {...args}
        value={value}
        error
        errorMessage="La fecha es obligatoria"
        labelHidden={false}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: new Date(2026, 4, 18),
    disabled: true,
    labelHidden: false,
  },
};

export const ReadOnly: Story = {
  name: 'Solo lectura',
  args: {
    value: new Date(2026, 4, 18),
    readOnly: true,
    labelHidden: false,
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button');
    await expect(trigger).toHaveAttribute('aria-readonly', 'true');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const WithMinMax: Story = {
  name: 'Con rango min/max',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePickerField
        {...args}
        value={value}
        minDate={new Date(2026, 4, 1)}
        maxDate={new Date(2026, 4, 31)}
        helperText="Solo días de mayo de 2026"
        labelHidden={false}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const SelectDate: Story = {
  name: 'Seleccionar fecha y ver resultado',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 4, 1));
    return (
      <DatePickerField
        {...args}
        value={value}
        labelHidden={false}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
  play: async ({ canvas, args }) => {
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const day18 = canvas.getByRole('gridcell', { name: '18' });
    await userEvent.click(day18);

    await expect(args.onChange).toHaveBeenCalled();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};
