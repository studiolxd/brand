# Handoff — Forms (InputField, NumberInputField, SelectField)

## 1. Sección para `native/README.md`

### Campos de formulario

Los tres comparten etiqueta, ayuda, mensaje de error y talla (`size`: `sm`/`md`/`lg`, o la del entorno con
`.brandControlSize(_:)`). El texto de error y la ayuda se enlazan al control como pista de VoiceOver. `disabled` es el
modificador `.disabled(_:)` de SwiftUI. Los textos propios (`clearLabel`, `decrementLabel`, `incrementLabel`,
`placeholder`) son parámetros con el castellano por defecto.

| React | SwiftUI | Se usa así |
| --- | --- | --- |
| `InputField` | `BrandInputField` | `BrandInputField("Correo", text: $email, type: .email, helperText: "Te escribiremos aquí")` |
| `InputField kind="search"` | `BrandInputField(kind: .search)` | `BrandInputField("Buscar", text: $q, labelHidden: true, kind: .search, clearable: true)` |
| `NumberInputField` | `BrandNumberInputField` | `BrandNumberInputField("Cantidad", value: $qty, min: 0, max: 99)` (con `decimal: true` admite coma o punto) |
| `SelectField` | `BrandSelectField` | `BrandSelectField("Idioma", selection: $lang, options: [.option("es", "Español"), .option("en", "Inglés")])` |

`BrandSelectField` admite grupos (`.group(label: "España", options: [...])`); el desplegable es un `Menu` nativo.
`BrandNumberInputField` es ajustable para VoiceOver (deslizar arriba/abajo suma/resta un paso).

## 2. Bullets para `CHANGELOG.md`

- native: `BrandInputField` (tipos text/email/password/number/tel/url, búsqueda con lupa y aspa, error, ayuda,
  solo lectura), `BrandNumberInputField` (botones −/+, min/max/step, decimales, ajustable con VoiceOver) y
  `BrandSelectField` (disparador de Brand sobre un `Menu` nativo, con grupos), con sus fichas de paridad y capturas.
- native: `BrandFieldLayout`/`BrandFieldBox` internos con la etiqueta, la ayuda, el error y el cuadro de campo comunes.

## 3. Diferencias deliberadas con React

- `BrandSelectField`: el desplegable es un `Menu` nativo (con `Picker` en línea), no la lista de Base UI; marca de
  verificación en la elegida; el chevron no gira al abrir (SwiftUI no informa del estado del menú).
- `BrandNumberInputField` ocupa el ancho del contenedor; el de React es `inline-flex` (~224 px). El ancho en SwiftUI lo
  decide la maqueta (`.frame(maxWidth: 240)` si se quiere compacto).
- `readOnly` en `BrandInputField` pinta un `Text` seleccionable (`TextField` no tiene solo lectura).
- `type`: en iOS fija teclado y rellenado automático; en macOS solo `password` cambia (campo seguro).
- Valores controlados siempre (`Binding`): no hay `defaultValue`.
- Zonas táctiles de 44 pt en iOS (aspa de borrado, botones ±, disparador del select) y tipo dinámico en alturas y letra.
- El texto de error y la ayuda se ocultan a VoiceOver como elementos sueltos: se leen como pista del control.

## 4. Tokens

- No se añadió ningún grupo ni token. Se usan `Brand{Input,InputField,NumberInput,NumberInputField,Select,SelectField,Label,Form}Tokens`.
- `number-input.btn-bg` vale `transparent`, que el generador nativo no emite como color (solo `#hex`/`rgba()`): se omite el
  fondo del botón. Posible mejora del generador: emitir `transparent` como `Color.clear`.
- Los selectores deshabilitados usan los tokens `input.disabled-*` (React reutiliza los del input a través del campo; el
  grupo `select` no tiene `disabled-*` propios).

## 5. Decisiones para el responsable de brand

- ¿Quiere el `NumberInputField` nativo compacto por defecto (ancho intrínseco) como en la web?
- `BrandSelectField` abre un `Menu` del sistema; si se prefiere una lista propia con el aspecto de Base UI hay que
  construir un popover propio (se pierde el comportamiento nativo). Recomendación: mantener el `Menu`.
- Mensajes de error: el campo no anuncia el error al aparecer (`AccessibilityNotification`), solo lo expone como pista.

## 6. Pruebas

- `swift test` (macOS): `FormsSnapshotTests`, `FormsLogicTests` y paridad en verde.
- iOS (iPhone 17 Pro, `xcodebuild test`): `FormsSnapshotTests` y `FormsLogicTests` en verde (grabadas y verificadas en una segunda pasada).
- Parejas con React en `native/apple/Comparisons/{InputField,NumberInputField,SelectField}/` (claro y oscuro, mismo factor de reducción con `pair-comparison.sh`): coinciden en medidas, colores y espaciado; las únicas diferencias son las listadas arriba (el `NumberInputField` se compara a 224 pt, el ancho de la story).
