import { describe, it, expect } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { SiteNav, type SiteNavGroup } from './SiteNav';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

/** El nombre de la región es cromo y sale del catálogo, como en la aplicación. */
const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

const groups: SiteNavGroup[] = [
  {
    id: 'productos',
    label: 'Productos',
    items: [
      { id: 'bricks', label: 'Bricks', href: '#bricks' },
      { id: 'localizia', label: 'Localizia', href: '#localizia', badge: 'Beta' },
      { id: 'atlas', label: 'Atlas', href: '#atlas', disabled: true, badge: 'Próximamente' },
    ],
  },
];

describe('SiteNav — ítems apagados y distintivo', () => {
  it('el ítem apagado no es un enlace: sin `href` y con `aria-disabled`', () => {
    render(<SiteNav groups={groups} />);
    const apagado = screen.getByRole('link', { name: 'Atlas' });
    expect(apagado.tagName).toBe('SPAN');
    expect(apagado).not.toHaveAttribute('href');
    expect(apagado).toHaveAttribute('aria-disabled', 'true');
    expect(apagado).toHaveClass('site-nav__link--disabled');
  });

  it('el distintivo se ve junto al rótulo, fuera del enlace', () => {
    render(<SiteNav groups={groups} />);
    const item = screen.getByRole('link', { name: 'Atlas' }).closest('.site-nav__item')!;
    expect(within(item as HTMLElement).getByText('Próximamente')).toBeInTheDocument();
    // Fuera del enlace: el distintivo no entra en el nombre accesible.
    expect(screen.getByRole('link', { name: 'Localizia' }).textContent).toBe('Localizia');
  });

  it('el tabulador no se detiene en el ítem apagado', async () => {
    const user = userEvent.setup();
    render(<SiteNav groups={groups} />);
    const apagado = screen.getByRole('link', { name: 'Atlas' });

    screen.getByRole('link', { name: 'Bricks' }).focus();
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Localizia' }));
    await user.tab();
    expect(document.activeElement).not.toBe(apagado);
  });

  it('un ítem apagado no pasa por `renderLink`', () => {
    const vistos: string[] = [];
    render(
      <SiteNav
        groups={groups}
        renderLink={({ href, children, className, ...rest }) => {
          vistos.push(href);
          return (
            <a href={href} className={className} {...rest}>
              {children}
            </a>
          );
        }}
      />,
    );
    expect(vistos).toContain('#bricks');
    expect(vistos).not.toContain('#atlas');
  });

  it('un ítem vivo con `badge` sigue siendo enlace', () => {
    render(<SiteNav groups={groups} />);
    const vivo = screen.getByRole('link', { name: 'Localizia' });
    expect(vivo.tagName).toBe('A');
    expect(vivo).toHaveAttribute('href', '#localizia');
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });
});
