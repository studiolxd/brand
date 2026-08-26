import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { AsyncSelect } from './AsyncSelect';
import type { AsyncSelectOption } from './AsyncSelect';

const EMPLOYEES: AsyncSelectOption[] = [
  { value: '1', label: 'Ana García' },
  { value: '2', label: 'Carlos López' },
  { value: '3', label: 'María Fernández' },
  { value: '4', label: 'Juan Martínez' },
  { value: '5', label: 'Laura Sánchez' },
  { value: '6', label: 'Pedro Ruiz' },
];

function mockSearch(query: string): Promise<AsyncSelectOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(q ? EMPLOYEES.filter(e => e.label.toLowerCase().includes(q)) : EMPLOYEES.slice(0, 4));
    }, 400),
  );
}

const meta: Meta<typeof AsyncSelect> = {
  title: 'Por revisar/Atoms/AsyncSelect',
  component: AsyncSelect,
  parameters: { layout: 'padded' },
  args: {
    onSearch: mockSearch,
    placeholder: 'Buscar empleado…',
  },
};

export default meta;
type Story = StoryObj<typeof AsyncSelect>;

export const Default: Story = {};

export const WithInitialValue: Story = {
  name: 'With initial value',
  args: {
    value: '1',
    selectedOption: { value: '1', label: 'Ana García' },
  },
};

export const Disabled: Story = {
  args: {
    value: '2',
    selectedOption: { value: '2', label: 'Carlos López' },
    disabled: true,
  },
};

export const SmSize: Story = {
  name: 'Size sm',
  args: { size: 'sm' },
};

export const LgSize: Story = {
  name: 'Size lg',
  args: { size: 'lg' },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<AsyncSelectOption | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AsyncSelect
          onSearch={mockSearch}
          value={value}
          selectedOption={selectedOption}
          placeholder="Buscar empleado…"
          onValueChange={(v, opt) => {
            setValue(v);
            setSelectedOption(opt ?? null);
          }}
        />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Seleccionado: <strong>{selectedOption?.label ?? '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};

const emptySearch = (): Promise<AsyncSelectOption[]> => Promise.resolve([]);

/**
 * Test: el mensaje de "sin resultados" (texto **visible**) usa el castellano por
 * defecto y se sustituye cuando el consumidor lo pasa traducido.
 */
export const MensajeVacio: Story = {
  name: 'Test — mensaje de sin resultados',
  tags: ['!dev'],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12rem' }}>
      <div data-testid="default">
        <AsyncSelect onSearch={emptySearch} placeholder="Buscar…" />
      </div>
      <div data-testid="traducido">
        <AsyncSelect onSearch={emptySearch} placeholder="Search…" emptyMessage="No results" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // el dropdown se monta en un portal en document.body, fuera de canvasElement
    const body = within(document.body);

    await userEvent.type(canvas.getByPlaceholderText('Buscar…'), 'zzz');
    await expect(await body.findByText('Sin resultados')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');

    await userEvent.type(canvas.getByPlaceholderText('Search…'), 'zzz');
    await expect(await body.findByText('No results')).toBeInTheDocument();
    await expect(body.queryByText('Sin resultados')).toBeNull();
  },
};

/**
 * Test: el `aria-label` del botón de limpiar usa el castellano por defecto y se
 * sustituye cuando el consumidor lo pasa traducido.
 */
export const EtiquetaLimpiar: Story = {
  name: 'Test — etiqueta de limpiar selección',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="default">
        <AsyncSelect onSearch={mockSearch} value="1" selectedOption={EMPLOYEES[0]} />
      </div>
      <div data-testid="traducido">
        <AsyncSelect
          onSearch={mockSearch}
          value="1"
          selectedOption={EMPLOYEES[0]}
          clearLabel="Clear selection"
        />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByLabelText('Limpiar selección')).toBeInTheDocument();

    const en = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(en.getByLabelText('Clear selection')).toBeInTheDocument();
    await expect(en.queryByLabelText('Limpiar selección')).toBeNull();
  },
};

/**
 * Test: ciclo de vida del desplegable sobre Base UI — se abre al pulsar el
 * input, se ancla debajo del control con su mismo ancho, selecciona con click y
 * se cierra con Escape y con un click fuera.
 */
export const AperturaYCierre: Story = {
  name: 'Test — apertura, selección y cierre',
  tags: ['!dev'],
  render: () => (
    <div>
      <AsyncSelect onSearch={mockSearch} placeholder="Buscar empleado…" />
      <button type="button">Fuera</button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const input = canvas.getByPlaceholderText('Buscar empleado…');

    await userEvent.click(input);
    const option = await body.findByRole('option', { name: 'Ana García' });

    // el popup se ancla al control: mismo borde izquierdo y al menos su ancho
    const anchor = canvasElement.querySelector('.async-select') as HTMLElement;
    const popup = option.closest('.async-select__content') as HTMLElement;
    const anchorRect = anchor.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    // tolerancia = `collisionPadding` por defecto de Base UI (5px), que puede
    // desplazar el popup cuando el ancla toca el borde del viewport
    await expect(Math.abs(popupRect.left - anchorRect.left)).toBeLessThanOrEqual(5);
    await expect(popupRect.top).toBeGreaterThanOrEqual(anchorRect.bottom - 2);
    await expect(popupRect.width).toBeGreaterThanOrEqual(anchorRect.width - 1);

    // seleccionar cierra el desplegable y muestra la etiqueta
    await userEvent.click(option);
    await waitFor(() => expect(body.queryByRole('option', { name: 'Ana García' })).toBeNull());
    await expect(input).toHaveValue('Ana García');

    // Escape cierra
    await userEvent.click(input);
    await body.findByRole('option', { name: 'Ana García' });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('option', { name: 'Ana García' })).toBeNull());

    // un click fuera cierra
    await userEvent.click(input);
    await body.findByRole('option', { name: 'Ana García' });
    await userEvent.click(canvas.getByRole('button', { name: 'Fuera' }));
    await waitFor(() => expect(body.queryByRole('option', { name: 'Ana García' })).toBeNull());
  },
};

/** Test: el control mide la talla del sistema (32/40/48), como Button y Select. */
export const ContratoTalla: Story = {
  name: 'Test — talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><AsyncSelect size="sm" onSearch={mockSearch} aria-label="sm" /></div>
      <div data-t="md"><AsyncSelect size="md" onSearch={mockSearch} aria-label="md" /></div>
      <div data-t="lg"><AsyncSelect size="lg" onSearch={mockSearch} aria-label="lg" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .async-select')).toBe(32);
    await expect(alto('[data-t="md"] .async-select')).toBe(40);
    await expect(alto('[data-t="lg"] .async-select')).toBe(48);
  },
};
