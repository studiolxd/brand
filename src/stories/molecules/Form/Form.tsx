import './Form.css';

interface FormProps {
  errors?: string[];
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function Form({ errors, onSubmit, actions, children }: FormProps) {
  return (
    <form
      className="form"
      onSubmit={onSubmit}
      noValidate
    >
      {children}
      {errors && errors.length > 0 && (
        <ul className="form-errors" role="alert">
          {errors.map((error) => (
            <li key={error} className="form-errors__item">{error}</li>
          ))}
        </ul>
      )}
      {actions}
    </form>
  );
}
