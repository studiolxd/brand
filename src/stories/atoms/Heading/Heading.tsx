import './Heading.css';

interface HeadingProps {
  /** Nivel semántico del encabezado (h1–h6). */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export function Heading({ level = 2, children }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Tag
      className={`heading heading--${level}`}
    >
      {children}
    </Tag>
  );
}
