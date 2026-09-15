'use client';

import { useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './StarRating.css';

/* --------------------------------------------------------------------------
   El contrato de los textos (v39.0.0)

   El componente RECIBE su texto: no lo trae puesto. Todo lo que emite por su
   cuenta es una prop obligatoria y sin default castellano.

   Cada una se exige cuando el componente puede emitirla, y lo dice el tipo en
   vez de confiarlo a la doc. De ahí que las props se repartan en dos modos y
   dos ejes en vez de vivir sueltas en una interfaz plana:

   - en lectura se emite `valueLabel`, y en entrada `optionLabel`/`groupLabel`:
     cada modo pide los suyos y ninguno pide los del otro;
   - `countLabel` solo se escribe si hay `reviewCount`, así que viaja con él;
   - `emptyLabel` solo se lee si `value` puede ser `null`, así que lo pide
     únicamente quien pueda pasarlo — un `value: number` a secas no lo necesita,
     y el día que ese valor pase a `number | null` el compilador lo reclama.
   -------------------------------------------------------------------------- */

/** Lo que no depende del modo ni de los textos. */
export interface StarRatingCommonProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  /** Cuántas estrellas tiene la escala. Default: 5. */
  max?: number;
  /** Talla de la estrella, relativa al texto que la rodea. */
  size?: 'sm' | 'md' | 'lg';
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * El recuento de reseñas y su rótulo viajan juntos: sin `reviewCount` no hay
 * nada que escribir, y con él hace falta saber cómo se escribe.
 */
export type StarRatingCountProps =
  | {
      /**
       * Cuántas reseñas hay detrás de la media: se pinta a continuación («(24)»)
       * y entra en el nombre accesible. **Sin él** la nota es la de UNA reseña
       * suelta, donde un recuento no significa nada.
       */
      reviewCount?: undefined;
      countLabel?: (reviewCount: number) => string;
    }
  | {
      /** Cuántas reseñas hay detrás de la media. Obliga a pasar `countLabel`. */
      reviewCount: number;
      /**
       * Cómo se escribe el recuento visible («(24)»). **Obligatorio** con
       * `reviewCount`: el componente no escribe texto por su cuenta.
       */
      countLabel: (reviewCount: number) => string;
    };

/**
 * El valor y el texto del vacío, igual: `emptyLabel` solo se lee cuando `value`
 * puede ser `null`, así que solo lo pide quien pueda pasarlo.
 */
export type StarRatingValueProps =
  | {
      /** Valoración mostrada. Se redondea a media estrella. */
      value: number;
      emptyLabel?: string;
    }
  | {
      /**
       * Valoración mostrada. Se redondea a media estrella.
       *
       * **`null` no es cero**: es «todavía sin reseñas». Con `null` la escala no
       * se dibuja —cinco estrellas vacías son el dibujo de «valorado con 0», que
       * es una nota de verdad y la peor— y en su lugar va `emptyLabel`.
       */
      value: number | null;
      /**
       * Qué se lee y se ve cuando `value` es `null`. **Obligatorio** en cuanto
       * `value` pueda serlo: el componente no escribe «Todavía sin reseñas» por
       * su cuenta.
       */
      emptyLabel: string;
    };

/** Modo lectura (el de siempre): una imagen con su nombre accesible. */
export type StarRatingReadProps = StarRatingCommonProps &
  StarRatingCountProps &
  StarRatingValueProps & {
    /**
     * Solo lectura (por defecto). El componente nace para **mostrar** una media;
     * para capturar una valoración hay que pedirlo con `readOnly={false}`.
     */
    readOnly?: true;
    /**
     * Nombre accesible de la valoración: recibe el valor ya redondeado a media
     * estrella, el máximo y, si lo hay, el recuento. Es el nombre COMPLETO —el
     * recuento visible queda dentro de la imagen y no se lee aparte—, p. ej.
     * «4,5 de 5 estrellas, 24 reseñas». **Obligatorio**: el nombre accesible lo
     * pasa el consumidor.
     */
    valueLabel: (value: number, max: number, reviewCount?: number) => string;
  };

/** Modo entrada (`readOnly={false}`): un grupo de radios nativos. */
export type StarRatingInputProps = StarRatingCommonProps & {
  /** Modo entrada. */
  readOnly: false;
  /** Valoración elegida, cuando la entrada está controlada. */
  value?: number;
  /** Valoración al montar, cuando la entrada no está controlada. */
  defaultValue?: number;
  /** Se llama con la valoración elegida. */
  onValueChange?: (value: number) => void;
  /** Deshabilita la entrada. */
  disabled?: boolean;
  /** `name` de los radios que envían la valoración con el formulario. */
  name?: string;
  /**
   * Nombre accesible de cada estrella elegible, p. ej. «3 de 5 estrellas».
   * **Obligatorio**: lo pasa el consumidor.
   */
  optionLabel: (value: number, max: number) => string;
  /**
   * Nombre accesible del grupo, p. ej. «Valoración». **Obligatorio**, igual que
   * `optionLabel`.
   */
  groupLabel: string;
};

export type StarRatingProps = StarRatingReadProps | StarRatingInputProps;

/**
 * Vista interna: la unión aplanada con todo opcional. El contrato lo impone
 * `StarRatingProps` en el borde; dentro, el componente ya sabe qué mira según
 * el modo, y aplanar evita repetir la rama en cada destructuración.
 */
type StarRatingInternalProps = StarRatingCommonProps & {
  readOnly?: boolean;
  value?: number | null;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  reviewCount?: number;
  disabled?: boolean;
  name?: string;
  valueLabel?: (value: number, max: number, reviewCount?: number) => string;
  countLabel?: (reviewCount: number) => string;
  emptyLabel?: string;
  optionLabel?: (value: number, max: number) => string;
  groupLabel?: string;
};

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
export function StarRating(props: StarRatingProps) {
  const {
    value: valueProp,
    defaultValue,
    onValueChange,
    max = 5,
    reviewCount,
    readOnly = true,
    disabled = false,
    size = 'md',
    name: nameProp,
    // Ninguno de los cinco textos lleva default: el tipo ya obliga a pasar el
    // que corresponda. El `?? ''` de más abajo es la red para un consumidor sin
    // tipos (JavaScript a pelo), que si no rompería con un `undefined`.
    valueLabel,
    optionLabel,
    groupLabel,
    countLabel,
    emptyLabel,
    className,
    ...rest
  } = props as StarRatingInternalProps;
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
          <span className="star-rating__empty">{emptyLabel ?? ''}</span>
        </div>
      );
    }

    const redondeado = aMediaEstrella(valor, max);
    // La imagen es la escala Y su recuento: un solo nombre accesible («4,5 de 5
    // estrellas, 24 reseñas»), no una imagen y un «(24)» suelto que el lector
    // tuviera que juntar por su cuenta.
    return (
      <div className={clases} role="img" aria-label={valueLabel?.(redondeado, max, reviewCount) ?? ''} {...rest}>
        <span className="star-rating__stars">
          {posiciones.map((i) => <Estrella key={i} fill={relleno(i, redondeado)} />)}
        </span>
        {reviewCount !== undefined && (
          <span className="star-rating__count">{countLabel?.(reviewCount) ?? ''}</span>
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
      aria-label={groupLabel ?? ''}
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
            <VisuallyHidden>{optionLabel?.(opcion, max) ?? ''}</VisuallyHidden>
          </label>
        );
      })}
    </div>
  );
}
