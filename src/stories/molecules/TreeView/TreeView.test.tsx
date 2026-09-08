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

  it('la carpeta abierta puede tener su propia marca', () => {
    const conMarcas: TreeViewNode[] = [
      {
        id: 'a',
        label: 'Carpeta',
        icon: <span data-testid="cerrada" />,
        iconExpanded: <span data-testid="abierta" />,
        children: [{ id: 'a1', label: 'Hija' }],
      },
    ];
    const { rerender } = render(<TreeView items={conMarcas} />);
    expect(screen.getByTestId('cerrada')).toBeInTheDocument();

    rerender(<TreeView items={conMarcas} expanded={['a']} />);
    expect(screen.getByTestId('abierta')).toBeInTheDocument();
    expect(screen.queryByTestId('cerrada')).not.toBeInTheDocument();
  });

  it('el menú de acciones no elige la fila ni le roba el foco al cerrarse', async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    const conAcciones: TreeViewNode[] = [
      { id: 'a', label: 'Carpeta', actions: <button type="button">Acciones de Carpeta</button> },
      { id: 'b', label: 'Otra' },
    ];
    render(<TreeView items={conAcciones} defaultSelected="b" onSelectedChange={onSelectedChange} />);

    const fila = screen.getByRole('treeitem', { name: 'Carpeta' });
    const boton = screen.getByRole('button', { name: 'Acciones de Carpeta' });

    await user.click(boton);
    // El clic se queda en la ranura: ni elige la fila ni cambia la selección.
    expect(onSelectedChange).not.toHaveBeenCalled();
    expect(fila).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('treeitem', { name: 'Otra' })).toHaveAttribute('aria-selected', 'true');
    // El foco sigue dentro de la fila, en el disparador.
    expect(boton).toHaveFocus();
    expect(fila.contains(document.activeElement)).toBe(true);
  });

  it('el nombre accesible de la fila no se lleva las acciones', () => {
    render(<TreeView items={[{ id: 'a', label: 'Carpeta', actions: <button type="button">Acciones</button> }]} />);
    expect(screen.getByRole('treeitem', { name: 'Carpeta' })).toBeInTheDocument();
  });

  it('teclear dentro de las acciones no mueve el foco del árbol', async () => {
    const user = userEvent.setup();
    const conAcciones: TreeViewNode[] = [
      { id: 'a', label: 'Ana', actions: <input aria-label="Renombrar" /> },
      { id: 'b', label: 'Berta' },
    ];
    render(<TreeView items={conAcciones} />);

    const campo = screen.getByLabelText('Renombrar');
    campo.focus();
    await user.keyboard('b');
    // Sin el corte, el salto por letra del árbol se habría llevado el foco a «Berta».
    expect(campo).toHaveFocus();
    expect(campo).toHaveValue('b');
  });

  it('`dropTarget` y `dropDisabled` marcan la fila sin deshabilitarla', () => {
    const conArrastre: TreeViewNode[] = [
      { id: 'a', label: 'Destino', dropTarget: true },
      { id: 'b', label: 'Prohibida', dropDisabled: true },
      { id: 'c', label: 'Neutra' },
    ];
    render(<TreeView items={conArrastre} />);

    const destino = screen.getByRole('treeitem', { name: 'Destino' });
    const prohibida = screen.getByRole('treeitem', { name: 'Prohibida' });

    expect(destino).toHaveAttribute('data-drop', 'target');
    expect(destino).toHaveClass('tree-view__item--drop-target');
    expect(prohibida).toHaveAttribute('data-drop', 'disabled');
    expect(prohibida).toHaveClass('tree-view__item--drop-disabled');
    // Prohibida para soltar, pero NO deshabilitada: sigue navegable y elegible.
    expect(prohibida).not.toHaveAttribute('aria-disabled');
    expect(screen.getByRole('treeitem', { name: 'Neutra' })).not.toHaveAttribute('data-drop');
  });

  it('una fila prohibida para soltar se sigue pudiendo elegir', async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    render(
      <TreeView
        items={[{ id: 'a', label: 'Prohibida', dropDisabled: true }]}
        onSelectedChange={onSelectedChange}
      />,
    );
    await user.click(screen.getByRole('treeitem', { name: 'Prohibida' }));
    expect(onSelectedChange).toHaveBeenCalledWith('a');
  });

  it('`nodeRef` entrega el elemento de la fila, no el `<li>` con su subárbol', () => {
    const recibidos = new Map<string, HTMLElement | null>();
    render(
      <TreeView
        items={items}
        defaultExpanded={['a']}
        nodeRef={(id, el) => recibidos.set(id, el)}
      />,
    );
    const fila = recibidos.get('a');
    expect(fila).toHaveClass('tree-view__row');
    // La fila del padre no contiene al hijo: soltar sobre «Lección A1» no
    // cuenta como soltar sobre «Módulo A».
    expect(fila?.contains(screen.getByRole('treeitem', { name: 'Lección A1' }))).toBe(false);
  });

  it('a partir del cuarto nivel el rótulo se trunca y guarda el nombre en `title`', () => {
    const hondo: TreeViewNode[] = [
      { id: 'n1', label: 'Uno', children: [
        { id: 'n2', label: 'Dos', children: [
          { id: 'n3', label: 'Tres', children: [
            { id: 'n4', label: 'Cuatro, con un nombre largo de verdad' },
          ] },
        ] },
      ] },
    ];
    render(<TreeView items={hondo} defaultExpanded={['n1', 'n2', 'n3']} />);

    const tercero = screen.getByRole('treeitem', { name: 'Tres' }).querySelector('.tree-view__label');
    expect(tercero).not.toHaveClass('tree-view__label--truncated');

    const cuarto = screen
      .getByRole('treeitem', { name: 'Cuatro, con un nombre largo de verdad' })
      .querySelector('.tree-view__label');
    expect(cuarto).toHaveClass('tree-view__label--truncated');
    expect(cuarto).toHaveAttribute('title', 'Cuatro, con un nombre largo de verdad');
  });
});
