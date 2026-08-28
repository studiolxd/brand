import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  it('con label es una región con nombre accesible', () => {
    render(<ScrollArea label="Condiciones">contenido</ScrollArea>);
    expect(screen.getByRole('region', { name: 'Condiciones' })).toBeInTheDocument();
  });

  it('sin label no inventa una región', () => {
    render(<ScrollArea>contenido</ScrollArea>);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByText('contenido')).toBeInTheDocument();
  });

  it('vertical monta una sola barra', () => {
    const { container } = render(<ScrollArea>contenido</ScrollArea>);
    expect(container.querySelectorAll('.scroll-area__scrollbar')).toHaveLength(1);
  });

  it('both monta las dos barras y la esquina', () => {
    const { container } = render(<ScrollArea orientation="both">contenido</ScrollArea>);
    expect(container.querySelectorAll('.scroll-area__scrollbar')).toHaveLength(2);
    expect(container.querySelector('.scroll-area__corner')).not.toBeNull();
  });

  it('className se añade a las clases propias', () => {
    const { container } = render(<ScrollArea className="panel">contenido</ScrollArea>);
    expect(container.firstElementChild).toHaveClass('scroll-area', 'panel');
  });
});
