import CoreText
import SwiftUI

/// Los estilos de texto de la marca, hechos con los tokens de tipografía: `Font.brand(_:)` da la fuente y las
/// demás propiedades, las medidas que SwiftUI no lleva dentro de `Font` (interlineado y tracking).
///
/// Los tamaños siguen la superficie de aplicación (cuerpo de 16 pt). Mapa respecto a la web: `body` = `text.*`,
/// `bodySmall`/`bodyLarge` = `text.paragraph.small|large`, `heading1…6` = `text.h1…h6`.
public enum BrandTextStyle: CaseIterable, Sendable {
    case body, bodySmall, bodyLarge, label
    case heading1, heading2, heading3, heading4, heading5, heading6
    case code

    /// Tamaño en puntos (`font-size.*`).
    public var size: CGFloat {
        switch self {
        case .body: BrandFontSize.s2
        case .bodySmall, .label: BrandFontSize.s1
        case .bodyLarge: BrandFontSize.s3
        case .heading1: BrandFontSize.s7
        case .heading2: BrandFontSize.s6
        case .heading3: BrandFontSize.s5
        case .heading4: BrandFontSize.s4
        case .heading5: BrandFontSize.s3
        case .heading6: BrandFontSize.s2
        case .code: BrandFontSize.s1
        }
    }

    /// Peso del eje `wght` (`font-weight.default` en el cuerpo, `font-weight.emphasis` en títulos y etiquetas).
    public var weight: Int {
        switch self {
        case .body, .bodySmall, .bodyLarge, .code: BrandFontWeight.default
        case .label, .heading1, .heading2, .heading3, .heading4, .heading5, .heading6: BrandFontWeight.emphasis
        }
    }

    /// Interlineado como múltiplo del tamaño (`line-height.*`).
    public var lineHeight: CGFloat {
        switch self {
        case .body, .label, .code: BrandLineHeight.normal
        case .bodySmall: BrandLineHeight.relaxed
        case .bodyLarge: BrandLineHeight.snug
        case .heading1, .heading2, .heading3: BrandLineHeight.tight
        case .heading4, .heading5, .heading6: BrandLineHeight.snug
        }
    }

    /// Tracking como fracción del tamaño (`letter-spacing.*`), en em.
    public var tracking: CGFloat {
        switch self {
        case .heading1, .heading2, .heading3, .heading4: BrandLetterSpacing.tight
        default: BrandLetterSpacing.normal
        }
    }

    /// Familia de la fuente (`font-family.sans`, o `mono` en `code`).
    public var family: String {
        self == .code ? BrandFontFamily.mono : BrandFontFamily.sans
    }
}

extension BrandTextStyle {
    /// El interlineado extra que pide SwiftUI (`.lineSpacing(_:)`): lo que sobra de `lineHeight` sobre el alto natural.
    public var lineSpacing: CGFloat { size * (lineHeight - 1) }
}

extension Font {
    /// La fuente de un estilo de texto de la marca. Registra las fuentes la primera vez
    /// (ver `StudiolxdBrand.registerFonts()`).
    public static func brand(_ style: BrandTextStyle) -> Font {
        Font(brandCTFont(family: style.family, size: style.size, weight: style.weight))
    }
}

/// Las familias tal y como las nombra el fichero de la fuente, que no siempre es el nombre del token: la
/// monoespaciada se llama «Google Sans Code Monospace» dentro del TTF.
private let installedFamilyNames: [String: String] = [
    BrandFontFamily.mono: "Google Sans Code Monospace",
]

/// Una `CTFont` de la familia con el eje `wght` fijado al peso pedido. Se pasa por CoreText porque `Font.custom`
/// con `.weight(_:)` no es fiable con fuentes variables registradas en ejecución.
func brandCTFont(family: String, size: CGFloat, weight: Int) -> CTFont {
    StudiolxdBrand.registerFonts()
    let wghtAxis = 0x7767_6874 // 'wght'
    let attributes: [CFString: Any] = [
        kCTFontFamilyNameAttribute: installedFamilyNames[family] ?? family,
        kCTFontVariationAttribute: [wghtAxis: weight],
    ]
    return CTFontCreateWithFontDescriptor(CTFontDescriptorCreateWithAttributes(attributes as CFDictionary), size, nil)
}
