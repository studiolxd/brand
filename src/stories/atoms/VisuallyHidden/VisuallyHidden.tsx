import './VisuallyHidden.css';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  className?: string;
}

/** Oculta contenido visualmente pero lo mantiene accesible para lectores de pantalla. */
export function VisuallyHidden({ children, className }: VisuallyHiddenProps) {
  const classes = ['visually-hidden', className].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}
