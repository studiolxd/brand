import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Tag } from '../../atoms/Tag/Tag';
import { CalendarPlanner, type PlannerEvent } from './CalendarPlanner';
import { STORY_TODAY } from '../../utils/storyDate';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

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
    onDayClick:    { control: false },
    gridLabel:     { control: { type: 'text' } },
    navigable:     { control: { type: 'boolean' } },
    maxItemsPerDay:{ control: { type: 'number' } },
    locale:        { control: { type: 'text' } },
    size:          { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    view:          { control: { type: 'inline-radio' }, options: ['month', 'week'] },
    defaultView:   { control: false },
    onViewChange:  { control: false },
    week:          { control: false },
    defaultWeek:   { control: false },
    onWeekChange:  { control: false },
    viewSwitcher:  { control: { type: 'boolean' } },
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

// Eventos de ejemplo centrados en el mes de STORY_TODAY
function makeEvents(): PlannerEvent[] {
  const y = STORY_TODAY.getFullYear();
  const m = STORY_TODAY.getMonth();

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
    const [month, setMonth] = useState(STORY_TODAY);
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
            onClick={() => setMonth(STORY_TODAY)}
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

/** La semana de `STORY_TODAY`, con horas: es lo que la vista de semana enseña. */
function makeWeekEvents(): PlannerEvent[] {
  const y = STORY_TODAY.getFullYear();
  const m = STORY_TODAY.getMonth();
  const lunes = STORY_TODAY.getDate() - ((STORY_TODAY.getDay() + 6) % 7);
  const dia = (offset: number, hora = 0, minuto = 0) => new Date(y, m, lunes + offset, hora, minuto);

  return [
    { id: 'w1', date: dia(0, 9, 0),   label: 'Daily',            variant: 'primary' },
    { id: 'w2', date: dia(0, 12, 30), label: 'Comida con Marta', variant: 'neutral' },
    { id: 'w3', date: dia(1),         label: 'Festivo local',    variant: 'accent-2', allDay: true },
    { id: 'w4', date: dia(1, 16, 0),  label: 'Revisión diseño',  variant: 'accent-1' },
    { id: 'w5', date: dia(2, 9, 0),   label: 'Daily',            variant: 'primary' },
    { id: 'w6', date: dia(2, 11, 0),  label: 'Entrevista',       variant: 'info' },
    { id: 'w7', date: dia(3, 9, 0),   label: 'Daily',            variant: 'primary' },
    { id: 'w8', date: dia(3, 17, 30), label: 'Retrospectiva',    variant: 'warning' },
    { id: 'w9', date: dia(4, 10, 0),  label: 'Deploy',           variant: 'success' },
    { id: 'w10', date: dia(6),        label: 'Guardia',          variant: 'danger', allDay: true },
  ];
}

/**
 * La semana: siete columnas con el día completo, la hora delante de cada
 * evento que la tenga y los de día entero arriba. La columna **no trunca** —no
 * hay «+N más»—: tiene alto de sobra y lo que se viene a leer es justo eso.
 */
export const Semana: Story = {
  name: 'Vista de semana',
  args: { view: 'week' },
  render: (args) => <CalendarPlanner {...args} events={makeWeekEvents()} />,
};

/**
 * Con `viewSwitcher` la cabecera gana el conmutador mes/semana. La vista puede
 * ir controlada (`view` + `onViewChange`) o dejarse al componente
 * (`defaultView`); aquí la lleva el componente.
 */
export const ConConmutador: Story = {
  name: 'Conmutador mes / semana',
  args: { viewSwitcher: true },
  render: (args) => <CalendarPlanner {...args} events={[...makeEvents(), ...makeWeekEvents()]} />,
};

/**
 * Test: la semana pinta siete columnas fechadas, el evento con hora la enseña
 * delante y el de día entero va primero — el orden con que se lee una columna.
 */
export const ContratoSemana: Story = {
  name: 'Test — la semana enseña el día completo con su hora',
  tags: ['!dev'],
  args: { view: 'week' },
  render: (args) => <CalendarPlanner {...args} events={makeWeekEvents()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const columnas = canvas.getAllByRole('columnheader');
    await expect(columnas).toHaveLength(7);

    const celdas = canvas.getAllByRole('gridcell');
    await expect(celdas).toHaveLength(7);

    // El martes: el festivo de día entero arriba y sin hora, la revisión con la suya.
    const renglones = Array.from(
      celdas[1].querySelectorAll('.calendar-planner__event'),
    ) as HTMLElement[];
    await expect(renglones).toHaveLength(2);
    await expect(renglones[0]).toHaveTextContent('Festivo local');
    await expect(renglones[0].querySelector('.calendar-planner__event-time')).toBeNull();
    await expect(renglones[1].querySelector('.calendar-planner__event-time')).not.toBeNull();

    // La hora va delante del evento, en la misma línea.
    const hora = renglones[1].querySelector('.calendar-planner__event-time') as HTMLElement;
    const tag = renglones[1].querySelector('.tag') as HTMLElement;
    await waitFor(async () => {
      await expect(hora.getBoundingClientRect().right)
        .toBeLessThanOrEqual(tag.getBoundingClientRect().left + 1);
    });
  },
};

/**
 * Test: el conmutador cambia de vista y la navegación pasa a ser de semana.
 */
export const ContratoConmutador: Story = {
  name: 'Test — el conmutador cambia de vista',
  tags: ['!dev'],
  args: { viewSwitcher: true },
  render: (args) => <CalendarPlanner {...args} events={makeWeekEvents()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Arranca en el mes: la parrilla trae más de una fila de celdas.
    await expect(canvas.getAllByRole('gridcell').length).toBeGreaterThan(7);

    await userEvent.click(canvas.getByRole('button', { name: 'Semana' }));
    await waitFor(async () => {
      await expect(canvas.getAllByRole('gridcell')).toHaveLength(7);
    });

    // Y las flechas ya son de semana.
    await expect(canvas.getByRole('button', { name: 'Semana siguiente' })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Mes' }));
    await waitFor(async () => {
      await expect(canvas.getAllByRole('gridcell').length).toBeGreaterThan(7);
    });
  },
};

/**
 * Test: los `aria-label` de navegación de mes usan el castellano por defecto y se
 * sustituyen cuando el consumidor los pasa traducidos.
 */
export const Etiquetas: Story = {
  name: 'Test — etiquetas de navegación',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="default">
        <CalendarPlanner events={makeEvents()} />
      </div>
      <div data-testid="traducido">
        <CalendarPlanner
          events={makeEvents()}
          previousMonthLabel="Previous month"
          nextMonthLabel="Next month"
        />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByLabelText('Mes anterior')).toBeInTheDocument();
    await expect(def.getByLabelText('Mes siguiente')).toBeInTheDocument();

    const en = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(en.getByLabelText('Previous month')).toBeInTheDocument();
    await expect(en.getByLabelText('Next month')).toBeInTheDocument();
    await expect(en.queryByLabelText('Mes anterior')).toBeNull();
  },
};

/**
 * Test: con `onDayClick` la parrilla es una rejilla operable con teclado —
 * una sola parada de tabulador y flechas para moverse entre días.
 */
export const TecladoDeCeldas: Story = {
  name: 'Test — teclado de las celdas',
  tags: ['!dev'],
  render: () => (
    <CalendarPlanner
      defaultMonth={new Date(2025, 0, 1)}
      events={[]}
      onDayClick={() => {}}
    />
  ),
  play: async ({ canvasElement }) => {
    const grid = within(canvasElement).getByRole('grid');
    const tabbable = within(grid)
      .getAllByRole('gridcell')
      .filter((cell) => cell.getAttribute('tabindex') === '0');

    await expect(tabbable).toHaveLength(1);

    tabbable[0].focus();
    const inicial = document.activeElement?.textContent;
    await userEvent.keyboard('{ArrowRight}');
    await expect(document.activeElement?.textContent).not.toBe(inicial);
    await expect(document.activeElement).toHaveAttribute('role', 'gridcell');
  },
};

/**
 * El botón de desbordamiento —«+3 más»— sale de `calendarPlanner.more`, y las
 * dos flechas de mes de `calendar.previousMonth` / `.nextMonth`. `gridLabel`
 * queda fuera: nombra a ESTE planificador.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <CalendarPlanner
        month={new Date(2026, 0, 1)}
        locale="en-GB"
        maxItemsPerDay={1}
        events={[
          { id: 'a', date: new Date(2026, 0, 14), label: 'Kick-off' },
          { id: 'b', date: new Date(2026, 0, 14), label: 'Review' },
          { id: 'c', date: new Date(2026, 0, 14), label: 'Retro' },
        ]}
      />
    </BrandMessagesProvider>
  ),
};

/** Test: el botón de desbordamiento sale del catálogo. */
export const ContratoProveedor: Story = {
  name: 'Test — el desbordamiento lee su rótulo del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <CalendarPlanner
        month={new Date(2026, 0, 1)}
        locale="en-GB"
        maxItemsPerDay={1}
        events={[
          { id: 'a', date: new Date(2026, 0, 14), label: 'Kick-off' },
          { id: 'b', date: new Date(2026, 0, 14), label: 'Review' },
          { id: 'c', date: new Date(2026, 0, 14), label: 'Retro' },
        ]}
      />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('+2 more')).toBeInTheDocument();
  },
};
