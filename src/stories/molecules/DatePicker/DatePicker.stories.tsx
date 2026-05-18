import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent } from 'storybook/test';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
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
      <DatePicker
        {...args}
        value={value}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const WithMinMax: Story = {
  name: 'Con rango min/max',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        value={value}
        minDate={new Date(2026, 4, 1)}
        maxDate={new Date(2026, 4, 31)}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const Error: Story = {
  name: 'Estado error',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        value={value}
        error
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: new Date(2026, 4, 18),
    disabled: true,
  },
};

export const SizeSm: Story = {
  name: 'Tamaño sm',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        value={value}
        size="sm"
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const SizeLg: Story = {
  name: 'Tamaño lg',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        value={value}
        size="lg"
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

export const SelectAndDisplay: Story = {
  name: 'Seleccionar fecha y ver resultado',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 4, 1));
    return (
      <DatePicker
        {...args}
        value={value}
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
