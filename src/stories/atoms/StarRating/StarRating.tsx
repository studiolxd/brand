'use client';

import { useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './StarRating.css';

export interface StarRatingProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  /** Valoración mostrada. En lectura se redondea a media estrella. */
  value?: number;
  /** Valoración al montar, cuando la entrada no está controlada. */
  defaultValue?: number;
  /** Se llama con la valoración elegida. Solo en entrada (`readOnly={false}`). */
  onValueChange?: (value: number) => void;
  /** Cuántas estrellas tiene la escala. */
  max?: number;
  /**
   * Solo lectura (por defecto). El componente nace para **mostrar** una media;
   * para capturar una valoración hay que pedirlo con `readOnly={false}`.
   */
  readOnly?: boolean;
  /** Deshabilita la entrada. */
  disabled?: boolean;
  /** Talla de la estrella, relativa al texto que la rodea. */
  size?: 'sm' | 'md' | 'lg';
  /** `name` de los radios que envían la valoración con el formulario. */
  name?: string;
  /** Idioma con el que se escribe el número del nombre accesible. */
  locale?: string;
  /**
   * Nombre accesible en lectura: recibe el valor ya redondeado a media estrella
   * y el máximo. Por defecto, en castellano: «4,5 de 5 estrellas».
   */
  valueLabel?: (value: number, max: number) => string;
  /**
   * Nombre accesible de cada estrella elegible. Por defecto, en castellano:
   * «3 de 5 estrellas».
   */
  optionLabel?: (value: number, max: number) => string;
  /**
   * Nombre accesible del grupo en modo entrada. Por defecto, en castellano:
   * «Valoración».
   */
  groupLabel?: string;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/** Redondea a la media estrella más cercana y lo deja dentro de la escala. */
function aMediaEstrella(value: number, max: number) {
  return Math.min(Math.max(Math.round(value * 2) / 2, 0), max);
}

/** Cuánto se rellena una estrella concreta: entera, media o vacía. */
function relleno(indice: number, value: number): 'full' | 'half' | 'empty' {
  if (value >= indice + 1) return 'full';
  if (value >= indice + 0.5) return 'half';
  return 'empty';
}

function Estrella({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  return (
    <span className="star-rating__star">
      <Icon name="star" className="star-rating__glyph star-rating__glyph--track" />
      {fill !== 'empty' && (
        <Icon
          name="star"
          className={`star-rating__glyph star-rating__glyph--fill${fill === 'half' ? ' star-rating__glyph--half' : ''}`}
        />
      )}
    </span>
  );
}

/**
 * Valoración en estrellas, de lectura o de entrada.
 *
 * **En lectura** es una sola imagen: `role="img"` con el valor exacto en el
 * nombre accesible («4,5 de 5 estrellas»), no cinco iconos que el lector tenga
 * que contar. Admite **media estrella**, que es como se lee una media.
 *
 * **En entrada** (`readOnly={false}`) es un grupo de radios nativos —teclado,
 * envío de formulario y estado marcado vienen del navegador— con una estrella
 * por opción. La entrada va en pasos enteros: la media estrella describe una
 * media calculada, no algo que una persona elija.
 */
export function StarRating({
  value: valueProp,
  defaultValue,
  onValueChange,
  max = 5,
  readOnly = true,
  disabled = false,
  size = 'md',
  name: nameProp,
  locale = 'es-ES',
  valueLabel = (value, maximo) => `${value.toLocaleString(locale)} de ${maximo} estrellas`,
  optionLabel = (value, maximo) => `${value.toLocaleString(locale)} de ${maximo} estrellas`,
  groupLabel = 'Valoración',
  className,
  ...rest
}: StarRatingProps) {
  const nombreGenerado = useId();
  const [sinControlar, setSinControlar] = useState<number | undefined>(defaultValue);
  const [previsualizado, setPrevisualizado] = useState<number | undefined>(undefined);
  const controlado = valueProp !== undefined;
  const valor = (controlado ? valueProp : sinControlar) ?? 0;

  const clases = [
    'star-rating',
    size !== 'md' ? `star-rating--${size}` : '',
    readOnly ? '' : 'star-rating--input',
    className ?? '',
  ].filter(Boolean).join(' ');

  const posiciones = Array.from({ length: max }, (_, i) => i);

  if (readOnly) {
    const redondeado = aMediaEstrella(valor, max);
    return (
      <div className={clases} role="img" aria-label={valueLabel(redondeado, max)} {...rest}>
        {posiciones.map((i) => <Estrella key={i} fill={relleno(i, redondeado)} />)}
      </div>
    );
  }

  function elegir(siguiente: number) {
    if (!controlado) setSinControlar(siguiente);
    onValueChange?.(siguiente);
  }

  // Al pasar el ratón, las estrellas se rellenan hasta la que se señala: la
  // previsualización solo pinta, no cambia el valor.
  const mostrado = previsualizado ?? Math.round(valor);

  return (
    <div
      className={clases}
      role="radiogroup"
      aria-label={groupLabel}
      onPointerLeave={() => setPrevisualizado(undefined)}
      {...rest}
    >
      {posiciones.map((i) => {
        const opcion = i + 1;
        return (
          <label
            key={opcion}
            className="star-rating__option"
            onPointerEnter={() => { if (!disabled) setPrevisualizado(opcion); }}
          >
            <input
              className="star-rating__input visually-hidden"
              type="radio"
              name={nameProp ?? nombreGenerado}
              value={opcion}
              checked={Math.round(valor) === opcion}
              disabled={disabled}
              onChange={() => elegir(opcion)}
              onFocus={() => setPrevisualizado(opcion)}
              onBlur={() => setPrevisualizado(undefined)}
            />
            <Estrella fill={opcion <= mostrado ? 'full' : 'empty'} />
            <VisuallyHidden>{optionLabel(opcion, max)}</VisuallyHidden>
          </label>
        );
      })}
    </div>
  );
}
