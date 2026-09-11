import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FormEvent } from 'react';
import { Card } from './Card';

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
});
