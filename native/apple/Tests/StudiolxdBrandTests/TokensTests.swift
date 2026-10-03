import CoreText
import SwiftUI
import XCTest
@testable import StudiolxdBrand

final class TokensTests: XCTestCase {
    private func resolved(_ color: Color, _ scheme: ColorScheme) -> Color.Resolved {
        var environment = EnvironmentValues()
        environment.colorScheme = scheme
        return color.resolve(in: environment)
    }

    func testScalesUseRemTimesSixteen() {
        XCTAssertEqual(BrandSpacing.s1, 4)
        XCTAssertEqual(BrandSpacing.s4, 16)
        XCTAssertEqual(BrandFontSize.s2, 16)
        XCTAssertEqual(BrandSize.componentMd, 40)
        XCTAssertEqual(BrandRadius.round, 9999)
        XCTAssertEqual(BrandBorderWidth.focus, 2)
        XCTAssertEqual(BrandFontWeight.default, 300)
        XCTAssertEqual(BrandFontWeight.emphasis, 500)
        XCTAssertEqual(BrandDuration.fast, 0.15, accuracy: 0.0001)
        XCTAssertEqual(BrandLetterSpacing.tight, -0.02, accuracy: 0.0001)
    }

    func testRoleResolvesToItsLightAndDarkValue() {
        let light = resolved(BrandColorRoles.text, .light)
        let dark = resolved(BrandColorRoles.text, .dark)
        // text.on-light = prusia #111E30; text.on-dark = blanco.
        XCTAssertEqual(light.red, Float(0x11) / 255, accuracy: 0.01)
        XCTAssertEqual(light.green, Float(0x1E) / 255, accuracy: 0.01)
        XCTAssertEqual(dark.red, 1, accuracy: 0.01)
        XCTAssertEqual(dark.green, 1, accuracy: 0.01)
    }

    func testFontsRegisterAndVariableWeightApplies() throws {
        XCTAssertTrue(StudiolxdBrand.registerFonts())
        XCTAssertTrue(StudiolxdBrand.registerFonts(), "es idempotente")

        for family in [BrandFontFamily.sans, BrandFontFamily.mono, BrandFontFamily.serif] {
            let font = brandCTFont(family: family, size: 16, weight: 300)
            let installed = CTFontCopyFamilyName(font) as String
            XCTAssertTrue(installed.hasPrefix(family), "\(family) no se resolvió: salió \(installed)")
        }

        func width(_ weight: Int) -> Double {
            let font = brandCTFont(family: BrandFontFamily.sans, size: 64, weight: weight)
            let line = CTLineCreateWithAttributedString(NSAttributedString(string: "Studio LXD", attributes: [.font: font]))
            return CTLineGetTypographicBounds(line, nil, nil, nil)
        }
        XCTAssertGreaterThan(width(500), width(300), "el eje wght debe ensanchar el trazo")

        let variation = CTFontCopyVariation(brandCTFont(family: BrandFontFamily.sans, size: 16, weight: 500)) as? [NSNumber: NSNumber]
        XCTAssertEqual(variation?[NSNumber(value: 0x7767_6874)]?.intValue, 500)
    }

    func testEveryTextStyleBuildsAFont() {
        for style in BrandTextStyle.allCases {
            XCTAssertGreaterThan(style.size, 0)
            XCTAssertGreaterThanOrEqual(style.lineSpacing, 0)
            _ = Font.brand(style)
        }
    }
}
