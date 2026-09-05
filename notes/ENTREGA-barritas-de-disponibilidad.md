# Entrega — las barritas de disponibilidad (`UptimeBars`)

Rama `uptime-bars`. **Sin tag ni bump de versión**: publicada sigue siendo la
v30.9.0. La entrada del CHANGELOG está escrita bajo «Sin publicar» — al taggear
basta renombrar ese encabezado a la versión que toque (es **minor**: componente
nuevo, rol de color nuevo, tallas nuevas, ningún breaking de API).

Cuatro commits, en este orden:

1. `feat: el rol de aviso en los colores de feedback`
2. `feat: UptimeBars, la tira de disponibilidad`
3. `refactor: Alert, Toast y Tag pintan el aviso con el rol, no con la marca`
4. `feat: el retrato del avatar — tallas 3xl y 4xl, y AvatarUpload al doble`

---

## 1. La pieza: `Molecules/UptimeBars`

Export `@studiolxd/brand/uptime-bars`, y también desde el barril
(`@studiolxd/brand`), que es de donde salen `uptimeStatus` y
`UPTIME_BARS_DEFAULT_THRESHOLDS` (no cuelgan del subpath: la regla del repo de
un fichero = un componente los deja en su propio módulo).

### La API exacta

```ts
interface UptimeBarsPoint {
  value: number | null;   // porcentaje 0–100; null = sin dato (no es 0 %)
  label: string;          // la etiqueta del punto, ya escrita: «5 de septiembre»
  detail?: string;        // una línea para el bocadillo: «Sin incidencias», «Caído 2 h 14 min»
}

interface UptimeBarsThresholds {
  ok?: number;            // default 99.65
  degraded?: number;      // default 95.83
}

interface UptimeBarsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  points: UptimeBarsPoint[];              // la serie, del más antiguo al más reciente
  summary: ReactNode;                     // la media, YA escrita — obligatoria
  label?: string;                         // nombre accesible de la tira. Default «Disponibilidad»
  startLabel?: ReactNode;                 // «Hace 30 días»
  endLabel?: ReactNode;                   // «Hoy»
  thresholds?: UptimeBarsThresholds;
  locale?: string;                        // default 'es-ES'
  maximumFractionDigits?: number;         // default 2
  pointLabel?: (point: UptimeBarsPoint, formattedValue: string | null) => string;
  noDataLabel?: string;                   // default «sin datos»
  tooltips?: boolean;                     // default true
}

// Además, desde el barril:
const UPTIME_BARS_DEFAULT_THRESHOLDS: { ok: 99.65; degraded: 95.83 };
function uptimeStatus(value: number | null, thresholds: Required<UptimeBarsThresholds>):
  'ok' | 'degraded' | 'down' | 'empty';
```

`summary` es la **única** prop obligatoria además de `points`: es la alternativa
en texto a treinta rectángulos de colores, así que el tipo no deja publicar una
tira sin ella.

### Ejemplo de uso con 30 puntos (para que la adopción sea mecánica)

En `apps/status`, con lo que ya devuelve Gatus por monitor y día:

```tsx
import { UptimeBars, type UptimeBarsPoint } from '@studiolxd/brand';

const DIA = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
const PCT = new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: 2 });

/** `dias`: 30 entradas del más antiguo al más reciente. `uptime` en 0–100 o null. */
function BarrasDeApp({ nombre, dias }: { nombre: string; dias: { fecha: Date; uptime: number | null }[] }) {
  const points: UptimeBarsPoint[] = dias.map(({ fecha, uptime }) => ({
    value: uptime,
    label: DIA.format(fecha),
    detail:
      uptime === null ? 'Sin monitorizar todavía'
      : uptime === 100 ? 'Sin incidencias'
      : `Caído ${minutosCaido(uptime)}`,   // el formato de la duración lo pone el producto
  }));

  const medidos = dias.filter((d) => d.uptime !== null);
  const media = medidos.reduce((a, d) => a + d.uptime!, 0) / (medidos.length || 1);

  return (
    <UptimeBars
      points={points}
      label={`Disponibilidad de ${nombre} en los últimos 30 días`}
      startLabel="Hace 30 días"
      endLabel="Hoy"
      summary={`${PCT.format(media / 100)} de disponibilidad`}
    />
  );
}
```

