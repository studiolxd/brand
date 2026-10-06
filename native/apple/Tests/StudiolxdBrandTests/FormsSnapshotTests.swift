import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// Capturas de `InputField`, `NumberInputField` y `SelectField`: estados (reposo, valor, ayuda, error, deshabilitado,
/// solo lectura), búsqueda con borrado, tallas y el campo con el foco puesto. Claro y oscuro, iOS y macOS.
@MainActor
final class FormsSnapshotTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    private let languages: [BrandSelectEntry] = [.option("es", "Español"), .option("en", "Inglés")]

    // MARK: InputField

    func testInputFieldStates() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandInputField("Nombre", text: .constant(""), placeholder: "Escribe tu nombre")
            BrandInputField("Con valor y ayuda", text: .constant("Ada Lovelace"), helperText: "Así te verán los demás")
            BrandInputField("Con error", text: .constant("ada@"), errorMessage: "El correo no es válido")
            BrandInputField("Deshabilitado", text: .constant("Ada Lovelace")).disabled(true)
            BrandInputField("Solo lectura", text: .constant("Ada Lovelace"), readOnly: true)
        }
        assertBrandSnapshots(view, width: 340, height: 440, named: "states")
    }

    func testInputFieldSizes() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            ForEach(BrandControlSize.allCases, id: \.self) { size in
                BrandInputField("Talla \(size.rawValue)", text: .constant("Texto"), size: size)
            }
        }
        assertBrandSnapshots(view, width: 340, height: 280, named: "sizes")
    }

    func testInputFieldSearch() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandInputField("Buscar", text: .constant(""), labelHidden: true, kind: .search, clearable: true)
            BrandInputField("Buscar", text: .constant("casa"), labelHidden: true, kind: .search, clearable: true)
            BrandInputField("Buscar", text: .constant("casa"), labelHidden: true, kind: .search, clearable: true, size: .sm)
            BrandInputField("Buscar", text: .constant("casa"), labelHidden: true, kind: .search, clearable: true, size: .lg)
        }
        assertBrandSnapshots(view, width: 340, height: 250, named: "search")
    }

    func testInputFieldPassword() {
        assertBrandSnapshots(
            BrandInputField("Contraseña", text: .constant("secreto123"), type: .password),
            width: 340, height: 100, named: "password"
        )
    }

    // MARK: NumberInputField

    func testNumberInputFieldStates() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandNumberInputField("Cantidad", value: .constant(3), min: 0, max: 5, helperText: "Entre 0 y 5")
            BrandNumberInputField("Máximo alcanzado", value: .constant(5), min: 0, max: 5)
            BrandNumberInputField("Con error", value: .constant(12), errorMessage: "Demasiadas unidades")
            BrandNumberInputField("Deshabilitado", value: .constant(3)).disabled(true)
            BrandNumberInputField("Importe", value: .constant(12.5), step: 0.5, decimal: true)
        }
        assertBrandSnapshots(view, width: 340, height: 440, named: "states")
    }

    func testNumberInputFieldSizes() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            ForEach(BrandControlSize.allCases, id: \.self) { size in
                BrandNumberInputField("Talla \(size.rawValue)", value: .constant(3), size: size)
            }
        }
        assertBrandSnapshots(view, width: 340, height: 280, named: "sizes")
    }

    func testNumberInputFieldEmpty() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandNumberInputField("Plazas", value: .constant(nil), placeholder: "Sin indicar", min: 0, max: 10,
                                  helperText: "Déjalo vacío si no lo sabes.")
            BrandNumberInputField("Sin marcador", value: .constant(nil), min: 0, max: 10)
            BrandNumberInputField("Con error", value: .constant(nil), placeholder: "Sin indicar", errorMessage: "Indica las plazas")
        }
        assertBrandSnapshots(view, width: 340, height: 330, named: "empty")
    }

    func testNumberInputFieldCompact() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandListItem(content: { Text("Leche entera") }, secondary: { Text("1 l") }, trailing: {
                BrandNumberInputField("Cantidad de leche", value: .constant(2), labelHidden: true, min: 0, max: 99, compact: true, commitMode: .blur)
            })
            BrandListItem(content: { Text("Pan de molde integral con semillas") }, secondary: { EmptyView() }, trailing: {
                BrandNumberInputField("Cantidad de pan", value: .constant(12), labelHidden: true, min: 0, max: 99, compact: true, commitMode: .blur)
            })
            BrandNumberInputField("Vacío", value: .constant(nil), labelHidden: true, placeholder: "–", compact: true)
        }
        assertBrandSnapshots(view, width: 340, height: 220, named: "compact")
    }

    // MARK: PasswordField

    func testPasswordFieldStates() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandPasswordField("Contraseña", text: .constant(""), labelHidden: true)
            BrandPasswordField("Contraseña oculta", text: .constant("secreto123"), labelHidden: false, helperText: "Mínimo 8 caracteres")
            BrandPasswordField("Contraseña visible", text: .constant("secreto123"), labelHidden: false, initiallyVisible: true)
            BrandPasswordField("Con error", text: .constant("1234"), labelHidden: false, errorMessage: "Es demasiado corta")
            BrandPasswordField("Deshabilitada", text: .constant("secreto123"), labelHidden: false).disabled(true)
        }
        assertBrandSnapshots(view, width: 340, height: 480, named: "states")
    }

    func testPasswordFieldSizes() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            ForEach(BrandControlSize.allCases, id: \.self) { size in
                BrandPasswordField("Talla \(size.rawValue)", text: .constant("secreto123"), labelHidden: false, size: size)
            }
            BrandPasswordField("Talla lg visible", text: .constant("secreto123"), labelHidden: false, size: .lg, initiallyVisible: true)
        }
        assertBrandSnapshots(view, width: 340, height: 380, named: "sizes")
    }

    // MARK: SelectField

    func testSelectFieldStates() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            BrandSelectField("Idioma", selection: .constant("es"), options: languages, helperText: "Cambia el idioma de la app")
            BrandSelectField("Sin elegir", selection: .constant(""), options: languages)
            BrandSelectField("Con error", selection: .constant(""), options: languages, errorMessage: "Elige una opción")
            BrandSelectField("Deshabilitado", selection: .constant("en"), options: languages).disabled(true)
        }
        assertBrandSnapshots(view, width: 340, height: 380, named: "states")
    }

    func testSelectFieldSizes() {
        let view = VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            ForEach(BrandControlSize.allCases, id: \.self) { size in
                BrandSelectField("Talla \(size.rawValue)", selection: .constant("es"), options: self.languages, size: size)
            }
        }
        assertBrandSnapshots(view, width: 340, height: 280, named: "sizes")
    }

    // MARK: Parejas con React (mismo ancho que la story, 16 pt de margen como el recorte de `capture-story.mjs`)

    func testComparisonInputError() {
        let view = BrandInputField(
            "Nombre completo", text: .constant(""),
            errorMessage: "Este campo es obligatorio.", helperText: "Escríbelo tal como aparece en tu DNI."
        )
        assertBrandSnapshots(view, width: 352, height: 159, named: "compare-input-error", padding: 16)
    }

    func testComparisonNumberMinMax() {
        let view = BrandNumberInputField("Cantidad", value: .constant(1), min: 0, max: 10, helperText: "Entre 0 y 10.")
            .frame(width: 224)
        assertBrandSnapshots(view, width: 256, height: 130, named: "compare-number", padding: 16)
    }

    /// Pareja de `Atoms/NumberInput` «En una fila de lista»: el compacto como `trailing` de `BrandListItem`.
    func testComparisonNumberCompact() {
        let view = BrandList(type: .plain, showSeparators: true) {
            BrandListItem(content: { Text("Leche entera") }, secondary: { Text("1 l") }, trailing: {
                BrandNumberInputField("Cantidad de leche", value: .constant(2), labelHidden: true, min: 0, max: 99, compact: true, commitMode: .blur)
            })
            BrandListItem(content: { Text("Huevos") }, secondary: { EmptyView() }, trailing: {
                BrandNumberInputField("Cantidad de huevos", value: .constant(12), labelHidden: true, min: 0, max: 99, compact: true, commitMode: .blur)
            })
            BrandListItem(content: { Text("Pan de molde integral con semillas") }, secondary: { EmptyView() }, trailing: {
                BrandNumberInputField("Cantidad de pan", value: .constant(1), labelHidden: true, min: 0, max: 99, compact: true, commitMode: .blur)
            })
        }
        assertBrandSnapshots(view, width: 352, height: 200, named: "compare-number-compact", padding: 16)
    }

    func testComparisonSelectValue() {
        let view = BrandSelectField("Tipo de contrato", selection: .constant("full-time"), options: [
            .option("", "Selecciona un tipo"), .option("full-time", "Jornada completa"),
            .option("part-time", "Media jornada"), .option("freelance", "Autónomo"),
        ])
        assertBrandSnapshots(view, width: 352, height: 101, named: "compare-select", padding: 16)
    }

    func testComparisonNumberEmpty() {
        let view = BrandNumberInputField(
            "Cantidad", value: .constant(nil), placeholder: "Sin indicar", helperText: "Déjalo vacío si no lo sabes.")
            .frame(width: 224)
        assertBrandSnapshots(view, width: 352, height: 130, named: "compare-number-empty", padding: 16)
    }

    func testComparisonPasswordDefault() {
        assertBrandSnapshots(BrandPasswordField("Contraseña", text: .constant("")),
                             width: 352, height: 101, named: "compare-password-default", padding: 16)
    }

    func testComparisonPasswordVisible() {
        assertBrandSnapshots(BrandPasswordField("Contraseña", text: .constant(""), initiallyVisible: true),
                             width: 352, height: 101, named: "compare-password-visible", padding: 16)
    }

    func testComparisonPasswordError() {
        assertBrandSnapshots(
            BrandPasswordField("Contraseña", text: .constant("1234"), errorMessage: "La contraseña es incorrecta."),
            width: 352, height: 130, named: "compare-password-error", padding: 16)
    }

    func testDynamicTypeAccessibility() {
        assertBrandSnapshots(
            BrandInputField("Nombre", text: .constant("Ada"), helperText: "Ayuda"),
            width: 380, height: 220, named: "input-dynamic-type", dynamicType: .accessibility3
        )
    }
}

