# Revisión de calidad — componentes sin consumidor en la suite, lote B

Rama `r2-huerfanas-b`, desde `main` (v28.0.0). Ninguno de estos componentes se retira:
los usa la app interna de 360. La vara de medir son `SelectField` (contrato de campo) y
`ConversationList`/`ChatShell` (criterio de familia, v28).

Verificado con `pnpm lint`, `npx tsc -b` y `pnpm test` (36 ficheros, 252 tests) en verde.
**`pnpm test:stories` no se ha podido ejecutar** (Chromium/Playwright no disponible en esta
red): las stories `Test — …` de estos componentes quedan sin correr en esta revisión.

## Tabla por componente

Criterios: **C** composición · **O** modo oscuro · **A** alineación (BEM, tokens, tallas,
props) · **X** accesibilidad · **Q** calidad (tests, story, MDX).

| Componente | C | O | A | X | Q |
| --- | --- | --- | --- | --- | --- |
| MenuButton | ✓ | arreglado (story) | arreglado (`line-shift`) | ✓ | ✓ |
| MessageBubble | ✓ | ✓ | ✓ | ✓ | ✓ |
| MultiSelect | ✓ | arreglado (story) | arreglado (7 tokens) | ✓ | arreglado (MDX) |
| NotificationButton | ✓ | arreglado (story) | ✓ | hallazgo · baja | ✓ |
| NumberInput | hallazgo · media | ✓ | arreglado (`btn-line-height`) | ✓ | arreglado (MDX) |
| OtpInput | ✓ | arreglado (story) | **arreglado (BEM + tokens)** | hallazgo · media | arreglado (MDX) |
| Radio | ✓ | ✓ | ✓ | ✓ | ✓ |
| SkipLink | ✓ | arreglado (story) | ✓ | ✓ | ✓ |
| StarRating | ✓ | ✓ | hallazgo · baja | ✓ | ✓ |
| Switcher | ✓ | hallazgo · baja | ✓ | ✓ | arreglado (MDX) |
| Text | ✓ | ✓ | ✓ | ✓ | ✓ |
| Textarea | ✓ | arreglado (story) | ✓ | ✓ | ✓ |
| TimeField | ✓ | ✓ | hallazgo · baja | ✓ | ✓ |
| TimeSelect | ✓ | ✓ | arreglado (3 tokens + import) | ✓ | arreglado (MDX) |
| ToggleGroup | ✓ | ✓ (sin color propio) | ✓ | ✓ | ✓ |
| TreeView | ✓ | ✓ | ✓ | hallazgo · baja | ✓ |
| TypingIndicator | ✓ | ✓ | arreglado (3 tokens) | ✓ | hallazgo · baja |

Además, dos hallazgos transversales al final (tokens globales que faltan y un icono
ausente del catálogo) y uno en un componente vecino (`OtpField`).

---

## Arreglado

Un commit por bloque de arreglo.

### `fix(otp-input)` — BEM propio y tokens en vez de selectores de atributo

Era el peor incumplimiento del lote. El CSS colgaba de `[data-otp-input]`, estilaba `.input`
por descendencia (acoplándose a la clase interna de otro átomo), usaba el primitivo global
`--spacing-2` y llevaba un `width: 3.5ch` a pelo. El TSX emitía además `data-size`,
`data-error` y `data-disabled` que **no leía nadie**.

Ahora: bloque `otp-input` con modificadores de talla/error/deshabilitado, elemento
`otp-input__cell` sobre cada `Input`, y `tokens/component/otp-input.json` con los dos valores
propios (`gap`, `cell-inline-size`), registrado en `sd.config.mjs` y en `src/tokens/index.css`.

> **Cambio de DOM público**: desaparecen los cuatro atributos `data-*`. No estaban
> documentados ni tenían CSS detrás, pero si algún consumidor los usaba como gancho, se le
> rompe. Lo señalo para que se decida el tipo de bump al consolidar el CHANGELOG.

### `fix(typing-indicator)` — el salto sale de tokens propios

El keyframe llevaba la opacidad alta (`1`) y la altura del salto (`-0.25rem`) a pelo, y la
curva la tomaba del primitivo global `--motion-easing-in-out`. Añadidos
`dot-opacity-active`, `dot-rise` y `animation-easing`.

### `fix(menu-button)` — tokeniza el recorrido y añade story oscura

