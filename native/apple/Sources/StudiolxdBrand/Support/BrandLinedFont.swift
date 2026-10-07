import CoreText
import SwiftUI

/// La fuente de la marca con la **caja de línea de CSS**. En CSS, `line-height: 1.5` es la caja de línea entera (24 pt a
/// 16 pt): lo que sobra sobre el alto natural de la fuente (el *leading*) se reparte mitad arriba y mitad abajo de cada
/// línea, así que un texto de `n` líneas mide `n × line-height` exacto. SwiftUI solo pone `lineSpacing` *entre* líneas:
/// una línea mide el alto natural y `n` líneas se quedan cortas un interlineado.
///
/// Aquí el alto de línea objetivo (`tamaño × múltiplo`) se construye igual que en CSS: `lineSpacing` entre líneas y
/// medio interlineado arriba y abajo del bloque (`BrandLineBox`). El tamaño crece con el tipo dinámico.
///
/// Si el `line-height` es **menor** que el alto natural (los títulos a 1,1, los controles a 1; Google Sans Flex mide
/// 1,25 em), el medio interlineado es negativo, como en CSS: el bloque mide la caja de línea y la tinta desborda por
/// arriba y por abajo. En un texto de **una** línea es exacto. En varias líneas SwiftUI no puede apretar el paso por
/// debajo del alto natural (un `lineSpacing` negativo se ignora), así que cada línea a partir de la segunda mide el alto
/// natural en vez del `line-height`.
///
/// El modo `container` (`brandLinedContainerFont`) es para una vista que **no es una línea de texto** sino que la contiene junto a otras cosas (la fila de
/// una lista, con su icono y su accesorio): le pone la fuente y el interlineado para lo que haya dentro y le da como alto
/// mínimo una línea, sin el medio interlineado, que a la fila entera la haría crecer por encima de su icono. Es la fila
/// flexible de CSS: mide lo que su hijo más alto, y la caja de línea es la del texto, no la de la fila. El texto que
/// quiera la caja exacta en varias líneas lleva además su propio `brandLinedFont`.
private struct BrandLinedFont: ViewModifier {
    @ScaledMetric private var size: CGFloat
    private let weight: Int
    private let family: String
    private let multiple: CGFloat
    private let mode: Mode

    enum Mode {
        /// La caja de línea de CSS (`BrandLineBox`).
        case text
        /// Fuente e interlineado para un contenedor, con una línea de alto mínimo.
        case container
    }

    init(size: CGFloat, weight: Int, family: String, multiple: CGFloat, mode: Mode, relativeTo: Font.TextStyle) {
        _size = ScaledMetric(wrappedValue: size, relativeTo: relativeTo)
        self.weight = weight
        self.family = family
        self.multiple = multiple
        self.mode = mode
    }

    func body(content: Content) -> some View {
        let font = brandCTFont(family: family, size: size, weight: weight)
        let natural = CTFontGetAscent(font) + CTFontGetDescent(font) + CTFontGetLeading(font)
        let leading = size * multiple - natural
        let styled = content
            .font(Font(font))
            .environment(\.brandIconTextSize, size)
            .lineSpacing(max(0, leading))
        switch mode {
        // El `VStack` hace de la vista una sola (un `@ViewBuilder` puede traer varias) para que la caja la mida entera.
        case .text: BrandLineBox(lineHeight: size * multiple, natural: natural) { VStack(alignment: .leading, spacing: 0) { styled } }
        case .container: styled.frame(minHeight: size * multiple, alignment: .leading)
        }
    }
}

/// La caja de línea de CSS alrededor de un texto: cuenta sus líneas por el alto que pide (alto natural más el
/// interlineado entre líneas), mide `n × line-height` y lo centra, que es repartir el interlineado mitad arriba y mitad
/// abajo. Va como `Layout` y no como `padding` porque SwiftUI redondea el alto del `Text` al píxel (±0,5 pt a @2x): con
/// un relleno ese redondeo se sumaba a cada texto; aquí la caja sale exacta y el redondeo solo mueve la tinta.
private struct BrandLineBox: Layout {
    /// La caja de una línea (`tamaño × line-height`).
    let lineHeight: CGFloat
    /// El alto natural de una línea de la fuente (ascendente + descendente + interlineado propio).
    let natural: CGFloat

    /// Lo que SwiftUI pone entre líneas (`lineSpacing`): no admite valores negativos.
    private var spacing: CGFloat { max(0, lineHeight - natural) }