El panel entero necesita **un** `TooltipProvider` por encima (el shell de la app
ya lo lleva si usa `AppShell`); sin él los bocadillos siguen funcionando, solo
que cada uno con su propio retardo.

Los cortes de fábrica están en porcentaje, pero pensados en **minutos caídos al
día**; si `apps/status` los quiere en minutos:

```tsx
const enMinutos = (min: number) => ((24 * 60 - min) / (24 * 60)) * 100;
<UptimeBars thresholds={{ ok: enMinutos(5), degraded: enMinutos(60) }} … />
```

### Las decisiones, y por qué

- **Agnóstica del tiempo y del origen.** No sabe qué es un día ni qué es Gatus:
  recibe puntos y pinta. Las fechas las escribe el consumidor con `Intl`, que es
  quien sabe de idioma y de zona horaria; la media se le pasa escrita, por lo
  mismo por lo que `StatTile` no formatea su cifra.
- **Sin dato ≠ 0 %.** `value: null` se pinta rayado sobre la superficie
  secundaria, sin ningún color de estado, y se anuncia «sin datos». La trama es
  además lo que lo distingue **sin depender del color**.
- **Tres tramos, con los cortes en `thresholds` y no en el CSS.** Los de fábrica
  —verde hasta 5 min caídos al día (99,65 %), amarillo hasta 1 h (95,83 %), rojo
  por debajo— llevan margen a propósito: un fallo aislado de comprobación no es
  un incidente, y si el verde exigiera el 100 % clavado un panel sano se vería
  amarillo.
- **La serie es una lista ordenada, no una imagen con descripción.** Una imagen
  obliga a resumir treinta valores en una frase; la lista deja recorrerlos uno a
  uno con el cursor virtual y dice cuántos son. Cada barrita es un `role="img"`
  con su nombre completo dentro de su `<li>`.
- **Una sola parada de tabulador**, con flechas, `Inicio` y `Fin` (tabulación
  itinerante). Con 30 puntos por servicio, una parada por barrita convertiría un
  panel de ocho aplicaciones en 240 tabulaciones.
- **El bocadillo es el `Tooltip` del sistema** (Base UI), que ya se abre con el
  foco además de con el puntero. Repite lo que dice el nombre accesible: no
  añade información para un lector de pantalla, está para el ratón, que no tiene
  otra forma de saber de qué día es la barrita.
- **Responsivo por reparto, no por número.** Cada punto es `flex: 1 1 0` con
  `min-inline-size: 0`; la única medida fija es el alto. A 375px las 30 caben,
  y hay un test de story que lo mide.

### El punto flojo, dicho en voz alta

En superficie oscura los `*-fill` de feedback son **universales** (así lo manda
el sufijo) y contra el prusia se quedan en ~2,3:1. Quien identifica la barrita
ahí es su **filete** de tinta clara —el mismo recurso que el relleno de
`ProgressBar`, y lo que WCAG 1.4.11 admite—, pero eso no separa los tres tramos
entre sí por luminancia: en oscuro solo los distingue el tono. Se sostiene
porque el color nunca es la única señal (nombre accesible por barrita + media en
texto). Arreglarlo del todo pediría un **rol de relleno por superficie**, que
hoy no existe; no se ha inventado en una pieza.

---

## Lo que cambia fuera de la pieza

Tres cambios visuales en componentes que ya están en uso. Ninguno toca API ni
nombres de clase, así que la adopción es un bump de tag, pero conviene mirarlos.

