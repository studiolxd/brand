import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { Tag, type TagVariant } from '../../atoms/Tag/Tag';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './StatTile.css';

export type StatTileDirection = 'up' | 'down' | 'flat';
export type StatTileTone = 'positive' | 'negative' | 'neutral';

export interface StatTileDelta {
  /** La variación, ya formateada: «+12 %», «−3», «igual». */
  value: ReactNode;
  /** Hacia dónde se ha movido la cifra. Pone la flecha. */
  direction?: StatTileDirection;
  /**
   * Si el movimiento es bueno o malo. Por defecto subir es bueno; en una
   * métrica donde subir es malo (errores, latencia, bajas), se invierte.
   */
  tone?: StatTileTone;
  /**
   * Cómo se lee la dirección para un lector de pantalla, que no ve la flecha.
   * Default castellano según `direction`.
   */
  label?: string;
}

export interface StatTileProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Qué se está midiendo. */
  label: ReactNode;
  /** La cifra, ya formateada por quien la tiene (moneda, separadores, unidades). */
  value: ReactNode;
  /** Variación respecto al periodo anterior. */
  delta?: StatTileDelta;
  /** Una línea de contexto bajo la cifra: el periodo, la fuente, la salvedad. */
  description?: ReactNode;
  /** Icono junto a la etiqueta. Decorativo: la etiqueta ya dice qué es. */
  icon?: ReactNode;
  /** Talla de la baldosa. */
  size?: 'sm' | 'md';
}

const TONE_BY_DIRECTION: Record<StatTileDirection, StatTileTone> = {
  up: 'positive',
  down: 'negative',
  flat: 'neutral',
};

const TAG_VARIANT: Record<StatTileTone, TagVariant> = {
  positive: 'success',
  negative: 'danger',
  neutral: 'neutral',
};

const DIRECTION_LABEL: Record<StatTileDirection, string> = {
  up: 'Sube',
  down: 'Baja',
  flat: 'Sin cambio',
};

/**
 * La baldosa de una cifra: qué se mide, cuánto vale, cómo se ha movido y qué
 * matiza esa lectura. Es la pieza de los paneles de KPIs; la rejilla la pone
 * `Columns`, que no sabe nada de cifras.
 *
 * La baldosa **no calcula ni formatea**: recibe la cifra y el delta ya
 * escritos. El formato de un número depende de la moneda, del idioma y de la
 * unidad, y todo eso lo sabe el producto, no el sistema.
 *
 * Reenvía el resto de props del elemento (`data-*`, `aria-*`, `id`…) y
 * concatena `className` tras las clases propias.
 */
export const StatTile = forwardRef<HTMLDivElement, StatTileProps>(function StatTile({
  label,
  value,
  delta,
  description,
  icon,
  size = 'md',
  className,
  ...rest
}, ref) {
  const classes = [
    'stat-tile',
    size !== 'md' ? `stat-tile--${size}` : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const direction = delta?.direction ?? 'flat';
  const tone = delta?.tone ?? TONE_BY_DIRECTION[direction];
  const directionLabel = delta?.label ?? DIRECTION_LABEL[direction];

  return (
    <div ref={ref} className={classes} {...rest}>
      <p className="stat-tile__label">
        {icon && <span className="stat-tile__icon" aria-hidden="true">{icon}</span>}
        {label}
      </p>

      <p className="stat-tile__value">{value}</p>

      {delta && (
        <Tag variant={TAG_VARIANT[tone]} className="stat-tile__delta">
          {/* La flecha es la misma del sistema, girada: arriba, abajo o en
              reposo. Decorativa — la dirección la dice el texto oculto. */}
          <Icon
            name="arrow"
            size="sm"
            className={`stat-tile__delta-icon stat-tile__delta-icon--${direction}`}
          />
          <VisuallyHidden>{directionLabel}</VisuallyHidden>
          {delta.value}
        </Tag>
      )}

      {description && <p className="stat-tile__description">{description}</p>}
    </div>
  );
});
