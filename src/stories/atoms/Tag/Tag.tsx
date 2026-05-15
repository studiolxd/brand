import './Tag.css';

type TagVariant = 'default' | 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2';

interface TagProps {
  /** Variante de color del tag. */
  variant?: TagVariant;
  /** Contenido del tag. */
  children: React.ReactNode;
}

export function Tag({ variant = 'default', children }: TagProps) {
  return (
    <span className={['tag', `tag--${variant}`].join(' ')}>
      {children}
    </span>
  );
}
