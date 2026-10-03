import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Capturas de `Heading`, `Paragraph` y `Text`: los seis niveles, el tamaño desacoplado, los tres párrafos y las
/// intenciones del texto en línea. Claro y oscuro, iOS y macOS.
@MainActor
final class TextSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    func testHeadingLevels() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s2) {
            ForEach(HeadingLevel.allCases, id: \.self) { level in
                BrandHeading(verbatim: "Nivel \(level.rawValue)", level: level)
            }
        }
        assertBrandSnapshots(view, width: 320, height: 300, named: "levels")
    }

    func testHeadingDecoupledSize() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s2) {
            BrandHeading(verbatim: "h2 como h2", level: .h2)
            BrandHeading(verbatim: "h2 con tamaño 4", level: .h2, size: .s4)
            BrandHeading(verbatim: "h2 con tamaño 9", level: .h2, size: .s9)
        }
        assertBrandSnapshots(view, width: 360, height: 190, named: "decoupled-size")
    }

    func testParagraphs() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s3) {
            BrandParagraph(verbatim: "Pequeño: notas y metadatos de una pantalla.", size: .small)
            BrandParagraph(verbatim: "Normal: el cuerpo de texto de la aplicación, a dieciséis puntos.")
            BrandParagraph(verbatim: "Grande: entradillas.", size: .large)
        }
        assertBrandSnapshots(view, width: 320, height: 230, named: "sizes")
    }

    func testInlineText() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s2) {
            ForEach(TextTone.allCases, id: \.self) { tone in
                (Text("Una frase con ") + Text("este fragmento").brand(.strong, tone: tone) + Text(" marcado."))
                    .font(.brand(.body)).foregroundStyle(BrandColorRoles.text)
            }
            (Text("Y otra con ") + Text("énfasis").brand(.em)).font(.brand(.body)).foregroundStyle(BrandColorRoles.text)
        }
        assertBrandSnapshots(view, width: 340, height: 150, named: "inline")
    }
}
