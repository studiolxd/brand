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
    }

    func testControlHeightsComeFromTokens() {
        XCTAssertEqual(BrandInputTokens.height, BrandSize.componentMd)
        XCTAssertEqual(BrandSelectTokens.smHeight, BrandSize.componentSm)
        XCTAssertEqual(BrandNumberInputTokens.lgHeight, BrandSize.componentLg)
    }
}
