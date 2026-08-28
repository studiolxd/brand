import { Popover as BasePopover } from '@base-ui/react/popover';
import { Icon } from '../../atoms/Icon/Icon';
import { Tag } from '../../atoms/Tag/Tag';
import './AppLauncher.css';

export interface LauncherApp {
  id: string;
  name: string;
  url: string;
  /**
   * Color de acento de la app. Es un color de dato (cada app externa trae el suyo,
   * fuera del control del DS), no un token: se aplica con `style` inline sobre
   * `.app-launcher__tile-icon`, no con una clase ni una custom property del sistema.
   */
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
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
    >
      <BasePopover.Trigger
        render={
          <button type="button" className="app-launcher__trigger" aria-label={labels.open}>
            <Icon name="grid" size="md" />
          </button>
        }
      />

      <BasePopover.Portal>
        <BasePopover.Positioner className="app-launcher__positioner" sideOffset={4} align="end">
          <BasePopover.Popup className="app-launcher__content">
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
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
