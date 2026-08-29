import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ConsentBanner, ConsentPreferences, type ConsentCategory, type ConsentValue } from './Consent';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { SiteShell } from '../../sections/SiteShell/SiteShell';

const categorias: ConsentCategory[] = [
  {
    id: 'necessary',
    name: 'Necesarias',
    description: 'Sesión, idioma y seguridad. Sin ellas el sitio no funciona.',
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analítica',
    description: 'Nos dicen qué páginas se visitan, de forma agregada y sin perfilar.',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Miden si una campaña ha traído visitas y permiten personalizar anuncios.',
  },
];

const decisionInicial: ConsentValue = { necessary: true, analytics: false, marketing: false };

const meta: Meta<typeof ConsentBanner> = {
  title: 'Molecules/Consent',
  component: ConsentBanner,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    policyHref: '#politica-de-cookies',
  },
};

export default meta;
type Story = StoryObj<typeof ConsentBanner>;

/** Una página de ejemplo detrás de la banda: el banner no la bloquea. */
function Pagina() {
  return (
    <div style={{ padding: 'var(--spacing-6)', display: 'grid', gap: 'var(--spacing-3)' }}>
      <Heading level={1}>Formación a medida</Heading>
      <Paragraph>
        La página sigue viva mientras la banda está en pantalla: se puede leer, tabular y navegar.
      </Paragraph>
      <p><a href="#un-enlace">Un enlace cualquiera</a></p>
    </div>
  );
}

/** Estado 1: primera visita. La banda pide la decisión y ofrece las tres salidas. */
export const Banner: Story = {
  name: 'Banda',
  render: (args) => (
    <>
      <Pagina />
      <ConsentBanner {...args} onAcceptAll={() => {}} onRejectAll={() => {}} onOpenPreferences={() => {}} />
    </>
  ),
};

/** Sin `onOpenPreferences` la banda solo ofrece aceptar y rechazar. */
export const BannerSinPreferencias: Story = {
  name: 'Banda sin preferencias',
  render: (args) => (
    <>
      <Pagina />
      <ConsentBanner {...args} onAcceptAll={() => {}} onRejectAll={() => {}} />
    </>
  ),
};

/**
 * Estado 2: el panel de categorías, abierto sobre un `Sheet`. Sin botón
 * «Guardar»: cada interruptor persiste al instante vía `onChange`.
 */
export const Preferencias: Story = {
  render: () => {
    function Demo() {
      const [decision, setDecision] = useState(decisionInicial);
      const [abierto, setAbierto] = useState(true);
      return (
        <>
          <Pagina />
          <ConsentPreferences
            open={abierto}
            onOpenChange={setAbierto}
            categories={categorias}
            value={decision}
            onChange={setDecision}
          />
        </>
      );
    }
    return <Demo />;
  },
};

/** El mismo panel sobre `Modal`, para productos que no usan hojas laterales. */
export const PreferenciasEnModal: Story = {
  name: 'Preferencias en modal',
  render: () => {
    function Demo() {
      const [decision, setDecision] = useState(decisionInicial);
      const [abierto, setAbierto] = useState(true);
      return (
        <>
          <Pagina />
          <ConsentPreferences
            surface="modal"
            open={abierto}
            onOpenChange={setAbierto}
            categories={categorias}
            value={decision}
            onChange={setDecision}
          />
        </>
      );
    }
    return <Demo />;
  },
};

/**
 * El panel de preferencias, en `Modal`, abierto dentro de `SiteShell` — la
 * web pública. El `container` apunta al nodo de `SiteShell` para que el
 * portal (que por defecto monta en `document.body`, fuera de `.site-shell`)
 * herede sus tokens: el aspa pasa a `lg` y el cuerpo lee a 20px.
 */
export const PreferenciasEnSiteShell: Story = {
  name: 'Preferencias en SiteShell',
  parameters: { layout: 'fullscreen' },
  render: () => {
    function Demo() {
      const [decision, setDecision] = useState(decisionInicial);
      const [abierto, setAbierto] = useState(true);
      const [shellNode, setShellNode] = useState<HTMLDivElement | null>(null);
      return (
        <SiteShell ref={setShellNode}>
          <Pagina />
          <ConsentPreferences
            surface="modal"
            open={abierto}
            onOpenChange={setAbierto}
            categories={categorias}
            value={decision}
            onChange={setDecision}
            container={shellNode}
          />
        </SiteShell>
      );
    }
    return <Demo />;
  },
};

/**
 * Estado 3: el flujo completo. La banda pide la decisión, el panel la afina y,
 * una vez decidida, solo queda el botón de volver a abrir las preferencias
 * —retirar el consentimiento tiene que ser tan fácil como darlo—.
 */
