'use client';

import { useEffect, type ReactNode } from 'react';
import { Command } from 'cmdk';
import { Modal } from '../Modal/Modal';
import './CommandPalette.css';

export interface CommandPaletteItem {
  /** Clave estable del ítem. */
  id: string;
  /** Etiqueta visible; es también el texto sobre el que filtra el buscador. */
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  /** Términos extra por los que el ítem debe encontrarse. */
  keywords?: string[];
  disabled?: boolean;
}

export interface CommandPaletteGroup {
  id: string;
  heading: string;
  items: CommandPaletteItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Grupos de comandos, en orden. Los grupos sin ítems no se renderizan —
   * el call-site no necesita condicionarlos.
   */
  groups: CommandPaletteGroup[];
  /** Título accesible y visible del diálogo. */
  title: string;
  placeholder: string;
  /** Texto del estado "sin resultados". */
  emptyLabel: string;
  /**
   * Etiqueta accesible de la lista. cmdk rotula el listbox "Suggestions" en
   * inglés si no se pasa, así que en apps multiidioma es obligatoria de facto.
   */
  listLabel?: string;
  /** Etiqueta del botón de cierre del diálogo. */
  closeLabel?: string;
  /**
   * Tecla del atajo global (con ⌘ o Ctrl) que abre y cierra la paleta.
   * `false` desactiva el atajo — la apertura queda en manos del call-site.
   */
  shortcut?: string | false;
  className?: string;
}

/**
 * Paleta de comandos ⌘K: diálogo con buscador difuso, resultados agrupados y
 * estado vacío. Se monta una sola vez en el shell de la aplicación y se
 * alimenta de forma declarativa con `groups`.
 *
 * `cmdk` aporta el comportamiento (filtrado, navegación con ↑↓, Enter) igual
 * que Radix en el resto del DS; la superficie es la del `Modal`.
 */
export function CommandPalette({
  open,
  onOpenChange,
  groups,
  title,
  placeholder,
  emptyLabel,
  listLabel,
  closeLabel,
  shortcut = 'k',
  className,
}: CommandPaletteProps) {
  useEffect(() => {
    if (shortcut === false) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === shortcut && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shortcut, open, onOpenChange]);

  const visibleGroups = groups.filter((group) => group.items.length > 0);

  return (
    <Modal
      open={open}
      onClose={() => onOpenChange(false)}
      title={title}
      {...(closeLabel ? { closeLabel } : {})}
    >
      <Command className={['command-palette', className].filter(Boolean).join(' ')}>
        {/* Modal neutraliza su auto-focus de apertura (correcto para diálogos
            genéricos); una paleta sí quiere el buscador enfocado al abrir. */}
        <Command.Input
          className="command-palette__input"
          placeholder={placeholder}
          autoFocus
        />
        <Command.List className="command-palette__list" label={listLabel}>
          {/* cmdk fuerza role="presentation" en Empty: sin la región viva, el
              "sin resultados" nunca se anuncia. */}
          <Command.Empty className="command-palette__empty">
            <span role="status">{emptyLabel}</span>
          </Command.Empty>

          {visibleGroups.map((group) => (
            <Command.Group
              key={group.id}
              className="command-palette__group"
              heading={group.heading}
            >
              {group.items.map((item) => (
                <Command.Item
                  key={item.id}
                  className="command-palette__item"
                  value={item.label}
                  keywords={item.keywords}
                  disabled={item.disabled}
                  onSelect={() => {
                    onOpenChange(false);
                    item.onSelect();
                  }}
                >
                  {item.icon && (
                    <span className="command-palette__item-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </Modal>
  );
}
