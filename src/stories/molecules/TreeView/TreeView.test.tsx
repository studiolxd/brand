import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeView, type TreeViewNode } from './TreeView';

const items: TreeViewNode[] = [
  {
    id: 'a',
    label: 'Módulo A',
    children: [
      { id: 'a1', label: 'Lección A1' },
      { id: 'a2', label: 'Lección A2' },
    ],
  },
  { id: 'b', label: 'Módulo B' },
  { id: 'c', label: 'Anexos', disabled: true },
];

describe('TreeView', () => {
  it('monta el patrón tree: rol, nombre, niveles y estado de rama', () => {
    render(<TreeView items={items} label="Matriz" defaultExpanded={['a']} />);
    expect(screen.getByRole('tree', { name: 'Matriz' })).toBeInTheDocument();

    const modulo = screen.getByRole('treeitem', { name: 'Módulo A' });
    expect(modulo).toHaveAttribute('aria-expanded', 'true');
    expect(modulo).toHaveAttribute('aria-level', '1');
    expect(screen.getByRole('treeitem', { name: 'Lección A1' })).toHaveAttribute('aria-level', '2');
  });

  it('una rama cerrada no deja ver a sus hijos', () => {
    render(<TreeView items={items} />);
    expect(screen.queryByRole('treeitem', { name: 'Lección A1' })).not.toBeInTheDocument();
  });

  it('el clic abre la rama y elige el nodo', async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    const onSelectedChange = vi.fn();
    render(<TreeView items={items} onExpandedChange={onExpandedChange} onSelectedChange={onSelectedChange} />);

    await user.click(screen.getByRole('treeitem', { name: 'Módulo A' }));
    expect(onExpandedChange).toHaveBeenCalledWith(['a']);
    expect(onSelectedChange).toHaveBeenCalledWith('a');
  });

  it('marca el nodo elegido con aria-selected', () => {
    render(<TreeView items={items} defaultSelected="b" />);
    expect(screen.getByRole('treeitem', { name: 'Módulo B' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('treeitem', { name: 'Módulo A' })).toHaveAttribute('aria-selected', 'false');
  });

  it('las flechas abren, bajan al hijo y vuelven al padre', async () => {
    const user = userEvent.setup();
    render(<TreeView items={items} />);
    const modulo = screen.getByRole('treeitem', { name: 'Módulo A' });

    modulo.focus();
    await user.keyboard('{ArrowRight}');
    expect(modulo).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('treeitem', { name: 'Lección A1' })).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(modulo).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(modulo).toHaveAttribute('aria-expanded', 'false');
  });

  it('Inicio y Fin van al primer y al último nodo visible', async () => {
    const user = userEvent.setup();
    render(<TreeView items={items} />);
    const modulo = screen.getByRole('treeitem', { name: 'Módulo A' });

    modulo.focus();
    await user.keyboard('{End}');
    expect(screen.getByRole('treeitem', { name: 'Anexos' })).toHaveFocus();

    await user.keyboard('{Home}');
    expect(modulo).toHaveFocus();
  });

  it('Intro elige el nodo enfocado', async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    render(<TreeView items={items} onSelectedChange={onSelectedChange} />);

    screen.getByRole('treeitem', { name: 'Módulo B' }).focus();
    await user.keyboard('{Enter}');
    expect(onSelectedChange).toHaveBeenCalledWith('b');
  });

  it('es una sola parada de tabulación', () => {
    render(<TreeView items={items} defaultExpanded={['a']} />);
    const conFoco = screen.getAllByRole('treeitem').filter((n) => n.getAttribute('tabindex') === '0');
    expect(conFoco).toHaveLength(1);
  });

  it('un nodo deshabilitado sigue en el recorrido pero no se elige', async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    render(<TreeView items={items} onSelectedChange={onSelectedChange} />);
    const anexos = screen.getByRole('treeitem', { name: 'Anexos' });

    expect(anexos).toHaveAttribute('aria-disabled', 'true');
    // Alcanzable con el teclado: el patrón no lo saca del árbol, lo anuncia.
    expect(anexos).toHaveAttribute('tabindex', '-1');

    screen.getByRole('treeitem', { name: 'Módulo B' }).focus();
    await user.keyboard('{ArrowDown}');
    expect(anexos).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onSelectedChange).not.toHaveBeenCalled();

    await user.click(anexos);
    expect(onSelectedChange).not.toHaveBeenCalled();
  });

  it('escribir una letra salta a la siguiente fila que empieza por ella', async () => {
    const user = userEvent.setup();
    render(<TreeView items={items} defaultExpanded={['a']} />);

    screen.getByRole('treeitem', { name: 'Módulo A' }).focus();
    await user.keyboard('a');
    expect(screen.getByRole('treeitem', { name: 'Anexos' })).toHaveFocus();
  });

  it('con varias letras se busca el prefijo entero', async () => {
    const user = userEvent.setup();
    render(<TreeView items={items} defaultExpanded={['a']} />);

    screen.getByRole('treeitem', { name: 'Módulo A' }).focus();
    // «l» sola llevaría a la primera lección; «le» busca el mismo prefijo largo
    // y no salta a «Anexos» al teclear la segunda letra.
    await user.keyboard('le');
    expect(screen.getByRole('treeitem', { name: 'Lección A1' })).toHaveFocus();
  });

  it('`*` abre todas las ramas hermanas del nivel', async () => {
    const user = userEvent.setup();
    const conDosRamas: TreeViewNode[] = [
      { id: 'a', label: 'Módulo A', children: [{ id: 'a1', label: 'Lección A1' }] },
      { id: 'b', label: 'Módulo B', children: [{ id: 'b1', label: 'Lección B1' }] },
    ];
    const onExpandedChange = vi.fn();
    render(<TreeView items={conDosRamas} onExpandedChange={onExpandedChange} />);

    screen.getByRole('treeitem', { name: 'Módulo A' }).focus();
    await user.keyboard('*');

    expect(onExpandedChange).toHaveBeenCalledWith(['a', 'b']);
    expect(screen.getByRole('treeitem', { name: 'Lección A1' })).toBeInTheDocument();
    expect(screen.getByRole('treeitem', { name: 'Lección B1' })).toBeInTheDocument();
  });
});
