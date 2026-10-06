import { useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete } from './Autocomplete';
import type { AutocompleteOption } from './Autocomplete';

const espera = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const PRODUCTOS: AutocompleteOption[] = [
  { value: 'leche', label: 'Leche entera' },
  { value: 'lentejas', label: 'Lentejas' },
  { value: 'cafe', label: 'Café molido' },
];

afterEach(() => vi.restoreAllMocks());

describe('Autocomplete — contrato ARIA', () => {
  it('es un combobox con lista, cerrado al principio y sin aria-controls roto', () => {
    render(<Autocomplete options={PRODUCTOS} aria-label="Producto" />);
    const input = screen.getByRole('combobox', { name: 'Producto' });
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).not.toHaveAttribute('aria-controls');
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('al escribir abre la lista y enlaza el listbox', async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={PRODUCTOS} aria-label="Producto" />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'le');
    const listbox = await screen.findByRole('listbox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
    expect(screen.getAllByRole('option').map(o => o.textContent)).toEqual(['Leche entera', 'Lentejas']);
  });

  it('filtra sin distinguir mayúsculas ni tildes', async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={PRODUCTOS} aria-label="Producto" />);
    await user.type(screen.getByRole('combobox'), 'CAFE');
    expect(await screen.findByRole('option', { name: 'Café molido' })).toBeInTheDocument();
  });
});

describe('Autocomplete — texto libre', () => {
  it('el valor es lo escrito aunque no coincida con nada; sin sugerencias no hay lista', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onSelect = vi.fn();
    render(<Autocomplete options={PRODUCTOS} onValueChange={onValueChange} onSelect={onSelect} aria-label="Producto" />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'zzz');
    expect(input).toHaveValue('zzz');
    expect(onValueChange).toHaveBeenLastCalledWith('zzz');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(input).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{Enter}');
    expect(onSelect).not.toHaveBeenCalled();
    expect(input).toHaveValue('zzz');
  });

  it('elegir una sugerencia rellena el texto y avisa de cuál fue', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onSelect = vi.fn();
    render(<Autocomplete options={PRODUCTOS} onValueChange={onValueChange} onSelect={onSelect} aria-label="Producto" />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'len');
    await user.click(await screen.findByRole('option', { name: 'Lentejas' }));
    expect(input).toHaveValue('Lentejas');
    expect(onValueChange).toHaveBeenLastCalledWith('Lentejas');
    expect(onSelect).toHaveBeenCalledWith({ value: 'lentejas', label: 'Lentejas' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(input).toHaveFocus();
  });

  it('controlado: el texto lo manda el padre', async () => {
    const user = userEvent.setup();
    function Padre() {
      const [v, setV] = useState('');
      return <><Autocomplete value={v} onValueChange={setV} options={PRODUCTOS} aria-label="Producto" /><output>{v}</output></>;
    }
    render(<Padre />);
    await user.type(screen.getByRole('combobox'), 'caf');
    await user.click(await screen.findByRole('option', { name: 'Café molido' }));
    expect(screen.getByRole('status')).toHaveTextContent('Café molido');
  });

  it('lleva el nombre y el texto en el propio input, para el formulario', () => {
    render(<Autocomplete name="producto" defaultValue="Pan" aria-label="Producto" required />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('name', 'producto');
    expect(input).toBeRequired();
    expect(input).toHaveValue('Pan');
  });
});

describe('Autocomplete — teclado', () => {
  it('flechas mueven la opción activa con aria-activedescendant y Enter la elige', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Autocomplete options={PRODUCTOS} onSelect={onSelect} aria-label="Producto" />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'le');
    const [primera, segunda] = await screen.findAllByRole('option');

    await user.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', primera.id);
    expect(primera).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', segunda.id);
    // pasado el final vuelve al texto escrito (el campo está en el bucle,
    // como pide la APG) y desde ahí la flecha arriba va a la última
    await user.keyboard('{ArrowDown}');
    expect(input).not.toHaveAttribute('aria-activedescendant');
    await user.keyboard('{ArrowUp}');
    expect(input).toHaveAttribute('aria-activedescendant', segunda.id);
    await user.keyboard('{ArrowUp}{ArrowUp}'); // de vuelta al texto escrito
    expect(input).not.toHaveAttribute('aria-activedescendant');
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(onSelect).toHaveBeenCalledWith({ value: 'lentejas', label: 'Lentejas' });
    expect(input).toHaveValue('Lentejas');
  });

  it('flecha abajo abre la lista aunque no se llegue a minChars', async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={PRODUCTOS} minChars={3} aria-label="Producto" />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'l');
    expect(screen.queryByRole('listbox')).toBeNull();
    await user.keyboard('{ArrowDown}');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });

  it('Enter sin sugerencia marcada se queda con lo escrito, cierra y deja enviar el formulario', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    // Con botón de envío: Base UI monta un input oculto junto al campo, y sin
    // botón un formulario con dos campos no se envía implícitamente con Intro.
    render(
      <form onSubmit={onSubmit}>
        <Autocomplete options={PRODUCTOS} aria-label="Producto" />
        <button type="submit">Enviar</button>
      </form>,
    );
    const input = screen.getByRole('combobox');
    await user.type(input, 'le');
    await screen.findByRole('listbox');
    await user.keyboard('{Enter}');
    expect(input).toHaveValue('le');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('Enter sobre una sugerencia marcada NO envía el formulario', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Autocomplete options={PRODUCTOS} aria-label="Producto" />
      </form>,
    );
    await user.type(screen.getByRole('combobox'), 'le');
    await screen.findByRole('listbox');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('Escape cierra la lista y conserva el texto; sin lista no hace nada', async () => {
    const user = userEvent.setup();
    const alEscape = vi.fn();
    render(
      <div onKeyDown={e => e.key === 'Escape' && alEscape()}>
        <Autocomplete options={PRODUCTOS} aria-label="Producto" />
      </div>,
    );
    const input = screen.getByRole('combobox');
    await user.type(input, 'le');
    await screen.findByRole('listbox');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    expect(input).toHaveValue('le');
    // abierta, el Escape no sube al contenedor (un Modal no se cierra)
    expect(alEscape).not.toHaveBeenCalled();
    await user.keyboard('{Escape}');
    expect(alEscape).toHaveBeenCalledTimes(1);
  });

  it('Tab cierra la lista', async () => {
    const user = userEvent.setup();
    // Un destino para el tabulador: el foco sale del campo hacia él.
    render(<><Autocomplete options={PRODUCTOS} aria-label="Producto" /><button type="button">Siguiente</button></>);
    await user.type(screen.getByRole('combobox'), 'le');
    await screen.findByRole('listbox');
    await user.tab();
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
  });
});

