# Entrega — el subrayado del DS, el pie del alta y tres cosas del correo

Rama `subrayado-ds`. **Sin release**: no se toca `package.json#version` ni
`CHANGELOG.md`. `dist/` **sí** cambia (tokens y CSS de componente), va
commiteado aparte y `pnpm release:check` termina en verde con `dist/` en sync.

Siete commits, uno por asunto salvo los tres últimos del correo, que comparten
fichero y no se podían separar sin dejar un commit que no compila.

## 1. El subrayado del `Stepper`

El paso navegable se subrayaba en hover con `text-decoration: underline`. No es
el subrayado del sistema: ni el grosor ni la separación coincidían con los del
enlace, y se notaba al ponerlos juntos.

Ahora es la línea de `Link` —`box-shadow` interior más `padding-block-end`—,
con dos tokens nuevos:

| Token | Valor | Por qué |
| --- | --- | --- |
| `stepper.label-hover-line-width` | `{border-width.default}` | El grosor único del sistema. **No** apunta a `link.underline-width`: ese token vale 0 en superficie oscura —el enlace no lleva línea en reposo sobre prusia— y arrastrarlo habría borrado esta línea, que es de hover. |
| `stepper.label-hover-line-offset` | `{link.underline-offset}` | La separación sí es literalmente la del enlace. |

Dos decisiones que conviene saber:

- **El hueco de la línea está reservado siempre**, la pinte o no. La etiqueta es
  una celda de la rejilla del paso, así que un `padding-block-end` que apareciese
  en hover movería la línea de detalle de debajo. El precio es que la separación
  entre la etiqueta y su detalle pasa de 4 a 8px **en todos los pasos**, tengan
  hover o no. Mirado en la story «Con detalle»: respira mejor, y ahora esos 4px
  extra son el sitio por donde pasa la línea. Si prefieres que no cambie nada,
  se revierte bajando `stepper.text-gap` a 0 — pero eso acopla dos tokens por
  casualidad y no lo he hecho.
- **La etiqueta se ciñe a su texto** (`justify-self: center`). Como celda de la
  rejilla se estiraba al ancho del detalle, y la línea salía más larga que la
  palabra.

## 2. La norma

Escrita en los dos sitios donde vive el criterio del repo:

- `CLAUDE.md` → «CSS y tokens › Reglas no negociables», regla 7.
- `src/stories/foundations/Borders.mdx` → sección «El subrayado es una línea, no
  `text-decoration`», con el mecanismo, el porqué y las excepciones.

El porqué, resumido: `text-decoration` no cubre un SVG —un enlace o un botón con
icono queda con la línea cortada bajo el texto y ausente bajo el icono— y su
grosor y su posición los deciden la fuente y el navegador, así que dos subrayados
hechos con las dos técnicas nunca coinciden. Con la línea, todos miden 1px
(`border-width.default`) y se separan lo mismo (`link.underline-offset`).

Dos excepciones escritas: `src/vendor/normalize.css` (de terceros, no se toca) y
**el correo**, que no tenía excepción y la necesita — Outlook renderiza con el
motor de Word, que no pinta `box-shadow`, y un correo no tiene hoja de estilos
donde colgar la línea. Allí el enlace se subraya con `text-decoration` y se
desubraya en hover, que es el mismo dibujo con la única técnica disponible.

## 3. El barrido

Las cuatro apariciones que decía el encargo, y una quinta que no salía en el
grep:

| Sitio | Qué pasaba | Qué se ha hecho |
| --- | --- | --- |
| `Stepper.css:166` | El del punto 1 | Arreglado |
| `ProjectCard.css:52` | Subrayado de hover con `text-decoration` **y**, además, nunca anulaba la línea que la base pone a todo `<a>`: el título llevaba línea en reposo, cuando su MDX dice que la línea es un estado del puntero | Anula la de la base (`box-shadow: none; padding-block-end: 0`) y pinta la suya con la sombra interior. El enlace es inline, así que el hueco no mueve nada al aparecer |
| `normalize.css:87-88` | Vendor | No se toca; excepción escrita en la norma |
| **`Breadcrumb.css:35`** | **No aparecía en el grep**: el `underline` entraba por un token, `breadcrumb.link-text-decoration-hover`. El efecto era el mismo defecto — al pasar el puntero se iba la línea del sistema y en su sitio entraba un `text-decoration` de otro grosor y otra separación | Las migas se subrayan ya como cualquier enlace. Los dos tokens `link-text-decoration*` quedan en `none` y marcados **OBSOLETO** en su descripción |

