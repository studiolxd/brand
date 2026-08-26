import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { CalendarRoster, type RosterRow } from './CalendarRoster';

const meta: Meta<typeof CalendarRoster> = {
  title: 'Por revisar/Molecules/CalendarRoster',
  component: CalendarRoster,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    rows:           { control: false },
    month:          { control: false },
    onMonthChange:  { control: false },
    hrefBuilder:    { control: false },
    nameLabel:      { control: { type: 'text' } },
    showLegend:     { control: { type: 'boolean' } },
    locale:         { control: { type: 'text' } },
  },
  args: {
    nameLabel: 'Empleado',
    showLegend: true,
    locale: 'es-ES',
  },
};

export default meta;
type Story = StoryObj<typeof CalendarRoster>;

function makeRows(month: Date): RosterRow[] {
  const y = month.getFullYear();
  const m = month.getMonth();
  return [
    {
      id: '1',
      name: 'Nuria García Vazquez',
      cells: {
        1:  { type: 'holiday',  label: 'Fiesta del Trabajo' },
        4:  { type: 'schedule', label: '16:00–20:00' },
        5:  { type: 'schedule', label: '16:00–20:00' },
        6:  { type: 'schedule', label: '16:00–20:00' },
        7:  { type: 'schedule', label: '16:00–20:00' },
        8:  { type: 'schedule', label: '16:00–20:00' },
        11: { type: 'schedule', label: '16:00–20:00' },
        12: { type: 'schedule', label: '16:00–20:00' },
        13: { type: 'schedule', label: '16:00–20:00' },
        14: { type: 'schedule', label: '16:00–20:00' },
        15: { type: 'vacation', label: 'Vacaciones' },
        18: { type: 'schedule', label: '16:00–20:00' },
        19: { type: 'schedule', label: '16:00–20:00' },
        20: { type: 'schedule', label: '16:00–20:00' },
        21: { type: 'schedule', label: '16:00–20:00' },
        22: { type: 'schedule', label: '16:00–20:00' },
        25: { type: 'schedule', label: '16:00–20:00' },
        26: { type: 'schedule', label: '16:00–20:00' },
        27: { type: 'schedule', label: '16:00–20:00' },
        28: { type: 'schedule', label: '16:00–20:00' },
        29: { type: 'schedule', label: '16:00–20:00' },
        [new Date(y, m + 1, 0).getDate()]: { type: 'birthday', label: 'Cumpleaños' },
      },
    },
    {
      id: '2',
      name: 'Serena Quinlan García',
      cells: {
        1:  { type: 'holiday',  label: 'Fiesta del Trabajo' },
        4:  { type: 'schedule', label: '09:00–13:00' },
        5:  { type: 'schedule', label: '09:00–13:00' },
        6:  { type: 'schedule', label: '09:00–13:00' },
        7:  { type: 'schedule', label: '09:00–13:00' },
        8:  { type: 'schedule', label: '09:00–13:00' },
        11: { type: 'absence',  label: 'Baja médica' },
        12: { type: 'absence',  label: 'Baja médica' },
        13: { type: 'schedule', label: '09:00–13:00' },
        14: { type: 'schedule', label: '09:00–13:00' },
        15: { type: 'schedule', label: '09:00–13:00' },
        18: { type: 'schedule', label: '09:00–13:00' },
        19: { type: 'schedule', label: '09:00–13:00' },
        20: { type: 'recovery', label: 'Recuperación' },
        21: { type: 'schedule', label: '09:00–13:00' },
        22: { type: 'schedule', label: '09:00–13:00' },
        25: { type: 'schedule', label: '09:00–13:00' },
        26: { type: 'schedule', label: '09:00–13:00' },
        27: { type: 'schedule', label: '09:00–13:00' },
        28: { type: 'schedule', label: '09:00–13:00' },
        29: { type: 'schedule', label: '09:00–13:00' },
      },
    },
    {
      id: '3',
      name: 'Carlos Mendoza Ruiz',
      cells: {
        1:  { type: 'holiday',  label: 'Fiesta del Trabajo' },
        4:  { type: 'schedule', label: '10:00–14:00' },
        5:  { type: 'schedule', label: '10:00–14:00' },
        6:  { type: 'vacation', label: 'Vacaciones' },
        7:  { type: 'vacation', label: 'Vacaciones' },
        8:  { type: 'vacation', label: 'Vacaciones' },
        11: { type: 'vacation', label: 'Vacaciones' },
        12: { type: 'vacation', label: 'Vacaciones' },
        13: { type: 'schedule', label: '10:00–14:00' },
        14: { type: 'schedule', label: '10:00–14:00' },
        15: { type: 'schedule', label: '10:00–14:00' },
        18: { type: 'schedule', label: '10:00–14:00' },
        19: { type: 'schedule', label: '10:00–14:00' },
        20: { type: 'schedule', label: '10:00–14:00' },
        21: { type: 'schedule', label: '10:00–14:00' },
        22: { type: 'schedule', label: '10:00–14:00' },
        25: { type: 'schedule', label: '10:00–14:00' },
        26: { type: 'schedule', label: '10:00–14:00' },
        27: { type: 'schedule', label: '10:00–14:00' },
        28: { type: 'schedule', label: '10:00–14:00' },
        29: { type: 'schedule', label: '10:00–14:00' },
      },
    },
  ];
}

