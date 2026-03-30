import './VisuallyHidden.css';

interface VisuallyHiddenProps {
  children: React.ReactNode;
}

/** Oculta contenido visualmente pero lo mantiene accesible para lectores de pantalla. */
export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="visually-hidden">{children}</span>;
}
