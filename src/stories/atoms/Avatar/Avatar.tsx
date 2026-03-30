import './Avatar.css';

interface AvatarProps {
  /** URL de la imagen. */
  src: string;
  /** Texto alternativo accesible. */
  alt: string;
  /** Talla del avatar. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Clase adicional. */
  className?: string;
}

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={['avatar', `avatar--${size}`, className].filter(Boolean).join(' ')}
    />
  );
}
