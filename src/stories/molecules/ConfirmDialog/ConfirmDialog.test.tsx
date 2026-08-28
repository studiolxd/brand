import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from './ConfirmDialog';

function renderDialog(props: Partial<React.ComponentProps<typeof ConfirmDialog>> = {}) {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  const utils = render(
    <ConfirmDialog
      open
      title="¿Borrar la organización?"
      description="Se borrarán sus proyectos y sus miembros. No se puede deshacer."
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...props}
    />,
  );
  return { ...utils, onConfirm, onCancel };
}

describe('ConfirmDialog', () => {
  it('monta un diálogo con su título y su descripción enlazada', () => {
    renderDialog();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('¿Borrar la organización?');
    expect(dialog).toHaveAccessibleDescription(/No se puede deshacer/);
  });

  it('arranca con el foco en cancelar, no en el botón que destruye', async () => {
    renderDialog({ destructive: true });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveFocus(),
    );
  });

  it('confirma al pulsar el botón de confirmar', async () => {
    const { onConfirm } = renderDialog();
    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('cancela al pulsar cancelar', async () => {
    const { onCancel } = renderDialog();
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('cancela al pulsar Escape', async () => {
    const { onCancel } = renderDialog();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(onCancel).toHaveBeenCalled());
  });

  it('usa el lenguaje destructivo en el botón de confirmar cuando toca', () => {
    renderDialog({ destructive: true, confirmLabel: 'Borrar' });
    const confirmar = screen.getByRole('button', { name: 'Borrar' });
    expect(confirmar).toHaveClass('button--destructive-intent');
    expect(confirmar).toHaveClass('button--outline');
  });

  it('se queda ocupado mientras la confirmación es una promesa', async () => {
    let resolve!: () => void;
    const onConfirm = vi.fn(() => new Promise<void>((r) => { resolve = r; }));
    renderDialog({ onConfirm, pendingLabel: 'Borrando…' });

    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    const confirmar = await screen.findByRole('button', { name: 'Borrando…' });
    expect(confirmar).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled();

    resolve();
    await waitFor(() => expect(screen.getByRole('button', { name: 'Confirmar' })).toBeEnabled());
  });

  it('no deja confirmar dos veces mientras está en curso', async () => {
    const onConfirm = vi.fn(() => new Promise<void>(() => {}));
    renderDialog({ onConfirm });

    const confirmar = screen.getByRole('button', { name: 'Confirmar' });
    await userEvent.click(confirmar);
    await userEvent.click(confirmar);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('sigue abierto cuando la confirmación falla y avisa por onConfirmError', async () => {
    const error = new Error('boom');
    const onConfirm = vi.fn(() => Promise.reject(error));
    const onConfirmError = vi.fn();
    const { onCancel } = renderDialog({ onConfirm, onConfirmError });

    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Confirmar' })).toBeEnabled());
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(onCancel).not.toHaveBeenCalled();
    expect(onConfirmError).toHaveBeenCalledWith(error);
  });

  it('acepta textos propios y contenido extra', () => {
    renderDialog({
      confirmLabel: 'Delete',
      cancelLabel: 'Keep',
      children: <p>Se borrarán 42 proyectos.</p>,
    });
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument();
    expect(screen.getByText('Se borrarán 42 proyectos.')).toBeInTheDocument();
  });

  it('no monta nada cuando está cerrado', () => {
    renderDialog({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
