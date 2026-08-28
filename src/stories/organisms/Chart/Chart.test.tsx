import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Chart, type ChartDatum, type ChartSeries } from './Chart';

const porciones: ChartDatum[] = [
  { paso: 'Visitas', personas: 400 },
  { paso: 'Registros', personas: 100 },
];
const seriePorciones: ChartSeries[] = [{ key: 'personas', label: 'Personas' }];

const nube: ChartDatum[] = [
  { minutos: 20, nota: 4 },
  { minutos: 80, nota: 8 },
];
const serieNube: ChartSeries[] = [{ key: 'nota', label: 'Nota' }];

const competencias: ChartDatum[] = [
  { competencia: 'Análisis', antes: 3, despues: 7 },
  { competencia: 'Diseño', antes: 4, despues: 8 },
];
const seriesCompetencias: ChartSeries[] = [
  { key: 'antes', label: 'Al empezar' },
  { key: 'despues', label: 'Al terminar' },
];

describe('Chart — color por dato', () => {
  it('la paleta de dato gana a la ranura de token', () => {
    const { container } = render(
      <Chart type="bar" data={porciones} series={seriePorciones} xKey="paso"
        colors={['#1E7FF6']} ariaLabel="Barras" />,
    );
    expect(container.querySelector('.chart__bar')).toHaveStyle({ '--chart-mark-color': '#1E7FF6' });
  });

  it('el color propio de la serie gana a la paleta de dato', () => {
    const { container } = render(
      <Chart type="bar" data={porciones} series={[{ key: 'personas', label: 'Personas', color: '#123456' }]}
        xKey="paso" colors={['#1E7FF6']} ariaLabel="Barras" />,
    );
    expect(container.querySelector('.chart__bar')).toHaveStyle({ '--chart-mark-color': '#123456' });
  });

  it('sin paleta ni color, la serie toma su ranura de token', () => {
    const { container } = render(
      <Chart type="bar" data={porciones} series={seriePorciones} xKey="paso" ariaLabel="Barras" />,
    );
    expect(container.querySelector('.chart__bar')).toHaveStyle({ '--chart-mark-color': 'var(--chart-series-1)' });
  });
});

describe('Chart — formas nuevas', () => {
  it('funnel pinta un tramo por fila', () => {
    const { container } = render(
      <Chart type="funnel" data={porciones} series={seriePorciones} xKey="paso" ariaLabel="Embudo" />,
    );
    expect(container.querySelectorAll('.chart__funnel-step')).toHaveLength(2);
  });

  it('treemap pinta una baldosa por fila con valor', () => {
    const { container } = render(
      <Chart type="treemap" data={porciones} series={seriePorciones} xKey="paso" ariaLabel="Treemap" />,
    );
    expect(container.querySelectorAll('.chart__tile')).toHaveLength(2);
  });

  it('radial-bar pinta un carril y un anillo por fila', () => {
    const { container } = render(
      <Chart type="radial-bar" data={porciones} series={seriePorciones} xKey="paso" ariaLabel="Anillos" />,
    );
    expect(container.querySelectorAll('.chart__radial-track')).toHaveLength(2);
    expect(container.querySelectorAll('.chart__radial-bar')).toHaveLength(2);
  });

  it('scatter pinta un punto por fila y no une nada', () => {
    const { container } = render(
      <Chart type="scatter" data={nube} series={serieNube} xKey="minutos" ariaLabel="Nube" />,
    );
    expect(container.querySelectorAll('.chart__point')).toHaveLength(2);
    expect(container.querySelectorAll('.chart__line')).toHaveLength(0);
  });

  it('radar pinta un polígono por serie', () => {
    const { container } = render(
      <Chart type="radar" data={competencias} series={seriesCompetencias} xKey="competencia" ariaLabel="Radar" />,
    );
    expect(container.querySelectorAll('.chart__radar-shape')).toHaveLength(2);
  });
});

describe('Chart — tabla equivalente por familia', () => {
  it('las formas de porción llevan columna de valor y de porcentaje', () => {
    render(<Chart type="funnel" data={porciones} series={seriePorciones} xKey="paso" ariaLabel="Embudo" />);
    const tabla = screen.getByRole('table', { name: 'Datos del gráfico' });
    expect(within(tabla).getByRole('columnheader', { name: 'Valor' })).toBeInTheDocument();
    expect(within(tabla).getByRole('columnheader', { name: 'Porcentaje' })).toBeInTheDocument();
  });

  it('el radar lleva una columna por serie, como el resto de cartesianos', () => {
    render(<Chart type="radar" data={competencias} series={seriesCompetencias} xKey="competencia" ariaLabel="Radar" />);
    const tabla = screen.getByRole('table', { name: 'Datos del gráfico' });
    expect(within(tabla).getByRole('columnheader', { name: 'Al empezar' })).toBeInTheDocument();
    expect(within(tabla).getByRole('columnheader', { name: 'Al terminar' })).toBeInTheDocument();
  });

  it('cada forma nueva sigue siendo una imagen con nombre', () => {
    render(<Chart type="treemap" data={porciones} series={seriePorciones} xKey="paso" ariaLabel="Reparto por área" />);
    expect(screen.getByRole('img', { name: 'Reparto por área' })).toBeInTheDocument();
  });
});
