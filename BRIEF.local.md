# Brief: el campo de fecha se escribe, se borra y navega por años

Repo `@studiolxd/brand`, rama `campo-fecha`. Lee `CLAUDE.md` antes. Componentes:
`src/stories/molecules/DatePicker`, `DatePickerField`, `DateTimeField`, `Calendar`.

## 1. `DatePicker`: input editable con formato numérico, no un botón con texto

Hoy el disparador es un `<button>` que pinta «vie, 25 sept 2026» y no se puede
ni escribir ni borrar. Tiene que ser un `Input` del DS **editable**:
- Muestra y acepta el formato numérico corto del locale (`Intl.DateTimeFormat`
  con `day: '2-digit', month: '2-digit', year: 'numeric'` → `25/09/2026` en es,
  `09/25/2026` en en-US, `25.09.2026` en de). El placeholder enseña la máscara
  del locale (`dd/mm/aaaa`). Al escribir una fecha válida completa se emite
  `onChange(date)`; incompleta o inválida → estado de error del Input con
  mensaje (prop con default) y no se emite. Se parsea con el orden de partes
  del propio `Intl` (`formatToParts`), no a mano por locale.
- **Se puede borrar**: vaciar el input emite `onChange(null)`; la firma pasa a
  `onChange?: (date: Date | null) => void` (breaking: anótalo en CHANGELOG como
  major y actualiza `DatePickerField`/`DateTimeField` y stories/tests).
- El calendario se abre con un botón de icono (calendario) al final del input
  (`Input` con `endAdornment` o el patrón que ya tenga el DS para ello) y al
  elegir un día se cierra y rellena el input. Teclado: flecha abajo desde el
  input abre el calendario; Escape cierra.
- `readOnly`/`disabled` como hasta ahora.

## 2. `Calendar`: pulsar «septiembre de 2026» lleva a elegir año

El título del mes pasa a ser un botón. Al pulsarlo se enseña una rejilla de
**años** (12 por página, con las mismas flechas navegando de docena en docena)
y al elegir año se vuelve al mes, en ese año (opcional: paso intermedio de
meses si te parece más natural — decide y justifica en la nota). Accesible:
`aria-live` en el título, nombres accesibles en las flechas según la vista
(«Años anteriores»/«Siguientes»), foco gestionado al cambiar de vista. Story
«Elegir año» y tests. Tokens nuevos por referencia en `tokens/molecule/calendar.json`.

## 3. Las flechas del calendario no llevan línea al pasar el ratón

`.calendar__nav:hover` pinta hoy una línea de tinta debajo (`hover-line`).
Quítala de las flechas (quedan sin subrayado: solo cambio de color de tinta si
hace falta, con un token existente); los días sí conservan su línea. Ajusta el
comentario del token si deja de aplicar a las flechas.

## Reglas
- Sin colores nuevos; tokens por referencia; sin `text-decoration: underline`.
- `pnpm build:all` y `pnpm release:check` verdes; `test:stories` solo si lo
  pide el operador. CHANGELOG bajo «## Sin publicar». Commits en español. Sin
  merge/release. Entrega en `NOTA-ENTREGA.local.md`.
