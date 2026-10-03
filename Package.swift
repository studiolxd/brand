// swift-tools-version: 6.0
//
// Paquete SwiftPM de Brand para apps de iOS y macOS (SwiftUI). Vive en la raíz del
// repositorio porque SwiftPM exige el manifiesto ahí; las fuentes están en
// `native/apple/`. Lo nativo NO se publica en npm (ver CLAUDE.md § «Nativo»).
import PackageDescription

let package = Package(
    name: "StudiolxdBrand",
    platforms: [.iOS(.v17), .macOS(.v14)],
    products: [
        .library(name: "StudiolxdBrand", targets: ["StudiolxdBrand"]),
    ],
    dependencies: [
        // Solo para las pruebas de capturas: ningún target de la librería lo enlaza.
        .package(url: "https://github.com/pointfreeco/swift-snapshot-testing", from: "1.18.0"),
    ],
    targets: [
        .target(
            name: "StudiolxdBrand",
            path: "native/apple/Sources/StudiolxdBrand",
            // Las fuentes (TTF variables + licencias) se registran en ejecución con
            // `StudiolxdBrand.registerFonts()`.
            resources: [.copy("Resources/Fonts")]
        ),
        .testTarget(
            name: "StudiolxdBrandTests",
            dependencies: [
                "StudiolxdBrand",
                .product(name: "SnapshotTesting", package: "swift-snapshot-testing"),
            ],
            path: "native/apple/Tests/StudiolxdBrandTests",
            exclude: ["__Snapshots__"]
        ),
    ]
)
