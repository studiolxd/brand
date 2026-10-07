# Paridad entre React y las versiones nativas

Cada componente que se porta a nativo lleva una **ficha** en `components/<Componente>.json`. La ficha es el contrato:
qué props de React existen en SwiftUI y Compose, con qué casos, y cuáles se dejan fuera y por qué. Tres comprobaciones
automáticas la hacen cumplir:

| Qué compara | Dónde | Cómo se ejecuta |
| --- | --- | --- |
| ficha ↔ **React** | `scripts/native-parity.mjs` | `pnpm native:parity` (también en `pnpm release:check`) |
| ficha ↔ **Swift** | `ParityTests` + `ParityRegistry.swift` | `swift test` |
| ficha ↔ **Kotlin** | `ParityTest` (`ParityTest.kt`) | `./gradlew build` |


## La ficha

El esquema es [`schema.json`](schema.json) (JSON Schema draft-07). Ejemplo para un `Button`:

```json
{
  "$schema": "../schema.json",
  "component": "Button",
  "react": { "path": "src/stories/atoms/Button/Button.tsx", "props": "ButtonProps" },
  "native": { "swift": "BrandButton", "kotlin": "BrandButton" },
  "props": {
    "variant": { "type": "union", "values": ["primary", "outline", "ghost", "text"], "default": "primary" },
    "size": { "type": "union", "values": ["sm", "md", "lg"], "default": "md" },
    "destructive": { "type": "boolean", "default": false }
  },
  "excluded": [
    { "prop": "block", "reason": "En nativo el ancho lo decide el contenedor." },
    { "prop": "href", "reason": "La navegación la resuelve la app, no el componente." }
  ]
}
```

Lo que en SwiftUI no es una vista que se coloca sino algo que se monta desde una
vista ajena (una hoja, un diálogo, el host de toasts) se presenta con un
modificador. La ficha lo nombra en `native.swiftModifier`, sin punto ni
argumentos, y deja en `native.swift` la vista pública que ese modificador pinta:

```json
"native": { "swift": "BrandSheetContent", "swiftModifier": "brandSheet", "kotlin": "BrandSheet" }
```

- **`component`** — el nombre del componente de React; la ficha se llama igual (`Button.json`).
- **`react`** — `path` del `.tsx` y `props`, el tipo o interfaz **exportado** que describe sus props.
- **`native`** — cómo se llama el componente en cada plataforma.
- **`props`** — las props que SÍ existen en nativo. Dos tipos: `union` (una unión de literales de texto, con `values`) y
  `boolean`. `default` es informativo.
- **`excluded`** — props que NO se portan, con su `reason` (mínimo 10 caracteres: un porqué de verdad, no «n/a»).
- **`differences`** *(opcional)* — frases con lo que se queda **a propósito** distinto de React (límites de SwiftUI/Compose,
  convenciones de la plataforma). Lo que no se pueda igualar se aproxima y se explica ahí; las parejas de
  `native/apple/Comparisons/` lo enseñan.

Dos casos que el esquema cubre además de los de arriba:

- **Uniones numéricas** (`level: 1 | 2 | … | 6`): los valores van como texto (`"1"`…`"6"`) y en nativo el enum lleva
  `Int` de `rawValue` (el registro de Swift los compara como `String($0.rawValue)`).
- **Un booleano con literales extra** (`block: boolean | 'mobile'`): `"type": "boolean"` y, en `reactOnlyValues`, los
  literales que solo existen en la web (`["mobile"]`); `native:parity` exige que sean exactamente los de React.

### Alias obsoletos

Un renombrado de la API (v51: `Tag variant` → `tone`, `Paragraph size="small"` → `sm`) deja el nombre viejo como
alias obsoleto durante un major. La ficha lo declara para que la paridad siga siendo exacta:

- **Una prop obsoleta** va en `deprecated`, con la prop que la sustituye: `{ "prop": "variant", "replacement": "tone" }`.
  En React tiene que llevar `@deprecated` en su JSDoc, y `replacement` tiene que estar en `props`. No se registra en las
  pruebas nativas: en Swift es un inicializador o parámetro `@available(*, deprecated, renamed: "…")` y en Kotlin una
  sobrecarga `@Deprecated(…, ReplaceWith("…"))`.
