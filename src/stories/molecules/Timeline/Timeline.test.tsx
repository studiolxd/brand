import { describe, it, expect } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Timeline, type TimelineItem } from './Timeline';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

/**
 * El historial no trae su castellano puesto: el cromo —el nombre de la lista
 * y el «estado actual»— sale del catálogo, que aquí monta este envoltorio.
 */
const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

const HITOS: TimelineItem[] = [
  { id: 'a', title: 'Abierto', date: '3 de marzo', author: 'Marta Ferrer', note: 'No descarga el PDF.' },
  { id: 'b', title: 'En curso', date: '4 de marzo', author: 'Nuria Oliva', tone: 'support-1' },
  { id: 'c', title: 'Resuelto', date: '5 de marzo', author: 'Nuria Oliva', tone: 'success', current: true },
];

describe('Timeline', () => {
  it('anuncia el historial como lista ordenada con un elemento por hito', () => {
    render(<Timeline items={HITOS} label="Historial del ticket" />);
    const lista = screen.getByRole('list', { name: 'Historial del ticket' });
    expect(lista.tagName).toBe('OL');
    expect(within(lista).getAllByRole('listitem')).toHaveLength(3);
  });

  it('sin `label` propio toma el nombre del catálogo', () => {
    render(<Timeline items={HITOS} />);
    expect(screen.getByRole('list', { name: ES.timeline.label })).toBeInTheDocument();
  });

  it('pinta fecha, autor y nota de cada hito', () => {
    render(<Timeline items={HITOS} label="Historial" />);
    expect(screen.getByText('3 de marzo')).toBeInTheDocument();
    expect(screen.getAllByText('Nuria Oliva')).toHaveLength(2);
    expect(screen.getByText('No descarga el PDF.')).toBeInTheDocument();
  });

  it('el estado vigente se lee, no solo se pinta', () => {
    render(<Timeline items={HITOS} label="Historial" />);
    expect(screen.getByText(`(${ES.timeline.current})`)).toBeInTheDocument();
  });

  it('el último hito no lleva carril: una línea que muere en el aire diría que falta algo', () => {
    const { container } = render(<Timeline items={HITOS} label="Historial" />);
    expect(container.querySelectorAll('.timeline__rail')).toHaveLength(2);
  });

  it('un historial de un solo hito no pinta carril', () => {
    const { container } = render(<Timeline items={[HITOS[0]]} label="Historial" />);
    expect(container.querySelectorAll('.timeline__rail')).toHaveLength(0);
  });

  it('un hito sin fecha ni autor no pinta la línea de metadatos', () => {
    const { container } = render(<Timeline items={[{ id: 'x', title: 'Creado' }]} label="Historial" />);
    expect(container.querySelector('.timeline__meta')).toBeNull();
  });

  it('las acciones del hito se pintan dentro de su cuerpo', () => {
    render(
      <Timeline
        items={[{ id: 'x', title: 'Resuelto', actions: <a href="#d">Ver el despliegue</a> }]}
        label="Historial"
      />,
    );
    expect(screen.getByRole('link', { name: 'Ver el despliegue' })).toBeInTheDocument();
  });

  it('reenvía className y atributos nativos a la lista', () => {
    render(<Timeline items={HITOS} label="Historial" className="mio" id="historial" />);
    const lista = screen.getByRole('list', { name: 'Historial' });
    expect(lista).toHaveClass('timeline', 'mio');
    expect(lista).toHaveAttribute('id', 'historial');
  });
});
