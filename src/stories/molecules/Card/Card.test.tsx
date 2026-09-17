import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FormEvent } from 'react';
import { Card, CardAction, CardHeader, CardTitle } from './Card';

describe('Card — tarjeta-acción (render sobre <button>)', () => {
  it('renderiza el <button> del consumidor con las clases y atributos de la tarjeta', () => {
    render(
      <Card
        render={<button type="submit" name="paso" value="otp" />}
        color="outline"
        title="Aplicación de autenticación"
        description="Genera un código de un solo uso."
        ctaLabel="Continuar con la aplicación de autenticación"
      />,
    );
    const boton = screen.getByRole('button', { name: /Continuar con la aplicación/ });
    expect(boton.tagName).toBe('BUTTON');
    expect(boton).toHaveAttribute('type', 'submit');
    expect(boton).toHaveAttribute('name', 'paso');
    expect(boton).toHaveAttribute('value', 'otp');
    expect(boton).toHaveClass('card', 'card--outline');
    // La tarjeta ES el botón: nada anidado, ni un <a> ni otro control.
    expect(boton.querySelector('a, button, input')).toBeNull();
  });

  it('al pulsarla, envía su name/value en el FormData del formulario que la contiene', async () => {
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });
    render(
      <form onSubmit={onSubmit} aria-label="Verificación en dos pasos" data-testid="form">
        <Card
          render={<button type="submit" name="authenticationExecution" value="webauthn" />}
          color="outline"
          title="Llave de seguridad"
          ctaLabel="Continuar con la llave de seguridad"
        />
        <Card
          render={<button type="submit" name="authenticationExecution" value="otp" />}
          color="outline"
          title="Aplicación de autenticación"
          ctaLabel="Continuar con la aplicación de autenticación"
        />
      </form>,
    );

    await userEvent.click(screen.getByRole('button', { name: /Continuar con la llave/ }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const form = screen.getByTestId('form') as HTMLFormElement;
    const submitter = (onSubmit.mock.calls[0][0].nativeEvent as SubmitEvent).submitter;
    expect(new FormData(form, submitter).get('authenticationExecution')).toBe('webauthn');
  });

  it('con `href`, sigue pintando un <a> — `render` no es obligatorio para el modo enlace', () => {
    render(<Card href="/destino" title="Servicio" ctaLabel="Ver más" />);
    const enlace = screen.getByRole('link', { name: /Ver más/ });
    expect(enlace.tagName).toBe('A');
    expect(enlace).toHaveAttribute('href', '/destino');
  });

  it('sin `ctaLabel` no hay flecha NI texto oculto: la llamada es una sola decisión', () => {
    render(<Card href="/certificados" title="Certificados" description="Emisión y verificación." />);
    const enlace = screen.getByRole('link');
    expect(enlace.querySelector('.arrow')).toBeNull();
    expect(enlace.querySelector('.visually-hidden')).toBeNull();
  });

  it('con `ctaLabel` están las dos: la flecha visible y su nombre accesible', () => {
    render(
      <Card href="/certificados" title="Certificados" description="Emisión y verificación." ctaLabel="Ver certificados" />,
    );
    const enlace = screen.getByRole('link', { name: /Ver certificados/ });
    expect(enlace.querySelector('.arrow')).not.toBeNull();
    expect(enlace.querySelector('.visually-hidden')).toHaveTextContent('Ver certificados');
  });
});

describe('CardAction — aislamiento de la ranura de acciones', () => {
  it('dentro de una tarjeta-enlace, pulsar la acción no navega ni llega al enlace', async () => {
    const onCardClick = vi.fn();
    render(
      <a href="/diseno/1" onClick={onCardClick}>
        <Card>
          <CardHeader>
            <CardTitle>Guía docente</CardTitle>
            <CardAction>
              <button type="button" onClick={vi.fn()}>
                Más opciones
              </button>
            </CardAction>
          </CardHeader>
        </Card>
      </a>,
    );

    // React delega sus manejadores en la raíz del árbol, así que la escucha
    // que comprueba si el navegador seguiría el enlace tiene que estar por
    // encima de ella: en `document`, que es lo último en ver el evento antes
    // de que el navegador ejecute la acción por defecto.
    let navegaria = false;
    const espia = (event: Event) => {
      if (!event.defaultPrevented) navegaria = true;
    };
    document.addEventListener('click', espia);
    try {
      await userEvent.click(screen.getByRole('button', { name: 'Más opciones' }));
    } finally {
      document.removeEventListener('click', espia);
    }

    // El manejador de React de la tarjeta no se entera (stopPropagation) y el
    // navegador no sigue el enlace (preventDefault).
    expect(onCardClick).not.toHaveBeenCalled();
    expect(navegaria).toBe(false);
  });

  it('el botón de la ranura sigue recibiendo su propio clic', async () => {
    const onAction = vi.fn();
    render(
      <a href="/diseno/1">
        <Card>
          <CardHeader>
            <CardTitle>Guía docente</CardTitle>
            <CardAction>
              <button type="button" onClick={onAction}>
                Más opciones
              </button>
            </CardAction>
          </CardHeader>
        </Card>
      </a>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Más opciones' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('fuera de un enlace no toca la acción por defecto: un submit sigue enviando', async () => {
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardAction>
              <button type="submit">Aplicar</button>
            </CardAction>
          </CardHeader>
        </Card>
      </form>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Aplicar' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('con `isolate={false}` el clic vuelve a contar como clic en la tarjeta', async () => {
    const onCardClick = vi.fn();
    render(
      <a href="/diseno/1" onClick={(event) => { event.preventDefault(); onCardClick(); }}>
        <Card>
          <CardHeader>
            <CardTitle>Guía docente</CardTitle>
            <CardAction isolate={false}>
              <button type="button">Más opciones</button>
            </CardAction>
          </CardHeader>
        </Card>
      </a>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Más opciones' }));
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});

describe('Card — `linkOverlay`', () => {
  it('la tarjeta es un contenedor y el enlace es el del título: un solo enlace, y el botón fuera de él', () => {
    render(
      <Card linkOverlay data-testid="tarjeta">
        <CardHeader>
          <CardTitle>
            <a href="/diseno/1">Guía docente</a>
          </CardTitle>
          <CardAction>
            <button type="button">Más opciones</button>
          </CardAction>
        </CardHeader>
      </Card>,
    );
    const tarjeta = screen.getByTestId('tarjeta');
    expect(tarjeta.tagName).toBe('DIV');
    expect(tarjeta).toHaveClass('card--link-overlay');

    const enlace = screen.getByRole('link', { name: 'Guía docente' });
    const boton = screen.getByRole('button', { name: 'Más opciones' });
    // El botón NO cuelga del enlace: ni HTML inválido ni un nombre accesible
    // que se trague la tarjeta entera.
    expect(enlace.contains(boton)).toBe(false);
  });
});
