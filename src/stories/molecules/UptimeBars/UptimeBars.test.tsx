import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UptimeBars, type UptimeBarsPoint } from './UptimeBars';
import { uptimeStatus, UPTIME_BARS_DEFAULT_THRESHOLDS } from './uptimeStatus';

/** El mismo formato que pinta la tira: el porcentaje lleva espacio duro. */
const pct = (n: number, locale = 'es-ES') =>
  new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(n / 100);

const punto = (value: number | null, label: string, detail?: string): UptimeBarsPoint => ({ value, label, detail });

const SERIE: UptimeBarsPoint[] = [
  punto(null, '1 de septiembre'),
  punto(100, '2 de septiembre', 'Sin incidencias'),
  punto(97, '3 de septiembre', 'Caído 43 min'),
  punto(80, '4 de septiembre', 'Caído 4 h 48 min'),
];

describe('uptimeStatus', () => {
  const cortes = UPTIME_BARS_DEFAULT_THRESHOLDS;

  it('reparte los tres tramos por los cortes por defecto', () => {
    expect(uptimeStatus(100, cortes)).toBe('ok');
    expect(uptimeStatus(99.65, cortes)).toBe('ok');
    expect(uptimeStatus(99.64, cortes)).toBe('degraded');
    expect(uptimeStatus(95.83, cortes)).toBe('degraded');
    expect(uptimeStatus(95.82, cortes)).toBe('down');
    expect(uptimeStatus(0, cortes)).toBe('down');
  });

  it('sin dato no es 0 %', () => {
    expect(uptimeStatus(null, cortes)).toBe('empty');
    expect(uptimeStatus(Number.NaN, cortes)).toBe('empty');
  });
});

describe('UptimeBars', () => {
  it('anuncia la serie como lista con nombre y una barrita por punto', () => {
    render(<UptimeBars points={SERIE} summary="93,4 % de disponibilidad" label="Disponibilidad de Bricks" />);
    expect(screen.getByRole('list', { name: 'Disponibilidad de Bricks' })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  it('da a cada barrita su nombre accesible completo, con el detalle', () => {
    render(<UptimeBars points={SERIE} summary="93,4 %" />);
    expect(screen.getByRole('img', { name: `2 de septiembre: ${pct(100)}. Sin incidencias` })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: `4 de septiembre: ${pct(80)}. Caído 4 h 48 min` })).toBeInTheDocument();
  });

  it('el punto sin dato se anuncia «sin datos», no 0 %', () => {
    render(<UptimeBars points={SERIE} summary="93,4 %" />);
    expect(screen.getByRole('img', { name: '1 de septiembre: sin datos' })).toBeInTheDocument();
  });

  it('pinta cada tramo con su clase, y el sin dato con la suya', () => {
    const { container } = render(<UptimeBars points={SERIE} summary="93,4 %" />);
    const clases = [...container.querySelectorAll('.uptime-bars__bar')].map((b) => b.className);
    expect(clases[0]).toContain('uptime-bars__bar--empty');
    expect(clases[1]).toContain('uptime-bars__bar--ok');
    expect(clases[2]).toContain('uptime-bars__bar--degraded');
    expect(clases[3]).toContain('uptime-bars__bar--down');
  });

  it('mueve los cortes cuando se los pasan', () => {
    const { container } = render(
      <UptimeBars points={SERIE} summary="93,4 %" thresholds={{ ok: 100, degraded: 90 }} />,
    );
    const clases = [...container.querySelectorAll('.uptime-bars__bar')].map((b) => b.className);
    expect(clases[1]).toContain('uptime-bars__bar--ok');
    expect(clases[2]).toContain('uptime-bars__bar--degraded');
    expect(clases[3]).toContain('uptime-bars__bar--down');
  });

  it('escribe la media siempre, en texto', () => {
    render(<UptimeBars points={SERIE} summary="93,4 % de disponibilidad" startLabel="Hace 4 días" endLabel="Hoy" />);
    expect(screen.getByText('93,4 % de disponibilidad')).toBeInTheDocument();
    expect(screen.getByText('Hace 4 días')).toBeInTheDocument();
    expect(screen.getByText('Hoy')).toBeInTheDocument();
  });

  it('es una sola parada de tabulador: solo la barrita activa es tabulable', () => {
    render(<UptimeBars points={SERIE} summary="93,4 %" />);
    const barritas = screen.getAllByRole('img');
    expect(barritas.filter((b) => b.getAttribute('tabindex') === '0')).toHaveLength(1);
    expect(barritas[0]).toHaveAttribute('tabindex', '0');
    expect(barritas[1]).toHaveAttribute('tabindex', '-1');
  });

  it('sin bocadillos las barritas no reciben el foco, pero siguen anunciándose', () => {
    render(<UptimeBars points={SERIE} summary="93,4 %" tooltips={false} />);
    const barritas = screen.getAllByRole('img');
    expect(barritas.every((b) => !b.hasAttribute('tabindex'))).toBe(true);
    expect(screen.getByRole('img', { name: `2 de septiembre: ${pct(100)}. Sin incidencias` })).toBeInTheDocument();
  });

  it('deja traducir el nombre de la barrita con `pointLabel`', () => {
    render(
      <UptimeBars
        points={SERIE}
        summary="93,4 %"
        locale="en-GB"
        pointLabel={(point, formatted) => `${point.label} — ${formatted ?? 'no data'}`}
      />,
    );
    expect(screen.getByRole('img', { name: '1 de septiembre — no data' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: `2 de septiembre — ${pct(100, 'en-GB')}` })).toBeInTheDocument();
  });
});