    private func textSize(_ subviews: Subviews, width: CGFloat?) -> CGSize {
        subviews.first?.sizeThatFits(ProposedViewSize(width: width, height: nil)) ?? .zero
    }

    private func boxHeight(for textHeight: CGFloat) -> CGFloat {
        let lines = max(1, ((textHeight + spacing) / (natural + spacing)).rounded())
        // Con un `line-height` menor que el alto natural, SwiftUI no aprieta el paso entre líneas: la segunda y las
        // siguientes miden el alto natural (ver `BrandLinedFont`).
        return lineHeight >= natural ? lines * lineHeight : lineHeight + (lines - 1) * natural
    }

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let size = textSize(subviews, width: proposal.width)
        // Sin texto (un `Text?` a `nil`, un `EmptyView`) no hay línea: la caja no ocupa nada.
        guard size.height > 0 else { return .zero }
        return CGSize(width: size.width, height: boxHeight(for: size.height))
    }

    private func offset(in bounds: CGRect, subviews: Subviews) -> (CGSize, CGFloat) {
        let size = textSize(subviews, width: bounds.width)
        return (size, (bounds.height - size.height) / 2)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let (size, dy) = offset(in: bounds, subviews: subviews)
        subviews.first?.place(at: CGPoint(x: bounds.minX, y: bounds.minY + dy), anchor: .topLeading,
                              proposal: ProposedViewSize(width: bounds.width, height: size.height))
    }

    /// Las guías del texto (la línea base, sobre todo), desplazadas lo que se ha centrado: una fila alineada por
    /// `.firstTextBaseline` sigue cuadrando con el texto y no con el borde de la caja.
    func explicitAlignment(of guide: VerticalAlignment, in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews,
                           cache: inout ()) -> CGFloat? {
        guard let text = subviews.first else { return nil }
        let (size, dy) = offset(in: bounds, subviews: subviews)
        return bounds.minY + dy + text.dimensions(in: ProposedViewSize(width: bounds.width, height: size.height))[guide]
    }
}

extension View {
    /// Fuente de la marca (token de tamaño y peso) con la caja de línea de CSS (`line-height` como múltiplo del
    /// tamaño): una línea mide `tamaño × lineHeight` y el interlineado se reparte mitad arriba y mitad abajo, así que
    /// un texto de `n` líneas mide `n × lineHeight` como en la web (ver `BrandLinedFont`). El tamaño crece con el tipo
    /// dinámico. Es lo que lleva todo texto de la marca cuyo `line-height` fija React; para un estilo completo de
    /// `BrandTextStyle` (con su tracking), `brandLinedFont(_:)`.
    ///
    /// ```swift
    /// Text("Revisa los datos.").brandLinedFont(size: BrandFontSize.s2, lineHeight: BrandLineHeight.normal)
    /// ```
    public func brandLinedFont(size: CGFloat, weight: Int = BrandFontWeight.default, family: String = BrandFontFamily.sans,
                        lineHeight: CGFloat, relativeTo textStyle: Font.TextStyle = .body) -> some View {
        modifier(BrandLinedFont(size: size, weight: weight, family: family, multiple: lineHeight, mode: .text,
                                relativeTo: textStyle))
    }

    /// Un estilo de texto de la marca entero —fuente, caja de línea de CSS y tracking—, escalado con el tipo dinámico:
    /// sustituye a `brandTextStyle(_:)`, que pone el interlineado solo entre líneas (una línea mide el alto natural de la
    /// fuente y no el `line-height` de la web).
    ///
    /// ```swift
    /// Text("Tus viviendas").brandLinedFont(.heading2)
    /// ```
    public func brandLinedFont(_ style: BrandTextStyle, relativeTo textStyle: Font.TextStyle = .body) -> some View {
        tracking(style.tracking * style.size)
            .brandLinedFont(size: style.size, weight: style.weight, family: style.family, lineHeight: style.lineHeight,
                            relativeTo: textStyle)
    }

    /// La misma fuente e interlineado para un **contenedor** de texto e iconos (la fila de una lista): alto mínimo de
    /// una línea, sin medio interlineado alrededor (ver `BrandLinedFont`).
    func brandLinedContainerFont(size: CGFloat, weight: Int = BrandFontWeight.default, family: String = BrandFontFamily.sans,
                                 lineHeight: CGFloat, relativeTo textStyle: Font.TextStyle = .body) -> some View {
        modifier(BrandLinedFont(size: size, weight: weight, family: family, multiple: lineHeight, mode: .container,
                                relativeTo: textStyle))
    }
}
