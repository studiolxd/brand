import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldRow, FieldRows } from './FieldRow';
import { InputField } from '../InputField/InputField';
import { SelectField } from '../SelectField/SelectField';
import { Button } from '../../atoms/Button/Button';

const ROLES = [
  { value: 'admin', label: 'Administración' },
  { value: 'lectura', label: 'Solo lectura' },
];

function Lista({ ids = ['1', '2', '3'], labels }: { ids?: string[]; labels?: 'first-row' | 'every-row' }) {
  return (
    <FieldRows labels={labels}>
      {ids.map((id) => (
        <FieldRow key={id} widths={['grow', 'md']} action={<Button variant="ghost" iconOnly aria-label={`Quitar la fila ${id}`}>×</Button>}>
          <InputField id={`correo-${id}`} label="Correo electrónico" type="email" />
          <SelectField id={`rol-${id}`} label="Papel" options={ROLES} />
        </FieldRow>
      ))}
    </FieldRows>
  );
}

describe('FieldRow', () => {
  it('cada campo conserva su nombre accesible en todas las filas', () => {
    render(<Lista />);
    expect(screen.getAllByLabelText('Correo electrónico')).toHaveLength(3);
    expect(screen.getAllByLabelText('Papel')).toHaveLength(3);
  });

  it('solo la primera fila enseña las etiquetas', () => {
    const { container } = render(<Lista />);
    const etiquetas = Array.from(container.querySelectorAll('label'));
    expect(etiquetas).toHaveLength(6);
    expect(etiquetas.filter((etiqueta) => !etiqueta.classList.contains('visually-hidden'))).toHaveLength(2);
  });

  it('con labels="every-row" se ven en todas', () => {
    const { container } = render(<Lista labels="every-row" />);
    const etiquetas = Array.from(container.querySelectorAll('label'));
    expect(etiquetas.filter((etiqueta) => etiqueta.classList.contains('visually-hidden'))).toHaveLength(0);
  });

  it('la prop del campo gana al reparto de la fila', () => {
    const { container } = render(
      <FieldRows>
        <FieldRow><InputField id="a" label="Uno" /></FieldRow>
        <FieldRow><InputField id="b" label="Dos" labelHidden={false} /></FieldRow>
      </FieldRows>,
    );
    const etiquetas = Array.from(container.querySelectorAll('label'));
    expect(etiquetas.every((etiqueta) => !etiqueta.classList.contains('visually-hidden'))).toBe(true);
  });

  it('la acción va en su propia celda, fuera de la columna de los campos', () => {
    render(<Lista ids={['1']} />);
    const accion = screen.getByRole('button', { name: 'Quitar la fila 1' });
    expect(accion.closest('.field-row__action')).not.toBeNull();
    expect(accion.closest('.field-row__cell')).toBeNull();
  });

  it('reserva el hueco de la etiqueta solo en la fila que las enseña', () => {
    const { container } = render(<Lista />);
    expect(container.querySelectorAll('.field-row__action-offset')).toHaveLength(1);
  });

  it('la primera celda crece y las demás llevan su ancho', () => {
    const { container } = render(<Lista ids={['1']} />);
    const celdas = container.querySelectorAll('.field-row__cell');
    expect(celdas[0]).toHaveClass('field-row__cell--grow');
    expect(celdas[1]).toHaveClass('field-row__cell--md');
  });

  it('sin filas pinta el aviso de vacío', () => {
    render(<FieldRows empty="Todavía no has invitado a nadie.">{[]}</FieldRows>);
    expect(screen.getByText('Todavía no has invitado a nadie.')).toBeInTheDocument();
  });

  it('suelta, fuera de una lista, la fila enseña sus etiquetas', () => {
    const { container } = render(
      <FieldRow><InputField id="suelto" label="Correo electrónico" /></FieldRow>,
    );
    expect(container.querySelector('label')).not.toHaveClass('visually-hidden');
  });
});
