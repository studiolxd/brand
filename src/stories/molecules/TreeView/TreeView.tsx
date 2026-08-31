'use client';

import { useCallback, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import './TreeView.css';

export interface TreeViewNode {
  /** Identificador único en todo el árbol. */
  id: string;
  /** Rótulo de la fila. */
  label: ReactNode;
  /** Marca opcional delante del rótulo (una carpeta, un tipo de contenido). */
  icon?: ReactNode;
  /** Ramas hijas. Un nodo sin `children` es una hoja. */
  children?: TreeViewNode[];
  /** No se puede elegir ni recibe el foco. */
  disabled?: boolean;
}

export interface TreeViewProps extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'onSelect'> {
  /** El árbol. */
  items: TreeViewNode[];
  /** Ramas abiertas (controlado). */
  expanded?: string[];
  /** Ramas abiertas al montar (no controlado). */
  defaultExpanded?: string[];
  /** Se llama con la lista de ramas abiertas. */
  onExpandedChange?: (expanded: string[]) => void;
  /** Nodo elegido (controlado). */
  selected?: string;
  /** Nodo elegido al montar (no controlado). */
  defaultSelected?: string;
  /** Se llama con el id del nodo elegido. */
  onSelectedChange?: (id: string) => void;
  /**
   * Nombre accesible del árbol. Default: «Árbol» (castellano). Una app
   * multiidioma debe pasarlo traducido.
   */
  label?: string;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

interface FilaVisible {
  node: TreeViewNode;
  level: number;
  parentId?: string;
}

/** Aplana el árbol a las filas que se ven, con su nivel y su padre. */
function aplanar(items: TreeViewNode[], abiertos: Set<string>, level = 1, parentId?: string): FilaVisible[] {
  return items.flatMap((node) => {
    const fila: FilaVisible = { node, level, parentId };
    const hijos = node.children && abiertos.has(node.id)
      ? aplanar(node.children, abiertos, level + 1, node.id)
      : [];
    return [fila, ...hijos];
  });
}

/**
 * Un árbol con sangría: la matriz de contenidos de un curso, la estructura de
 * carpetas de un espacio. Cada rama se abre y se cierra, y se elige un nodo.
 *
 * Implementa el patrón WAI-ARIA de **tree view** a mano —Base UI no trae árbol—:
 * `role="tree"` con `treeitem` anidados, un solo punto de tabulación y recorrido
 * completo con el teclado.
 *
 * La selección se marca con **tinta y peso**, y el paso del ratón con una línea:
 * ninguna fila se rellena, como en el resto del sistema.
 */
export function TreeView({
  items,
  expanded: expandedProp,
  defaultExpanded,
  onExpandedChange,
  selected: selectedProp,
  defaultSelected,
  onSelectedChange,
  label = 'Árbol',
  className,
  ...rest
}: TreeViewProps) {
  const baseId = useId();
  const contenedor = useRef<HTMLUListElement>(null);

  const [abiertosSinControlar, setAbiertosSinControlar] = useState<string[]>(defaultExpanded ?? []);
  const expandedControlado = expandedProp !== undefined;
  const abiertos = expandedControlado ? expandedProp : abiertosSinControlar;

  const [elegidoSinControlar, setElegidoSinControlar] = useState<string | undefined>(defaultSelected);
  const selectedControlado = selectedProp !== undefined;
  const elegido = selectedControlado ? selectedProp : elegidoSinControlar;

  const conjuntoAbiertos = useMemo(() => new Set(abiertos), [abiertos]);
  const filas = useMemo(() => aplanar(items, conjuntoAbiertos), [items, conjuntoAbiertos]);
  const alcanzables = useMemo(() => filas.filter((f) => !f.node.disabled), [filas]);

  // Roving tabindex: una sola parada de tabulación en todo el árbol.
  const [enfocado, setEnfocado] = useState<string | undefined>(undefined);
  const conFoco = enfocado && alcanzables.some((f) => f.node.id === enfocado)
    ? enfocado
    : (elegido && alcanzables.some((f) => f.node.id === elegido) ? elegido : alcanzables[0]?.node.id);

  const cambiarAbiertos = useCallback((siguiente: string[]) => {
    if (!expandedControlado) setAbiertosSinControlar(siguiente);
    onExpandedChange?.(siguiente);
  }, [expandedControlado, onExpandedChange]);

  const conmutar = useCallback((id: string, abrir?: boolean) => {
    const estaAbierto = conjuntoAbiertos.has(id);
    const destino = abrir ?? !estaAbierto;
    if (destino === estaAbierto) return;
    cambiarAbiertos(destino ? [...abiertos, id] : abiertos.filter((x) => x !== id));
  }, [abiertos, conjuntoAbiertos, cambiarAbiertos]);

  const elegir = useCallback((id: string) => {
    if (!selectedControlado) setElegidoSinControlar(id);
    onSelectedChange?.(id);
  }, [selectedControlado, onSelectedChange]);

  const idFila = useCallback((id: string) => `${baseId}-${id}`, [baseId]);

  const moverFocoA = useCallback((id: string | undefined) => {
    if (!id) return;
    setEnfocado(id);
    contenedor.current?.querySelector<HTMLElement>(`[data-tree-item="${CSS.escape(id)}"]`)?.focus();
  }, []);

  function alPulsarTecla(event: React.KeyboardEvent, fila: FilaVisible) {
    const { node, parentId } = fila;
    const indice = alcanzables.findIndex((f) => f.node.id === node.id);
    const tieneHijos = Boolean(node.children?.length);
    const abierto = conjuntoAbiertos.has(node.id);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moverFocoA(alcanzables[indice + 1]?.node.id);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moverFocoA(alcanzables[indice - 1]?.node.id);
        break;
      case 'ArrowRight':
        event.preventDefault();
        // Cerrada abre; abierta baja al primer hijo.
        if (tieneHijos && !abierto) conmutar(node.id, true);
        else if (tieneHijos && abierto) moverFocoA(alcanzables[indice + 1]?.node.id);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        // Abierta cierra; cerrada sube al padre.
        if (tieneHijos && abierto) conmutar(node.id, false);
        else if (parentId) moverFocoA(parentId);
        break;
      case 'Home':
        event.preventDefault();
        moverFocoA(alcanzables[0]?.node.id);
        break;
      case 'End':
        event.preventDefault();
        moverFocoA(alcanzables[alcanzables.length - 1]?.node.id);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        elegir(node.id);
        break;
      default:
        break;
    }
  }

  function pintar(nodes: TreeViewNode[], level: number, parentId?: string): ReactNode {
    return nodes.map((node) => {
      const tieneHijos = Boolean(node.children?.length);
      const abierto = tieneHijos && conjuntoAbiertos.has(node.id);
      const esElegido = elegido === node.id;

      return (
        <li
          key={node.id}
          role="treeitem"
          data-tree-item={node.id}
          aria-labelledby={idFila(node.id)}
          aria-expanded={tieneHijos ? abierto : undefined}
          aria-selected={esElegido}
          aria-level={level}
          aria-disabled={node.disabled || undefined}
          tabIndex={node.disabled ? undefined : (conFoco === node.id ? 0 : -1)}
          className={[
            'tree-view__item',
            esElegido ? 'tree-view__item--selected' : '',
            node.disabled ? 'tree-view__item--disabled' : '',
          ].filter(Boolean).join(' ')}
          onKeyDown={node.disabled ? undefined : (event) => {
            // Solo la fila enfocada atiende el teclado: los ancestros no repiten.
            if (event.target !== event.currentTarget) return;
            alPulsarTecla(event, { node, level, parentId });
          }}
          onFocus={(event) => { if (event.target === event.currentTarget) setEnfocado(node.id); }}
          onClick={node.disabled ? undefined : (event) => {
            event.stopPropagation();
            if (tieneHijos) conmutar(node.id);
            elegir(node.id);
            moverFocoA(node.id);
          }}
        >
          <span className="tree-view__row">
            <span className="tree-view__chevron-slot" aria-hidden="true">
              {tieneHijos && <Icon name="chevron" className="tree-view__chevron" size="sm" />}
            </span>
            {node.icon && <span className="tree-view__icon" aria-hidden="true">{node.icon}</span>}
            <span className="tree-view__label" id={idFila(node.id)}>{node.label}</span>
          </span>
          {tieneHijos && abierto && (
            <ul role="group" className="tree-view__group">
              {pintar(node.children as TreeViewNode[], level + 1, node.id)}
            </ul>
          )}
        </li>
      );
    });
  }

  return (
    <ul
      ref={contenedor}
      role="tree"
      aria-label={label}
      className={['tree-view', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {pintar(items, 1)}
    </ul>
  );
}
