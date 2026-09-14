import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ConnectorConsentPage } from './ConnectorConsentPage';
import { ConnectorSignInPage } from './ConnectorSignInPage';
import { ConnectorExternalSignInPage } from './ConnectorExternalSignInPage';
import { ConnectorRejectionPage } from './ConnectorRejectionPage';
import { SiteHeader } from '../../sections/SiteHeader/SiteHeader';
import { LegalFooter } from '../../sections/LegalFooter/LegalFooter';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from '../../molecules/ThemeSwitcher/ThemeSwitcher';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../atoms/Accordion/Accordion';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

/** Los seis idiomas de la suite, cada uno en el suyo: el servidor de autorización sirve la pantalla en el de la cookie. */
const IDIOMAS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pt', label: 'Português' },
];

const LEGAL = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso' },
  { id: 'privacidad', label: 'Política de privacidad', href: '#privacidad' },
  { id: 'cookies', label: 'Política de cookies', href: '#cookies' },
  { id: 'condiciones', label: 'Términos y condiciones', href: '#condiciones' },
];

/**
 * El chrome que el servidor de autorización tiene que pasar por props: no le
 * llega de ningún layout, porque sirve la pantalla fuera de la aplicación.
 * Sin índice del sitio —desde aquí no hay a dónde navegar—, pero con idioma y
 * tema, que en esta pantalla son necesarios.
 */
const CHROME = {
  header: <SiteHeader settings={<ThemeSwitcher size="lg" value="light" />} language={<LanguageSwitcher size="lg" value="es" languages={IDIOMAS} />} />,
  footer: <LegalFooter links={LEGAL} />,
};

/** Los parámetros de OAuth que viajan con la decisión, tal cual los pone el servidor. */
const CAMPOS = {
  response_type: 'code',
  client_id: 'cli_7f3a1b',
  redirect_uri: 'https://claude.ai/api/mcp/auth_callback',
  code_challenge: 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM',
  code_challenge_method: 'S256',
  state: 'a2c4e6',
  scope: 'mcp:read',
  consent_nonce: '9b1c8f2e7a4d',
};

/**
 * La familia entera cuelga de un solo `meta` —una página de documentación, no
 * cuatro— porque las cuatro pantallas son el mismo flujo y se revisan juntas.
 * El `component` es la principal; las otras tres entran por `render`, que es
 * lo que hace `Consent` con su par de piezas.
 */
