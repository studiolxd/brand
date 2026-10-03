# Handoff — Lists (List/ListItem, EmptyState, Skeleton)

## 1. Sección para `native/README.md`

### List y ListItem — `BrandList`, `BrandListItem`

`type` (`unordered` | `ordered` | `plain`), con la tipografía de `text.list.*` y el aire `text.list.gap`. Cada hijo es una fila.

```swift
BrandList(type: .ordered) {
    BrandListItem("Abre la app")
    BrandListItem("Elige tu vivienda")
}

// Fila de ajustes (lo que Homenize llama ListRow): principal, secundario, accesorio final y separadores de brand
BrandList(type: .plain, showsSeparators: true) {
    BrandListItem(content: { Text("Notificaciones") }, secondary: { Text("Avisos de la comunidad") },
                  trailing: { BrandIcon(.chevron, size: .sm) })
}
```

### EmptyState — `BrandEmptyState`

`size` (`sm` | `md`), icono del catálogo (`BrandIconName`) o una vista, descripción y acción (`BrandButton` outline).

```swift
BrandEmptyState(title: "Sin viviendas", description: "Añade tu primera vivienda para empezar.",
                icon: .folder, action: EmptyStateAction("Añadir vivienda") { add() })
```

### Skeleton — `BrandSkeleton`

`width`, `height` (puntos) y `circle`. Barrido de `skeleton.duration`; con «Reducir movimiento», fondo plano. Es decorativo: anuncia la carga en el contenedor.

```swift
VStack { BrandSkeleton(width: 160); BrandSkeleton(width: 48, height: 48, circle: true) }
    .accessibilityElement(children: .ignore).accessibilityLabel("Cargando")
```

## 2. Bullets para `CHANGELOG.md`

- `BrandList`/`BrandListItem`, `BrandEmptyState` y `BrandSkeleton` (SwiftUI), con fichas de paridad `List`, `ListItem`, `EmptyState` y `Skeleton`, capturas en claro/oscuro (iOS y macOS) y comparación con React en `native/apple/Comparisons/`.

## 3. Diferencias deliberadas con React

- `List`: `showsSeparators` (solo nativo, tokens `separator.*`) y `secondary`/`trailing` en `BrandListItem` cubren la fila `ListRow` de Homenize; React no tiene separadores ni accesorios.
- Marcas de lista como texto (• / 1.) en la sangría de `text.list.padding-inline-start`; numeración con `_VariadicView` porque `Group(subviews:)` exige iOS 18.
- `Skeleton`: alto por defecto `1lh` → cuerpo × interlineado (24 pt) escalado con el tipo dinámico; `width`/`height` son `CGFloat?`.
- `EmptyState`: rótulo con rasgo de encabezado (VoiceOver); `href` de la acción no existe en nativo.
- Dynamic Type: textos, iconos y alturas crecen; en la web son fijos.
- `native/apple/scripts/capture-story.mjs`: en mi rama apliqué el arreglo del selector hoja que pidió el coordinador (dos `waitForSelector`).

## 4. Tokens

Ninguno añadido ni faltante: `empty-state`, `skeleton`, `text` (list), `separator` ya estaban en `NATIVE_COMPONENT_GROUPS`. `skeleton.height` (`1lh`) no se genera (unidad de CSS): se calcula con `text.font-size` × `text.line-height`.

## 5. Decisiones para el responsable de brand

- ¿`showsSeparators` y `secondary`/`trailing` deben existir también en React (`List`/`ListItem`) para mantener la paridad, o se quedan como extensión nativa?
- ¿Aceptar `_VariadicView` hasta que el mínimo sea iOS 18?
- Un `SkeletonList` (filas de carga) no existe en React; Homenize lo usa: ¿se porta como composición?

## 6. Estado de pruebas

- macOS: `ListsSnapshotTests` + `ListsLogicTests` + `ParityTests` en verde, capturas grabadas.
- iOS (iPhone Air): ver informe final del worker.
