import SwiftUI

/// Aplica una fuente de la marca que **crece con el tipo dinámico**: `Font(CTFont)` no lo hace por sí sola, así que
/// el tamaño pasa por un `@ScaledMetric`. El tamaño de partida es el token (a la talla `large` del sistema).
private struct BrandScaledFont: ViewModifier {
    @ScaledMetric private var size: CGFloat
    private let weight: Int
    private let family: String

    init(size: CGFloat, weight: Int, family: String, relativeTo: Font.TextStyle) {
        _size = ScaledMetric(wrappedValue: size, relativeTo: relativeTo)
        self.weight = weight
        self.family = family
    }

    func body(content: Content) -> some View {
        content
            .font(Font(brandCTFont(family: family, size: size, weight: weight)))
            .environment(\.brandIconTextSize, size)
    }
}

extension View {
    /// La fuente de la marca con un tamaño y un peso de token (`font-size.*`, `font-weight.*`), escalada con el
    /// tipo dinámico. Los iconos `size: .text` de dentro miden este mismo tamaño (`1em`).
    public func brandFont(size: CGFloat, weight: Int = BrandFontWeight.default, family: String = BrandFontFamily.sans,
                          relativeTo textStyle: Font.TextStyle = .body) -> some View {
        modifier(BrandScaledFont(size: size, weight: weight, family: family, relativeTo: textStyle))
    }

    /// El estilo de texto completo (fuente, interlineado y tracking) escalado con el tipo dinámico.
    ///
    /// **Obsoleto**: pone el interlineado solo *entre* líneas (`lineSpacing`), así que una línea mide el alto natural de
    /// la fuente y no el `line-height` de la web. `brandLinedFont(_:)` da la caja de línea de CSS. Se conserva sin
    /// cambios para no mover las pantallas que ya lo usan.
    @available(*, deprecated, renamed: "brandLinedFont(_:relativeTo:)",
               message: "Usa brandLinedFont(_:), que aplica la caja de línea de CSS (una línea mide tamaño × line-height, como en la web).")
    public func brandTextStyle(_ style: BrandTextStyle, relativeTo textStyle: Font.TextStyle = .body) -> some View {
        modifier(BrandScaledFont(size: style.size, weight: style.weight, family: style.family, relativeTo: textStyle))
            .lineSpacing(style.lineSpacing)
            .tracking(style.tracking * style.size)
    }
}
