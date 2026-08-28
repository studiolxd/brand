import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from './Slider';

describe('Slider', () => {
  it('un valor suelto monta un pulgar con el nombre del deslizador', () => {
    render(<Slider label="Espaciado" defaultValue={40} />);
    const pulgar = screen.getByRole('slider', { name: 'Espaciado' });
    expect(pulgar).toHaveValue('40');
  });

  it('una lista monta un pulgar por valor, con nombres de rango', () => {
    render(<Slider label="Precio" defaultValue={[20, 80]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
    expect(screen.getByRole('slider', { name: 'Mínimo' })).toHaveValue('20');
    expect(screen.getByRole('slider', { name: 'Máximo' })).toHaveValue('80');
  });

  it('devuelve la misma forma que recibió', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Slider label="Espaciado" defaultValue={40} onValueChange={onValueChange} />);

    screen.getByRole('slider', { name: 'Espaciado' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(onValueChange).toHaveBeenCalledWith(41);
  });

  it('los nombres de los pulgares son props traducibles', () => {
    render(<Slider label="Price" defaultValue={[20, 80]} thumbLabel={(i) => (i === 0 ? 'From' : 'To')} />);
    expect(screen.getByRole('slider', { name: 'From' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'To' })).toBeInTheDocument();
  });

  it('respeta min, max y step', async () => {
    const user = userEvent.setup();
    render(<Slider label="Ancho" defaultValue={50} min={0} max={100} step={10} />);
    const pulgar = screen.getByRole('slider', { name: 'Ancho' });

    pulgar.focus();
    await user.keyboard('{ArrowRight}');
    expect(pulgar).toHaveValue('60');
  });

  it('deshabilitado no se mueve', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Slider label="Espaciado" defaultValue={40} disabled onValueChange={onValueChange} />);

    screen.getByRole('slider', { name: 'Espaciado' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