export const FlujoCompleto: Story = {
  name: 'Flujo completo',
  render: () => {
    function Demo() {
      const [decision, setDecision] = useState(decisionInicial);
      const [decidido, setDecidido] = useState(false);
      const [abierto, setAbierto] = useState(false);

      const todas = { necessary: true, analytics: true, marketing: true };

      return (
        <>
          <div style={{ padding: 'var(--spacing-6)', display: 'grid', gap: 'var(--spacing-3)' }}>
            <Heading level={1}>Formación a medida</Heading>
            <Paragraph>
              Decisión actual: analítica {decision.analytics ? 'aceptada' : 'rechazada'}, marketing{' '}
              {decision.marketing ? 'aceptado' : 'rechazado'}.
            </Paragraph>
            {decidido && (
              <p>
                <Button variant="text" onClick={() => setAbierto(true)}>
                  Preferencias de cookies
                </Button>
              </p>
            )}
          </div>

          <ConsentBanner
            open={!decidido}
            policyHref="#politica-de-cookies"
            onAcceptAll={() => { setDecision(todas); setDecidido(true); }}
            onRejectAll={() => { setDecision(decisionInicial); setDecidido(true); }}
            onOpenPreferences={() => setAbierto(true)}
          />

          <ConsentPreferences
            open={abierto}
            onOpenChange={(next) => { setAbierto(next); if (!next) setDecidido(true); }}
            categories={categorias}
            value={decision}
            onChange={setDecision}
          />
        </>
      );
    }
    return <Demo />;
  },
};

/** Sobre superficie oscura la banda remapea fondo, texto y línea por token. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: (args) => (
    <>
      <Pagina />
      <ConsentBanner {...args} onAcceptAll={() => {}} onRejectAll={() => {}} onOpenPreferences={() => {}} />
    </>
  ),
};

/** Test: la banda es una región con nombre, no un diálogo, y no atrapa el foco. */
export const ContratoBanner: Story = {
  name: 'Test — región, no diálogo',
  tags: ['!dev'],
  render: () => (
    <>
      <Pagina />
      <ConsentBanner
        policyHref="#politica"
        onAcceptAll={() => {}}
        onRejectAll={() => {}}
        onOpenPreferences={() => {}}
      />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole('region', { name: 'Consentimiento de cookies' });
    await expect(region.tagName).toBe('ASIDE');
    // No es un diálogo: nada de rol dialog ni de modal.
    await expect(canvas.queryByRole('dialog')).toBeNull();
    await expect(region).not.toHaveAttribute('aria-modal');
    // Las tres salidas están, y rechazar no está escondido.
    await expect(canvas.getByRole('button', { name: 'Aceptar todas' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Rechazar' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Preferencias' })).toBeVisible();
    // El enlace a la política se puede seguir.
    await expect(canvas.getByRole('link', { name: 'Política de cookies' }))
      .toHaveAttribute('href', '#politica');
    // El contenido de la página sigue siendo alcanzable con el teclado.
    const enlacePagina = canvas.getByRole('link', { name: 'Un enlace cualquiera' });
    enlacePagina.focus();
    await expect(enlacePagina).toHaveFocus();
  },
};

/** Test: se llega a los tres botones con el teclado y cada uno llama a lo suyo. */
export const ContratoTeclado: Story = {
  name: 'Test — recorrido de teclado de la banda',
  tags: ['!dev'],
  render: () => {
    function Demo() {
      const [ultima, setUltima] = useState('ninguna');
      return (
        <>
          <p data-testid="ultima">{ultima}</p>
          <ConsentBanner
            onAcceptAll={() => setUltima('aceptar')}
            onRejectAll={() => setUltima('rechazar')}
            onOpenPreferences={() => setUltima('preferencias')}
          />
        </>
      );
    }
    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aceptar = canvas.getByRole('button', { name: 'Aceptar todas' });
    aceptar.focus();
    await expect(aceptar).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByTestId('ultima')).toHaveTextContent('aceptar');

    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Rechazar' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByTestId('ultima')).toHaveTextContent('rechazar');

    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Preferencias' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByTestId('ultima')).toHaveTextContent('preferencias');
  },
};

/**
 * Test: sin botón «Guardar» — mover un interruptor decide al instante (llama
 * a `onChange` con la decisión completa), y la categoría necesaria no se
 * puede tocar.
 */
export const ContratoPreferencias: Story = {
  name: 'Test — autoguardado y categoría necesaria',
  tags: ['!dev'],
  render: () => {
    function Demo() {
      const [decision, setDecision] = useState<ConsentValue>(decisionInicial);
      return (
        <>
          <p data-testid="decision">{JSON.stringify(decision)}</p>
          <ConsentPreferences
            open
            onOpenChange={() => {}}
            categories={categorias}
            value={decision}
            onChange={setDecision}
          />
        </>
      );
    }
    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    // El panel vive en un portal, fuera del canvas de la story.
    const panel = within(document.body);
    const necesarias = await panel.findByRole('switch', { name: /Necesarias/ });
    await expect(necesarias).toBeDisabled();
    await expect(necesarias).toBeChecked();

    // No hay botón «Guardar»: solo las dos acciones del pie.
    await expect(panel.queryByRole('button', { name: /Guardar/ })).toBeNull();

    const analitica = panel.getByRole('switch', { name: /Analítica/ });
    await expect(analitica).not.toBeChecked();
    await userEvent.click(analitica);
    await expect(analitica).toBeChecked();
    // El cambio se persiste al instante, sin paso de guardado intermedio.
    await expect(within(canvasElement).getByTestId('decision')).toHaveTextContent(
      JSON.stringify({ necessary: true, analytics: true, marketing: false }),
    );
  },
};

