# Brand nativo (iOS, macOS y Android)

Las versiones nativas de Brand para apps de **SwiftUI** (iOS 17 y macOS 14) y **Jetpack Compose** (Android, minSdk 26).
Comparten con la web los mismos tokens —salen de los mismos JSON de `tokens/` con Style Dictionary— y se llevan al mismo
paso que React: **solo se porta un componente cuando una app nativa lo necesita**, nunca el catálogo entero.

> **Estado: infraestructura y tokens.** Todavía no hay ningún componente nativo; sí hay tokens, tipografía, fuentes y
> las pruebas de paridad y de capturas, listas para el primero.

**Lo nativo no se publica en npm.** Se distribuye por git: SwiftPM lee `Package.swift` de la raíz del repositorio y
JitPack construye `native/android` (`jitpack.yml`). `package.json#files` solo lleva `dist`, `src/tokens` y el changelog,
y `pnpm release:check` comprueba con `npm pack --dry-run` que nada de `native/` se cuela.

```
native/
├─ apple/                         paquete Swift (Package.swift está en la RAÍZ del repo, SwiftPM lo exige)
│  ├─ Sources/StudiolxdBrand/
│  │  ├─ StudiolxdBrand.swift     registerFonts()
│  │  ├─ Support/                 Color dinámico, BrandShadow, BrandCubicBezier
│  │  ├─ Tokens/BrandTokens.swift GENERADO por `pnpm build:tokens`
│  │  ├─ Typography/              BrandTextStyle y Font.brand(_:)
│  │  └─ Resources/Fonts/         TTF + licencias, GENERADOS por `pnpm build:native-fonts`
│  └─ Tests/StudiolxdBrandTests/  tokens, paridad y capturas (__Snapshots__/)
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
- **Tokens de componente** (`tokens/component|molecule|organism/`) y sus `surface-dark-*`: se generarán cuando se porte
  cada componente. `sd.formats.mjs` está preparado para ello (ver el comentario sobre `NATIVE_GLOBAL_GROUPS`).

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

Tras tocar un JSON de `tokens/`: `pnpm build:tokens`. Tras tocar las fuentes de `src/assets/fonts/`: `pnpm build:native-fonts`.

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
