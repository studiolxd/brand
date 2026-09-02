# Revisión de calidad — componentes sin consumidor en la suite, lote A

Rama `r1-huerfanas-a`, desde `main` (v28.0.0). **Ningún componente se retira**: los usa la app interna de 360.

Vara de medir: `SelectField` (contrato de campo) y `ConversationList` / `ChatShell` (criterio de familia, v28). Criterios revisados en orden: composición, modo oscuro, alineación (BEM / tokens / tallas / props), accesibilidad y calidad (tests, story, MDX).

## Veredicto por componente

Leyenda: ✓ cumple · **arreglado** en esta rama · **hallazgo** anotado abajo, sin tocar.

| Componente | Composición | Oscuro | Alineación | Accesibilidad | Calidad |
| --- | --- | --- | --- | --- | --- |
| `AnnotationThread` | ✓ | ✓ | hallazgo (A1) | ✓ | ✓ |
| `AsyncSelect` | ✓ | arreglado | arreglado | hallazgo (A2, A3) | ✓ |
| `AsyncSelectField` | ✓ | arreglado | arreglado · hallazgo (A4) | ✓ | ✓ |
| `AsyncMultiSelect` | ✓ | arreglado | arreglado · **hallazgo (A5)** | hallazgo (A3) | ✓ |
| `AsyncMultiSelectField` | ✓ | arreglado | arreglado | ✓ | ✓ |
| `Calendar` | ✓ | ✓ | ✓ | ✓ | hallazgo (A6) |
| `CalendarPlanner` | ✓ | ✓ | arreglado | arreglado · hallazgo (A7) | hallazgo (A8) |
| `CalendarRoster` | ✓ | ✓ | ✓ | arreglado · hallazgo (A9) | hallazgo (A10) |
| `Code` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `CopyButton` | ✓ | ✓ | hallazgo (A11) | ✓ | ✓ |
| `DatePicker` | ✓ | ✓ | hallazgo (A12) | ✓ | arreglado · hallazgo (A13) |
| `DateTimeField` | ✓ | ✓ | hallazgo (A14) | hallazgo (A15) | ✓ |
| `DocsSearch` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `DotsButton` | ✓ | arreglado | ✓ | ✓ | ✓ |
| `DropdownField` | ✓ | arreglado | arreglado | ✓ | ✓ |
| `ErrorBoundary` | ✓ | n/a | ✓ | n/a | ✓ |
| `FileUpload` | **hallazgo (A16, A17)** | ✓ | arreglado | ✓ | ✓ |
| `InputPhone` | hallazgo (A18) | arreglado | arreglado | ✓ | arreglado |

`ErrorBoundary` no pinta nada por sí mismo (sin CSS, sin tokens, sin DOM propio): modo oscuro y accesibilidad no le aplican, y por eso tampoco se le añade story «En superficie oscura».

## Lo arreglado en esta rama

Un commit por asunto, ninguno cambia el píxel pintado salvo donde se dice:

1. `docs(stories)` — historias **«En superficie oscura»** que faltaban: `AsyncSelect`, `AsyncMultiSelect`, `AsyncSelectField`, `AsyncMultiSelectField`, `DotsButton`, `InputPhone`, `DropdownField`. Sus tokens ya tenían par oscuro; lo que faltaba era enseñarlo en el catálogo.
2. `fix(a11y,i18n)` — `CalendarPlanner` pasa «+N más» a `moreLabel(count)` (era el único texto del lote cableado en castellano dentro del componente); `AsyncSelectField` / `AsyncMultiSelectField` reenvían `loadingLabel`, `clearLabel` y `container` al átomo (su MDX ya los daba por props del campo, pero se quedaban en el camino); la leyenda de `CalendarRoster` pasa a `role="group"` para que su `aria-label` deje de ser inerte; tabla de `Internacionalizacion.mdx` al día.
3. `refactor(tokens)` — cero primitivos y cero literales en el CSS del lote: `--opacity-disabled`, `--font-weight-default`, `--spacing-2`, `--motion-easing-default` y cinco `cursor: not-allowed` pasan a tokens propios que heredan del token de control que ya les correspondía (`dropdown-field.disabled-opacity` / `.disabled-cursor` / `.icon-transition-easing`, `file-upload.subtext-font-weight` / `.disabled-cursor`, `input-phone.country-item-padding-block` / `.country-icon-transition-easing`, `async-select.disabled-cursor`, `async-multi-select.disabled-cursor`). Incluye el `build:tokens`.
4. `docs(date-picker)` — MDX propio; era de los pocos componentes que se documentaba con `autodocs`, es decir, con una tabla de props y nada más.
5. `fix(calendar-planner)` — fuera el `aria-label` del número de día: en un `span` sin rol el atributo se ignora y repetía el número visible.
6. `fix(exports)` — `InputPhoneProps` faltaba en `src/index.ts`.

