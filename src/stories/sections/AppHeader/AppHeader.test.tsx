import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppHeader, type AppHeaderLogoLinkProps } from './AppHeader';
import { BrandMessagesProvider } from '../../messages';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';
import { expectRespaldo } from '../../../../test/respaldo';

const marca = <svg viewBox="0 0 120 24" data-testid="marca" />;

describe('AppHeader — ranura logo', () => {
  it('sin logo no pinta enlace ni exige appHeader.logo del catálogo', () => {
    // Sin conversión: desde v49.23.1 `appHeader` es opcional en el tipo.
    const { appHeader: _sinAppHeader, ...catalogo } = ES;
    void _sinAppHeader;
    render(
      <BrandMessagesProvider messages={catalogo}>
        <AppHeader />
      </BrandMessagesProvider>,
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(document.querySelector('.app-header__logo')).toBeNull();
  });

  it('con logo, lo enlaza tras el botón de menú con appHeader.logo del proveedor', () => {
    render(
      <BrandMessagesProvider messages={ES}>
        <AppHeader logo={marca} logoHref="/inicio" start={<span>Inicio</span>} />
      </BrandMessagesProvider>,
    );
    const enlace = screen.getByRole('link', { name: ES.appHeader?.logo });
    expect(enlace).toHaveAttribute('href', '/inicio');
    expect(enlace).toHaveClass('app-header__logo');
    expect(enlace).toContainElement(screen.getByTestId('marca'));
    // Orden: botón de menú → logo → start.
    const barra = screen.getByRole('banner');
    const hijos = Array.from(barra.children);
    expect(hijos[0]).toBe(screen.getByRole('button'));
    expect(hijos[1]).toBe(enlace);
    expect(hijos[2]).toHaveClass('app-header__start');
  });

  it('con logo, sin logoLabel y sin appHeader.logo en el catálogo, sale el castellano de respaldo y avisa (D5)', () => {
    const { appHeader: _sinAppHeader, ...catalogo } = ES;
    void _sinAppHeader;
    expectRespaldo(
      () =>
        render(
          <BrandMessagesProvider messages={catalogo}>
            <AppHeader logo={marca} />
          </BrandMessagesProvider>,
        ),
      /appHeader\.logo/,
    );
    expect(screen.getByRole('link', { name: 'Ir al inicio' })).toBeInTheDocument();
  });

  it('con logo y logoLabel, el catálogo no necesita appHeader', () => {
    const { appHeader: _sinAppHeader, ...catalogo } = ES;
    void _sinAppHeader;
    render(
      <BrandMessagesProvider messages={catalogo}>
        <AppHeader logo={marca} logoLabel="Homenize, ir al inicio" />
      </BrandMessagesProvider>,
    );
    expect(screen.getByRole('link', { name: 'Homenize, ir al inicio' })).toBeInTheDocument();
  });

  it('logoHref por defecto es la raíz y logoLabel gana al catálogo', () => {
    render(
      <BrandMessagesProvider messages={ES}>
        <AppHeader logo={marca} logoLabel="Homenize, ir al inicio" />
      </BrandMessagesProvider>,
    );
    expect(screen.getByRole('link', { name: 'Homenize, ir al inicio' })).toHaveAttribute('href', '/');
  });

  it('renderLogoLink recibe href, className, aria-label y children', () => {
    const recibidas: AppHeaderLogoLinkProps[] = [];
    render(
      <BrandMessagesProvider messages={ES}>
        <AppHeader
          logo={marca}
          logoHref="/panel"
          renderLogoLink={(props) => {
            recibidas.push(props);
            const { children, ...rest } = props;
            return <a data-router="sí" {...rest}>{children}</a>;
          }}
        />
      </BrandMessagesProvider>,
    );
    expect(recibidas[0]).toMatchObject({ href: '/panel', className: 'app-header__logo', 'aria-label': ES.appHeader?.logo });
    expect(screen.getByRole('link')).toHaveAttribute('data-router', 'sí');
  });
});
