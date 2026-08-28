'use client';

import { forwardRef, useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Inline } from '../../atoms/Inline/Inline';
import { Tag } from '../../atoms/Tag/Tag';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Chart.css';

export type ChartType =
  | 'line' | 'area' | 'bar' | 'scatter'
  | 'pie' | 'donut' | 'funnel' | 'treemap' | 'radial-bar'
  | 'radar';

export interface ChartSeries {
  /** Clave del valor dentro de cada fila de `data`. */
  key: string;
  /** Nombre que se lee en la leyenda, el bocadillo y la tabla. */
  label: string;
  /**
   * Color de la serie. Lo normal es una **referencia a token**
   * (`'var(--chart-series-3)'` o una custom property del producto): la interfaz
   * del sistema no tiene colores cableados.
   *
   * Admite además un **color literal** cuando el color es *dato*, no diseño: lo
   * que el autor de un contenido eligió desde la paleta de su tema. Ver
   * `colors` y la sección «Color por dato» de la documentación.
   *
   * Sin este dato, la serie toma la ranura que le corresponde por orden
   * (`--chart-series-1`…`8`).
   */
  color?: string;
}

export type ChartDatum = Record<string, string | number | null | undefined>;

/** Etiquetas directas de valor. Nunca hay una cifra en cada punto salvo que se pida. */
export type ChartValueLabels = 'none' | 'last' | 'extremes' | 'all';

