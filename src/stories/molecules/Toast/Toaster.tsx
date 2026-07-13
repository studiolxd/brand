import { Toaster as SonnerToaster } from 'sonner';
import { Icon } from '../../atoms/Icon/Icon';
import './Toast.css';

export interface ToasterProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center';
  /** Tema del toaster, para sincronizar con el tema de la app (p. ej. next-themes). */
  theme?: 'light' | 'dark' | 'system';
  /** aria-label del contenedor de notificaciones (i18n). */
  containerAriaLabel?: string;
}

export function Toaster({ position = 'bottom-right', theme, containerAriaLabel }: ToasterProps) {
  return (
    <SonnerToaster
      closeButton
      position={position}
      theme={theme}
      containerAriaLabel={containerAriaLabel}
      gap={8}
      className="toaster"
      icons={{ close: <Icon name="close" size="sm" /> }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:       'toast',
          title:       'toast__title',
          description: 'toast__description',
          closeButton: 'toast__close',
          icon:        'toast__icon',
          success:     'toast--success',
          error:       'toast--error',
          warning:     'toast--warning',
          info:        'toast--info',
        },
      }}
    />
  );
}
