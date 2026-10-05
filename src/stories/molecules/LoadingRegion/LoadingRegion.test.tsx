import type { ReactElement } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as renderRaw, screen } from '@testing-library/react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture } from '../../../../.storybook/brandMessagesFixture';
import { LoadingRegion, SkeletonGrid, SkeletonList, SkeletonTable, SkeletonText } from './LoadingRegion';

function render(ui: ReactElement) {
  return renderRaw(<BrandMessagesProvider messages={brandMessagesFixture}>{ui}</BrandMessagesProvider>);
}

describe('LoadingRegion', () => {
  it('anuncia la espera con su texto oculto, y los esqueletos quedan decorativos', () => {
    render(
      <LoadingRegion label="Cargando bancos…">
        <SkeletonList rows={3} />
      </LoadingRegion>,
    );
    const region = screen.getByRole('status', { name: 'Cargando bancos…' });
    expect(region).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Cargando bancos…')).toHaveClass('visually-hidden');
    expect(region.querySelector('.skeleton-list')).toHaveAttribute('aria-hidden', 'true');
  });

  it('sin label, el texto sale de spinner.label del catálogo', () => {
    render(<LoadingRegion><SkeletonText /></LoadingRegion>);
    expect(screen.getByRole('status', { name: 'Cargando…' })).toBeInTheDocument();
  });

  it('sin label ni catálogo falla con el error explícito; mudo, no lo exige', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderRaw(<LoadingRegion><SkeletonText /></LoadingRegion>)).toThrow(/spinner\.label/);
    vi.restoreAllMocks();

    const { container } = renderRaw(<LoadingRegion announce={false}><SkeletonList rows={2} /></LoadingRegion>);
    expect(screen.queryByRole('status')).toBeNull();
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('cada esqueleto pinta su número de bloques', () => {
    const { container } = render(
      <LoadingRegion>
        <SkeletonText lines={4} />
        <SkeletonList rows={3} />
        <SkeletonTable rows={5} />
        <SkeletonGrid columns={4} rows={2} />
      </LoadingRegion>,
    );
    expect(container.querySelectorAll('.skeleton-text .skeleton')).toHaveLength(4);
    expect(container.querySelectorAll('.skeleton-text__line--last')).toHaveLength(1);
    expect(container.querySelectorAll('.skeleton-list .skeleton')).toHaveLength(3);
    expect(container.querySelectorAll('.skeleton-table__header')).toHaveLength(1);
    expect(container.querySelectorAll('.skeleton-table__row')).toHaveLength(5);
    expect(container.querySelector('.skeleton-grid')).toHaveAttribute('data-columns', '4');
    expect(container.querySelectorAll('.skeleton-grid .skeleton')).toHaveLength(8);
  });

  it('un párrafo de una línea no la acorta', () => {
    const { container } = render(<SkeletonText lines={1} />);
    expect(container.querySelector('.skeleton-text__line--last')).toBeNull();
  });

  it('no emite atributos style', () => {
    const { container } = render(
      <LoadingRegion>
        <SkeletonText />
        <SkeletonGrid />
      </LoadingRegion>,
    );
    expect(container.querySelector('[style]')).toBeNull();
  });
});