Verificación: `pnpm lint` y `pnpm test` (36 ficheros, 252 tests) en verde después de cada commit. `pnpm test:stories` no se puede correr en esta red.

## Lo que sí está bien y conviene no tocar

- **Modo oscuro, cobertura completa.** Los 470 tokens que usa el CSS del lote están definidos, y de los que pintan color solo seis no tienen par oscuro: `calendar.day-bg` y `calendar-planner.cell-bg` (son `transparent`), `code.bg` / `code.color` (par autocontenido heredado de `CodeBlock`) y `docs-search.result-mark-bg` / `-color` (relleno amarillo autocontenido). Los tres casos están declarados en el JSON con su porqué: es la regla de «un relleno autocontenido no lleva par oscuro», no un olvido.
- **BEM puro.** Ni un `data-slot` ni un `data-state` en las 17 hojas de estilo; los estados vienen de los atributos de Base UI (`[data-popup-open]`, `[data-highlighted]`) o de modificadores de doble clase.
- **Ejes lógicos.** Ni una `padding`/`margin` shorthand de dos valores; todo `padding-block` + `padding-inline`.
- **Registro.** Los 18 componentes están en `scripts/entry-points.mjs`, en `package.json#exports` y en `src/index.ts` (el único hueco era el tipo de `InputPhone`, ya cerrado).
- `Calendar` y `CalendarPlanner` comparten de verdad el motor de rejilla (`molecules/_shared/calendarGrid`): navegación por flechas, Inicio/Fin, RePág/AvPág y una sola parada de tabulador, según el patrón WAI-ARIA de rejilla. `CalendarRoster` no es una rejilla interactiva sino una tabla de datos, y hace bien en no serlo.
- `DocsSearch` deja claro en su propia doc que **no busca nada** (el índice es del producto) y monta el `Autocomplete` de Base UI con `filter={null}`: es el tipo de límite que evita que la molécula se convierta en un buscador a medias.

---

## Fichas

### A1 · `AnnotationThread`: restos de código en dos idiomas y ganchos muertos — **baja**

El componente interno se llama `Anotacion` y sus variables son `esRaiz`, `resuelto`, `fecha`, `legible`, mientras el resto del repo escribe los nombres técnicos en inglés. Además: `border: var(--…-border-width) solid var(--…-border-color)` cablea `solid` en vez de usar un token `border-style` como los hermanos; `data-status={status}` duplica lo que ya dice el modificador `--resolved` y ningún CSS lo lee; y las clases `annotation-thread__item--root` y `annotation-thread__reply` se emiten sin ninguna regla detrás.

**Propuesta:** renombrar el helper a `Annotation` con props en inglés, añadir `annotation-thread.border-style`, y decidir si `data-status` es contrato público (documentarlo) o sobra (quitarlo). Nada de esto cambia la cara del componente.

### A2 · `AsyncSelect` / `AsyncMultiSelect`: el rebote es un número mágico y no se limpia al desmontar — **media**

