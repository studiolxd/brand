import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { useId, type ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { Menu } from '../Menu/Menu';
import { Tooltip } from '../../atoms/Tooltip/Tooltip';
import { useSidebar } from '../../sections/Sidebar/SidebarContext';
import './SidebarNav.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { sidebarNavEs } from '../../messages/es/sidebarNav';
import { defaultRenderLink } from '../../constants/default-render-link';

export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  icon?: ReactNode;
  /**
   * La entrada existe pero no lleva a ninguna parte todavía: se enseña con su
   * marca («sin docs») y sin enlace, en vez de esconderla.
   */
  empty?: boolean;
}

export interface SidebarNavLinkEntry {
  kind: 'link';
  id: string;
  label: string;
  href: string;
  active?: boolean;
  icon?: ReactNode;
  /** Igual que en `SidebarNavItem`: se enseña marcada y sin enlace. */
  empty?: boolean;
}

export interface SidebarNavGroupEntry {
  kind: 'group';
  id: string;
  label: string;
  /** Cuando se especifica, el label de la categoría se renderiza como enlace. */
  href?: string;
  /** Icono del grupo, visible en modo colapsado. */
  icon?: ReactNode;
  items: SidebarNavItem[];
}

export type SidebarNavEntry = SidebarNavLinkEntry | SidebarNavGroupEntry;

export type SidebarNavRenderLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  className: string;
  title?: string;
  'aria-current'?: 'page';
};

