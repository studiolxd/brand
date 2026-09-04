# Entrega — los tres contratos rojos del `test:stories`

Rama `stories-verdes`. **Sin release**: no se ha tocado `package.json#version`
ni `CHANGELOG.md`, y **`dist/` no se ha regenerado** (sigue correspondiendo a
v30.4.0). Quien publique tendrá que correr `pnpm release:check` —que regenera
`dist/`— antes del tag, como manda `CLAUDE.md`.

La puerta de stories vuelve a correr: el enlace del Chromium en la caché de
Playwright funciona, no ha hecho falta descargar nada.

Verde: `pnpm test:stories` (**161 ficheros, 1329 tests**, que es el dato que
nadie tenía desde que se cerró la puerta), `pnpm lint`, `npx tsc -b` y
`pnpm test` (49 ficheros, 305 tests — uno más de los 304 de antes, el que se
añade abajo).

## Resumen del diagnóstico

| Fallo | ¿Test o componente? | Desde |
| --- | --- | --- |
| `DateTimeField` › *Test — etiqueta, ayuda y error enlazados al control* | **test** desfasado | `e71988a`, 2026-09-02 |
| `DateTimeField` › *Con react-hook-form* | **test** desfasado (misma causa) | `e71988a`, 2026-09-02 |
| `NotificationButton` › *Test — nombre con el contador, badge volando, tope* | **test** desfasado **y** un fallo real de accesibilidad en el componente | `11a0d97`, 2026-09-02 (el test) · desde siempre (la accesibilidad) |

Los dos primeros comparten causa, fichero y arreglo, así que van en un solo
commit en vez de partir la misma edición en dos.

## 1 y 2 · `DateTimeField`: el `aria-invalid` del grupo

**El test.** Los dos contratos exigían `aria-invalid="true"` sobre el
`role="group"` que envuelve fecha y hora. Eso es justo lo que la ficha A15
—commit `e71988a`, «tanda de fichas bajas», 2026-09-02— quitó a propósito: el
atributo es de los widgets de entrada, en un grupo no está definido, no aporta
nada y confunde a una auditoría automática. El estado sí llega a los controles
de dentro por `error={hasError}`. El MDX del campo lo explica desde ese mismo
commit; las stories se quedaron atrás, y la puerta llevaba cerrada, así que
nadie lo vio.

**No se ha aflojado nada.** En vez de borrar la aserción, se ha invertido para
que fije la decisión: el grupo **no** lleva `aria-invalid`, y sí lo llevan los
tres widgets de dentro —disparador de fecha, desplegable de horas y desplegable
de minutos—. El contrato pasa de comprobar un atributo en el sitio equivocado a
comprobar los tres sitios donde el estado tiene que llegar de verdad; el de
minutos no lo miraba nadie hasta ahora.

## 3 · `NotificationButton`: el componente, y además el test

Aquí hay dos cosas, y la que importa es la primera.

### El fallo de accesibilidad (componente)

La campana pone el contador en el nombre del botón («Notificaciones: 3 sin
leer») y marca el badge visible como decorativo, para que el lector de pantalla
no diga la cifra dos veces. Eso es lo que dice el MDX desde el primer día y lo
que el TSX intenta hacer:

```tsx
<NumberBadge count={count} … aria-hidden="true" />
```

**Solo que no lo hacía.** `NumberBadgeProps` no declara `aria-hidden`, y TypeScript
no lo caza porque **los atributos JSX con guion no se comprueban**: la prop
llegaba y se caía sin ruido ni error de tipos. El badge acababa en el DOM sin
`aria-hidden` y **con su propio `aria-label`** (`aria-label="99+"` en el volcado
del fallo), es decir, expuesto por segunda vez. Es la campana que llevan las
ocho apps de la suite, y el mismo agujero afecta al disparador del
`FloatingDock`, que pasa exactamente el mismo `aria-hidden="true"`.

Arreglado en el átomo, que es donde estaba el fallo: `NumberBadge` declara y
propaga `aria-hidden` y, cuando es decorativo, no emite ni `aria-label` ni
`aria-atomic` —un elemento oculto al árbol de accesibilidad no necesita
nombre—. `Steps` (que lo envuelve en un `<span aria-hidden>`) y `UserMenu` (que
le da un `aria-label` explícito, deliberado) no cambian.

Con test unitario nuevo en `NotificationButton.test.tsx` y una línea en el MDX
del átomo que dice cuándo toca pasarlo.

### El contrato desfasado (test)

Aparte, el contrato pasaba `label="Avisos"` **con contador** y esperaba ese
nombre. El commit `11a0d97` (2026-09-02) desdobló el nombre a propósito, siguiendo
la regla de `CLAUDE.md` § «Textos de componente»: `label` para el caso sin
contador y `countLabel(count)` para el caso con él —«Cambio de contrato menor»,
dice su propio mensaje—. El test se quedó en el comportamiento viejo.

Puesto al día pasando las dos props, que además es lo que hace una app
multiidioma de verdad; y **subiendo** la exigencia con las dos aserciones que
cazan el fallo de arriba: el badge lleva `aria-hidden="true"` y no lleva
`aria-label`.

## Commits

- `92f059b` — `test(date-time-field): el contrato mira el aria-invalid donde ahora vive`
- `8a4091c` — `fix(number-badge, notification-button): el contador decorativo se deja de leer dos veces`