Los `6px` del paso de barras a aspa pasan a `menu-button.line-shift`, con la explicación de
que el valor va en unidades del viewBox del icono. Tenía par oscuro pero ninguna story lo
enseñaba.

### `docs(stories)` — «En superficie oscura» en cuatro componentes

MultiSelect, NotificationButton, SkipLink y Textarea. La de Textarea **existía escondida**
(`tags: ['!dev']`, sin nombre) y envuelta a mano en un `Container surface="dark"`: pasa al
patrón del sistema, `parameters: { surface: 'dark' }`.

### `docs` — MDX de MultiSelect, NumberInput, Switcher y TimeSelect

Los cuatro se publican como entrada del paquete y no tenían página de doc. Se añaden también
los módulos de tokens que faltaban (`src/tokens/components/{multi-select,switcher,time-select}.ts`).

### `fix(time-select)` — quita `autodocs`

Con MDX propio y `tags: ['autodocs']` a la vez, Storybook falla al indexar
(«MultipleIndexingError»). Lo detectó `pnpm test`.

### `fix(number-input)` — `line-height` de los botones a token

Último literal del CSS del componente; apunta ahora a `line-height.none`.

### `fix(multi-select, time-select)` — los últimos literales y primitivos

MultiSelect: opacidad del deshabilitado y del aspa, tres `line-height: 1`, el peso de la
opción elegida y la curva del chevron. TimeSelect: familia e interlineado del separador «:»,
y **un `@import` del fichero de tokens desde el CSS del componente** que no hace ningún otro
componente del sistema (los tokens ya entran por `src/tokens/index.css`).

---

## Hallazgos (anotados, sin tocar)

### H1 · NumberInput dibuja los símbolos +/− con texto, no con iconos — **media**

`NumberInput.tsx` pone `−` (U+2212) y `+` como contenido de los botones, con
`btn-font-size` y `btn-line-height` para cuadrarlos. Todo el resto del sistema dibuja marcas
con `Icon`, del catálogo. La consecuencia práctica es que el trazo de los dos símbolos no
casa con el de ningún otro glifo de la interfaz y depende de la fuente.

No es arreglable de forma mecánica: **el catálogo tiene `plus` pero no `minus`**
(`src/stories/atoms/Icon/Icon.tsx`), y añadir un icono es tocar una pieza compartida, fuera
de este lote.

*Propuesta*: añadir `minus` al catálogo y sustituir los dos caracteres por
`<Icon name="minus" size="sm" />` / `<Icon name="plus" size="sm" />`, retirando entonces
`btn-font-size` y `btn-line-height`. Minor.

### H2 · OtpInput suelto se queda sin nombre accesible — **media**

El contenedor es `role="group"` y su nombre sale solo de `aria-label` / `aria-labelledby`. Si
no se pasa ninguno —el caso del control suelto, que es como lo enseñan casi todas sus
stories— el grupo queda **sin nombre**: el lector anuncia «grupo» a secas y luego seis celdas.
Dentro de `OtpField` no pasa, porque la etiqueta lo nombra.

*Propuesta*: prop `groupLabel?: string` con default castellano («Código de verificación»),
como `TreeView.label` o `StarRating.groupLabel`, y que `OtpField` la anule con su
`aria-labelledby`. Minor.

### H3 · NotificationButton no puede traducir su nombre con el contador dentro — **baja**

El default es `Notificaciones: ${count} sin leer`, pero la única prop es `label?: string`. Una
app multiidioma que la traduzca pierde el contador, o tiene que recomponer la frase en cada
render. La regla de CLAUDE.md § «Textos de componente» dice que **si el texto interpola un
valor, la prop es una función**.

*Propuesta*: `label?: string` para el caso sin contador y `countLabel?: (count: number) => string`
para el caso con él, como `StarRating.valueLabel`. Minor.

### H4 · Switcher: el track apagado no tiene par oscuro — **baja**

`switcher.track-bg` es `{color.border.default-on-light}` y no lleva `surface-dark-track-bg`.
Sobre `.surface-dark` el interruptor apagado se pinta con un gris pensado para fondo claro.
Se ve, pero no es el valor que la regla de derivación pide (un relleno de rol «borde» →
`color.text.on-dark`, o el gris `-on-dark` equivalente).

