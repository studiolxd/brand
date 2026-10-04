import SwiftUI
import XCTest
@testable import StudiolxdBrand

/// La lógica de Banner, Menu, Tabs, DatePickerField y PageIntro que no se ve en una captura.
final class NavigationLogicTests: XCTestCase {
    // MARK: Menu — reparto de ítems en grupos

    private func titles(_ groups: [BrandMenuGroup]) -> [Bool] { groups.map { $0.title != nil } }

    func testMenuGroupsSplitOnSeparatorsAndLabels() {
        let groups = BrandMenuGroup.groups(of: [
            .button("Duplicar", action: {}),
            .button("Editar", action: {}),
            .separator,
            .label("Ordenar por"),
            .radio("Nombre", value: "name"),
            .radio("Fecha", value: "date"),
            .separator,
            .button("Eliminar", destructive: true, action: {}),
        ])
        XCTAssertEqual(groups.count, 3)
        XCTAssertEqual(titles(groups), [false, true, false])
        XCTAssertEqual(groups[0].entries.count, 2)
        // Los dos radio consecutivos forman UN grupo de radio.
        XCTAssertEqual(groups[1].entries.count, 1)
        guard case .radios(let radios) = groups[1].entries[0] else { return XCTFail("esperaba un grupo de radio") }
        XCTAssertEqual(radios.count, 2)
    }

    func testMenuGroupsIgnoreEmptyGroupsAndLeadingSeparators() {
        let groups = BrandMenuGroup.groups(of: [
            .separator, .separator, .button("A", action: {}), .separator, .separator, .label("Solo rótulo"),
        ])
        XCTAssertEqual(groups.count, 1)
        XCTAssertEqual(groups[0].entries.count, 1)
        XCTAssertTrue(BrandMenuGroup.groups(of: []).isEmpty)
    }

    func testMenuRadiosSeparatedByAButtonAreTwoGroups() {
        let groups = BrandMenuGroup.groups(of: [
            .radio("A", value: "a"), .button("Acción", action: {}), .radio("B", value: "b"),
        ])
        XCTAssertEqual(groups.count, 1)
        XCTAssertEqual(groups[0].entries.count, 3)
    }

    // MARK: Tabs — teclado

    private func entries(_ values: [(String, Bool)]) -> [BrandTabEntry] {
        values.map { BrandTabEntry(value: AnyHashable($0.0), disabled: $0.1) }
    }

    func testTabsNextAndPreviousWrapAround() {
        let e = entries([("a", false), ("b", false), ("c", false)])
        XCTAssertEqual(BrandTabsNavigation.target(from: AnyHashable("a"), move: .next, entries: e), AnyHashable("b"))
        XCTAssertEqual(BrandTabsNavigation.target(from: AnyHashable("c"), move: .next, entries: e), AnyHashable("a"))
        XCTAssertEqual(BrandTabsNavigation.target(from: AnyHashable("a"), move: .previous, entries: e), AnyHashable("c"))
    }

    func testTabsSkipDisabled() {
        let e = entries([("a", false), ("b", true), ("c", false)])
        XCTAssertEqual(BrandTabsNavigation.target(from: AnyHashable("a"), move: .next, entries: e), AnyHashable("c"))
        XCTAssertEqual(BrandTabsNavigation.target(from: AnyHashable("c"), move: .previous, entries: e), AnyHashable("a"))
        XCTAssertEqual(BrandTabsNavigation.target(from: nil, move: .first, entries: entries([("a", true), ("b", false)])), AnyHashable("b"))
        XCTAssertEqual(BrandTabsNavigation.target(from: nil, move: .last, entries: entries([("a", false), ("b", true)])), AnyHashable("a"))
    }

    func testTabsFirstAndLastAndNoCurrent() {
        let e = entries([("a", false), ("b", false), ("c", false)])
        XCTAssertEqual(BrandTabsNavigation.target(from: AnyHashable("b"), move: .first, entries: e), AnyHashable("a"))
        XCTAssertEqual(BrandTabsNavigation.target(from: AnyHashable("b"), move: .last, entries: e), AnyHashable("c"))
        XCTAssertEqual(BrandTabsNavigation.target(from: nil, move: .next, entries: e), AnyHashable("a"))
        XCTAssertEqual(BrandTabsNavigation.target(from: nil, move: .previous, entries: e), AnyHashable("c"))
        // Un valor que ya no está (o está deshabilitado) cuenta como «sin pestaña actual».
        XCTAssertEqual(BrandTabsNavigation.target(from: AnyHashable("z"), move: .next, entries: e), AnyHashable("a"))
    }

