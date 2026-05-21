import './EmptyState.css';
import { Button } from '../../atoms/Button/Button';

export interface EmptyStateAction {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: EmptyStateAction;
  size?: 'sm' | 'md';
}

export function EmptyState({ title, description, icon, action, size = 'md' }: EmptyStateProps) {
  return (
    <div
      className={['empty-state', size === 'sm' ? 'empty-state--sm' : ''].filter(Boolean).join(' ')}
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
