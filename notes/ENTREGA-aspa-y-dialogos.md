# Entrega — el aspa unificada y los diálogos en móvil

Rama `aspa-y-dialogos`. **Sin tag ni bump de versión**: publicada sigue siendo
la v30.7.0. La entrada del CHANGELOG está escrita bajo «Sin publicar» — al
taggear basta renombrar ese encabezado a la versión que toque. Es **minor**:
átomo nuevo, props nuevas, tokens nuevos, talla nueva; **ningún token
desaparece y ninguna prop cambia de significado**.

`pnpm lint`, `npx tsc -b`, `pnpm test` (52 ficheros / 332 tests),
`pnpm test:stories` (**164 ficheros / 1356 tests**, eran 163/1346) y
`pnpm release:check` en verde. Revisado a 375 y a 1280, en claro y en oscuro,
en un Storybook levantado en el **6007** y apagado al terminar — el 6006 del
operador no se ha tocado.

---

## 1. El aspa: `CloseButton`

### La forma que se ha elegido, y por qué

Un **átomo propio**, `Atoms/CloseButton`, export
`@studiolxd/brand/close-button`, con su juego de tokens `close-button.*`.

No es una variante del `Button` porque un aspa no es un botón de acción: no
tiene rótulo, no tiene relleno, no tiene tallas con inset horizontal y —lo que
motivó el encargo— **no marca el paso del puntero**. `ghost` revela un fondo en
hover, que es exactamente lo correcto para un botón casi invisible en reposo y
exactamente lo que sobra en un aspa que ya está en la tinta de la superficie.
Meter en `Button` una variante que desactiva el lenguaje del `Button` es
ensuciar la pieza que define ese lenguaje.

En cambio encaja de lleno en una familia que el repo ya tiene: los
iconos-botón con cara propia y tokens propios, `MenuButton` y `DotsButton`.
`CloseButton` es el tercero — y además dibuja el glifo `close`, que es
justamente la forma en la que termina la animación de `MenuButton`.

El comportamiento es el que pedía el operador: **hover sin fondo y sin cambio
de color**; el único estado que se marca es el foco, con el anillo del sistema.

### Ningún token desaparece

Cada contenedor sigue mandando su talla y su tinta desde los tokens
`*-close-*` que ya tenía (`modal.close-size`, `sheet.close-color`,
`floating-dock.close-icon-size`, `alert.close-size`…), **remapeados sobre el
átomo** en el CSS del contenedor:

```css
.modal__close.close-button {
  --close-button-size:  var(--modal-close-size);
  --close-button-color: var(--modal-close-color);
  /* … */
}
```

Es la regla 2 del repo (tokens en cascada) y tiene una consecuencia práctica:
quien ya sobrescribía `--modal-close-size` —el remapeo de la superficie
pública, sin ir más lejos— sigue mandando, y no hay breaking change que pagar.

### Dónde se ha reemplazado

| Pieza | Antes | Ahora |
| --- | --- | --- |
| `Modal` | botón nativo propio, `.modal__close` | `CloseButton` |
| `Sheet` | botón nativo propio, `.sheet__close` | `CloseButton` |
| `FloatingDock` | botón nativo propio, `.floating-dock__close` | `CloseButton` |
| `Alert` | `Button iconOnly variant="ghost"` (con fondo en hover) | `CloseButton` |
| `Toaster` | `Button iconOnly variant="ghost"` (con fondo en hover) | `CloseButton` |

Y con ellos, **por composición y sin tocarlos**: `ConfirmDialog`,
`ImageCropDialog`, `CommandPalette` y `ConsentPreferences`, que ya montaban
`Modal` y por tanto ya usaban su aspa.

`Sheet` no estaba en el barrido del encargo, pero su aspa era una copia literal
de la de `Modal`: se ha unificado el **aspa** (no el diálogo, ver § 5).

Único cambio visible más allá del hover: el glifo del aspa del `Alert`/`Toast`
pasa de 16 a **24px**, la talla de icono-botón del sistema, que es la que ya
tenían el diálogo y el dock. La caja sigue siendo de 32px, así que la maqueta
del aviso no se mueve.

### Los que NO son el mismo caso — no se han tocado

- **`SiteHeader` y `AppHeader`**: ahí el aspa es el **estado abierto** del
  botón de menú (`MenuButton`, hamburguesa ↔ aspa animada). No cierra un
  contenedor: conmuta un menú, lleva `aria-expanded` y su nombre accesible
  cambia con el estado (`menuLabel` / `menuCloseLabel`). Es otra pieza.
