import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutocompleteField } from './AutocompleteField';

const OPCIONES = [{ value: 'pan', label: 'Pan de molde' }];

describe('AutocompleteField', () => {
  it('la etiqueta nombra el combobox y ayuda y error quedan enlazados', () => {
    render(<AutocompleteField label="Producto" id="p" helperText="Ayuda" errorMessage="Falta" />);
    const input = screen.getByRole('combobox', { name: 'Producto' });
    expect(input).toHaveAttribute('aria-describedby', 'p-error p-helper');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Falta');
  });

  it('reenvía el ref al input y elegir avisa de la sugerencia', async () => {
    const user = userEvent.setup();
    const ref = { current: null as HTMLInputElement | null };
    const onSelect = vi.fn();
    render(<AutocompleteField ref={ref} label="Producto" options={OPCIONES} onSelect={onSelect} />);
    expect(ref.current).toBe(screen.getByRole('combobox'));
    await user.type(screen.getByRole('combobox'), 'pa');
    await user.click(await screen.findByRole('option', { name: 'Pan de molde' }));
    expect(onSelect).toHaveBeenCalledWith(OPCIONES[0]);
    expect(screen.getByRole('combobox')).toHaveValue('Pan de molde');
  });
});
