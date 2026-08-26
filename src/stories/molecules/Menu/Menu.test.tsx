import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu, type MenuItem } from './Menu';

describe('Menu', () => {
  const trigger = <button type="button">Opciones</button>;

  it('usa el trigger que se le pasa, no uno fijo', async () => {
    const user = userEvent.setup();
    render(<Menu trigger={trigger} items={[{ type: 'button', label: 'Duplicar', onClick: vi.fn() }]} />);
    const button = screen.getByRole('button', { name: 'Opciones' });
    expect(button).toHaveAttribute('aria-haspopup', 'menu');
    await user.click(button);
    expect(await screen.findByRole('menuitem', { name: 'Duplicar' })).toBeInTheDocument();
  });

  it('dispara onClick del ítem de botón y cierra', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Menu trigger={trigger} items={[{ type: 'button', label: 'Duplicar', onClick }]} />);
    await user.click(screen.getByRole('button', { name: 'Opciones' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Duplicar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('rinde los ítems radio como menuitemradio con el valor activo marcado', async () => {
    const user = userEvent.setup();
    const items: MenuItem[] = [
      { type: 'label', label: 'Tema' },
      { type: 'radio', value: 'light', label: 'Claro' },
      { type: 'radio', value: 'dark', label: 'Oscuro' },
    ];
    render(<Menu trigger={trigger} items={items} value="dark" />);
    await user.click(screen.getByRole('button', { name: 'Opciones' }));
    const radios = await screen.findAllByRole('menuitemradio');
    expect(radios).toHaveLength(2);
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('emite onValueChange al elegir otro radio', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Menu
        trigger={trigger}
        value="light"
        onValueChange={onValueChange}
        items={[
          { type: 'radio', value: 'light', label: 'Claro' },
          { type: 'radio', value: 'dark', label: 'Oscuro' },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Opciones' }));
    await user.click(await screen.findByRole('menuitemradio', { name: 'Oscuro' }));
    expect(onValueChange).toHaveBeenCalledWith('dark');
  });

  it('mezcla radios y acciones sin sacar las acciones del menú', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Menu
        trigger={trigger}
        value="grid"
        items={[
          { type: 'radio', value: 'grid', label: 'Cuadrícula' },
          { type: 'radio', value: 'list', label: 'Lista' },
          { type: 'separator' },
          { type: 'button', label: 'Eliminar', onClick, destructive: true },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Opciones' }));
    expect(await screen.findAllByRole('menuitemradio')).toHaveLength(2);
    const remove = screen.getByRole('menuitem', { name: 'Eliminar' });
    expect(remove).toHaveClass('menu__item--destructive');
  });

  it('rinde los enlaces con el renderLink del consumidor', async () => {
    const user = userEvent.setup();
    render(
      <Menu
        trigger={trigger}
        items={[{ type: 'link', label: 'CSV', href: '/export?format=csv' }]}
        renderLink={({ children, ...props }) => (
          <a {...props} data-testid="custom-link">{children}</a>
        )}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Opciones' }));
    const link = await screen.findByTestId('custom-link');
    expect(link).toHaveAttribute('href', '/export?format=csv');
    // Las props que inyecta Base UI (rol, tabIndex…) tienen que llegar al enlace
    expect(link).toHaveAttribute('role', 'menuitem');
  });
});
