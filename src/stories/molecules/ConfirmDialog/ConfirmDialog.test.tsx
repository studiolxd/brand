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

  it('sin las props de acción intermedia el pie sigue teniendo dos botones', () => {
    renderDialog();
    const pie = document.querySelector('.confirm-dialog__actions') as HTMLElement;
    expect(Array.from(pie.querySelectorAll('button')).map((b) => b.textContent)).toEqual([
      'Cancelar',
      'Confirmar',
    ]);
  });

  it('coloca la acción intermedia entre descartar y la principal, y avisa al pulsarla', async () => {
    const onSecondaryAction = vi.fn();
    renderDialog({
      cancelLabel: 'Denegar',
      confirmLabel: 'Permitir',
      secondaryActionLabel: 'Permitir siempre',
      onSecondaryAction,
    });
    const pie = document.querySelector('.confirm-dialog__actions') as HTMLElement;
    expect(Array.from(pie.querySelectorAll('button')).map((b) => b.textContent)).toEqual([
      'Denegar',
      'Permitir siempre',
      'Permitir',
    ]);

    await userEvent.click(screen.getByRole('button', { name: 'Permitir siempre' }));
    expect(onSecondaryAction).toHaveBeenCalledTimes(1);
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

  describe('con frase de confirmación', () => {
    const frase = {
      confirmPhrase: 'acme',
      confirmPhraseLabel: 'Escribe acme para confirmar',
      confirmPhraseMismatch: 'El nombre no coincide.',
    };

    it('nace con el botón apagado y sin acusar nada', () => {
      renderDialog(frase);
      expect(screen.getByRole('button', { name: 'Confirmar' })).toBeDisabled();
      expect(screen.getByLabelText('Escribe acme para confirmar')).toBeInTheDocument();
      expect(screen.queryByText('El nombre no coincide.')).not.toBeInTheDocument();
    });

    it('no acusa mientras se teclea: el error espera a un intento', async () => {
      const user = userEvent.setup();
      renderDialog(frase);
      const campo = screen.getByLabelText('Escribe acme para confirmar');

      await user.type(campo, 'acm');
      expect(screen.queryByText('El nombre no coincide.')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirmar' })).toBeDisabled();

      // Salir del campo con algo escrito y sin coincidir SÍ es un intento.
      await user.tab();
      expect(screen.getByText('El nombre no coincide.')).toBeInTheDocument();
    });

    it('salir del campo en blanco no es un intento fallido', async () => {
      const user = userEvent.setup();
      renderDialog(frase);
      screen.getByLabelText('Escribe acme para confirmar').focus();
      await user.tab();
      expect(screen.queryByText('El nombre no coincide.')).not.toBeInTheDocument();
    });

    it('seguir tecleando retira el error en vez de insistir', async () => {
      const user = userEvent.setup();
      renderDialog(frase);
      const campo = screen.getByLabelText('Escribe acme para confirmar');

      await user.type(campo, 'acm{Enter}');
      expect(screen.getByText('El nombre no coincide.')).toBeInTheDocument();

      await user.type(campo, 'e');
      expect(screen.queryByText('El nombre no coincide.')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirmar' })).toBeEnabled();
    });

    it('con la frase puesta se confirma con el botón y con Intro', async () => {
      const user = userEvent.setup();
      const { onConfirm } = renderDialog(frase);
      const campo = screen.getByLabelText('Escribe acme para confirmar');

      await user.type(campo, 'acme');
      await user.click(screen.getByRole('button', { name: 'Confirmar' }));
      expect(onConfirm).toHaveBeenCalledTimes(1);

      await user.type(campo, '{Enter}');
      expect(onConfirm).toHaveBeenCalledTimes(2);
    });

    it('perdona los espacios de los extremos, pero no la caja ni los acentos', async () => {
      const user = userEvent.setup();
      const { onConfirm } = renderDialog(frase);
      const campo = screen.getByLabelText('Escribe acme para confirmar');

      await user.type(campo, '  acme  ');
      expect(screen.getByRole('button', { name: 'Confirmar' })).toBeEnabled();

      await user.clear(campo);
      await user.type(campo, 'ACME');
      expect(screen.getByRole('button', { name: 'Confirmar' })).toBeDisabled();
      expect(onConfirm).not.toHaveBeenCalled();
    });

    it('el foco entra en el campo, que no es la acción que destruye', async () => {
      renderDialog(frase);
      await waitFor(() =>
        expect(screen.getByLabelText('Escribe acme para confirmar')).toHaveFocus(),
      );
    });

    it('sin `confirmPhrase` no hay campo ni barrera', () => {
      renderDialog();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirmar' })).toBeEnabled();
    });
  });

  it('no monta nada cuando está cerrado', () => {
    renderDialog({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
