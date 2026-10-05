import { forwardRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

/** Un `Link` de router de mentira: navega en su propio `onClick` si nadie lo canceló, como el de Next.js. */
const FakeLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { navigate: () => void }>(
  function FakeLink({ navigate, onClick, ...props }, ref) {
    return (
      <a
        ref={ref}
        {...props}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) navigate();
          event.preventDefault();
        }}
      />
    );
  },
);

describe('Button loading', () => {
  it('mete el girador delante del texto, que se queda, y dice que está ocupado e inactivo', () => {
    render(<Button loading>Guardar</Button>);
    const button = screen.getByRole('button', { name: 'Guardar' });
    expect(button).toHaveClass('button--loading');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    // No `disabled` nativo: el botón no pierde el foco al ponerse a cargar.
    expect(button).not.toBeDisabled();
    const spinner = button.querySelector('.button__spinner .spinner');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(button.firstElementChild).toHaveClass('button__spinner');
    // El girador no añade un `status` que se anuncie aparte.
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('sin loading no hay girador ni atributos de espera', () => {
    render(<Button>Guardar</Button>);
    const button = screen.getByRole('button', { name: 'Guardar' });
    expect(button).not.toHaveAttribute('aria-busy');
    expect(button).not.toHaveAttribute('aria-disabled');
    expect(button.querySelector('.button__spinner')).toBeNull();
  });

  it('corta el clic y el envío del formulario', async () => {
    const onClick = vi.fn();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit" loading onClick={onClick}>Enviar</Button>
      </form>,
    );
    const button = screen.getByRole('button', { name: 'Enviar' });
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('con iconOnly el girador sustituye al icono y el nombre sigue siendo el aria-label', () => {
    render(
      <Button iconOnly aria-label="Descargar" loading>
        <svg data-testid="icono" />
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Descargar' });
    expect(screen.queryByTestId('icono')).toBeNull();
    expect(button.querySelector('.button__spinner')).not.toBeNull();
  });

  it('como enlace (href) queda sin destino mientras carga', () => {
    render(<Button href="/informe" loading>Informe</Button>);
    const link = screen.getByRole('link', { name: 'Informe' });
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-busy', 'true');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('con render={<Link/>} corta la navegación del clic normal', async () => {
    const navigate = vi.fn();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick} render={<FakeLink href="/informe" navigate={navigate} />}>
        Informe
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Informe' });
    expect(link).toHaveAttribute('aria-busy', 'true');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link.querySelector('.button__spinner')).not.toBeNull();
    // El `href` del Link no se puede quitar desde fuera: queda, pero el clic no navega.
    expect(link).toHaveAttribute('href', '/informe');
    await userEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
