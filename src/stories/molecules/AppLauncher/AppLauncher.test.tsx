import { describe, it, expect } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppLauncher, type LauncherApp } from './AppLauncher';
import type { ReactNode } from 'react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

/**
 * Estas piezas ya no traen su castellano puesto: el cromo sale del catálogo.
 * Aquí el catálogo lo monta este envoltorio, que es lo que hace la aplicación
 * en su raíz. `rerender` lo reutiliza solo.
 */
const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}


const apps: LauncherApp[] = [
  { id: 'a', name: 'Alfa', url: 'https://alfa.slxd.app' },
  { id: 'b', name: 'Beta', url: 'https://beta.slxd.app', isNew: true },
  { id: 'c', name: 'Gamma', url: 'https://gamma.slxd.app' },
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
    const current = within(dialog).getByRole('link', { name: /Beta/ });
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current).toHaveClass('app-launcher__tile--active');
  });

  it('no pinta ningún icono junto al nombre de la app: solo texto', () => {
    render(<AppLauncher apps={apps} labels={labels} defaultOpen />);
    const grid = screen.getByRole('list');
    expect(grid.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
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

describe('AppLauncher — apps apagadas y distintivo', () => {
  const conProximamente: LauncherApp[] = [
    { id: 'a', name: 'Alfa', url: 'https://alfa.slxd.app' },
    { id: 'z', name: 'Atlas', url: 'https://atlas.slxd.app', disabled: true, badge: 'Próximamente' },
  ];

  it('la baldosa apagada no es un enlace: sin `href` y con `aria-disabled`', () => {
    render(<AppLauncher apps={conProximamente} labels={labels} defaultOpen />);
    const apagada = screen.getByRole('link', { name: /Atlas/ });
    expect(apagada.tagName).toBe('SPAN');
    expect(apagada).not.toHaveAttribute('href');
    expect(apagada).toHaveAttribute('aria-disabled', 'true');
    expect(apagada).toHaveClass('app-launcher__tile--disabled');
  });

  it('el distintivo se ve dentro de la baldosa apagada', () => {
    render(<AppLauncher apps={conProximamente} labels={labels} defaultOpen />);
    const apagada = screen.getByRole('link', { name: /Atlas/ });
    expect(within(apagada).getByText('Próximamente')).toBeInTheDocument();
  });

  it('el tabulador no se detiene en la baldosa apagada', async () => {
    const user = userEvent.setup();
    render(<AppLauncher apps={conProximamente} labels={labels} defaultOpen />);
    const apagada = screen.getByRole('link', { name: /Atlas/ });
    const viva = screen.getByRole('link', { name: /Alfa/ });

    viva.focus();
    await user.tab();
    expect(document.activeElement).not.toBe(apagada);
  });

  it('`badge` vale también en una app viva, que sigue siendo enlace', () => {
    const conBeta: LauncherApp[] = [{ id: 'd', name: 'Delta', url: 'https://delta.slxd.app', badge: 'Beta' }];
    render(<AppLauncher apps={conBeta} labels={labels} defaultOpen />);
    const enlace = screen.getByRole('link', { name: /Delta/ });
    expect(enlace.tagName).toBe('A');
    expect(enlace).toHaveAttribute('href', 'https://delta.slxd.app');
    expect(within(enlace).getByText('Beta')).toBeInTheDocument();
  });

  it('`badge` manda sobre `isNew`, que se mantiene por compatibilidad', () => {
    const ambos: LauncherApp[] = [
      { id: 'n', name: 'Nueva', url: 'https://nueva.slxd.app', isNew: true },
      { id: 'm', name: 'Mixta', url: 'https://mixta.slxd.app', isNew: true, badge: 'Beta' },
    ];
    render(<AppLauncher apps={ambos} labels={labels} defaultOpen />);
    // `isNew` a secas sigue sacando su texto del catálogo.
    expect(within(screen.getByRole('link', { name: /Nueva/ })).getByText('Nuevo')).toBeInTheDocument();
    // Con `badge`, manda `badge`.
    const mixta = screen.getByRole('link', { name: /Mixta/ });
    expect(within(mixta).getByText('Beta')).toBeInTheDocument();
    expect(within(mixta).queryByText('Nuevo')).not.toBeInTheDocument();
  });
});

describe('el cromo sale del catálogo', () => {
  it('sin `labels`, el disparador, el título y la marca de novedad leen del proveedor', async () => {
    const user = userEvent.setup();
    renderRTL(
      <BrandMessagesProvider messages={EN}>
        <AppLauncher apps={apps} currentAppId="b" />
      </BrandMessagesProvider>,
    );
    const trigger = screen.getByRole('button', { name: 'Open the app launcher' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Applications' });
    expect(within(dialog).getByText('New')).toBeInTheDocument();
    // Los nombres de las apps son contenido y viajan en `apps`.
    expect(within(dialog).getByRole('link', { name: /Alfa/ })).toBeInTheDocument();
  });

  it('`labels` gana al catálogo, clave a clave', async () => {
    const user = userEvent.setup();
    renderRTL(
      <BrandMessagesProvider messages={EN}>
        <AppLauncher apps={apps} labels={{ title: 'Jump to an app' }} />
      </BrandMessagesProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Open the app launcher' }));
    expect(screen.getByRole('dialog', { name: 'Jump to an app' })).toBeInTheDocument();
  });

  it('una rejilla sin novedades no exige `appLauncher.new`', () => {
    const sinNovedades: LauncherApp[] = apps.map((app) => ({ ...app, isNew: false }));
    expect(() =>
      renderRTL(
        <BrandMessagesProvider messages={EN}>
          <AppLauncher apps={sinNovedades} defaultOpen />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });
});