export const Default: Story = {
  render: (args) => {
    const [month, setMonth] = useState(new Date(2026, 4, 1)); // Mayo 2026
    return (
      <CalendarRoster
        {...args}
        month={month}
        onMonthChange={setMonth}
        rows={makeRows(month)}
      />
    );
  },
};

export const ConHrefBuilder: Story = {
  name: 'Con hrefBuilder (SSR)',
  render: (args) => {
    const [month, setMonth] = useState(new Date(2026, 4, 1));
    return (
      <CalendarRoster
        {...args}
        month={month}
        hrefBuilder={(m) =>
          `/operations/calendar?month=${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`
        }
        onMonthChange={setMonth}
        rows={makeRows(month)}
      />
    );
  },
};

export const SinLeyenda: Story = {
  name: 'Sin leyenda',
  render: (args) => {
    const [month, setMonth] = useState(new Date(2026, 4, 1));
    return (
      <CalendarRoster
        {...args}
        showLegend={false}
        month={month}
        onMonthChange={setMonth}
        rows={makeRows(month)}
      />
    );
  },
};

export const FijaConMesActual: Story = {
  name: 'Mes actual',
  render: (args) => {
    const [month, setMonth] = useState(() => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    return (
      <CalendarRoster
        {...args}
        month={month}
        onMonthChange={setMonth}
        rows={makeRows(month)}
      />
    );
  },
};

/**
 * Test: las etiquetas de la leyenda y de la navegación usan el castellano por
 * defecto y se sustituyen cuando el consumidor las pasa traducidas.
 */
export const Etiquetas: Story = {
  name: 'Test — leyenda y navegación',
  tags: ['!dev'],
  render: () => {
    const month = new Date(2026, 0, 1);
    return (
      <>
        <div data-testid="default">
          <CalendarRoster rows={makeRows(month)} month={month} onMonthChange={() => {}} />
        </div>
        <div data-testid="traducido">
          <CalendarRoster
            rows={makeRows(month)}
            month={month}
            onMonthChange={() => {}}
            legendLabel="Legend"
            previousMonthLabel="Previous month"
            nextMonthLabel="Next month"
            legendItems={[
              { type: 'holiday', label: 'Holiday' },
              { type: 'vacation', label: 'Vacation' },
            ]}
          />
        </div>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByLabelText('Mes anterior')).toBeInTheDocument();
    await expect(def.getByLabelText('Leyenda')).toBeInTheDocument();

    const en = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(en.getByLabelText('Previous month')).toBeInTheDocument();
    await expect(en.getByLabelText('Legend')).toBeInTheDocument();

    // la leyenda, acotada a su contenedor (las celdas también muestran estos textos)
    const defLegend = within(
      canvasElement.querySelector('[data-testid="default"] .calendar-roster__legend') as HTMLElement,
    );
    await expect(defLegend.getByText('Vacaciones')).toBeInTheDocument();

    const enLegend = within(
      canvasElement.querySelector('[data-testid="traducido"] .calendar-roster__legend') as HTMLElement,
    );
    await expect(enLegend.getByText('Vacation')).toBeInTheDocument();
    await expect(enLegend.queryByText('Vacaciones')).toBeNull();
  },
};