Los 300 ms del `setTimeout` están cableados en el cuerpo del componente, sin prop ni constante nombrada, y el `debounceRef` no se cancela en un efecto de limpieza: si el control se desmonta con una búsqueda en vuelo, el `setState` del `finally` cae sobre un componente muerto. Con `onSearch` haciendo `fetch` real —que es para lo que existe el componente— tampoco hay cancelación de la respuesta tardía: dos búsquedas seguidas pueden resolverse fuera de orden y pintar los resultados de la primera.

**Propuesta:** `debounceMs?: number` (default 300) y un `useEffect` de limpieza; para el fuera de orden, un contador de petición que descarte toda respuesta que no sea la última. Es el mismo patrón que `DocsSearch` delega en el consumidor, pero aquí el componente sí posee la búsqueda, así que le toca a él.

**~~Resuelto~~** (`s1-fichas-a`): implementada tal cual en los dos átomos —`debounceMs` (default 300), `requestRef` que descarta toda respuesta que no sea la última y limpieza al desmontar— y reenviada desde `AsyncSelectField` / `AsyncMultiSelectField`. `AsyncSelect.test.tsx` cubre los tres casos (fuera de orden, rebote, desmontaje).

### A3 · `AsyncSelect` / `AsyncMultiSelect`: botones de limpiar y de quitar fuera del tabulador — **baja**

El aspa de `AsyncSelect` y las de las píldoras de `AsyncMultiSelect` llevan `tabIndex={-1}` y responden a `onMouseDown`: con teclado no se llega a ellas. En `AsyncMultiSelect` hay salida (Retroceso quita el último valor, que es el patrón de combobox con píldoras); en `AsyncSelect` no hay ninguna: quien navega con teclado no puede vaciar la selección. El `aria-label` de esos botones es, mientras tanto, peso muerto.

**Propuesta:** o se documenta el gesto de teclado equivalente y se marcan los botones `aria-hidden` (son atajos de ratón), o entran al tabulador. Lo que no puede quedarse es la mezcla: un botón con nombre accesible al que ningún lector puede llegar. Falta también `aria-autocomplete="list"` en el `role="combobox"` de los dos.

### A4 · `AsyncSelectField`: no expone `required` — **baja**

`SelectField` lo pasa al control, `AsyncSelectField` no. Como el átomo tampoco lo acepta, el campo asíncrono no puede marcarse obligatorio en el DOM.

**Propuesta:** `required?: boolean` en el átomo (al `<input>` de búsqueda y al hidden) y reenviado desde el campo.

### A5 · `AsyncMultiSelect`: en modo no controlado el control se ve vacío — **alta**

Las píldoras se pintan **solo** desde la prop `selectedOptions`, que por defecto es `[]`; el estado interno (`defaultValue` → `internalValues`) no las alimenta. Y como el placeholder se oculta en cuanto `currentValues.length > 0`, un `<AsyncMultiSelect defaultValue={['1']} />` sin `selectedOptions` se pinta **completamente vacío**: ni píldoras ni pista, aunque el `name` sí manda el valor. Su hermano `AsyncSelect` no tiene el problema porque guarda `internalSelectedOption` al elegir.

**Propuesta:** guardar en estado interno las opciones elegidas (las que pasan por `toggleValue` vienen de `results`, así que se conocen enteras) y usarlas como respaldo cuando no hay `selectedOptions`. Para los valores de `defaultValue` que nunca se han buscado no hay etiqueta posible: ahí, o se documenta que `defaultValue` exige `selectedOptions`, o se quita `defaultValue` del API. Lo que hoy tiene es un modo no controlado que se ve roto.

**~~Resuelto~~** (`s1-fichas-a`): las pills se pintan desde `currentValues`, no desde `selectedOptions`; el componente recuerda en `knownOptions` las opciones que pasan por `toggleValue` y las usa de respaldo. `defaultValue` **se queda** —es el patrón de la familia (`MultiSelect`, `FileUpload`, `OtpInput`)— y un valor sin etiqueta conocida pinta el valor crudo: se ve lo que el formulario va a enviar, en vez de nada. Story «No controlado», MDX § Valores reescrito y `AsyncMultiSelect.test.tsx` con cinco casos.

### A6 · `Calendar` / `CalendarPlanner`: el `id` del título no es único — **baja**

