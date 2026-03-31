import './Heading.css';

type HeadingWeight = 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

interface HeadingProps {
  /** Nivel semántico del encabezado (h1–h6). */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Peso tipográfico. Por defecto hereda el token del nivel (300). */
  weight?: HeadingWeight;
  /** Clases adicionales para el elemento. */
  className?: string;
  children: React.ReactNode;
}

export function Heading({ level = 2, weight, className, children }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const classes = ['heading', `heading--${level}`, weight && `heading--${weight}`, className]
    .filter(Boolean)
    .join(' ');
  return <Tag className={classes}>{children}</Tag>;
}
