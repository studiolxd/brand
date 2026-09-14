import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
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
 *
 * **Sin índice del sitio y sin nada más en la barra**: quien está autorizando
 * un conector no está navegando, y un menú aquí solo ofrece salidas de un
 * flujo que hay que terminar o rechazar.
 *
 * **Idioma y tema van en la banda de preferencias del pie**, como en el resto
 * de páginas públicas de la suite (2026-09-14). En estas pantallas el idioma
 * no es un adorno: el servidor lo saca de la cookie o de `Accept-Language`, y
 * quien llegue en el idioma equivocado no tiene ninguna otra pantalla
 * alrededor donde cambiarlo.
 */
const CHROME = {
  header: <SiteHeader />,
  preferences: (
    <>
      <LanguageSwitcher value="es" languages={IDIOMAS} />
      <ThemeSwitcher value="light" />
    </>
  ),
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
 * ni empuja el ancho de la página, y además **se recorta a tres líneas** para
 * que la decisión no quede fuera de la vista: el nombre entero sigue en el
 * documento —un lector de pantalla lo lee completo— y se despliega con «Ver el
 * valor completo», que es un `<details>` nativo y no necesita JavaScript. En la
 * frase de la cabecera se recorta igual, sin desplegador, porque el sitio para
 * verlo entero es la ficha.
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
 * Y con caracteres raros: marcado, comillas, saltos de dirección del texto y un
 * emoji. Todo llega como **texto plano** —React lo escapa, y la plantilla no
 * tiene ninguna vía de HTML crudo—, así que no hay forma de que un nombre pinte
 * negrita, un enlace o un título falso. Que el `<strong>` se lea con sus signos
 * **es la defensa funcionando**; las comillas están para que se lea como lo que
 * es, la cadena que alguien registró, y no como un fallo de la interfaz.
 *
 * El control de dirección (`U+202E`) sale escrito: marcado ya no puede dar la
 * vuelta a nada, y como no se borra, dos nombres que solo se diferencien en él
 * siguen viéndose distintos.
 */
export const NombreHostil: Story = {
  name: 'Nombre de herramienta con caracteres raros',
  args: {
    ...Consentimiento.args,
    clientName: '<strong>Claude</strong> · "oficial" ‮/gro.dlxoiduts// :sptth‬ 🔐 & Co.',
    redirectHost: 'xn--clude-6qa.ai',
  },
};

/**
 * El caso más grave, y por eso tiene historia propia: el **host de retorno**
 * con un control de dirección delante. Sin defensa, `gro.odigirroc-eldoom` se
 * pinta como si fuera `moodle-corregido.org` y el destino del acceso parece uno
 * cuando es otro — suplantación, no fealdad. Aquí el control se ve escrito
 * (`[U+202E]`), el valor va aislado en un `<bdi>` —así tampoco puede reordenar
 * el texto de la frase que lo rodea— y lo que queda a la vista es exactamente
 * lo que se va a usar.
 */
export const HostDadoLaVuelta: Story = {
  name: 'Host de retorno con la dirección invertida',
  args: {
    ...Consentimiento.args,
    clientName: 'Claude',
    redirectHost: '\u202Egro.odigirroc-eldoom',
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
    // Entrecomillado: se lee como la cadena que alguien registró.
    expect(valor!.textContent!.startsWith('«')).toBe(true);
  },
};

/**
 * Ningún control de dirección sobrevive en la página, ni en la ficha ni en las
 * frases: no queda nada que el motor pueda aplicar para leer un host al revés.
 */
export const TestSinControlesDeDireccion: Story = {
  name: 'Test — no queda ningún control de dirección',
  tags: ['!dev'],
  args: { ...HostDadoLaVuelta.args },
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).not.toMatch(/[\u202A-\u202E\u2066-\u2069]/);
    expect(canvasElement.textContent).toContain('[U+202E]');
    // Y el valor sigue aislado, así que tampoco reordena lo que tiene alrededor.
    expect(canvasElement.querySelector('.connector-untrusted bdi')).not.toBeNull();
  },
};

/**
 * El recorte medido en el navegador: un nombre larguísimo ocupa como mucho las
 * líneas del token, y al desplegar el `<details>` crece. El texto completo
 * estaba ahí desde el principio.
 */
export const TestRecorteDelNombre: Story = {
  name: 'Test — el recorte del nombre y su desplegador',
  tags: ['!dev'],
  args: { ...NombreLargo.args },
  play: async ({ canvasElement }) => {
    const ficha = canvasElement.querySelector('.connector-request-summary__untrusted')!;
    const recortado = ficha.querySelector('.connector-untrusted__value--clamped') as HTMLElement;
    expect(recortado).not.toBeNull();

    // El nombre entero está en el documento aunque no se vea entero.
    expect(ficha.querySelector('bdi')!.textContent).toBe(NombreLargo.args!.clientName);

    const estilo = getComputedStyle(recortado);
    const lineas = Number(estilo.getPropertyValue('--connector-auth-untrusted-max-lines'));
    const alto = parseFloat(estilo.lineHeight) * lineas;
    const cerrado = recortado.getBoundingClientRect().height;
    expect(cerrado).toBeLessThanOrEqual(alto + 1);

    // Desplegado ocupa más: el mismo dato, entero, sin una línea de JavaScript.
    const detalle = ficha.querySelector('details') as HTMLDetailsElement;
    detalle.open = true;
    await waitFor(() => expect(recortado.getBoundingClientRect().height).toBeGreaterThan(cerrado));
  },
};

/**
 * El chrome de estas pantallas, tal como lo pide la decisión: la barra solo
 * con el logotipo —sin índice del sitio ni selectores— y el idioma y el tema
 * abajo, en la banda de preferencias, encima del pie legal.
 */
export const ContratoChrome: Story = {
  name: 'Test — la barra sin menú y las preferencias en el pie',
  tags: ['!dev'],
  args: Consentimiento.args,
  play: async ({ canvasElement }) => {
    const barra = canvasElement.querySelector('.site-header')!;
    const banda = canvasElement.querySelector('.public-page-shell__preferences')!;
    const principal = canvasElement.querySelector('main')!;

    // En la barra, un solo control: el logotipo. Ni menú ni selectores.
    await expect(barra.querySelectorAll('button, a')).toHaveLength(1);
    await expect(barra.querySelector('[aria-haspopup]')).toBeNull();

    // Idioma y tema, abajo: después del contenido, no en la cabecera.
    await expect(banda.contains(barra)).toBe(false);
    await expect(
      banda.getBoundingClientRect().top,
    ).toBeGreaterThan(principal.getBoundingClientRect().top);
    await expect(banda.querySelectorAll('button').length).toBeGreaterThanOrEqual(2);
  },
};
