# Entrega — la fila de formulario repetible (`FieldRow`)

Rama `fila-repetible`. **Sin release**: no se ha tocado `package.json#version`
ni se ha creado tag. `CHANGELOG.md` lleva la entrada bajo **«Sin publicar»**,
para que quien publique le ponga el número (es **minor**: pieza y tokens
nuevos, ninguna API rota).

`dist/` **sí** se ha regenerado, en su propio commit (`pnpm release:check`
termina comprobando que queda en sync y no puede darse por verde sin él). Si
el merge con `subrayado-ds` lo ensucia, se tira ese commit y se rehace con
`pnpm build:all`.

Verde: `pnpm lint`, `npx tsc -b`, `pnpm test` (50 ficheros, 314 tests),
`pnpm test:stories` (162 ficheros, 1335 tests) y `pnpm release:check`.

Cuatro commits, uno por asunto:

- `f06a3b5` — `labelHidden` se hereda de quien envuelve el campo.
- `ae33414` — `FieldRows` + `FieldRow`, tokens, story, MDX y contrato.
- `7a0eedf` — el paso de invitaciones del alta montado con la pieza.
- (dist) — `dist/` regenerado.

## 1. Qué faltaba, y por qué no valía extender

El hueco medido en el hub: `Columns columns={2} ratio="2:1"` con el aspa
dentro de la columna del rol, en un `Inline` que no crece. La fila no llenaba
el ancho y —peor— el aspa colgaba **bajo la etiqueta «Rol»**, como si fuera
parte de ese campo, cuando actúa sobre la fila entera.

Se miró primero lo que ya hay:

- **`Columns`** reparte **proporciones** (`1:1`, `1:2`, `2:1`) sobre celdas
  iguales. Aquí hace falta otra cosa: una celda que absorbe el sobrante, otras
  con su ancho propio y una acción que ocupa lo justo. Meterle un reparto
  mixto sería cambiarle la naturaleza al molde —dejaría de ser «N celdas
  iguales»— y no resolvería lo segundo: la acción seguiría siendo una celda
  más, con la etiqueta de un campo encima.
- **`Inline`** pone piezas en fila con aire y envoltura, pero no reparte
  anchos ni alinea columnas **entre filas**, que es justo lo que pide una
  lista: que el papel de la fila 3 caiga bajo el papel de la fila 1.
- **`Fieldset`** es el grupo semántico con `legend`; no maqueta.
- **`Form`** apila campos con su aire y reparte la talla. Es el sitio donde la
  lista vive, no la lista.

Así que pieza nueva, y en `Molecules/` porque combina campos (moléculas) y un
botón sin ser una sección.

## 2. La pieza

Dos componentes, un fichero, un export `@studiolxd/brand/field-row`:

- **`FieldRows`** — la lista. Aporta el aire entre filas y **la posición**, que
  es lo que le permite decidir qué fila enseña las etiquetas.
- **`FieldRow`** — la fila. El reparto y la acción.

```
.field-rows
└── .field-row                     (flex; wrap en móvil, nowrap en ≥ md)
    ├── .field-row__cell--grow     (el correo: flex 1 1 0)
    ├── .field-row__cell--md       (el papel: flex 0 1 12rem)
    └── .field-row__action         (flex 0 0 auto; margin-inline-start:auto)
        ├── .field-row__action-offset   (solo en la fila con etiquetas)
        └── el botón
```

### El reparto mixto

`widths` da el ancho **por posición**: `grow` (absorbe el sobrante), `sm` /
`md` / `lg` (ancho propio: 8 / 12 / 16rem; encogen si la fila se queda sin
sitio, nunca crecen) y `auto` (manda el contenido). Sin la prop, la primera
crece y las demás van a `md`. La acción no entra en `widths`: va en `action`.

Los tres anchos **suben un peldaño en talla `lg`** (10 / 15 / 20rem). No es
capricho: a 20px de letra, «Administración» acababa debajo de su propia flecha
en una celda de 12rem. El remapeo va por tokens en la clase de talla, como
hace `.input-field__search--lg`.

### La acción, fuera de la columna de un campo

Es una celda propia, hermana de las de los campos —no una de ellas—, y no
estira. La fila que enseña etiquetas reserva encima de la acción un hueco de
la altura de una etiqueta más su aire
(`--field-row-label-font-size × --field-row-label-line-height +
--field-row-label-gap`), así que la acción se alinea con **los controles**, no
con los rótulos. Ese hueco es lo que hace que siga alineada cuando un campo
pinta debajo su error o su ayuda, cosa que un `align-items: flex-end` no
aguantaría.

Medido a 1280 en la story del catálogo: contenedor 1248, fila 1248 (984 + 192
+ 40 + dos huecos de 16). La fila llena el ancho. Y en las tres filas el `top`
del control y el del aspa coinciden: 45 / 97 / 149.

