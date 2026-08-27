import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value:          { control: false },
    onChange:       { control: false },
    month:          { control: false },
    onMonthChange:  { control: false },
    defaultMonth:   { control: false },
    disabledDates:  { control: false },
    minDate:        { control: false },
    maxDate:        { control: false },
    gridLabel:      { control: { type: 'text' } },
    navigable:      { control: { type: 'boolean' } },
    locale:         { control: { type: 'text' } },
    size:           { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  },
  args: {
    navigable: true,
    locale: 'es-ES',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return <Calendar {...args} value={value} onChange={setValue} />;
  },
};

export const ConSeleccion: Story = {
  name: 'Con selección inicial',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date());
    return <Calendar {...args} value={value} onChange={setValue} />;
  },
};

export const NoNavegable: Story = {
  name: 'Sin navegación (estático)',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return <Calendar {...args} navigable={false} value={value} onChange={setValue} />;
  },
};

export const Controlado: Story = {
  name: 'Mes controlado externamente',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    const [month, setMonth] = useState(new Date(2025, 0, 1));
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
            onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
          >
            Siguiente →
          </button>
        </div>
        <Calendar
          {...args}
          navigable={false}
          month={month}
          onMonthChange={setMonth}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const ConFechasDeshabilitadas: Story = {
  name: 'Con fechas deshabilitadas',
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20);
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
    ];
    return (
      <Calendar
        {...args}
        value={value}
        onChange={setValue}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
      />
    );
  },
};

export const Tamanos: Story = {
  name: 'Tamaños (sm / md / lg)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
      <Calendar size="sm" />
      <Calendar size="md" />
      <Calendar size="lg" />
    </div>
  ),
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
        <Calendar />
      </div>
      <div data-testid="traducido">
        <Calendar previousMonthLabel="Previous month" nextMonthLabel="Next month" />
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

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date());
    return <Calendar {...args} value={value} onChange={setValue} />;
  },
};

/**
 * Test: la rejilla es una sola parada de tabulador y se recorre con el teclado
 * — flechas de día, Inicio/Fin de semana, RePág/AvPág de mes.
 */
export const Teclado: Story = {
  name: 'Test — teclado de la rejilla',
  tags: ['!dev'],
  render: () => <Calendar defaultMonth={new Date(2025, 0, 1)} value={new Date(2025, 0, 15)} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    const tabbable = within(grid)
      .getAllByRole('gridcell')
      .filter((cell) => cell.getAttribute('tabindex') === '0');

    await expect(tabbable).toHaveLength(1);
    await expect(tabbable[0]).toHaveTextContent('15');

    tabbable[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(document.activeElement).toHaveTextContent('16');

    await userEvent.keyboard('{ArrowDown}');
    await expect(document.activeElement).toHaveTextContent('23');

    await userEvent.keyboard('{Home}');
    await expect(document.activeElement).toHaveTextContent('20');
  },
};
