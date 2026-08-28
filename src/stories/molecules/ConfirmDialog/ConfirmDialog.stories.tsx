import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Alert, AlertDescription } from '../Alert/Alert';
import { Button } from '../../atoms/Button/Button';
import { ConfirmDialog } from './ConfirmDialog';

const meta = {
  title: 'Molecules/ConfirmDialog',
  component: ConfirmDialog,
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const base = {
  open: true,
  title: '¿Borrar la organización?',
  description: 'Se borrarán también sus proyectos y sus miembros. No se puede deshacer.',
  onConfirm: () => {},
  onCancel: () => {},
};

export const PorDefecto: Story = {
  name: 'Por defecto',
  args: base,
};

/** La acción que no se puede deshacer cambia al lenguaje destructivo. */
export const Destructivo: Story = {
  args: { ...base, destructive: true, confirmLabel: 'Borrar la organización' },
};

/** `children` añade el detalle de lo que se va a perder. */
export const ConDetalle: Story = {
  name: 'Con detalle',
  args: {
    ...base,
    destructive: true,
    confirmLabel: 'Borrar',
    children: (
      <Alert variant="warning">
        <AlertDescription>
          Se borrarán 42 proyectos y 17 miembros perderán el acceso.
        </AlertDescription>
      </Alert>
    ),
  },
};

/**
 * Con una promesa, el diálogo se queda abierto y ocupado hasta que resuelve:
 * no se cierra en falso ni deja pulsar dos veces.
 */
export const ConPromesa: Story = {
  name: 'Con una acción en curso',
  args: base,
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" destructive onClick={() => setOpen(true)}>
          Borrar la organización
        </Button>
        <ConfirmDialog
          {...args}
          open={open}
          destructive
          confirmLabel="Borrar"
          pendingLabel="Borrando…"
          onCancel={() => setOpen(false)}
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setOpen(false);
          }}
        />
      </>
    );
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { ...base, destructive: true, confirmLabel: 'Borrar' },
};

/**
 * Test: el diálogo abre con el foco en «Cancelar» —no en el botón que
 * destruye— y expone su título y su descripción.
 */
export const TestFocoInicial: Story = {
  name: 'Test — foco inicial en cancelar',
  tags: ['!dev'],
  args: { ...base, destructive: true, confirmLabel: 'Borrar' },
  play: async () => {
    const dialog = await screenDialog();
    await expect(dialog).toHaveAccessibleName('¿Borrar la organización?');
    await expect(dialog).toHaveAccessibleDescription(/No se puede deshacer/);
    await waitFor(async () => {
      await expect(within(dialog).getByRole('button', { name: 'Cancelar' })).toHaveFocus();
    });
  },
};

/** Test: confirmar y cancelar avisan a quien corresponde. */
export const TestAcciones: Story = {
  name: 'Test — confirmar y cancelar',
  tags: ['!dev'],
  args: base,
  render: (args) => {
    const [ultimo, setUltimo] = useState('');
    return (
      <>
        <ConfirmDialog
          {...args}
          onConfirm={() => setUltimo('confirmado')}
          onCancel={() => setUltimo('cancelado')}
        />
        <p data-testid="ultimo">{ultimo}</p>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const dialog = await screenDialog();
    await userEvent.click(within(dialog).getByRole('button', { name: 'Confirmar' }));
    await expect(within(canvasElement).getByTestId('ultimo')).toHaveTextContent('confirmado');

    await userEvent.click(within(dialog).getByRole('button', { name: 'Cancelar' }));
    await expect(within(canvasElement).getByTestId('ultimo')).toHaveTextContent('cancelado');
  },
};

/** El diálogo se monta en un portal: se busca en el documento, no en el canvas. */
async function screenDialog(): Promise<HTMLElement> {
  return within(document.body).findByRole('dialog');
}
