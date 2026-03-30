import './Avatar.css';

interface AvatarProps {
  /** URL de la imagen. */
  src: string;
  /** Texto alternativo accesible. */
  alt: string;
  /** Clase adicional. */
  className?: string;
}

export function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={['avatar', className].filter(Boolean).join(' ')}
    />
  );
}