export interface ChartProps extends Omit<React.ComponentPropsWithoutRef<'figure'>, 'title'> {
  /** Forma del gráfico. Por defecto `line`. */
  type?: ChartType;
  /** Filas de datos. Cada fila trae la posición X y un valor por serie. */
  data: ChartDatum[];
  /**
   * Series a pintar, en orden. El orden es el que asigna las ranuras de color:
   * la identidad sigue a la entidad, así que filtrar series no repinta a las
   * que quedan. A partir de la novena, la serie se pinta con el gris de «Otros».
   */
  series: ChartSeries[];
  /** Clave de la posición X (o de la categoría, en los gráficos de porción). */
  xKey: string;
  /**
   * **Color por dato**: paleta por posición, en colores literales. La entrada
   * `colors[i]` pinta la serie `i` —o, en los gráficos de porción, la categoría
   * `i`—, por encima de la ranura de token que le tocaría por orden y por
   * debajo del `color` propio de la serie.
   *
   * Es la vía para el caso en que el color **es dato**: el que eligió el autor
   * de un contenido desde la paleta de su tema. Para la interfaz del sistema,
   * las ranuras de token siguen siendo lo correcto.
   */
  colors?: string[];
  /** Barras verticales (columnas) u horizontales. Horizontal para categorías con nombre largo. */
  orientation?: 'vertical' | 'horizontal';
  /** Apila las series en vez de agruparlas. Solo `bar` y `area`. */
  stacked?: boolean;
  /**
   * Patrón de énfasis: la serie indicada (o, en `pie`/`donut`, la categoría)
   * mantiene su color y el resto pasa al gris de atenuación.
   */
  emphasis?: string;
  /** Alto del área de dibujo en px. La banda del eje X va aparte. Default 256. */
  height?: number;
  /**
   * Descripción del gráfico para lectores de pantalla. Obligatoria: el lienzo
   * es una imagen y la tabla equivalente va oculta debajo.
   */
  ariaLabel: string;
  /** Título visible del gráfico, en el `<figcaption>`. */
  title?: ReactNode;
  /** Texto al pie del gráfico, bajo la leyenda. */
  caption?: ReactNode;
  /** Formateo de valores. Default: `Intl.NumberFormat(locale)`. */
  formatValue?: (value: number, series?: ChartSeries) => string;
  /** Formateo de la posición X. Default: el valor tal cual. */
  formatX?: (value: string | number) => string;
  /** Número orientativo de marcas del eje de valores. Default 5. */
  yTicks?: number;
  /** Leyenda. Default: hay leyenda desde dos series (con una, el título ya la nombra). */
  legend?: boolean;
  /** Rejilla del eje de valores. Default `true`. */
  grid?: boolean;
  /** Bocadillo al pasar el puntero y al enfocar con el teclado. Default `true`. */
  tooltip?: boolean;
  /** Etiquetas directas de valor. Default: `last` en línea y área, `none` en el resto. */
  valueLabels?: ChartValueLabels;
  /** Locale con el que se formatean los números. Default `'es-ES'`. */
  locale?: string;
  /** Título de la tabla equivalente oculta. Default: «Datos del gráfico» (castellano). */
  tableCaption?: string;
  /**
   * Frase que describe el gráfico para quien lo enfoca. Default: «Los datos
   * completos están en la tabla que sigue; flechas para recorrer el gráfico.»
   * (castellano).
   */
  tableHint?: string;
  /** Encabezado de la primera columna de la tabla. Default: «Categoría» (castellano). */
  categoryLabel?: string;
  /** Encabezado de la columna de valores en `pie`/`donut`. Default: «Valor» (castellano). */
  valueLabel?: string;
  /** Encabezado de la columna de porcentaje en `pie`/`donut`. Default: «Porcentaje» (castellano). */
  shareLabel?: string;
  /** Texto cuando no hay datos. Default: «Sin datos que mostrar» (castellano). */
  emptyMessage?: string;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

/**
 * Geometría de las marcas: espejo en JS de los tokens `--chart-*`. El color, el
 * trazo y la tipografía los pone el CSS por token; estos números son los que
 * hacen falta para calcular una `d` de path o el ancho de una banda, que no se
 * puede escribir en CSS. Si cambia el token, cambia aquí.
 */
const GEOMETRY = {
  /** `--chart-bar-radius` */ barRadius: 4,
  /** `--chart-bar-thickness-max` */ barMaxThickness: 24,
  /** `--chart-mark-gap` */ markGap: 2,
  /** `--chart-marker-size` */ markerSize: 8,
  /** `--chart-label-font-size` */ labelFontSize: 14,
  /** `--chart-padding-block` / `--chart-padding-inline` */ padding: 8,
  /** `--chart-axis-gap` */ axisGap: 8,
  /** `--chart-donut-thickness` */ donutThickness: 0.55,
  /** `--chart-funnel-gap` */ funnelGap: 4,
  /** `--chart-treemap-gap` */ treemapGap: 2,
  /** `--chart-radial-bar-gap` */ radialBarGap: 4,
  /** `--chart-dot-size` */ dotSize: 10,
} as const;

/** Ancho aproximado de un carácter del rótulo: basta para reservar la calle del eje. */
const CHAR_WIDTH = GEOMETRY.labelFontSize * 0.6;
const FALLBACK_WIDTH = 640;
const SLOTS = 8;

function toNumber(value: ChartDatum[string]): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function xValue(row: ChartDatum, xKey: string): string | number {
  const raw = row[xKey];
  return typeof raw === 'number' ? raw : String(raw ?? '');
}

/**
 * Color de una marca, por prioridad: el `color` propio de la serie, la paleta de
 * dato (`colors`) y, si no hay ninguno, la ranura de token que toca por orden.
 * Pasada la octava, la marca es «Otros»: gris.
 */
function markStyle(index: number, color?: string, palette?: string[]): CSSProperties {
  const slot = color
    ?? palette?.[index]
    ?? (index < SLOTS ? `var(--chart-series-${index + 1})` : 'var(--chart-muted-color)');
  return { '--chart-mark-color': slot } as CSSProperties;
}

/** Trapecio de un tramo de embudo: ancho superior e inferior distintos, centrados. */
function funnelPath(cx: number, y: number, h: number, wTop: number, wBottom: number): string {
  return `M ${cx - wTop / 2} ${y} L ${cx + wTop / 2} ${y} L ${cx + wBottom / 2} ${y + h} L ${cx - wBottom / 2} ${y + h} Z`;
}

interface TreemapRect { x: number; y: number; w: number; h: number; index: number }

/**
 * Treemap por el algoritmo *squarified*: reparte el área en filas eligiendo, en
 * cada paso, la que deja los rectángulos más cerca del cuadrado. Sin librería:
 * es la única forma del catálogo que necesita un reparto de área, y son treinta
 * líneas.
 */
function squarify(values: { value: number; index: number }[], x: number, y: number, w: number, h: number): TreemapRect[] {
  const total = values.reduce((a, v) => a + v.value, 0);
  if (total <= 0 || w <= 0 || h <= 0) return [];
  const area = w * h;
  const escalados = values.map((v) => ({ ...v, area: (v.value / total) * area }));
  const salida: TreemapRect[] = [];

  let cx = x, cy = y, cw = w, ch = h;
  let fila: typeof escalados = [];
  let restantes = [...escalados];

  /** Peor proporción de la fila si se coloca en el lado corto. */
  const peor = (candidata: typeof escalados, lado: number) => {
    const suma = candidata.reduce((a, v) => a + v.area, 0);
    if (suma <= 0) return Infinity;
    const max = Math.max(...candidata.map((v) => v.area));
    const min = Math.min(...candidata.map((v) => v.area));
    return Math.max((lado * lado * max) / (suma * suma), (suma * suma) / (lado * lado * min));
  };

  const colocar = () => {
    const suma = fila.reduce((a, v) => a + v.area, 0);
    const horizontal = cw >= ch;
    const grosor = horizontal ? suma / ch : suma / cw;
    let avance = 0;
    fila.forEach((v) => {
      const largo = (horizontal ? ch : cw) * (v.area / suma);
      salida.push(horizontal
        ? { x: cx, y: cy + avance, w: grosor, h: largo, index: v.index }
        : { x: cx + avance, y: cy, w: largo, h: grosor, index: v.index });
      avance += largo;
    });
    if (horizontal) { cx += grosor; cw -= grosor; } else { cy += grosor; ch -= grosor; }
    fila = [];
  };

  while (restantes.length > 0) {
    const lado = Math.min(cw, ch);
    const siguiente = restantes[0];
    if (!siguiente) break;
    if (fila.length === 0 || peor([...fila, siguiente], lado) <= peor(fila, lado)) {
      fila.push(siguiente);
      restantes = restantes.slice(1);
    } else {
      colocar();
    }
  }
  if (fila.length > 0) colocar();
  return salida;
}

/** Marcas de eje en cifras redondas, incluyendo siempre el cero. */
function niceTicks(min: number, max: number, count: number): number[] {
  const lo = Math.min(0, min);
  const hi = Math.max(0, max);
  if (hi === lo) return [0, 1];
  const rawStep = (hi - lo) / Math.max(1, count);
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rawStep) ?? magnitude * 10;
  const start = Math.floor(lo / step) * step;
  const end = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Math.round(v / step) * step);
  return ticks;
}

/**
 * Barra con el extremo de dato redondeado y el de la línea base recto. `side`
 * dice hacia dónde crece el dato.
 */
