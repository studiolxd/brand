import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    title: 'Recortar imagen',
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
    const dialog = screen.getByRole('dialog', { name: 'Recortar imagen' });
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

  it('reserva el hueco y enseña la señal de carga mientras la imagen no ha cargado', () => {
    const { baseElement } = render(
      <ImageCropDialog {...baseProps} sourceUrl="blob:fake" loadingLabel="Cargando imagen…" />,
    );
    // jsdom no dispara el load del `<img>`: es el mismo estado que el primer
    // render de verdad, con el hueco ya montado.
    expect(baseElement.querySelector('.image-crop-dialog__area')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Cargando imagen…' })).toBeInTheDocument();
  });

  it('cargada la imagen, la señal desaparece', () => {
    const { baseElement } = render(<ImageCropDialog {...baseProps} sourceUrl="blob:fake" />);
    const img = baseElement.querySelector('.image-crop-dialog__area img');
    expect(img).not.toBeNull();
    fireEvent.load(img!);
    expect(screen.queryByRole('status', { name: 'Cargando imagen…' })).not.toBeInTheDocument();
  });

  it('si la imagen falla, el mensaje de error ocupa el mismo hueco', () => {
    const { baseElement } = render(
      <ImageCropDialog {...baseProps} sourceUrl="blob:rota" errorMessage="No hemos podido cargar la imagen." />,
    );
    fireEvent.error(baseElement.querySelector('.image-crop-dialog__area img')!);
    expect(screen.getByRole('alert')).toHaveTextContent('No hemos podido cargar la imagen.');
    expect(screen.queryByRole('status', { name: 'Cargando imagen…' })).not.toBeInTheDocument();
    // Sin imagen no hay nada que recortar: la fotografía rota no se enseña.
    expect(baseElement.querySelector('.image-crop-dialog__area img')).toBeNull();
  });

  it('otra imagen vuelve a empezar por la carga', () => {
    const { baseElement, rerender } = render(<ImageCropDialog {...baseProps} sourceUrl="blob:una" />);
    fireEvent.load(baseElement.querySelector('.image-crop-dialog__area img')!);
    expect(screen.queryByRole('status', { name: 'Cargando imagen…' })).not.toBeInTheDocument();
    rerender(<ImageCropDialog {...baseProps} sourceUrl="blob:otra" />);
    expect(screen.getByRole('status', { name: 'Cargando imagen…' })).toBeInTheDocument();
  });

  it('deshabilita ambas acciones mientras está ocupado', () => {
    render(<ImageCropDialog {...baseProps} sourceUrl="blob:fake" busy />);
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeDisabled();
  });
});