**Pendiente tuyo:** retirar `breadcrumb.link-text-decoration` y
`breadcrumb.link-text-decoration-hover` es un **breaking** (tokens eliminados →
major), así que se quedan inertes. Cuando toque un major, se van.

Otras vías comprobadas: **no hay Tailwind** en el repo (ni dependencia ni
config), y no hay ningún `style={{ textDecoration: 'underline' }}` fuera del
correo. El único `textDecoration: 'underline'` que queda es
`emailTheme.ts` → `emailStyles.link`, que es la excepción declarada.

### Hallazgo que NO he tocado

`Card.css` tiene el mismo defecto que tenía `ProjectCard`: pone
`text-decoration: none` pero no anula el `box-shadow` de la base, así que una
`Card` con `href` —que se renderiza como `<a class="card">`— lleva una línea de
1px pegada a su borde inferior. No es `text-decoration: underline` y no entraba
en el encargo; `Card` la usa media suite y quitar esa línea se ve en todas
partes, así que lo dejo dicho en vez de hacerlo. Arreglarlo es una línea:
`box-shadow: none` en `.card`.

### Si quieres que la norma se defienda sola

**No lo he añadido**, porque cambia la puerta de calidad de todos. Dos formas,
de menos a más:

1. **Un test unitario** en `src/tokens/` o `test/`, del proyecto `unit` (node):
   lee todos los `.css` bajo `src/` menos `src/vendor/`, y falla si aparece
   `text-decoration:\s*underline`. Diez líneas, sin dependencias nuevas, corre
   ya en `pnpm test` y por tanto en `release:check`. Es lo que recomiendo.
2. **Stylelint** con `declaration-property-value-disallowed-list`. Más correcto
   de libro, pero mete una herramienta y una config nuevas al repo y un paso más
   a `release:check` para vigilar una sola regla.

Ninguna de las dos ve el caso del `Breadcrumb` (el valor entraba por un token),
así que la regla del test tendría que mirar también los JSON de `tokens/` en
busca de `"underline"`. Dilo y lo añado.

## 4. El pie de `OnboardingShell`

`--onboarding-shell-actions-gap`: `{spacing.3}` (12px) → **`{spacing.4}`**
(16px), un peldaño justo.

Ese token gobierna las dos separaciones del pie —«Atrás» ↔ decisiones y
«Omitir» ↔ «Continuar»/«Finalizar»— y **no ha hecho falta separarlo**: las tres
acciones son hermanas de la misma fila y a 16px siguen leyéndose como una, con
la misma medida entre las tres. Comprobado en escritorio (1200px) y en móvil
(375px), donde van apiladas a todo el ancho y los 16px separan «Continuar» de
«Omitir» sin abrir el bloque.

## C. El título del correo, a 32px

`email.heading-font-size`: `{site-shell.heading-size-4}` (24px) →
**`{site-shell.heading-size-6}`** (32px). Sale de la escala de la superficie
pública, que es la que lee el correo, y no de `{font-size.6}`, que hoy vale lo
mismo: así el título se mueve si esa escala se mueve. Descripción del token
actualizada (peldaño y cifra).

**Lo que no he cambiado y quizá quieras:** `heading-line-height` y
`heading-font-weight` siguen apuntando a los de **H5**. El peso es el mismo
token para todos los títulos, así que da igual; el interlineado no: al peldaño 6
le tocaría `tight` (1,1) y hoy tiene `snug` (1,3). A 32px con `snug` el título
respira bien incluso partido en dos líneas a 320px —comprobado—, y bajarlo a 1,1
es una decisión de diseño que no me has pedido. Dilo y lo cambio.

