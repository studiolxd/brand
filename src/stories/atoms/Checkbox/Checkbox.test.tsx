import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('lo nombra un <label htmlFor> y avisa solo con el estado', async () => {
    const onChange = vi.fn();
    render(
      <>
        <label htmlFor="acepto">Acepto</label>
        <Checkbox id="acepto" checked={false} onCheckedChange={onChange} />
      </>,
    );
    const cb = screen.getByRole('checkbox', { name: 'Acepto' });
    expect(cb.tagName).toBe('BUTTON');
    await userEvent.click(cb);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onChange.mock.calls[0]).toHaveLength(1);
  });
});
