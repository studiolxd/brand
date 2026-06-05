import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button/Button';
import { InputField } from '../InputField/InputField';
import { AsyncSelectField } from '../AsyncSelectField/AsyncSelectField';
import type { AsyncSelectOption } from '../AsyncSelectField/AsyncSelectField';
import { AsyncMultiSelectField } from '../AsyncMultiSelectField/AsyncMultiSelectField';
import type { AsyncMultiSelectOption } from '../AsyncMultiSelectField/AsyncMultiSelectField';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const WithForm: Story = {
  name: 'Formulario',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Solicitar ausencia">
          <form
            onSubmit={(e) => { e.preventDefault(); setOpen(false); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <InputField id="motivo" label="Motivo" placeholder="Indica el motivo" />
            <InputField id="fecha-inicio" label="Fecha de inicio" placeholder="dd/mm/aaaa" />
            <InputField id="fecha-fin" label="Fecha de fin" placeholder="dd/mm/aaaa" />
            <Button type="submit">Guardar</Button>
          </form>
        </Modal>
      </>
    );
  },
};

export const Confirm: Story = {
  name: 'Confirmación destructiva',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Cancelar ausencia</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Cancelar ausencia">
          <p style={{ margin: '0 0 1.5rem', color: 'var(--color-text-on-light)' }}>
            ¿Seguro que quieres cancelar esta ausencia? Esta acción no se puede deshacer.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setOpen(false)}>No, volver</Button>
            <Button destructive onClick={() => setOpen(false)}>Sí, cancelar</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const Dark: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal dark</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Solicitar ausencia" dark>
          <form
            onSubmit={(e) => { e.preventDefault(); setOpen(false); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <InputField id="motivo-dark" label="Motivo" placeholder="Indica el motivo" />
            <Button type="submit">Guardar</Button>
          </form>
        </Modal>
      </>
    );
  },
};

const EMPLOYEES: AsyncSelectOption[] = [
  { value: '1', label: 'Ana García' },
  { value: '2', label: 'Carlos López' },
  { value: '3', label: 'María Fernández' },
  { value: '4', label: 'Juan Martínez' },
  { value: '5', label: 'Laura Sánchez' },
];

function mockSearch(query: string): Promise<AsyncSelectOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(q ? EMPLOYEES.filter(e => e.label.toLowerCase().includes(q)) : EMPLOYEES);
    }, 400),
  );
}

export const WithAsyncSelect: Story = {
  name: 'Con AsyncSelect',
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<AsyncSelectOption | null>(null);
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [selectedMulti, setSelectedMulti] = useState<AsyncMultiSelectOption[]>([]);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal con AsyncSelect</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Asignar empleados">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AsyncSelectField
              id="modal-employee"
              label="Empleado responsable"
              onSearch={mockSearch}
              placeholder="Buscar empleado…"
              value={value}
              selectedOption={selectedOption}
              onValueChange={(v, opt) => { setValue(v); setSelectedOption(opt); }}
            />
            <AsyncMultiSelectField
              id="modal-employees"
              label="Equipo"
              onSearch={q => mockSearch(q) as Promise<AsyncMultiSelectOption[]>}
              placeholder="Buscar empleados…"
              value={multiValue}
              selectedOptions={selectedMulti}
              onValueChange={(vals) => {
                setMultiValue(vals);
                setSelectedMulti(EMPLOYEES.filter(e => vals.includes(e.value)));
              }}
            />
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-on-light)' }}>
              Responsable: <strong>{selectedOption?.label ?? '(ninguno)'}</strong>
              {' · '}
              Equipo: <strong>{selectedMulti.map(e => e.label).join(', ') || '(ninguno)'}</strong>
            </p>
            <Button onClick={() => setOpen(false)}>Guardar</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithLongContent: Story = {
  name: 'Contenido largo (scroll)',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal con contenido largo</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Listado de empleados">
          <ul style={{ margin: '0 0 1.5rem', padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <li key={i} style={{ color: 'var(--color-text-on-light)' }}>
                Empleado {i + 1} — ejemplo de fila con contenido
              </li>
            ))}
          </ul>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </Modal>
      </>
    );
  },
};

export const NoTitle: Story = {
  name: 'Sin título',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Abrir modal sin título</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <p style={{ margin: 0, color: 'var(--color-text-on-light)' }}>
            Este modal no tiene título. Solo se muestra el botón de cierre.
            El nombre accesible lo provee un elemento visualmente oculto.
          </p>
        </Modal>
      </>
    );
  },
};
