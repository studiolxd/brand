import './Fieldset.css';

type HeadingWeight = 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface FieldsetProps {
  /** Texto del legend (título del grupo de campos). */
  legend: React.ReactNode;
  /** Nivel de heading visual para el legend (1–6). */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Peso tipográfico del legend. */
  weight?: HeadingWeight;
  /** Tamaño tipográfico del legend. */
  size?: HeadingSize;
  /** Clases adicionales para el fieldset. */
  className?: string;
  /** Identificador HTML del fieldset. */
  id?: string;
  /** Deshabilita todos los controles descendientes en un solo punto. */
  disabled?: boolean;
  children: React.ReactNode;
}

export function Fieldset({
  legend,
  level = 2,
  weight,
  size,
  className,
  id,
  disabled,
  children,
}: FieldsetProps) {
  const legendClasses = [
    'fieldset__legend',
    `fieldset__legend--${level}`,
    weight && `fieldset__legend--${weight}`,
    size && `fieldset__legend--size-${size}`,
  ].filter(Boolean).join(' ');

  return (
    <fieldset
      className={['fieldset', className].filter(Boolean).join(' ')}
      id={id}
      disabled={disabled}
    >
      <legend className={legendClasses}>{legend}</legend>
      {children}
    </fieldset>
  );
}
