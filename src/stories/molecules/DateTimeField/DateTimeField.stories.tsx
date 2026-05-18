import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent } from 'storybook/test';
import { DateTimeField } from './DateTimeField';

const meta: Meta<typeof DateTimeField> = {
  title: 'Molecules/DateTimeField',
  component: DateTimeField,
  tags: ['autodocs'],
  args: {
    id: 'datetime',
    label: 'Fecha y hora',
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof DateTimeField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DateTimeField
        {...args}
        value={value}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 4, 18, 14, 30));
    return (
      <DateTimeField
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
      <DateTimeField
        {...args}
        value={value}
        helperText="Selecciona la fecha y hora de inicio"
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
      <DateTimeField
        {...args}
        value={value}
        error
        errorMessage="La fecha y hora son obligatorias"
        labelHidden={false}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: new Date(2026, 4, 18, 9, 0),
    disabled: true,
    labelHidden: false,
  },
};

export const ReadOnly: Story = {
  name: 'Solo lectura',
  args: {
    value: new Date(2026, 4, 18, 9, 0),
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

export const Step30: Story = {
  name: 'Paso 30 minutos',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 4, 18, 10, 0));
    return (
      <DateTimeField
        {...args}
        value={value}
        timeStep={30}
        helperText="Intervalos de 30 minutos"
        labelHidden={false}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const SelectDateThenTime: Story = {
  name: 'Seleccionar fecha y hora',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 4, 1, 10, 0));
    return (
      <DateTimeField
        {...args}
        value={value}
        timeStep={30}
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
