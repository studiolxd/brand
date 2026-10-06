import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

describe('Modal', () => {
  it('concatena className tras las clases propias del panel, como Sheet', async () => {
    render(
      <BrandMessagesProvider messages={ES}>
        <Modal open onClose={() => {}} title="Detalle" className="detalle-pedido">
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
        <Modal open onClose={() => {}} title="Detalle">
          Contenido
        </Modal>
      </BrandMessagesProvider>,
    );
    const dialog = await screen.findByRole('dialog');
    expect(dialog.className.trim()).toBe('modal__content');
  });
});