### Las etiquetas, comportamiento de la pieza

`FieldRows` conoce la posición de cada fila y reparte el ocultado por
contexto; `FieldRow` lo publica a sus campos con `LabelHiddenContext`. Los
dieciséis `*Field` que tenían `labelHidden` dejan de cablear el default
`false` y lo resuelven con `useLabelHidden(prop)` — **el mismo patrón con el
que `Form` reparte la talla** (`useFormSize`). Sin nadie que lo reparta el
valor sigue siendo `false`, así que no cambia nada de lo ya escrito, y la prop
del campo gana siempre al contexto (`labelHidden={false}` en la tercera fila
la enseña).

En las filas sin etiqueta visible el `<label>` sigue en el árbol con
`visually-hidden`: **el campo conserva su nombre accesible en todas**. Hay
prueba de ello en los dos sitios —`FieldRow.test.tsx` (`getAllByLabelText`
devuelve tres) y el contrato de la story—, más la comprobación de que solo dos
etiquetas se ven.

`labels="every-row"` las enseña en todas.

### Móvil

Por debajo de `md` la fila envuelve: los campos pasan a ancho completo y la
acción cae al final de su fila, **alineada al margen** (`margin-inline-start:
auto`). Por qué ahí y no arriba: actúa sobre todo lo que tiene encima, así que
leerla al final es leerla después de lo que afecta; y queda en el mismo lado
en el que la mano ya la busca en escritorio. El aire entre filas apiladas sube
a 24px (`rows-stack-gap`): con los 12px de escritorio, la lista se leía como
una sola pila de campos.

Las etiquetas siguen la misma regla que en columnas (solo la primera). Es un
compromiso consciente: apiladas, el rótulo de la fila 1 ya no encabeza una
columna. En el correo lo tapa el placeholder —`InputField` usa la etiqueta
como placeholder cuando va oculta— y en el select, su propio valor. Cuando una
lista se use sobre todo en móvil, la salida es `labels="every-row"`.

Comprobado a 375 y a 1280, en claro y en oscuro, con capturas de las stories
del catálogo y de la página del alta.

### Vacío y mínimo

Son dos cosas y solo una es de la pieza:

- **Vacío** — `empty` en `FieldRows`: qué pintar cuando no queda ninguna fila.
- **Mínimo** — **del consumidor**. La fila no cuenta filas ni sabe qué hace su
  acción; el `disabled` va en el botón que se le pasa
  (`disabled={filas.length === 1}`). Meterlo en la pieza obligaría a que
  supiera que su acción es «quitar», y no siempre lo es.

## 3. Cómo se adopta en el hub

No se ha tocado nada del hub (otro repo, y va después del release). El cambio
del paso de invitaciones es literalmente esto —tal cual quedó la story
`Pages/Onboarding · Invitaciones` de este repo—:

```tsx
import { FieldRows, FieldRow } from '@studiolxd/brand/field-row';

<Form id="alta-invitaciones" size="lg" actions={…}>
  <FieldRows>
    {filas.map((fila) => (
      <FieldRow
        key={fila.id}
        widths={['grow', 'md']}
        action={
          <Button
            variant="ghost"
            iconOnly
            disabled={filas.length === 1}
            aria-label={fila.correo ? `Quitar a ${fila.correo}` : 'Quitar la fila vacía'}
            onClick={() => quitar(fila.id)}
          >
            <Icon name="close" />
          </Button>
        }
      >
        <InputField id={`invitacion-correo-${fila.id}`} label="Correo electrónico" type="email" … />
        <SelectField id={`invitacion-rol-${fila.id}`} label="Papel" options={ROLES} … />
      </FieldRow>
    ))}
  </FieldRows>
</Form>
```

Lo que desaparece del hub:

- el `Columns ratio="2:1"`,
- el `Inline` que envolvía el aspa dentro de la columna del rol,
- **los dos `labelHidden={indice > 0}`**: los reparte la lista.

Lo que hay que añadir: el `aria-label` del aspa **nombra la fila**
(«Quitar a nuria.serra@santcugat.cat»), no la columna. Con las etiquetas
ocultas es lo único que distingue un aspa del de al lado.

El `Form` del alta va en talla `lg`, así que la fila la hereda sola: el hueco
de la etiqueta y los anchos propios suben con el control, sin pasar `size`.

## 4. Lo que queda fuera

- **No se ha tocado la versión** ni se ha creado tag.
- **No se ha adoptado en el hub.**
- La pieza no pinta separadores, ni numera filas, ni arrastra para reordenar.
  Si algún día hace falta reordenar, ahí sí habrá que decidir si es de esta
  pieza o de otra: mover filas es un modelo de interacción entero, no una
  celda más.
