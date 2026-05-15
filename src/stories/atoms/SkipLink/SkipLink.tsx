import './SkipLink.css';

interface SkipLinkProps {
  /** ID del elemento de destino al que se salta (sin el #). */
  href: string;
  children: React.ReactNode;
}

/** Enlace de salto accesible: invisible hasta que recibe foco por teclado. */
export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a href={href} className="skip-link">
      {children}
    </a>
  );
}
