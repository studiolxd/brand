import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
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
    const abrir = canvas.getByRole('button', { name: 'Abrir calendario' });
    await userEvent.click(abrir);

    await expect(abrir).toHaveAttribute('aria-expanded', 'true');

    // El popover del calendario se monta en un portal de Base UI (document.body),
    // fuera del canvasElement de la story.
    const body = within(canvasElement.ownerDocument.body);
    // El nombre accesible de la celda es la fecha entera, no el número suelto
    const day18 = body.getByRole('gridcell', { name: /\b18 de \w+ de \d{4}$/ });
    await userEvent.click(day18);

    await expect(args.onChange).toHaveBeenCalled();
    await expect(abrir).toHaveAttribute('aria-expanded', 'false');
    await expect(canvas.getByRole('textbox')).toHaveValue('18/05/2026');
  },
};

/**
 * La fecha se teclea: el campo acepta el formato numérico corto del locale y
 * emite en cuanto está completa. Vaciarlo borra la fecha.
 */
export const Escribir: Story = {
  name: 'Escribir la fecha',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        aria-label="Fecha"
        value={value}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
  play: async ({ canvas, args }) => {
    const campo = canvas.getByRole('textbox', { name: 'Fecha' });
    await userEvent.type(campo, '25/09/2026');

    const ultima = (args.onChange as ReturnType<typeof fn>).mock.calls.at(-1)![0] as Date;
    await expect(ultima.getDate()).toBe(25);

    await userEvent.clear(campo);
    await expect(args.onChange).toHaveBeenLastCalledWith(null);
  },
};

/** En otro locale cambia el orden de las partes y la pista del campo. */
export const OtroLocale: Story = {
  name: 'En otro locale (en-US)',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 8, 25));
    return (
      <DatePicker
        {...args}
        locale="en-US"
        value={value}
        onChange={(d) => { setValue(d); args.onChange?.(d); }}
      />
    );
  },
};

/**
 * En superficie oscura el campo es el `Input` del sistema (fondo del lienzo,
 * borde y tinta blancos) y el calendario del panel flotante voltea con sus
 * propios tokens.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
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

/** Test: el panel del calendario es un diálogo con nombre accesible (`calendarLabel`). */
export const ContratoNombreAccesible: Story = {
  name: 'Test — nombre accesible del panel',
  tags: ['!dev'],
  render: (args) => <DatePicker {...args} value={null} />,
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir calendario' }));

    const body = within(canvasElement.ownerDocument.body);
    const panel = body.getByRole('dialog', { name: 'Calendario' });
    await expect(panel).toBeInTheDocument();
  },
};

/** Test: la flecha abajo abre el calendario desde el campo; Escape lo cierra. */
export const ContratoTeclado: Story = {
  name: 'Test — flecha abajo abre, Escape cierra',
  tags: ['!dev'],
  render: () => <DatePicker aria-label="Fecha" value={null} />,
  play: async ({ canvas, canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    canvas.getByRole('textbox', { name: 'Fecha' }).focus();

    await userEvent.keyboard('{ArrowDown}');
    await expect(body.getByRole('dialog', { name: 'Calendario' })).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await expect(body.queryByRole('dialog')).toBeNull();
  },
};

/** Test: una fecha a medio escribir no sube y pone el campo en error. */
export const ContratoFechaIncompleta: Story = {
  name: 'Test — la fecha a medias no se emite',
  tags: ['!dev'],
  render: (args) => <DatePicker {...args} aria-label="Fecha" value={null} />,
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByRole('textbox', { name: 'Fecha' }), '25/09');

    await expect(args.onChange).not.toHaveBeenCalled();
    await expect(canvas.getByRole('textbox', { name: 'Fecha' })).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
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
    await expect(alto('[data-t="sm"] .date-picker__input')).toBe(32);
    await expect(alto('[data-t="md"] .date-picker__input')).toBe(40);
    await expect(alto('[data-t="lg"] .date-picker__input')).toBe(48);
  },
};
