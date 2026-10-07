import type { HeadingSize } from '../Heading/Heading';
import './Fieldset.css';
import { warnDeprecated } from '../../constants/env';

type HeadingWeight = 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

export interface FieldsetProps {
  /** Texto del legend (título del grupo de campos). */
  legend: React.ReactNode;
  /**
   * Oculta la leyenda a la vista y la deja para el lector de pantalla: sigue
   * nombrando el grupo. La clase `visually-hidden` va sobre el propio
   * `<legend>`, que tiene que ser el primer hijo del `fieldset` —envolverlo en
   * el `<span>` de `VisuallyHidden` rompería esa asociación—. Por defecto
   * `false`.
   */
  legendHidden?: boolean;
  /** Nivel de heading visual para el legend (1–6). */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * @deprecated No tiene efecto: el peso del legend lo da su `level`, como en
   * `Heading` («un título no elige su peso»). Avisa en desarrollo y sale del
   * tipo en la v52.
   */
  weight?: HeadingWeight;
  /** Tamaño tipográfico del legend. */
  size?: HeadingSize;
  /** Clases adicionales para el fieldset. */
  className?: string;
  /** Identificador HTML del fieldset. */
  id?: string;
  /** Deshabilita todos los controles descendientes en un solo punto. */
  disabled?: boolean;
  /** Ids de ayuda/error que describen el grupo entero (lo pone el campo compuesto que lo use). */
  'aria-describedby'?: string;
  children: React.ReactNode;
}

export function Fieldset({
  legend,
  legendHidden = false,
  level = 2,
  weight,
  size,
  className,
  id,
  disabled,
  'aria-describedby': ariaDescribedBy,
  children,
}: FieldsetProps) {
  if (weight !== undefined) warnDeprecated('Fieldset', 'weight', 'el peso que trae `level` (no tiene efecto)');
  // Oculta, la leyenda no lleva la cara de título: solo la receta de ocultar.
  const legendClasses = legendHidden ? 'visually-hidden' : [
    'fieldset__legend',
    `fieldset__legend--${level}`,
    size && `fieldset__legend--size-${size}`,
  ].filter(Boolean).join(' ');

  return (
    <fieldset
      className={['fieldset', className].filter(Boolean).join(' ')}
      id={id}
      disabled={disabled}
      aria-describedby={ariaDescribedBy}
    >
      <legend className={legendClasses}>{legend}</legend>
      {children}
    </fieldset>
  );
}
