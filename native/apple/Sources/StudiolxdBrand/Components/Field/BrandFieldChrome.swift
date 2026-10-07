import SwiftUI

/// Lo que comparten los campos de formulario (`InputField`, `NumberInputField`, `SelectField`): la etiqueta, el
/// control, el mensaje de error y la ayuda, apilados con el `gap` del campo. Interno: cada campo lo usa con los
/// tokens de su propio grupo.
struct BrandFieldLayout<Control: View>: View {
    struct Helper {
        let fontSize: CGFloat
        let fontWeight: Int
        let lineHeight: CGFloat
        let color: Color
    }

    let label: LocalizedStringKey
    let labelHidden: Bool
    let size: BrandControlSize
    let gap: CGFloat
    let errorMessage: LocalizedStringKey?
    let helperText: LocalizedStringKey?
    let helper: Helper
    @ViewBuilder let control: Control

    private var labelSize: CGFloat {
        switch size {
        case .sm: BrandLabelTokens.smFontSize
        case .md: BrandLabelTokens.fontSize
        case .lg: BrandLabelTokens.lgFontSize
        }
    }

    /// La pista accesible del control: el error y, detrás, la ayuda (`aria-describedby` en React).
    private var hint: Text {
        switch (errorMessage, helperText) {
        case let (error?, help?): Text(error) + Text(". ") + Text(help)
        case let (error?, nil): Text(error)
        case let (nil, help?): Text(help)
        case (nil, nil): Text("")
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: gap) {
            if !labelHidden {
                Text(label)
                    .brandLinedFont(size: labelSize, weight: BrandLabelTokens.fontWeight, lineHeight: BrandLabelTokens.lineHeight)
                    .tracking(BrandLabelTokens.letterSpacing * labelSize)
                    .foregroundStyle(BrandLabelTokens.color)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityHidden(true)
            }
            control
                .accessibilityLabel(Text(label))
                .accessibilityHint(hint)
            if let errorMessage {
                Text(errorMessage)
                    .brandLinedFont(size: BrandFormTokens.errorFontSize, weight: BrandFormTokens.errorFontWeight,
                                    lineHeight: BrandFormTokens.errorLineHeight)
                    .foregroundStyle(BrandFormTokens.errorColor)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityHidden(true)
            }
            if let helperText {
                Text(helperText)
                    .brandLinedFont(size: helper.fontSize, weight: helper.fontWeight, lineHeight: helper.lineHeight)
                    .foregroundStyle(helper.color)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityHidden(true)
            }
        }
    }
}

/// El cuadro de un campo de texto: fondo, borde y, con foco, el anillo interior de `focus-ring-*`.
struct BrandFieldBox: ViewModifier {
    let radius: CGFloat
    let borderWidth: CGFloat
    let background: Color
    let border: Color
    let ringWidth: CGFloat
    let ringInsetOffset: CGFloat
    let ringColor: Color
    let isFocused: Bool
    let transition: Animation?

    func body(content: Content) -> some View {
        let shape = RoundedRectangle(cornerRadius: radius)
        content
            .background(background, in: shape)
            .overlay { shape.strokeBorder(border, lineWidth: borderWidth) }
            .overlay {
                // `box-shadow: inset 0 0 0 (ancho + desfase) ring`: el anillo ocupa ese grosor por dentro del borde.
                if isFocused {
                    shape.inset(by: borderWidth).strokeBorder(ringColor, lineWidth: ringWidth + ringInsetOffset)
                }
            }
            .animation(transition, value: isFocused)
    }
}