const meta: Meta<typeof ConnectorConsentPage> = {
  title: 'Templates/ConnectorAuth',
  component: ConnectorConsentPage,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ConnectorConsentPage>;

/** La pantalla principal: una herramienta pide leer los datos de un producto. */
export const Consentimiento: Story = {
  args: {
    ...CHROME,
    clientName: 'Claude',
    productName: 'Bricks',
    accountEmail: 'ana.ruiz@ejemplo.com',
    scope: 'read',
    redirectHost: 'claude.ai',
    action: '/api/mcp/authorize',
    hiddenFields: CAMPOS,
  },
};

/** El alcance de escritura: la misma pantalla, otra frase y otra fila en la ficha. */
export const ConsentimientoDeEscritura: Story = {
  name: 'Consentimiento — lectura y escritura',
  args: {
    ...Consentimiento.args,
    scope: 'write',
    hiddenFields: { ...CAMPOS, scope: 'mcp:write' },
  },
};

/**
 * El nombre de la herramienta lo eligió quien la registró, y el registro es
 * abierto: aquí, 180 caracteres sin un solo espacio. Ni se sale de la columna
 * ni empuja el ancho de la página — y el host de retorno, que es el dato que
 * quien ataca NO elige, sigue en su sitio.
 */
export const NombreLargo: Story = {
  name: 'Nombre de herramienta larguísimo',
  args: {
    ...Consentimiento.args,
    clientName:
      'ClaudeOficialVerificadoPorStudioLXDNoEsUnaSuplantacionDeVerdadPuedesFiarteSinMirarNadaMasEstaEsLaHerramientaCorrectaAutorizaSinLeerElRestoDeLaPantallaPorFavorAhoraMismo',
    redirectHost: 'tools.ejemplo-que-no-reconoces.net',
  },
};

/**
 * Y con caracteres raros: marcado, comillas, saltos de dirección del texto y
 * un emoji. Todo llega como **texto plano** —React lo escapa, y la plantilla no
 * tiene ninguna vía de HTML crudo—, así que no hay forma de que un nombre
 * pinte negrita, un enlace o un título falso.
 */
export const NombreHostil: Story = {
  name: 'Nombre de herramienta con caracteres raros',
  args: {
    ...Consentimiento.args,
    clientName: '<strong>Claude</strong> · "oficial" ‮/gro.dlxoiduts// :sptth‬ 🔐 & Co.',
    redirectHost: 'xn--clude-6qa.ai',
  },
};

/** Sin marco (`shell={false}`): solo las dos columnas, para pintarlas dentro de una aplicación que ya tiene su `main`. */
export const SinMarco: Story = {
  name: 'Sin marco',
  args: {
    clientName: 'Claude',
    productName: 'Bricks',
    accountEmail: 'ana.ruiz@ejemplo.com',
    scope: 'read',
    redirectHost: 'claude.ai',
    action: '/api/mcp/authorize',
    shell: false,
  },
};

/** Se ha llegado al conector sin sesión: primero identificarse, y la decisión después. */
export const InicioDeSesion: Story = {
  name: 'Inicio de sesión requerido',
  render: () => (
    <ConnectorSignInPage
      {...CHROME}
      clientName="Claude"
      productName="Bricks"
      scope="read"
      redirectHost="claude.ai"
      signInHref="#acceso"
    />
  ),
};

/**
 * El conector de Moodle: no se consiente en la suite, se va a identificarse a
 * la instalación del cliente. La organización ya viene resuelta del subdominio,
 * así que la pantalla solo la confirma.
 */
export const ConectorDeMoodle: Story = {
  name: 'Conector de Moodle',
  render: () => (
    <ConnectorExternalSignInPage
      {...CHROME}
      organization="Universidad de Ejemplo"
      action="#iniciar-sesion-moodle"
      hiddenFields={{ oidcQuery: 'client_id=cli_7f3a1b&state=a2c4e6' }}
    />
  ),
};

/** Sin organización en la petición —una conexión al dominio pelado—, hay que escribirla: es la única pantalla de la familia que pide un dato. */
export const ConectorDeMoodleSinOrganizacion: Story = {
  name: 'Conector de Moodle — sin organización',
  render: () => (
    <ConnectorExternalSignInPage
      {...CHROME}
      action="#iniciar-sesion-moodle"
      error="No se ha encontrado ninguna conexión Moodle para esa organización."
      extra={
        <Accordion type="single" collapsible>
          <AccordionItem value="mcp-key">
            <AccordionTrigger>Desarrollo: pegar una clave MCP</AccordionTrigger>
            <AccordionContent>
              <Paragraph>
                El andamio del producto entra por la ranura `extra`: el sistema de diseño no lo conoce ni lo estila.
              </Paragraph>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
    />
  ),
};

/** La herramienta no consta en el producto: el arreglo no está aquí, está en la herramienta. */
export const RechazoClienteNoValido: Story = {
  name: 'Rechazo — cliente no válido',
  render: () => <ConnectorRejectionPage {...CHROME} reason="invalid-client" code="invalid_client" retryHref="#volver" />,
};

/** La dirección de retorno no es la registrada: la comprobación que impide que el acceso acabe en otras manos. */
export const RechazoRetornoNoPermitido: Story = {
  name: 'Rechazo — dirección de retorno no permitida',
  render: () => (
    <ConnectorRejectionPage {...CHROME} reason="invalid-redirect-uri" code="invalid_redirect_uri" retryHref="#volver" />
  ),
};

/** Falta algo en la petición, o llegó alterado. */
export const RechazoPeticionMalFormada: Story = {
  name: 'Rechazo — petición mal formada',
  render: () => <ConnectorRejectionPage {...CHROME} reason="invalid-request" code="invalid_request" retryHref="#volver" />,
};

/** Se ha denegado: la herramienta no se ha llevado nada. No hay error que mostrar, porque es el resultado pedido. */
export const RechazoPermisoDenegado: Story = {
  name: 'Rechazo — permiso denegado',
  render: () => <ConnectorRejectionPage {...CHROME} reason="access-denied" code="access_denied" retryHref="#volver" />,
};

/** La sesión caducó entre abrir la pantalla y decidir: identificarse otra vez y repetir desde la herramienta. */
export const RechazoSesionCaducada: Story = {
  name: 'Rechazo — sesión caducada',
  render: () => (
    <ConnectorRejectionPage {...CHROME} reason="session-expired" code="login_required" retryHref="#acceso" />
  ),
};

/**
 * El orden de las acciones y el foco inicial, que aquí son decisiones de
 * seguridad: denegar es el PRIMER botón del DOM —y por tanto la primera parada
 * del tabulador— y al cargar no hay nada enfocado, así que conceder acceso
 * nunca está a un Intro de distancia.
 */
export const TestOrdenYFoco: Story = {
  name: 'Test — el orden de las acciones y el foco',
  tags: ['!dev'],
  args: { ...Consentimiento.args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const denegar = canvas.getByRole('button', { name: 'Denegar' });
    const permitir = canvas.getByRole('button', { name: 'Permitir acceso' });

    // Denegar va antes en el DOM: es la primera parada del tabulador.
    expect(denegar.compareDocumentPosition(permitir) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    // Al cargar, nada enfocado: ningún Intro suelto concede acceso.
    expect(denegar).not.toHaveFocus();
    expect(permitir).not.toHaveFocus();

    // Los dos envían el mismo formulario nativo, distinguidos por su valor.
    expect(denegar).toHaveAttribute('type', 'submit');
    expect(denegar).toHaveAttribute('value', 'deny');
    expect(permitir).toHaveAttribute('value', 'approve');
  },
};

/** El nombre de la herramienta llega como texto, nunca como marcado: lo que se registró con `<strong>` se lee con sus signos. */
export const TestNombreEsTexto: Story = {
  name: 'Test — el nombre del cliente es texto plano',
  tags: ['!dev'],
  args: { ...NombreHostil.args },
  play: async ({ canvasElement }) => {
    // El valor de la ficha, no la frase de la cabecera: es el sitio donde el
    // nombre se compara con lo que uno esperaba.
    const valor = canvasElement.querySelector('.connector-request-summary__untrusted');
    expect(valor).not.toBeNull();
    expect(valor!.querySelector('strong')).toBeNull();
    expect(valor!.textContent).toContain('<strong>Claude</strong>');
  },
};
