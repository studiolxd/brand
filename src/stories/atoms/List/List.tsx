import './List.css';

interface ListProps {
  /** Tipo de lista: con viñetas, numerada o sin decoración. */
  type?: 'unordered' | 'ordered' | 'plain';
  className?: string;
  children: React.ReactNode;
}

export function List({ type = 'unordered', className, children }: ListProps) {
  const Tag = type === 'ordered' ? 'ol' : 'ul';
  return (
    <Tag
      className={`list list--${type}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  );
}
