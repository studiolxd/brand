import { describe, it, expect } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import { AnnotationThread, type AnnotationEntry } from './AnnotationThread';
import type { ReactNode } from 'react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

/**
 * Estas piezas ya no traen su castellano puesto: el cromo sale del catálogo.
 * Aquí lo monta este envoltorio, que es lo que hace la aplicación en su raíz.
 */
const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}


const raiz: AnnotationEntry = {
  id: 'a1',
  author: 'Marta Ruiz',
  date: '2026-08-24T10:12:00Z',
  body: 'Falta el texto alternativo de la imagen.',
};

const respuestas: AnnotationEntry[] = [
  { id: 'a2', author: 'Luis Peña', date: '2026-08-24T11:40:00Z', body: 'Corregido.' },
];

describe('AnnotationThread', () => {
  it('es un artículo con nombre accesible y estado abierto por defecto', () => {
    render(<AnnotationThread annotation={raiz} />);
    const hilo = screen.getByRole('article', { name: 'Hilo de anotaciones' });
    expect(hilo).not.toHaveClass('annotation-thread--resolved');
    expect(within(hilo).getByText('Abierta')).toBeInTheDocument();
  });

  it('resuelto cambia el estado y su rótulo', () => {
    render(<AnnotationThread annotation={raiz} status="resolved" />);
    const hilo = screen.getByRole('article', { name: 'Hilo de anotaciones' });
    expect(hilo).toHaveClass('annotation-thread--resolved');
    expect(within(hilo).getByText('Resuelta')).toBeInTheDocument();
  });

  it('atendido cambia el estado y su rótulo, sin retirarse como el resuelto', () => {
    render(<AnnotationThread annotation={raiz} status="acknowledged" />);
    const hilo = screen.getByRole('article', { name: 'Hilo de anotaciones' });
    expect(hilo).toHaveClass('annotation-thread--acknowledged');
    expect(hilo).not.toHaveClass('annotation-thread--resolved');
    expect(within(hilo).getByText('Atendida')).toBeInTheDocument();
  });

  it('el rótulo del estado atendido es una prop: un producto puede llamarlo como quiera', () => {
    render(<AnnotationThread annotation={raiz} status="acknowledged" acknowledgedLabel="Verificada" />);
    expect(screen.getByText('Verificada')).toBeInTheDocument();
  });

  it('cada estado pinta su variante de Tag, sin estrenar color', () => {
    const { rerender } = render(<AnnotationThread annotation={raiz} />);
    expect(screen.getByText('Abierta')).toHaveClass('tag--warning');
    rerender(<AnnotationThread annotation={raiz} status="acknowledged" />);
    expect(screen.getByText('Atendida')).toHaveClass('tag--info');
    rerender(<AnnotationThread annotation={raiz} status="resolved" />);
    expect(screen.getByText('Resuelta')).toHaveClass('tag--success');
  });

  it('muestra autor, cuerpo y una fecha legible por máquina', () => {
    const { container } = render(<AnnotationThread annotation={raiz} />);
    expect(screen.getByText('Marta Ruiz')).toBeInTheDocument();
    expect(screen.getByText('Falta el texto alternativo de la imagen.')).toBeInTheDocument();
    expect(container.querySelector('time')).toHaveAttribute('datetime', '2026-08-24T10:12:00.000Z');
  });

  it('cuenta las respuestas y las pinta', () => {
    render(<AnnotationThread annotation={raiz} replies={respuestas} />);
    expect(screen.getByText('1 respuesta')).toBeInTheDocument();
    expect(screen.getByText('Corregido.')).toBeInTheDocument();
  });

  it('sin respuestas no monta el bloque ni el recuento', () => {
    render(<AnnotationThread annotation={raiz} />);
    expect(screen.queryByText(/respuesta/)).not.toBeInTheDocument();
  });

  it('marca las anotaciones editadas', () => {
    render(<AnnotationThread annotation={{ ...raiz, edited: true }} />);
    expect(screen.getByText('editada')).toBeInTheDocument();
  });

  it('la coordenada de una anotación va en la fila de la fecha, después de ella', () => {
    const { container } = render(
      <AnnotationThread
        annotation={{ ...raiz, edited: true, meta: <a href="#l4">Lección 4</a> }}
      />,
    );
    const cabecera = container.querySelector('.annotation-thread__header')!;
    const enlace = screen.getByRole('link', { name: 'Lección 4' });
    const fecha = cabecera.querySelector('time')!;

    expect(cabecera).toContainElement(enlace);
    expect(screen.getByText('editada')).toBeInTheDocument();
    expect(fecha.compareDocumentPosition(enlace) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector('.annotation-thread__item-actions')).toBeNull();
  });

  it('la coordenada es de cada anotación, no del hilo', () => {
    render(
      <AnnotationThread
        annotation={{ ...raiz, meta: <a href="#l4">Lección 4</a> }}
        replies={[{ ...respuestas[0], meta: <a href="#glosario">Glosario</a> }]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Lección 4' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Glosario' })).toBeInTheDocument();
  });

  it('sin coordenada no monta la ranura', () => {
    const { container } = render(<AnnotationThread annotation={raiz} />);
    expect(container.querySelector('.annotation-thread__meta')).toBeNull();
  });

  it('pinta las acciones del hilo y las de cada anotación', () => {
    render(
      <AnnotationThread
        annotation={{ ...raiz, actions: <button type="button">Editar</button> }}
        actions={<button type="button">Resolver</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Editar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Resolver' })).toBeInTheDocument();
  });

  it('los textos son props traducibles', () => {
    render(
      <AnnotationThread
        annotation={raiz}
        replies={respuestas}
        label="Annotation thread"
        openLabel="Open"
        repliesLabel={(n) => `${n} replies`}
        locale="en-GB"
      />,
    );
    const hilo = screen.getByRole('article', { name: 'Annotation thread' });
    expect(within(hilo).getByText('Open')).toBeInTheDocument();
    expect(within(hilo).getByText('1 replies')).toBeInTheDocument();
  });
});
