import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('expone rol y valores ARIA, con «Progreso» como nombre por defecto', () => {
    render(<ProgressBar value={42} />);
    const barra = screen.getByRole('progressbar', { name: 'Progreso' });
    expect(barra).toHaveAttribute('aria-valuenow', '42');
    expect(barra).toHaveAttribute('aria-valuemin', '0');
    expect(barra).toHaveAttribute('aria-valuemax', '100');
    expect(barra).toHaveAttribute('aria-valuetext', '42%');
  });

  it('acota el valor al rango y lo redondea', () => {
    const { rerender } = render(<ProgressBar value={-20} label="P" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

    rerender(<ProgressBar value={140} label="P" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');

    rerender(<ProgressBar value={65.6} label="P" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '66');
  });

  it('escribe la cifra dentro del relleno a partir del 15% y fuera por debajo', () => {
    const { container, rerender } = render(<ProgressBar value={20} label="P" />);
    expect(container.querySelector('.progress-bar__label--inside')).not.toBeNull();
    expect(container.querySelector('.progress-bar__label--outside')).toBeNull();

    rerender(<ProgressBar value={8} label="P" />);
    expect(container.querySelector('.progress-bar__label--inside')).toBeNull();
    expect(container.querySelector('.progress-bar__label--outside')).not.toBeNull();
  });

  it('en talla sm no escribe la cifra, pero sigue anunciando el valor', () => {
    const { container } = render(<ProgressBar value={45} size="sm" label="P" />);
    expect(container.querySelector('.progress-bar__label')).toBeNull();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '45');
  });

  it('la cifra visible es decorativa', () => {
    const { container } = render(<ProgressBar value={65} label="P" />);
    expect(container.querySelector('.progress-bar__label')).toHaveAttribute('aria-hidden', 'true');
  });
});
