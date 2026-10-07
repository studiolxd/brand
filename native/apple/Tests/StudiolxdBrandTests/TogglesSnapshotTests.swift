import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Capturas de Tag, SwitcherField, ToggleGroup y ThemeSwitcher: cada variante y talla, claro y oscuro, iOS y macOS.
@MainActor
final class TogglesSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    // MARK: Tag

    func testTagVariants() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s2) {
            HStack { ForEach(Array(TagTone.allCases.prefix(5)), id: \.self) { BrandTag(verbatim: $0.rawValue, tone: $0) } }
            HStack { ForEach(Array(TagTone.allCases.suffix(5)), id: \.self) { BrandTag(verbatim: $0.rawValue, tone: $0) } }
        }
        assertBrandSnapshots(view, width: 560, height: 88, named: "variants")
    }

    // MARK: SwitcherField

    func testSwitcherSizesAndStates() {
        let view = VStack(alignment: .leading, spacing: 0) {
            ForEach(BrandControlSize.allCases, id: \.self) { size in
                HStack(spacing: BrandSpacing.s6) {
                    BrandSwitcherField(verbatim: "Activado \(size.rawValue)", isOn: .constant(true), size: size)
                    BrandSwitcherField(verbatim: "Apagado", isOn: .constant(false), size: size)
                }
            }
            BrandSwitcherField(verbatim: "Deshabilitado", isOn: .constant(true)).disabled(true)
        }
        assertBrandSnapshots(view, width: 440, height: 330, named: "sizes")
    }

    func testSwitcherFieldHelperAndError() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s3) {
            BrandSwitcherField(verbatim: "Avisarme por correo", isOn: .constant(true), helperText: "Un resumen al día.")
            BrandSwitcherField(verbatim: "Acepto las condiciones", isOn: .constant(false), errorMessage: "Debes aceptarlas.")
        }
        assertBrandSnapshots(view, width: 340, height: 230, named: "helper-error")
    }

    // MARK: ToggleGroup

    func testToggleGroup() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s3) {
            BrandToggleGroup(selection: .constant("Anual" as String?)) {
                BrandToggleGroupItem(verbatim: "Mensual", value: "Mensual")
                BrandToggleGroupItem(verbatim: "Anual", value: "Anual")
            }
            BrandToggleGroup(selection: .constant(Set(["Pagadas", "Vencidas"])), multiple: true, size: .sm) {
                BrandToggleGroupItem(verbatim: "Pagadas", value: "Pagadas")
                BrandToggleGroupItem(verbatim: "Pendientes", value: "Pendientes")
                BrandToggleGroupItem(verbatim: "Vencidas", value: "Vencidas")
            }
            BrandToggleGroup(selection: .constant("a" as String?), size: .lg, orientation: .vertical) {
                BrandToggleGroupItem(verbatim: "Opción A", value: "a")
                BrandToggleGroupItem(verbatim: "Opción B", value: "b")
            }
            Toggle("Deshabilitado", isOn: .constant(true)).toggleStyle(.brandToggle).disabled(true)
        }
        assertBrandSnapshots(view, width: 360, height: 340, named: "group")
    }

    // MARK: ThemeSwitcher

    func testThemeSwitcher() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandThemeSwitcher(value: .constant(.dark))
            BrandThemeSwitcher(value: .constant(.light), layout: .stacked)
            BrandThemeSwitcher(value: .constant(.system), variant: .list)
            BrandThemeSwitcher(value: .constant(.dark), variant: .icon)
            HStack {
                BrandThemeSwitcher(value: .constant(.light), size: .sm)
                BrandThemeSwitcher(value: .constant(.light), size: .lg)
            }
        }
        assertBrandSnapshots(view, width: 380, height: 360, named: "variants")
    }
}

@MainActor
final class TogglesLogicTests: XCTestCase {
    func testTagVariantRawValuesMatchReact() {
        XCTAssertEqual(TagTone.accent1.rawValue, "accent-1")
        XCTAssertEqual(TagTone.support2.rawValue, "support-2")
    }

    func testExclusiveGroupReplacesAndDeselects() {
        typealias Group = BrandToggleGroup<String, EmptyView>
        var selection = Group.nextSelection([], toggling: "a", multiple: false)
        selection = Group.nextSelection(selection, toggling: "b", multiple: false)
        XCTAssertEqual(selection, ["b"])
        selection = Group.nextSelection(selection, toggling: "b", multiple: false)
        XCTAssertEqual(selection, [])
        selection = Group.nextSelection(Group.nextSelection([], toggling: "a", multiple: true), toggling: "b", multiple: true)
        XCTAssertEqual(selection, ["a", "b"])
    }

    func testThemeLabelsDefaultToSpanish() {
        let labels = ThemeSwitcherLabels()
        XCTAssertEqual(labels.text(.light), "Claro")
        XCTAssertEqual(labels.text(.system), "Sistema")
        XCTAssertEqual(labels.group, "Tema")
        XCTAssertEqual(labels.triggerLabel(.light), "Tema: Claro")
    }

    /// El nombre del disparador de `icon` sale de una función, como `themeSwitcher.trigger` en React (D38).
    func testThemeTriggerIsAFunctionOfGroupAndTheme() {
        let labels = ThemeSwitcherLabels(group: "Theme", dark: "Dark", trigger: { group, theme in "\(theme) (\(group))" })
        XCTAssertEqual(labels.triggerLabel(.dark), "Dark (Theme)")
    }
}
