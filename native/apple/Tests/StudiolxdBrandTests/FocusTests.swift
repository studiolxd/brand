import SwiftUI
import XCTest
@testable import StudiolxdBrand

#if os(macOS)
/// El foco programático: la app lleva su `@FocusState`, lo enlaza con `.brandFocused` y el cursor llega al campo de
/// texto (no al botón − o al ojo). Se verifica sobre una ventana real de AppKit: el primer respondiente pasa a ser el
/// editor de campo del texto.
@MainActor
final class FocusTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    final class Probe: ObservableObject {
        var focusBool: [Bool] = []
        var focusEnum: [String] = []
    }

    enum Field: Hashable { case name, quantity, password }

    struct BoolHarness<Content: View>: View {
        let probe: Probe
        let make: (FocusState<Bool>.Binding) -> Content
        @FocusState var f: Bool
        var body: some View {
            make($f)
                .onChange(of: f) { _, v in probe.focusBool.append(v) }
                .task {
                    try? await Task.sleep(nanoseconds: 300_000_000); f = true
                    try? await Task.sleep(nanoseconds: 400_000_000); f = false
                    try? await Task.sleep(nanoseconds: 400_000_000); f = true
                }
        }
    }

    struct EnumHarness: View {
        let probe: Probe
        @FocusState var focus: Field?
        var body: some View {
            VStack {
                BrandInputField("Nombre", text: .constant("")).brandFocused($focus, equals: .name)
                BrandNumberInputField("Cantidad", value: .constant(nil)).brandFocused($focus, equals: .quantity)
                BrandPasswordField("Contraseña", text: .constant("")).brandFocused($focus, equals: .password)
            }
            .onChange(of: focus) { _, v in probe.focusEnum.append(String(describing: v)) }
            .task {
                for next in [Field.quantity, .password, .name] {
                    try? await Task.sleep(nanoseconds: 400_000_000); focus = next
                }
            }
        }
    }

    private func host<V: View>(_ view: V, wait: UInt64) async throws -> NSWindow {
        let hosting = NSHostingView(rootView: view)
        hosting.frame = CGRect(x: 0, y: 0, width: 320, height: 300)
        let window = NSWindow(contentRect: hosting.frame, styleMask: [.titled], backing: .buffered, defer: false)
        window.isReleasedWhenClosed = false
        window.contentView = hosting
        window.makeKeyAndOrderFront(nil)
        try await Task.sleep(nanoseconds: wait)
        return window
    }

    func testBrandFocusedGivesFocusToTheTextField() async throws {
        try await check("InputField", BoolHarness(probe: Probe()) { BrandInputField("Nombre", text: .constant("")).brandFocused($0) })
        try await check("NumberInputField", BoolHarness(probe: Probe()) { BrandNumberInputField("Cantidad", value: .constant(nil)).brandFocused($0) })
        try await check("PasswordField", BoolHarness(probe: Probe()) { BrandPasswordField("Contraseña", text: .constant("")).brandFocused($0) })
    }

    private func check<C: View>(_ name: String, _ harness: BoolHarness<C>, line: UInt = #line) async throws {
        let window = try await host(harness, wait: 2_000_000_000)
        // true → false → true: el último estado deja el cursor en el campo y la app lo sabe.
        XCTAssertEqual(harness.probe.focusBool, [true, false, true], name, line: line)
        XCTAssertTrue(window.firstResponder is NSText || window.firstResponder is NSTextField,
                      "\(name): el primer respondiente no es el texto: \(String(describing: window.firstResponder))", line: line)
        window.close()
    }

    func testBrandFocusedEqualsMovesBetweenFields() async throws {
        let probe = Probe()
        let window = try await host(EnumHarness(probe: probe), wait: 2_000_000_000)
        XCTAssertEqual(probe.focusEnum, ["Optional(StudiolxdBrandTests.FocusTests.Field.quantity)",
                                         "Optional(StudiolxdBrandTests.FocusTests.Field.password)",
                                         "Optional(StudiolxdBrandTests.FocusTests.Field.name)"])
        window.close()
    }
}
#endif

#if os(iOS)
import UIKit

/// Lo mismo en iOS: el primer respondiente de una `UIWindow` real pasa a ser el `UITextField` del campo.
@MainActor
final class FocusTests: XCTestCase {
    override func setUp() async throws { StudiolxdBrand.registerFonts() }

    struct Harness<Content: View>: View {
        let make: (FocusState<Bool>.Binding) -> Content
        @FocusState var f: Bool
        var body: some View {
            make($f).task { try? await Task.sleep(nanoseconds: 500_000_000); f = true }
        }
    }

    private func firstResponder(of view: UIView) -> UIResponder? {
        if view.isFirstResponder { return view }
        for sub in view.subviews { if let r = firstResponder(of: sub) { return r } }
        return nil
    }

    private func check<C: View>(_ name: String, _ harness: Harness<C>, line: UInt = #line) async throws {
        let controller = UIHostingController(rootView: harness)
        let window = UIWindow(frame: CGRect(x: 0, y: 0, width: 390, height: 400))
        window.rootViewController = controller
        window.makeKeyAndVisible()
        try await Task.sleep(nanoseconds: 2_000_000_000)
        XCTAssertTrue(firstResponder(of: window) is UITextField, "\(name): el primer respondiente no es el texto", line: line)
        window.isHidden = true
    }

    func testBrandFocusedGivesFocusToTheTextField() async throws {
        try await check("InputField", Harness { BrandInputField("Nombre", text: .constant("")).brandFocused($0) })
        try await check("NumberInputField", Harness { BrandNumberInputField("Cantidad", value: .constant(nil)).brandFocused($0) })
        try await check("PasswordField", Harness { BrandPasswordField("Contraseña", text: .constant("")).brandFocused($0) })
    }
}
#endif
