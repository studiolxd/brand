import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { TimeSelect } from './TimeSelect';
import type { TimeValue } from './TimeSelect';

const meta: Meta<typeof TimeSelect> = {
  title: 'Atoms/TimeSelect',
  component: TimeSelect,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof TimeSelect>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>(null);
    return (
      <TimeSelect
        {...args}
        value={value}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 14, m: 30 });
    return (
      <TimeSelect
        {...args}
        value={value}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const Step15: Story = {
  name: 'Paso 15 minutos',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 9, m: 0 });
    return (
      <TimeSelect
        {...args}
        value={value}
        step={15}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: { h: 10, m: 0 },
    disabled: true,
  },
};

export const SizeSm: Story = {
  name: 'Tamaño sm',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 8, m: 15 });
    return (
      <TimeSelect
        {...args}
        value={value}
        size="sm"
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const SizeLg: Story = {
  name: 'Tamaño lg',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 18, m: 45 });
    return (
      <TimeSelect
        {...args}
        value={value}
        size="lg"
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const ChangeMinute: Story = {
  name: 'Cambiar minuto y ver resultado',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 10, m: 0 });
    return (
      <TimeSelect
        {...args}
        value={value}
        step={30}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
  play: async ({ canvas, args }) => {
    const triggers = canvas.getAllByRole('combobox');
    await userEvent.click(triggers[1]);

    const listbox = within(document.body).getByRole('listbox');
    const option30 = within(listbox).getByText('30');
    await userEvent.click(option30);

    await expect(args.onChange).toHaveBeenCalledWith({ h: 10, m: 30 });
  },
};