### 1. El rol `warning` existe, y `Alert`, `Toast` y `Tag` lo usan

El sistema solo tenía `success`, `error` y `destructive`. Se añade `warning-*`
con la forma de los otros tres (`-text-on-light`, `-text-on-dark`, `-fill`,
`-fill-text`) sobre un **ámbar de sistema** nuevo:

| Token | Valor | Medida |
| --- | --- | --- |
| `color.amber` | `#7D4C00` | 7,23:1 sobre blanco (AAA); blanco encima, el mismo 7,23:1 |
| `color.amber-light` | `#F59E0B` | 7,81:1 sobre prusia (AAA) |

Son los mismos números que ya tenían el rojo (7,20) y el verde (7,21): el rol
nuevo no baja el listón de los que ya estaban.

**No se reutiliza `accent-2`.** El amarillo de marca es identidad —el relleno de
un `Tag` de marca, el hover de un botón—, no un estado: con él, un aviso y un
botón bajo el puntero se pintaban del mismo color. Y como no llega a 3:1 sobre
blanco obliga a tinta prusia encima, lo que dejaba al aviso como el único
relleno del sistema que leía en claro. Entre el ámbar elegido y el amarillo de
marca hay **4,81:1**: el de marca es casi cinco veces más claro, no se confunden.

**Lo que se ve distinto:**

- `Alert variant="warning"` y `toast.warning(...)`: eran amarillo con texto
  prusia, ahora son ámbar con texto blanco. Como consecuencia, las cuatro
  intenciones de `Alert`/`Toast` declaran ya `.surface-dark` en la raíz (antes
  `warning` era la excepción), así que enlaces, botones y el aspa que se
  compongan dentro toman su cara clara sin que el consumidor haga nada.
- `Tag variant="warning"`: mismo cambio, relleno ámbar con texto blanco.

El criterio queda escrito en Foundations › Colores § «Feedback», y la regla 8 del
`CLAUDE.md` menciona ya el cuarto rol.

### 2. `Avatar` gana `3xl` (128px) y `4xl` (192px)

Peldaños de marca, no medidas de `AvatarUpload`: **128 es el doble de `xl`**
(64) y **192 el doble de `2xl`** (96), y entre ellos hay el mismo salto de vez y
media que ya había de `xl` a `2xl`. Los dos siguen en el múltiplo de 8 y caen en
rem redondos (8rem, 12rem). Las iniciales suben un peldaño tipográfico por
talla, como en el resto de la escala.

### 3. `AvatarUpload` sale al doble

El mapa de tallas pasa de `sm→lg (48) · md→xl (64) · lg→2xl (96)` a
**`sm→2xl (96) · md→3xl (128) · lg→4xl (192)`**: cada contexto sale exactamente
al doble. En `/account` (contexto `md`) el retrato pasa de 64 a 128px, y en el
alta (contexto `lg`) de 96 a 192px. El icono del velo de arrastre sube con él
(`md`/`lg`/`xl`), porque sobre 192px el de 24px se perdía.

**La fila envuelve.** A 375px un retrato de 192px ya no cabe con el botón al
lado, así que el botón baja debajo del avatar: `flex-wrap: wrap`, sin media
query, así que también envuelve dentro de una columna estrecha de escritorio. Lo
que no cambia es que **no desborda**; el test de story que lo medía a 375px sigue
ahí, ahora comprobando que envuelve en vez de que quepa en una línea.

---

## Comprobado

`pnpm lint`, `npx tsc -b`, `pnpm test` (53 ficheros / 343 tests, antes 52/331),
`pnpm test:stories` (165 ficheros / 1366 tests) y `pnpm release:check` en verde,
con `dist/` regenerado y commiteado. Storybook del operador (6006) sin tocar.

**No se ha tocado `slxd`**: la adopción de `UptimeBars` en `apps/status` va
después del release, con el ejemplo de arriba.
