import SwiftUI

/// `Tag` `variant`: la variante de color. Mismos casos y mismos valores que React.
public enum TagVariant: String, CaseIterable, Sendable {
    case primary
    case accent1 = "accent-1"
    case accent2 = "accent-2"
    case support1 = "support-1"
    case support2 = "support-2"
    case neutral, info, warning, success, danger

    fileprivate var colors: (background: Color, foreground: Color) {
        typealias T = BrandTagTokens
        return switch self {
        case .primary: (T.primaryBg, T.primaryColor)
        case .accent1: (T.accent1Bg, T.accent1Color)
        case .accent2: (T.accent2Bg, T.accent2Color)
        case .support1: (T.support1Bg, T.support1Color)
        case .support2: (T.support2Bg, T.support2Color)
        case .neutral: (T.neutralBg, T.neutralColor)
        case .info: (T.infoBg, T.infoColor)
        case .warning: (T.warningBg, T.warningColor)
        case .success: (T.successBg, T.successColor)
        case .danger: (T.dangerBg, T.dangerColor)
        }
    }
}

/// Una etiqueta de la marca (el `Tag` de React): texto corto sobre un relleno de color, de esquinas totalmente
/// redondeadas. Los pares fondo/texto salen de `tag.*`; los de `primary` e `info` se invierten en oscuro.
///
/// ```swift
/// BrandTag("Administrador", variant: .primary)
/// BrandTag("Pagado", variant: .success)
/// ```
///
/// Es solo texto: para VoiceOver se lee como una frase más (no es un control).
public struct BrandTag<Content: View>: View {
    private let variant: TagVariant
    private let content: Content

    public init(variant: TagVariant = .neutral, @ViewBuilder content: () -> Content) {
        self.variant = variant
        self.content = content()
    }

    public var body: some View {
        let colors = variant.colors
        content
            .brandFont(size: BrandTagTokens.fontSize, weight: BrandTagTokens.fontWeight, relativeTo: .footnote)
            .foregroundStyle(colors.foreground)
            .lineLimit(1)
            .fixedSize()
            .padding(.vertical, BrandTagTokens.paddingBlock)
            .padding(.horizontal, BrandTagTokens.paddingInline)
            .background(colors.background, in: RoundedRectangle(cornerRadius: BrandTagTokens.borderRadius))
            .accessibilityElement(children: .combine)
    }
}

extension BrandTag where Content == Text {
    public init(_ title: LocalizedStringKey, variant: TagVariant = .neutral) {
        self.init(variant: variant) { Text(title) }
    }

    /// Para nombres que salen de los datos (una tienda, un miembro).
    public init(verbatim title: String, variant: TagVariant = .neutral) {
        self.init(variant: variant) { Text(verbatim: title) }
    }
}

#Preview("Tag") {
    VStack(alignment: .leading, spacing: BrandSpacing.s2) {
        ForEach(TagVariant.allCases, id: \.self) { variant in
            BrandTag(verbatim: variant.rawValue, variant: variant)
        }
    }
    .padding()
}
