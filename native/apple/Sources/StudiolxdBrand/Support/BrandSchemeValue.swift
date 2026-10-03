import SwiftUI

/// Un valor que no es un color y cambia con la superficie (hoy, el grosor del subrayado de `Link` y de `Button text`,
/// que en oscuro desaparece en reposo). Los colores son `Color` dinámicos; el resto de tokens con par
/// `surface-dark-*` salen como este tipo y se resuelven con el esquema del entorno:
///
/// ```swift
/// @Environment(\.colorScheme) private var scheme
/// let width = BrandButtonTokens.textUnderlineWidth.value(for: scheme)
/// ```
public struct BrandSchemeValue<Value: Sendable>: Sendable {
    public let light: Value
    public let dark: Value

    public init(light: Value, dark: Value) {
        self.light = light
        self.dark = dark
    }

    /// El valor del esquema dado.
    public func value(for scheme: ColorScheme) -> Value { scheme == .dark ? dark : light }
}
