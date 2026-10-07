import { describe, it, expect } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Heatmap, type HeatmapCell, type HeatmapColumn, type HeatmapRow } from './Heatmap';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

const FILAS: HeatmapRow[] = [
  { id: 'p1', label: 'Alicia Benítez' },
  { id: 'p2', label: 'Ignacio Puente' },
];

const COLUMNAS: HeatmapColumn[] = [
  { key: 'react', label: 'React', group: 'Front' },
  { key: 'css', label: 'CSS', group: 'Front' },
  { key: 'sql', label: 'SQL', group: 'Back' },
];

const CASILLAS: HeatmapCell[] = [
  { rowId: 'p1', columnKey: 'react', value: 4 },
  { rowId: 'p1', columnKey: 'css', value: 0 },
  { rowId: 'p2', columnKey: 'react', value: 2 },
  { rowId: 'p2', columnKey: 'sql', value: null },
];

const base = { rows: FILAS, columns: COLUMNAS, cells: CASILLAS, min: 0, max: 4 };

describe('Heatmap', () => {
  it('es una tabla con encabezados en los dos ejes', () => {
    render(<Heatmap {...base} label="Competencias" rowHeader="Persona" />);
    const tabla = screen.getByRole('table', { name: 'Competencias' });
    expect(within(tabla).getAllByRole('rowheader')).toHaveLength(2);
    expect(within(tabla).getByRole('columnheader', { name: 'React' })).toBeInTheDocument();
  });

  it('sin `label` propio toma el nombre del catálogo', () => {
    render(<Heatmap {...base} />);
    expect(screen.getByRole('table', { name: ES.heatmap.label })).toBeInTheDocument();
  });

  it('la cifra va dentro de la celda: el color no es la única señal', () => {
    render(<Heatmap {...base} label="Competencias" />);
    const tabla = within(screen.getByRole('table', { name: 'Competencias' }));
    expect(tabla.getByText('4')).toBeInTheDocument();
    expect(tabla.getByText('2')).toBeInTheDocument();
  });

  it('con `showValues` en false la cifra deja de verse pero se sigue leyendo', () => {
    const { container } = render(<Heatmap {...base} label="Competencias" showValues={false} />);
    const tabla = within(screen.getByRole('table', { name: 'Competencias' }));
    expect(tabla.getByText('4')).toHaveClass('visually-hidden');
    expect(container.querySelectorAll('.heatmap__cell .visually-hidden').length).toBe(6);
  });

  it('una casilla ausente y una `null` son ambas «sin dato», no el mínimo', () => {
    const { container } = render(<Heatmap {...base} label="Competencias" />);
    // p1/sql no está en la lista, p2/css tampoco, y p2/sql viene con null.
    expect(container.querySelectorAll('.heatmap__cell--empty')).toHaveLength(3);
    expect(screen.getAllByText(ES.heatmap.empty)).toHaveLength(3);
  });

  it('el mínimo del dominio sí es el paso 1 de la rampa, no una casilla vacía', () => {
    const { container } = render(<Heatmap {...base} label="Competencias" steps={5} />);
    // p1/css vale 0, el mínimo: paso 1 → primer peldaño de la rampa.
    const celda = within(screen.getByRole('table', { name: 'Competencias' })).getByText('0').closest('td');
    expect(celda).toHaveClass('heatmap__cell--step-1');
    expect(container.querySelector('.heatmap__cell--step-1')).toBe(celda);
  });

  it('el máximo del dominio cae en el último peldaño de la rampa', () => {
    render(<Heatmap {...base} label="Competencias" steps={5} />);
    const tabla = within(screen.getByRole('table', { name: 'Competencias' }));
    expect(tabla.getByText('4').closest('td')).toHaveClass('heatmap__cell--step-6');
  });

  it('agrupa las columnas consecutivas que comparten grupo', () => {
    render(<Heatmap {...base} label="Competencias" />);
    const front = screen.getByRole('columnheader', { name: 'Front' });
    expect(front).toHaveAttribute('colspan', '2');
    expect(screen.getByRole('columnheader', { name: 'Back' })).toHaveAttribute('colspan', '1');
  });

  it('sin grupos no pinta la fila de grupos', () => {
    const { container } = render(
      <Heatmap rows={FILAS} columns={[{ key: 'react', label: 'React' }]} cells={[]} label="Competencias" />,
    );
    expect(container.querySelector('.heatmap__group')).toBeNull();
  });

  it('sin `max` lo deduce del mayor valor de las casillas', () => {
    render(<Heatmap rows={FILAS} columns={COLUMNAS} cells={CASILLAS} label="Competencias" steps={5} />);
    const tabla = within(screen.getByRole('table', { name: 'Competencias' }));
    expect(tabla.getByText('4').closest('td')).toHaveClass('heatmap__cell--step-6');
  });

  it('la leyenda se nombra y lleva un peldaño de la tira por paso', () => {
    const { container } = render(<Heatmap {...base} label="Competencias" steps={4} />);
    expect(screen.getByRole('img', { name: ES.heatmap.scale })).toBeInTheDocument();
    expect(container.querySelectorAll('.heatmap__swatch')).toHaveLength(4);
  });

  it('con `showLegend` en false no hay leyenda', () => {
    render(<Heatmap {...base} label="Competencias" showLegend={false} />);
    expect(screen.queryByRole('img', { name: ES.heatmap.scale })).not.toBeInTheDocument();
  });

  it('`formatValue` manda sobre el formato por defecto', () => {
    render(<Heatmap {...base} label="Competencias" formatValue={(v) => `${v} %`} />);
    const tabla = within(screen.getByRole('table', { name: 'Competencias' }));
    expect(tabla.getByText('4 %')).toBeInTheDocument();
  });
});

