import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Capturas de `Button`: cada variante en reposo, deshabilitada y destructiva (outline/text), las tres tallas, el
/// botón de solo icono y el de ancho completo. Claro y oscuro, iOS y macOS.
@MainActor
final class ButtonSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    func testVariants() {
        for variant in ButtonVariant.allCases {
            let view = HStack(spacing: BrandSpacing.s4) {
                BrandButton("Guardar", variant: variant) {}
                BrandButton("Eliminar", variant: variant, destructive: true) {}
                BrandButton("Desactivado", variant: variant) {}.disabled(true)
            }
            assertBrandSnapshots(view, width: 460, height: 64, named: variant.rawValue)
        }
    }

    func testTextInk() {
        assertBrandSnapshots(
            HStack(spacing: BrandSpacing.s4) {
                BrandButton("Acento", variant: .text) {}
                BrandButton("Tinta", variant: .text, tone: .ink) {}
            },
            width: 220, height: 56, named: "text-ink"
        )
    }

    func testSizes() {
        for variant in [ButtonVariant.primary, .outline] {
            let view = HStack(alignment: .center, spacing: BrandSpacing.s4) {
                ForEach(ButtonSize.allCases, id: \.self) { size in
                    BrandButton(variant: variant, size: size, action: {}) { Text(size.rawValue.uppercased()) }
                }
            }
            assertBrandSnapshots(view, width: 360, height: 72, named: "sizes-\(variant.rawValue)")
        }
    }

    func testIconOnlyAndBlock() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s3) {
            HStack(spacing: BrandSpacing.s3) {
                ForEach(ButtonSize.allCases, id: \.self) { size in
                    BrandButton(icon: .plus, accessibilityLabel: "Añadir", variant: .outline, size: size) {}
                }
                BrandButton(icon: .close, accessibilityLabel: "Cerrar", variant: .ghost) {}
                BrandButton(icon: .search, accessibilityLabel: "Buscar") {}
            }
            BrandButton("A ancho completo", block: true) {}
        }
        assertBrandSnapshots(view, width: 320, height: 124, named: "icon-only-block")
    }

    func testDynamicTypeAccessibility() {
        assertBrandSnapshots(
            BrandButton("Guardar cambios") {},
            width: 340, height: 120, named: "dynamic-type-xxxl", dynamicType: .accessibility3
        )
    }
}

@MainActor
final class ButtonLogicTests: XCTestCase {
    func testEnumRawValuesMatchReact() {
        XCTAssertEqual(ButtonVariant.allCases.map(\.rawValue), ["primary", "outline", "ghost", "text"])
        XCTAssertEqual(ButtonTone.allCases.map(\.rawValue), ["accent", "ink"])
        XCTAssertEqual(ButtonSize.allCases.map(\.rawValue), ["sm", "md", "lg"])
    }

    func testIconSizesComeFromTokens() {
        XCTAssertEqual(BrandIcon.points(for: .sm, textSize: 16), 16)
        XCTAssertEqual(BrandIcon.points(for: .md, textSize: 16), 24)
        XCTAssertEqual(BrandIcon.points(for: .text, textSize: 20), 20)
    }
}
