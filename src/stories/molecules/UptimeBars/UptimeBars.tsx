'use client';

import { forwardRef, useRef, useState, type ComponentPropsWithoutRef, type KeyboardEvent, type ReactNode } from 'react';
import { Tooltip } from '../../atoms/Tooltip/Tooltip';
import { UPTIME_BARS_DEFAULT_THRESHOLDS, uptimeStatus, type UptimeBarsThresholds } from './uptimeStatus';
import './UptimeBars.css';

export type { UptimeBarsThresholds, UptimeBarsStatus } from './uptimeStatus';

/** Un punto de la serie: un día, una hora, un despliegue. La tira no lo sabe. */
export interface UptimeBarsPoint {
  /**
   * Porcentaje de disponibilidad del punto, de 0 a 100. `null` es **sin dato**
   * —el monitor todavía no existía—, que no es lo mismo que 0 %.
   */
  value: number | null;
  /** Cómo se llama el punto, ya escrito: «5 de septiembre». */
  label: string;
  /** Una línea de detalle para el bocadillo: «Sin incidencias», «Caído 2 h 14 min». */
  detail?: string;
}


export interface UptimeBarsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** La serie, en orden: el punto más antiguo primero. */
  points: UptimeBarsPoint[];
  /**
   * La media del periodo, **ya escrita** por quien la calcula («99,98 % de
   * disponibilidad»). Es obligatoria porque es la alternativa principal a la
   * tira: el dato que se lee sin mirar treinta rectángulos ni abrir un bocadillo.
   */
  summary: ReactNode;
  /** Nombre accesible de la tira. Default castellano: «Disponibilidad». */
  label?: string;
  /** Rótulo del extremo antiguo, bajo la primera barrita: «Hace 30 días». */
  startLabel?: ReactNode;
  /** Rótulo del extremo reciente, bajo la última barrita: «Hoy». */
  endLabel?: ReactNode;
  /** Cortes de color. Sin ellos, `UPTIME_BARS_DEFAULT_THRESHOLDS`. */
  thresholds?: UptimeBarsThresholds;
  /** Locale para formatear el porcentaje. Default `'es-ES'`. */
  locale?: string;
  /** Decimales del porcentaje. Default 2. */
  maximumFractionDigits?: number;
  /**
   * Nombre accesible de cada barrita. Recibe el punto y su porcentaje ya
   * formateado (`null` cuando no hay dato). Default castellano:
   * «5 de septiembre: 100 %. Sin incidencias».
   */
  pointLabel?: (point: UptimeBarsPoint, formattedValue: string | null) => string;
  /** Cómo se dice que un punto no tiene dato. Default castellano: «sin datos». */
  noDataLabel?: string;
  /**
   * Bocadillo por barrita, con ratón y con teclado. Default `true`. Sin él las
   * barritas dejan de recibir el foco: el detalle sigue en el nombre accesible,
   * que un lector de pantalla recorre sin necesidad de tabular.
   */
  tooltips?: boolean;
}


/**
 * La tira de disponibilidad: una barrita por punto de la serie y la media del
 * periodo debajo.
 *
 * **No sabe de tiempo ni de dónde salen los datos.** No hay días, ni monitores,
 * ni husos horarios: recibe N puntos con su porcentaje y su etiqueta, y pinta.
 * Quien la usa decide si un punto es un día o una hora, y escribe las fechas.
 *
 * La lectura no depende del color: cada barrita lleva su nombre accesible
 * completo, la serie es una lista ordenada y la media va siempre en texto.
 */
export const UptimeBars = forwardRef<HTMLDivElement, UptimeBarsProps>(function UptimeBars({
  points,
  summary,
  label = 'Disponibilidad',
  startLabel,
  endLabel,
  thresholds,
  locale = 'es-ES',
  maximumFractionDigits = 2,
  pointLabel,
  noDataLabel = 'sin datos',
  tooltips = true,
  className,
  ...rest
}, ref) {
  const cuts = { ...UPTIME_BARS_DEFAULT_THRESHOLDS, ...thresholds };
  const bars = useRef<(HTMLElement | null)[]>([]);
  // Tabulación itinerante: la tira entera es **una** parada de tabulador y las
  // flechas recorren las barritas. Con 30 puntos por servicio, una parada por
  // barrita convertiría un panel de estado en cientos de tabulaciones.
  const [active, setActive] = useState(0);

  const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits });
  const format = (value: number | null) => (value === null || !Number.isFinite(value) ? null : percent.format(value / 100));

  const name = (point: UptimeBarsPoint, formatted: string | null) => {
    if (pointLabel) return pointLabel(point, formatted);
    const head = `${point.label}: ${formatted ?? noDataLabel}`;
    return point.detail ? `${head}. ${point.detail}` : head;
  };

  const focusBar = (index: number) => {
    const next = Math.max(0, Math.min(points.length - 1, index));
    setActive(next);
    bars.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (step) {
      event.preventDefault();
      focusBar(index + step);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      focusBar(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusBar(points.length - 1);
    }
  };

  // El índice con foco tabulable, acotado por si la serie ha encogido.
  const tabbable = Math.max(0, Math.min(active, points.length - 1));

  return (
    <div ref={ref} className={['uptime-bars', className].filter(Boolean).join(' ')} {...rest}>
      <ol className="uptime-bars__list" aria-label={label}>
        {points.map((point, index) => {
          const formatted = format(point.value);
          const status = uptimeStatus(point.value, cuts);
          const bar = (
            <span
              className={`uptime-bars__bar uptime-bars__bar--${status}`}
              role="img"
              aria-label={name(point, formatted)}
              tabIndex={tooltips ? (index === tabbable ? 0 : -1) : undefined}
              onKeyDown={tooltips ? (event) => onKeyDown(event, index) : undefined}
              onFocus={tooltips ? () => setActive(index) : undefined}
            />
          );

          return (
            <li className="uptime-bars__item" key={`${point.label}-${index}`}>
              {tooltips ? (
                <Tooltip
                  ref={(element) => {
                    bars.current[index] = element;
                  }}
                  label={
                    <span className="uptime-bars__tooltip">
                      <span className="uptime-bars__tooltip-label">{point.label}</span>
                      <span>{formatted ?? noDataLabel}</span>
                      {point.detail ? <span>{point.detail}</span> : null}
                    </span>
                  }
                >
                  {bar}
                </Tooltip>
              ) : (
                bar
              )}
            </li>
          );
        })}
      </ol>

      {/* El pie va siempre: la media es la alternativa en texto a la tira. Los
          extremos son opcionales, pero sus celdas se quedan para que la media
          caiga centrada bajo las barritas. */}
      <p className="uptime-bars__footer">
        <span className="uptime-bars__edge">{startLabel}</span>
        <span className="uptime-bars__summary">{summary}</span>
        <span className="uptime-bars__edge uptime-bars__edge--end">{endLabel}</span>
      </p>
    </div>
  );
});
