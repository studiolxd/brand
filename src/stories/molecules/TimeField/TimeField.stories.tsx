import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { TimeField } from './TimeField';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';

const meta: Meta<typeof TimeField> = {
  title: 'Molecules/TimeField',
  component: TimeField,
  tags: ['autodocs'],
  args: {
    id: 'time',
    label: 'Hora',
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof TimeField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>(null);
    return (
      <TimeField
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
      <TimeField
        {...args}
        value={value}
        labelHidden={false}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const WithHelperText: Story = {
  name: 'Con texto de ayuda',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 9, m: 0 });
    return (
      <TimeField
        {...args}
        value={value}
        helperText="Formato 24 horas"
        labelHidden={false}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const WithError: Story = {
  name: 'Con error',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>(null);
    return (
      <TimeField
        {...args}
        value={value}
        error
        errorMessage="La hora es obligatoria"
        labelHidden={false}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: { h: 10, m: 0 },
    disabled: true,
    labelHidden: false,
  },
};

export const ReadOnly: Story = {
  name: 'Solo lectura',
  args: {
    value: { h: 10, m: 30 },
    readOnly: true,
    labelHidden: false,
  },
  play: async ({ canvas }) => {
    const triggers = canvas.getAllByRole('combobox');
    await expect(triggers[0]).toHaveAttribute('aria-readonly', 'true');
    await expect(triggers[1]).toHaveAttribute('aria-readonly', 'true');
    await userEvent.click(triggers[0]);
    await expect(within(document.body).queryByRole('listbox')).toBeNull();
  },
};

export const Step15: Story = {
  name: 'Paso 15 minutos',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 8, m: 0 });
    return (
      <TimeField
        {...args}
        value={value}
        step={15}
        helperText="Intervalos de 15 minutos"
        labelHidden={false}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const ChangeHour: Story = {
  name: 'Cambiar hora y ver resultado',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 10, m: 0 });
    return (
      <TimeField
        {...args}
        value={value}
        step={30}
        labelHidden={false}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
  play: async ({ canvas, args }) => {
    const triggers = canvas.getAllByRole('combobox');
    await userEvent.click(triggers[0]);

    const listbox = within(document.body).getByRole('listbox');
    const option14 = within(listbox).getByText('14');
    await userEvent.click(option14);

    await expect(args.onChange).toHaveBeenCalledWith({ h: 14, m: 0 });
  },
};
