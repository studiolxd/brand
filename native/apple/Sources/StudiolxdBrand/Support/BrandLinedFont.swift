import CoreText
import SwiftUI

/// La fuente de la marca con el **interlineado de CSS**: `line-height: 1.5` es la caja de línea entera (24 pt a 16 pt),
/// mientras que `lineSpacing` de SwiftUI solo añade espacio *entre* líneas y no cuenta en un texto de una sola línea.
/// Aquí el alto de línea objetivo (`tamaño × múltiplo`) se reparte como `lineSpacing` (lo que falta sobre el alto
/// natural de la fuente) más un `minHeight` para la primera línea. El tamaño crece con el tipo dinámico.
private struct BrandLinedFont: ViewModifier {
    @ScaledMetric private var size: CGFloat
    private let weight: Int
    private let family: String
    private let multiple: CGFloat

    init(size: CGFloat, weight: Int, family: String, multiple: CGFloat, relativeTo: Font.TextStyle) {
        _size = ScaledMetric(wrappedValue: size, relativeTo: relativeTo)
        self.weight = weight
        self.family = family
        self.multiple = multiple
    }

    func body(content: Content) -> some View {
        let font = brandCTFont(family: family, size: size, weight: weight)
        let natural = CTFontGetAscent(font) + CTFontGetDescent(font) + CTFontGetLeading(font)
        let target = size * multiple
        content
            .font(Font(font))
            .environment(\.brandIconTextSize, size)
            .lineSpacing(max(0, target - natural))
            .frame(minHeight: target, alignment: .center)
    }
}

extension View {
    /// Fuente de la marca (token de tamaño y peso) con el interlineado de CSS (`line-height` como múltiplo del tamaño).
    func brandLinedFont(size: CGFloat, weight: Int = BrandFontWeight.default, family: String = BrandFontFamily.sans,
                        lineHeight: CGFloat, relativeTo textStyle: Font.TextStyle = .body) -> some View {
        modifier(BrandLinedFont(size: size, weight: weight, family: family, multiple: lineHeight, relativeTo: textStyle))
    }
}
