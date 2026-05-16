import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button/Button';
import { InputField } from '../InputField/InputField';

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
  name: 'Dark',
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
