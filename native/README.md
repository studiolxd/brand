# Brand nativo (iOS, macOS y Android)

Las versiones nativas de Brand para apps de **SwiftUI** (iOS 17 y macOS 14) y **Jetpack Compose** (Android, minSdk 26).
Comparten con la web los mismos tokens —salen de los mismos JSON de `tokens/` con Style Dictionary— y se llevan al mismo
paso que React: **solo se porta un componente cuando una app nativa lo necesita**, nunca el catálogo entero.

> **Estado.** SwiftUI (iOS 17 y macOS 14) tiene ya sus componentes —ver [Componentes de SwiftUI](#componentes-de-swiftui)—;
> Jetpack Compose tiene la infraestructura, los tokens, la tipografía y las pruebas, y recibirá los mismos componentes
> en la tarea siguiente (cada ficha de `parity/components/` ya dice qué ha de cumplir Kotlin).

**Lo nativo no se publica en npm.** Se distribuye por git: SwiftPM lee `Package.swift` de la raíz del repositorio y
JitPack construye `native/android` (`jitpack.yml`). `package.json#files` solo lleva `dist`, `src/tokens` y el changelog,
y `pnpm release:check` comprueba con `npm pack --dry-run` que nada de `native/` se cuela.

```
native/
├─ apple/                         paquete Swift (Package.swift está en la RAÍZ del repo, SwiftPM lo exige)
│  ├─ Sources/StudiolxdBrand/
│  │  ├─ StudiolxdBrand.swift     registerFonts()
│  │  ├─ Components/<Componente>/ los componentes (uno por carpeta, con su `#Preview`)
│  │  ├─ Icon/                    BrandIcon; `BrandIconData.swift` GENERADO por `pnpm build:native-icons`
│  │  ├─ Support/                 Color dinámico, BrandShadow, BrandCubicBezier, brandFont, brandHitTarget…
│  │  ├─ Tokens/BrandTokens.swift GENERADO por `pnpm build:tokens` (globales)
│  │  ├─ Tokens/BrandComponentTokens.swift  GENERADO por `pnpm build:tokens` (tokens de componente)
│  │  ├─ Typography/              BrandTextStyle y Font.brand(_:)
│  │  └─ Resources/Fonts/         TTF + licencias, GENERADOS por `pnpm build:native-fonts`
│  ├─ Tests/StudiolxdBrandTests/  tokens, paridad, lógica y capturas (__Snapshots__/)
│  ├─ Comparisons/<Componente>/   parejas React ↔ SwiftUI (ver Comparisons/README.md)
│  └─ scripts/                    capture-story.mjs y pair-comparison.sh (las parejas)
├─ android/                       proyecto Gradle (Kotlin DSL), módulo `brand`
│  └─ brand/src/…                tokens (GENERADO), tema, tipografía; res/font GENERADO; pruebas y capturas
└─ parity/                        fichas de paridad con React (ver parity/README.md)
```

## Instalar en una app

### SwiftPM (iOS y macOS)

En Xcode: *File ▸ Add Package Dependencies…* con la URL del repositorio y la regla «Exact Version» `vX.Y.Z`. O en un
`Package.swift`:

```swift
.package(url: "https://github.com/studiolxd/brand", exact: "X.Y.Z"),
// …
.product(name: "StudiolxdBrand", package: "brand"),
```

Los tags del repositorio son `vX.Y.Z`; SwiftPM los entiende como la versión `X.Y.Z`. En el arranque de la app:

```swift
import StudiolxdBrand

StudiolxdBrand.registerFonts()   // una vez; es idempotente

Text("Hola").font(.brand(.body)).foregroundStyle(BrandColorRoles.text)
```

### Android (Gradle)

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven("https://jitpack.io")
    }
}

// build.gradle.kts del módulo
dependencies {
    implementation("com.github.studiolxd:brand:vX.Y.Z")
}
```

Aquí el tag lleva la `v`. La librería exige `compileSdk` 37 (lo piden sus dependencias de AndroidX). En la app:

```kotlin
BrandTheme {                       // sigue al esquema del sistema; BrandTheme(darkTheme = …) lo fuerza
    Text("Hola", style = BrandTypography.body, color = BrandTheme.colors.text)
}
```

## Qué trae (los tokens globales)

| Token de la web | Swift | Kotlin |
| --- | --- | --- |
| `color.*` primitivos, de marca y `*-fill` (iguales en claro y oscuro) | `BrandColors` | `BrandColors` |
| `color.*-on-light` / `-on-dark`, `color.background.light/dark`, `color.chart.*` | `BrandColorRoles` (cada rol es un `Color` **dinámico**) | `BrandColorRoles` (una instancia `light` y otra `dark`) + `LocalBrandColorRoles` + `BrandTheme` |
| `spacing.*` | `BrandSpacing.s1…s8` (CGFloat, pt) | `BrandSpacing.s1…s8` (dp) |
| `border-radius.*` | `BrandRadius` | `BrandRadius` |
| `border-width.*` | `BrandBorderWidth` | `BrandBorderWidth` |
| `size-component.*`, `size-target.*` | `BrandSize.componentSm…`, `targetMin` | ídem |
| `opacity.*` | `BrandOpacity` | `BrandOpacity` |
| `font-family.*`, `font-size.*`, `font-weight.*`, `line-height.*`, `letter-spacing.*` | `BrandFontFamily`, `BrandFontSize`, `BrandFontWeight`, `BrandLineHeight`, `BrandLetterSpacing` | los mismos nombres (`BrandFontFamilyName` para el nombre de la familia) |
| `shadow.*` | `BrandShadows` (+ `.brandShadow(_:)`) | `BrandShadows` |
| `motion.duration.*`, `motion.easing.*` | `BrandDuration` (segundos), `BrandEasing` (`BrandCubicBezier`) | `BrandDuration` (ms), `BrandEasing` (`Easing`) |
| estilos de texto (`text.*`) | `BrandTextStyle` + `Font.brand(_:)` | `BrandTypography` + `BrandFontFamily` |

Cada constante generada lleva en su comentario de documentación el token del que sale. `rem` → puntos/dp con
**1 rem = 16**; las duraciones salen en segundos (Swift) y en milisegundos (Kotlin); el tracking, como fracción del
cuerpo (em).

Un rol cuyo token solo define un lado (`color.surface.highlight` solo existe `on-dark`; `color.border.default` solo
`on-light`) vale lo mismo en los dos esquemas: el comentario de ese rol lo avisa.

### Lo que NO se genera

- **`breakpoint.*` y `z-index.*`**: son maquetación web; no hay equivalente nativo razonable.
- **`form.*` y `section.*`** (los tokens «globales» de maquetación de formularios y secciones): lo mismo.
- **`content.measure`** (`70ch`): una unidad de CSS.
- **Pilas de fuentes de respaldo** (`system-ui, sans-serif`): solo sale el nombre de la primera familia; el respaldo lo
  decide cada sistema.
- **Tokens con `var(`**: no hay ninguno entre los globales; si apareciera, se omitiría.
- **Tokens de componente en Kotlin**: los de Swift ya se generan (abajo); los de Compose llegan con los componentes de Android.

### Tokens de componente (Swift)

`pnpm build:tokens` genera además `BrandComponentTokens.swift`: un `enum Brand<Grupo>Tokens` por cada grupo de
`NATIVE_COMPONENT_GROUPS` (`sd.formats.mjs`), p. ej. `BrandButtonTokens.primaryBg` ← `button.primary.bg`. La lista de
grupos crece con cada componente que se porta (sale de los `var(--…)` de su CSS).

- **Colores**: `Color` dinámico. El lado oscuro es el `surface-dark-<nombre>` hermano **o el heredado por referencia**
  (un token que apunta a otro con par oscuro hereda ese par, la misma regla que `surface-dark-derived.css`).
  `transparent` sale como color con alfa 0.
- **Medidas** (`rem`/`px`, `calc()` de rem y px): `CGFloat` en puntos. Una medida con par oscuro (hoy, el grosor del
  subrayado de `Link` y de `Button text`, que en oscuro desaparece en reposo) sale como `BrandSchemeValue<CGFloat>`:
  `BrandButtonTokens.textUnderlineWidth.value(for: scheme)`.
- **`em`**: fracción del tamaño de fuente del propio componente (`switcher.track-width` = 2.75 → 2.75 × tamaño).
- Duraciones (segundos), curvas (`BrandCubicBezier`), sombras (`BrandShadow`), pesos (`Int`) y familias (`String`).
- **Se omite el CSS puro**: `solid`, `center`, `pointer`, porcentajes, `vw`/`vh`, `min()`/`max()`/`clamp()`… (p. ej.
  `sheet.inline-size`, `sheet.block-size`, `modal.max-height`): el componente los resuelve con lo que SwiftUI ofrece y
  la ficha anota el valor copiado.

## Componentes de SwiftUI

Todo está en el producto `StudiolxdBrand`; basta `import StudiolxdBrand` y `StudiolxdBrand.registerFonts()` al arrancar.
Cada componente sigue a su `React` en nombres de props y casos (enums `CaseIterable` con el `rawValue` de React), usa solo
tokens, funciona en claro y oscuro con colores dinámicos y cumple, por construcción:

- **Estados**: reposo, *hover* (puntero en macOS y iPad), pulsado, deshabilitado (`.disabled(_:)`), foco de teclado
  (anillo de `focus-ring-*`) y error.
- **Tipo dinámico**: alturas y tamaños de letra crecen con él (`brandFont`, `@ScaledMetric`).
- **VoiceOver**: etiquetas, valores, rasgos y pistas; el error y la ayuda se enlazan al control.
- **Zona táctil ≥ 44 pt en iOS** (`brandHitTarget`, mínimo de las guías de Apple) sin cambiar el aspecto ni la maqueta.
- **Reducir movimiento** (`accessibilityReduceMotion`) y macOS (puntero y foco de teclado) sin romperse.
- Los textos que un componente emite por su cuenta son parámetros con el castellano por defecto.

| React | SwiftUI |
| --- | --- |
| `Button` | `.buttonStyle(.brand(…))` · `BrandButton` |
| `Heading`, `Paragraph`, `Text` | `BrandHeading`, `BrandParagraph`, `BrandText` · `Text.brand(…)` |
| `Icon` | `BrandIcon` |
| `InputField` | `BrandInputField` |
| `NumberInputField` | `BrandNumberInputField` |
| `SelectField` | `BrandSelectField` |
| `SwitcherField` | `BrandSwitcherField` · `.toggleStyle(.brandSwitch)` |
| `ToggleGroup` | `BrandToggleGroup` + `BrandToggleGroupItem` · `.toggleStyle(.brandToggle)` |
| `ThemeSwitcher` | `BrandThemeSwitcher` |
| `List` + `ListItem` | `BrandList` + `BrandListItem` |
| `Tag` | `BrandTag` |
| `EmptyState` | `BrandEmptyState` |
| `Skeleton` | `BrandSkeleton` |
| `Sheet` | `.brandSheet(isPresented:…)` · `BrandSheetContent` |
| `ConfirmDialog` | `.brandConfirmDialog(isPresented:…)` · `BrandConfirmDialog` |
| `Toast` / `Toaster` | `ToastCenter` · `.toastHost(…)` |

`#Preview` de cada componente enseña todas sus variantes: ábrelos en Xcode. Las diferencias que se quedan a propósito
respecto a React están en el campo `differences` de cada ficha (`parity/components/<Componente>.json`).

### Button, texto e iconos

`Button` es un `ButtonStyle` aplicable a cualquier `Button` nativo, más la vista de conveniencia `BrandButton`.
`variant` (`primary`/`outline`/`ghost`/`text`), `tone` (`accent`/`ink`, solo con `text`), `size` (`sm`/`md`/`lg`),
`destructive` (solo `outline` y `text`), `block` e `iconOnly` (con nombre accesible obligatorio).

```swift
Button("Guardar") { save() }.buttonStyle(.brand(.primary))
BrandButton("Eliminar", variant: .outline, destructive: true) { delete() }
BrandButton(icon: .close, accessibilityLabel: "Cerrar", variant: .ghost) { dismiss() }   // iconOnly
Form { … }.brandControlSize(.lg)          // la talla por defecto de los controles del árbol (`Form size` en React)
```

```swift
BrandHeading("Tus viviendas")                          // h2; VoiceOver lo anuncia como encabezado de ese nivel
BrandHeading("Resumen", level: .h2, size: .s5)         // un h2 con el tamaño de un h4
BrandParagraph("Revisa los datos.", size: .small)
BrandParagraph(Text("Esta acción ") + Text("borra").brand(.strong, tone: .destructive) + Text(" el curso."))
BrandIcon(.search)                                     // xs 8 · sm 16 · md 24 · lg 48 · xl 64 · text = 1em
```

`BrandIcon` dibuja los mismos 77 iconos que el `Icon` de React (retícula de 24, trazo de 1 pt): `pnpm build:native-icons` los
genera desde `Icon.tsx`, así que no hay SF Symbols ni dos catálogos que diverjan.

### Campos de formulario

Comparten etiqueta, ayuda, mensaje de error y talla (`size`, o la del entorno con `.brandControlSize(_:)`).

```swift
BrandInputField("Correo", text: $email, type: .email, helperText: "Te escribiremos aquí")
BrandInputField("Buscar", text: $query, labelHidden: true, kind: .search, clearable: true)
BrandNumberInputField("Cantidad", value: $qty, min: 0, max: 99)          // −/+; `decimal: true` admite coma o punto
BrandSelectField("Idioma", selection: $lang, options: [.option("es", "Español"), .option("en", "Inglés")])
```

`BrandInputField` admite `text`/`email`/`password`/`number`/`tel`/`url` (teclado y relleno automático adecuados),
búsqueda, solo lectura y error. `BrandSelectField` abre un `Menu` nativo y admite grupos
(`.group(label:options:)`). `BrandNumberInputField` es ajustable con VoiceOver (deslizar suma o resta un paso).

### Interruptores, grupos de botones, tema y etiquetas

```swift
BrandTag("Pagado", variant: .success)                                    // las diez variantes de React
Toggle("Notificaciones", isOn: $on).toggleStyle(.brandSwitch(size: .sm))
BrandSwitcherField("Acepto las condiciones", isOn: $accepted, errorMessage: "Debes aceptarlas.")

BrandToggleGroup(selection: $plan) {                                     // exclusivo (valor opcional)…
    BrandToggleGroupItem("Mensual", value: Plan.monthly)
    BrandToggleGroupItem("Anual", value: Plan.yearly)
}
.accessibilityLabel("Plan")
BrandToggleGroup(selection: $filters, multiple: true, size: .sm) { … }   // …o múltiple (conjunto)

BrandThemeSwitcher(value: $theme, variant: .list)                        // solo la vista: el valor lo guarda la app
```

### Listas, estados vacíos y esqueletos

```swift
BrandList(type: .ordered) { BrandListItem("Abre la app"); BrandListItem("Elige tu vivienda") }

// La fila de ajustes (la `ListRow` de Homenize): principal, secundario, accesorio final y separadores de brand
BrandList(type: .plain, showsSeparators: true) {
    BrandListItem(content: { Text("Notificaciones") }, secondary: { Text("Avisos de la comunidad") },
                  trailing: { BrandIcon(.chevron, size: .sm) })
}

BrandEmptyState(title: "Sin viviendas", description: "Añade tu primera vivienda para empezar.",
                icon: .folder, action: EmptyStateAction("Añadir vivienda") { add() })

BrandSkeleton(width: 160)                         // `circle: true` para un avatar; con «Reducir movimiento», fondo plano
```

### Hojas, diálogos de confirmación y avisos

```swift
// Sheet: el `.sheet` nativo (detents, arrastre, VoiceOver) con cabecera, aspa y pie de marca. Solo `bottom`.
Button("Filtros") { showFilters = true }
    .brandSheet(isPresented: $showFilters, title: "Filtros", description: "Afina los resultados") {
        FilterForm()
    } footer: {
        BrandDialogButton("Cancelar", variant: .outline) { showFilters = false }   // Cancelar primero (regla 10)
        BrandDialogButton("Aplicar") { apply(); showFilters = false }
    }

// ConfirmDialog: `onConfirm` es async (ocupado mientras corre, se cierra al terminar, sigue abierto si lanza)
.brandConfirmDialog(isPresented: $askDelete, title: "¿Eliminar la vivienda?",
                    description: "Se borrarán sus documentos. No se puede deshacer.",
                    confirmLabel: "Eliminar la vivienda", destructive: true) { try await repository.delete(home) }
// confirmPhrase: .init("Casa del lago", label: "Escribe «Casa del lago»", mismatch: "No coincide")
// secondaryActionLabel: "Archivar", onSecondaryAction: { … }   // la tercera acción

// Toast: el host se monta una vez en la raíz; los avisos se lanzan desde cualquier sitio.
WindowGroup { RootView().toastHost(position: .bottomRight) }
ToastCenter.shared.success("Cambios guardados")
let id = ToastCenter.shared.loading("Subiendo…")
ToastCenter.shared.error("No se pudo subir", id: id, description: "Revisa la conexión.")   // actualiza en su sitio
try await ToastCenter.shared.promise(loading: "Guardando", success: { _ in "Guardado" }, error: { _ in "Falló" }) { try await save() }
```

Intents de `Toast`: `default`, `success`, `error`, `warning`, `info` y `loading`. `BrandCloseButton` y el pie
`BrandDialogFooter`/`BrandDialogButton` (que apila con la acción principal arriba por debajo de 480 pt) son comunes a los
tres.

## Fuentes

Las tres familias de la web, como TTF **variables** (el mismo diseño y los mismos ejes que el woff2 de la web), solo con la cara `latin`:

| Familia | Fichero | Ejes | Pesos |
| --- | --- | --- | --- |
| Google Sans Flex (`sans`) | `google-sans-flex.ttf` | `wght` 1–1000, `opsz` 6–144 | todos; el sistema usa 300 (cuerpo) y 500 (títulos) |
| Google Sans Code (`mono`) | `google-sans-code.ttf`, `google-sans-code-italic.ttf` | `wght` 300–800 | 300–800 |
| Libre Bodoni (`serif`) | `libre-bodoni.ttf`, `libre-bodoni-italic.ttf` | `wght` 400–700 | 400–700 |

`pnpm build:native-fonts` las regenera desde `src/assets/fonts/` (`pip3 install fonttools brotli`). Los TTF y sus
licencias (SIL OFL 1.1) se copian a `Resources/Fonts/` (Swift) y a `res/font/` + `assets/licenses/fonts/` (Android, donde
los nombres van en minúsculas y con `_`).

- **Swift**: `StudiolxdBrand.registerFonts()` las registra en el proceso (`CTFontManagerRegisterFontsForURL`) y
  `Font.brand(_:)` fija el eje `wght` por CoreText. Hay que llamarla una vez al arrancar.
- **Compose**: `BrandFontFamily.sans|mono|serif` son `FontFamily` con una entrada por peso y el eje `wght` fijado
  (`FontVariation`, disponible desde API 26).
- No se incluye la cara `latin-ext` (polaco, checo, turco…): esos glifos caen a la fuente del sistema. Y el eje `opsz` de la sans se
  queda en su valor por defecto (18): en la web `font-optical-sizing: auto` lo ajusta al tamaño.

## Desarrollar con una copia local

**SwiftPM**: en la app, dependencia por ruta en lugar de por URL (Xcode: arrastra la carpeta del repositorio al
proyecto; en un manifiesto):

```swift
.package(path: "../brand"),
```

**Android**: o bien un `includeBuild` en el `settings.gradle.kts` de la app, que sustituye la dependencia por el módulo local,

```kotlin
includeBuild("../brand/native/android") {
    dependencySubstitution { substitute(module("com.github.studiolxd:brand")).using(project(":brand")) }
}
```

o bien publicar en el repositorio Maven local y añadir `mavenLocal()` a los repositorios de la app:

```sh
cd native/android && VERSION=0.0.0-local ./gradlew :brand:publishToMavenLocal
```

Tras tocar un JSON de `tokens/`: `pnpm build:tokens`. Tras tocar las fuentes de `src/assets/fonts/`: `pnpm build:native-fonts`. Tras tocar `Icon.tsx`: `pnpm build:native-icons`.

### Comandos

```sh
swift build && swift test                       # en la raíz: macOS
xcodebuild test -scheme StudiolxdBrand -destination 'platform=iOS Simulator,name=iPhone 17'   # iOS
cd native/android && ./gradlew build            # compila, prueba y verifica las capturas (Paparazzi)
pnpm release:check -- --with-native             # la puerta de calidad completa, con todo lo anterior
```

Android necesita el SDK en `native/android/local.properties` (`sdk.dir=…`, no versionado) o en `ANDROID_HOME`, y un
JDK 21 (Gradle lo localiza solo; con el JDK 26 de la máquina no compilan ni Gradle ni AGP).

## Reglas de paridad

1. **Se porta lo que una app nativa pide**, no el catálogo. Un componente entra con su ficha, sus pruebas y sus capturas.
2. **Tocar un componente que ya tiene versión nativa obliga a actualizar las TRES implementaciones** (React, SwiftUI y
   Compose), su **ficha de paridad** y sus **capturas** en el mismo commit.
3. **Los mismos casos, con los mismos nombres.** Cada prop de React que sea una unión de literales (`variant`, `size`,
   `tone`…) tiene en nativo un enum con **exactamente esos casos**: en Swift `enum X: String, CaseIterable` con el
   `rawValue` igual al valor de React; en Kotlin `enum class X(val value: String)` con el valor de React en `value`.
   Lo que no se porta se declara en la ficha (`excluded`) con su porqué.
4. **Los estados** (`disabled`, `destructive`, `iconOnly`…) existen en las tres o se excluyen de la ficha.
5. **Tokens first, también aquí**: ningún componente nativo lleva un color, medida o duración escritos a mano; todo sale
   de `BrandTokens`.
6. La comprobación es automática: `pnpm native:parity` (ficha ↔ React) y las pruebas de paridad de cada plataforma
   (ficha ↔ nativo). Ver [parity/README.md](parity/README.md).

Las capturas (swift-snapshot-testing en Apple, Paparazzi en Android) viven junto a las pruebas:
`native/apple/Tests/StudiolxdBrandTests/__Snapshots__/` y `native/android/brand/src/test/snapshots/`. Las imágenes son
**por plataforma**: se regraban con `swift test` (la primera vez graba y falla; la segunda compara) y con
`./gradlew :brand:recordPaparazziDebug`.
