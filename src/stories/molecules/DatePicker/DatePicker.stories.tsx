import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
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
  play: async ({ canvas, canvasElement, args }) => {
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // El popover del calendario se monta en un portal de Base UI (document.body),
    // fuera del canvasElement de la story.
    const body = within(canvasElement.ownerDocument.body);
    const day18 = body.getByRole('gridcell', { name: '18' });
    await userEvent.click(day18);

    await expect(args.onChange).toHaveBeenCalled();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

/** Test: el panel del calendario es un diálogo con nombre accesible (`calendarLabel`). */
export const ContratoNombreAccesible: Story = {
  name: 'Test — nombre accesible del panel',
  tags: ['!dev'],
  render: (args) => <DatePicker {...args} value={null} />,
  play: async ({ canvas, canvasElement }) => {
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);

    const body = within(canvasElement.ownerDocument.body);
    const panel = body.getByRole('dialog', { name: 'Calendario' });
    await expect(panel).toBeInTheDocument();
  },
};

/**
 * Test: el input oculto que manda el `name` lleva la fecha en el huso LOCAL,
 * no en UTC (`toISOString()` desplazaría un día en husos al este del
 * meridiano a horas tempranas — ver REVISION-pendientes.md).
 */
export const ContratoInputOcultoFechaLocal: Story = {
  name: 'Test — input oculto en fecha local, no UTC',
  tags: ['!dev'],
  render: () => <DatePicker name="fecha" value={new Date(2026, 0, 1, 0, 30)} />,
  play: async ({ canvasElement }) => {
    const hidden = canvasElement.querySelector<HTMLInputElement>('input[name="fecha"]')!;
    await expect(hidden.value).toBe('2026-01-01');
  },
};

/** Test: el control mide la talla del sistema (32/40/48), como Button y Select. */
export const ContratoTalla: Story = {
  name: 'Test — talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><DatePicker size="sm" value={null} /></div>
      <div data-t="md"><DatePicker size="md" value={null} /></div>
      <div data-t="lg"><DatePicker size="lg" value={null} /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .date-picker__trigger')).toBe(32);
    await expect(alto('[data-t="md"] .date-picker__trigger')).toBe(40);
    await expect(alto('[data-t="lg"] .date-picker__trigger')).toBe(48);
  },
};