function barPath(x: number, y: number, w: number, h: number, side: 'top' | 'bottom' | 'left' | 'right'): string {
  if (w <= 0 || h <= 0) return '';
  const r = Math.max(0, Math.min(GEOMETRY.barRadius, side === 'top' || side === 'bottom' ? h : w, (side === 'top' || side === 'bottom' ? w : h) / 2));
  switch (side) {
    case 'top':
      return `M ${x} ${y + h} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h} Z`;
    case 'bottom':
      return `M ${x} ${y} L ${x} ${y + h - r} Q ${x} ${y + h} ${x + r} ${y + h} L ${x + w - r} ${y + h} Q ${x + w} ${y + h} ${x + w} ${y + h - r} L ${x + w} ${y} Z`;
    case 'right':
      return `M ${x} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${x} ${y + h} Z`;
    default:
      return `M ${x + w} ${y} L ${x + r} ${y} Q ${x} ${y} ${x} ${y + r} L ${x} ${y + h - r} Q ${x} ${y + h} ${x + r} ${y + h} L ${x + w} ${y + h} Z`;
  }
}

function arcPath(cx: number, cy: number, outer: number, inner: number, from: number, to: number): string {
  const large = to - from > Math.PI ? 1 : 0;
  const p = (r: number, a: number) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
  if (inner <= 0) {
    return `M ${cx} ${cy} L ${p(outer, from)} A ${outer} ${outer} 0 ${large} 1 ${p(outer, to)} Z`;
  }
  return `M ${p(outer, from)} A ${outer} ${outer} 0 ${large} 1 ${p(outer, to)} L ${p(inner, to)} A ${inner} ${inner} 0 ${large} 0 ${p(inner, from)} Z`;
}

