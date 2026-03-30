import './List.css';

interface ListProps {
  /** Tipo de lista: con viñetas o numerada. */
  type?: 'unordered' | 'ordered';
  children: React.ReactNode;
}

export function List({ type = 'unordered', children }: ListProps) {
  const Tag = type === 'ordered' ? 'ol' : 'ul';
  return (
    <Tag
      className={`list list--${type}`}
    >
      {children}
    </Tag>
  );
}
