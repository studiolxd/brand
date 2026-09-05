# Brief — El aspa unificada y los diálogos en móvil (repo `brand`)

Trabajas en **`@studiolxd/brand`**, en tu worktree. Lee `AGENTS.md`/`CLAUDE.md`:
mandan sobre este brief. Publicada: **v30.7.0**. **No toques la versión ni
publiques release**; **no arranques Storybook en el 6006**, que es del operador
— usa el 6007 y ciérralo al terminar.

Todo esto lo ha visto el operador usando el alta del hub.

## 1. El aspa: hoy hay dos maneras distintas de pintar lo mismo

- `Toaster` y `Alert` la montan con `Button iconOnly variant="ghost"` — de ahí
  **el fondo al pasar por encima**, que es el hover del `ghost` y que el
  operador **no quiere**.
- `Modal` no usa `Button`: pinta un elemento propio con sus tokens
  (`.modal__close`), y **no tiene hover ninguno**.

Unifícalas en **una sola pieza de cierre** con el comportamiento que quiere el
operador: **hover sin fondo**. Decide tú la forma (componente propio, variante
del `Button`, lo que encaje con el criterio del repo) y **justifícala en la
nota**.

**Barrido ya medido** — el aspa o un cierre aparece en estos, revísalos todos y
reemplaza donde proceda:

```
Modal · Alert · Toaster · ConfirmDialog · Consent · ImageCropDialog
CommandPalette · FloatingDock · SiteHeader · AppHeader · AvatarUpload
```

No todos son el mismo caso: mira cuáles son «cerrar este contenedor» y cuáles
son otra cosa (quitar un elemento de una lista, por ejemplo). **Los que no sean
el mismo caso, déjalos y dilo en la nota.**

Cuida al reemplazar: el nombre accesible de cada aspa **no se pierde ni se
uniformiza** — «Cerrar», «Descartar aviso», «Quitar a fulano» dicen cosas
distintas y así deben seguir.

## 2. Los botones de los diálogos, a ancho completo en móvil

**Todas las modales**, no solo la del recorte: por debajo del punto de ruptura
los botones del pie ocupan el ancho y se apilan. Esto ya está resuelto en el
`Form` (`.form__actions--block`, `column-reverse` para que la principal quede
arriba): **mira cómo lo hace y sigue el mismo criterio** en vez de inventar
otro, incluido el detalle del orden.

El botón **«Cancelar» se queda** (decisión del operador) y sigue siendo
secundario: no lo pases a `text`.

## 3. `ImageCropDialog`

- El título deja de ser «Recorta tu logo» y pasa a ser **«Recortar imagen»**: es
  una acción, no una invitación, y ahí sobra la segunda persona. Recuerda que el
  copy lo pone el consumidor: lo que cambia aquí es el texto por defecto si lo
  hay, y el ejemplo de las stories y el MDX.
- **Fuera la frase de ayuda** «Arrastra para reposicionar. La vista previa
  muestra cómo se verá.» El operador la quita: nombra una «vista previa» que es
  justo lo que estás mirando, y «reposicionar» no es lo que hace nadie con las
  manos. Si la pieza la impone, quítala; si la pone el consumidor, deja el hueco
  y dilo en la nota para que el hub la retire.

## 4. `AvatarUpload`: el avatar, mucho más grande

En el paso del logotipo el avatar sigue siendo pequeño para una pantalla donde
**es el protagonista y además es la zona donde se suelta la imagen**. Añade el
peldaño que falte a la escala de `Avatar` y úsalo ahí. **Justifica el tamaño**:
tiene que ser cómodo como diana de arrastre, y seguir cabiendo en un móvil de
375px con su botón al lado.

## Comprobación

`pnpm lint`, `npx tsc -b`, `pnpm test`, `pnpm test:stories` (163 ficheros / 1346
tests ahora) y `pnpm release:check`. Mira los diálogos a 375px y a 1280, en
claro y oscuro, y comprueba el recorrido de teclado de las aspas que cambies.

## Entrega

**No toques el monorepo `slxd`**: la adopción va después del release. Commits al
estilo del repo, uno por bloque. Nota en `notes/` con qué aspas reemplazaste,
cuáles no y por qué. Borra este fichero al terminar; no se commitea.