- **`MultiSelect`, `AsyncSelect`, `AsyncMultiSelect`, `ConversationList`,
  `FileUpload`**: el aspa quita **un elemento de una lista** (una pill, una
  conversación, un archivo de la cola). No cierra lo que la contiene, vive
  dentro de un control y su talla la manda ese control.
- **`InputField`**: ahí el glifo `close` es el **borrado de un campo de
  búsqueda**, no un cierre.

### Los nombres accesibles no se han uniformado

Es lo que más se cuidó al reemplazar. `CloseButton` tiene `label` con default
castellano «Cerrar», pero **cada contenedor sigue pasando el suyo**: el
`closeLabel` de `Modal`, `Sheet`, `FloatingDock`, `Alert` y `Toaster` viaja
intacto, y ninguna de esas props ha cambiado de nombre ni de default. La fila
de `CloseButton` está añadida a la tabla de Foundations →
Internacionalización, y el MDX del átomo dice explícitamente que «Cerrar»,
«Descartar aviso» y «Quitar a Ana» dicen cosas distintas y deben seguir
diciéndolas.

Recorrido de teclado comprobado en el navegador: el aspa sigue siendo el
primer focable del panel (aspa → Cancelar → Guardar en un `Modal` con pie), y
el anillo de foco se pinta igual que antes.

---

## 2. El pie de los diálogos, a ancho completo en móvil

`Modal` gana `footer` (y `footerClassName`). El reparto vive **una sola vez**,
en `.modal__footer`:

- por debajo de `--breakpoint-md` (768px): `column-reverse` y los hijos al
  100% de ancho — la acción principal, que es la última del DOM porque es la
  de la derecha en la fila, queda **arriba**;
- a partir de ahí: fila con `justify-content: flex-end`.

Es literalmente el criterio de `.form__actions--block`, orden incluido, no uno
nuevo. Se copió el mismo punto de ruptura que usa `Form` (`md`) a propósito:
un diálogo mide 560px como mucho, así que entre 560 y 768 los botones se ven
apilados dentro de un panel que aún es ancho; se ha preferido eso a inventar un
punto de ruptura solo para los diálogos. **Si el operador prefiere lo
contrario**, el cambio es una línea en `Modal.css`.

`ConfirmDialog` e `ImageCropDialog` dejan de montar su propia fila y le pasan
los botones a `Modal`; conservan su aire propio (`confirm-dialog.actions-space-before`,
`image-crop-dialog.actions-gap`) como override de una sola propiedad sobre el
pie compartido, así que ningún token queda muerto. `CommandPalette` y
`ConsentPreferences` no tienen pie y no han necesitado nada.

**«Cancelar» se queda y sigue siendo secundario**: `ghost` en `ConfirmDialog`,
`outline` en `ImageCropDialog`. No se ha tocado.

De regalo: el pie es ahora hermano del cuerpo desplazable, no hijo. Los botones
ya no se van con el scroll del contenido en un diálogo largo.

---

## 3. `ImageCropDialog`

- **El título.** `ImageCropDialog.title` es obligatoria y no tiene default: el
  copy lo pone el consumidor. Lo que sí tenía default era `AvatarUpload`, y ha
  pasado de «Recorta la imagen» a **«Recortar imagen»** — acción, no
  invitación, y sin segunda persona. Con él van los ejemplos: las stories
  («Recortar imagen», «Recortar portada», «Recortar logotipo») y el MDX, que
  ahora lleva una sección «El copy lo pone el consumidor» con el criterio
  escrito.
- **La frase de ayuda.** La pieza **no la impone**: `description` es opcional y
  lo que llegaba al diálogo era el default de `AvatarUpload`
  («Arrastra para ajustar la selección.»), que se ha **quitado** — ahora
  `cropDescription` llega sin valor y el diálogo no pinta descripción ninguna.
  La frase concreta que ve el operador, «Arrastra para reposicionar. La vista
  previa muestra cómo se verá.», **no está en este repo**: la pasa el hub en su
  llamada. **Acción para el hub**: quitar ese `cropDescription` (o el
  `description` si monta `ImageCropDialog` directamente) del paso del logotipo.
  El hueco ya está: sin él no se pinta nada.

---

## 4. `AvatarUpload`: el avatar, mucho más grande

`Avatar` gana `2xl` = **96px**, y `AvatarUpload` pasa a medir su avatar **dos
peldaños por encima** del control en vez de uno: `sm` → 48, `md` → 64,
`lg` → **96**. El icono del velo sube a `lg` en la talla grande, para que no se
pierda dentro del cuadro.

