/**
 * El modelo del panel de estado y sus datos de ejemplo: qué aplicaciones vigila
 * el monitor, cómo se dice que están y cómo les ha ido en treinta días.
 *
 * Vive aparte del componente por la regla de siempre —un fichero de componente
 * solo exporta componentes—, y porque el catálogo de aplicaciones es un dato,
 * no una pieza.
 */
import type { UptimeBarsThresholds } from '../../molecules/UptimeBars/UptimeBars';

/** Cómo está una aplicación ahora mismo. */
export type SaludAplicacion = 'operational' | 'failing' | 'unknown';

/** Cómo está el conjunto. */
export type SaludConjunto = 'operational' | 'degraded' | 'down' | 'unknown';

export interface AplicacionEstado {
  id: string;
  /** El nombre visible. Un producto es nombre propio; una pieza de plataforma se traduce. */
  nombre: string;
  /** URL pública. Sin ella (colas, websocket) no hay página que visitar. */
  url?: string;
  salud: SaludAplicacion;
  /**
   * Minutos caídos cada día, del más antiguo (hace 30 días) al de hoy. `null`
   * es **sin dato** —el monitor todavía no vigilaba esto—, que no es 0 %.
   */
  minutosCaidos: (number | null)[];
}

const MINUTOS_POR_HORA = 60;
const MINUTOS_POR_DIA = 24 * MINUTOS_POR_HORA;

/** Días que enseña la tira. */
export const DIAS = 30;

/**
 * Los cortes de la tira **en minutos caídos al día**, que es como se piensan:
 * hasta 5 minutos el día está bien, de 5 minutos a 1 hora está tocado, y de ahí
 * para abajo está caído. El margen del verde es deliberado — un fallo aislado
 * de comprobación no es un incidente.
 */
const CAIDA_POR_DIA = { ok: 5, degraded: 60 };
/** Minutos caídos en un día → porcentaje de disponibilidad de ese día. */
export const disponibilidad = (minutos: number) => ((MINUTOS_POR_DIA - minutos) / MINUTOS_POR_DIA) * 100;

export const CORTES: UptimeBarsThresholds = {
  ok: disponibilidad(CAIDA_POR_DIA.ok),
  degraded: disponibilidad(CAIDA_POR_DIA.degraded),
};


/**
 * Treinta días sin incidencias, salvo los que se digan: `{ índice: minutos }`,
 * con el índice 0 en el día más antiguo y `null` para los que el monitor aún
 * no vigilaba.
 */
function serie(incidencias: Record<number, number | null> = {}): (number | null)[] {
  return Array.from({ length: DIAS }, (_, indice) =>
    Object.hasOwn(incidencias, indice) ? incidencias[indice] : 0,
  );
}

/**
 * Las aplicaciones que vigila el monitor, en el orden en que se pintan: la web
 * y el hub primero, después cada producto seguido de sus servicios (edición
 * colaborativa, worker), y al final lo externo. Los procesos en segundo plano
 * laten contra el monitor y no atienden peticiones: ninguno lleva enlace.
 *
 * Los treinta días llevan una historia creíble y no ruido: un par de días
 * tocados en Bricks y su worker, una tarde entera caída en Localizia, y LMS
 * MCP sin monitorizar la primera semana porque se dio de alta después.
 */
export const APLICACIONES: readonly AplicacionEstado[] = [
  { id: 'web', nombre: 'SLXD', url: 'https://slxd.app', salud: 'operational', minutosCaidos: serie({ 22: 4 }) },
  { id: 'hub', nombre: 'Hub', url: 'https://account.slxd.app', salud: 'operational', minutosCaidos: serie({ 22: 4 }) },
  { id: 'bricks', nombre: 'Bricks', url: 'https://bricks.slxd.app', salud: 'operational', minutosCaidos: serie({ 11: 21, 12: 3 }) },
  { id: 'collab', nombre: 'Bricks collab', salud: 'operational', minutosCaidos: serie({ 11: 34 }) },
  { id: 'bricks-worker', nombre: 'Bricks worker', salud: 'operational', minutosCaidos: serie({ 11: 47 }) },
  { id: 'lmsmcp', nombre: 'LMS MCP', url: 'https://lmsmcp.slxd.app', salud: 'operational', minutosCaidos: serie({ 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null }) },
  { id: 'localizia', nombre: 'Localizia', url: 'https://localizia.slxd.app', salud: 'operational', minutosCaidos: serie({ 25: 194 }) },
  { id: 'localizia-worker', nombre: 'Localizia worker', salud: 'operational', minutosCaidos: serie({ 25: 208 }) },
  { id: 'tender', nombre: 'Tender', url: 'https://tender.slxd.app', salud: 'operational', minutosCaidos: serie() },
  { id: 'sharescorm', nombre: 'ShareSCORM', url: 'https://sharescorm.slxd.app', salud: 'operational', minutosCaidos: serie({ 17: 3 }) },
  { id: 'sharescorm-worker', nombre: 'ShareSCORM worker', salud: 'operational', minutosCaidos: serie() },
  { id: 'lrs', nombre: 'LRS', url: 'https://lrs.slxd.app', salud: 'operational', minutosCaidos: serie({ 6: 12 }) },
  { id: 'lrs-worker', nombre: 'LRS worker', salud: 'operational', minutosCaidos: serie() },
  { id: 'lmsmarketplace', nombre: 'LMS Marketplace', url: 'https://lmsmarketplace.slxd.app', salud: 'operational', minutosCaidos: serie({ 2: 9 }) },
  { id: 'lmsmarketplace-worker', nombre: 'LMS Marketplace worker', salud: 'operational', minutosCaidos: serie() },
  { id: 'aipricing', nombre: 'AI API Pricing', url: 'https://aipricing.slxd.app', salud: 'operational', minutosCaidos: serie({ 8: 26 }) },
  { id: 'corporate', nombre: 'Studio LXD', url: 'https://studiolxd.com', salud: 'operational', minutosCaidos: serie() },
  { id: 'status', nombre: 'Status', url: 'https://status.slxd.app', salud: 'operational', minutosCaidos: serie() },
];

/**
 * El mismo catálogo con las aplicaciones dichas sin responder: se les marca la
 * salud y se les añaden al día de hoy los minutos que llevan caídas.
 */
export function sinResponder(ids: readonly string[], minutosHoy: number): AplicacionEstado[] {
  return APLICACIONES.map((aplicacion) => {
    if (!ids.includes(aplicacion.id)) return aplicacion;
    const minutosCaidos = [...aplicacion.minutosCaidos];
    minutosCaidos[DIAS - 1] = minutosHoy;
    return { ...aplicacion, salud: 'failing', minutosCaidos };
  });
}