## D. El enlace de respaldo, a la talla del cuerpo

De la talla de la nota (16px) a la del cuerpo (**20px**): es una dirección que
hay que leer carácter a carácter y copiar a mano, no una letra pequeña de pie de
correo.

`email.note-font-size` **no queda huérfano**: sigue vistiendo las dos notas del
correo (`emailStyles.muted`, dentro del recuadro, y `emailStyles.footnote`,
fuera). Se queda, y su descripción dice ya explícitamente que no viste el
respaldo.

## E. La dirección, en su propia línea

Debajo de la frase que la presenta, con un `<br />` dentro del mismo párrafo —no
un segundo `<Text>`—: las dos piezas son una sola frase, y el margen que cierra
el bloque lo lleva el respaldo, así que partirlo en dos párrafos habría metido
ese margen por medio. `<br />` lo entiende cualquier cliente, motor de Word
incluido.

Lo que ya estaba resuelto sigue resuelto, y comprobado **con la URL larga de las
stories** (la de token, `…?token=8f3a1c9e…&uid=41827&redirect=%2Fpanel`):

- Parte dentro de la columna a **320 y 375px**, y `scrollWidth === clientWidth`
  en los dos: ninguna barra horizontal.
- Sigue siendo texto plano seleccionable, entero, con `word-break` y
  `word-wrap`, sin `overflow`.
- El bloque sigue siendo un solo componente y el margen inferior lo cierra el
  respaldo.

Hay test nuevo que fija el salto de línea (`…dirección:<br/>`), junto a los que
ya vigilaban el corte de palabra.

## F. El botón del correo ya tiene hover

Hace el mismo salto que `Button primary` en la web: del lavanda (`accent-1`) al
amarillo (`accent-2`), con la tinta prusia quieta. Por tokens
(`email.button-hover-bg` → `{button.primary.hover-bg}`,
`email.button-hover-color` → `{button.primary.hover-color}`), no por hex.

Va en `emailStyleSheet`, la hoja embebida del layout, porque un `:hover` no cabe
en un atributo `style`. Con `!important`, porque compite con el estilo inline del
propio botón, que le gana por especificidad. Y enganchado a **`a.email-button`**,
no a `a`: el enlace de respaldo y los del pie de baja no deben ponerse amarillos.
`email-button` es la única clase que queda en el correo y existe solo para esto.
El `a:hover { text-decoration: none }` que desubraya los enlaces sigue intacto,
delante.

**Dónde se ve y dónde no**, escrito así de claro en `EmailLayout.mdx`: funciona
donde el cliente respeta el `<style>` del `<head>` —Gmail web, Apple Mail—; **no**
en Outlook de escritorio, que renderiza con el motor de Word, y en el móvil no
hay puntero. Donde no llegue, el botón se queda en su reposo, que es la lectura
correcta: es pulido, no una señal de la que dependa nada.

El test que vigilaba que no volvieran las clases `email-*` del modo oscuro no se
ha aflojado: ahora fija que la única clase que puede aparecer es `email-button`,
y que la hoja lleva las dos pseudoclases.

## Comprobación

Todo en verde, en este orden:

| | |
| --- | --- |
| `pnpm lint` | limpio |
| `npx tsc -b` | limpio |
| `pnpm test` | 49 ficheros / 305 tests |
| `pnpm test:stories` | **161 ficheros / 1329 tests** |
| `pnpm release:check` | verde, `dist/` en sync |

Y mirado de verdad, con capturas sobre Storybook en el **6007** (el 6006 es
tuyo; queda cerrado): el hover del `Stepper` en «Volver a un paso hecho», la
`ProjectCard` en reposo y en hover, el `Breadcrumb`, el pie del alta a 1200 y a
375px, y el correo a 800, 375 y 320px con el botón en reposo y en hover.
