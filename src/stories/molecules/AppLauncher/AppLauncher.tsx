import { useState } from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { Icon } from '../../atoms/Icon/Icon';
import { useCssProperties } from '../../constants/css-properties';
import { Tag } from '../../atoms/Tag/Tag';
import { Modal } from '../Modal/Modal';
import './AppLauncher.css';

export interface LauncherApp {
  id: string;
  name: string;
  url: string;
  /**
   * Color de acento de la app. Es un color de dato (cada app externa trae el
   * suyo, fuera del control del DS), no un token. La rejilla vive en un portal
   * y solo existe en cliente, así que el acento se escribe por el CSSOM sobre
   * `.app-launcher__tile-icon`: en un atributo `style` una app con
   * `style-src 'self'` lo descartaría sin avisar.
   */
  accent: string;
  isNew?: boolean;
}

export interface AppLauncherLabels {
  /** Texto accesible del trigger («Abrir launcher de apps»). Solo se usa como `aria-label` cuando no hay `trigger`: con texto visible, el nombre accesible es ese texto. */
  open: string;
  /** Texto del badge de app nueva. */
  new: string;
  /**
   * Texto visible del disparador (p. ej. «Aplicaciones»), a la derecha del
   * icono de rejilla. Sin él, el disparador se queda como hoy: solo icono,
   * con `open` de nombre accesible.
   */
  trigger?: string;
  /**
   * Título del diálogo cuando `presentation="modal"`. Default: «Aplicaciones»
   * (castellano). Sin uso en `presentation="popover"`, que no lleva título.
   */
  title?: string;
}

export interface AppLauncherProps {
  apps: LauncherApp[];
  labels: AppLauncherLabels;
  /** Id de la app actual — se marca en la rejilla. */
  currentAppId?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Contenedor del panel. `'modal'` (por defecto): diálogo centrado, como
   * `CommandPalette` — foco atrapado, más sitio para crecer y el mismo lugar
   * de la suite para descripciones o más aplicaciones. `'popover'`: el panel
   * flotante anclado al disparador que tenía el componente antes de v35 —
   * quien lo prefiera lo pide explícitamente.
   */
  presentation?: 'modal' | 'popover';
}

function initial(name: string): string {
  return name.trim().slice(0, 1).toUpperCase();
}

/** La baldosa, aparte porque su acento necesita un `ref` propio por app. */
function LauncherTile({ app, isCurrent, newLabel }: { app: LauncherApp; isCurrent: boolean; newLabel: string }) {
  const iconRef = useCssProperties({ 'background-color': app.accent });
  return (
    <a
      href={app.url}
      className={`app-launcher__tile${isCurrent ? ' app-launcher__tile--active' : ''}`}
      aria-current={isCurrent ? 'page' : undefined}
    >
      <span ref={iconRef} className="app-launcher__tile-icon" aria-hidden="true">
        {initial(app.name)}
      </span>
      <span className="app-launcher__tile-name">{app.name}</span>
      {app.isNew && (
        <Tag variant="info" className="app-launcher__tile-badge">
          {newLabel}
        </Tag>
      )}
    </a>
  );
}

/** La rejilla de apps: el contenido, compartido por las dos presentaciones — solo cambia el contenedor. */
function AppLauncherGrid({
  apps,
  currentAppId,
  newLabel,
}: {
  apps: LauncherApp[];
  currentAppId?: string;
  newLabel: string;
}) {
  return (
    <ul className="app-launcher__grid" role="list">
      {apps.map((app) => (
        <li key={app.id}>
          <LauncherTile app={app} isCurrent={app.id === currentAppId} newLabel={newLabel} />
        </li>
      ))}
    </ul>
  );
}

interface AppLauncherPresentationProps {
  apps: LauncherApp[];
  labels: AppLauncherLabels;
  currentAppId?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function AppLauncherPopover({
  apps,
  labels,
  currentAppId,
  open,
  defaultOpen,
  onOpenChange,
}: AppLauncherPresentationProps) {
  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
    >
      <BasePopover.Trigger
        render={
          labels.trigger ? (
            <button type="button" className="app-launcher__trigger app-launcher__trigger--label">
              <Icon name="grid" size="md" />
              <span className="app-launcher__trigger-label">{labels.trigger}</span>
            </button>
          ) : (
            <button type="button" className="app-launcher__trigger" aria-label={labels.open}>
              <Icon name="grid" size="md" />
            </button>
          )
        }
      />

      <BasePopover.Portal>
        <BasePopover.Positioner className="app-launcher__positioner" sideOffset={4} align="end">
          <BasePopover.Popup className="app-launcher__content">
            <AppLauncherGrid apps={apps} currentAppId={currentAppId} newLabel={labels.new} />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

/** Abre/cierra en modo no controlado cuando el consumidor no trae `open`. */
function useAppLauncherOpenState(
  open: boolean | undefined,
  defaultOpen: boolean | undefined,
  onOpenChange: ((open: boolean) => void) | undefined,
) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };
  return [isOpen, setOpen] as const;
}

function AppLauncherModal({
  apps,
  labels,
  currentAppId,
  open,
  defaultOpen,
  onOpenChange,
}: AppLauncherPresentationProps) {
  const [isOpen, setOpen] = useAppLauncherOpenState(open, defaultOpen, onOpenChange);

  return (
    <>
      {labels.trigger ? (
        <button
          type="button"
          className="app-launcher__trigger app-launcher__trigger--label"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <Icon name="grid" size="md" />
          <span className="app-launcher__trigger-label">{labels.trigger}</span>
        </button>
      ) : (
        <button
          type="button"
          className="app-launcher__trigger"
          aria-label={labels.open}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <Icon name="grid" size="md" />
        </button>
      )}

      <Modal open={isOpen} onClose={() => setOpen(false)} title={labels.title ?? 'Aplicaciones'}>
        <AppLauncherGrid apps={apps} currentAppId={currentAppId} newLabel={labels.new} />
      </Modal>
    </>
  );
}

export function AppLauncher({ presentation = 'modal', ...rest }: AppLauncherProps) {
  return presentation === 'popover' ? <AppLauncherPopover {...rest} /> : <AppLauncherModal {...rest} />;
}
