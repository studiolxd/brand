import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyButton } from './CopyButton';

function mockClipboard(writeText = vi.fn().mockResolvedValue(undefined)) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  });
  return writeText;
}

describe('CopyButton', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('copia el valor al portapapeles y acusa en una región viva', async () => {
    const writeText = mockClipboard();
    render(<CopyButton value="sk-live-42" />);

    await userEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    expect(writeText).toHaveBeenCalledWith('sk-live-42');
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copiado'));
  });

  it('evalúa el valor en el momento del clic cuando es una función', async () => {
    const writeText = mockClipboard();
    let actual = 'primero';
    render(<CopyButton value={() => actual} />);

    actual = 'segundo';
    await userEvent.click(screen.getByRole('button'));

    expect(writeText).toHaveBeenCalledWith('segundo');
  });

  it('sustituye el rótulo visible por el acuse mientras dura', async () => {
    mockClipboard();
    render(<CopyButton value="x">Copiar clave</CopyButton>);

    const button = screen.getByRole('button', { name: 'Copiar clave' });
    await userEvent.click(button);

    await waitFor(() => expect(button).toHaveTextContent('Copiado'));
  });

  it('vuelve al estado inicial cuando pasa el acuse', async () => {
    mockClipboard();
    render(<CopyButton value="x" feedbackDuration={20}>Copiar clave</CopyButton>);

    const button = screen.getByRole('button');
    await userEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent('Copiado'));
    await waitFor(() => expect(button).toHaveTextContent('Copiar clave'));
  });

  it('avisa cuando el portapapeles no está disponible, en vez de fingir que copió', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')));
    const onCopyError = vi.fn();
    render(<CopyButton value="x" onCopyError={onCopyError} />);

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('No se pudo copiar'));
    expect(onCopyError).toHaveBeenCalled();
  });

  it('llama a onCopy con el texto copiado', async () => {
    mockClipboard();
    const onCopy = vi.fn();
    render(<CopyButton value="hola" onCopy={onCopy} />);

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(onCopy).toHaveBeenCalledWith('hola'));
  });

  it('acepta textos propios, variante y talla', () => {
    mockClipboard();
    render(<CopyButton value="x" label="Copy" variant="outline" size="lg" />);
    const button = screen.getByRole('button', { name: 'Copy' });
    expect(button).toHaveClass('button--outline');
    expect(button).toHaveClass('button--lg');
    expect(button).toHaveClass('button--icon-only');
  });

  it('deja de ser icon-only cuando lleva rótulo visible', () => {
    mockClipboard();
    render(<CopyButton value="x">Copiar</CopyButton>);
    expect(screen.getByRole('button')).not.toHaveClass('button--icon-only');
  });
});
