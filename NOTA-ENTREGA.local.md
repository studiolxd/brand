# Nota de entrega — el campo de fecha se escribe, se borra y navega por años

Rama `campo-fecha`, commits `a7f0647` y `HEAD`. `pnpm release:check` en verde (lint · tsc ·
test · build:all · `dist/` en sync). `test:stories` no se ha corrido: el brief lo
deja al operador.

## 1. `DatePicker`: un campo, no un botón

El disparador era un `<button>` que pintaba «vie, 25 sept 2026». Ahora es el
`Input` del sistema, editable.

- **Formato numérico del locale.** `25/09/2026` en `es`, `09/25/2026` en `en-US`,
  `25.09.2026` en `de`. El orden de las tres partes y el separador salen de
  `Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year:
  'numeric' }).formatToParts()`, no de una tabla por idioma. Vive en
  `src/stories/molecules/DatePicker/dateMask.ts`, con sus tests unitarios.
- **Las cifras se escriben en ASCII**, aunque el locale prefiera otros dígitos
  (árabe, devanagari): lo que se pinta tiene que poder volver a teclearse, y un
  teclado corriente escribe ASCII. Por eso el texto se compone a mano con el
  orden y el separador de `Intl`, en vez de usar su `format()` tal cual.
- **Qué sube y qué no.** Fecha completa y existente → `onChange(date)`, con o sin
  ceros por delante (`5/9/2026` vale). Incompleta o imposible (`25/09`,
  `31/02/2026`, letras) → nada sube, el campo queda en `aria-invalid` y aparece
  `invalidMessage` en un `role="alert"` enlazado por `aria-describedby`. **El año
  va entero**: `26` no se convierte en 2026 — adivinar el siglo cambia la fecha
  sin avisar.
- **Se borra**: vaciar el campo emite `onChange(null)`. La firma pasa a
  `(date: Date | null) => void` (breaking, en el CHANGELOG). `DateTimeField`
  propaga el borrado: una hora sin día no es nada.
- **El calendario** lo abre un botón de icono al final del campo —adorno dentro
  del borde, el patrón que ya usa `SearchForm` con su flecha— o la **flecha
  abajo** desde el campo. `Escape` cierra. Al elegir un día se cierra, la fecha
  queda escrita y el foco vuelve al campo.
- `readOnly` deja el campo enfocable y a la vista pero no abre el panel, y saca
  el botón del recorrido (una parada de tabulador que no hace nada es una
  trampa). `disabled` como antes.

### Decisiones que conviene mirar

- **El texto es estado del componente, sincronizado con `value` por su texto, no
  por identidad de `Date`.** Un padre que reconstruye el objeto en cada render
  habría borrado lo que se está tecleando. Se hace con el ajuste de estado
  durante el render (el patrón de React para derivar de una prop), no con un
  efecto: `react-hooks/set-state-in-effect` prohíbe lo segundo y tiene razón.
- **Icono nuevo `calendar`** en el catálogo de `Icon` (no había ninguno que
  sirviera). Retícula de 24, trazo 1, esquinas rectas como el resto del sistema.
- **El panel se ancla al botón, con `align="end"`.** El hueco del botón es
  cuadrado a la altura del campo, así que su borde inferior coincide con el del
  campo y el panel sigue colgando de la línea del control.

## 2. `Calendar`: el título lleva al año

- El título del mes es un botón dentro del `<h2>` —la región `aria-live` sigue
  siendo el `<h2>`, que no se sustituye— con `aria-expanded`.
- Al pulsarlo: **doce años, tres filas de cuatro**. Las mismas flechas navegan de
  docena en docena y cambian de nombre según la vista («Años anteriores» /
  «Años siguientes», props `previousYearsLabel` / `nextYearsLabel`). La rejilla
  tiene su propio nombre (`yearGridLabel`, «Elegir año»).
- **Foco**: al entrar cae en el año vivo; al elegir uno se vuelve al mes en ese
  año y el foco regresa al título, que es desde donde se salió. `Escape` vuelve
  sin elegir.
- Teclado de la rejilla de años: flechas (±1 año, ±4 = una fila),
  Inicio/Fin (extremos de la docena), RePág/AvPág (docena entera).
- `minDate`/`maxDate` desactivan años sueltos y las flechas de la docena.
- **Sin paso intermedio de meses, y es deliberado**: la cabecera ya recorre los
  meses de uno en uno, así que lo que falta cuando el destino está lejos —una
  fecha de nacimiento, un vencimiento a tres años— es el año, no el mes. Una
  rejilla de meses en medio añadiría un clic a **todos** los viajes para ahorrar
  once flechazos en algunos. Justificado también en `Calendar.mdx`.

## 3. Las flechas ya no se subrayan

`.calendar__nav:hover` ya no pinta la línea de tinta: son un glifo, y la línea
del sistema subraya texto. Lo que las señala sigue siendo el anillo de foco; la
tinta no cambia (no hacía falta token nuevo). Los días la conservan, y ahora
también el título y los años. La descripción del token `calendar.hover-line-width`
se ha reescrito para que ya no hable de las flechas.

## Reglas del repo

- Sin colores nuevos: todo token nuevo (`calendar.year-*`,
  `calendar.title-button-*`, `date-picker.button-*`, `date-picker.message-*`) es
  una referencia a uno que ya existía.
- Sin `text-decoration: underline`: la línea sigue siendo `box-shadow`.
- Ejes lógicos, BEM con doble clase en los modificadores, textos de componente en
  props con default castellano (`invalidMessage`, `openCalendarLabel`,
  `maskLetters`, `previousYearsLabel`, `nextYearsLabel`, `yearGridLabel`), tabla
  de Fundamentos › Internacionalización actualizada.

## Lo que rompe a los consumidores

Está detallado en el CHANGELOG bajo «Sin publicar», pero el resumen para quien
haga el bump:

1. `onChange` de `DatePicker` deja de ser `(date: Date) => void`.
2. El `ref` de `DatePicker` / `DatePickerField` / `DateTimeField` pasa de
   `HTMLButtonElement` a `HTMLInputElement`, y el `onBlur` con él.
3. Desaparece `.date-picker__trigger` y sus tokens de campo
   (`--date-picker-height`, `-font-size`, `-bg`, `-border-*`, `-focus-*`,
   `-error-*`, `-disabled-*`): el control es el `Input` y se viste con
   `--input-*`. El `className` va ahora al contenedor, no al control.

Es un **major**. No se ha tocado `package.json#version` ni se ha taggeado, como
pedía el brief.

## Fuera de alcance, apuntado

- `CalendarPlanner` conserva su línea de tinta en las flechas
  (`.calendar-planner__nav:hover`). El brief hablaba solo de `.calendar__nav`; si
  la regla es del sistema y no de este componente, toca el mismo cambio ahí y en
  `CalendarRoster` si aplica.
- **Visto en Storybook** (instancia propia del worktree en el 6007, ya apagada):
  campo con el glifo dentro del borde, panel colgando de la línea del control,
  rejilla de años, error de fecha a medias y superficie oscura. De ahí salió el
  único arreglo posterior: la vista de años encogía el panel unos 70 px —cuatro
  columnas de año miden menos que siete de día—, así que la rejilla lleva ahora
  un ancho mínimo igual al de la semana, por token y por talla. El
  `localhost:6006` que hay en marcha sirve otro checkout, no este worktree.
- Tests: 22 nuevos (Vitest) — 6 unitarios del formato/parseo, 10 del `DatePicker`
  en jsdom y 6 de la vista de años del `Calendar`—, más las stories de prueba
  (`Test — …`) que corren en `test:stories`.
