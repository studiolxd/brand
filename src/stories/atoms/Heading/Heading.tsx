import './Heading.css';

interface HeadingProps {
  /** Nivel semántico del encabezado (h1–h6). */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Clases adicionales para el elemento. */
  className?: string;
  children: React.ReactNode;
}

export function Heading({ level = 2, className, children }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const classes = ['heading', `heading--${level}`, className].filter(Boolean).join(' ');
  return (
    <Tag className={classes}>
      {children}
    </Tag>
  );
}
