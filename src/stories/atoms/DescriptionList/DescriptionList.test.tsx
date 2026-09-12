import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DescriptionList, DescriptionTerm, DescriptionDetails } from './DescriptionList';

function mockClipboard(writeText = vi.fn().mockResolvedValue(undefined)) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  });
  return writeText;
}

const ficha = (props: React.ComponentProps<typeof DescriptionDetails>) => (
  <DescriptionList aria-label="ficha">
    <DescriptionTerm>Identificador</DescriptionTerm>
    <DescriptionDetails {...props} />
  </DescriptionList>
);

describe('DescriptionDetails copiable', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sin `copyable`, el marcado es el de siempre: el texto y nada más', () => {
    render(ficha({ children: 'org_8f2c19ab' }));

    const valor = screen.getByLabelText('ficha').querySelector('dd')!;
    expect(valor.tagName).toBe('DD');
    expect(valor).toHaveClass('description-list__details');
    expect(valor).not.toHaveClass('description-list__details--copyable');
    expect(valor.innerHTML).toBe('org_8f2c19ab');
  });

  it('con `copyable`, el botón vive en la cola del valor, dentro del `<dd>`', () => {
    mockClipboard();
    render(ficha({ copyable: true, children: 'org_8f2c19ab' }));

    const valor = screen.getByLabelText('ficha').querySelector('dd')!;
    expect(valor).toHaveClass('description-list__details--copyable');

    const boton = within(valor).getByRole('button', { name: 'Copiar' });
    const texto = valor.querySelector('.copyable-value__value')!;
    // El botón viaja en `.copyable-value__tail` (los últimos caracteres del
    // valor, ver `splitTail` en `CopyableValue`), nested dentro del propio
    // valor — no como hermano después de él.
    expect(texto).toContainElement(boton);
    expect(texto.textContent?.replace('⁠', '')).toBe('org_8f2c19ab');
  });

  it('copia el texto del valor y acusa en una región viva', async () => {
    const writeText = mockClipboard();
    render(ficha({ copyable: true, children: 'org_8f2c19ab' }));

    await userEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    expect(writeText).toHaveBeenCalledWith('org_8f2c19ab');
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copiado'));
  });

  it('copia `copyText` cuando lo que se ve y lo que se copia no coinciden', async () => {
    const writeText = mockClipboard();
    render(ficha({
      copyable: true,
      copyText: 'https://cuenta.studiolxd.com/callback',
      children: 'cuenta.studiolxd.com/callback',
    }));

    await userEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    expect(writeText).toHaveBeenCalledWith('https://cuenta.studiolxd.com/callback');
  });

  it('acepta textos propios para el botón y el acuse', async () => {
    mockClipboard();
    render(ficha({
      copyable: true,
      copyLabel: 'Copy the identifier',
      copiedLabel: 'Copied',
      children: 'org_8f2c19ab',
    }));

    await userEvent.click(screen.getByRole('button', { name: 'Copy the identifier' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copied'));
  });

  it('no acusa cuando el portapapeles no está disponible', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')));
    render(ficha({ copyable: true, children: 'org_8f2c19ab' }));

    await userEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    await waitFor(() => expect(screen.getByRole('status')).toBeEmptyDOMElement());
  });

  it('sigue reenviando `className`, `as` y el resto de props', () => {
    mockClipboard();
    render(
      <DescriptionList aria-label="ficha">
        <DescriptionTerm as="div" role="term">Identificador</DescriptionTerm>
        <DescriptionDetails as="div" role="definition" copyable className="extra" data-uso="prueba">
          org_8f2c19ab
        </DescriptionDetails>
      </DescriptionList>,
    );

    const valor = screen.getByRole('definition');
    expect(valor.tagName).toBe('DIV');
    expect(valor).toHaveClass('description-list__details', 'description-list__details--copyable', 'extra');
    expect(valor.className.trim().endsWith('extra')).toBe(true);
    expect(valor).toHaveAttribute('data-uso', 'prueba');
  });
});
