import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConnectorConsentPage } from './ConnectorConsentPage';
import { ConnectorExternalSignInPage } from './ConnectorExternalSignInPage';
import { ConnectorRejectionPage } from './ConnectorRejectionPage';

function Consentimiento(props: Partial<React.ComponentProps<typeof ConnectorConsentPage>> = {}) {
  return (
    <ConnectorConsentPage
      clientName="Claude"
      accountEmail="ana@ejemplo.com"
      redirectHost="claude.ai"
      productName="Bricks"
      {...props}
    />
  );
}

describe('ConnectorConsentPage', () => {
  it('denegar va antes que permitir en el DOM y nada se enfoca al montar', () => {
    render(<Consentimiento />);
    const denegar = screen.getByRole('button', { name: 'Denegar' });
    const permitir = screen.getByRole('button', { name: 'Permitir acceso' });

    expect(denegar.compareDocumentPosition(permitir) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(document.activeElement).toBe(document.body);
  });

  it('con initialFocus="deny" el foco arranca en denegar, nunca en permitir', () => {
    render(<Consentimiento initialFocus="deny" />);
    expect(screen.getByRole('button', { name: 'Denegar' })).toHaveFocus();
  });

  it('con `action` es un formulario nativo: los dos botones envían y los campos ocultos viajan', () => {
    const { container } = render(
      <Consentimiento action="/api/mcp/authorize" hiddenFields={{ client_id: 'cli_1', state: 'a2c4e6' }} />,
    );

    const form = container.querySelector('form')!;
    expect(form).toHaveAttribute('method', 'post');
    expect(form).toHaveAttribute('action', '/api/mcp/authorize');

    expect(screen.getByRole('button', { name: 'Denegar' })).toHaveAttribute('value', 'deny');
    expect(screen.getByRole('button', { name: 'Permitir acceso' })).toHaveAttribute('value', 'approve');

    expect(form.querySelector('input[name="client_id"]')).toHaveValue('cli_1');
    expect(form.querySelector('input[name="state"]')).toHaveValue('a2c4e6');
  });

  it('sin `action` la decisión sale por los callbacks', async () => {
    const onApprove = vi.fn();
    const onDeny = vi.fn();
    render(<Consentimiento onApprove={onApprove} onDeny={onDeny} />);

    await userEvent.click(screen.getByRole('button', { name: 'Denegar' }));
    expect(onDeny).toHaveBeenCalledOnce();

    await userEvent.click(screen.getByRole('button', { name: 'Permitir acceso' }));
    expect(onApprove).toHaveBeenCalledOnce();
  });

  it('el nombre del cliente se pinta como texto entrecomillado, nunca como marcado', () => {
    const { container } = render(<Consentimiento clientName='<strong>Claude</strong>' />);
    const valor = container.querySelector('.connector-request-summary__untrusted')!;

    expect(valor.querySelector('strong')).toBeNull();
    // El texto llega intacto dentro del aislante; las comillas son nuestras y
    // van fuera, para que se lea como la cadena que alguien registró.
    expect(valor.querySelector('bdi')!.textContent).toBe('<strong>Claude</strong>');
    expect(valor.textContent).toBe('«<strong>Claude</strong>»');
  });

  it('los tres datos de fuera van aislados de dirección, no solo el nombre', () => {
    const { container } = render(<Consentimiento />);
    const valores = container.querySelectorAll('.connector-request-summary__untrusted');

    // Herramienta, cuenta y destino.
    expect(valores).toHaveLength(3);
    valores.forEach((valor) => expect(valor.querySelector('bdi')).not.toBeNull());
  });

  it('los caracteres que dan la vuelta al texto se ven, y también en el host', () => {
    const { container } = render(
      <Consentimiento clientName={'Claude\u202E'} redirectHost={'\u202Egro.olpmeje.eldoom'} />,
    );
    const [herramienta, , destino] = Array.from(
      container.querySelectorAll('.connector-request-summary__untrusted'),
    );

    expect(herramienta.textContent).toBe('«Claude[U+202E]»');
    expect(destino.textContent).toBe('«[U+202E]gro.olpmeje.eldoom»');
    // Ya no queda ningún control en el documento: no hay nada que el motor
    // pueda aplicar para leer la dirección al revés.
    expect(container.textContent).not.toMatch(/[\u202A-\u202E\u2066-\u2069]/);
  });

  it('los juntadores de glifo no se tocan: no reordenan nada y hay escrituras que los necesitan', () => {
    const { container } = render(<Consentimiento clientName={'Claude\u200Dtool'} />);
    const valor = container.querySelector('.connector-request-summary__untrusted')!;
    expect(valor.querySelector('bdi')!.textContent).toBe('Claude\u200Dtool');
  });

  it('un nombre larguísimo se recorta, y el nombre entero sigue en el documento y a un clic', () => {
    const largo = 'Claude'.repeat(40);
    const { container } = render(<Consentimiento clientName={largo} />);
    const valor = container.querySelector('.connector-request-summary__untrusted')!;

    // El recorte es visual: el texto completo no se pierde.
    expect(valor.querySelector('bdi')!.textContent).toBe(largo);
    expect(valor.querySelector('.connector-untrusted__value--clamped')).not.toBeNull();
    // Y hay una salida sin JavaScript para verlo entero.
    expect(valor.querySelector('details > summary')).not.toBeNull();
    expect(screen.getByText('Ver el valor completo')).toBeInTheDocument();
  });

  it('un nombre normal no lleva ni recorte ni desplegador', () => {
    const { container } = render(<Consentimiento />);
    const valor = container.querySelector('.connector-request-summary__untrusted')!;

    expect(valor.querySelector('.connector-untrusted__value--clamped')).toBeNull();
    expect(valor.querySelector('details')).toBeNull();
  });

  it('el alcance decide la fila del permiso', () => {
    const { rerender } = render(<Consentimiento scope="read" />);
    expect(screen.getByText('leer los datos de este producto')).toBeInTheDocument();

    rerender(<Consentimiento scope="write" />);
    expect(screen.getByText('leer y modificar los datos de este producto')).toBeInTheDocument();
  });
});

describe('ConnectorRejectionPage', () => {
  it('cada motivo trae su título y su salida', () => {
    const { rerender } = render(<ConnectorRejectionPage reason="access-denied" retryHref="#volver" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('No se ha dado acceso');
    expect(screen.getByRole('link', { name: 'Volver a intentarlo' })).toBeInTheDocument();

    rerender(<ConnectorRejectionPage reason="session-expired" retryHref="#acceso" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('La sesión ha caducado');
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });

  it('sin salida no pinta ninguna: hay rechazos que no se reintentan desde aquí', () => {
    render(<ConnectorRejectionPage reason="invalid-client" />);
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('el código técnico solo aparece si se pasa', () => {
    const { rerender } = render(<ConnectorRejectionPage reason="invalid-request" />);
    expect(screen.queryByText(/Código/)).toBeNull();

    rerender(<ConnectorRejectionPage reason="invalid-request" code="invalid_request" />);
    expect(screen.getByText('invalid_request')).toBeInTheDocument();
  });
});

describe('ConnectorExternalSignInPage', () => {
  it('con la organización resuelta la confirma y no pide nada', () => {
    render(<ConnectorExternalSignInPage organization="Universidad de Ejemplo" />);
    expect(screen.getByText(/Iniciarás sesión en/)).toHaveTextContent('Universidad de Ejemplo');
    expect(screen.queryByLabelText('Tu organización')).toBeNull();
  });

  it('sin organización pide el dato', () => {
    render(<ConnectorExternalSignInPage />);
    expect(screen.getByLabelText('Tu organización')).toBeRequired();
  });

  it('el fallo anterior se anuncia', () => {
    render(<ConnectorExternalSignInPage error="No se ha encontrado ninguna conexión Moodle para esa organización." />);
    expect(screen.getByRole('alert')).toHaveTextContent('No se ha encontrado ninguna conexión Moodle');
  });
});
