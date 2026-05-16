import './Avatar.css';

export interface AvatarProps {
  /** URL de la imagen. Si se omite, se muestran las iniciales calculadas desde `name`. */
  src?: string;
  /** Texto alternativo accesible para la imagen. Se usa también como fallback de `alt` cuando `name` no está disponible. */
  alt?: string;
  /** Nombre completo. Se usa para generar las iniciales cuando no hay `src`. */
  name?: string;
  /** Talla del avatar. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Forma del avatar. `circle` para personas, `square` para logos de organización. */
  shape?: 'circle' | 'square';
  /** Clase adicional. */
  className?: string;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  className,
}: AvatarProps) {
  const base = [
    'avatar',
    `avatar--${size}`,
    shape === 'square' ? 'avatar--square' : '',
    className,
  ].filter(Boolean).join(' ');

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? name ?? ''}
        className={base}
      />
    );
  }

  return (
    <span className={`${base} avatar--initials`} aria-hidden="true">
      {name ? getInitials(name) : '?'}
    </span>
  );
}