/** Ancho real del lienzo. En servidor y en el primer render vale `fallback`. */
function useMeasuredWidth(fallback: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const measured = entries[0]?.contentRect.width;
      if (measured && measured > 0) setWidth(Math.round(measured));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/**
 * Gráfico de datos: línea, área, barras (verticales u horizontales, agrupadas o
 * apiladas), tarta y donut. Dibuja SVG a pelo —sin librería de gráficos— para
 * que todo el color y toda la tipografía salgan de tokens, el marcado sea BEM y
 * el primer render valga en servidor.
 *
 * Cada gráfico trae su **tabla equivalente oculta**: el bocadillo enriquece, no
 * franquea, y ningún valor depende de pasar el puntero.
 */
export const Chart = forwardRef<HTMLElement, ChartProps>(function Chart({
  type = 'line',
  data,
  series,
  xKey,
  colors,
  orientation = 'vertical',
  stacked = false,
  emphasis,
  height = 256,
  ariaLabel,
  title,
  caption,
  formatValue,
  formatX,
  yTicks = 5,
  legend,
  grid = true,
  tooltip = true,
  valueLabels,
  locale = 'es-ES',
  tableCaption = 'Datos del gráfico',
  tableHint = 'Los datos completos están en la tabla que sigue; flechas para recorrer el gráfico.',
  categoryLabel = 'Categoría',
  valueLabel = 'Valor',
  shareLabel = 'Porcentaje',
  emptyMessage = 'Sin datos que mostrar',
  className,
  ...rest
}, ref) {
  const [plotRef, width] = useMeasuredWidth(FALLBACK_WIDTH);
  const [active, setActive] = useState<number | null>(null);
  const hintId = useId();

  const numberFormat = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percentFormat = useMemo(() => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }), [locale]);
  const fmtValue = (value: number, s?: ChartSeries) => (formatValue ? formatValue(value, s) : numberFormat.format(value));
  const fmtX = (value: string | number) => (formatX ? formatX(value) : String(value));

  // Familias: qué comparte cada forma en escalas, ejes, leyenda y tabla.
  const isArc = type === 'pie' || type === 'donut';
  const isSlice = isArc || type === 'funnel' || type === 'treemap' || type === 'radial-bar';
  const isScatter = type === 'scatter';
  const isRadar = type === 'radar';
  /** Las formas de porción y el radar no llevan ejes cartesianos. */
  const isRadial = isSlice || isRadar;
  const showLegend = legend ?? (isSlice ? data.length > 1 : series.length > 1);
  const labels = valueLabels ?? (type === 'line' || type === 'area' ? 'last' : 'none');
  const rows = data;
  const empty = rows.length === 0 || series.length === 0;

  const classes = ['chart', `chart--${type}`, type === 'bar' ? `chart--${orientation}` : '', stacked ? 'chart--stacked' : '', className]
    .filter(Boolean)
    .join(' ');

  // ─── Escalas y geometría ────────────────────────────────────
  const values = rows.map((row) => series.map((s) => toNumber(row[s.key])));
  const stackTotals = values.map((row) => row.reduce((a, b) => a + b, 0));
  const flat = values.flat();
  const domainMin = flat.length ? Math.min(0, ...flat) : 0;
  const domainMax = stacked ? Math.max(0, ...stackTotals) : flat.length ? Math.max(0, ...flat) : 1;
  const ticks = niceTicks(domainMin, domainMax, yTicks);
  const scaleMin = ticks[0] ?? 0;
  const scaleMax = ticks[ticks.length - 1] ?? 1;
  const span = scaleMax - scaleMin || 1;

  const tickTexts = ticks.map((t) => fmtValue(t));
  // En dispersión el eje X es numérico: no hay categorías, hay una escala.
  const xNumbers = rows.map((row) => (typeof row[xKey] === 'number' ? (row[xKey] as number) : 0));
  const xTicks = isScatter ? niceTicks(Math.min(...xNumbers, 0), Math.max(...xNumbers, 1), yTicks) : [];
  const xScaleMin = xTicks[0] ?? 0;
  const xScaleMax = xTicks[xTicks.length - 1] ?? 1;
  const xSpan = xScaleMax - xScaleMin || 1;
  const categoryTexts = isScatter
    ? xTicks.map((t) => fmtValue(t))
    : rows.map((row) => fmtX(xValue(row, xKey)));
  const horizontal = type === 'bar' && orientation === 'horizontal';
  const gutterTexts = horizontal ? categoryTexts : tickTexts;
  const gutter = isRadial ? GEOMETRY.padding : GEOMETRY.padding + Math.max(...gutterTexts.map((t) => t.length), 1) * CHAR_WIDTH + GEOMETRY.axisGap;
  const bandHeight = isRadial ? 0 : Math.round(GEOMETRY.labelFontSize * 1.4) + GEOMETRY.axisGap;

  const x0 = gutter;
  const x1 = Math.max(x0 + 1, width - GEOMETRY.padding);
  const y0 = GEOMETRY.padding;
  const y1 = Math.max(y0 + 1, height - GEOMETRY.padding);
  const plotWidth = x1 - x0;
  const plotHeight = y1 - y0;
  const svgHeight = height + bandHeight;

  const valueToY = (v: number) => y1 - ((v - scaleMin) / span) * plotHeight;
  const valueToX = (v: number) => x0 + ((v - scaleMin) / span) * plotWidth;
  const zeroY = valueToY(0);
  const zeroX = valueToX(0);
  const bandSize = rows.length ? (horizontal ? plotHeight : plotWidth) / rows.length : 0;
  const pointX = (i: number) => (rows.length > 1 ? x0 + (i * plotWidth) / (rows.length - 1) : x0 + plotWidth / 2);
  const bandCenter = (i: number) => (horizontal ? y0 : x0) + bandSize * (i + 0.5);
  const scatterX = (v: number) => x0 + ((v - xScaleMin) / xSpan) * plotWidth;

  // ─── Radiales ───────────────────────────────────────────────
  const sliceKey = series[0]?.key ?? '';
  const sliceValues = rows.map((row) => toNumber(row[sliceKey]));
  const sliceTotal = sliceValues.reduce((a, b) => a + b, 0);
  const radius = Math.max(1, Math.min(plotWidth, plotHeight) / 2 - GEOMETRY.labelFontSize * 2);
  const centerX = x0 + plotWidth / 2;
  const centerY = y0 + plotHeight / 2;
  // Acumulado sin mutación: cada porción empieza donde acaban las anteriores.
  const slices = sliceValues.map((v, i) => {
    const before = sliceValues.slice(0, i).reduce((a, b) => a + b, 0);
    const from = -Math.PI / 2 + (sliceTotal > 0 ? (before / sliceTotal) * Math.PI * 2 : 0);
    const sweep = sliceTotal > 0 ? (v / sliceTotal) * Math.PI * 2 : 0;
    return { from, to: from + sweep, share: sliceTotal > 0 ? v / sliceTotal : 0 };
  });

  // Radar: un eje por fila, repartidos en la circunferencia desde arriba.
  const radarAxes = rows.map((_, i) => -Math.PI / 2 + (rows.length ? (i * Math.PI * 2) / rows.length : 0));
  const radarPoint = (value: number, i: number) => {
    const r = radius * Math.max(0, Math.min(1, scaleMax > 0 ? value / scaleMax : 0));
    const a = radarAxes[i] ?? 0;
    return { x: centerX + r * Math.cos(a), y: centerY + r * Math.sin(a) };
  };

  const isMuted = (key: string) => Boolean(emphasis) && emphasis !== key;

  // ─── Interacción ────────────────────────────────────────────
  /** La capa de impacto empieza en (x0, y0), así que su coordenada local ya es la del área de dibujo. */
  const indexFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isRadial || rows.length === 0) return null;
    const box = event.currentTarget.getBoundingClientRect();
    if (type === 'line' || type === 'area') {
      const local = event.clientX - box.left;
      const step = rows.length > 1 ? plotWidth / (rows.length - 1) : plotWidth;
      return Math.max(0, Math.min(rows.length - 1, Math.round(local / step)));
    }
    if (isScatter) {
      // No hay bandas: gana el punto cuya X cae más cerca del puntero.
      const local = event.clientX - box.left + x0;
      let mejor = 0;
      let distancia = Infinity;
      xNumbers.forEach((v, i) => {
        const d = Math.abs(scatterX(v) - local);
        if (d < distancia) { distancia = d; mejor = i; }
      });
      return mejor;
    }
    const local = horizontal ? event.clientY - box.top : event.clientX - box.left;
    return Math.max(0, Math.min(rows.length - 1, Math.floor(local / (bandSize || 1))));
  };

  const move = (delta: number) => {
    setActive((current) => {
      const next = (current ?? 0) + delta;
      return Math.max(0, Math.min(rows.length - 1, next));
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); move(1); }
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); move(-1); }
    else if (event.key === 'Home') { event.preventDefault(); setActive(0); }
    else if (event.key === 'End') { event.preventDefault(); setActive(rows.length - 1); }
    else if (event.key === 'Escape') setActive(null);
  };

  // ─── Marcas ─────────────────────────────────────────────────
  const marks: ReactNode[] = [];

  if (!empty && (type === 'line' || type === 'area')) {
    const stackedTops = rows.map(() => 0);
    let previous: { x: number; y: number }[] | null = null;
    const pending: { key: string; x: number; y: number; text: string }[] = [];
    series.forEach((s, si) => {
      const points = rows.map((row, i) => {
        const raw = toNumber(row[s.key]);
        let top = raw;
        if (stacked) {
          stackedTops[i] = (stackedTops[i] ?? 0) + raw;
          top = stackedTops[i] as number;
        }
        return { x: pointX(i), y: valueToY(top), value: raw };
      });
      const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
      const muted = isMuted(s.key);
      const style = markStyle(si, s.color, colors);
      const first = points[0];
      const last = points[points.length - 1];
      if (type === 'area' && first && last) {
        // Apilada, el suelo del área es la cima de la serie anterior; suelta, el cero.
        const floor = stacked && previous
          ? [...previous].reverse().map((p) => `L ${p.x} ${p.y}`).join(' ')
          : `L ${last.x} ${zeroY} L ${first.x} ${zeroY}`;
        marks.push(
          <path key={`area-${s.key}`} className={`chart__area${muted ? ' chart__area--muted' : ''}`} style={style}
            d={`${line} ${floor} Z`} />,
        );
      }
      marks.push(<path key={`line-${s.key}`} className={`chart__line${muted ? ' chart__line--muted' : ''}`} style={style} d={line} />);
      points.forEach((p, i) => {
        const isEnd = i === points.length - 1;
        const isActive = active === i;
        if (!isEnd && !isActive) return;
        marks.push(
          <circle key={`dot-${s.key}-${i}`} className={`chart__marker${muted ? ' chart__marker--muted' : ''}`} style={style}
            cx={p.x} cy={p.y} r={GEOMETRY.markerSize / 2} data-active={isActive || undefined} />,
        );
      });
      const labelled = labels === 'all' ? points : labels === 'last' && last ? [last] : labels === 'extremes' ? [first, last].filter(Boolean) : [];
      labelled.forEach((p, i) => {
        if (!p) return;
        pending.push({ key: `label-${s.key}-${i}`, x: p.x, y: p.y - GEOMETRY.axisGap, text: fmtValue(p.value, s) });
      });
      previous = points.map((p) => ({ x: p.x, y: p.y }));
    });

    // Cuando dos rótulos de extremo chocan no se separan a la fuerza —eso los
    // despega de su línea y se lee como ruido—: se deja el primero y el resto
    // los llevan la leyenda, el bocadillo y la tabla.
    const placed: { x: number; y: number }[] = [];
    pending.forEach((label) => {
      const collides = placed.some((other) => Math.abs(other.x - label.x) < CHAR_WIDTH * label.text.length && Math.abs(other.y - label.y) < GEOMETRY.labelFontSize * 1.2);
      if (collides) return;
      placed.push({ x: label.x, y: label.y });
      marks.push(
        <text key={label.key} className="chart__value-label" x={label.x} y={label.y}
          textAnchor={label.x > x1 - GEOMETRY.barMaxThickness * 2 ? 'end' : 'middle'}>
          {label.text}
        </text>,
      );
    });
  }

  if (!empty && type === 'bar') {
    const groupSize = Math.min(GEOMETRY.barMaxThickness * series.length + GEOMETRY.markGap * (series.length - 1), bandSize * 0.72);
    const thickness = stacked
      ? Math.min(GEOMETRY.barMaxThickness, bandSize * 0.72)
      : Math.max(1, (groupSize - GEOMETRY.markGap * (series.length - 1)) / series.length);
    rows.forEach((row, i) => {
      const center = bandCenter(i);
      let positive = 0;
      let negative = 0;
      series.forEach((s, si) => {
        const raw = toNumber(row[s.key]);
        const muted = isMuted(s.key);
        const style = markStyle(si, s.color, colors);
        const offset = stacked ? 0 : (si - (series.length - 1) / 2) * (thickness + GEOMETRY.markGap);
        const start = center + offset - thickness / 2;
        const base = stacked ? (raw >= 0 ? positive : negative) : 0;
        const top = base + raw;
        if (stacked) { if (raw >= 0) positive = top; else negative = top; }
        const gap = stacked && base !== 0 ? GEOMETRY.markGap : 0;
        let d = '';
        if (horizontal) {
          const from = valueToX(base) + (raw >= 0 ? gap : 0);
          const to = valueToX(top);
          d = barPath(Math.min(from, to), start, Math.abs(to - from), thickness, raw >= 0 ? 'right' : 'left');
        } else {
          const from = valueToY(base) - (raw >= 0 ? gap : 0);
          const to = valueToY(top);
          d = barPath(start, Math.min(from, to), thickness, Math.abs(to - from), raw >= 0 ? 'top' : 'bottom');
        }
        if (!d) return;
        marks.push(
          <path key={`bar-${i}-${s.key}`} className={`chart__bar${muted ? ' chart__bar--muted' : ''}`} style={style} d={d}
            data-active={active === i || undefined} />,
        );
        if (labels === 'all' && !stacked) {
          const tip = horizontal ? valueToX(top) : valueToY(top);
          marks.push(
            <text key={`bar-label-${i}-${s.key}`} className="chart__value-label"
              x={horizontal ? tip + GEOMETRY.axisGap : start + thickness / 2}
              y={horizontal ? start + thickness / 2 : tip - GEOMETRY.axisGap}
              textAnchor={horizontal ? 'start' : 'middle'} dominantBaseline={horizontal ? 'middle' : 'auto'}>
              {fmtValue(raw, s)}
            </text>,
          );
        }
      });
    });
  }

  if (!empty && isArc) {
    const inner = type === 'donut' ? radius * (1 - GEOMETRY.donutThickness) : 0;
    slices.forEach((slice, i) => {
      if (slice.to - slice.from <= 0) return;
      const category = String(xValue(rows[i] as ChartDatum, xKey));
      marks.push(
        <path key={`slice-${i}`} className={`chart__slice${isMuted(category) ? ' chart__slice--muted' : ''}`} style={markStyle(i, undefined, colors)}
          d={arcPath(centerX, centerY, radius, inner, slice.from, slice.to)} data-active={active === i || undefined} />,
      );
      if (slice.share >= 0.05) {
        const mid = (slice.from + slice.to) / 2;
        const lx = centerX + (radius + GEOMETRY.axisGap) * Math.cos(mid);
        const ly = centerY + (radius + GEOMETRY.axisGap) * Math.sin(mid);
        marks.push(
          <text key={`slice-label-${i}`} className="chart__value-label" x={lx} y={ly}
            textAnchor={Math.cos(mid) < -0.1 ? 'end' : Math.cos(mid) > 0.1 ? 'start' : 'middle'} dominantBaseline="middle">
            {percentFormat.format(slice.share)}
          </text>,
        );
      }
    });
  }

  if (!empty && type === 'funnel') {
    // Los tramos van en el orden dado: un embudo cuenta una secuencia, no un
    // ranking, así que no se reordena por valor.
    const maxSlice = Math.max(...sliceValues, 1);
    const trackHeight = plotHeight / Math.max(1, rows.length);
    const anchoDe = (v: number) => (Math.max(0, v) / maxSlice) * plotWidth;
    sliceValues.forEach((v, i) => {
      const y = y0 + trackHeight * i;
      const h = Math.max(0, trackHeight - GEOMETRY.funnelGap);
      const siguiente = sliceValues[i + 1];
      const category = String(xValue(rows[i] as ChartDatum, xKey));
      marks.push(
        <path key={`funnel-${i}`} className={`chart__funnel-step${isMuted(category) ? ' chart__funnel-step--muted' : ''}`}
          style={markStyle(i, undefined, colors)} data-active={active === i || undefined}
          d={funnelPath(centerX, y, h, anchoDe(v), anchoDe(siguiente ?? v))} />,
      );
      marks.push(
        <text key={`funnel-label-${i}`} className="chart__value-label" x={centerX} y={y + h / 2}
          textAnchor="middle" dominantBaseline="middle">
          {`${fmtX(xValue(rows[i] as ChartDatum, xKey))} · ${fmtValue(v)}`}
        </text>,
      );
    });
  }

  if (!empty && type === 'treemap') {
    const rects = squarify(
      sliceValues.map((value, index) => ({ value: Math.max(0, value), index })).filter((v) => v.value > 0),
      x0, y0, plotWidth, plotHeight,
    );
    rects.forEach((rect) => {
      const category = String(xValue(rows[rect.index] as ChartDatum, xKey));
      const w = Math.max(0, rect.w - GEOMETRY.treemapGap);
      const h = Math.max(0, rect.h - GEOMETRY.treemapGap);
      marks.push(
        <rect key={`tile-${rect.index}`} className={`chart__tile${isMuted(category) ? ' chart__tile--muted' : ''}`}
          style={markStyle(rect.index, undefined, colors)} data-active={active === rect.index || undefined}
          x={rect.x} y={rect.y} width={w} height={h} />,
      );
      // El rótulo solo cabe si la baldosa lo aguanta: si no, está en la tabla.
      if (w > CHAR_WIDTH * 4 && h > GEOMETRY.labelFontSize * 2) {
        marks.push(
          <text key={`tile-label-${rect.index}`} className="chart__tile-label"
            x={rect.x + GEOMETRY.axisGap} y={rect.y + GEOMETRY.axisGap + GEOMETRY.labelFontSize}>
            {fmtX(xValue(rows[rect.index] as ChartDatum, xKey))}
          </text>,
        );
      }
    });
  }

  if (!empty && type === 'radial-bar') {
    // Un anillo por categoría, del exterior al interior; el barrido es la parte
    // del máximo, no del total: son magnitudes comparadas, no un reparto.
    const maxSlice = Math.max(...sliceValues, 1);
    const anillo = radius / Math.max(1, rows.length);
    const grosor = Math.max(1, anillo - GEOMETRY.radialBarGap);
    sliceValues.forEach((v, i) => {
      const outer = radius - anillo * i;
      const inner = outer - grosor;
      const category = String(xValue(rows[i] as ChartDatum, xKey));
      const sweep = (Math.max(0, v) / maxSlice) * Math.PI * 1.999;
      marks.push(
        <path key={`radial-track-${i}`} className="chart__radial-track"
          d={arcPath(centerX, centerY, outer, inner, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.999)} />,
      );
      if (sweep <= 0) return;
      marks.push(
        <path key={`radial-bar-${i}`} className={`chart__radial-bar${isMuted(category) ? ' chart__radial-bar--muted' : ''}`}
          style={markStyle(i, undefined, colors)} data-active={active === i || undefined}
          d={arcPath(centerX, centerY, outer, inner, -Math.PI / 2, -Math.PI / 2 + sweep)} />,
      );
    });
  }

  if (!empty && isScatter) {
    series.forEach((s, si) => {
      const muted = isMuted(s.key);
      const style = markStyle(si, s.color, colors);
      rows.forEach((row, i) => {
        const value = row[s.key];
        if (typeof value !== 'number' || !Number.isFinite(value)) return;
        marks.push(
          <circle key={`point-${s.key}-${i}`} className={`chart__point${muted ? ' chart__point--muted' : ''}`} style={style}
            cx={scatterX(xNumbers[i] ?? 0)} cy={valueToY(value)} r={GEOMETRY.dotSize / 2}
            data-active={active === i || undefined} />,
        );
      });
    });
  }

  if (!empty && isRadar) {
    series.forEach((s, si) => {
      const muted = isMuted(s.key);
      const style = markStyle(si, s.color, colors);
      const puntos = rows.map((row, i) => radarPoint(toNumber(row[s.key]), i));
      if (puntos.length === 0) return;
      const d = `${puntos.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} Z`;
      marks.push(<path key={`radar-${s.key}`} className={`chart__radar-shape${muted ? ' chart__radar-shape--muted' : ''}`} style={style} d={d} />);
      puntos.forEach((p, i) => {
        marks.push(
          <circle key={`radar-dot-${s.key}-${i}`} className={`chart__marker${muted ? ' chart__marker--muted' : ''}`} style={style}
            cx={p.x} cy={p.y} r={GEOMETRY.markerSize / 2} data-active={active === i || undefined} />,
        );
      });
    });
  }

  // ─── Bocadillo ──────────────────────────────────────────────
  const activeRow = active !== null ? rows[active] : undefined;
  const tooltipRows = activeRow
    ? isSlice
      ? [{ key: sliceKey, label: String(xValue(activeRow, xKey)), value: fmtValue(toNumber(activeRow[sliceKey])), index: active ?? 0 }]
      : series.map((s, si) => ({ key: s.key, label: s.label, value: fmtValue(toNumber(activeRow[s.key]), s), index: si }))
    : [];
  const tooltipX = active === null ? 0
    : isRadial ? centerX
    : isScatter ? scatterX(xNumbers[active] ?? 0)
    : type === 'bar' && horizontal ? valueToX(scaleMax)
    : type === 'bar' ? bandCenter(active)
    : pointX(active);
  const tooltipY = active === null ? 0 : isRadial ? centerY - radius : type === 'bar' && horizontal ? bandCenter(active) : y0;

  return (
    <figure ref={ref} className={classes} {...rest}>
      {title ? <figcaption className="chart__title">{title}</figcaption> : null}

      {empty ? (
        <p className="chart__empty">{emptyMessage}</p>
      ) : (
        <div className="chart__plot" ref={plotRef}>
          <svg
            className="chart__canvas"
            viewBox={`0 0 ${width} ${svgHeight}`}
            width={width}
            height={svgHeight}
            aria-hidden="true"
          >
            {grid && !isRadial ? (
              <g className="chart__grid" aria-hidden="true">
                {ticks.map((t) => (horizontal ? (
                  <line key={t} className="chart__grid-line" x1={valueToX(t)} y1={y0} x2={valueToX(t)} y2={y1} />
                ) : (
                  <line key={t} className="chart__grid-line" x1={x0} y1={valueToY(t)} x2={x1} y2={valueToY(t)} />
                )))}
              </g>
            ) : null}

            {!isRadial ? (
              <g className="chart__axes" aria-hidden="true">
                <line className="chart__axis" x1={horizontal ? zeroX : x0} y1={horizontal ? y0 : zeroY} x2={horizontal ? zeroX : x1} y2={horizontal ? y1 : zeroY} />
                {horizontal
                  ? categoryTexts.map((text, i) => (
                      <text key={`cat-${i}`} className="chart__axis-label" x={x0 - GEOMETRY.axisGap} y={bandCenter(i)} textAnchor="end" dominantBaseline="middle">{text}</text>
                    ))
                  : ticks.map((t, i) => (
                      <text key={`tick-${t}`} className="chart__axis-label" x={x0 - GEOMETRY.axisGap} y={valueToY(t)} textAnchor="end" dominantBaseline="middle">{tickTexts[i]}</text>
                    ))}
                {horizontal
                  ? ticks.map((t, i) => (
                      <text key={`vtick-${t}`} className="chart__axis-label" x={valueToX(t)} y={y1 + GEOMETRY.axisGap + GEOMETRY.labelFontSize} textAnchor="middle">{tickTexts[i]}</text>
                    ))
                  : categoryTexts.map((text, i) => (
                      <text key={`cat-${i}`} className="chart__axis-label"
                        x={isScatter ? scatterX(xTicks[i] ?? 0) : type === 'bar' ? bandCenter(i) : pointX(i)}
                        y={y1 + GEOMETRY.axisGap + GEOMETRY.labelFontSize}
                        textAnchor={isScatter ? 'middle' : i === 0 && type !== 'bar' ? 'start' : i === rows.length - 1 && type !== 'bar' ? 'end' : 'middle'}>{text}</text>
                    ))}
              </g>
            ) : null}

            {grid && isScatter ? (
              <g className="chart__grid" aria-hidden="true">
                {xTicks.map((t) => (
                  <line key={`xgrid-${t}`} className="chart__grid-line" x1={scatterX(t)} y1={y0} x2={scatterX(t)} y2={y1} />
                ))}
              </g>
            ) : null}

            {isRadar && rows.length > 0 ? (
              <g className="chart__radar-grid" aria-hidden="true">
                {/* Telaraña: un anillo por marca de la escala y un radio por categoría. */}
                {ticks.filter((t) => t > 0).map((t) => (
                  <path key={`web-${t}`} className="chart__grid-line"
                    d={`${radarAxes.map((a, i) => {
                      const r = radius * (scaleMax > 0 ? t / scaleMax : 0);
                      return `${i === 0 ? 'M' : 'L'} ${centerX + r * Math.cos(a)} ${centerY + r * Math.sin(a)}`;
                    }).join(' ')} Z`} />
                ))}
                {radarAxes.map((a, i) => (
                  <line key={`spoke-${i}`} className="chart__grid-line"
                    x1={centerX} y1={centerY}
                    x2={centerX + radius * Math.cos(a)} y2={centerY + radius * Math.sin(a)} />
                ))}
                {radarAxes.map((a, i) => (
                  <text key={`radar-cat-${i}`} className="chart__axis-label"
                    x={centerX + (radius + GEOMETRY.axisGap) * Math.cos(a)}
                    y={centerY + (radius + GEOMETRY.axisGap) * Math.sin(a)}
                    textAnchor={Math.cos(a) < -0.1 ? 'end' : Math.cos(a) > 0.1 ? 'start' : 'middle'}
                    dominantBaseline="middle">
                    {categoryTexts[i]}
                  </text>
                ))}
              </g>
            ) : null}

            {active !== null && tooltip && (type === 'line' || type === 'area') ? (
              <line className="chart__crosshair" aria-hidden="true" x1={pointX(active)} y1={y0} x2={pointX(active)} y2={y1} />
            ) : null}

            <g className="chart__marks">{marks}</g>

            {type === 'donut' ? (
              <text className="chart__center-value" x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle">
                {fmtValue(sliceTotal)}
              </text>
            ) : null}

          </svg>

          {/* La capa de exploración es HTML, no SVG: así lleva el nombre accesible del
              gráfico y el puntero se enfoca con el teclado sin meter un elemento
              focusable dentro de una imagen. */}
          <div
            className="chart__hit-layer"
            role="img"
            aria-label={ariaLabel}
            aria-describedby={hintId}
            tabIndex={tooltip ? 0 : undefined}
            style={{ insetInlineStart: `${x0}px`, insetBlockStart: `${y0}px`, width: `${plotWidth}px`, height: `${plotHeight}px` } as CSSProperties}
            onPointerMove={tooltip ? (event) => setActive(indexFromPointer(event)) : undefined}
            onPointerLeave={tooltip ? () => setActive(null) : undefined}
            onKeyDown={tooltip ? onKeyDown : undefined}
            onBlur={tooltip ? () => setActive(null) : undefined}
          />

          {tooltip && active !== null && activeRow ? (
            <div className="chart__tooltip" aria-hidden="true" style={{ left: `${tooltipX}px`, top: `${tooltipY}px` } as CSSProperties}>
              <p className="chart__tooltip-header">{isSlice ? fmtValue(sliceTotal) : fmtX(xValue(activeRow, xKey))}</p>
              <ul className="chart__tooltip-list">
                {tooltipRows.map((row) => (
                  <li key={row.key + row.label} className="chart__tooltip-row">
                    <span className="chart__tooltip-key" style={markStyle(row.index, isSlice ? undefined : series[row.index]?.color, colors)} aria-hidden="true" />
                    <span className="chart__tooltip-value">{row.value}</span>
                    <span className="chart__tooltip-label">{row.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {showLegend && !empty ? (
        <div className="chart__legend">
          <Inline gap="sm">
            {(isSlice ? rows.map((row, i) => ({ key: String(xValue(row, xKey)), label: fmtX(xValue(row, xKey)), index: i, color: undefined as string | undefined }))
              : series.map((s, i) => ({ key: s.key, label: s.label, index: i, color: s.color }))
            ).map((item) => (
              <Tag key={item.key} variant="neutral" className={`chart__legend-item${isMuted(item.key) ? ' chart__legend-item--muted' : ''}`}>
                <span
                  className={`chart__legend-swatch${type === 'line' ? ' chart__legend-swatch--line' : ''}`}
                  style={markStyle(item.index, item.color, colors)}
                  aria-hidden="true"
                />
                {item.label}
              </Tag>
            ))}
          </Inline>
        </div>
      ) : null}

      {caption ? <p className="chart__caption">{caption}</p> : null}

      <VisuallyHidden id={hintId}>{tableHint}</VisuallyHidden>

      <VisuallyHidden as="div">
        <table className="chart__table">
          <caption>{tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{categoryLabel}</th>
              {isSlice ? (
                <>
                  <th scope="col">{valueLabel}</th>
                  <th scope="col">{shareLabel}</th>
                </>
              ) : (
                series.map((s) => <th key={s.key} scope="col">{s.label}</th>)
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`row-${i}`}>
                <th scope="row">{fmtX(xValue(row, xKey))}</th>
                {isSlice ? (
                  <>
                    <td>{fmtValue(toNumber(row[sliceKey]))}</td>
                    <td>{percentFormat.format(slices[i]?.share ?? 0)}</td>
                  </>
                ) : (
                  series.map((s) => <td key={s.key}>{fmtValue(toNumber(row[s.key]), s)}</td>)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </VisuallyHidden>
    </figure>
  );
});