Por qué 96 y no otro número:

- **Como diana.** Es cuatro veces el objetivo de puntero mínimo del sistema
  (`size-target.min`, 24px) y vez y media el peldaño anterior; en el avatar
  redondo, además, el círculo se come las esquinas del cuadrado, así que la
  zona útil real es menor que el número. A 64px había que apuntar; a 96 no.
- **Como medida del sistema.** Sigue en el múltiplo de 8 y se queda por debajo
  del siguiente escalón natural. Por encima de `lg` el sistema ya no mide con
  la escala de controles —48px es el control más alto que existe— sino con la
  de marca: `xl` es `icon.size-xl` (64), `2xl` es vez y media eso.
- **Cabe en 375px.** Es el techo por esta razón. A talla `lg` la fila es
  avatar (96) + aire (16) + botón «Subir» `lg`, y entra en una sola línea en un
  móvil de 375 con el inset del contenedor. Hay un test de story que lo mide
  (`Test — a talla lg la fila cabe en 375px`): comprueba que la fila no
  desborda y que avatar y botón siguen alineados. El peldaño siguiente ya no
  entraba.

---

## 5. Deuda anotada, no arreglada: `Sheet` duplica el diálogo

Encargo del operador: mirarlo y decir qué duplica de `Modal`. `Sheet` no se ha
migrado —un cajón lateral es legítimamente otra cosa que un diálogo centrado—,
pero conviene tener claro qué es «otra cosa» y qué es copia.

**Lo que de verdad importa NO lo duplica ninguno de los dos: lo pone Base UI.**
`Sheet` y `Modal` montan cada uno su `Dialog.Root` + `Dialog.Portal` +
`Dialog.Backdrop` + `Dialog.Popup`, y de ahí salen —del motor, no del DS— la
trampa de foco, el cierre con Escape, el clic en el velo, el bloqueo del
scroll del fondo, la devolución del foco al disparador y el `aria-modal`. Dos
llamadas al mismo motor no son dos implementaciones del mismo comportamiento.

Lo que sí está duplicado, y es lo que se puede señalar:

- **El velo.** `.sheet__overlay` y `.modal__overlay` son la misma regla
  (`position:fixed; inset:0`, color, opacidad, capa) con dos juegos de tokens
  paralelos (`sheet.backdrop-*` / `modal.backdrop-*`) que valen lo mismo.
- **La cabecera.** Título + descripción opcional + aspa, con tokens gemelos
  (`sheet.title-*` ≈ `modal.title-*`, y los `sheet.close-*` ya declarados
  literalmente como `{modal.close-*}`). El aspa ya está unificada por esta
  entrega; el resto de la cabecera no.
- **El pie.** `.sheet__footer` es la fila a la derecha que `.modal__footer`
  también es —pero **sin** el apilado a ancho completo en móvil que se acaba de
  añadir al diálogo—. Es la duplicación que ya cuesta algo: un cajón en un
  móvil de 375 querría exactamente el mismo trato, y hoy no lo tiene.
- **El passthrough.** El mismo párrafo de JSDoc sobre `{...rest}` al popup y la
  barrera de eventos, y el mismo `container` con la misma explicación de
  portales y superficies.

Lo que **no** es duplicación y justifica la pieza aparte: la dirección de
entrada (`data-side`, cuatro bordes, cuatro animaciones), el no centrarse, el
`trigger` propio, `titleHidden`, `onAnimationEndCapture` y el hecho de dejar
ver el contexto detrás.

**Propuesta, si algún día se paga**: extraer una superficie de diálogo común
—velo + cabecera + pie, con el pie ya responsive— y que `Modal` y `Sheet` sean
dos colocaciones de ella, en vez de dos árboles paralelos. Lo mínimo y más
barato, si no se quiere tocar la estructura: llevar el `column-reverse` a
`.sheet__footer` también, que es la única de las cuatro duplicaciones que hoy
produce una diferencia de comportamiento en móvil.

---

## Lo que NO se ha tocado

- **La versión y el CHANGELOG publicado.** Entrada bajo «Sin publicar».
- **El monorepo `slxd`.** La adopción va después del release.
- **`SiteHeader` / `AppHeader`.** Ver § 1.
- **El diálogo del `Sheet`.** Ver § 5.
- **«Cancelar».** Sigue siendo secundario, no ha pasado a `text`.
