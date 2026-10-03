import SnapshotTesting
import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Una muestra de los roles de color: cada rol en una fila, con su cara clara y su cara oscura lado a lado.
private struct PaletteSample: View {
    private let roles = BrandColorRoles.all.filter { !$0.name.hasPrefix("chart") }

    var body: some View {
        VStack(spacing: 0) {
            ForEach(Array(roles.enumerated()), id: \.offset) { _, role in
                HStack(spacing: 0) {
                    swatch(role.color, scheme: .light)
                    swatch(role.color, scheme: .dark)
                }
            }
        }
        .frame(width: 240)
    }

    private func swatch(_ color: Color, scheme: ColorScheme) -> some View {
        Rectangle()
            .fill(color)
            .frame(height: 14)
            .environment(\.colorScheme, scheme)
    }
}

/// Capturas de tokens: dejan probado el flujo de pruebas de capturas. Las de cada componente irán igual, una por
/// componente y por estado, en el mismo commit que el componente.
final class SnapshotTests: XCTestCase {
    func testColorRolesPaletteInLightAndDark() {
        let view = PaletteSample()
        let height = CGFloat(BrandColorRoles.all.filter { !$0.name.hasPrefix("chart") }.count) * 14

        #if os(iOS)
        assertSnapshot(
            of: view,
            as: .image(perceptualPrecision: 0.98, layout: .fixed(width: 240, height: height)),
            named: "iOS"
        )
        #else
        // SnapshotTesting solo trae captura de vistas SwiftUI en iOS: en macOS se aloja en una NSHostingView.
        let hosting = NSHostingView(rootView: view)
        hosting.frame = CGRect(x: 0, y: 0, width: 240, height: height)
        assertSnapshot(of: hosting, as: .image(perceptualPrecision: 0.98), named: "macOS")
        #endif
    }
}