`calendar-title-${año}-${mes}` y `planner-title-${año}-${mes}` se construyen a mano. Dos calendarios del mismo mes en una página —el caso normal de un rango «desde / hasta»— generan `id` duplicados, y el `aria-labelledby` de la segunda rejilla apunta al título de la primera.

**Propuesta:** prefijar con `useId()`, como hacen los campos del sistema.

### A7 · `CalendarPlanner`: la celda no dice de qué fecha se habla — **media**

`Calendar` da a cada día un nombre accesible con la fecha entera (`aria-label={dayFormatter.format(date)}`). En `CalendarPlanner`, cuando la celda es enfocable (`onDayClick`), lo único que se lee es el número suelto y los rótulos de los eventos. El `aria-label` que había sobre el `span` no lo resolvía —se ignoraba— y ya está retirado.

**Propuesta:** no se puede poner `aria-label` en el `gridcell` sin ocultar los eventos que contiene. Lo correcto es que el número lleve la fecha larga para el lector y el dígito para la vista: `<span class="…__day-number"><VisuallyHidden>{fechaLarga}</VisuallyHidden><span aria-hidden>{dia}</span></span>`. Es reordenar el contenido de la celda, no un atributo, y por eso queda anotado.

**~~Resuelto~~** (`s1-fichas-a`): tal cual, con el `dayFormatter` del `Calendar` (`Intl`, por `locale`). Cubierto en `CalendarPlanner.test.tsx` y anotado en el MDX.

### A8 · `CalendarPlanner`: el modal de «+N más» no se puede suprimir — **media**

El botón de desbordamiento abre **siempre** un `Modal` interno con la lista de eventos, y además llama a `onMoreClick`. Un consumidor que pasa `onMoreClick` para abrir su propio panel se encuentra con dos cosas abiertas a la vez, y no tiene forma de apagar la de dentro.

**Propuesta:** que el modal interno sea el comportamiento por defecto **solo** cuando no hay `onMoreClick`, o una prop explícita (`showMoreDialog?: boolean`). Hay precedente en el propio componente: `renderDay` ya sustituye el renderizado por defecto en vez de sumarse a él.

**~~Resuelto~~** (`s1-fichas-a`): las dos cosas, que no se estorban. El default es `showMoreDialog ?? !onMoreClick` —con `onMoreClick` el componente se aparta, como `renderDay`— y la prop explícita permite las dos (`true`) o ninguna (`false`). Tres casos en `CalendarPlanner.test.tsx`.

### A9 · `CalendarRoster`: la columna de nombres es `<td>`, no `<th scope="row">` — **media**

La tabla declara bien sus cabeceras de columna (`<th scope="col">` por día), pero la celda del empleado es un `<td>` con `title`. En una tabla de 31 columnas, sin cabecera de fila un lector de pantalla anuncia el contenido de cada celda con el día pero sin decir de quién es el turno.

**Propuesta:** `<th scope="row" class="calendar-roster__th-name-row">`, revisando de paso el CSS (un `th` trae peso y centrado propios del agente de usuario). No es un cambio de un atributo: toca marcado y estilos, y por eso no se hace aquí.

**~~Resuelto~~** (`s1-fichas-a`): tal cual, con `text-align: start` y un token nuevo `calendar-roster.td-name-font-weight` para deshacer la negrita del agente de usuario. Los tokens siguen llamándose `td-name-*`: renombrarlos sería breaking para quien los pise, y la clase BEM (interna, no expuesta) sí pasa a `__th-name-row`. Test en `CalendarRoster.test.tsx`.

### A10 · `CalendarRoster`: el emoji del cumpleaños va cableado — **baja**

`{cell.type === 'birthday' ? \`🎂 ${cell.label}\` : cell.label}` inyecta contenido visible que el consumidor no pidió ni puede quitar, y que además se lee en voz alta («tarta de cumpleaños»). Es el único adorno de este tipo en el lote.

**Propuesta:** que el emoji viaje en la etiqueta del dato, o una prop `birthdayPrefix?: string` con default `'🎂 '` y la posibilidad de vaciarla.