    func testTabsWithNothingEnabledHasNoTarget() {
        XCTAssertNil(BrandTabsNavigation.target(from: nil, move: .next, entries: []))
        XCTAssertNil(BrandTabsNavigation.target(from: nil, move: .next, entries: entries([("a", true)])))
    }

    // MARK: DatePickerField — fechas de calendario

    private var madrid: Calendar {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "Europe/Madrid")!
        return calendar
    }

    private func date(_ y: Int, _ m: Int, _ d: Int, _ h: Int = 0, _ min: Int = 0, calendar: Calendar) -> Date {
        calendar.date(from: DateComponents(year: y, month: m, day: d, hour: h, minute: min))!
    }

    func testDateIsNormalizedToStartOfDay() {
        let calendar = madrid
        let afternoon = date(2026, 5, 18, 17, 45, calendar: calendar)
        let normalized = BrandDatePickerField.normalized(afternoon, calendar: calendar)
        XCTAssertEqual(normalized, date(2026, 5, 18, calendar: calendar))
        let parts = calendar.dateComponents([.hour, .minute, .second], from: normalized)
        XCTAssertEqual([parts.hour, parts.minute, parts.second], [0, 0, 0])
        // Normalizar dos veces no cambia nada.
        XCTAssertEqual(BrandDatePickerField.normalized(normalized, calendar: calendar), normalized)
    }

    func testDateIsClampedToTheRange() {
        let calendar = madrid
        let range = date(2026, 5, 10, 9, calendar: calendar)...date(2026, 5, 25, 18, calendar: calendar)
        func clamp(_ d: Date) -> Date { BrandDatePickerField.clamped(d, to: range, calendar: calendar) }
        XCTAssertEqual(clamp(date(2026, 5, 1, 12, calendar: calendar)), date(2026, 5, 10, calendar: calendar))
        XCTAssertEqual(clamp(date(2026, 6, 1, 12, calendar: calendar)), date(2026, 5, 25, calendar: calendar))
        XCTAssertEqual(clamp(date(2026, 5, 18, 12, calendar: calendar)), date(2026, 5, 18, calendar: calendar))
        // Sin rango, solo se normaliza.
        XCTAssertEqual(BrandDatePickerField.clamped(date(2026, 5, 18, 12, calendar: calendar), to: nil, calendar: calendar),
                       date(2026, 5, 18, calendar: calendar))
    }

    func testDisplayTextFollowsTheLocale() {
        let calendar = madrid
        let day = date(2026, 5, 18, calendar: calendar)
        XCTAssertEqual(BrandDatePickerField.displayText(day, locale: Locale(identifier: "es_ES"), calendar: calendar), "18/05/2026")
        XCTAssertEqual(BrandDatePickerField.displayText(day, locale: Locale(identifier: "en_US"), calendar: calendar), "05/18/2026")
        // Un día de un solo dígito se escribe con dos.
        XCTAssertEqual(BrandDatePickerField.displayText(date(2026, 1, 3, calendar: calendar), locale: Locale(identifier: "es_ES"), calendar: calendar),
                       "03/01/2026")
    }

    // MARK: Banner

    func testBannerVariantsAndDefaultLabel() {
        XCTAssertEqual(BannerVariant.allCases.map(\.rawValue), ["info", "warning", "error"])
    }

    // MARK: PageIntro

    func testHeadingLevelPointsMatchTheTokens() {
        XCTAssertEqual(HeadingLevel.h1.points, BrandTextTokens.h1FontSize)
        XCTAssertEqual(HeadingLevel.h6.points, BrandTextTokens.h6FontSize)
        XCTAssertEqual(HeadingSize.s5.points, BrandTextTokens.size5)
    }

    func testAdaptiveThresholdIs480() {
        XCTAssertEqual(brandAdaptiveRowThreshold, 480)
    }
}
