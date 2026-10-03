# Handoff — núcleo (Button, Heading, Paragraph, Text, Icon)

## README (sección de componentes)

### Button
`ButtonStyle` aplicable a cualquier `Button` nativo, más la vista de conveniencia `BrandButton`.

```swift
Button("Guardar") { save() }.buttonStyle(.brand(.primary))
BrandButton("Eliminar", variant: .outline, destructive: true) { delete() }
BrandButton(icon: .close, accessibilityLabel: "Cerrar", variant: .ghost) { dismiss() }   // iconOnly
```

### Heading, Paragraph, Text
```swift
BrandHeading("Tus viviendas")                          // h2; VoiceOver lo anuncia como encabezado
BrandHeading("Resumen", level: .h2, size: .s5)         // un h2 con el tamaño de un h4
BrandParagraph("Revisa los datos.", size: .small)
Text("Esta acción ") + Text("borra").brand(.strong, tone: .destructive) + Text(" el curso.")
```

### Icon
```swift
BrandIcon(.search)                  // 24 pt; xs 8 · sm 16 · md 24 · lg 48 · xl 64 · text = 1em
BrandIcon(.check, size: .sm).foregroundStyle(BrandColorRoles.successText)
```
Los trazos se generan desde `Icon.tsx` (`pnpm build:native-icons`): mismos 77 iconos, retícula de 24 y trazo de 1 pt.

## Diferencias con React
- `Text.brand(.strong)` usa `fontWeight(.medium)` de SwiftUI sobre una fuente variable de CoreText: el cambio de peso 300 → 500 es sutil.
