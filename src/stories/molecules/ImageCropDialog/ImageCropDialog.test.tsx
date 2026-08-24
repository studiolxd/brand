import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageCropDialog } from './ImageCropDialog';

/**
 * Contrato del ImageCropDialog — modal de "elige una región" sobre el object
 * URL de una imagen. jsdom nunca dispara el evento load del `<img>`, así que
 * aquí la selección se queda vacía; el camino "confirmar produce un blob" lo
 * cubre la suite E2E de las apps. Estos fijan la superficie: apertura y
 * cierre, etiquetas y estado ocupado.
 */
describe('ImageCropDialog', () => {
  const baseProps = {
    title: 'Recorta tu avatar',
    description: 'Arrastra para ajustar',
    outputMimeType: 'image/jpeg' as const,
    cancelLabel: 'Cancelar',
    confirmLabel: 'Guardar',
    onConfirm: vi.fn(),
    onClose: vi.fn(),
  };

  it('permanece cerrado mientras sourceUrl es null', () => {
    render(<ImageCropDialog {...baseProps} sourceUrl={null} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('abre con el título y la descripción accesibles al recibir una fuente', () => {
    render(<ImageCropDialog {...baseProps} sourceUrl="blob:fake" />);
    const dialog = screen.getByRole('dialog', { name: 'Recorta tu avatar' });
    expect(dialog).toHaveAccessibleDescription('Arrastra para ajustar');
  });

  it('emite sus clases BEM en los nodos que posee', () => {
    const { baseElement } = render(
      <ImageCropDialog {...baseProps} sourceUrl="blob:fake" />,
    );
    expect(baseElement.querySelector('.image-crop-dialog')).toBeInTheDocument();
    expect(baseElement.querySelector('.image-crop-dialog__area')).toBeInTheDocument();
    // Componer un widget no debe eclipsar la superficie del Modal.
    expect(baseElement.querySelector('.modal__content')).toBeInTheDocument();
  });

  it('acumula className sin perder la clase base', () => {
    const { baseElement } = render(
      <ImageCropDialog {...baseProps} sourceUrl="blob:fake" className="avatar-crop" />,
    );
    expect(baseElement.querySelector('.image-crop-dialog.avatar-crop')).toBeInTheDocument();
  });

  it('llama a onClose desde el botón de cancelar', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ImageCropDialog {...baseProps} sourceUrl="blob:fake" onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('mantiene confirmar deshabilitado hasta que hay selección', () => {
    render(<ImageCropDialog {...baseProps} sourceUrl="blob:fake" />);
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeDisabled();
  });

  it('deshabilita ambas acciones mientras está ocupado', () => {
    render(<ImageCropDialog {...baseProps} sourceUrl="blob:fake" busy />);
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeDisabled();
  });
});