export interface SidebarNavProps {
  /**
   * Nombre accesible del `nav`. **Sin default**: sin él, sale de
   * `sidebarNav.label` del `BrandMessagesProvider`.
   */
  label?: string;
  /**
   * Marca de las entradas vacías (`empty`). **Sin default**: sale de
   * `sidebarNav.empty`. Solo se lee cuando hay alguna entrada vacía.
   */
  emptyLabel?: string;
  /**
   * Nombre de una entrada vacía donde no cabe la marca aparte —el tooltip y
   * el nombre accesible del modo rail, el rótulo del menú de un grupo—.
   * Recibe el rótulo de la entrada y la marca de vacío ya resuelta. **Sin
   * default**: sale de `sidebarNav.emptyEntry`. Solo se lee cuando hay alguna
   * entrada vacía en esas formas.
   */
  emptyEntryLabel?: (label: string, empty: string) => string;
  /** Solo iconos: los enlaces con tooltip, los grupos como menú. Sin él, lo decide la `Sidebar` (rail). */
  rail?: boolean;
  entries: SidebarNavEntry[];
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  renderLink?: (props: SidebarNavRenderLinkProps) => ReactNode;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * Los dos textos de la navegación, los dos **cromo**: el nombre de la región
 * («Principal», el mismo en toda la suite) y la marca que se pone a una entrada
 * sin contenido. Los rótulos de las entradas son **contenido** y siguen
 * viniendo en `entries`.
 */
export interface SidebarNavMessages {
  /** Nombre accesible del `nav`. */
  label: string;
  /** Marca de las entradas sin contenido. */
  empty: string;
  /**
   * Una entrada vacía nombrada en una sola cadena: «Guías — sin docs». Recibe
   * el rótulo de la entrada y la marca de vacío; es función porque el orden y
   * el separador son de cada idioma.
   */
  emptyEntry: (label: string, empty: string) => string;
}

export function SidebarNav({
  label,
  emptyLabel,
  emptyEntryLabel,
  rail,
  entries,
  defaultValue,
  value,
  onValueChange,
  renderLink = defaultRenderLink,
  className,
}: SidebarNavProps) {
  const t = useBrandMessages('sidebarNav', sidebarNavEs);
  // El disparador del grupo es un botón con solo el chevrón: toma su nombre
  // accesible de la etiqueta del grupo (`aria-labelledby`), que ya está
  // pintada; el panel que despliega, también.
  const groupLabelPrefix = useId();
  const vacía = (entryLabel: string) => t('emptyEntry', emptyEntryLabel)(entryLabel, t('empty', emptyLabel));
  const accordionProps = value !== undefined
    ? {
        value,
        onValueChange: (next: BaseAccordion.Root.Props['value']) =>
          onValueChange?.((next ?? []) as string[]),
      }
    : { defaultValue };

  const sidebar = useSidebar();
  const isRail = rail ?? sidebar.rail;

  if (isRail) {
    return (
      <nav className={['sidebar-nav', 'sidebar-nav--rail', className].filter(Boolean).join(' ')} aria-label={t('label', label)}>
        <ul className="sidebar-nav__rail" role="list">
          {entries.map((entry) => {
            const glyph = (
              <span className="sidebar-nav__rail-icon" aria-hidden="true">
                {entry.icon ?? <span className="sidebar-nav__rail-initial">{entry.label.charAt(0)}</span>}
              </span>
            );
            if (entry.kind === 'link') {
              // Vacía: se enseña igual, pero sin enlace y diciendo por qué.
              if (entry.empty) {
                return (
                  <li key={entry.id}>
                    <Tooltip label={vacía(entry.label)} side="right">
                      <span
                        className="sidebar-nav__rail-item sidebar-nav__rail-item--empty"
                        aria-disabled="true"
                        aria-label={vacía(entry.label)}
                      >
                        {glyph}
                      </span>
                    </Tooltip>
                  </li>
                );
              }
              return (
                <li key={entry.id}>
                  <Tooltip label={entry.label} side="right">
                    {renderLink({
                      href: entry.href,
                      className: ['sidebar-nav__rail-item', entry.active ? 'sidebar-nav__rail-item--active' : ''].filter(Boolean).join(' '),
                      'aria-current': entry.active ? 'page' : undefined,
                      'aria-label': entry.label,
                      children: glyph,
                    } as SidebarNavRenderLinkProps)}
                  </Tooltip>
                </li>
              );
            }
            const groupActive = entry.items.some((item) => item.active);
            // El menú del grupo: si el grupo tiene portada, es el primer enlace; si no, un rótulo.
            const items = [
              entry.href
                ? { type: 'link' as const, label: entry.label, href: entry.href }
                : { type: 'label' as const, label: entry.label },
              ...(entry.href ? [{ type: 'separator' as const }] : []),
              // Una entrada vacía no es un enlace: en el menú queda como rótulo.
              ...entry.items.map((item) => (
                item.empty
                  ? { type: 'label' as const, label: vacía(item.label) }
                  : { type: 'link' as const, label: item.label, href: item.href }
              )),
            ];
            return (
              <li key={entry.id}>
                <Menu
                  items={items}
                  side="right"
                  align="start"
                  openOnHover
                  renderLink={(props) => renderLink({ ...(props as SidebarNavRenderLinkProps), href: props.href, className: props.className, children: props.children })}
                  trigger={
                    <button
                      type="button"
                      className={['sidebar-nav__rail-item', groupActive ? 'sidebar-nav__rail-item--active' : ''].filter(Boolean).join(' ')}
                      aria-label={entry.label}
                    >
                      {glyph}
                    </button>
                  }
                />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav className={['sidebar-nav', className].filter(Boolean).join(' ')} aria-label={t('label', label)}>
      <BaseAccordion.Root className="sidebar-nav__accordion" multiple {...accordionProps}>
        {entries.map((entry) => {
          if (entry.kind === 'link') {
            const cls = [
              'sidebar-nav__top-link',
              entry.active ? 'sidebar-nav__top-link--active' : '',
            ].filter(Boolean).join(' ');

            if (entry.empty) {
              return (
                <div key={entry.id}>
                  <span className={`${cls} sidebar-nav__top-link--empty`} aria-disabled="true" title={entry.label}>
                    {entry.icon && (
                      <span className="sidebar-nav__item-icon" aria-hidden="true">{entry.icon}</span>
                    )}
                    <span className="sidebar-nav__item-label">{entry.label}</span>
                    <span className="sidebar-nav__empty-mark">{t('empty', emptyLabel)}</span>
                  </span>
                </div>
              );
            }

            return (
              <div key={entry.id}>
                {renderLink({
                  href: entry.href,
                  className: cls,
                  title: entry.label,
                  'aria-current': entry.active ? 'page' : undefined,
                  children: (
                    <>
                      {entry.icon && (
                        <span className="sidebar-nav__item-icon" aria-hidden="true">
                          {entry.icon}
                        </span>
                      )}
                      <span className="sidebar-nav__item-label">{entry.label}</span>
                    </>
                  ),
                })}
              </div>
            );
          }

          const groupLabelId = `${groupLabelPrefix}-${entry.id}`;
          return (
            <BaseAccordion.Item key={entry.id} value={entry.id} className="sidebar-nav__group">
              <BaseAccordion.Header className="sidebar-nav__group-header">
                {entry.href
                  ? renderLink({
                      href: entry.href,
                      className: 'sidebar-nav__group-label',
                      title: entry.label,
                      children: (
                        <>
                          {entry.icon && <span className="sidebar-nav__item-icon" aria-hidden="true">{entry.icon}</span>}
                          <span className="sidebar-nav__item-label" id={groupLabelId}>{entry.label}</span>
                        </>
                      ),
                    })
                  : (
                    <span className="sidebar-nav__group-label" title={entry.label}>
                      {entry.icon && <span className="sidebar-nav__item-icon" aria-hidden="true">{entry.icon}</span>}
                      <span className="sidebar-nav__item-label" id={groupLabelId}>{entry.label}</span>
                    </span>
                  )
                }
                <BaseAccordion.Trigger className="sidebar-nav__group-chevron" aria-labelledby={groupLabelId}>
                  <Icon name="chevron" className="sidebar-nav__group-chevron-icon" size="sm" />
                </BaseAccordion.Trigger>
              </BaseAccordion.Header>
              {/* El panel también se nombra por la etiqueta: Base UI lo apunta al
                  disparador, y un `aria-labelledby` no se sigue en cadena. */}
              <BaseAccordion.Panel className="sidebar-nav__group-content" aria-labelledby={groupLabelId}>
                <div className="sidebar-nav__group-content-inner">
                  <ul className="sidebar-nav__items" role="list">
                    {entry.items.map((item) => {
                      const cls = [
                        'sidebar-nav__item',
                        item.active ? 'sidebar-nav__item--active' : '',
                      ].filter(Boolean).join(' ');

                      if (item.empty) {
                        return (
                          <li key={item.id}>
                            <span className={`${cls} sidebar-nav__item--empty`} aria-disabled="true">
                              {item.icon && (
                                <span className="sidebar-nav__item-icon" aria-hidden="true">{item.icon}</span>
                              )}
                              <span className="sidebar-nav__item-label">{item.label}</span>
                              <span className="sidebar-nav__empty-mark">{t('empty', emptyLabel)}</span>
                            </span>
                          </li>
                        );
                      }

                      return (
                        <li key={item.id}>
                          {renderLink({
                            href: item.href,
                            className: cls,
                            'aria-current': item.active ? 'page' : undefined,
                            children: (
                              <>
                                {item.icon && (
                                  <span className="sidebar-nav__item-icon" aria-hidden="true">
                                    {item.icon}
                                  </span>
                                )}
                                <span className="sidebar-nav__item-label">{item.label}</span>
                              </>
                            ),
                          })}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </BaseAccordion.Panel>
            </BaseAccordion.Item>
          );
        })}
      </BaseAccordion.Root>
    </nav>
  );
}