/**
 * Test: `onSave` es el alias deprecado de `onChange` — sigue disparándose en
 * cada conmutación, no solo al cerrar, para no romper a quien ya lo pasaba.
 */
export const ContratoOnSaveAlias: Story = {
  name: 'Test — onSave, alias deprecado, dispara en cada cambio',
  tags: ['!dev'],
  render: () => {
    function Demo() {
      const [llamadas, setLlamadas] = useState<ConsentValue[]>([]);
      return (
        <>
          <p data-testid="llamadas">{llamadas.length}</p>
          <ConsentPreferences
            open
            onOpenChange={() => {}}
            categories={categorias}
            value={decisionInicial}
            onSave={(next) => setLlamadas((prev) => [...prev, next])}
          />
        </>
      );
    }
    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    const panel = within(document.body);
    const analitica = await panel.findByRole('switch', { name: /Analítica/ });
    await userEvent.click(analitica);
    await expect(within(canvasElement).getByTestId('llamadas')).toHaveTextContent('1');
    const marketing = panel.getByRole('switch', { name: /Marketing/ });
    await userEvent.click(marketing);
    await expect(within(canvasElement).getByTestId('llamadas')).toHaveTextContent('2');
  },
};

/**
 * Test: el panel no lleva párrafo de descripción, ni línea entre categorías,
 * y la marca «Siempre activa» de la categoría necesaria es accesible pero no
 * se ve.
 */
export const ContratoSinDescripcionNiSeparadores: Story = {
  name: 'Test — sin descripción, sin separadores, marca no visible',
  tags: ['!dev'],
  render: () => (
    <ConsentPreferences
      open
      onOpenChange={() => {}}
      categories={categorias}
      value={decisionInicial}
      onChange={() => {}}
    />
  ),
  play: async () => {
    const panel = within(document.body);
    const dialog = await panel.findByRole('dialog');

    await expect(within(dialog).queryByText(/no se pueden desactivar/)).toBeNull();
    await expect(dialog.querySelector('.separator')).toBeNull();

    const marca = within(dialog).getByText(', Siempre activa');
    await expect(marca).toHaveClass('visually-hidden');
    await expect(getComputedStyle(marca).width).toBe('1px');

    // El nombre accesible del interruptor la sigue incluyendo, separada del
    // nombre de la categoría por una coma (nunca pegada: "NecesariasSiempre activa").
    await expect(within(dialog).getByRole('switch', { name: /Necesarias\s*,\s*Siempre activa/ }))
      .toBeInTheDocument();
  },
};

/** Test: el panel es un diálogo — atrapa el foco y se cierra con Escape. */
export const ContratoPanelTeclado: Story = {
  name: 'Test — el panel es un diálogo y Escape lo cierra',
  tags: ['!dev'],
  render: () => {
    function Demo() {
      const [abierto, setAbierto] = useState(true);
      return (
        <>
          <p data-testid="estado">{abierto ? 'abierto' : 'cerrado'}</p>
          <ConsentPreferences
            open={abierto}
            onOpenChange={setAbierto}
            categories={categorias}
            value={decisionInicial}
            onChange={() => {}}
          />
        </>
      );
    }
    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    const panel = within(document.body);
    await expect(await panel.findByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await expect(within(canvasElement).getByTestId('estado')).toHaveTextContent('cerrado');
  },
};

/**
 * Test: el panel no tiene acciones globales — ni «Guardar» ni «Aceptar
 * todas»/«Rechazar todas». Quien entra aquí decide categoría por categoría;
 * las salidas de un clic son cosa de `ConsentBanner`.
 */
export const ContratoSinAccionesGlobales: Story = {
  name: 'Test — el panel no lleva acciones globales',
  tags: ['!dev'],
  render: () => (
    <ConsentPreferences
      surface="modal"
      open
      onOpenChange={() => {}}
      categories={categorias}
      value={decisionInicial}
      onChange={() => {}}
    />
  ),
  play: async () => {
    const panel = within(document.body);
    const dialog = await panel.findByRole('dialog');
    const dentro = within(dialog);
    for (const nombre of ['Aceptar todas', 'Rechazar todas', 'Rechazar', 'Guardar']) {
      await expect(dentro.queryByRole('button', { name: nombre })).toBeNull();
    }
    // El único botón del panel es el aspa de cerrar; lo demás son interruptores.
    const botones = dentro.getAllByRole('button');
    await expect(botones).toHaveLength(1);
    await expect(botones[0]).toHaveAccessibleName('Cerrar');
    await expect(dentro.getAllByRole('switch').length).toBeGreaterThan(0);
  },
};
