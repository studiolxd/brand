import { useState } from 'react';
import { Close } from '../../atoms/Close/Close';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Alert.css';

export interface AlertProps {
  variant?: 'default' | 'success' | 'error' | 'warning';
  title: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  variant = 'default',
  title,
  description,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const classes = [
    'alert',
    variant !== 'default' ? `alert--${variant}` : '',
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
    <div role="alert" className={classes}>
      <div className="alert__content">
        <p className="alert__title">{title}</p>
        {description && <p className="alert__description">{description}</p>}
      </div>
      {dismissible && (
        <button type="button" className="alert__close" onClick={handleDismiss}>
          <Close size="sm" />
          <VisuallyHidden>Cerrar</VisuallyHidden>
        </button>
      )}
    </div>
  );
}
