# Nota de entrega — `tabla-y-fecha`

Rama `tabla-y-fecha`, un commit (`feat: alineación por columna en DataTable y textos
del calendario en DatePicker`) con `dist/` regenerado. `pnpm release:check` en verde;
`test:stories` verde para los cuatro ficheros tocados. **Sin release**: la entrada del
CHANGELOG está bajo «## Sin publicar» y le corresponde un **minor** (props y API
nuevas, nada roto).

---

## 1. `DataTable` — alineación por columna

La alineación viaja en la columna, por `meta` de TanStack:

```tsx
import type { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<User, unknown>[] = [
  { accessorKey: 'name', header: t('cols.name') },              // start (default)
  { accessorKey: 'amount', header: t('cols.amount'), meta: { align: 'end' } },
  {
    id: 'actions',
    header: () => t('cols.actions'),                            // ya sin <Inline>
    cell: ({ row }) => <DotsButton … />,                        // ya sin <Inline>
    meta: { align: 'center' },
  },
];
```

- `align?: 'start' | 'center' | 'end'`, exportado también como tipo
  `DataTableAlign` desde `@studiolxd/brand/data-table`.
- Tipado por **module augmentation** de `ColumnMeta<TData, TValue>`: en cuanto la app
  importa cualquier cosa de `@studiolxd/brand/data-table`, `meta.align` sale en el
  autocompletado de todo `ColumnDef` del proyecto. No hay que declarar nada en el
  consumidor.
- Se aplica a **cabecera y celda a la vez**. `start` es el default y no emite clase.
- Clases emitidas (por si algún test las mira):
  `data-table__header-cell--center` / `--end` y `data-table__cell--center` / `--end`,
  siempre junto a la clase base (`data-table__header-cell`, `data-table__cell`).
  Solo `text-align`; sin tokens ni colores nuevos.
- Criterio documentado en el `.mdx`: números comparables a `end`; acciones y estados
  a `center`; texto —y los números que no se comparan, como un identificador— a `start`.

### Qué cambiar en `AdminUsersTable.tsx`

En `apps/hub/src/app/[locale]/(admin)/admin/users/AdminUsersTable.tsx`, columna
`actions`: quitar los dos `<Inline justify="center">` (el de `header` y el de `cell`)
y añadir `meta: { align: 'center' }` a la definición de la columna. El resultado visual
es el mismo y deja de repetirse el envoltorio en los dos sitios.

---

## 2. `DatePicker` — los textos del calendario

**Props sueltas, no un objeto `calendarLabels`.** `Calendar` no agrupa las suyas —las
declara planas en `CalendarProps`—, y `DatePicker` ya reexponía `calendarLabel` y
`openCalendarLabel` sueltas; agrupar solo estas seis habría dejado dos convenciones en
el mismo componente. Los nombres y los defaults son literalmente los de `Calendar`, así
que un `Pick<CalendarProps, …>` sigue siendo un tipo válido para pasarlas en bloque
desde el hook.

Nuevas en `DatePickerProps` (y por tanto en `DatePickerField`, que las hereda por su
`Omit`, y en `DateTimeField`, que las reexpone):

| Prop | Default castellano | Dónde se ve |
| --- | --- | --- |
| `previousMonthLabel` | «Mes anterior» | flecha izquierda, vista de días |
| `nextMonthLabel` | «Mes siguiente» | flecha derecha, vista de días |
| `previousYearsLabel` | «Años anteriores» | flecha izquierda, **vista de años** |
| `nextYearsLabel` | «Años siguientes» | flecha derecha, vista de años |
| `yearGridLabel` | «Elegir año» | `aria-label` de la rejilla de años |
| `gridLabel` | `calendarLabel` | `aria-label` de la rejilla de días |

La vista de años es la que abre el título del mes (el botón «septiembre de 2026»).
`gridLabel` mantiene el comportamiento de antes: sin pasarlo, la rejilla de días toma
el nombre del panel (`calendarLabel`).

### `DateTimeField` también

Antes no reexponía **ninguno** de los textos del `DatePicker`. Ahora acepta los seis de
arriba más `calendarLabel` (por defecto, la etiqueta del campo), `openCalendarLabel`,
`invalidMessage` y `maskLetters` — los mismos nombres y defaults que en `DatePicker`.

### Qué cambiar en `useDatePickerLabels.ts`

El hook puede devolver ya las seis, y el comentario «gap de brand» sobra:

```ts
export function useDatePickerLabels(): Pick<
  DatePickerFieldProps,
  | "openCalendarLabel"
  | "invalidMessage"
  | "maskLetters"
  | "previousMonthLabel"
  | "nextMonthLabel"
  | "previousYearsLabel"
  | "nextYearsLabel"
  | "yearGridLabel"
> {
  const t = useTranslations("common.datePicker");

  return {
    openCalendarLabel: t("openCalendar"),
    invalidMessage: t("invalid"),
    maskLetters: { day: t("maskDay"), month: t("maskMonth"), year: t("maskYear") },
    previousMonthLabel: t("previousMonth"),
    nextMonthLabel: t("nextMonth"),
    previousYearsLabel: t("previousYears"),
    nextYearsLabel: t("nextYears"),
    yearGridLabel: t("yearGrid"),
  };
}
```

Hacen falta cinco claves nuevas en `common.datePicker` de `@slxd/messages`
(`previousMonth`, `nextMonth`, `previousYears`, `nextYears`, `yearGrid`) en los seis
idiomas. El tipo de retorno vale igual para `DateTimeField`: sus props son las mismas.

`calendarLabel` sigue fuera del hook, por el motivo que ya dice su comentario: nombra el
campo concreto y lo pone cada call-site. `gridLabel` tampoco entra: cae solo a
`calendarLabel`.

---

## Lo que se ha tocado

- `src/stories/organisms/DataTable/` — `.tsx` (augmentation + clases), `.css`
  (alineación), `.stories.tsx` (story «Columnas alineadas»), `.test.tsx`, `.mdx`.
- `src/stories/molecules/DatePicker/` — `.tsx` (seis props nuevas), `.test.tsx`
  (dos casos: los rótulos llegan al calendario y a la vista de años; `gridLabel`
  cae a `calendarLabel`), `.mdx`.
- `src/stories/molecules/DateTimeField/DateTimeField.tsx` y `.mdx`,
  `src/stories/molecules/DatePickerField/DatePickerField.mdx`.
- `src/stories/foundations/Internacionalizacion.mdx` — fila de `DatePicker` reescrita
  y ampliada a `DatePickerField` y `DateTimeField`.
- `CHANGELOG.md` (§ «Sin publicar») y `dist/`.

## Decisiones que conviene saber

- **`start` no emite clase.** El default se queda con el `text-align` de `Table`, así
  que una columna sin `meta` produce exactamente el mismo marcado que antes: el cambio
  es aditivo y no puede mover ninguna tabla existente.
- **Doble clase** en el CSS (`.data-table__cell.data-table__cell--end`) para ganar a
  `.table__header`, que ya fija su propia alineación — la regla 4 de `CLAUDE.md`.
- **Sin `justify-content`.** El contenido de una celda alineada es inline (texto, un
  `Tag`, un botón, o el `<button>` `inline-flex` de la cabecera ordenable), así que
  `text-align` basta y no hay que convertir la celda en caja flex.
- **`invalidMessage` y `maskLetters` en `DateTimeField`** no estaban en el encargo,
  pero se añadieron: documentar en la tabla de Internacionalización que el campo
  traduce el calendario pero no su propio mensaje de error habría dejado un hueco raro
  a mitad de la misma fila.
