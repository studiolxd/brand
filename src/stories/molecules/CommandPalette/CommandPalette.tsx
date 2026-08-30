'use client';

import { useCallback, useEffect, type ReactNode } from 'react';
import { Autocomplete } from '@base-ui/react/autocomplete';
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
   * Grupos de comandos, en orden. Los grupos que se quedan sin ítems al
   * filtrar no se renderizan — el call-site no necesita condicionarlos.
   */
  groups: CommandPaletteGroup[];
  /** Título accesible y visible del diálogo. */
  title: string;
  placeholder: string;
  /** Texto del estado "sin resultados". */
  emptyLabel: string;
  /**
   * Etiqueta accesible de la lista de resultados (`role="listbox"`). Sin ella
   * el listbox se queda sin nombre: pásala siempre en apps multiidioma.
   */
  listLabel?: string;
  /** Etiqueta del botón de cierre del diálogo. */
  closeLabel?: string;
  /**
   * Tecla del atajo global (con ⌘ o Ctrl) que abre y cierra la paleta.
   * `false` desactiva el atajo — la apertura queda en manos del call-site.
   */
  shortcut?: string | false;
  /**
   * Idioma con el que se comparan las cadenas al filtrar (`Intl.Collator`).
   * Por defecto, el del entorno.
   */
  locale?: Intl.LocalesArgument;
  className?: string;
}

/**
 * Paleta de comandos ⌘K: diálogo con buscador, resultados agrupados y estado
 * vacío. Se monta una sola vez en el shell de la aplicación y se alimenta de
 * forma declarativa con `groups`.
 *
 * El comportamiento (filtrado, navegación con ↑↓, Enter) es el `Autocomplete`
 * de Base UI en modo `inline` — sin popup propio, porque la superficie ya la
 * pone el `Modal`, que también se queda con Escape y el foco atrapado.
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
  locale,
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

  // `sensitivity: 'base'` iguala mayúsculas y acentos: "sesion" encuentra
  // "Cerrar sesión" y "перевод" no depende de cómo se teclee la diéresis.
  const filter = Autocomplete.useFilter({ sensitivity: 'base', locale });

  const matches = useCallback(
    (item: CommandPaletteItem, query: string) =>
      filter.contains(item.label, query) ||
      (item.keywords ?? []).some((keyword) => filter.contains(keyword, query)),
    [filter],
  );

  return (
    <Modal
      open={open}
      onClose={() => onOpenChange(false)}
      title={title}
      {...(closeLabel ? { closeLabel } : {})}
    >
      <Autocomplete.Root
        inline
        // En modo `inline` el motor no abre nada por su cuenta (el popup es el
        // propio Modal), pero la lista sí necesita estar «abierta» para que
        // Enter active el ítem resaltado.
        open
        items={groups}
        filter={matches}
        autoHighlight="always"
      >
        <div className={['command-palette', className].filter(Boolean).join(' ')}>
          {/* El Modal lleva el foco al primer elemento focable (el aspa de
              cerrar); una paleta lo quiere en el buscador. React aplica este
              `autoFocus` en el commit, antes de que Base UI resuelva su foco
              inicial, y Base UI respeta el foco que ya está dentro del panel. */}
          <Autocomplete.Input
            className="command-palette__input"
            placeholder={placeholder}
            autoFocus
          />
          <Autocomplete.List className="command-palette__list" aria-label={listLabel}>
            {(group: CommandPaletteGroup) => (
              <Autocomplete.Group
                key={group.id}
                items={group.items}
                className="command-palette__group"
              >
                <Autocomplete.GroupLabel className="command-palette__heading">
                  {group.heading}
                </Autocomplete.GroupLabel>
                <Autocomplete.Collection>
                  {(item: CommandPaletteItem) => (
                    <Autocomplete.Item
                      key={item.id}
                      value={item}
                      disabled={item.disabled}
                      className="command-palette__item"
                      onClick={() => {
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
                    </Autocomplete.Item>
                  )}
                </Autocomplete.Collection>
              </Autocomplete.Group>
            )}
          </Autocomplete.List>
          {/* Base UI monta el nodo siempre y solo le mete texto cuando la
              lista queda vacía: es su propia región viva (`role="status"`). */}
          <Autocomplete.Empty className="command-palette__empty">
            {emptyLabel}
          </Autocomplete.Empty>
        </div>
      </Autocomplete.Root>
    </Modal>
  );
}
