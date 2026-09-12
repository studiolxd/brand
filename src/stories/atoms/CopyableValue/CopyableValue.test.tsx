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

  it('el botón va dentro del valor, pegado a su cola', () => {
    mockClipboard();
    const { container } = render(<CopyableValue>org_8f2c19ab</CopyableValue>);

    const boton = screen.getByRole('button', { name: 'Copiar' });
    const valor = container.querySelector('.copyable-value__value')!;
    const cola = container.querySelector('.copyable-value__tail')!;
    expect(valor).toContainElement(boton);
    expect(cola).toContainElement(boton);
    // El WORD JOINER (U+2060) viaja pegado al botón dentro de la cola.
    expect(valor.textContent?.replace('⁠', '')).toBe('org_8f2c19ab');
  });

  it('parte el valor en head + tail: la cola corta en el último separador dentro de la ventana', () => {
    mockClipboard();
    const { container } = render(<CopyableValue>org_8f2c19ab</CopyableValue>);

    const valor = container.querySelector('.copyable-value__value')!;
    const cola = container.querySelector('.copyable-value__tail')!;
    // El único separador ("_") cae a 9 caracteres del final: la cola arranca ahí.
    expect(valor.firstChild?.textContent).toBe('org');
    expect(cola.textContent?.startsWith('_8f2c19ab')).toBe(true);
  });

  it('sin separador en la ventana, la cola cae a los últimos 6 caracteres', () => {
    mockClipboard();
    const { container } = render(<CopyableValue>abcdefghijklmnop</CopyableValue>);

    const valor = container.querySelector('.copyable-value__value')!;
    const cola = container.querySelector('.copyable-value__tail')!;
    expect(valor.firstChild?.textContent).toBe('abcdefghij');
    expect(cola.textContent?.startsWith('klmnop')).toBe(true);
  });

  it('un valor corto (≤ 6 caracteres) va entero en la cola, sin head', () => {
    mockClipboard();
    const { container } = render(<CopyableValue>ab_cd</CopyableValue>);

    const valor = container.querySelector('.copyable-value__value')!;
    const cola = container.querySelector('.copyable-value__tail')!;
    // Sin head: el valor entero (menos el joiner) es exactamente la cola.
    expect(valor.textContent?.replace('⁠', '')).toBe('ab_cd');
    expect(cola.textContent?.startsWith('ab_cd')).toBe(true);
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
    const { container } = render(
      <CopyableValue>
        <code>LMSMCP_API_KEY</code>
      </CopyableValue>,
    );

    // Nodo corto (sin espacios, ≤ 24 caracteres): el botón viaja en el mismo
    // tramo `nowrap` que el valor, igual que la cola de un string.
    const boton = screen.getByRole('button', { name: 'Copiar' });
    const cola = container.querySelector('.copyable-value__tail')!;
    expect(cola).toContainElement(boton);

    await userEvent.click(boton);

    expect(writeText).toHaveBeenCalledWith('LMSMCP_API_KEY');
  });

  it('un nodo no textual largo o con espacios deja el botón fuera del valor (límite conocido)', () => {
    mockClipboard();
    const { container } = render(
      <CopyableValue>
        <code>Copiar la variable de entorno larga</code>
      </CopyableValue>,
    );

    const boton = screen.getByRole('button', { name: 'Copiar' });
    const valor = container.querySelector('.copyable-value__value')!;
    expect(valor).not.toContainElement(boton);
    expect(container.querySelector('.copyable-value__tail')).toBeNull();
  });

  it('reenvía `className` tras la clase propia', () => {
    mockClipboard();
    const { container } = render(<CopyableValue className="extra">org_8f2c19ab</CopyableValue>);

    const raiz = container.querySelector('.copyable-value')!;
    expect(raiz).toHaveClass('copyable-value', 'extra');
    expect(raiz.className.trim().endsWith('extra')).toBe(true);
  });
});
