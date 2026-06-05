import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarRoster, type RosterRow } from './CalendarRoster';

const meta: Meta<typeof CalendarRoster> = {
  title: 'Molecules/CalendarRoster',
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
