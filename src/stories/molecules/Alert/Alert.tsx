'use client';

/* eslint-disable react-refresh/only-export-components --
   Namespace compuesto (`Object.assign`) + subpartes como named exports: la
   heurística de fast-refresh no reconoce el `Object.assign` como componente. El
   patrón es intencional (DX cliente + RSC-safe) y fast-refresh no aplica a source
   de librería. */
import { forwardRef, useState } from 'react';
import { CloseButton } from '../../atoms/CloseButton/CloseButton';
import './Alert.css';

export type AlertVariant = 'default' | 'success' | 'error' | 'warning';

export interface AlertProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: AlertVariant;
  /** Título del alert. **Opcional**: en modo composición usa `children` (p. ej. `<Alert.Title>`). */
  title?: string;
  description?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  /**
   * Dónde dejar el foco al descartar. El botón de cierre desaparece con el
   * alert, así que el foco se movería al `<body>` y se perdería el sitio en la
   * página. Pásale la referencia del elemento que provocó el aviso (el botón
   * que lanzó la acción, el campo que falló). Sin ella, el componente enfoca
   * el `<body>` con `tabindex="-1"` temporal: el lector vuelve al principio
   * del documento, que es el último recurso, no lo deseable.
   */
  finalFocus?: React.RefObject<HTMLElement | null>;
  /**
   * Etiqueta accesible del botón de cierre. Default: «Cerrar» (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  closeLabel?: string;
}

export type AlertTitleProps = React.ComponentPropsWithoutRef<'p'>;
export type AlertDescriptionProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * Rol ARIA por variante. `error` y `warning` interrumpen (`alert`, live
 * assertive); `default` y `success` informan sin interrumpir (`status`, live
 * polite). El consumidor puede forzarlo con la prop `role`.
 */
const ROLE_BY_VARIANT: Record<AlertVariant, 'alert' | 'status'> = {
  default: 'status',
  success: 'status',
  error: 'alert',
  warning: 'alert',
};

/** Subparte de composición: título del alert. */
export const AlertTitle = forwardRef<HTMLParagraphElement, AlertTitleProps>(function AlertTitle(
  { className, children, ...rest }, ref) {
  return (
    <p ref={ref} className={['alert__title', className ?? ''].filter(Boolean).join(' ')} {...rest}>
      {children}
    </p>
  );
});

/** Subparte de composición: descripción del alert. */
export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(function AlertDescription(
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
 * Extiende los atributos nativos de `<div>` y reenvía `{...rest}` al raíz. El
 * `role` sale de la variante (`alert` en error/warning, `status` en el resto) y
 * se puede forzar con la prop `role`.
 */
const AlertRoot = forwardRef<HTMLDivElement, AlertProps>(function Alert({
  variant = 'default',
  title,
  description,
  dismissible = false,
  onDismiss,
  finalFocus,
  closeLabel = 'Cerrar',
  className,
  children,
  role,
  ...rest
}, ref) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const classes = [
    'alert',
    variant !== 'default' ? `alert--${variant}` : '',
    // El relleno del alert es oscuro salvo en `warning`, que es el amarillo
    // del rol de aviso con tinta prusia encima: la raíz se declara superficie
    // oscura para que lo que se componga dentro (enlaces, botones, el propio
    // cierre) tome su cara clara — y el aviso queda fuera, porque ahí la
    // superficie es clara.
    variant !== 'warning' ? 'surface-dark' : '',
    dismissible ? 'alert--dismissible' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  /**
   * Saca el foco del botón de cierre antes de que desaparezca. Con
   * `finalFocus`, al elemento que se indique; sin ella, al `<body>`, al que
   * hay que darle `tabindex` para poder enfocarlo — se quita acto seguido,
   * que el foco ya está puesto y el atributo no debe quedarse en el
   * documento del consumidor.
   */
  function moveFocusAway() {
    if (typeof document === 'undefined') return;
    const target = finalFocus?.current;
    if (target) {
      target.focus();
      return;
    }
    const body = document.body;
    const hadTabIndex = body.hasAttribute('tabindex');
    if (!hadTabIndex) body.setAttribute('tabindex', '-1');
    body.focus();
    if (!hadTabIndex) body.removeAttribute('tabindex');
  }

  function handleDismiss() {
    moveFocusAway();
    if (onDismiss) {
      onDismiss();
    } else {
      setDismissed(true);
    }
  }

  return (
    <div ref={ref} role={role ?? ROLE_BY_VARIANT[variant]} className={classes} {...rest}>
      <div className="alert__content">
        {title && <p className="alert__title">{title}</p>}
        {description && <div className="alert__description">{description}</div>}
        {children}
      </div>
      {dismissible && (
        <CloseButton className="alert__close" label={closeLabel} onClick={handleDismiss} />
      )}
    </div>
  );
});

/**
 * Namespace de composición. Las subpartes también están disponibles como **named
 * exports** (`AlertTitle`, `AlertDescription`): en **Server Components (RSC)** usa los
 * named exports — el namespace (`Alert.Title`) requiere contexto cliente.
 */
export const Alert = Object.assign(AlertRoot, {
  Title: AlertTitle,
  Description: AlertDescription,
});
