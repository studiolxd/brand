import { describe, it, expect, vi } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { OrgChart, type OrgChartNode } from './OrgChart';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

const ARBOL: OrgChartNode[] = [
  {
    id: 'dir',
    name: 'Dirección',
    managers: [{ id: 'p1', name: 'Elena Sarrià', role: 'Directora general' }],
    members: [],
    children: [
      {
        id: 'tec',
        name: 'Tecnología',
        managers: [{ id: 'p3', name: 'Nuria Oliva' }],
        members: [{ id: 'p4', name: 'Alicia Benítez' }],
        children: [{ id: 'plat', name: 'Plataforma' }],
      },
    ],
  },
];

describe('OrgChart', () => {
  it('es un árbol de listas anidadas, no un lienzo', () => {
    const { container } = render(<OrgChart nodes={ARBOL} label="Organigrama" />);
    const niveles = container.querySelectorAll('.org-chart__level');
    expect(niveles).toHaveLength(3);
    expect(niveles[0].tagName).toBe('UL');
  });

  it('el lienzo se nombra y recibe el foco para poder recorrerlo con el teclado', () => {
    render(<OrgChart nodes={ARBOL} label="Organigrama de Studio LXD" />);
    const lienzo = screen.getByRole('group', { name: 'Organigrama de Studio LXD' });
    expect(lienzo).toHaveAttribute('tabindex', '0');
  });

  it('sin `label` propio toma el nombre del catálogo', () => {
    render(<OrgChart nodes={ARBOL} />);
    expect(screen.getByRole('group', { name: ES.orgChart.label })).toBeInTheDocument();
  });

  it('plegar una rama esconde a sus hijos y lo dice', async () => {
    render(<OrgChart nodes={ARBOL} label="Organigrama" />);
    expect(screen.getByText('Plataforma')).toBeInTheDocument();

    const botón = screen.getByRole('button', { name: ES.orgChart.collapse('Tecnología') });
    expect(botón).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(botón);

    expect(screen.queryByText('Plataforma')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: ES.orgChart.expand('Tecnología') })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('un departamento sin hijos no tiene botón de plegado', () => {
    render(<OrgChart nodes={[{ id: 'plat', name: 'Plataforma' }]} label="Organigrama" showZoom={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('controlado, el plegado lo decide quien lo usa', async () => {
    const onCollapsedChange = vi.fn();
    render(<OrgChart nodes={ARBOL} label="Organigrama" collapsed={[]} onCollapsedChange={onCollapsedChange} />);

    await userEvent.click(screen.getByRole('button', { name: ES.orgChart.collapse('Tecnología') }));
    expect(onCollapsedChange).toHaveBeenCalledWith(['tec']);
    // No se pliega solo: sigue mandando la prop.
    expect(screen.getByText('Plataforma')).toBeInTheDocument();
  });

  it('un grupo vacío se dice, no se calla', () => {
    render(<OrgChart nodes={ARBOL} label="Organigrama" />);
    expect(screen.getAllByText(ES.orgChart.noMembers).length).toBeGreaterThan(0);
  });

  it('con `showPeople` en false la tarjeta es solo el departamento', () => {
    render(<OrgChart nodes={ARBOL} label="Organigrama" showPeople={false} />);
    expect(screen.queryByText('Elena Sarrià')).not.toBeInTheDocument();
    expect(screen.getByText('Dirección')).toBeInTheDocument();
  });

  it('el zoom se acota entre su mínimo y su máximo', async () => {
    const onZoomChange = vi.fn();
    render(
      <OrgChart nodes={ARBOL} label="Organigrama" defaultZoom={1} minZoom={0.9} maxZoom={1.1} zoomStep={0.5} onZoomChange={onZoomChange} />,
    );
    await userEvent.click(screen.getByRole('button', { name: ES.orgChart.zoomIn }));
    expect(onZoomChange).toHaveBeenCalledWith(1.1);
    expect(screen.getByRole('button', { name: ES.orgChart.zoomIn })).toBeDisabled();
  });

  it('el zoom se escribe por el CSSOM, no por un atributo `style`', async () => {
    const { container } = render(<OrgChart nodes={ARBOL} label="Organigrama" defaultZoom={0.8} />);
    const canvas = container.querySelector('.org-chart__canvas') as HTMLElement;
    expect(canvas.style.getPropertyValue('--org-chart-zoom')).toBe('0.8');
  });

  it('el botón de tamaño natural está apagado cuando ya lo está', () => {
    render(<OrgChart nodes={ARBOL} label="Organigrama" />);
    expect(screen.getByRole('button', { name: ES.orgChart.zoomReset })).toBeDisabled();
  });

  it('sin controles de zoom no hay barra', () => {
    const { container } = render(<OrgChart nodes={ARBOL} label="Organigrama" showZoom={false} />);
    expect(container.querySelector('.org-chart__toolbar')).toBeNull();
  });

  it('cada persona lleva su puesto bajo el nombre', () => {
    render(<OrgChart nodes={ARBOL} label="Organigrama" />);
    const persona = screen.getByText('Elena Sarrià').closest('li');
    expect(within(persona as HTMLElement).getByText('Directora general')).toBeInTheDocument();
  });
});