describe('Autocomplete — sugerencias asíncronas', () => {
  it('rebota las teclas: una sola llamada a onSearch por ráfaga', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn(async () => PRODUCTOS);
    render(<Autocomplete onSearch={onSearch} debounceMs={40} aria-label="Producto" />);
    await user.type(screen.getByRole('combobox'), 'lec');
    await espera(120);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('lec');
    expect(await screen.findAllByRole('option')).toHaveLength(3);
  });

  it('descarta la respuesta que llega fuera de orden', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn((q: string): Promise<AutocompleteOption[]> =>
      q === 'a'
        ? espera(80).then(() => [{ value: 'vieja', label: 'Antigua' }])
        : espera(10).then(() => [{ value: 'nueva', label: 'Reciente' }]),
    );
    render(<Autocomplete onSearch={onSearch} debounceMs={0} aria-label="Producto" />);
    await user.type(screen.getByRole('combobox'), 'ab');
    expect(await screen.findByRole('option', { name: 'Reciente' })).toBeInTheDocument();
    await espera(120);
    expect(screen.queryByRole('option', { name: 'Antigua' })).toBeNull();
  });

  it('admite sugerencias síncronas devueltas por onSearch', async () => {
    const user = userEvent.setup();
    render(<Autocomplete onSearch={() => PRODUCTOS.slice(0, 1)} debounceMs={0} aria-label="Producto" />);
    await user.type(screen.getByRole('combobox'), 'l');
    expect(await screen.findByRole('option', { name: 'Leche entera' })).toBeInTheDocument();
  });

  it('si onSearch falla no hay lista y el texto sigue valiendo', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn(async (): Promise<AutocompleteOption[]> => { throw new Error('red'); });
    render(<Autocomplete onSearch={onSearch} debounceMs={0} aria-label="Producto" />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'x');
    await waitFor(() => expect(onSearch).toHaveBeenCalled());
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(input).toHaveValue('x');
  });

  it('no pinta nada tras desmontar con una búsqueda en vuelo', async () => {
    const user = userEvent.setup();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onSearch = vi.fn(() => espera(50).then(() => PRODUCTOS));
    const { unmount } = render(<Autocomplete onSearch={onSearch} debounceMs={0} aria-label="Producto" />);
    await user.type(screen.getByRole('combobox'), 'a');
    unmount();
    await espera(100);
    expect(error).not.toHaveBeenCalled();
  });
});

describe('Autocomplete — estados', () => {
  it('desactivado no abre nada', async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={PRODUCTOS} disabled aria-label="Producto" />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'le');
    expect(input).toHaveValue('');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('error marca aria-invalid y la clase', () => {
    render(<Autocomplete error aria-label="Producto" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('combobox').parentElement).toHaveClass('autocomplete', 'autocomplete--error');
  });
});
