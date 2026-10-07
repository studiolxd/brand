import SwiftUI

/// `Tag` `tone`: el color del tag. Mismos casos y mismos valores que React.
public enum TagTone: String, CaseIterable, Sendable {
    case primary
    case accent1 = "accent-1"
    case accent2 = "accent-2"
    case support1 = "support-1"
    case support2 = "support-2"
    case neutral, info, warning, success, error

    /// `danger` es `error` desde la v51 (el vocabulario de estado del sistema). Se retira en la v52.
    @available(*, deprecated, renamed: "error")
    public static let danger = TagTone.error

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
        case .error: (T.errorBg, T.errorColor)
        }
    }
}

/// El nombre de `TagTone` hasta la v50. Se retira en la v52.
@available(*, deprecated, renamed: "TagTone")
public typealias TagVariant = TagTone

/// Una etiqueta de la marca (el `Tag` de React): texto corto sobre un relleno de color, de esquinas totalmente
/// redondeadas. Los pares fondo/texto salen de `tag.*`; los de `primary` e `info` se invierten en oscuro.
///
/// ```swift
/// BrandTag("Administrador", tone: .primary)
/// BrandTag("Pagado", tone: .success)
/// ```
///
/// Es solo texto: para VoiceOver se lee como una frase más (no es un control).
public struct BrandTag<Content: View>: View {
    private let tone: TagTone
    private let content: Content

    public init(tone: TagTone = .neutral, @ViewBuilder content: () -> Content) {
        self.tone = tone
        self.content = content()
    }

    /// `variant` es `tone` desde la v51. Se retira en la v52.
    @available(*, deprecated, renamed: "init(tone:content:)")
    public init(variant: TagTone, @ViewBuilder content: () -> Content) {
        self.init(tone: variant, content: content)
    }

    public var body: some View {
        let colors = tone.colors
        content
            .brandLinedFont(size: BrandTagTokens.fontSize, weight: BrandTagTokens.fontWeight, lineHeight: BrandTagTokens.lineHeight,
                            relativeTo: .footnote)
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
    public init(_ title: LocalizedStringKey, tone: TagTone = .neutral) {
        self.init(tone: tone) { Text(title) }
    }

    /// Para nombres que salen de los datos (una tienda, un miembro).
    public init(verbatim title: String, tone: TagTone = .neutral) {
        self.init(tone: tone) { Text(verbatim: title) }
    }

    /// `variant` es `tone` desde la v51. Se retira en la v52.
    @available(*, deprecated, renamed: "init(_:tone:)")
    public init(_ title: LocalizedStringKey, variant: TagTone) {
        self.init(title, tone: variant)
    }

    /// `variant` es `tone` desde la v51. Se retira en la v52.
    @available(*, deprecated, renamed: "init(verbatim:tone:)")
    public init(verbatim title: String, variant: TagTone) {
        self.init(verbatim: title, tone: variant)
    }
}

#Preview("Tag") {
    VStack(alignment: .leading, spacing: BrandSpacing.s2) {
        ForEach(TagTone.allCases, id: \.self) { tone in
            BrandTag(verbatim: tone.rawValue, tone: tone)
        }
    }
    .padding()
}
