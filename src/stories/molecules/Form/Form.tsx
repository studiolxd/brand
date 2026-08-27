import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { FormSizeContext, type FormSize } from '../../constants/form-size';
import './Form.css';

export interface FormProps extends Omit<ComponentProps<'form'>, 'children'> {
  /** Los campos. Opcional: un formulario puede ser solo acciones (reenviar un correo, aceptar o rechazar). */
  children?: ReactNode;
  /** Errores del formulario entero (los que no cuelgan de un campo): el fallo del servidor, por ejemplo. */
  errors?: string[];
  /** La acción principal (y, si hay, la secundaria): botones. */
  actions?: ReactNode;
  /** Enlaces secundarios bajo las acciones: «¿Has olvidado la contraseña?», o con texto delante: `<Paragraph>¿No tienes cuenta? <Link>Regístrate</Link></Paragraph>`. */
  links?: ReactNode;
  /** El captcha (Turnstile, reCAPTCHA…): entre los campos y las acciones, con su propio aire. */
  captcha?: ReactNode;
  /** Otras formas de hacer lo mismo: acceso con Google, enlace mágico… Van separadas del bloque principal. */
  alternatives?: ReactNode;
  /** Rótulo sobre las alternativas: «o continúa con». */
  alternativesLabel?: string;
  /** Talla de todos los campos y botones (32/40/48): `lg` en superficies públicas, `md` dentro de las aplicaciones. */
  size?: FormSize;
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
  { errors, actions, links, alternatives, alternativesLabel, captcha, size, className, children, ...rest },
  ref,
) {
  const classes = ['form', size && size !== 'md' ? `form--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <FormSizeContext.Provider value={size}>
      <form ref={ref} className={classes} noValidate {...rest}>
        {children && <div className="form__fields">{children}</div>}
        {captcha && <div className="form__captcha">{captcha}</div>}
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
