import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../../atoms/Tag/Tag';
import { CalendarPlanner, type PlannerEvent } from './CalendarPlanner';

const meta: Meta<typeof CalendarPlanner> = {
  title: 'Molecules/CalendarPlanner',
  component: CalendarPlanner,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    events:        { control: false },
    renderDay:     { control: false },
    month:         { control: false },
    defaultMonth:  { control: false },
    onMonthChange: { control: false },
    onMoreClick:   { control: false },
    navigable:     { control: { type: 'boolean' } },
    maxItemsPerDay:{ control: { type: 'number' } },
    locale:        { control: { type: 'text' } },
    size:          { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  },
  args: {
    navigable: true,
    locale: 'es-ES',
    size: 'md',
    maxItemsPerDay: 3,
  },
};

export default meta;
type Story = StoryObj<typeof CalendarPlanner>;

// Eventos de ejemplo centrados en el mes actual
function makeEvents(): PlannerEvent[] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  return [
    { id: '1',  date: new Date(y, m, 2),  label: 'Reunión equipo',      variant: 'primary' },
    { id: '2',  date: new Date(y, m, 2),  label: 'Revisión diseño',     variant: 'accent-1' },
    { id: '3',  date: new Date(y, m, 5),  label: 'Entrega cliente',     variant: 'danger' },
    { id: '4',  date: new Date(y, m, 7),  label: 'Demo interna',        variant: 'info' },
    { id: '5',  date: new Date(y, m, 7),  label: 'Sprint planning',     variant: 'primary' },
    { id: '6',  date: new Date(y, m, 7),  label: 'Onboarding',          variant: 'success' },
    { id: '7',  date: new Date(y, m, 7),  label: 'Retrospectiva',       variant: 'warning' },
    { id: '8',  date: new Date(y, m, 10), label: 'Vacaciones',          variant: 'accent-2' },
    { id: '9',  date: new Date(y, m, 10), label: 'Fuera de oficina',    variant: 'neutral' },
    { id: '10', date: new Date(y, m, 14), label: 'Publicación web',     variant: 'success' },
    { id: '11', date: new Date(y, m, 17), label: 'Call cliente',        variant: 'primary' },
    { id: '12', date: new Date(y, m, 21), label: 'Revisión contrato',   variant: 'danger' },
    { id: '13', date: new Date(y, m, 21), label: 'Firma propuesta',     variant: 'accent-1' },
    { id: '14', date: new Date(y, m, 25), label: 'Deploy producción',   variant: 'warning' },
    { id: '15', date: new Date(y, m, 28), label: 'Cierre de sprint',    variant: 'info' },
  ];
}

export const Default: Story = {
  render: (args) => <CalendarPlanner {...args} events={makeEvents()} />,
};

export const SinEventos: Story = {
  name: 'Sin eventos',
  render: (args) => <CalendarPlanner {...args} />,
};

export const ConOverflow: Story = {
  name: 'Con overflow (+N más)',
  render: (args) => {
    const [log, setLog] = useState<string>('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <CalendarPlanner
          {...args}
          events={makeEvents()}
          maxItemsPerDay={2}
          onMoreClick={(date, events) =>
            setLog(`${date.toLocaleDateString('es-ES')}: ${events.length} eventos`)
          }
        />
        {log && (
          <p style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            Click en más: {log}
          </p>
        )}
      </div>
    );
  },
};

export const ConRenderDay: Story = {
  name: 'Con renderDay personalizado',
  render: (args) => {
    const events = makeEvents();
    return (
      <CalendarPlanner
        {...args}
        events={events}
        renderDay={(date, dayEvents) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {dayEvents.map((e) => (
              <Tag key={e.id} variant={e.variant}>
                {e.label}
              </Tag>
            ))}
            {dayEvents.length === 0 && date.getDay() === 0 && (
              <Tag variant="neutral">Domingo</Tag>
            )}
          </div>
        )}
      />
    );
  },
};

export const Controlado: Story = {
  name: 'Mes controlado externamente',
  render: (args) => {
    const [month, setMonth] = useState(new Date());
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
          >
            ← Anterior
          </button>
          <button
            type="button"
            onClick={() => setMonth(new Date())}
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
          >
            Siguiente →
          </button>
        </div>
        <CalendarPlanner
          {...args}
          navigable={false}
          month={month}
          onMonthChange={setMonth}
          events={makeEvents()}
        />
      </div>
    );
  },
};

export const Tamanos: Story = {
  name: 'Tamaños (sm / md / lg)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <p style={{ marginBlockEnd: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem' }}>sm</p>
        <CalendarPlanner size="sm" events={makeEvents()} maxItemsPerDay={1} />
      </div>
      <div>
        <p style={{ marginBlockEnd: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem' }}>md</p>
        <CalendarPlanner size="md" events={makeEvents()} />
      </div>
      <div>
        <p style={{ marginBlockEnd: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem' }}>lg</p>
        <CalendarPlanner size="lg" events={makeEvents()} />
      </div>
    </div>
  ),
};
