import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandPalette, type CommandPaletteGroup } from './CommandPalette';

function makeGroups(overrides: Partial<Record<string, unknown>> = {}) {
  const groups: CommandPaletteGroup[] = [
    {
      id: 'navigation',
      heading: 'Navegación',
      items: [
        { id: 'home', label: 'Inicio', onSelect: vi.fn() },
        { id: 'settings', label: 'Ajustes', onSelect: vi.fn(), keywords: ['preferencias'] },
      ],
    },
    {
      id: 'account',
      heading: 'Cuenta',
      items: [{ id: 'signout', label: 'Cerrar sesión', onSelect: vi.fn() }],
    },
  ];
  return { groups, ...overrides };
}

function renderPalette(props: Partial<React.ComponentProps<typeof CommandPalette>> = {}) {
  const { groups } = makeGroups();
  const onOpenChange = vi.fn();
  const utils = render(
    <CommandPalette
      open
      onOpenChange={onOpenChange}
      groups={groups}
      title="Buscar un comando"
      placeholder="Escribe para buscar…"
      emptyLabel="Sin resultados."
      listLabel="Sugerencias"
      closeLabel="Cerrar"
      {...props}
    />,
  );
  return { ...utils, groups, onOpenChange };
}

describe('CommandPalette', () => {
  it('monta un diálogo con buscador combobox y listbox con nombre', () => {
    renderPalette();
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('combobox')).toHaveAttribute(
      'placeholder',
      'Escribe para buscar…',
    );
    expect(within(dialog).getByRole('listbox', { name: 'Sugerencias' })).toBeInTheDocument();
  });

  it('agrupa los ítems con su cabecera', () => {
    renderPalette();
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveAccessibleName('Navegación');
    expect(within(groups[0]).getAllByRole('option')).toHaveLength(2);
  });

  it('filtra por texto ignorando mayúsculas y acentos', async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.type(screen.getByRole('combobox'), 'SESION');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Cerrar sesión');
  });

  it('filtra también por keywords', async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.type(screen.getByRole('combobox'), 'preferencias');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getAllByRole('option')[0]).toHaveTextContent('Ajustes');
  });

  it('descarta los grupos que se quedan sin ítems al filtrar', async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.type(screen.getByRole('combobox'), 'inicio');
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(1);
    expect(groups[0]).toHaveAccessibleName('Navegación');
  });

  it('anuncia el estado vacío en una región viva', async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.type(screen.getByRole('combobox'), 'zzz-no-existe');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent('Sin resultados.');
  });

  it('navega con ↑↓ moviendo aria-activedescendant y activa con Enter', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const groups: CommandPaletteGroup[] = [
      {
        id: 'navigation',
        heading: 'Navegación',
        items: [
          { id: 'home', label: 'Inicio', onSelect: vi.fn() },
          { id: 'settings', label: 'Ajustes', onSelect },
        ],
      },
    ];
    const onOpenChange = vi.fn();
    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        groups={groups}
        title="Buscar un comando"
        placeholder="Escribe para buscar…"
        emptyLabel="Sin resultados."
        listLabel="Sugerencias"
      />,
    );
    const input = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    expect(input).toHaveAttribute('aria-activedescendant', options[0].id);

    await user.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', options[1].id);

    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('Home y End saltan al primer y último resultado', async () => {
    const user = userEvent.setup();
    renderPalette();
    const input = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    await user.keyboard('{End}');
    expect(input).toHaveAttribute('aria-activedescendant', options[options.length - 1].id);
    await user.keyboard('{Home}');
    expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
  });

  it('selecciona con el ratón, cierra y llama a onSelect', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const groups: CommandPaletteGroup[] = [
      { id: 'account', heading: 'Cuenta', items: [{ id: 'signout', label: 'Cerrar sesión', onSelect }] },
    ];
    const onOpenChange = vi.fn();
    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        groups={groups}
        title="Buscar un comando"
        placeholder="Escribe para buscar…"
        emptyLabel="Sin resultados."
        listLabel="Sugerencias"
      />,
    );
    await user.click(screen.getByRole('option', { name: 'Cerrar sesión' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('no activa los ítems deshabilitados', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const groups: CommandPaletteGroup[] = [
      {
        id: 'account',
        heading: 'Cuenta',
        items: [{ id: 'signout', label: 'Cerrar sesión', onSelect, disabled: true }],
      },
    ];
    render(
      <CommandPalette
        open
        onOpenChange={vi.fn()}
        groups={groups}
        title="Buscar un comando"
        placeholder="Escribe para buscar…"
        emptyLabel="Sin resultados."
        listLabel="Sugerencias"
      />,
    );
    await user.click(screen.getByRole('option', { name: 'Cerrar sesión' }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('Escape cierra el diálogo', async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderPalette();
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('abre y cierra con el atajo ⌘K / Ctrl+K', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { groups } = makeGroups();
    render(
      <CommandPalette
        open={false}
        onOpenChange={onOpenChange}
        groups={groups}
        title="Buscar un comando"
        placeholder="Escribe para buscar…"
        emptyLabel="Sin resultados."
        listLabel="Sugerencias"
      />,
    );
    await user.keyboard('{Control>}k{/Control}');
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('shortcut={false} desactiva el atajo global', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { groups } = makeGroups();
    render(
      <CommandPalette
        open={false}
        onOpenChange={onOpenChange}
        groups={groups}
        shortcut={false}
        title="Buscar un comando"
        placeholder="Escribe para buscar…"
        emptyLabel="Sin resultados."
        listLabel="Sugerencias"
      />,
    );
    await user.keyboard('{Control>}k{/Control}');
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
