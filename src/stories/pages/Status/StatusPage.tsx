import type { ReactNode } from 'react';
import { AppRoot } from '../../sections/AppRoot/AppRoot';
import { SiteHeader } from '../../sections/SiteHeader/SiteHeader';
import { LegalFooter } from '../../sections/LegalFooter/LegalFooter';
import { PublicPageShell } from '../../templates/PublicPageShell/PublicPageShell';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from '../../molecules/ThemeSwitcher/ThemeSwitcher';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Alert } from '../../molecules/Alert/Alert';
import { UptimeBars, type UptimeBarsPoint } from '../../molecules/UptimeBars/UptimeBars';
import { Container } from '../../atoms/Container/Container';
import { Heading } from '../../atoms/Heading/Heading';
import { Inline } from '../../atoms/Inline/Inline';
import { Link } from '../../atoms/Link/Link';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import { Stack } from '../../atoms/Stack/Stack';
import { Tag, type TagVariant } from '../../atoms/Tag/Tag';
import { TooltipProvider } from '../../atoms/Tooltip/Tooltip';
import {
  CORTES,
  DIAS,
  disponibilidad,
  type AplicacionEstado,
  type SaludAplicacion,
  type SaludConjunto,
} from './_datos';

/** Los seis idiomas de la suite, cada uno en el suyo. */
const IDIOMAS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pt', label: 'Português' },
];

/**
 * Las legales del panel son **las suyas**, no las de la web: vive en otro
 * servidor justo para seguir en pie cuando la suite se cae, y unos enlaces que
 * mueran con ella serían el único trozo roto de la página que se mira durante
 * la caída.
 */
const LEGAL = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso' },
  { id: 'privacidad', label: 'Política de privacidad', href: '#privacidad' },
  { id: 'cookies', label: 'Política de cookies', href: '#cookies' },
  { id: 'condiciones', label: 'Términos y condiciones', href: '#condiciones' },
];

export interface StatusPageProps {
  /** El tablero: lo único vivo de la página. */
  children: ReactNode;
  /** Tema que enseña el conmutador. Solo eso: el oscuro del lienzo lo pone la story. */
  theme?: 'light' | 'dark';
}

/**
 * El panel de estado (`status.slxd.app`) montado con las piezas del DS:
 * `AppRoot` + `PublicPageShell` con la cabecera de la marca y, en el pie, las
 * preferencias y las legales.
 *
 * La cabecera **no lleva índice**: el panel es un sitio de una sola página que
 * debe seguir de pie cuando la suite no lo está, y un menú lleno de enlaces a
 * servicios caídos sería una promesa que no puede cumplir. Sin índice ni
 * ajustes, `SiteHeader` no monta el panel y su botón de menú desaparece solo,
 * así que los dos conmutadores —idioma y tema— bajan al pie, como en el alta.
 */
export function StatusPage({ children, theme = 'light' }: StatusPageProps) {
  return (
    <AppRoot>
      <PublicPageShell
        header={<SiteHeader logoHref="https://slxd.app" logoLabel="Ir a slxd.app" />}
        footer={
          <>
            {/* Una `section` con nombre: los dos controles siguen dentro de una
                región nombrada en vez de quedar sueltos entre el contenido y el
                pie legal, que es un `footer` y no admite invitados. */}
            <Container as="section" space="sm" aria-label="Preferencias">
              {/* `end`: si una etiqueta se parte en dos líneas, los controles
                  siguen compartiendo renglón. */}
              <Inline gap="md" align="end">
                <LanguageSwitcher size="lg" value="es" languages={IDIOMAS} />
                <ThemeSwitcher size="lg" value={theme} />
              </Inline>
            </Container>
            <LegalFooter links={LEGAL} />
          </>
        }
      >
        <Stack gap="lg">
          <PageIntro title="Estado del servicio" />
          {children}
        </Stack>
      </PublicPageShell>
    </AppRoot>
  );
}

// ---------------------------------------------------------------------------
// El tablero
// ---------------------------------------------------------------------------

/** El resumen de arriba, uno por salud del conjunto. */
const RESUMEN: Record<SaludConjunto, { variant: 'success' | 'warning' | 'error' | 'default'; title: string; description: string }> = {
  operational: {
    variant: 'success',
    title: 'Servicio operativo',
    description: 'Todas las aplicaciones responden con normalidad.',
  },
  degraded: {
    variant: 'warning',
    title: 'Servicio parcialmente disponible',
    description: 'Algunas aplicaciones no están respondiendo; el resto funciona con normalidad.',
  },
  down: {
    variant: 'error',
    title: 'Servicio caído',
    description: 'Ninguna aplicación está respondiendo a nuestras comprobaciones.',
  },
  unknown: {
    variant: 'default',
    title: 'Servicio sin comprobar',
    description: 'Todavía no hemos podido comprobar si las aplicaciones funcionan.',
  },
};

/** El `Tag` de cada aplicación. */
const SALUD: Record<SaludAplicacion, { variant: TagVariant; label: string }> = {
  operational: { variant: 'success', label: 'Operativo' },
  failing: { variant: 'danger', label: 'No responde' },
  unknown: { variant: 'neutral', label: 'Sin datos' },
};

/** Minutos que tiene una hora: la unidad en la que se cuenta lo caído. */
const MINUTOS_POR_HORA = 60;

/**
 * El día de referencia de los datos de ejemplo. Fijo a propósito: una story
 * que se apoye en `Date.now()` cambia de captura cada noche.
 */
