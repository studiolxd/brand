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

describe('SiteNav — grupo a dos columnas (`columns: 2`)', () => {
  const conGrupoAncho: SiteNavGroup[] = [
    {
      id: 'aplicaciones',
      label: 'Aplicaciones',
      columns: 2,
      items: [
        { id: 'uno', label: 'Uno', href: '#uno' },
        { id: 'dos', label: 'Dos', href: '#dos' },
        { id: 'tres', label: 'Tres', href: '#tres', badge: 'Beta' },
        { id: 'cuatro', label: 'Cuatro', href: '#cuatro', disabled: true, badge: 'Próximamente' },
      ],
    },
    { id: 'estudio', label: 'Estudio', items: [{ id: 'equipo', label: 'Equipo', href: '#equipo' }] },
  ];

  it('el grupo ancho lo declara en `data-group-columns`, no en `style`', () => {
    const { container } = render(<SiteNav groups={conGrupoAncho} />);
    const grupos = container.querySelectorAll('.site-nav__group');
    expect(grupos[0]).toHaveAttribute('data-group-columns', '2');
    expect(grupos[0]).not.toHaveAttribute('style');
    // El grupo normal no lleva el atributo: no es `1`, es nada.
    expect(grupos[1]).not.toHaveAttribute('data-group-columns');
  });

  it('mantiene UN solo título: dos columnas no son dos grupos', () => {
    render(<SiteNav groups={conGrupoAncho} />);
    const titulos = screen.getAllByRole('heading', { level: 2 });
    expect(titulos).toHaveLength(2);
    expect(titulos[0]).toHaveTextContent('Aplicaciones');
  });

  it('sus ítems siguen en una sola lista, en el orden del DOM', () => {
    const { container } = render(<SiteNav groups={conGrupoAncho} />);
    const listas = container.querySelectorAll('.site-nav__group[data-group-columns="2"] .site-nav__list');
    expect(listas).toHaveLength(1);
    expect(within(listas[0] as HTMLElement).getAllByRole('link').map((a) => a.textContent)).toEqual([
      'Uno',
      'Dos',
      'Tres',
      'Cuatro',
    ]);
  });

  it('`disabled` y `badge` siguen valiendo dentro de las dos columnas', () => {
    render(<SiteNav groups={conGrupoAncho} />);
    const apagado = screen.getByRole('link', { name: 'Cuatro' });
    expect(apagado.tagName).toBe('SPAN');
    expect(apagado).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Próximamente')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('el grupo ancho cuenta por dos en el tope de columnas', () => {
    const { container } = render(<SiteNav groups={conGrupoAncho} />);
    // Un grupo ancho + uno normal = tres tramos, no dos.
    expect(container.querySelector('.site-nav')).toHaveAttribute('data-columns', '3');
  });

  it('`columns: 1` es el grupo de siempre y no escribe atributo', () => {
    const { container } = render(
      <SiteNav groups={[{ id: 'a', label: 'A', columns: 1, items: [{ id: 'x', label: 'X', href: '#x' }] }]} />,
    );
    expect(container.querySelector('.site-nav__group')).not.toHaveAttribute('data-group-columns');
    expect(container.querySelector('.site-nav')).toHaveAttribute('data-columns', '1');
  });
});