describe('Heatmap — escala divergente', () => {
  // Brecha de competencias: nivel real − nivel exigido.
  const BRECHA: HeatmapCell[] = [
    { rowId: 'p1', columnKey: 'react', value: -3 },
    { rowId: 'p1', columnKey: 'css', value: 0 },
    { rowId: 'p1', columnKey: 'sql', value: 3 },
    { rowId: 'p2', columnKey: 'react', value: -1 },
    { rowId: 'p2', columnKey: 'css', value: 2 },
    { rowId: 'p2', columnKey: 'sql', value: null },
  ];
  const divergente = { rows: FILAS, columns: COLUMNAS, cells: BRECHA, scale: 'diverging' as const, label: 'Brecha' };
  const celda = (texto: string) =>
    within(screen.getByRole('table', { name: 'Brecha' })).getByText(texto).closest('td');

  it('por defecto la escala es la secuencial: ninguna casilla toma un peldaño divergente', () => {
    const { container } = render(<Heatmap {...base} label="Competencias" />);
    expect(container.querySelector('[class*="heatmap__cell--diverging-"]')).toBeNull();
  });

  it('pinta el centro de neutro, los extremos en el último peldaño de cada brazo y lo de en medio por su distancia', () => {
    render(<Heatmap {...divergente} />);
    expect(celda('0')).toHaveClass('heatmap__cell--diverging-neutral');
    expect(celda('-3')).toHaveClass('heatmap__cell--diverging-warm-3');
    expect(celda('3')).toHaveClass('heatmap__cell--diverging-cool-3');
    expect(celda('-1')).toHaveClass('heatmap__cell--diverging-warm-1');
    expect(celda('2')).toHaveClass('heatmap__cell--diverging-cool-2');
  });

  it('la casilla sin dato mantiene su trama, también en la divergente', () => {
    const { container } = render(<Heatmap {...divergente} />);
    expect(container.querySelectorAll('.heatmap__cell--empty')).toHaveLength(1);
  });

  it('`midpoint` mueve el centro', () => {
    render(<Heatmap {...divergente} midpoint={2} min={-1} max={5} />);
    expect(celda('2')).toHaveClass('heatmap__cell--diverging-neutral');
    expect(celda('-3')).toHaveClass('heatmap__cell--diverging-warm-3');
  });

  it('`divergingDirection="warm-above"` invierte los brazos', () => {
    render(<Heatmap {...divergente} divergingDirection="warm-above" />);
    expect(celda('-3')).toHaveClass('heatmap__cell--diverging-cool-3');
    expect(celda('3')).toHaveClass('heatmap__cell--diverging-warm-3');
  });

  it('la leyenda enseña los dos brazos y el centro, del valor más bajo al más alto', () => {
    const { container } = render(<Heatmap {...divergente} />);
    const peldaños = [...container.querySelectorAll('.heatmap__swatch')].map((s) =>
      [...s.classList].find((c) => c.startsWith('heatmap__swatch--'))?.replace('heatmap__swatch--diverging-', ''),
    );
    expect(peldaños).toEqual(['warm-3', 'warm-2', 'warm-1', 'neutral', 'cool-1', 'cool-2', 'cool-3']);
    const leyenda = container.querySelector('.heatmap__legend');
    expect(leyenda).toHaveTextContent('-3');
    expect(leyenda).toHaveTextContent('3');
    expect(leyenda).toHaveTextContent(ES.heatmap.midpoint!('0'));
  });

  it('`midpointLabel` sustituye el rótulo del centro', () => {
    render(<Heatmap {...divergente} midpointLabel="Lo exigido" />);
    expect(screen.getByText('Lo exigido')).toBeInTheDocument();
  });

  it('un catálogo sin `heatmap.midpoint` sigue valiendo para la secuencial y para la divergente sin leyenda', () => {
    const { midpoint: _sinCentro, ...heatmapSinCentro } = ES.heatmap;
    void _sinCentro;
    const anterior = { ...ES, heatmap: heatmapSinCentro };
    renderRTL(
      <BrandMessagesProvider messages={anterior}>
        <Heatmap {...base} label="Competencias" />
        <Heatmap {...divergente} showLegend={false} />
      </BrandMessagesProvider>,
    );
    expect(screen.getByRole('table', { name: 'Competencias' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Brecha' })).toBeInTheDocument();
  });
});
