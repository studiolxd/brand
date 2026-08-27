import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConversationList } from './ConversationList';
import type { ConversationItem } from './ConversationList';

const SAMPLE: ConversationItem[] = [
  { id: 'c1', label: 'Autenticación JWT' },
  { id: 'c2', label: 'Diseño de base de datos' },
];

function Lista(props: Partial<React.ComponentProps<typeof ConversationList>>) {
  return (
    <ConversationList
      conversations={SAMPLE}
      activeId="c1"
      onNew={vi.fn()}
      onSelect={vi.fn()}
      onDelete={vi.fn()}
      {...props}
    />
  );
}

describe('ConversationList', () => {
  it('el aspa de borrar se alcanza con el tabulador', async () => {
    const onDelete = vi.fn();
    render(<Lista onDelete={onDelete} />);

    // Nueva conversación → título de la primera → su aspa.
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Nueva conversación' })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Autenticación JWT' })).toHaveFocus();
    await userEvent.tab();
    expect(
      screen.getByRole('button', { name: 'Eliminar conversación "Autenticación JWT"' }),
    ).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(onDelete).toHaveBeenCalledWith('c1');
  });

  it('borrar no abre la conversación', async () => {
    const onSelect = vi.fn();
    const onDelete = vi.fn();
    render(<Lista onSelect={onSelect} onDelete={onDelete} />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Eliminar conversación "Diseño de base de datos"' }),
    );
    expect(onDelete).toHaveBeenCalledWith('c2');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('la conversación abierta se marca con aria-current', () => {
    render(<Lista />);
    expect(screen.getByRole('button', { name: 'Autenticación JWT' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('button', { name: 'Diseño de base de datos' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('los tres textos se traducen', () => {
    render(
      <Lista
        newLabel="New conversation"
        navLabel="Conversations"
        deleteLabel={(label) => `Delete "${label}"`}
      />,
    );
    expect(screen.getByRole('button', { name: 'New conversation' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Conversations' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete "Autenticación JWT"' })).toBeInTheDocument();
  });

  it('abrir una conversación avisa con su id', async () => {
    function Controlada() {
      const [activeId, setActiveId] = useState('c1');
      return <Lista activeId={activeId} onSelect={setActiveId} />;
    }
    render(<Controlada />);

    await userEvent.click(screen.getByRole('button', { name: 'Diseño de base de datos' }));
    expect(screen.getByRole('button', { name: 'Diseño de base de datos' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('className se añade a las clases propias y rest llega al contenedor', () => {
    render(<Lista className="propia" data-testid="lista" />);
    const el = screen.getByTestId('lista');
    expect(el).toHaveClass('conversation-list');
    expect(el).toHaveClass('propia');
  });
});
