import './Skeleton.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Ancho del bloque. Por defecto ocupa todo el disponible. */
  width?: string;
  /** Alto del bloque. Por defecto, una línea de texto. */
  height?: string;
  /** Bloque circular (avatares). */
  circle?: boolean;
}

/**
 * Marcador de contenido que aún está cargando. Es decorativo: se oculta a los
 * lectores de pantalla, así que el contenedor que lo usa debe anunciar la
 * carga por su cuenta (`aria-busy`, una región viva…).
 */
export function Skeleton({ width, height, circle = false, className, style, ...rest }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={['skeleton', circle ? 'skeleton--circle' : '', className].filter(Boolean).join(' ')}
      style={{ ...(width ? { width } : {}), ...(height ? { height } : {}), ...style }}
      {...rest}
    />
  );
}
