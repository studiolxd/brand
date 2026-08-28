import { forwardRef, type CSSProperties } from 'react';
import './Sparkline.css';

export interface SparklineProps extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'values' | 'color'> {
  /** Serie a dibujar, en orden. Doce puntos es la longitud de referencia. */
  values: number[];
  /** Trazo suelto o trazo con velo por debajo. Default `line`. */
  type?: 'line' | 'area';
  /** Ancho en px. Default 80, espejo de `--sparkline-width`. */
  width?: number;
  /** Alto en px. Default 24, espejo de `--sparkline-height`. */
  height?: number;
  /** Punto al final de la serie, en el color de acento. Default `true`. */
  marker?: boolean;
  /** Línea del cero cuando la serie lo cruza. Default `true`. */
  baseline?: boolean;
  /**
   * Color del trazo. Solo una referencia a token (`'var(--chart-series-3)'`).
   * Sin este dato, la chispa va en el gris de atenuación: el dato que se lee es
   * la cifra que tiene al lado.
   */
  color?: string;
  /**
   * Descripción para lectores de pantalla. Sin ella la chispa se marca como
   * decorativa —lo correcto dentro de un `StatTile`, donde la cifra y su
   * variación ya dicen lo que la chispa enseña—.
   */
  ariaLabel?: string;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/** Espejo en JS de los tokens `--sparkline-*` que hacen falta para calcular la geometría. */
const GEOMETRY = {
  /** `--sparkline-width` */ width: 80,
  /** `--sparkline-height` */ height: 24,
  /** `--sparkline-marker-size` */ markerSize: 8,
} as const;

/**
 * La chispa: una serie diminuta sin ejes ni rótulos, para acompañar a una cifra
 * dentro de un `StatTile`. No es un gráfico —no se leen valores en ella—, es la
 * forma de la tendencia.
 */
export const Sparkline = forwardRef<SVGSVGElement, SparklineProps>(function Sparkline({
  values,
  type = 'line',
  width = GEOMETRY.width,
  height = GEOMETRY.height,
  marker = true,
  baseline = true,
  color,
  ariaLabel,
  className,
  ...rest
}, ref) {
  const classes = ['sparkline', `sparkline--${type}`, className].filter(Boolean).join(' ');
  const clean = values.filter((v) => Number.isFinite(v));
  const pad = GEOMETRY.markerSize / 2;
  const min = clean.length ? Math.min(...clean) : 0;
  const max = clean.length ? Math.max(...clean) : 1;
  const span = max - min || 1;
  const style = color ? ({ '--sparkline-mark-color': color } as CSSProperties) : undefined;

  const points = clean.map((value, i) => ({
    x: pad + (clean.length > 1 ? (i * (width - pad * 2)) / (clean.length - 1) : (width - pad * 2) / 2),
    y: height - pad - ((value - min) / span) * (height - pad * 2),
  }));
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const last = points[points.length - 1];
  const crossesZero = min < 0 && max > 0;
  const zeroY = height - pad - ((0 - min) / span) * (height - pad * 2);

  if (points.length === 0) return null;

  return (
    <svg
      ref={ref}
      className={classes}
      style={style}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      {...rest}
    >
      {baseline && crossesZero ? <line className="sparkline__baseline" x1={0} y1={zeroY} x2={width} y2={zeroY} /> : null}
      {type === 'area' && last ? (
        <path className="sparkline__area" d={`${line} L ${last.x} ${height} L ${points[0]?.x ?? 0} ${height} Z`} />
      ) : null}
      <path className="sparkline__line" d={line} />
      {marker && last ? <circle className="sparkline__marker" cx={last.x} cy={last.y} r={GEOMETRY.markerSize / 2} /> : null}
    </svg>
  );
});
