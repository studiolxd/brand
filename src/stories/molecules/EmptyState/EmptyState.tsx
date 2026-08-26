import './EmptyState.css';
import { Button } from '../../atoms/Button/Button';

export interface EmptyStateAction {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
}

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: EmptyStateAction;
  size?: 'sm' | 'md';
}

export function EmptyState({ title, description, icon, action, size = 'md', className, ...rest }: EmptyStateProps) {
  // `...rest` al contenedor: un estado vacío que aparece tras filtrar se anuncia con role="status"/aria-live.
  return (
    <div
      className={['empty-state', size === 'sm' ? 'empty-state--sm' : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {icon && <div className="empty-state__icon">{icon}</div>}
      <div className="empty-state__body">
        <p className="empty-state__title">{title}</p>
        {description && <p className="empty-state__description">{description}</p>}
      </div>
      {action && (
        <Button
          variant="outline"
          size={size === 'sm' ? 'sm' : 'md'}
          onClick={action.onClick}
          href={action.href}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
