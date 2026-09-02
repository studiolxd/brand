import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AsyncSelect } from './AsyncSelect';
import type { AsyncSelectOption } from './AsyncSelect';

const espera = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

afterEach(() => vi.restoreAllMocks());

describe('AsyncSelect — búsqueda', () => {
  it('descarta la respuesta que llega fuera de orden', async () => {
    const user = userEvent.setup();
    // la primera búsqueda tarda más que la segunda: sin contador de petición,
    // sus resultados pisarían a los de la última tecla
    const onSearch = vi.fn((q: string): Promise<AsyncSelectOption[]> =>
      q === 'a'
        ? espera(80).then(() => [{ value: 'a', label: 'Antigua' }])
        : espera(10).then(() => [{ value: 'b', label: 'Reciente' }]),
    );

    render(<AsyncSelect onSearch={onSearch} debounceMs={0} placeholder="Buscar…" aria-label="Buscar" />);

    await user.click(screen.getByRole('combobox'));
    await user.keyboard('ab');

    expect(await screen.findByRole('option', { name: 'Reciente' })).toBeInTheDocument();
    await espera(120);
    expect(screen.queryByRole('option', { name: 'Antigua' })).toBeNull();
    expect(screen.getByRole('option', { name: 'Reciente' })).toBeInTheDocument();
  });

  it('rebota las teclas: una sola llamada a onSearch por ráfaga', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn(async (): Promise<AsyncSelectOption[]> => []);

    render(<AsyncSelect onSearch={onSearch} debounceMs={40} placeholder="Buscar…" aria-label="Buscar" />);

    await user.click(screen.getByRole('combobox'));
    // la apertura ya busca con la consulta vacía
    await waitFor(() => expect(onSearch).toHaveBeenCalledTimes(1));

    await user.keyboard('abc');
    await espera(120);
    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(onSearch).toHaveBeenLastCalledWith('abc');
  });

  it('no pinta nada tras desmontar con una búsqueda en vuelo', async () => {
    const user = userEvent.setup();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onSearch = vi.fn((): Promise<AsyncSelectOption[]> =>
      espera(50).then(() => [{ value: 'a', label: 'Antigua' }]),
    );

    const { unmount } = render(
      <AsyncSelect onSearch={onSearch} debounceMs={0} placeholder="Buscar…" aria-label="Buscar" />,
    );
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('a');
    unmount();
    await espera(100);

    expect(error).not.toHaveBeenCalled();
  });
});
