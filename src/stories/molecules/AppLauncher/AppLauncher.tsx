import { useState } from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { Icon } from '../../atoms/Icon/Icon';
import { Tag } from '../../atoms/Tag/Tag';
import { Modal } from '../Modal/Modal';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './AppLauncher.css';

/**
 * El cromo del lanzador, y **solo el cromo**: el nombre accesible del
 * disparador, el título del diálogo y la marca de app nueva. Las tres valen
 * igual en todas las apps de la suite —el lanzador es el mismo mueble en
 * todas— y ninguna nombra una aplicación concreta: eso viaja en `apps`.
 *
 * **`trigger` no está aquí** y sigue siendo prop. No es un texto de más: su
 * presencia decide la cara del disparador —solo icono, o icono con rótulo—, y
 * un texto de catálogo está siempre presente, así que ponerlo aquí obligaría a
 * todos los lanzadores de la suite a llevar rótulo. Es una decisión de
 * maqueta que se toma en el sitio donde se monta.
 */
export interface AppLauncherMessages {
  /** Nombre accesible del disparador cuando es solo icono («Abrir launcher de apps»). */
  open: string;
  /** Texto del distintivo de app nueva. */
  new: string;
  /** Título del diálogo con `presentation="modal"`. */
  title: string;
}

export interface LauncherApp {
  id: string;
  name: string;
  url: string;
  isNew?: boolean;
}

export interface AppLauncherLabels {
  /**
   * Texto accesible del trigger («Abrir launcher de apps»). Solo se usa como
   * `aria-label` cuando no hay `trigger`: con texto visible, el nombre
   * accesible es ese texto. **Sin default**: sin él, sale de
   * `appLauncher.open` del `BrandMessagesProvider`.
   */
  open?: string;
  /**
   * Texto del badge de app nueva. **Sin default**: sin él, sale de
   * `appLauncher.new` del proveedor.
   */
  new?: string;
  /**
   * Texto visible del disparador (p. ej. «Aplicaciones»), a la derecha del
   * icono de rejilla. Sin él, el disparador se queda como hoy: solo icono,
   * con `open` de nombre accesible.
   */
  trigger?: string;
  /**
   * Título del diálogo cuando `presentation="modal"`. **Sin default**: sin él,
   * sale de `appLauncher.title` del proveedor. Sin uso en
   * `presentation="popover"`, que no lleva título.
   */
  title?: string;
}

export interface AppLauncherProps {
  apps: LauncherApp[];
  /**
   * Anulaciones puntuales de los textos del lanzador. **Ya no es
   * obligatoria**: sin ella, el cromo sale del espacio `appLauncher` del
   * `BrandMessagesProvider`. Sigue haciendo falta para `trigger`, que no es
   * catálogo.
   */
  labels?: AppLauncherLabels;
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

function LauncherTile({ app, isCurrent, newLabel }: { app: LauncherApp; isCurrent: boolean; newLabel?: string }) {
  const t = useBrandMessages('appLauncher');
  return (
    <a
      href={app.url}
      className={`app-launcher__tile${isCurrent ? ' app-launcher__tile--active' : ''}`}
      aria-current={isCurrent ? 'page' : undefined}
    >
      <span className="app-launcher__tile-name">{app.name}</span>
      {app.isNew && (
        <Tag variant="info" className="app-launcher__tile-badge">
          {/* Se lee donde se pinta: una rejilla sin novedades no exige la clave. */}
          {t('new', newLabel)}
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
  newLabel?: string;
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
  const t = useBrandMessages('appLauncher');
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
            <button type="button" className="app-launcher__trigger" aria-label={t('open', labels.open)}>
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
  const t = useBrandMessages('appLauncher');
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
          aria-label={t('open', labels.open)}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <Icon name="grid" size="md" />
        </button>
      )}

      <Modal open={isOpen} onClose={() => setOpen(false)} title={t('title', labels.title)}>
        <AppLauncherGrid apps={apps} currentAppId={currentAppId} newLabel={labels.new} />
      </Modal>
    </>
  );
}

export function AppLauncher({ presentation = 'modal', labels = {}, ...rest }: AppLauncherProps) {
  return presentation === 'popover' ? (
    <AppLauncherPopover labels={labels} {...rest} />
  ) : (
    <AppLauncherModal labels={labels} {...rest} />
  );
}
