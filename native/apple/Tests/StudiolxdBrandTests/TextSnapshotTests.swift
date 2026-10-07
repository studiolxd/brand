import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Capturas de `Heading`, `Paragraph` y `Text`: los seis niveles, el tamaño desacoplado, los tres párrafos y las
/// intenciones del texto en línea. Claro y oscuro, iOS y macOS.
@MainActor
final class TextSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    private static let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."

    /// Parejas con Storybook (`atoms-heading--h2` con `level` y `children`): un solo título por captura.
    func testComparisonHeading() {
        for level in [HeadingLevel.h1, .h4] {
            assertBrandSnapshots(
                BrandHeading(verbatim: "Mi vivienda", level: level).fixedSize(),
                width: 300, height: level == .h1 ? 76 : 63, named: "compare-h\(level.rawValue)", padding: 16
            )
        }
        assertBrandSnapshots(
            BrandHeading(verbatim: "Mi vivienda", level: .h2, size: .s4).fixedSize(),
            width: 300, height: 54, named: "compare-h2-size4", padding: 16
        )
    }

    /// Parejas con Storybook (`atoms-paragraph--por-defecto` con `size` y `children`).
    func testComparisonParagraph() {
        for size in ParagraphSize.allCases {
            let height: CGFloat = size == .sm ? 147 : size == .lg ? 214 : 176
            assertBrandSnapshots(
                BrandParagraph(verbatim: Self.lorem, size: size).frame(width: 288, alignment: .leading),
                width: 320, height: height, named: "compare-\(size.rawValue)", padding: 16
            )
        }
    }

    /// Pareja con la story `atoms-text--intencion-destructiva`.
    func testComparisonInlineTones() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s5) {
            BrandParagraph(Text("Al confirmar se ") + Text("borran").brand(.strong, tone: .destructive) + Text(" las 42 respuestas ya enviadas."))
            BrandParagraph(Text("La revisión terminó ") + Text("sin incidencias").brand(.strong, tone: .success) + Text("."))
            BrandParagraph(Text("Publicado el 12 de agosto ") + Text("(hace tres semanas)").brand(tone: .muted) + Text("."))
        }
        .frame(width: 448, alignment: .leading)
        assertBrandSnapshots(view, width: 480, height: 152, named: "compare-inline-tones", padding: 16)
    }

    /// Pareja con la story `atoms-text--tachado`: el tachado atenuado, con tono, `del` y `s`.
    func testComparisonStrikethrough() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s5) {
            BrandParagraph(Text("En el carrito: ") + Text("Leche entera").brand(strikethrough: true) + Text("."))
            BrandParagraph(Text("Con intención: ") + Text("cancelado").brand(tone: .destructive, strikethrough: true) + Text("."))
            BrandParagraph(Text("Precio: ") + Text("49 €").brand(.del) + Text(" 39 €."))
            BrandParagraph(Text("Ya no aplica: ") + Text("envío gratis").brand(.s) + Text("."))
        }
        .frame(width: 448, alignment: .leading)
        assertBrandSnapshots(view, width: 480, height: 200, named: "compare-strikethrough", padding: 16)
    }

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
            BrandParagraph(verbatim: "Pequeño: notas y metadatos de una pantalla.", size: .sm)
            BrandParagraph(verbatim: "Normal: el cuerpo de texto de la aplicación, a dieciséis puntos.")
            BrandParagraph(verbatim: "Grande: entradillas.", size: .lg)
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
        assertBrandSnapshots(view, width: 340, height: 180, named: "inline")
    }
}
