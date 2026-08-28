import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StarRating } from './StarRating';

describe('StarRating', () => {
  it('en lectura es una sola imagen con el valor exacto en el nombre', () => {
    render(<StarRating value={4.5} />);
    expect(screen.getByRole('img', { name: '4,5 de 5 estrellas' })).toBeInTheDocument();
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
  });

  it('redondea a la media estrella más cercana', () => {
    render(<StarRating value={3.7} />);
    expect(screen.getByRole('img', { name: '3,5 de 5 estrellas' })).toBeInTheDocument();
  });

  it('respeta el máximo de la escala', () => {
    render(<StarRating value={7.5} max={10} />);
    expect(screen.getByRole('img', { name: '7,5 de 10 estrellas' })).toBeInTheDocument();
  });

  it('en entrada monta un radio por estrella y avisa del valor elegido', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<StarRating readOnly={false} onValueChange={onValueChange} />);

    const grupo = screen.getByRole('radiogroup', { name: 'Valoración' });
    expect(grupo).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);

    await user.click(screen.getByRole('radio', { name: '4 de 5 estrellas' }));
    expect(onValueChange).toHaveBeenCalledWith(4);
    expect(screen.getByRole('radio', { name: '4 de 5 estrellas' })).toBeChecked();
  });

  it('no controlado arranca en defaultValue', () => {
    render(<StarRating readOnly={false} defaultValue={2} />);
    expect(screen.getByRole('radio', { name: '2 de 5 estrellas' })).toBeChecked();
  });

  it('deshabilitado no cambia de valor', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<StarRating readOnly={false} disabled defaultValue={1} onValueChange={onValueChange} />);

    await user.click(screen.getByRole('radio', { name: '5 de 5 estrellas' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('los textos son props traducibles', () => {
    render(
      <StarRating
        value={4}
        valueLabel={(v, m) => `${v} out of ${m} stars`}
        locale="en-US"
      />,
    );
    expect(screen.getByRole('img', { name: '4 out of 5 stars' })).toBeInTheDocument();
  });

  it('el name viaja a los radios para el envío del formulario', () => {
    render(<StarRating readOnly={false} name="valoracion" />);
    expect(screen.getByRole('radio', { name: '3 de 5 estrellas' })).toHaveAttribute('name', 'valoracion');
  });
});
