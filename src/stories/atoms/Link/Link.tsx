import './Link.css';

interface LinkProps {
  /** URL de destino. */
  href: string;
  children: React.ReactNode;
  /** Abre el enlace en una nueva pestaña con rel seguro. */
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function Link({ href, children, external = false, onClick }: LinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
