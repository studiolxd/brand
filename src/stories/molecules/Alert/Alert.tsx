import { forwardRef, useState } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Alert.css';

export interface AlertProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'success' | 'error' | 'warning';
  /** Título del alert. **Opcional**: en modo composición usa `children` (p. ej. `<Alert.Title>`). */
  title?: string;
  description?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export type AlertTitleProps = React.ComponentPropsWithoutRef<'p'>;
export type AlertDescriptionProps = React.ComponentPropsWithoutRef<'div'>;

/** Subparte de composición: título del alert. */
const AlertTitle = forwardRef<HTMLParagraphElement, AlertTitleProps>(function AlertTitle(
  { className, children, ...rest }, ref) {
  return (
    <p ref={ref} className={['alert__title', className ?? ''].filter(Boolean).join(' ')} {...rest}>
      {children}
    </p>
  );
});

/** Subparte de composición: descripción del alert. */
const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(function AlertDescription(
  { className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={['alert__description', className ?? ''].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
});

/**
 * Alert. Dos modos, combinables:
 * - **Props**: `title` (+ `description`) para el caso simple.
 * - **Composición**: `children` (p. ej. `<Alert.Title>` / `<Alert.Description>` o nodos
 *   arbitrarios) cuando el consumidor gestiona el contenido.
 *
 * Extiende los atributos nativos de `<div>` y reenvía `{...rest}` al raíz (para
 * `role="status"`/`role="alert"`, `data-*`…). `role` por defecto `"alert"`.
 */
const AlertRoot = forwardRef<HTMLDivElement, AlertProps>(function Alert({
  variant = 'default',
  title,
  description,
  dismissible = false,
  onDismiss,
  className,
  children,
  role = 'alert',
  ...rest
}, ref) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const classes = [
    'alert',
    variant !== 'default' ? `alert--${variant}` : '',
    variant !== 'warning' ? 'surface-dark' : '',
    dismissible ? 'alert--dismissible' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  function handleDismiss() {
    if (onDismiss) {
      onDismiss();
    } else {
      setDismissed(true);
    }
  }

  return (
    <div ref={ref} role={role} className={classes} {...rest}>
      <div className="alert__content">
        {title && <p className="alert__title">{title}</p>}
        {description && <div className="alert__description">{description}</div>}
        {children}
      </div>
      {dismissible && (
        <button type="button" className="alert__close" onClick={handleDismiss}>
          <Icon name="close" size="sm" />
          <VisuallyHidden>Cerrar</VisuallyHidden>
        </button>
      )}
    </div>
  );
});

export const Alert = Object.assign(AlertRoot, {
  Title: AlertTitle,
  Description: AlertDescription,
});
