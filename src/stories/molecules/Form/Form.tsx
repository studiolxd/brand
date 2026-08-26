import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { FormSizeContext, type FormSize } from '../../constants/form-size';
import './Form.css';

export interface FormProps extends Omit<ComponentProps<'form'>, 'children'> {
  /** Errores del formulario entero (los que no cuelgan de un campo): el fallo del servidor, por ejemplo. */
  errors?: string[];
  /** La acción principal (y, si hay, la secundaria): botones. */
  actions?: ReactNode;
  /** Enlaces secundarios bajo las acciones: «¿Has olvidado la contraseña?», «¿No tienes cuenta?». */
  links?: ReactNode;
  /** Otras formas de hacer lo mismo: acceso con Google, enlace mágico… Van separadas del bloque principal. */
  alternatives?: ReactNode;
  /** Rótulo sobre las alternativas: «o continúa con». */
  alternativesLabel?: string;
  /** Talla de todos los campos y botones (32/40/48): `lg` en superficies públicas, `md` dentro de las aplicaciones. */
  size?: FormSize;
  children: ReactNode;
}

/**
 * El formulario del sistema: solo estructura y aire. Campos apilados, los
 * errores del formulario, las acciones, los enlaces secundarios y las
 * alternativas, cada bloque con su separación por tokens; y la talla, que
 * reparte a todo lo de dentro. Lo que hay dentro de cada campo (etiqueta,
 * control, ayuda, error) es de los `*Field`; el estado y la validación, del
 * producto (`FormField` para react-hook-form).
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { errors, actions, links, alternatives, alternativesLabel, size, className, children, ...rest },
  ref,
) {
  const classes = ['form', size && size !== 'md' ? `form--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <FormSizeContext.Provider value={size}>
      <form ref={ref} className={classes} noValidate {...rest}>
        <div className="form__fields">{children}</div>
        {errors && errors.length > 0 && (
          <ul role="alert" className="form__errors">
            {errors.map((error) => (
              <li key={error} className="form__error">{error}</li>
            ))}
          </ul>
        )}
        {actions && <div className="form__actions">{actions}</div>}
        {links && <div className="form__links">{links}</div>}
        {alternatives && (
          <div className="form__alternatives">
            {alternativesLabel && <p className="form__alternatives-label">{alternativesLabel}</p>}
            {alternatives}
          </div>
        )}
      </form>
    </FormSizeContext.Provider>
  );
});
