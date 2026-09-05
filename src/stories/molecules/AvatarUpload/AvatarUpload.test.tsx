import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AvatarUpload } from './AvatarUpload';

/**
 * Contrato del AvatarUpload. Lo que se fija aquí es lo que no se ve en una
 * story: que las piezas son las del sistema, que el error dice qué SÍ se
 * acepta, que la descripción accesible sobrevive a no pintarse y que el
 * archivo llega igual por el botón que soltándolo.
 */
describe('AvatarUpload', () => {
  const base = { name: 'Ana García', onChange: vi.fn() };
  const png = () => new File([new Uint8Array(8)], 'retrato.png', { type: 'image/png' });
  const dataTransfer = (files: File[]) => ({ files, types: ['Files'], dropEffect: 'none' });

  afterEach(() => vi.restoreAllMocks());

  it('las piezas son las del sistema: Avatar, Button e Icon', () => {
    const { container } = render(<AvatarUpload {...base} />);
    expect(container.querySelector('.avatar')).toBeInTheDocument();
    expect(container.querySelector('.button')).toBeInTheDocument();
    expect(container.querySelectorAll('svg:not(.icon)')).toHaveLength(0);
  });

  it('el botón es la única parada de teclado: el input real está fuera del tabulador', async () => {
    const { container } = render(<AvatarUpload {...base} />);
    const input = container.querySelector<HTMLInputElement>('.avatar-upload__input')!;
    expect(input.tabIndex).toBe(-1);

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Subir' })).toHaveFocus();
  });

  it('el botón dispara el input oculto', async () => {
    const { container } = render(<AvatarUpload {...base} />);
    const input = container.querySelector<HTMLInputElement>('.avatar-upload__input')!;
    const click = vi.fn();
    input.addEventListener('click', click);

    await userEvent.click(screen.getByRole('button', { name: 'Subir' }));
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('separa el texto visible del nombre accesible', () => {
    render(<AvatarUpload {...base} buttonLabel="Subir" buttonAccessibleLabel="Subir logo" />);
    const boton = screen.getByRole('button', { name: 'Subir logo' });
    expect(boton).toHaveTextContent('Subir');
  });

  it('avisa en desarrollo si el nombre accesible no contiene el texto visible (WCAG 2.5.3)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<AvatarUpload {...base} buttonLabel="Subir" buttonAccessibleLabel="Cargar imagen" />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('2.5.3'));

    warn.mockClear();
    render(<AvatarUpload {...base} buttonLabel="Subir" buttonAccessibleLabel="Subir logo" />);
    expect(warn).not.toHaveBeenCalled();
  });

  it('lo aceptado no se pinta, pero describe el botón', () => {
    render(<AvatarUpload {...base} maxSize={5 * 1024 * 1024} />);
    const boton = screen.getByRole('button', { name: 'Subir' });
    expect(boton).toHaveAccessibleDescription('JPEG, PNG, WEBP · máx. 5.0 MB');
    // No se ve: es texto para el lector, no una pista en pantalla.
    expect(screen.getByText('JPEG, PNG, WEBP · máx. 5.0 MB')).toHaveClass('visually-hidden');
  });

  it('el error de formato dice qué SÍ se acepta', () => {
    const onError = vi.fn();
    const { container } = render(<AvatarUpload {...base} onError={onError} />);
    fireEvent.drop(container.querySelector('.avatar-upload__target')!, {
      dataTransfer: dataTransfer([new File(['x'], 'contrato.pdf', { type: 'application/pdf' })]),
    });

    const mensaje = 'Formato no admitido. Se aceptan JPEG, PNG, WEBP.';
    expect(screen.getByRole('alert')).toHaveTextContent(mensaje);
    expect(onError).toHaveBeenCalledWith(mensaje);
  });

  it('el error de peso dice el máximo', () => {
    const { container } = render(<AvatarUpload {...base} maxSize={1024} />);
    fireEvent.drop(container.querySelector('.avatar-upload__target')!, {
      dataTransfer: dataTransfer([new File([new Uint8Array(4096)], 'grande.png', { type: 'image/png' })]),
    });
    expect(screen.getByRole('alert')).toHaveTextContent('El archivo pesa demasiado. El máximo es 1.0 KB.');
  });

  it('un archivo válido soltado sobre el avatar abre el recorte', () => {
    const onSelect = vi.fn();
    const { container } = render(<AvatarUpload {...base} onSelect={onSelect} />);
    fireEvent.drop(container.querySelector('.avatar-upload__target')!, {
      dataTransfer: dataTransfer([png()]),
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog', { name: 'Recorta la imagen' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('un arrastre en la ventana anuncia la diana y lo dice en voz alta', () => {
    const { container } = render(<AvatarUpload {...base} />);
    expect(screen.getByRole('status')).toHaveTextContent('');

    fireEvent.dragEnter(window, { dataTransfer: { types: ['Files'] } });
    expect(container.querySelector('.avatar-upload')).toHaveClass('avatar-upload--armed');
    expect(screen.getByRole('status')).toHaveTextContent('Suelta la imagen sobre el avatar para subirla');

    fireEvent.dragLeave(window, { dataTransfer: { types: ['Files'] } });
    expect(container.querySelector('.avatar-upload')).not.toHaveClass('avatar-upload--armed');
  });

  it('un arrastre que no lleva archivos (texto seleccionado) no anuncia nada', () => {
    const { container } = render(<AvatarUpload {...base} />);
    fireEvent.dragEnter(window, { dataTransfer: { types: ['text/plain'] } });
    expect(container.querySelector('.avatar-upload')).not.toHaveClass('avatar-upload--armed');
  });

  it('la forma decide el recorte: cuadrado para organizaciones', () => {
    const { container } = render(<AvatarUpload {...base} shape="square" />);
    expect(container.querySelector('.avatar')).toHaveClass('avatar--square');
    expect(container.querySelector('.avatar-upload')).toHaveClass('avatar-upload--square');
  });

  it('con busy no acepta nada: ni el botón ni la diana', () => {
    const onSelect = vi.fn();
    const { container } = render(<AvatarUpload {...base} busy onSelect={onSelect} />);
    expect(screen.getByRole('button', { name: 'Subir' })).toBeDisabled();

    fireEvent.drop(container.querySelector('.avatar-upload__target')!, {
      dataTransfer: dataTransfer([png()]),
    });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('el error del consumidor se enseña como el de la validación', () => {
    render(<AvatarUpload {...base} errorMessage="No hemos podido guardar la imagen." />);
    expect(screen.getByRole('alert')).toHaveTextContent('No hemos podido guardar la imagen.');
  });

  it('acumula className sin perder la clase base', () => {
    const { container } = render(<AvatarUpload {...base} className="ajuste" />);
    expect(container.querySelector('.avatar-upload.ajuste')).toBeInTheDocument();
  });
});
