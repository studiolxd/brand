import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyableValue } from './CopyableValue';

function mockClipboard(writeText = vi.fn().mockResolvedValue(undefined)) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  });
  return writeText;
}

describe('CopyableValue', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('el botón va dentro del envoltorio, pegado después del valor', () => {
    mockClipboard();
    render(<CopyableValue>org_8f2c19ab</CopyableValue>);

    const boton = screen.getByRole('button', { name: 'Copiar' });
    const valor = screen.getByText('org_8f2c19ab');
    expect(valor).toHaveClass('copyable-value__value');
    expect(valor.compareDocumentPosition(boton)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('copia el texto del valor y acusa en una región viva', async () => {
    const writeText = mockClipboard();
    render(<CopyableValue>org_8f2c19ab</CopyableValue>);

    await userEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    expect(writeText).toHaveBeenCalledWith('org_8f2c19ab');
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copiado'));
  });

  it('copia `copyText` cuando lo que se ve y lo que se copia no coinciden', async () => {
    const writeText = mockClipboard();
    render(
      <CopyableValue copyText="https://cuenta.studiolxd.com/callback">
        cuenta.studiolxd.com/callback
      </CopyableValue>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    expect(writeText).toHaveBeenCalledWith('https://cuenta.studiolxd.com/callback');
  });

  it('acepta textos propios para el botón y el acuse', async () => {
    mockClipboard();
    render(
      <CopyableValue copyLabel="Copy the identifier" copiedLabel="Copied">
        org_8f2c19ab
      </CopyableValue>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Copy the identifier' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copied'));
  });

  it('no acusa cuando el portapapeles no está disponible', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')));
    render(<CopyableValue>org_8f2c19ab</CopyableValue>);

    await userEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    await waitFor(() => expect(screen.getByRole('status')).toBeEmptyDOMElement());
  });

  it('copia el texto de `children` cuando no es texto plano (nodos)', async () => {
    const writeText = mockClipboard();
    render(
      <CopyableValue>
        <code>LMSMCP_API_KEY</code>
      </CopyableValue>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    expect(writeText).toHaveBeenCalledWith('LMSMCP_API_KEY');
  });

  it('reenvía `className` tras la clase propia', () => {
    mockClipboard();
    const { container } = render(<CopyableValue className="extra">org_8f2c19ab</CopyableValue>);

    const raiz = container.querySelector('.copyable-value')!;
    expect(raiz).toHaveClass('copyable-value', 'extra');
    expect(raiz.className.trim().endsWith('extra')).toBe(true);
  });
});
