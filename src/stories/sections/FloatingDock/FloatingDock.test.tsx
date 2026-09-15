import { describe, it, expect, vi } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FloatingDock } from './FloatingDock';
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


const base = {
  label: 'Abrir el asistente',
  title: 'Asistente',
  children: <p>Contenido del asistente</p>,
};

describe('FloatingDock', () => {
  it('sin `open` se gobierna solo: el lanzador abre y cierra el panel', async () => {
    const user = userEvent.setup();
    render(<FloatingDock {...base} />);
    const lanzador = screen.getByRole('button', { name: 'Abrir el asistente' });

    expect(lanzador).toHaveAttribute('aria-haspopup', 'dialog');
    expect(lanzador).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(lanzador);
    const panel = await screen.findByRole('dialog', { name: 'Asistente' });
    // No modal: la página de detrás sigue disponible.
    expect(panel).not.toHaveAttribute('aria-modal', 'true');
    expect(lanzador).toHaveAttribute('aria-expanded', 'true');
    expect(lanzador.getAttribute('aria-controls')).toBe(panel.getAttribute('id'));
  });

  it('con `open` el panel obedece a la prop, no a la pulsación', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<FloatingDock {...base} open={false} onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: 'Abrir el asistente' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('el título puede quedarse solo como nombre accesible', async () => {
    render(<FloatingDock {...base} titleHidden defaultOpen />);
    const panel = await screen.findByRole('dialog', { name: 'Asistente' });
    expect(within(panel).queryByRole('heading', { name: 'Asistente' })).toBeNull();
  });

  it('el contador se anuncia en castellano y admite traducción', () => {
    const { rerender } = render(<FloatingDock {...base} badge={3} />);
    expect(screen.getByText('3 mensajes nuevos')).toBeInTheDocument();

    rerender(<FloatingDock {...base} badge={3} badgeLabel={(n) => `${n} new messages`} />);
    expect(screen.getByText('3 new messages')).toBeInTheDocument();
  });

  it('sin contador no hay región live que anunciar', () => {
    const { container } = render(<FloatingDock {...base} />);
    expect(container.querySelector('[aria-live]')).toBeNull();
  });

  it('el ancla lleva la esquina en un atributo, no en un estilo en línea', () => {
    const { container } = render(<FloatingDock {...base} position="top-start" />);
    const dock = container.querySelector('.floating-dock') as HTMLElement;
    expect(dock).toHaveAttribute('data-position', 'top-start');
    expect(dock.getAttribute('style')).toBeNull();
  });
});

describe('el cromo sale del catálogo', () => {
  it('el aspa lee `floatingDock.close` — espacio propio, no `modal.close`', async () => {
    renderRTL(
      <BrandMessagesProvider messages={EN}>
        <FloatingDock {...base} defaultOpen />
      </BrandMessagesProvider>,
    );
    const panel = await screen.findByRole('dialog', { name: 'Asistente' });
    expect(within(panel).getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(within(panel).queryByRole('button', { name: 'Cerrar' })).toBeNull();
  });

  it('el contador se anuncia con `floatingDock.badge`', () => {
    renderRTL(
      <BrandMessagesProvider messages={EN}>
        <FloatingDock {...base} badge={3} />
      </BrandMessagesProvider>,
    );
    expect(screen.getByText('3 new messages')).toBeInTheDocument();
  });

  it('el `label` del lanzador es contenido: sigue saliendo de la prop', () => {
    renderRTL(
      <BrandMessagesProvider messages={EN}>
        <FloatingDock {...base} />
      </BrandMessagesProvider>,
    );
    expect(screen.getByRole('button', { name: 'Abrir el asistente' })).toBeInTheDocument();
  });
});
