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
    public func brandTextStyle(_ style: BrandTextStyle, relativeTo textStyle: Font.TextStyle = .body) -> some View {
        modifier(BrandScaledFont(size: style.size, weight: style.weight, family: style.family, relativeTo: textStyle))
            .lineSpacing(style.lineSpacing)
            .tracking(style.tracking * style.size)
    }
}
