import XCTest
@testable import StudiolxdBrand

/// Los alias obsoletos de la v51 (como en React, se retiran en la v52): el nombre viejo devuelve el caso nuevo. Las
/// pruebas van marcadas como obsoletas para que el compilador no avise de lo que precisamente comprueban.
final class DeprecatedAliasesTests: XCTestCase {
    @available(*, deprecated)
    func testParagraphSizeAliases() {
        XCTAssertEqual(ParagraphSize.small, .sm)
        XCTAssertEqual(ParagraphSize.default, .md)
        XCTAssertEqual(ParagraphSize.large, .lg)
        XCTAssertEqual(ParagraphSize.allCases.map(\.rawValue), ["sm", "md", "lg"])
    }

    @available(*, deprecated)
    func testTagDangerIsError() {
        XCTAssertEqual(TagTone.danger, .error)
        let variant: TagVariant = .success
        XCTAssertEqual(variant, TagTone.success)
        XCTAssertFalse(TagTone.allCases.map(\.rawValue).contains("danger"))
    }

    @available(*, deprecated)
    func testBannerVariantIsTone() {
        let variant: BannerVariant = .warning
        XCTAssertEqual(variant, BannerTone.warning)
    }
}
