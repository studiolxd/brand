import { forwardRef } from 'react';
import './Form.css';

interface FormProps {
  errors?: string[];
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { errors, onSubmit, actions, children },
  ref,
) {
  return (
    <form
      ref={ref}
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
});
