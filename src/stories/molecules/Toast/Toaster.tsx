import { Toaster as SonnerToaster } from 'sonner';
import { Close } from '../../atoms/Close/Close';
import './Toast.css';

export interface ToasterProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center';
}

export function Toaster({ position = 'bottom-right' }: ToasterProps) {
  return (
    <SonnerToaster
      closeButton
      position={position}
      gap={8}
      className="toaster"
      icons={{ close: <Close size="sm" /> }}
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
