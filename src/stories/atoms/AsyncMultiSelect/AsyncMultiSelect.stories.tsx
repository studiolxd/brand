import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { AsyncMultiSelect } from './AsyncMultiSelect';
import type { AsyncMultiSelectOption } from './AsyncMultiSelect';

const EMPLOYEES: AsyncMultiSelectOption[] = [
  { value: '1', label: 'Ana García' },
  { value: '2', label: 'Carlos López' },
  { value: '3', label: 'María Fernández' },
  { value: '4', label: 'Juan Martínez' },
  { value: '5', label: 'Laura Sánchez' },
  { value: '6', label: 'Pedro Ruiz' },
];

function mockSearch(query: string): Promise<AsyncMultiSelectOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(q ? EMPLOYEES.filter(e => e.label.toLowerCase().includes(q)) : EMPLOYEES.slice(0, 4));
    }, 400),
  );
}

const meta: Meta<typeof AsyncMultiSelect> = {
  title: 'Por revisar/Atoms/AsyncMultiSelect',
  component: AsyncMultiSelect,
  parameters: { layout: 'padded' },
  args: {
    onSearch: mockSearch,
    placeholder: 'Buscar empleados…',
  },
};

export default meta;
type Story = StoryObj<typeof AsyncMultiSelect>;

export const Default: Story = {};

export const WithInitialValues: Story = {
  name: 'With initial values',
  args: {
    value: ['1', '3'],
    selectedOptions: [
      { value: '1', label: 'Ana García' },
      { value: '3', label: 'María Fernández' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    value: ['2'],
    selectedOptions: [{ value: '2', label: 'Carlos López' }],
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
    const [values, setValues] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<AsyncMultiSelectOption[]>([]);

    function handleValueChange(next: string[]) {
      setValues(next);
      setSelectedOptions(prev => {
        const added = next
          .filter(v => !prev.some(o => o.value === v))
          .map(v => EMPLOYEES.find(e => e.value === v)!)
          .filter(Boolean);
        return [...prev.filter(o => next.includes(o.value)), ...added];
      });
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AsyncMultiSelect
          onSearch={mockSearch}
          value={values}
          selectedOptions={selectedOptions}
          placeholder="Buscar empleados…"
          onValueChange={handleValueChange}
        />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Seleccionados: <strong>{selectedOptions.length ? selectedOptions.map(o => o.label).join(', ') : '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};

const emptySearchMulti = (): Promise<AsyncMultiSelectOption[]> => Promise.resolve([]);

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
        <AsyncMultiSelect onSearch={emptySearchMulti} placeholder="Buscar…" />
      </div>
      <div data-testid="traducido">
        <AsyncMultiSelect
          onSearch={emptySearchMulti}
          placeholder="Search…"
          emptyMessage="No results"
        />
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
 * Test: ciclo de vida del desplegable sobre Base UI — se abre al pulsar el
 * input, se ancla debajo del control, permite marcar varias opciones sin
 * cerrarse y se cierra con Escape y con un click fuera.
 */
export const AperturaYCierre: Story = {
  name: 'Test — apertura, selección múltiple y cierre',
  tags: ['!dev'],
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div>
        <AsyncMultiSelect
          onSearch={mockSearch}
          value={values}
          selectedOptions={EMPLOYEES.filter(e => values.includes(e.value))}
          placeholder="Buscar empleados…"
          onValueChange={setValues}
        />
        <button type="button">Fuera</button>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const input = canvas.getByPlaceholderText('Buscar empleados…');

    await userEvent.click(input);
    const first = await body.findByRole('option', { name: 'Ana García' });

    const anchor = canvasElement.querySelector('.async-multi-select') as HTMLElement;
    const popup = first.closest('.async-multi-select__content') as HTMLElement;
    const anchorRect = anchor.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    // tolerancia = `collisionPadding` por defecto de Base UI (5px), que puede
    // desplazar el popup cuando el ancla toca el borde del viewport
    await expect(Math.abs(popupRect.left - anchorRect.left)).toBeLessThanOrEqual(5);
    await expect(popupRect.top).toBeGreaterThanOrEqual(anchorRect.bottom - 2);
    await expect(popupRect.width).toBeGreaterThanOrEqual(anchorRect.width - 1);

    // marcar dos opciones no cierra el desplegable
    await userEvent.click(first);
    await userEvent.click(await body.findByRole('option', { name: 'Carlos López' }));
    await expect(await body.findByRole('option', { name: 'Ana García' })).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByText('Carlos López')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('option', { name: 'Ana García' })).toBeNull());

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
      <div data-t="sm"><AsyncMultiSelect size="sm" onSearch={mockSearch} aria-label="sm" /></div>
      <div data-t="md"><AsyncMultiSelect size="md" onSearch={mockSearch} aria-label="md" /></div>
      <div data-t="lg"><AsyncMultiSelect size="lg" onSearch={mockSearch} aria-label="lg" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    // sin pills, el trigger mide exactamente la talla; con varias líneas de pills crece
    await expect(alto('[data-t="sm"] .async-multi-select')).toBe(32);
    await expect(alto('[data-t="md"] .async-multi-select')).toBe(40);
    await expect(alto('[data-t="lg"] .async-multi-select')).toBe(48);
  },
};
