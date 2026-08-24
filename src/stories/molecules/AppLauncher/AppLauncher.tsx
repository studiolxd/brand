import * as RadixPopover from '@radix-ui/react-popover';
import { Icon } from '../../atoms/Icon/Icon';
import { Tag } from '../../atoms/Tag/Tag';
import './AppLauncher.css';

export interface LauncherApp {
  id: string;
  name: string;
  url: string;
  /** Color de acento de la app (llega por datos, no del sistema de tokens). */
  accent: string;
  isNew?: boolean;
}

export interface AppLauncherLabels {
  /** Texto accesible del trigger («Abrir launcher de apps»). */
  open: string;
  /** Texto del badge de app nueva. */
  new: string;
}

export interface AppLauncherProps {
  apps: LauncherApp[];
  labels: AppLauncherLabels;
  /** Id de la app actual — se marca en la rejilla. */
  currentAppId?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function initial(name: string): string {
  return name.trim().slice(0, 1).toUpperCase();
}

export function AppLauncher({
  apps,
  labels,
  currentAppId,
  open,
  defaultOpen,
  onOpenChange,
}: AppLauncherProps) {
  return (
    <RadixPopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>
        <button type="button" className="app-launcher__trigger" aria-label={labels.open}>
          <Icon name="grid" size="md" />
        </button>
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          className="app-launcher__content"
          sideOffset={4}
          align="end"
        >
          <ul className="app-launcher__grid" role="list">
            {apps.map((app) => {
              const isCurrent = app.id === currentAppId;
              return (
                <li key={app.id}>
                  <a
                    href={app.url}
                    className={`app-launcher__tile${isCurrent ? ' app-launcher__tile--active' : ''}`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    <span
                      className="app-launcher__tile-icon"
                      style={{ backgroundColor: app.accent }}
                      aria-hidden="true"
                    >
                      {initial(app.name)}
                    </span>
                    <span className="app-launcher__tile-name">{app.name}</span>
                    {app.isNew && (
                      <Tag variant="info" className="app-launcher__tile-badge">
                        {labels.new}
                      </Tag>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