No lo he tocado porque cambia el aspecto del estado más frecuente del componente y eso es una
decisión de diseño, no un arreglo mecánico. *Propuesta*: añadir `surface-dark-track-bg` en
`tokens/component/switcher.json` y revisarlo en la story oscura, que ya existe. Patch.

### H5 · StarRating usa `className="visually-hidden"` a pelo — **baja**

En el radio de cada estrella: `className="star-rating__input visually-hidden"`. CLAUDE.md
§ «Accesibilidad — VisuallyHidden» reserva ese uso directo a `Label`. Aquí hay motivo (la
receta va sobre el propio `<input>`, y `VisuallyHidden` renderiza un `<span>` envolvente, que
rompería la relación `<label>`↔`<input>`), pero no está escrito en ninguna parte.

*Propuesta*: o documentar la excepción en CLAUDE.md junto a la de `Label`, o dar a
`VisuallyHidden` una prop `render` (Base UI) para aplicarla sobre un elemento existente. Patch.

### H6 · TreeView: le falta el teclado opcional del patrón — **baja**

Implementa el núcleo del patrón WAI-ARIA de tree view (roving tabindex, flechas, Inicio/Fin,
Intro/Espacio) y lo implementa bien. Le faltan dos teclas que el patrón lista como opcionales
y que en un árbol grande —la matriz de un curso— se notan: **salto por letra** (escribir una
letra lleva a la siguiente fila que empieza por ella) y **`*`** (abre todas las ramas hermanas
del nivel).

Segundo detalle: una fila `disabled` sale del recorrido por completo (`tabIndex={undefined}`,
sin `onKeyDown`). El patrón prefiere que siga siendo alcanzable y se anuncie como
deshabilitada, para que no desaparezca del árbol al navegar con teclado.

*Propuesta*: añadir typeahead y `*` reutilizando el mecanismo de `MultiSelect`
(`TYPEAHEAD_RESET_MS`), y dejar las filas deshabilitadas dentro de `alcanzables` pero sin
`elegir()`. Minor.

### H7 · TimeField no acepta `required` — **baja**

El contrato de campo que fija `SelectField` incluye `required`. `TimeField` lo omite, así que
un campo de hora obligatorio no puede marcarse como tal (ni visualmente en la etiqueta ni con
`aria-required`). `TimeSelect` tampoco lo reenvía a sus dos `Select`.

*Propuesta*: añadir `required?: boolean` a los dos y propagarlo. Minor.

### H8 · TypingIndicator: la story y el test son mínimos — **baja**

Una sola story y un solo `play`. No hay cobertura de lo que de verdad define al componente:
que con `prefers-reduced-motion: reduce` los puntos se quedan quietos y que el texto accesible
sigue anunciándose. Es justo el caso que la regla de movimiento reducido protege.

*Propuesta*: story `Test — con movimiento reducido` que compruebe `animation-name: none` y la
presencia del texto de `label`. Patch.

### H9 · Faltan dos escalones en la escala global de opacidad — **transversal**

`tokens/opacity/scale.json` solo tiene `overlay` (0.6) y `disabled` (0.4). Al tokenizar he
necesitado dos valores que no existen y he tenido que dejarlos como literales dentro del token
del componente, con nota:

- **`opacity.full` (1)** — el extremo alto de una transición. Usado en
  `typing-indicator.dot-opacity-active` y `multi-select.pill-remove-hover-opacity`.
- **un escalón intermedio (~0.7)** — «presente pero en segundo plano», el aspa de una píldora
  en reposo. Usado en `multi-select.pill-remove-opacity`.

No los he añadido porque son **tokens globales** y el protocolo de este encargo los deja
fuera. *Propuesta*: añadir `opacity.full: 1` y `opacity.secondary: 0.7` (o el nombre que la
escala prefiera) y repuntar los tres tokens de componente. Patch.

### H10 · Falta el icono `minus` en el catálogo — **transversal**

Ver H1. El catálogo tiene `plus` sin su pareja. Además de NumberInput, cualquier control de
cantidad futuro se topará con lo mismo.

### H11 · `OtpField` emite `data-size` sin CSS detrás — **vecino, no es de este lote**

`src/stories/molecules/OtpField/OtpField.tsx` pone `data-size={size}` en su contenedor y
`OtpField.css` no lo lee. Es el mismo resto que acabo de limpiar en `OtpInput`, un piso más
arriba. Lo dejo anotado porque `otp-field` no está en el lote B.
