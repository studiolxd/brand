import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoveryCodes } from './RecoveryCodes';

const CODES = ['7F3K-9QRT', 'M2XW-4LPZ', 'B8HN-6VCY', 'K5JD-1WGX'];

const labels = {
  list: 'Códigos de recuperación',
  copy: 'Copiar todos',
  copied: 'Copiados',
};

function mockClipboard(writeText = vi.fn().mockResolvedValue(undefined)) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  });
  return writeText;
}

describe('RecoveryCodes', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('numera los códigos en una lista real', () => {
    render(<RecoveryCodes codes={CODES} labels={labels} />);

    const list = screen.getByRole('list', { name: labels.list });
    expect(list.tagName).toBe('OL');

    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(CODES.length);
    items.forEach((item, i) => expect(item).toHaveTextContent(CODES[i]));
  });

  it('el botón copia todos los códigos, uno por línea', async () => {
    const writeText = mockClipboard();
    render(<RecoveryCodes codes={CODES} labels={labels} />);

    await userEvent.click(screen.getByRole('button', { name: labels.copy }));

    expect(writeText).toHaveBeenCalledWith(CODES.join('\n'));
  });

  it('el acuse del botón de copiar usa `labels.copied`', async () => {
    mockClipboard();
    render(<RecoveryCodes codes={CODES} labels={labels} />);

    const button = screen.getByRole('button', { name: labels.copy });
    await userEvent.click(button);

    expect(await screen.findByRole('button', { name: labels.copied })).toBeInTheDocument();
  });

  it('columns por defecto es 2', () => {
    render(<RecoveryCodes codes={CODES} labels={labels} />);
    const list = screen.getByRole('list', { name: labels.list });
    expect(list).toHaveAttribute('data-columns', '2');
  });

  it('acepta `columns` explícito', () => {
    render(<RecoveryCodes codes={CODES} labels={labels} columns={1} />);
    const list = screen.getByRole('list', { name: labels.list });
    expect(list).toHaveAttribute('data-columns', '1');
  });

  it('renderiza las `actions` del producto junto al botón de copiar', () => {
    render(
      <RecoveryCodes
        codes={CODES}
        labels={labels}
        actions={<button type="button">Descargar</button>}
      />,
    );

    expect(screen.getByRole('button', { name: 'Descargar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: labels.copy })).toBeInTheDocument();
  });

  it('no aporta ningún elemento de solo lectura fuera de la lista: no hay estado propio de "mostrar otra vez"', () => {
    render(<RecoveryCodes codes={CODES} labels={labels} />);
    expect(screen.queryByRole('button', { name: /mostrar|ver de nuevo/i })).not.toBeInTheDocument();
  });

  it('acepta `className` e `id`', () => {
    const { container } = render(
      <RecoveryCodes codes={CODES} labels={labels} className="custom" id="my-codes" />,
    );
    const root = container.querySelector('#my-codes');
    expect(root).toHaveClass('recovery-codes', 'custom');
  });
});