- **Un literal obsoleto** de una unión va en `deprecatedValues` de esa prop (`"values": ["sm", "md", "lg"],
  "deprecatedValues": ["small", "default", "large"]`). `values` + `deprecatedValues` son exactamente los literales de
  React. En nativo **no son casos del enum** —el enum tiene exactamente `values`—, sino miembros estáticos obsoletos
  que devuelven el caso nuevo: `@available(*, deprecated, renamed: "sm") public static let small = Self.sm` en Swift,
  y en el `companion object` del enum de Kotlin `@Deprecated(…, ReplaceWith("ParagraphSize.Sm")) val Small = Sm`.

### Qué comprueba `pnpm native:parity`

Lee el `.tsx` con el compilador de TypeScript (el mismo `tsconfig.app.json`) y comprueba que:

1. la ficha cumple el esquema y se llama `<component>.json`;
2. `react.path` existe y exporta `react.props`;
3. cada prop de `props` existe en React y su tipo coincide: una `union` declara **exactamente** los literales de React (ni
   uno de más ni uno de menos); un `boolean` es booleano en React;
4. cada `excluded.prop` existe en React y no está también en `props`;
5. **toda prop propia** del componente (declarada en el repositorio, no heredada de `ComponentPropsWithoutRef<'button'>`
   y compañía) está en `props`, en `excluded` o en `deprecated`. Portar un componente es decidir cada prop; no se puede
   olvidar una;
6. cada `deprecated.prop` existe en React con `@deprecated` y su `replacement` está en `props`, y ningún literal está a
   la vez en `values` y en `deprecatedValues`.

## Las pruebas nativas

Las pruebas de cada plataforma recorren `components/*.json` y comprueban que el componente nativo expone **exactamente**
los casos de la ficha. Para que lo vean, cada componente nativo se **registra** en la prueba. Hay un registro por
plataforma; con cero fichas están vacíos.

**Swift** — enums `CaseIterable` cuyo `rawValue` es el valor de React:

```swift
public enum ButtonVariant: String, CaseIterable, Sendable {
    case primary, outline, ghost, text
    // un valor que no es un identificador válido: case iconOnly = "icon-only"
}
```

```swift
// native/apple/Tests/StudiolxdBrandTests/Parity+<Grupo>.swift  (ParityRegistry.swift los compone)
let coreParity: [String: [String: [String]]] = [
    "Button": [
        "variant": ButtonVariant.allCases.map(\.rawValue),
        "size": ButtonSize.allCases.map(\.rawValue),
    ],
]
```

**Kotlin** — `enum class` con el valor de React en una propiedad (el identificador sigue la convención de Kotlin):

```kotlin
enum class ButtonVariant(val value: String) { Primary("primary"), Outline("outline"), Ghost("ghost"), Text("text") }
```

```kotlin
// native/android/brand/src/test/kotlin/com/studiolxd/brand/ParityTest.kt
private val parityRegistry: Map<String, Map<String, List<String>>> = mapOf(
    "Button" to mapOf(
        "variant" to ButtonVariant.entries.map { it.value },
        "size" to ButtonSize.entries.map { it.value },
    ),
)
```

La prueba falla si una ficha no tiene registro, si el registro no tiene ficha, si el enum tiene un caso de más o de
menos respecto a la ficha, o si el componente expone una prop `union` que la ficha no declara (o que excluye).
Los booleanos no se registran: no tienen casos que enumerar.

## Flujo para portar un componente

1. Escribir la ficha y pasar `pnpm native:parity` (dice qué props faltan por decidir).
2. Implementar el componente en SwiftUI y en Compose, con los enums de la ficha.
3. Registrarlo en `ParityRegistry.swift` y `ParityTest.kt`.
4. Añadir sus capturas (una por variante y estado, en claro y oscuro) y grabarlas.
5. Todo, en el mismo commit; `pnpm release:check -- --with-native` en verde.
