import { forwardRef } from 'react';
import './Form.css';

interface FormProps {
  errors?: string[];
  onSubmit?: React.ComponentProps<'form'>['onSubmit'];
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
      <div className="form__fields">
        {children}
        {errors && errors.length > 0 && (
          <div role="alert" className="form-errors">
            <ul className="form-errors__list">
              {errors.map((error) => (
                <li key={error} className="form-errors__item">{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {actions && <div className="form__actions">{actions}</div>}
    </form>
  );
});
