import CoreText
import SwiftUI

/// El subrayado de la web (D64): `text-decoration` con grosor y separación de token. En React es
/// `text-underline-position: under` más `text-underline-offset: calc(<separación> − <grosor>)`, con la separación
/// reservada como `padding-block-end`. Se pinta **bajo el texto, no bajo la caja**: un icono que acompañe al texto no se
/// subraya, porque `text-decoration` no se dibuja sobre un SVG.
///
/// SwiftUI no deja fijar el grosor ni la distancia de `underline(_:)`, así que la línea se dibuja a mano en el mismo sitio
/// que Chromium: la línea base, más el descendente de la fuente normalizado al em (`descendente / (ascendente +
/// descendente) × tamaño`, redondeado al punto como hace el navegador al píxel), más `separación − grosor`. La línea cae
/// así en el borde inferior del hueco que reserva el padding, como en la web.
struct BrandTextUnderline: Equatable {
    /// Grosor de la línea (`*-underline-width`). Con 0 no se pinta.
    var width: CGFloat
    /// Separación entre el texto y la línea (`*-underline-offset`).
    var offset: CGFloat
    /// El color: el del primer plano de quien subraya (`currentColor`).
    var color: Color

    /// De la línea base al borde de arriba de la línea, para un texto de `fontSize` en la familia sans de la marca.
    func drop(fontSize: CGFloat, family: String = BrandFontFamily.sans) -> CGFloat {
        let font = brandCTFont(family: family, size: fontSize, weight: BrandFontWeight.default)
        let ascent = CTFontGetAscent(font), descent = CTFontGetDescent(font)
        let emDescent = ascent + descent > 0 ? fontSize * descent / (ascent + descent) : 0
        return emDescent.rounded() + offset - width
    }
}

private struct BrandTextUnderlineKey: EnvironmentKey {
    static let defaultValue: BrandTextUnderline? = nil
}

extension EnvironmentValues {
    /// El subrayado que heredan los textos de dentro (`nil`: sin línea). Lo fija quien subraya: el botón `text`, la
    /// opción del `ThemeSwitcher` bajo el puntero.
    var brandTextUnderline: BrandTextUnderline? {
        get { self[BrandTextUnderlineKey.self] }
        set { self[BrandTextUnderlineKey.self] = newValue }
    }
}

/// Algún descendiente ya pinta su línea (`brandUnderlinedText()`): quien subraya no la pinta bajo la etiqueta entera.
struct BrandUnderlineClaimKey: PreferenceKey {
    static let defaultValue = false
    static func reduce(value: inout Bool, nextValue: () -> Bool) { value = value || nextValue() }
}

/// La alineación de la línea: centrada en horizontal (ocupa el ancho de lo que subraya) y colgada de la línea base.
private let underlineAlignment = Alignment(horizontal: .center, vertical: .lastTextBaseline)

/// La línea, colgada de la línea base de la vista a la que se superpone.
private struct BrandUnderlineLine: View {
    let underline: BrandTextUnderline
    let fontSize: CGFloat

    var body: some View {
        Rectangle()
            .fill(underline.color)
            .frame(height: underline.width)
            .alignmentGuide(.lastTextBaseline) { _ in -underline.drop(fontSize: fontSize) }
            .accessibilityHidden(true)
    }
}

/// El texto que se subraya: pinta la línea heredada bajo sí mismo y avisa a quien subraya de que ya está pintada.
private struct BrandUnderlinedText: ViewModifier {
    @Environment(\.brandTextUnderline) private var underline
    @Environment(\.brandIconTextSize) private var fontSize

    func body(content: Content) -> some View {
        content
            .overlay(alignment: underlineAlignment) {
                if let underline, underline.width > 0 { BrandUnderlineLine(underline: underline, fontSize: fontSize) }
            }
            .preference(key: BrandUnderlineClaimKey.self, value: true)
    }
}

/// Quien subraya (la etiqueta de un botón `text`): fija el subrayado para los textos de dentro y, si ninguno lo pinta
/// (`Text` a secas), lo pinta bajo la etiqueta entera, colgado de su última línea base.
struct BrandUnderlineHost: ViewModifier {
    let underline: BrandTextUnderline?

    func body(content: Content) -> some View {
        content
            .modifier(BrandUnderlineFallback())
            .environment(\.brandTextUnderline, underline)
    }
}

private struct BrandUnderlineFallback: ViewModifier {
    @Environment(\.brandTextUnderline) private var underline
    @Environment(\.brandIconTextSize) private var fontSize

    func body(content: Content) -> some View {
        content.overlayPreferenceValue(BrandUnderlineClaimKey.self, alignment: underlineAlignment) { claimed in
            if !claimed, let underline, underline.width > 0 { BrandUnderlineLine(underline: underline, fontSize: fontSize) }
        }
    }
}

extension View {
    /// Marca el texto de una etiqueta compuesta que lleva el subrayado de un botón `.text`: la línea va bajo este
    /// texto y no bajo la etiqueta entera, así que el icono que lo acompañe no se subraya, como en la web.
    ///
    /// ```swift
    /// Button { back() } label: {
    ///     HStack { BrandIcon(.arrowLeft, size: .sm); Text("Volver").brandUnderlinedText() }
    /// }
    /// .buttonStyle(.brand(.text))
    /// ```
    ///
    /// Una etiqueta que es solo un `Text` no lo necesita: el botón ya subraya la etiqueta entera.
    public func brandUnderlinedText() -> some View {
        modifier(BrandUnderlinedText())
    }
}
