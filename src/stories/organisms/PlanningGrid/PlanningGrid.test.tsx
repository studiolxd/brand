import { describe, it, expect, vi } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { PlanningGrid, type PlanningGridCell, type PlanningGridColumn, type PlanningGridRow } from './PlanningGrid';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

const FILAS: PlanningGridRow[] = [
  { id: 'pr1', name: 'Portal de facturación' },
  { id: 'pr2', name: 'Migración a Keycloak' },
];

const COLUMNAS: PlanningGridColumn[] = [
  { key: 's11', name: 'Semana 11', capacity: 40, readOnly: true },
  { key: 's12', name: 'Semana 12', capacity: 40 },
];

const CELDAS: PlanningGridCell[] = [
  { rowId: 'pr1', columnKey: 's11', value: 16 },
  { rowId: 'pr1', columnKey: 's12', value: 20 },
  { rowId: 'pr2', columnKey: 's12', value: 12 },
];

const base = { rows: FILAS, columns: COLUMNAS, cells: CELDAS, label: 'Planificación' };

describe('PlanningGrid', () => {
  it('es una tabla con encabezados en los dos ejes', () => {
    render(<PlanningGrid {...base} rowHeader="Proyecto" onCellChange={vi.fn()} />);
    const tabla = screen.getByRole('table', { name: 'Planificación' });
    expect(within(tabla).getAllByRole('rowheader').length).toBeGreaterThanOrEqual(2);
    expect(within(tabla).getByRole('columnheader', { name: /Semana 12/ })).toBeInTheDocument();
  });

  it('nombra el campo de cada cruce con los dos ejes', () => {
    render(<PlanningGrid {...base} onCellChange={vi.fn()} />);
    expect(
      screen.getByRole('textbox', { name: ES.planningGrid.cellLabel('Portal de facturación', 'Semana 12') }),
    ).toBeInTheDocument();
  });

  it('confirma al salir del campo, no en cada tecla', async () => {
    const onCellChange = vi.fn();
    render(<PlanningGrid {...base} onCellChange={onCellChange} />);

    const campo = screen.getByRole('textbox', { name: ES.planningGrid.cellLabel('Migración a Keycloak', 'Semana 12') });
    await userEvent.clear(campo);
    await userEvent.type(campo, '7,5');
    expect(onCellChange).not.toHaveBeenCalled();

    await userEvent.tab();
    expect(onCellChange).toHaveBeenCalledWith('pr2', 's12', 7.5);
  });

  it('Intro confirma igual que salir', async () => {
    const onCellChange = vi.fn();
    render(<PlanningGrid {...base} onCellChange={onCellChange} />);

    const campo = screen.getByRole('textbox', { name: ES.planningGrid.cellLabel('Migración a Keycloak', 'Semana 12') });
    await userEvent.clear(campo);
    await userEvent.type(campo, '4{Enter}');
    expect(onCellChange).toHaveBeenCalledWith('pr2', 's12', 4);
  });

  it('lo que no son horas vuelve al valor que había', async () => {
    const onCellChange = vi.fn();
    render(<PlanningGrid {...base} onCellChange={onCellChange} />);

    const campo = screen.getByRole('textbox', { name: ES.planningGrid.cellLabel('Portal de facturación', 'Semana 12') });
    await userEvent.clear(campo);
    await userEvent.type(campo, 'ocho');
    await userEvent.tab();

    expect(onCellChange).not.toHaveBeenCalled();
    expect(campo).toHaveValue('20');
  });

  it('un valor igual al que había no llama al manejador', async () => {
    const onCellChange = vi.fn();
    render(<PlanningGrid {...base} onCellChange={onCellChange} />);
    const campo = screen.getByRole('textbox', { name: ES.planningGrid.cellLabel('Portal de facturación', 'Semana 12') });
    await userEvent.click(campo);
    await userEvent.tab();
    expect(onCellChange).not.toHaveBeenCalled();
  });

  it('una columna de solo lectura no tiene campos', () => {
    render(<PlanningGrid {...base} onCellChange={vi.fn()} />);
    expect(
      screen.queryByRole('textbox', { name: ES.planningGrid.cellLabel('Portal de facturación', 'Semana 11') }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByText('16 h').length).toBeGreaterThan(0);
  });

  it('sin manejador la rejilla se mira, no se edita', () => {
    render(<PlanningGrid {...base} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('suma los totales de fila y de columna', () => {
    render(<PlanningGrid {...base} onCellChange={vi.fn()} />);
    // Fila pr1: 16 + 20 = 36; columna s12: 20 + 12 = 32; total general 48.
    expect(screen.getByText('36 h')).toBeInTheDocument();
    expect(screen.getByText('32 h')).toBeInTheDocument();
    expect(screen.getByText('48 h')).toBeInTheDocument();
  });

  it('el resto es la disponibilidad menos lo asignado', () => {
    render(<PlanningGrid {...base} onCellChange={vi.fn()} />);
    // s11: 40 − 16 = 24; s12: 40 − 32 = 8.
    expect(screen.getByText('24 h')).toBeInTheDocument();
    expect(screen.getByText('8 h')).toBeInTheDocument();
  });

  it('pasarse de la disponibilidad se dice, no solo se pinta', () => {
    render(
      <PlanningGrid
        {...base}
        cells={[...CELDAS, { rowId: 'pr2', columnKey: 's12', value: 50 }]}
        onCellChange={vi.fn()}
      />,
    );
    expect(screen.getByText(`(${ES.planningGrid.over})`)).toBeInTheDocument();
  });

  it('sin ninguna columna con disponibilidad no hay fila de resto', () => {
    render(
      <PlanningGrid
        {...base}
        columns={[{ key: 's12', name: 'Semana 12' }]}
        onCellChange={vi.fn()}
      />,
    );
    expect(screen.queryByText(ES.planningGrid.remaining)).not.toBeInTheDocument();
  });

  it('el error de un cruce se anuncia y enlaza con su campo', () => {
    render(
      <PlanningGrid
        {...base}
        cells={[{ rowId: 'pr1', columnKey: 's12', value: 20, error: 'El proyecto está cerrado' }]}
        onCellChange={vi.fn()}
      />,
    );
    const campo = screen.getByRole('textbox', { name: ES.planningGrid.cellLabel('Portal de facturación', 'Semana 12') });
    expect(campo).toHaveAttribute('aria-invalid', 'true');
    const alerta = screen.getByRole('alert');
    expect(alerta).toHaveTextContent('El proyecto está cerrado');
    expect(campo).toHaveAttribute('aria-describedby', alerta.id);
  });

  it('un cruce en vuelo se atenúa sin esconder la cifra', () => {
    const { container } = render(
      <PlanningGrid
        {...base}
        cells={[{ rowId: 'pr1', columnKey: 's12', value: 20, pending: true }]}
        onCellChange={vi.fn()}
      />,
    );
    expect(container.querySelectorAll('.planning-grid__cell--pending')).toHaveLength(1);
    expect(
      screen.getByRole('textbox', { name: ES.planningGrid.cellLabel('Portal de facturación', 'Semana 12') }),
    ).toHaveValue('20');
  });

  it('recorta un valor por encima del tope', async () => {
    const onCellChange = vi.fn();
    render(<PlanningGrid {...base} max={40} onCellChange={onCellChange} />);
    const campo = screen.getByRole('textbox', { name: ES.planningGrid.cellLabel('Migración a Keycloak', 'Semana 12') });
    await userEvent.clear(campo);
    await userEvent.type(campo, '999{Enter}');
    expect(onCellChange).toHaveBeenCalledWith('pr2', 's12', 40);
  });
});
