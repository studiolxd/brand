import './Link.css';

interface LinkProps {
  /** URL de destino. */
  href: string;
  children: React.ReactNode;
  /** Abre el enlace en una nueva pestaña con rel seguro. */
  external?: boolean;
  /** Clase adicional para variantes contextuales. */
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function Link({ href, children, external = false, className, onClick }: LinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
