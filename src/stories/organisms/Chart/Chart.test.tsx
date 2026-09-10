import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
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

// El color no viaja nunca en un atributo `style` (una app con `style-src
// 'self'` lo descartaría): el de dato va como atributo de presentación de SVG
// y la ranura de token, en `data-slot`.
describe('Chart — color por dato', () => {
  it('la paleta de dato gana a la ranura de token', () => {
    const { container } = render(
      <Chart type="bar" data={porciones} series={seriePorciones} xKey="paso"
        colors={['#1E7FF6']} ariaLabel="Barras" />,
    );
    const bar = container.querySelector('.chart__bar');
    expect(bar).toHaveAttribute('fill', '#1E7FF6');
    expect(bar).not.toHaveAttribute('data-slot');
  });

  it('el color propio de la serie gana a la paleta de dato', () => {
    const { container } = render(
      <Chart type="bar" data={porciones} series={[{ key: 'personas', label: 'Personas', color: '#123456' }]}
        xKey="paso" colors={['#1E7FF6']} ariaLabel="Barras" />,
    );
    const bar = container.querySelector('.chart__bar');
    expect(bar).toHaveAttribute('fill', '#123456');
    expect(bar).not.toHaveAttribute('data-slot');
  });

  it('sin paleta ni color, la serie toma su ranura de token', () => {
    const { container } = render(
      <Chart type="bar" data={porciones} series={seriePorciones} xKey="paso" ariaLabel="Barras" />,
    );
    const bar = container.querySelector('.chart__bar');
    expect(bar).toHaveAttribute('data-slot', '1');
    expect(bar).not.toHaveAttribute('fill');
  });
});

// Lo que importa es el HTML del servidor: una app con `style-src 'self'` (sin
// `style-src-attr 'unsafe-inline'`) descarta ahí todo atributo `style`, sin
// violación en consola. Lo que el componente escriba después por el CSSOM no
// pasa por esa puerta.
describe('Chart — sin atributo style en el HTML del servidor', () => {
  it('ni las marcas ni las muestras salen con style, ni con paleta de dato', () => {
    const html = renderToStaticMarkup(
      <Chart type="bar" data={porciones} series={seriePorciones} xKey="paso"
        colors={['#1E7FF6']} ariaLabel="Barras" />,
    );
    expect(html).not.toContain('style=');
  });

  it('tampoco las formas de porción, que colorean por categoría', () => {
    const html = renderToStaticMarkup(
      <Chart type="treemap" data={porciones} series={seriePorciones} xKey="paso" ariaLabel="Treemap" />,
    );
    expect(html).not.toContain('style=');
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