@MainActor
final class FormsLogicTests: XCTestCase {
    func testEnumRawValuesMatchReact() {
        XCTAssertEqual(InputFieldType.allCases.map(\.rawValue), ["text", "email", "password", "number", "tel", "url"])
        XCTAssertEqual(InputFieldKind.allCases.map(\.rawValue), ["text", "search"])
        XCTAssertEqual(InputFieldSize.allCases.map(\.rawValue), ["sm", "md", "lg"])
        XCTAssertEqual(PasswordFieldSize.allCases.map(\.rawValue), ["sm", "md", "lg"])
    }

    func testCommitModeRawValuesMatchReact() {
        XCTAssertEqual(NumberInputCommitMode.allCases.map(\.rawValue), ["change", "blur"])
    }

    func testNumberInputCommitResolve() {
        let range = 0.0...9.0
        typealias C = NumberInputCommit
        XCTAssertEqual(C.resolve(raw: "5", decimal: false, range: range, current: 1), .set(5))
        XCTAssertEqual(C.resolve(raw: "50", decimal: false, range: range, current: 1), .set(9), "se ajusta a max")
        XCTAssertEqual(C.resolve(raw: "9", decimal: false, range: range, current: 9), .keep, "igual que el valor: no se escribe")
        XCTAssertEqual(C.resolve(raw: "2,5", decimal: true, range: range, current: 1), .set(2.5))
        XCTAssertEqual(C.resolve(raw: "", decimal: false, range: range, current: 3), .set(nil))
        XCTAssertEqual(C.resolve(raw: " ", decimal: false, range: range, current: nil), .keep)
        XCTAssertEqual(C.resolve(raw: "-", decimal: false, range: range, current: 3), .keep, "aún no es un número")
    }

    func testCompactTokens() {
        XCTAssertEqual(BrandNumberInputTokens.compactHeight, BrandSize.componentSm)
        XCTAssertLessThan(BrandNumberInputTokens.compactBtnWidth, BrandHitTarget.minimum, "la zona táctil se amplía, no el botón")
    }

    func testControlHeightsComeFromTokens() {
        XCTAssertEqual(BrandInputTokens.height, BrandSize.componentMd)
        XCTAssertEqual(BrandSelectTokens.smHeight, BrandSize.componentSm)
        XCTAssertEqual(BrandNumberInputTokens.lgHeight, BrandSize.componentLg)
    }
}
