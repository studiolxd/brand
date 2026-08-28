'use client';

import { Slider as BaseSlider } from '@base-ui-components/react/slider';
import './Slider.css';

type BaseSliderRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
  'className' | 'value' | 'defaultValue' | 'onValueChange' | 'onValueCommitted'
>;

export interface SliderProps extends BaseSliderRootProps {
  /** Valor actual (controlado). Un número, o una lista para un rango. */
  value?: number | number[];
  /** Valor al montar (no controlado). */
  defaultValue?: number | number[];
  /** Se llama mientras se mueve. Devuelve la misma forma que recibió `value`. */
  onValueChange?: (value: number | number[]) => void;
  /** Se llama al soltar: el sitio para guardar, no `onValueChange`. */
  onValueCommitted?: (value: number | number[]) => void;
  /**
   * Nombre accesible del deslizador. Con un solo pulgar es su nombre; con
   * varios lo completa `thumbLabel`.
   */
  label?: string;
  /**
   * Nombre accesible de cada pulgar. Por defecto, en castellano: con dos
   * pulgares «Mínimo» y «Máximo»; con más, «Valor 1», «Valor 2»…
   */
  thumbLabel?: (index: number, total: number) => string;
  /** Muestra el valor formateado junto a la banda. */
  showValue?: boolean;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Deslizador de un valor o de un rango (Base UI Slider): el espaciado de un
 * editor de tema, el precio máximo de un filtro, la opacidad de una capa.
 *
 * Devuelve **la misma forma que recibe**: un número si se le dio un número, una
 * lista si se le dio una lista. Un pulgar por entrada de la lista.
 *
 * `onValueChange` avisa mientras se arrastra —para la vista previa— y
 * `onValueCommitted` al soltar, que es donde va el guardado.
 */
export function Slider({
  value,
  defaultValue,
  onValueChange,
  onValueCommitted,
  label,
  thumbLabel,
  showValue = false,
  orientation = 'horizontal',
  className,
  ...rest
}: SliderProps) {
  const actual = value ?? defaultValue ?? 0;
  const pulgares = Array.isArray(actual) ? actual.length : 1;

  const nombrePulgar = thumbLabel ?? ((index: number, total: number) => {
    if (total === 1) return label ?? 'Valor';
    if (total === 2) return index === 0 ? 'Mínimo' : 'Máximo';
    return `Valor ${index + 1}`;
  });

  const classes = [
    'slider',
    orientation === 'vertical' ? 'slider--vertical' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <BaseSlider.Root
      className={classes}
      orientation={orientation}
      value={value as never}
      defaultValue={defaultValue as never}
      aria-label={pulgares === 1 ? undefined : label}
      // Contrato del DS: solo el valor. Base UI añade un segundo argumento
      // (detalles del evento) que aquí no forma parte de la API.
      onValueChange={onValueChange ? (siguiente) => onValueChange(siguiente as number | number[]) : undefined}
      onValueCommitted={onValueCommitted ? (siguiente) => onValueCommitted(siguiente as number | number[]) : undefined}
      {...rest}
    >
      <BaseSlider.Control className="slider__control">
        <BaseSlider.Track className="slider__track">
          <BaseSlider.Indicator className="slider__indicator" />
          {Array.from({ length: pulgares }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={index}
              className="slider__thumb"
              getAriaLabel={() => nombrePulgar(index, pulgares)}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
      {showValue && <BaseSlider.Value className="slider__value" />}
    </BaseSlider.Root>
  );
}
