import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessageComposer } from './MessageComposer';

/** El composer es controlado: para probar el envío hace falta quien lleve el valor. */
function Controlado({ onSend, inicial = '' }: { onSend: () => void; inicial?: string }) {
  const [value, setValue] = useState(inicial);
  return (
    <MessageComposer
      value={value}
      onChange={setValue}
      onSend={onSend}
      inputLabel="Mensaje"
    />
  );
}

describe('MessageComposer', () => {
  it('Enter envía y Mayús+Enter salta de línea', async () => {
    const onSend = vi.fn();
    render(<Controlado onSend={onSend} />);
    const campo = screen.getByRole('textbox', { name: 'Mensaje' });

    await userEvent.type(campo, 'Hola');
    await userEvent.type(campo, '{Enter}');
    expect(onSend).toHaveBeenCalledTimes(1);

    await userEvent.type(campo, '{Shift>}{Enter}{/Shift}');
    expect(onSend).toHaveBeenCalledTimes(1);
    expect((campo as HTMLTextAreaElement).value).toContain('\n');
  });

  it('un mensaje en blanco no se envía, ni con el botón ni con Enter', async () => {
    const onSend = vi.fn();
    render(<Controlado onSend={onSend} />);
    const campo = screen.getByRole('textbox', { name: 'Mensaje' });

    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();

    await userEvent.type(campo, '   ');
    await userEvent.type(campo, '{Enter}');
    expect(onSend).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();
  });

  it('el botón envía y se llama como lo que pone', async () => {
    const onSend = vi.fn();
    render(<Controlado onSend={onSend} inicial="Hola" />);

    const boton = screen.getByRole('button', { name: 'Enviar' });
    expect(boton).not.toHaveAttribute('aria-label');
    await userEvent.click(boton);
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it('la línea del atajo describe al campo y lleva teclas de verdad', () => {
    render(<Controlado onSend={vi.fn()} />);
    const campo = screen.getByRole('textbox', { name: 'Mensaje' });
    const id = campo.getAttribute('aria-describedby');
    expect(id).toBeTruthy();

    const ayuda = document.getElementById(id as string);
    expect(ayuda).toHaveTextContent('Enter');
    expect(ayuda?.querySelectorAll('kbd')).toHaveLength(3);
  });

  it('helperText sustituye la ayuda y null la quita', () => {
    const { rerender } = render(
      <MessageComposer value="" onChange={vi.fn()} onSend={vi.fn()} inputLabel="Mensaje" helperText="Otra cosa" />,
    );
    expect(screen.getByText('Otra cosa')).toBeInTheDocument();

    rerender(
      <MessageComposer value="" onChange={vi.fn()} onSend={vi.fn()} inputLabel="Mensaje" helperText={null} />,
    );
    expect(screen.getByRole('textbox', { name: 'Mensaje' })).not.toHaveAttribute('aria-describedby');
  });

  it('deshabilitado, ni el campo ni el botón aceptan nada', async () => {
    const onSend = vi.fn();
    render(
      <MessageComposer value="Hola" onChange={vi.fn()} onSend={onSend} inputLabel="Mensaje" disabled />,
    );
    expect(screen.getByRole('textbox', { name: 'Mensaje' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();
    expect(onSend).not.toHaveBeenCalled();
  });

  it('className se añade a las clases propias y rest llega al contenedor', () => {
    render(
      <MessageComposer
        value=""
        onChange={vi.fn()}
        onSend={vi.fn()}
        inputLabel="Mensaje"
        className="propia"
        data-testid="composer"
      />,
    );
    const el = screen.getByTestId('composer');
    expect(el).toHaveClass('message-composer');
    expect(el).toHaveClass('propia');
  });
});