const HOY = new Date(2026, 8, 5, 9, 41, 7);

const DIA = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
const PORCENTAJE = new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: 2 });
const MOMENTO = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'medium' });

/** La fecha del punto `indice` de la serie (0 = hace 30 días). */
function fecha(indice: number): Date {
  const dia = new Date(HOY.getFullYear(), HOY.getMonth(), HOY.getDate());
  dia.setDate(dia.getDate() - (DIAS - 1 - indice));
  return dia;
}

/** La línea del bocadillo de un día. */
function detalle(minutos: number | null): string {
  if (minutos === null) return 'Sin monitorizar todavía';
  if (minutos === 0) return 'Sin incidencias';
  // Menos de un minuto caído se redondea a uno: decir «caído 0 minutos» de un
  // día que no llega al 100 % es peor que exagerar por 59 segundos.
  const redondeado = Math.max(1, Math.round(minutos));
  if (redondeado < MINUTOS_POR_HORA) return `Caído ${redondeado} ${redondeado === 1 ? 'minuto' : 'minutos'}`;
  return `Caído ${Math.floor(redondeado / MINUTOS_POR_HORA)} h ${redondeado % MINUTOS_POR_HORA} min`;
}

export interface StatusBoardProps {
  /** Cómo fue la consulta al monitor: pidiéndola, contestada, o sin respuesta. */
  estado: 'cargando' | 'listo' | 'incomunicado';
  /** Cómo está el conjunto. Solo con `listo`. */
  salud?: SaludConjunto;
  /** Las aplicaciones, en el orden en que se pintan. Solo con `listo`. */
  aplicaciones?: readonly AplicacionEstado[];
}

/**
 * El tablero: un apartado por aplicación con su nombre, su enlace, cómo está
 * ahora y su tira de 30 días.
 *
 * La página se sirve estática, así que el dato lo pide el navegador al monitor
 * —que vive en otro servidor— al cargar y cada minuto. Que el monitor no
 * conteste no es un error de la página: es información, y se enseña como tal.
 */
export function StatusBoard({ estado, salud = 'operational', aplicaciones = [] }: StatusBoardProps) {
  if (estado === 'cargando') {
    return (
      <Container width="full" space="none" aria-busy="true" aria-live="polite">
        <Paragraph>Comprobando el estado…</Paragraph>
        <Stack gap="md">
          <Skeleton height="5rem" />
          <Skeleton height="12rem" />
        </Stack>
      </Container>
    );
  }

  if (estado === 'incomunicado') {
    return (
      <Container width="full" space="none" aria-live="polite">
        <Alert
          variant="error"
          title="No podemos comprobar el servicio ahora mismo"
          description="No podemos decirte si las aplicaciones funcionan; posiblemente, todas funcionen con normalidad: prueba a entrar directamente o vuelve a cargar esta página dentro de unos minutos."
        />
      </Container>
    );
  }

  const resumen = RESUMEN[salud];

  return (
    <Container width="full" space="none" aria-live="polite">
      {/* Un solo proveedor para los ~540 bocadillos de la página: sin él cada
          barrita abriría con su propio retardo. */}
      <TooltipProvider>
        <Stack gap="lg" align="stretch">
          <Alert variant={resumen.variant} title={resumen.title} description={resumen.description} />

          <Paragraph size="small">Última comprobación: {MOMENTO.format(HOY)}</Paragraph>

          {aplicaciones.map((aplicacion) => (
            <AplicacionEnEstado key={aplicacion.id} aplicacion={aplicacion} />
          ))}
        </Stack>
      </TooltipProvider>
    </Container>
  );
}

/** Un apartado: la aplicación, cómo está ahora y cómo ha ido en 30 días. */
function AplicacionEnEstado({ aplicacion }: { aplicacion: AplicacionEstado }) {
  const { nombre, url, salud, minutosCaidos } = aplicacion;

  const puntos: UptimeBarsPoint[] = minutosCaidos.map((minutos, indice) => ({
    value: minutos === null ? null : disponibilidad(minutos),
    label: DIA.format(fecha(indice)),
    detail: detalle(minutos),
  }));

  const conDato = minutosCaidos.filter((minutos): minutos is number => minutos !== null);
  const media = conDato.length === 0
    ? null
    : disponibilidad(conDato.reduce((total, minutos) => total + minutos, 0) / conDato.length);

  return (
    <Stack gap="md" align="stretch">
      <Inline gap="sm" align="center">
        <Heading level={2} size={5}>
          {nombre}
          {url !== undefined && (
            <>
              {' ('}
              <Link href={url} external>{new URL(url).host}</Link>
              {')'}
            </>
          )}
        </Heading>
        <Tag variant={SALUD[salud].variant}>{SALUD[salud].label}</Tag>
      </Inline>

      <UptimeBars
        points={puntos}
        label={`Disponibilidad de ${nombre} en los últimos 30 días`}
        startLabel="Hace 30 días"
        endLabel="Hoy"
        summary={media === null ? 'Sin media de 30 días' : `${PORCENTAJE.format(media / 100)} de disponibilidad en 30 días`}
        thresholds={CORTES}
        noDataLabel="sin datos"
        pointLabel={(punto, valor) => `${punto.label}: ${valor ?? 'sin datos'}. ${punto.detail ?? ''}`}
      />
    </Stack>
  );
}
