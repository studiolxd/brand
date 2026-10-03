# Handoff — grupo Overlays (Sheet, ConfirmDialog, Toast/Toaster)

## 1. Sección para `native/README.md`

### Sheet, ConfirmDialog y Toast (superposiciones)

| React | SwiftUI | Uso |
| --- | --- | --- |
| `Sheet` | `brandSheet(isPresented:…)` · `BrandSheetContent` | Hoja nativa (`.sheet`) con cabecera, aspa y pie de marca |
| `ConfirmDialog` | `brandConfirmDialog(isPresented:…)` · `BrandConfirmDialog` | Diálogo de confirmación superpuesto |
| `Toast` / `Toaster` | `ToastCenter` · `toastHost(…)` | Cola de avisos y su pila sobre la raíz |
| `CloseButton` (mínimo necesario) | `BrandCloseButton` | El aspa de los tres anteriores |

```swift
// Sheet — título obligatorio; el pie se escribe con Cancelar primero y la acción principal al final.
Button("Filtros") { showFilters = true }
    .brandSheet(isPresented: $showFilters, title: "Filtros", description: "Afina los resultados") {
        FilterForm()
    } footer: {
        BrandDialogButton("Cancelar", variant: .outline) { showFilters = false }
        BrandDialogButton("Aplicar") { apply(); showFilters = false }
    }

// ConfirmDialog — `confirmLabel` nombra lo que va a pasar; `onConfirm` es async: ocupado mientras corre,
// se cierra al terminar y, si lanza, sigue abierto (`onConfirmError`).
.brandConfirmDialog(
    isPresented: $askDelete, title: "¿Eliminar la vivienda?",
    description: "Se borrarán sus documentos. No se puede deshacer.",
    confirmLabel: "Eliminar la vivienda", destructive: true
) { try await repository.delete(home) }
// Con frase: confirmPhrase: .init("Casa del lago", label: "Escribe «Casa del lago»", mismatch: "No coincide")
// Con tercera acción: secondaryActionLabel: "Archivar", onSecondaryAction: { … }

// Toast — monta el host una vez en la raíz y lanza avisos desde cualquier sitio.
WindowGroup { RootView().toastHost(position: .bottomRight) }
ToastCenter.shared.success("Cambios guardados")
let id = ToastCenter.shared.loading("Subiendo…")
ToastCenter.shared.error("No se pudo subir", id: id, description: "Revisa la conexión.")   // actualiza en su sitio
try await ToastCenter.shared.promise(loading: "Guardando", success: { _ in "Guardado" }, error: { _ in "Falló" }) { try await save() }
```

`BrandDialogButton` es `BrandButton` a todo el ancho cuando el pie va apilado (contenedor < 480 pt). Los textos propios
(`closeLabel`, `cancelLabel`, `pendingLabel`, `containerLabel`) son parámetros con el castellano por defecto.

## 2. Bullets para `CHANGELOG.md`

- native: `Sheet` (`brandSheet`), `ConfirmDialog` (`brandConfirmDialog`) y `Toast`/`Toaster` (`ToastCenter` + `toastHost`)
  en SwiftUI, con fichas de paridad (`Sheet`, `ConfirmDialog`, `Toaster`, `Toast`) y capturas en claro y oscuro (iOS y macOS).
- native: `BrandCloseButton` y `BrandDialogFooter`/`BrandDialogButton` (pie que apila con la acción principal arriba).

## 3. Diferencias deliberadas con React

Están en el campo `differences` de cada ficha. Resumen:
- **Sheet**: hoja nativa con detents y arrastre; sin `side` (solo abajo); `Esc` = acción de escape de VoiceOver/atajo macOS.
- **ConfirmDialog**: tarjeta propia sobre un velo (no el `.alert` nativo, que no admite marca, frase ni tercera acción);
  `onConfirm` siempre cierra al terminar; foco inicial por VoiceOver; el campo de la frase es propio (swap por `InputField` cuando exista).
- **Toast**: anuncio por `AccessibilityNotification`; pila desplegada con puntero; descarte por deslizamiento (40 pt de Base UI).
- Los colores sobre macOS salen algo apagados en las capturas por el espacio de color de `NSHostingView`; en iOS son sRGB exactos.
- **Posible fallo de React (no tocado)**: en superficie oscura, el `Toast` neutro (relleno blanco) pierde el aspa — el
  `Toaster` pone `.surface-dark` en todo salvo `warning`, y sobre el relleno blanco el aspa queda blanca. El `Alert` usa
  `.surface-invert` para esto. Nativo lo pinta bien (aspa oscura).

## 4. Tokens

- Ninguno añadido a los JSON. `NATIVE_COMPONENT_GROUPS` ya traía `sheet`, `modal`, `confirm-dialog`, `toast`, `alert`, `close-button`.
- No generados (funciones de CSS): `sheet.inline-size` (`min(20rem, 85vw)`), `sheet.block-size`, `modal.max-height`. Valores
  copiados y anotados en la ficha: ancho mínimo macOS de la hoja 320 pt; umbral del pie apilado 480 pt (consulta de contenedor).
- `BrandHitTarget.minimum` (44 pt) es del soporte común.

## 5. Decisiones para el responsable de brand

1. ¿ConfirmDialog como tarjeta propia (aspecto de marca idéntico a React) o `.alert`/`confirmationDialog` nativo (más
   nativo, pero sin frase de confirmación ni tercera acción)? Se ha elegido lo primero; Homenize cambia su `confirmDialog(...)` por `brandConfirmDialog`.
2. ¿Corregir en React el aspa del `Toast` neutro en oscuro (ver arriba)?
3. ¿Soporte de `side` lateral en iPad/macOS (hoy solo hoja inferior)?

## 6. Pruebas

- macOS: `swift test --filter "OverlaysSnapshotTests|OverlaysLogicTests|ParityTests"` en verde (12 capturas × 2 esquemas + 7 de lógica).
- iOS (iPhone 16e, simulador): ver estado final en el informe del worker.
