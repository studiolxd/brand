import './Link.css';

interface LinkProps {
  /** URL de destino. */
  href: string;
  children: React.ReactNode;
  /** Abre el enlace en una nueva pestaña con rel seguro. */
  external?: boolean;
}

export function Link({ href, children, external = false }: LinkProps) {
  return (
    <a
      href={href}
      className="link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