### A11 · `CopyButton`: no reenvía `ref` — **baja**

Es la única molécula del lote que no es `forwardRef`. Como devuelve un fragmento (el botón más la región viva), reenviarlo pide decidir a qué elemento va; la respuesta obvia es el `<button>`.

**Propuesta:** `forwardRef<HTMLButtonElement>` al botón, como `DotsButton`.

### A12 · `DatePicker`: sin tokens propios — **media**

El disparador viste enteramente con `--input-*` (altura, aire, familia, borde, foco, deshabilitado, error). Es coherente de cara —un campo de fecha y uno de texto deben parecer el mismo— pero deja al consumidor sin ningún punto de personalización: retocar el disparador de fecha obliga a mover todos los campos de texto de la aplicación. El resto del lote sí tiene su familia (`async-select.*` hereda de `select.*`, `dropdown-field.*` hereda de `select.*`).

**Propuesta:** `tokens/molecule/date-picker.json` con la capa de indirección (`date-picker.height → {input.height}`, etc.) y el CSS apuntando a ella. Cambio mecánico pero ancho (14 tokens), y toca la cara de un componente que hoy está bien: mejor decidirlo aparte.

**~~Resuelto~~** (`s1-fichas-a`): `tokens/molecule/date-picker.json` con 34 tokens, todos apuntando al `input.*` que ya usaban —el pintado no cambia—, registrados en `sd.config.mjs` (CSS + SCSS) y en `src/tokens/index.css`. El único que no hereda es `cursor` (`pointer`: el disparador abre un calendario). No hace falta ningún `surface-dark-*`: `surface-dark-derived.css` los vuelve a declarar solo. Tabla de tokens en el MDX.

### A13 · `DatePicker`, `CalendarPlanner`, `CalendarRoster`, `FileUpload`, `InputPhone`, `Code`, `DotsButton`…: la cobertura viva en stories, no en tests — **baja**

Solo cuatro componentes del lote tienen `.test.tsx` (`AnnotationThread`, `Calendar`, `CopyButton`, `DocsSearch`). El resto se prueba con stories `Test — …`, que es el patrón declarado del repo y cuentan como test… pero `pnpm test:stories` necesita Chromium y no siempre está disponible (en esta red, no). En la práctica, `pnpm test` no ejecuta nada de 14 de los 18 componentes.

**Propuesta:** ninguna acción inmediata —el patrón es deliberado—, pero conviene tenerlo presente al leer el verde de `pnpm test`: para estos componentes no dice nada.

### A14 · `DateTimeField`: alcanza el CSS de otro componente — **baja**

`.date-time-field__controls .date-picker__trigger { flex: 1 }` estila desde fuera una clase que pertenece a `DatePicker`. Funciona, pero es exactamente el acoplamiento que el DS evita al no exponer las clases BEM como contrato: cualquier renombrado dentro de `DatePicker` rompe el reparto de anchos aquí sin que nada avise.

**Propuesta:** que `DatePicker` acepte el estiramiento por token o por clase propia (`--date-picker-flex`, o `className` desde el campo), en la misma línea que A12.

### A15 · `DateTimeField`: `aria-invalid` sobre un `role="group"` — **baja**

El atributo se aplica al contenedor del grupo, donde no está definido: `aria-invalid` es de widgets de entrada. El estado sí llega bien a los dos controles de dentro (`error={hasError}`), así que el atributo del grupo no aporta nada y puede confundir a una auditoría automática.

**Propuesta:** quitarlo del `div` y dejarlo donde ya está, en los controles.

### A16 · `FileUpload`: tres SVG en línea en vez del átomo `Icon` — **media**

El componente dibuja a mano el icono de subida de la zona de arrastre, el de archivo genérico de cada fila y el aspa de eliminar, con `stroke-width` y `viewBox` propios. El sistema tiene `Icon` con catálogo cerrado, y dos de los tres ya están en él (`file-text`, `close`); del tercero —una flecha de subida— no hay equivalente.

