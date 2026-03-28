import './Label.css';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  hidden?: boolean;
  dark?: boolean;
}

export function Label({ htmlFor, children, hidden = false, dark = false }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={['label', hidden ? 'visually-hidden' : '', dark ? 'label--dark' : ''].filter(Boolean).join(' ')}
    >
      {children}
    </label>
  );
}
