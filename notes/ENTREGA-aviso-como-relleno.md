# Entrega — el rol de aviso, bien hecho esta vez

Rama `warning-relleno`. **Sin tag ni bump de versión**: publicada sigue siendo
la v30.10.0. Las entradas del CHANGELOG están bajo «Sin publicar» — al taggear
basta renombrar ese encabezado a la versión que toque.

Cuatro commits, en este orden:

1. `docs: no se inventan colores — norma del DS`
2. `fix: el aviso es un relleno amarillo con tinta prusia, no un ámbar inventado`
3. `fix(uptime-bars): el recuadro del día, la media sin negrita y los extremos en tinta`
4. `fix(inline): un título en la fila centra por lo que se ve, no por su caja`

---

## 1. La norma nueva: no se inventan colores

`CLAUDE.md` § «Reglas no negociables», regla **9**. Un token de color nuevo —de
rol, de componente, de estado— solo puede referenciar primitivos que ya existan
en `tokens/color/`. Añadir un hex a la paleta es una decisión explícita del
operador, nunca un efecto lateral de un encargo: si al resolver una tarea parece
que falta un color, **se dice y no se crea**.

El caso de hoy queda citado en la propia regla como ejemplo de lo que no se
hace: el rol `warning` entró en v30.10.0 inventando `color.amber` (#7D4C00) y
`color.amber-light` (#F59E0B) en su mismo commit.

## 2. El rol de aviso

### Lo que se va

- `color.amber` y `color.amber-light`, de `tokens/color/system.json`. No los
  referenciaba nada más: los metió el mismo commit (`66f5853`) que el rol.
  Comprobado en todo el repo, incluidos SCSS, `tokens.json` y la página de
  Colores.
- `color.warning-text-on-light` y `color.warning-text-on-dark`. No los consumía
  ningún componente.

### Lo que queda

El rol `warning` tiene **dos tokens**, y es a propósito:

| Token | Valor | Medida |
|---|---|---|
| `color.warning-fill` | `{color.yellow}` — `#FFCD00` | — |
| `color.warning-fill-text` | `{color.primary}` — el prusia | **11,17:1** sobre el relleno (AAA) |

**Un aviso siempre va como relleno, con la tinta prusia encima.** Nunca como
tinta suelta sobre claro ni sobre oscuro. Las dos mitades del par que falta se
caen cada una por su motivo, y las dos están medidas:

- **Sobre claro no llega**: el amarillo da **1,50:1 sobre blanco**, muy por
  debajo del 3:1 que pide WCAG 1.4.11 para una tinta, un borde o un icono.
- **Sobre oscuro se confundiría con la marca**: el amarillo sí lee sobre prusia
  (11,17:1), pero ahí ya es `accent-2` haciendo de identidad. Un aviso escrito
  en amarillo dentro de una banda oscura sería indistinguible de un titular.

El píxel es el mismo que `Alert` y `Tag` pintaban antes de v30.10.0; lo que
cambia es **la procedencia**: sale del rol de feedback, no de la marca. Si
mañana el aviso deja de ser amarillo, se cambia en un sitio.

### Documentado como excepción, en tres sitios

- **`CLAUDE.md`, regla 8** — la excepción declarada, con las dos cifras y la
  instrucción de no «completar» el rol.
- **Fundamentos › Colores**, § «El aviso tiene dos tokens, no cuatro» — el
  porqué largo, con las medidas y la historia del ámbar retirado. La sección de
  colores de sistema pasa a decir que son **dos** (rojo y verde) y por qué el
  aviso no tiene uno propio.
- **`Alert.mdx` y la propia sección de Fundamentos** — la nota honesta: **el
  relleno de aviso y el hover del botón primario son el mismo color de marca.
  Se distinguen por contexto y por forma, no por color.** Es una decisión, no un
  descuido.

### Las piezas

Ninguna usaba los `-text-on-*` que se van. Las cuatro cuelgan de
`warning-fill` / `warning-fill-text`. Dos cosas que hubo que devolver a su
sitio, porque el commit del ámbar las había cambiado dando por hecho que el
relleno del aviso era oscuro:

- **`Alert` y `Toaster` recuperan su excepción de siempre**: la raíz no declara
  `.surface-dark` cuando la variante es `warning`, porque ahí la superficie lee
  en claro. Con el ámbar se había quitado esa excepción.
- **El aspa del aviso se fija a la tinta del rol** (`alert.warning-close-color`
  → `{color.warning-fill-text}`, token nuevo pero sin color nuevo). Sin eso, con
  `[data-theme="dark"]` en la raíz el `CloseButton` tomaba la tinta ambiente y
  salía **blanco sobre el amarillo** (1,50:1). Es justo lo que el encargo pedía
  comprobar: ninguna de las cuatro piezas pinta ya texto blanco sobre el aviso.

Comprobado en el 6007 (ya cerrado), en claro y en oscuro: `Alert` variantes,
`Tag` todas las variantes, `Toast` con `toast.warning()` y `UptimeBars`.

### Un límite conocido, no resuelto aquí

Dentro de un `Alert`/`Toast` de aviso, un `Link` o un `Button` compuesto en
`children` toma la tinta **ambiente**, no la de su relleno: en tema oscuro eso
es tinta clara sobre el amarillo. Es el comportamiento que la pieza tenía antes
de v30.10.0, y sale de que el sistema tiene `.surface-dark` pero no su
contrario: no hay forma de declarar «aquí dentro se vuelve a leer en claro».
El aspa se ha resuelto por token porque es parte del componente; lo compuesto
por el consumidor necesitaría un `.surface-light` que hoy no existe **y que no
se inventa en un encargo** (regla 9, mismo espíritu). Queda apuntado.

## 3. `UptimeBars` — tres retoques de superficie clara

Fuera del encargo original, pedidos sobre el panel de estado ya montado:

- **El filete de cada barrita va en prusia** (`{color.primary}`) en superficie
  clara, no transparente. Recuadra cada día, incluido el «sin dato», y sigue
  distinguiendo los tres tramos. En oscuro no cambia: la tinta clara de siempre.
  Con esto el tramo de aviso deja de necesitar un filete propio —el general ya
  lo cubre—, que es lo que se había añadido en el commit 2.
- **La media no va en negrita**: `{font-weight.default}`.
- **Los extremos van en tinta** (`{color.text.on-light}` y su par oscuro), no
  atenuados.

Sin colores nuevos, todo por token.

## 4. Fuera de la pieza: `Inline` y los títulos

**Esto es un arreglo del DS, no del panel de estado**, y por eso va en su propio
commit: afecta a cualquier consumidor de `Inline`.

Un `Tag` junto a un `Heading` dentro de `<Inline align="center">` no quedaba
centrado: la etiqueta caía por debajo de la línea del título.

**No es la línea de base.** Un `h1`–`h6` lleva `margin-block-end`
(`--text-heading-space-after`) para separarse del párrafo que viene después, y
ese margen forma parte de la caja que alinea el flex: `align-items: center`
centra la caja **con** su aire. Medido con un `h2` de la escala de aplicación:
margen de 16px, y los dos centros separados exactamente 8px, la mitad. Tras el
arreglo, 0.

El criterio es general: dentro de una fila, el aire de debajo de un título no
separa nada —el hueco lo pone el `gap`— y solo estorba. `Inline` se lo quita a
sus **hijos directos** `h1`–`h6`, en las tres alineaciones. Nada fuera de
`Inline` cambia, así que el título en flujo vertical conserva su aire.

Sin regresiones: ningún componente del repo mete hoy un `Heading` dentro de un
`Inline` (`Hero` y `Highlight` lo ponen en su propio bloque, no en una fila), y
la regla no puede alcanzar a las barras de página ni a las cabeceras de tarjeta,
que usan sus propias filas y no la clase `.inline`.

Documentado en `Inline.mdx` § «Alineación», con story de contrato
(`Test — un título en la fila suelta su aire de debajo…`) que compara los dos
centros.

---

## Comprobación

`pnpm lint`, `npx tsc -b`, `pnpm test`, `pnpm test:stories` y
`pnpm release:check` en verde. Storybook se levantó en el **6007** (nunca en el
6006) y se cerró al terminar.
