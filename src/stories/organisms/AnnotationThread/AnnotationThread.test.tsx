import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { AnnotationThread, type AnnotationEntry } from './AnnotationThread';

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
