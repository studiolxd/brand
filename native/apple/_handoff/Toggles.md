# Handoff — grupo Toggles (SwitcherField, ToggleGroup, ThemeSwitcher, Tag)

## 1. Sección para `native/README.md`

### Tag, interruptores, grupos de botones y selector de tema

| React | SwiftUI | Cómo se usa |
| --- | --- | --- |
| `Tag` | `BrandTag` | `BrandTag("Pagado", variant: .success)` |
| `SwitcherField` / `Switcher` | `BrandSwitcherField` y `ToggleStyle` `.brandSwitch` | `BrandSwitcherField("Avisarme por correo", isOn: $notify, helperText: "Un resumen al día.")` |
| `ToggleGroup` / `Toggle` | `BrandToggleGroup` + `BrandToggleGroupItem`, y `ToggleStyle` `.brandToggle` | ver abajo |
| `ThemeSwitcher` | `BrandThemeSwitcher` | `BrandThemeSwitcher(value: $theme, variant: .list)` |

```swift
// Tag: las diez variantes de React (`primary`, `accent1` = "accent-1", …, `danger`)
BrandTag("Administrador", variant: .primary)

// Interruptor suelto sobre un Toggle nativo, o como campo con ayuda y error
Toggle("Notificaciones", isOn: $on).toggleStyle(.brandSwitch(size: .sm))
BrandSwitcherField("Acepto las condiciones", isOn: $accepted, errorMessage: "Debes aceptarlas.")

// Selección exclusiva (valor opcional) o múltiple (conjunto); `.accessibilityLabel` nombra el grupo
BrandToggleGroup(selection: $plan) {
    BrandToggleGroupItem("Mensual", value: Plan.monthly)
    BrandToggleGroupItem("Anual", value: Plan.yearly)
}
.accessibilityLabel("Plan")
BrandToggleGroup(selection: $filters, multiple: true, size: .sm) { … }

// Solo la vista: el valor (y aplicar el tema) lo guarda la app
BrandThemeSwitcher(value: $theme)                              // compact, etiqueta delante
BrandThemeSwitcher(value: $theme, layout: .stacked)            // etiqueta encima, a todo el ancho
BrandThemeSwitcher(value: $theme, variant: .icon, size: .sm)   // solo icono, abre un menú
```

## 2. Bullets para `CHANGELOG.md`

- native (SwiftUI): `BrandTag` (10 variantes), `BrandSwitcherField` + `ToggleStyle.brandSwitch`, `BrandToggleGroup`/`BrandToggleGroupItem` + `ToggleStyle.brandToggle`, `BrandThemeSwitcher` (compact/list/icon, inline/stacked), con fichas de paridad, capturas (claro/oscuro, iOS y macOS) y comparación con Storybook.

## 3. Diferencias deliberadas con React

- **Tag**: los casos con guion son `accent1`, `support2`… en Swift (el `rawValue` es `accent-1`…); no es un control, VoiceOver lo lee como texto.
- **SwitcherField**: `label` es el primer argumento; el estado es `Binding<Bool>`; `required`, `name`, `value`, `id`, `onBlur` no existen. Con `labelHidden` el texto sigue nombrando el control. El error se anuncia con `AccessibilityNotification.Announcement` (≈ `role="alert"`). La pista usa em×16 pt escaladas con el tipo dinámico. Zona táctil ≥ 44 pt en iOS.
- **ToggleGroup**: la selección es `Set<Value>` (o `Value?` en exclusivo) y el valor puede ser cualquier `Hashable`; los elementos son `BrandToggleGroupItem`. No hay «una sola parada de tabulador con flechas»: cada elemento es un botón enfocable. El nombre accesible es `.accessibilityLabel`.
- **ThemeSwitcher**: en `compact` e `icon` el desplegable es un `Menu` nativo: la lista flotante es del sistema (sin borde rectangular de brand) y usa SF Symbols (sol, luna, ordenador) en lugar de los iconos de brand; el chevron no gira al abrir. `list` envuelve a otra línea con tipo dinámico grande. `labels` es la struct `ThemeSwitcherLabels` (defaults castellanos).
- El valor `value` de `ThemeSwitcher` es el enum `BrandThemeChoice` (`light`/`dark`/`system`).

## 4. Tokens

- No faltó ninguno ni se tocó ningún JSON. Todos los grupos (`switcher`, `switcher-field`, `toggle`, `toggle-group`, `theme-switcher`, `tag`, `dropdown-field`, `label`, `link`, `icon`) ya salían en `BrandComponentTokens.swift`.
- Valores en `em` de `switcher.*` (`track-width: 2.75em`…): se multiplican por 16 pt (cuerpo de la superficie de aplicación) y se escalan con el tipo dinámico.

## 5. Decisiones para el responsable de brand

- ¿El selector de tema nativo debería tener un desplegable propio (con el borde de brand y los iconos de brand) en vez del `Menu` del sistema? Hoy se prefiere el menú nativo (gestos, accesibilidad, macOS) a costa del aspecto de la lista flotante.
- ¿Teclado en `ToggleGroup`: se quiere el recorrido con flechas de Base UI? SwiftUI no lo da gratis; habría que construir un `focusSection` propio.

## 6. Estado de pruebas

- macOS (`swift test`): `TogglesSnapshotTests`, `TogglesLogicTests`, `ParityTests` en verde.
- iOS (iPhone 17e, `xcodebuild test`): `TogglesSnapshotTests`, `TogglesComparisonSnapshotTests` y `TogglesLogicTests` en verde (grabadas y comprobadas en una segunda pasada).
- Comparaciones: `native/apple/Comparisons/{Tag,SwitcherField,ToggleGroup,ThemeSwitcher}/` (pares react/ios a la misma escala, generadas con `pair-comparison.sh`; los tests `TogglesComparisonSnapshotTests` reproducen la composición de cada story). Las capturas macOS se grabaron con el ayudante antiguo (P3); el responsable las regraba al integrar.
- `pnpm native:parity`: 8 fichas en verde (4 de la base + 4 de este grupo).
