import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Las mismas composiciones que las stories de Storybook que se usan en `native/apple/Comparisons/`: mismo contenido,
/// mismo lienzo (el ancho del viewport de la captura de React y 16 pt de margen) para que la pareja se compare a la
/// misma escala. Las dimensiones son las de la captura de React (`capture-story.mjs`, @2x ÷ 2).
@MainActor
final class TogglesComparisonSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    private let margin: CGFloat = 16

    func testTagVariantsLikeStory() {
        func tag(_ text: String, _ tone: TagTone) -> some View { BrandTag(verbatim: text, tone: tone) }
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s2) {
            HStack(spacing: BrandSpacing.s2) {
                tag("Diseño instruccional", .primary); tag("Formación presencial", .accent1); tag("Plataformas LMS", .accent2)
            }
            HStack(spacing: BrandSpacing.s2) {
                tag("Consultoría", .support1); tag("E-learning", .support2); tag("Por hacer", .neutral)
                tag("En progreso", .info); tag("En pausa", .warning)
            }
            HStack(spacing: BrandSpacing.s2) { tag("Completado", .success); tag("Cancelado", .error) }
        }
        assertBrandSnapshots(view, width: 560, height: 114, named: "tag-variants", padding: margin)
    }

    func testSwitcherSizesLikeStory() {
        let view = VStack(alignment: .leading, spacing: 0) {
            BrandSwitcherField(verbatim: "Pequeño", isOn: .constant(true), size: .sm)
            BrandSwitcherField(verbatim: "Mediano", isOn: .constant(true), size: .md)
            BrandSwitcherField(verbatim: "Grande", isOn: .constant(true), size: .lg)
        }
        assertBrandSnapshots(view, width: 480, height: 203, named: "switcher-tallas", padding: margin)
    }

    func testSwitcherErrorLikeStory() {
        let view = BrandSwitcherField(
            verbatim: "Activar notificaciones", isOn: .constant(false),
            errorMessage: "Tienes que aceptar los avisos de seguridad.",
            helperText: "Te avisamos solo de lo que afecte a tu cuenta."
        )
        assertBrandSnapshots(view, width: 480, height: 146, named: "switcher-error", padding: margin)
    }

    func testToggleGroupSizesLikeStory() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s5) {
            ForEach(BrandControlSize.allCases, id: \.self) { size in
                BrandToggleGroup(selection: .constant("dia" as String?), size: size) {
                    BrandToggleGroupItem(verbatim: "Día", value: "dia")
                    BrandToggleGroupItem(verbatim: "Semana", value: "semana")
                    BrandToggleGroupItem(verbatim: "Mes", value: "mes")
                }
            }
        }
        assertBrandSnapshots(view, width: 480, height: 200, named: "group-tallas", padding: margin)
    }

    func testToggleGroupMultipleLikeStory() {
        let view = BrandToggleGroup(selection: .constant(Set(["borradores"])), multiple: true) {
            BrandToggleGroupItem(verbatim: "Borradores", value: "borradores")
            BrandToggleGroupItem(verbatim: "Publicados", value: "publicados")
            BrandToggleGroupItem(verbatim: "Archivados", value: "archivados")
        }
        assertBrandSnapshots(view, width: 441, height: 72, named: "group-multiple", padding: margin)
    }

    func testThemeSwitcherLikeStories() {
        assertBrandSnapshots(BrandThemeSwitcher(value: .constant(.system)),
                             width: 480, height: 72, named: "theme-compact", padding: margin)
        assertBrandSnapshots(BrandThemeSwitcher(value: .constant(.system), variant: .list),
                             width: 480, height: 59, named: "theme-list", padding: margin)
        assertBrandSnapshots(BrandThemeSwitcher(value: .constant(.system), layout: .stacked),
                             width: 480, height: 101, named: "theme-stacked", padding: margin)
    }
}
