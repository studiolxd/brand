import SwiftUI

/// Una sombra de CSS: desplazamiento, desenfoque y color. Salen de `BrandShadows`.
public struct BrandShadow: Sendable {
    public let x: CGFloat
    public let y: CGFloat
    /// El desenfoque de CSS. En SwiftUI, `radius` ≈ `blur / 2`.
    public let blur: CGFloat
    public let color: Color

    /// Sin sombra.
    public static let none = BrandShadow(x: 0, y: 0, blur: 0, color: .clear)

    public init(x: CGFloat, y: CGFloat, blur: CGFloat, color: Color) {
        self.x = x
        self.y = y
        self.blur = blur
        self.color = color
    }
}

extension View {
    /// Aplica una sombra de la marca.
    public func brandShadow(_ shadow: BrandShadow) -> some View {
        self.shadow(color: shadow.color, radius: shadow.blur / 2, x: shadow.x, y: shadow.y)
    }
}

/// Una curva `cubic-bezier(x1, y1, x2, y2)` de CSS. Salen de `BrandEasing`.
public struct BrandCubicBezier: Sendable {
    public let x1: Double
    public let y1: Double
    public let x2: Double
    public let y2: Double

    /// `linear`: velocidad constante.
    public static let linear = BrandCubicBezier(0, 0, 1, 1)

    public init(_ x1: Double, _ y1: Double, _ x2: Double, _ y2: Double) {
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
    }

    /// La curva como animación de SwiftUI, con la duración en segundos (por ejemplo `BrandDuration.base`).
    public func animation(duration: TimeInterval) -> Animation {
        .timingCurve(x1, y1, x2, y2, duration: duration)
    }
}
