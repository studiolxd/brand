import SwiftUI

/// La talla de un control (`size`: `sm` | `md` | `lg`), la misma en `Button`, `InputField`, `SelectField`… Las
/// alturas salen de `size-component.*` (32 / 40 / 48 pt).
public enum BrandControlSize: String, CaseIterable, Sendable {
    case sm, md, lg
}

private struct BrandControlSizeKey: EnvironmentKey {
    static let defaultValue: BrandControlSize? = nil
}

extension EnvironmentValues {
    /// La talla que un contenedor reparte a los controles que no declaran la suya (`FormSizeContext` en React).
    /// Sin valor, un control es `md`.
    public var brandControlSize: BrandControlSize? {
        get { self[BrandControlSizeKey.self] }
        set { self[BrandControlSizeKey.self] = newValue }
    }
}

extension View {
    /// Fija la talla por defecto de los controles de este árbol (`Form size="…"` en React).
    public func brandControlSize(_ size: BrandControlSize?) -> some View {
        environment(\.brandControlSize, size)
    }
}
