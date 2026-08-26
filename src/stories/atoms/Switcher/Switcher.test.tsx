import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switcher } from './Switcher';

describe('Switcher', () => {
  it('lo nombra un <label htmlFor> y es un botón nativo', async () => {
    const onChange = vi.fn();
    render(
      <>
        <label htmlFor="analitica">Analítica</label>
        <Switcher id="analitica" checked={false} onCheckedChange={onChange} />
      </>,
    );
    const sw = screen.getByRole('switch', { name: 'Analítica' });
    expect(sw.tagName).toBe('BUTTON');
    await userEvent.click(sw);
    // solo el estado: sin el segundo argumento de Base UI
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onChange.mock.calls[0]).toHaveLength(1);
  });

  it('disabled es nativo', () => {
    render(<Switcher aria-label="Necesarias" checked disabled />);
    expect(screen.getByRole('switch', { name: 'Necesarias' })).toBeDisabled();
  });
});
