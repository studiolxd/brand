# Brief: alineación por columna en `DataTable` y textos del calendario en `DatePicker`

Repo `@studiolxd/brand`, rama `tabla-y-fecha`. Lee `CLAUDE.md` entero.
Consumidor de referencia (SOLO LECTURA): `/Users/suvi/Dev/slxd` — `apps/hub/src/app/[locale]/(admin)/admin/users/AdminUsersTable.tsx`
(columna `actions`, hoy centrada a mano con `Inline justify="center"` en
cabecera y celda) y `packages/app-shell/src/useDatePickerLabels.ts` (el hook
que traduce los textos del `DatePicker`; verás el comentario sobre lo que no
puede traducir).

## 1. `DataTable`: alineación por columna

`src/stories/organisms/DataTable/`. Hoy no hay forma de alinear una columna
(acciones, números, estados): cada app lo envuelve a mano. Añade soporte por
`meta` de la columna de TanStack: `meta: { align: 'start' | 'center' | 'end' }`
(tipa `ColumnMeta` con module augmentation, como recomienda TanStack), que la
tabla traduce a modificadores BEM en **cabecera y celda** (`data-table__cell--center`,
`data-table__header-cell--center`, etc.; `start` es el default y no emite
clase). Solo `text-align`/`justify-content` por token si hace falta; sin
colores. Story «Columnas alineadas» (una numérica a `end`, una de acciones a
`center`) y tests. Documenta en el `.mdx` cuándo usar cada alineación
(números a `end`, acciones/estado a `center`).

## 2. `DatePicker` / `DatePickerField` / `DateTimeField`: los textos del calendario

`DatePicker` monta un `Calendar` en su popover pero **no reenvía** sus textos:
`previousMonthLabel`, `nextMonthLabel`, `gridLabel`, `previousYearsLabel`,
`nextYearsLabel`, `yearGridLabel` (y cualquier otro de `CalendarProps` que sea
texto) — así en las apps la vista de años y las flechas salen siempre en
castellano. Añade a `DatePickerProps` esas props (mismos nombres y defaults
que `Calendar`) y pásalas; `DatePickerField` y `DateTimeField` las reexponen.
Mejor un único objeto `calendarLabels?: Pick<CalendarProps, …>` si `Calendar`
ya agrupa los suyos así; si no, props sueltas con los mismos nombres —
decide por coherencia con lo que hay y dilo en la nota. Actualiza la tabla de
Fundamentos › Internacionalización y tests (un `DatePicker` con
`nextYearsLabel="Next years"` lo enseña al abrir la vista de años).

## Reglas
- Sin colores nuevos; tokens por referencia; sin `text-decoration: underline`.
- `pnpm build:all` y `pnpm release:check` verdes; `test:stories` solo de los
  ficheros tocados (`pnpm vitest run --project=storybook <ruta>`).
- CHANGELOG bajo «## Sin publicar» (minor). Commits en español. Sin release.
- Entrega: `NOTA-ENTREGA.local.md` con la API final para cablearla en slxd.
