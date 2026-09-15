'use client';

import { useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './StarRating.css';

export interface StarRatingProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  /**
   * Valoración mostrada. En lectura se redondea a media estrella.
   *
   * **`null` no es cero**: es «todavía sin reseñas». Con `null` la escala no se
   * dibuja —cinco estrellas vacías son el dibujo de «valorado con 0», que es
   * una nota de verdad y la peor— y en su lugar va `emptyLabel` como texto.
   */
  value?: number | null;
  /** Valoración al montar, cuando la entrada no está controlada. */
  defaultValue?: number;
  /** Se llama con la valoración elegida. Solo en entrada (`readOnly={false}`). */
  onValueChange?: (value: number) => void;
  /** Cuántas estrellas tiene la escala. */
  max?: number;
  /**
   * Cuántas reseñas hay detrás de la media: se pinta a continuación («(24)»)
   * y entra en el nombre accesible. **Sin él** la nota es la de UNA reseña
   * suelta, donde un recuento no significa nada. Solo en lectura.
   */
  reviewCount?: number;
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
   * Nombre accesible en lectura: recibe el valor ya redondeado a media estrella,
   * el máximo y, si lo hay, el recuento de reseñas. Es el nombre COMPLETO de la
   * valoración —el recuento visible queda dentro de la imagen y no se lee
   * aparte—. Default: «4,5 de 5 estrellas» y, con recuento, «4,5 de 5
   * estrellas, 24 reseñas» (castellano). Una app multiidioma debe pasarlo
   * traducido.
   */
  valueLabel?: (value: number, max: number, reviewCount?: number) => string;
  /**
   * Cómo se escribe el recuento visible. Default: «(24)». Una app multiidioma
   * debe pasarlo traducido si su escritura de la cifra no es esa.
   */
  countLabel?: (reviewCount: number) => string;
  /**
   * Qué se lee y se ve cuando `value` es `null`. Default: «Todavía sin reseñas»
   * (castellano). Una app multiidioma debe pasarlo traducido.
   */
  emptyLabel?: string;
  /**
   * Nombre accesible de cada estrella elegible. Default: «3 de 5 estrellas»
   * (castellano). Una app multiidioma debe pasarlo traducido.
   */
  optionLabel?: (value: number, max: number) => string;
  /**
   * Nombre accesible del grupo en modo entrada. Default: «Valoración»
   * (castellano). Una app multiidioma debe pasarlo traducido.
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
 * que contar. Admite **media estrella**, que es como se lee una media, y
 * **`value={null}`** para «todavía sin reseñas», que no se dibuja con estrellas
 * porque las estrellas vacías ya significan otra cosa.
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
  reviewCount,
  readOnly = true,
  disabled = false,
  size = 'md',
  name: nameProp,
  locale = 'es-ES',
  valueLabel = (value, maximo, recuento) =>
    `${value.toLocaleString(locale)} de ${maximo} estrellas` +
    (recuento === undefined ? '' : `, ${recuento.toLocaleString(locale)} ${recuento === 1 ? 'reseña' : 'reseñas'}`),
  optionLabel = (value, maximo) => `${value.toLocaleString(locale)} de ${maximo} estrellas`,
  groupLabel = 'Valoración',
  countLabel = (recuento) => `(${recuento.toLocaleString(locale)})`,
  emptyLabel = 'Todavía sin reseñas',
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
    // Sin reseñas todavía: no se dibuja la escala. Cinco estrellas vacías son
    // el dibujo de «valorado con 0» —una nota real, y la peor—, así que aquí
    // no hay ninguna imagen que hacer: lo que hay es una frase, y se dice.
    if (valueProp === null) {
      return (
        <div className={clases} {...rest}>
          <span className="star-rating__empty">{emptyLabel}</span>
        </div>
      );
    }

    const redondeado = aMediaEstrella(valor, max);
    // La imagen es la escala Y su recuento: un solo nombre accesible («4,5 de 5
    // estrellas, 24 reseñas»), no una imagen y un «(24)» suelto que el lector
    // tuviera que juntar por su cuenta.
    return (
      <div className={clases} role="img" aria-label={valueLabel(redondeado, max, reviewCount)} {...rest}>
        <span className="star-rating__stars">
          {posiciones.map((i) => <Estrella key={i} fill={relleno(i, redondeado)} />)}
        </span>
        {reviewCount !== undefined && (
          <span className="star-rating__count">{countLabel(reviewCount)}</span>
        )}
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
              /* `visually-hidden` a pelo, no `<VisuallyHidden>`: el span
                 envolvente rompería la relación <label>↔<input>. Excepción
                 declarada en CLAUDE.md § «Accesibilidad — VisuallyHidden». */
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