**Propuesta:** sustituir los dos que existen por `<Icon name="file-text" />` y `<Icon name="close" />`, y **añadir `upload` al catálogo de `Icon`**. Lo segundo toca un componente global fuera de este lote, así que va entero como hallazgo en vez de arreglarse aquí.

**~~Resuelto~~** (`s1-fichas-a`): los tres SVG fuera. `upload` ya estaba en el catálogo (transversal H10, en `main`). El icono de la zona mide con la talla del propio `Icon` (`sm`/`md`/`lg` según la del control), así que los tokens `icon-size` / `sm-icon-size` / `lg-icon-size` se retiran: apuntaban a `icon.size-*`, es decir, decían dos veces lo mismo. El de archivo genérico pasa de 20 px a los 16 del `Icon sm`; el aspa se queda en 16.

### A17 · `FileUpload`: barra de progreso propia, existiendo `ProgressBar` — **media**

`file-upload__progress` monta su propio `role="progressbar"` con `aria-valuenow/min/max`, su token de relleno y su transición, duplicando el átomo `ProgressBar`, que ya tiene variantes, tallas, `label` traducible y sus propios tests.

**Propuesta:** `<ProgressBar value={progress} label={progressLabel} size="sm" />` y retirar los seis tokens `file-upload.progress-*`. Es la clase de duplicación que el criterio de familia (v28) buscaba: dos barras de progreso en el mismo paquete envejecen distinto.

**~~Resuelto~~** (`s1-fichas-a`): tal cual. De los tokens propios solo sobrevive `progress-margin-block-start` (el aire que separa la barra de la lista); se van los seis de la barra y sus dos pares oscuros. `FileUpload.test.tsx` comprueba que la barra es la del átomo (`aria-valuetext`, que la propia no tenía) y que ya no queda ningún `svg` fuera de `Icon`.

### A18 · `InputPhone`: dos dependencias externas y un glifo cableado — **media**

Es el único componente del lote que depende de terceros: `react-phone-number-input` (que impone su propio árbol DOM, obliga al `inputComponent` con doble `ref` y trae su CSS implícito) y `libphonenumber-js` (una tabla de metadatos de todos los países, de peso nada despreciable en el bundle del consumidor). Encima, el estado «internacional» del selector se dibuja con el carácter `'🌐'` cableado, que ni es un `Icon` ni es una prop de texto.

**Propuesta:** no es urgente y funciona, pero conviene decidirlo antes de que más consumidores lo pineen: (a) medir qué añade `libphonenumber-js` al bundle y si conviene el build `min` de metadatos; (b) sacar el glifo a una prop o al catálogo de `Icon`. La sustitución de la librería sería un breaking y no se propone.

**~~Resuelto~~** (`s1-fichas-a`): (a) medido — las dos librerías sirven **ya por defecto** el build `min` (metadata.min.json: 84 KB en crudo, ~20 KB con gzip; el `max` pesa el doble). No hay a qué bajarse, así que la dependencia se cierra como **excepción declarada** y el porqué queda escrito en el MDX (§ «La excepción de las dependencias»): la tabla de planes de numeración de todos los países no es «poco código propio», es mantenimiento perpetuo. Lo que sí se ha quitado es una de las dos importaciones: `getCountryCallingCode` se toma de `react-phone-number-input`, que lo reexporta atado a sus mismos metadatos — una sola tabla de países, no dos. (b) el glifo pasa a `internationalLabel` (default `'🌐'`), reenviada desde `InputPhoneField` y anotada en `Internacionalizacion.mdx`.

Queda **fuera**, para un commit con `pnpm install` de por medio: `libphonenumber-js` ya no se importa en `src/`, así que podría salir de `dependencies` (`react-phone-number-input` lo arrastra igual). No se toca aquí para no mover el lockfile.

## Resumen de severidades

| Severidad | Fichas |
| --- | --- |
| Alta | A5 |
| Media | A2, A7, A8, A9, A12, A16, A17, A18 |
| Baja | A1, A3, A4, A6, A10, A11, A13, A14, A15 |
