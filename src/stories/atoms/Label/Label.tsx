import './Label.css';
import '../VisuallyHidden/VisuallyHidden.css';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  hidden?: boolean;
}

export function Label({ htmlFor, children, hidden = false }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={['label', hidden ? 'visually-hidden' : ''].filter(Boolean).join(' ')}
    >
      {children}
    </label>
  );
}
