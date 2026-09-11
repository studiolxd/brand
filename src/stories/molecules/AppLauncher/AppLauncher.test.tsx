import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppLauncher, type LauncherApp } from './AppLauncher';

const apps: LauncherApp[] = [
  { id: 'a', name: 'Alfa', url: 'https://alfa.slxd.app', accent: '#111111' },
  { id: 'b', name: 'Beta', url: 'https://beta.slxd.app', accent: '#222222', isNew: true },
  { id: 'c', name: 'Gamma', url: 'https://gamma.slxd.app', accent: '#333333' },
];

const labels = { open: 'Abrir launcher de apps', new: 'Nuevo' };

describe('AppLauncher — presentation="modal" (por defecto)', () => {
  it('abre un diálogo con las apps al pulsar el disparador', async () => {
    const user = userEvent.setup();
    render(<AppLauncher apps={apps} labels={labels} currentAppId="b" />);

    const trigger = screen.getByRole('button', { name: labels.open });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Aplicaciones' });
    const links = within(dialog).getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(within(dialog).getByRole('link', { name: /Beta/ })).toHaveAttribute('aria-current', 'page');
  });

  it('usa `labels.title` cuando se pasa', async () => {
    const user = userEvent.setup();
    render(<AppLauncher apps={apps} labels={{ ...labels, title: 'Suite SLXD' }} />);
    await user.click(screen.getByRole('button', { name: labels.open }));
    expect(screen.getByRole('dialog', { name: 'Suite SLXD' })).toBeInTheDocument();
  });

  it('Escape cierra el diálogo', async () => {
    const user = userEvent.setup();
    render(<AppLauncher apps={apps} labels={labels} defaultOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('elegir una app cierra el diálogo (es un enlace real, no intercepta el click)', async () => {
    const user = userEvent.setup();
    render(<AppLauncher apps={apps} labels={labels} defaultOpen />);
    const link = screen.getByRole('link', { name: /Alfa/ });
    expect(link).toHaveAttribute('href', 'https://alfa.slxd.app');
    await user.click(link);
  });

  it('con `labels.trigger` el nombre accesible es el texto visible, sin `aria-label`', () => {
    render(<AppLauncher apps={apps} labels={{ ...labels, trigger: 'Aplicaciones' }} />);
    const trigger = screen.getByRole('button', { name: 'Aplicaciones' });
    expect(trigger).not.toHaveAttribute('aria-label');
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('es controlable con `open`/`onOpenChange`', async () => {
    const user = userEvent.setup();
    let open = false;
    const onOpenChange = (next: boolean) => {
      open = next;
    };
    const { rerender } = render(
      <AppLauncher apps={apps} labels={labels} open={open} onOpenChange={onOpenChange} />,
    );
    await user.click(screen.getByRole('button', { name: labels.open }));
    expect(open).toBe(true);
    rerender(<AppLauncher apps={apps} labels={labels} open={open} onOpenChange={onOpenChange} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('AppLauncher — presentation="popover"', () => {
  it('abre un panel flotante (sin rol de diálogo modal) con las apps', async () => {
    const user = userEvent.setup();
    render(<AppLauncher apps={apps} labels={labels} currentAppId="b" presentation="popover" />);

    const trigger = screen.getByRole('button', { name: labels.open });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');

    await user.click(trigger);
    const list = screen.getByRole('list');
    const links = within(list).getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(within(list).getByRole('link', { name: /Beta/ })).toHaveAttribute('aria-current', 'page');
  });

  it('Escape lo cierra', async () => {
    const user = userEvent.setup();
    render(<AppLauncher apps={apps} labels={labels} defaultOpen presentation="popover" />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
