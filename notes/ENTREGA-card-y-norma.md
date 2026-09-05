# Entrega — la línea de la `Card`, el interlineado del correo y el test de la norma 7

Rama `card-y-norma`. **Sin release**: no se toca `package.json#version` ni
`CHANGELOG.md`. `dist/` **sí** cambia (CSS de componente y tokens) y va
commiteado aparte, con `pnpm release:check` en verde y `dist/` en sync.

Tres commits, uno por punto, más el de `dist/`. Los cambios se han acotado a
`Card.css`, `tokens/component/email.json`, un `.mdx` de Foundations y un fichero
de test nuevo: nada de `src/index.ts` ni de los entry points, para no cruzarse
con la rama `fila-repetible`.

## 1. La `Card` enlace arrastraba la línea de la base

Mismo defecto que tenía `ProjectCard`: la base viste **todo** `<a>` con el
subrayado del sistema (sombra interior de 1px más su hueco), y `Card` anulaba
solo `text-decoration: none` —que ahí ya no decora nada— pero no la sombra. Una
tarjeta-enlace llevaba por tanto una línea de 1px de `currentColor` pegada a su
borde inferior, por dentro.

Corregido como manda la norma 7: `box-shadow: none` en `.card`. El hueco no hay
que reponerlo —`.card` ya declara su propio `padding-block-end`, que gana al de
la base por especificidad—, así que **el cambio no mueve nada de sitio**: solo
quita la línea.

**Qué cambia visualmente**, mirado en el catálogo (Storybook propio en el 6008;
el 6006 y el 6007 estaban ocupados):

| Variante | Antes | Ahora |
| --- | --- | --- |
| `primary` (lavanda), `accent-*`, `support-*` | Raya oscura de 1px cruzando el borde inferior del relleno, más visible cuanto más claro el fondo | Relleno limpio |
| `outline` | El borde inferior se veía doble/reforzado: el borde propio más la línea justo encima | Los cuatro bordes iguales |
| `square` / `split` | La línea quedaba al filo del bloque, sin aire (esas maquetas tienen `padding-block-end: 0`) | Sin línea |
| Modo contenedor (sin `href`) | No le afectaba: es un `<div>` | Igual |
| Superficie oscura | Línea blanca sobre prusia en las variantes con par oscuro | Sin línea |

**No era deliberada en ningún caso.** Ninguna variante la menciona en su CSS ni
en sus tokens, ninguna story la enseña como parte del diseño, y `Card` no tiene
tokens de línea propios (`ProjectCard` sí los tiene, y ahí sí es diseño: es la
línea de hover del título). Era exactamente el mismo arrastre que ya se corrigió
en `ProjectCard`.

**Alcance en la suite**: **78 tarjetas-enlace** (`<Card>` con `href` o `render`)
en 24 ficheros de 4 apps del monorepo `slxd`: `bricks` (72, todas en las páginas
de docs, las mismas 3 páginas × 6 idiomas), `corporate` (2), `web` (3, incluida
la `LinkCard` y el `Card` de `MdxComponents`, que multiplica por todas las
páginas MDX) y `localizia` (1). Frente a 208 usos totales de `<Card>`: el resto
son modo contenedor y no estaban afectados. Ninguna app necesita tocar nada: el
arreglo llega con el bump.

## 2. El interlineado del título del correo

`email.heading-font-size` subió a 32px apuntando a `{site-shell.heading-size-6}`
—el peldaño de H3 en la superficie pública— pero `email.heading-line-height`
seguía en `{text.h5.line-height}` (`snug`, 1,3), el del peldaño anterior. Por
escala, a ese cuerpo le toca el de H3: `tight`, 1,1.

Ahora `email.heading-line-height` → `{text.h3.line-height}`. Sale del mismo
peldaño del que sale el cuerpo, no de un número ni del token de interlineado
suelto: si la escala de títulos cambia, el correo se mueve con ella.

Comprobado con un título de dos renglones en `Email/Correos de ejemplo`
(«Confirma tu dirección de correo para terminar el alta»): la línea pasa de
41,6px a 35,2px y el bloque del título, de 83 a 70px. Los dos renglones se leen
como un solo bloque y no como dos frases sueltas, que era el efecto de `snug` a
32px. Con un título de una línea no cambia nada visible.

Regenerado `src/stories/email/emailTokens.ts` y `src/tokens/tokens.json` con
`pnpm build:tokens` (`--email-heading-line-height: '1.1'`).

## 3. El test que hace cumplir la norma 7

`src/stylesheets/underline.test.ts` (proyecto `unit`, node). Tres casos:

1. **Ningún `.css` de `src/`** subraya con `text-decoration`. Se vacían antes los
   comentarios conservando los saltos de línea, para que un comentario que cite
   la norma —los hay, y deben poder citarla— no la haga fallar; los números de
   línea siguen siendo los del fichero.
2. **Ningún token de `tokens/`** vale `underline`. Se mira solo el `$value`,
   nunca el `$description`. Un valor que *referencia* un token con `underline` en
   el nombre (`{link.underline-width}`) no infringe nada: ese es justamente el
   grosor de la línea del sistema, así que las referencias `{…}` se descartan
   antes de buscar la palabra clave. Esta es la vía por la que se coló el
   `--breadcrumb-link-text-decoration-hover`, que no aparecía buscando en el CSS.
3. **Las excepciones son exactamente dos.** Un tercer caso las fija por lista, de
   modo que ampliarlas obliga a tocar el test.

Las excepciones están escritas en el propio test, en una constante `EXCEPCIONES`
con `ruta` y `motivo`, para que quien añada una tercera tenga que justificarla
ahí: `src/vendor/normalize.css` (terceros, no se toca) y `src/stories/email/`
(el medio no es un navegador). Son las dos de la norma y ninguna más — `vendor/`
está excepcionado por fichero, no por carpeta.

El mensaje de fallo dice fichero, línea, la declaración culpable y qué hacer en
su lugar (la receta de la línea, dónde van el grosor y la separación, cómo se
anula la línea de la base y dónde está la regla completa).

**Comprobado que falla de verdad**: reintroducido a mano un
`text-decoration: underline` en `Card.css` y un `"$value": "underline"` en
`breadcrumb.json`; los dos casos fallaron señalando `Card.css:10` y la línea del
JSON. Devueltos los dos. Comprobado también que las excepciones se respetan por
la ruta correcta: un `.css` de prueba dentro de `src/stories/email/` no lo hace
fallar, y uno en `src/vendor/` que no sea `normalize.css` sí.

Anotado en Foundations → Bordes, al pie de la norma: que la regla la vigila un
test y que las excepciones viven ahí.

## Comprobación

- `pnpm lint` ✅
- `npx tsc -b` ✅
- `pnpm test` ✅ (50 ficheros / 308 tests)
- `pnpm test:stories` ✅
- `pnpm release:check` ✅ con `dist/` en sync
