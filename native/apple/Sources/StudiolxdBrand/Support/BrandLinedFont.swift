import CoreText
import SwiftUI

/// La fuente de la marca con el **interlineado de CSS**: `line-height: 1.5` es la caja de línea entera (24 pt a 16 pt),
/// mientras que `lineSpacing` de SwiftUI solo añade espacio *entre* líneas y no cuenta en un texto de una sola línea.
/// Aquí el alto de línea objetivo (`tamaño × múltiplo`) se reparte como `lineSpacing` (lo que falta sobre el alto
/// natural de la fuente) más un `minHeight` para la primera línea. El tamaño crece con el tipo dinámico.
///
/// Con `halfLeading`, lo que falta se reparte en cambio como CSS: medio interlineado arriba y abajo del bloque, además
/// del `lineSpacing` entre líneas. Una línea mide lo mismo que con `minHeight`; un texto de `n` líneas mide
/// `n × line-height` exacto, cuando con `minHeight` se queda corto un interlineado (lo que pasa a partir de la segunda).
private struct BrandLinedFont: ViewModifier {
    @ScaledMetric private var size: CGFloat
    private let weight: Int
    private let family: String
    private let multiple: CGFloat
    private let halfLeading: Bool

    init(size: CGFloat, weight: Int, family: String, multiple: CGFloat, halfLeading: Bool, relativeTo: Font.TextStyle) {
        _size = ScaledMetric(wrappedValue: size, relativeTo: relativeTo)
        self.weight = weight
        self.family = family
        self.multiple = multiple
        self.halfLeading = halfLeading
    }

    func body(content: Content) -> some View {
        let font = brandCTFont(family: family, size: size, weight: weight)
        let natural = CTFontGetAscent(font) + CTFontGetDescent(font) + CTFontGetLeading(font)
        let target = size * multiple
        let leading = max(0, target - natural)
        if halfLeading {
            content
                .font(Font(font))
                .environment(\.brandIconTextSize, size)
                .lineSpacing(leading)
                .padding(.vertical, leading / 2)
        } else {
            content
                .font(Font(font))
                .environment(\.brandIconTextSize, size)
                .lineSpacing(leading)
                .frame(minHeight: target, alignment: .center)
        }
    }
}

extension View {
    /// Fuente de la marca (token de tamaño y peso) con el interlineado de CSS (`line-height` como múltiplo del tamaño).
    /// `halfLeading` reparte el interlineado como CSS también en un texto de varias líneas (ver `BrandLinedFont`).
    func brandLinedFont(size: CGFloat, weight: Int = BrandFontWeight.default, family: String = BrandFontFamily.sans,
                        lineHeight: CGFloat, halfLeading: Bool = false, relativeTo textStyle: Font.TextStyle = .body) -> some View {
        modifier(BrandLinedFont(size: size, weight: weight, family: family, multiple: lineHeight, halfLeading: halfLeading,
                                relativeTo: textStyle))
    }
}
