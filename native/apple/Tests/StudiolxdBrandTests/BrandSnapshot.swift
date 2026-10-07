import SnapshotTesting
import SwiftUI
import XCTest
@testable import StudiolxdBrand

#if canImport(UIKit)
import UIKit
#endif

/// Captura una vista de componente en **claro y oscuro**, sobre el lienzo de la marca, a un tamaño fijo y con
/// el tipo dinámico en su valor normal. Un PNG por esquema y plataforma:
/// `__Snapshots__/<Fichero>/<test>.<nombre>.<claro|oscuro>.<iOS|macOS>.png`.
///
/// La primera vez graba y el test falla («recorded»); la segunda compara. En iOS el factor de escala está fijado
/// a 2 para que la captura no dependa del modelo de simulador.
///
/// ```swift
/// func testPrimary() {
///     assertBrandSnapshots(BrandButton("Guardar") {}, width: 160, height: 56, named: "primary")
/// }
/// ```
@MainActor
func assertBrandSnapshots<V: View>(
    _ view: V,
    width: CGFloat,
    height: CGFloat,
    named name: String,
    schemes: [ColorScheme] = [.light, .dark],
    dynamicType: DynamicTypeSize = .large,
    padding: CGFloat = BrandSpacing.s2,
    file: StaticString = #filePath,
    testName: String = #function,
    line: UInt = #line
) {
    for scheme in schemes {
        let label = scheme == .dark ? "oscuro" : "claro"
        let framed = view
            .padding(padding)
            .frame(width: width, height: height, alignment: .topLeading)
            .background(BrandColorRoles.bg)
            .environment(\.colorScheme, scheme)
            .environment(\.dynamicTypeSize, dynamicType)
            .transaction { $0.disablesAnimations = true }

        #if os(iOS)
        let traits = UITraitCollection { mutableTraits in
            mutableTraits.userInterfaceStyle = scheme == .dark ? .dark : .light
            mutableTraits.displayScale = 2
        }
        assertSnapshot(
            of: framed,
            as: .image(perceptualPrecision: 0.98, layout: .fixed(width: width, height: height), traits: traits),
            named: "\(name).\(label).iOS",
            file: file, testName: testName, line: line
        )
        #else
        // SnapshotTesting solo captura vistas SwiftUI en iOS: en macOS se aloja en una NSHostingView.
        // Dentro de una ventana fuera de pantalla con espacio de color sRGB: sin ella la captura sale en el del
        // monitor (P3) y todos los colores se desplazan respecto a los tokens y a las capturas de iOS y de la web.
        let hosting = NSHostingView(rootView: framed)
        hosting.frame = CGRect(x: 0, y: 0, width: width, height: height)
        let window = NSWindow(contentRect: hosting.frame, styleMask: [.borderless], backing: .buffered, defer: false)
        window.colorSpace = .sRGB
        window.appearance = NSAppearance(named: scheme == .dark ? .darkAqua : .aqua)
        window.contentView = hosting
        assertSnapshot(
            of: hosting,
            as: .image(perceptualPrecision: 0.98),
            named: "\(name).\(label).macOS",
            file: file, testName: testName, line: line
        )
        #endif
    }
}
