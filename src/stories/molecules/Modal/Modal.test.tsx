import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { resetWarnings } from '../../constants/env';
import { Modal } from './Modal';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

describe('Modal', () => {
  it('concatena className tras las clases propias del panel, como Sheet', async () => {
    render(
      <BrandMessagesProvider messages={ES}>
        <Modal open onOpenChange={() => {}} title="Detalle" className="detalle-pedido">
          Contenido
        </Modal>
      </BrandMessagesProvider>,
    );
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveClass('modal__content');
    expect(dialog).toHaveClass('detalle-pedido');
  });

  it('sin className, el panel solo lleva su clase', async () => {
    render(
      <BrandMessagesProvider messages={ES}>
        <Modal open onOpenChange={() => {}} title="Detalle">
          Contenido
        </Modal>
      </BrandMessagesProvider>,
    );
    const dialog = await screen.findByRole('dialog');
    expect(dialog.className.trim()).toBe('modal__content');
  });

  it('pide cerrarse con onOpenChange(false) desde el aspa', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <BrandMessagesProvider messages={ES}>
        <Modal open onOpenChange={onOpenChange} title="Detalle">contenido</Modal>
      </BrandMessagesProvider>,
    );
    await user.click(await screen.findByRole('button', { name: ES.modal.close }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('el alias obsoleto onClose sigue cerrando y avisa en desarrollo', async () => {
    resetWarnings();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <BrandMessagesProvider messages={ES}>
        <Modal open onClose={onClose} title="Detalle">contenido</Modal>
      </BrandMessagesProvider>,
    );
    await user.click(await screen.findByRole('button', { name: ES.modal.close }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('`<Modal onClose>` está obsoleta'));
    warn.mockRestore();
  });
});
