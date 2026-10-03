import SwiftUI

/// `Button` `variant`. Mismos casos y mismos valores que React.
public enum ButtonVariant: String, CaseIterable, Sendable {
    case primary, outline, ghost, text
}

/// `Button` `tone`: solo con `variant: .text`, `ink` lo pinta con la tinta de la superficie en vez del acento.
public enum ButtonTone: String, CaseIterable, Sendable {
    case accent, ink
}

/// `Button` `size`: la talla de control compartida (`sm` 32 pt, `md` 40 pt, `lg` 48 pt).
public typealias ButtonSize = BrandControlSize

/// El aspecto de `Button` de la marca como `ButtonStyle`: se aplica a cualquier `Button` nativo.
///
/// ```swift
/// Button("Guardar") { save() }.buttonStyle(.brand(.primary))
/// Button("Eliminar") { delete() }.buttonStyle(.brand(.outline, destructive: true))
/// ```
///
/// Cubre los estados que tiene React: reposo, *hover* (puntero en macOS y iPad), pulsado (`active-*`),
/// deshabilitado (`isEnabled`) y foco de teclado (el anillo de `focus-ring-*`). La altura y el tamaño de letra
/// crecen con el tipo dinámico; en iOS la zona táctil llega a 44 pt aunque el botón mida 32 (`brandHitTarget`).
public struct BrandButtonStyle: ButtonStyle {
    public let variant: ButtonVariant
    public let tone: ButtonTone
    public let size: ButtonSize?
    public let destructive: Bool
    public let block: Bool
    public let iconOnly: Bool

    /// - Parameters:
    ///   - size: sin valor toma la del entorno (`brandControlSize(_:)`) y, si tampoco hay, `md`.
    ///   - destructive: la intención destructiva (rojo); solo la llevan `outline` y `text`, como en React.
    ///   - block: ocupa el ancho del contenedor.
    ///   - iconOnly: botón cuadrado de solo icono: el lado es la altura de la talla.
    public init(
        _ variant: ButtonVariant = .primary,
        tone: ButtonTone = .accent,
        size: ButtonSize? = nil,
        destructive: Bool = false,
        block: Bool = false,
        iconOnly: Bool = false
    ) {
        self.variant = variant
        self.tone = tone
        self.size = size
        self.destructive = destructive
        self.block = block
        self.iconOnly = iconOnly
    }

    public func makeBody(configuration: Configuration) -> some View {
        BrandButtonBody(configuration: configuration, style: self)
    }
}

extension ButtonStyle where Self == BrandButtonStyle {
    /// `Button.buttonStyle(.brand(.outline, size: .sm))`.
    public static func brand(
        _ variant: ButtonVariant = .primary,
        tone: ButtonTone = .accent,
        size: ButtonSize? = nil,
        destructive: Bool = false,
        block: Bool = false,
        iconOnly: Bool = false
    ) -> BrandButtonStyle {
        BrandButtonStyle(variant, tone: tone, size: size, destructive: destructive, block: block, iconOnly: iconOnly)
    }
}

/// Los colores de un botón en un estado.
private struct ButtonColors {
    var background: Color
    var foreground: Color
    var border: Color
    /// Grosor de la línea de `variant: .text` (0 = sin línea).
    var underline: CGFloat = 0
}

private struct BrandButtonBody: View {
    let configuration: ButtonStyleConfiguration
    let style: BrandButtonStyle

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.isFocused) private var isFocused
    @Environment(\.brandControlSize) private var inheritedSize
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.colorScheme) private var scheme
    @State private var isHovering = false
    @ScaledMetric(relativeTo: .body) private var heightScale: CGFloat = 1

    private typealias T = BrandButtonTokens

    private var size: BrandControlSize { style.size ?? inheritedSize ?? .md }
    private var isText: Bool { style.variant == .text }

    // MARK: Medidas (tokens)

    private var height: CGFloat {
        switch size {
        case .sm: T.smHeight
        case .md: T.height
        case .lg: T.lgHeight
        }
    }

    private var fontSize: CGFloat {
        switch size {
        case .sm: T.smFontSize
        case .md: T.fontSize
        case .lg: T.lgFontSize
        }
    }

    private var paddingInline: CGFloat {
        if isText { return T.textPaddingInline }
        if style.iconOnly { return 0 }
        switch size {
        case .sm: return T.smPaddingInline
        case .md: return T.paddingInline
        case .lg: return T.lgPaddingInline
        }
    }

    private var fontWeight: Int {
        switch style.variant {
        case .primary: T.primaryFontWeight
        case .outline: T.outlineFontWeight
        case .ghost: T.ghostFontWeight
        case .text: T.textFontWeight
        }
    }

    private var borderWidth: CGFloat {
        switch style.variant {
        case .primary: T.primaryBorderWidth
        case .outline: T.outlineBorderWidth
        case .ghost: T.ghostBorderWidth
        case .text: T.textBorderWidth
        }
    }

    private var cornerRadius: CGFloat {
        switch style.variant {
        case .primary: T.primaryBorderRadius
        case .outline: T.outlineBorderRadius
        case .ghost: T.ghostBorderRadius
        case .text: T.textBorderRadius
        }
    }

    private var transitionDuration: TimeInterval {
        switch style.variant {
        case .primary: T.primaryTransitionDuration
        case .outline: T.outlineTransitionDuration
        case .ghost: T.ghostTransitionDuration
        case .text: T.textTransitionDuration
        }
    }

    private var transitionEasing: BrandCubicBezier {
        switch style.variant {
        case .primary: T.primaryTransitionEasing
        case .outline: T.outlineTransitionEasing
        case .ghost: T.ghostTransitionEasing
        case .text: T.textTransitionEasing
        }
    }

    private var focusRing: (color: Color, width: CGFloat, offset: CGFloat) {
        let intent = style.destructive && (style.variant == .outline || isText)
        switch style.variant {
        case .primary: return (T.primaryFocusRingColor, T.primaryFocusRingWidth, T.primaryFocusRingOffset)
        case .outline:
            return (intent ? T.destructiveFocusRingColor : T.outlineFocusRingColor, T.outlineFocusRingWidth, T.outlineFocusRingOffset)
        case .ghost: return (T.ghostFocusRingColor, T.ghostFocusRingWidth, T.ghostFocusRingOffset)
        case .text:
            return (intent ? T.destructiveFocusRingColor : T.textFocusRingColor, T.textFocusRingWidth, T.textFocusRingOffset)
        }
    }

    // MARK: Colores por estado

    private var colors: ButtonColors {
        let pressed = configuration.isPressed
        let hover = isHovering
        let destructive = style.destructive
        guard isEnabled else { return disabledColors }
        switch style.variant {
        case .primary:
            if pressed { return ButtonColors(background: T.primaryActiveBg, foreground: T.primaryActiveColor, border: T.primaryActiveBorder) }
            if hover { return ButtonColors(background: T.primaryHoverBg, foreground: T.primaryHoverColor, border: T.primaryHoverBorder) }
            return ButtonColors(background: T.primaryBg, foreground: T.primaryColor, border: T.primaryBorder)
        case .outline:
            if destructive {
                if pressed { return ButtonColors(background: T.destructiveActiveBg, foreground: T.destructiveActiveColor, border: T.destructiveActiveBorder) }
                if hover { return ButtonColors(background: T.destructiveHoverBg, foreground: T.destructiveHoverColor, border: T.destructiveHoverBorder) }
                return ButtonColors(background: T.outlineBg, foreground: T.destructiveColor, border: T.destructiveBorder)
            }
            if pressed { return ButtonColors(background: T.outlineActiveBg, foreground: T.outlineActiveColor, border: T.outlineActiveBorder) }
            if hover { return ButtonColors(background: T.outlineHoverBg, foreground: T.outlineHoverColor, border: T.outlineHoverBorder) }
            return ButtonColors(background: T.outlineBg, foreground: T.outlineColor, border: T.outlineBorder)
        case .ghost:
            if pressed { return ButtonColors(background: T.ghostActiveBg, foreground: T.ghostActiveColor, border: T.ghostActiveBorder) }
            if hover { return ButtonColors(background: T.ghostHoverBg, foreground: T.ghostHoverColor, border: T.ghostHoverBorder) }
            return ButtonColors(background: T.ghostBg, foreground: T.ghostColor, border: T.ghostBorder)
        case .text:
            let ink = style.tone == .ink && !destructive
            let active = pressed || hover
            let foreground: Color = destructive ? T.destructiveColor : ink ? T.textInkColor : (pressed ? T.textActiveColor : hover ? T.textHoverColor : T.textColor)
            let background: Color = pressed ? T.textActiveBg : hover ? T.textHoverBg : T.textBg
            let border: Color = pressed ? T.textActiveBorder : hover ? T.textHoverBorder : T.textBorder
            let underline: CGFloat = ink
                ? (active ? T.textInkHoverUnderlineWidth : T.textInkUnderlineWidth)
                : (active ? T.textHoverUnderlineWidth.value(for: scheme) : T.textUnderlineWidth.value(for: scheme))
            return ButtonColors(background: background, foreground: foreground, border: border, underline: underline)
        }
    }

    private var disabledColors: ButtonColors {
        switch style.variant {
        case .primary: ButtonColors(background: T.primaryDisabledBg, foreground: T.primaryDisabledColor, border: T.primaryDisabledBorder)
        case .outline: ButtonColors(background: T.outlineBg, foreground: T.outlineDisabledColor, border: T.outlineDisabledBorder)
        case .ghost: ButtonColors(background: T.ghostBg, foreground: T.ghostDisabledColor, border: T.ghostBorder)
        case .text: ButtonColors(background: T.textBg, foreground: T.textDisabledColor, border: T.textBorder, underline: T.textUnderlineWidth.value(for: scheme))
        }
    }

    // MARK: Vista

    var body: some View {
        let colors = colors
        let scaledHeight = height * heightScale
        let shape = RoundedRectangle(cornerRadius: cornerRadius)

        configuration.label
            .brandFont(size: fontSize, weight: fontWeight)
            .lineLimit(1)
            .fixedSize(horizontal: !style.block && !style.iconOnly, vertical: false)
            .foregroundStyle(colors.foreground)
            .padding(.horizontal, paddingInline)
            .frame(width: style.iconOnly ? scaledHeight : nil)
            .frame(minHeight: isText ? nil : scaledHeight)
            .frame(maxWidth: style.block ? .infinity : nil)
            .padding(.bottom, isText ? T.textUnderlineOffset : 0)
            .background(colors.background, in: shape)
            .overlay(alignment: .bottom) {
                if isText, colors.underline > 0 {
                    Rectangle().fill(colors.foreground).frame(height: colors.underline)
                }
            }
            .overlay {
                if borderWidth > 0 { shape.strokeBorder(colors.border, lineWidth: borderWidth) }
            }
            .overlay {
                if isFocused {
                    let ring = focusRing
                    shape.stroke(ring.color, lineWidth: ring.width).padding(-(ring.offset + ring.width / 2))
                }
            }
            .contentShape(shape)
            .brandHitTarget(width: style.iconOnly ? scaledHeight : nil, height: isText ? fontSize + T.textUnderlineOffset : scaledHeight)
            .focusEffectDisabled()
            .onHover { isHovering = $0 }
            .animation(reduceMotion ? nil : transitionEasing.animation(duration: transitionDuration), value: configuration.isPressed)
            .animation(reduceMotion ? nil : transitionEasing.animation(duration: transitionDuration), value: isHovering)
            .animation(reduceMotion ? nil : transitionEasing.animation(duration: transitionDuration), value: isEnabled)
    }
}

/// Un botón de la marca: el `Button` nativo con `.buttonStyle(.brand(…))` y las mismas props que el de React.
///
/// ```swift
/// BrandButton("Guardar") { save() }
/// BrandButton("Eliminar", variant: .outline, destructive: true) { delete() }
/// BrandButton(icon: .close, accessibilityLabel: "Cerrar", variant: .ghost) { dismiss() }   // iconOnly
/// ```
public struct BrandButton<Label: View>: View {
    private let style: BrandButtonStyle
    private let role: ButtonRole?
    private let action: () -> Void
    private let label: Label

    public init(
        variant: ButtonVariant = .primary,
        tone: ButtonTone = .accent,
        size: ButtonSize? = nil,
        destructive: Bool = false,
        block: Bool = false,
        iconOnly: Bool = false,
        role: ButtonRole? = nil,
        action: @escaping () -> Void,
        @ViewBuilder label: () -> Label
    ) {
        style = BrandButtonStyle(variant, tone: tone, size: size, destructive: destructive, block: block, iconOnly: iconOnly)
        self.role = role
        self.action = action
        self.label = label()
    }

    public var body: some View {
        Button(role: role, action: action) { label }
            .buttonStyle(style)
    }
}

extension BrandButton where Label == Text {
    /// Un botón con texto: `BrandButton("Guardar") { … }`.
    public init(
        _ title: LocalizedStringKey,
        variant: ButtonVariant = .primary,
        tone: ButtonTone = .accent,
        size: ButtonSize? = nil,
        destructive: Bool = false,
        block: Bool = false,
        role: ButtonRole? = nil,
        action: @escaping () -> Void
    ) {
        self.init(variant: variant, tone: tone, size: size, destructive: destructive, block: block, role: role, action: action) {
            Text(title)
        }
    }
}

extension BrandButton where Label == AccessibleIcon {
    /// Un botón cuadrado de solo icono (`iconOnly`). Sin texto visible, el nombre accesible es **obligatorio**
    /// (`aria-label` en React).
    public init(
        icon: BrandIconName,
        accessibilityLabel: LocalizedStringKey,
        variant: ButtonVariant = .primary,
        size: ButtonSize? = nil,
        role: ButtonRole? = nil,
        action: @escaping () -> Void
    ) {
        self.init(variant: variant, size: size, iconOnly: true, role: role, action: action) {
            AccessibleIcon(name: icon, label: accessibilityLabel)
        }
    }
}

/// El contenido de un botón de solo icono: el glifo, con el nombre accesible que el glifo (oculto) no tiene.
public struct AccessibleIcon: View {
    let name: BrandIconName
    let label: LocalizedStringKey

    public var body: some View {
        BrandIcon(name, size: .sm)
            .accessibilityHidden(false)
            .accessibilityLabel(Text(label))
    }
}

#Preview("Button — variantes") {
    ScrollView {
        VStack(alignment: .leading, spacing: BrandSpacing.s4) {
            ForEach(ButtonVariant.allCases, id: \.self) { variant in
                HStack(spacing: BrandSpacing.s4) {
                    BrandButton("Guardar", variant: variant) {}
                    BrandButton("Eliminar", variant: variant, destructive: true) {}
                    BrandButton("Desactivado", variant: variant) {}.disabled(true)
                }
            }
            BrandButton("Tono ink", variant: .text, tone: .ink) {}
            HStack {
                BrandButton("Pequeño", size: .sm) {}
                BrandButton("Mediano", size: .md) {}
                BrandButton("Grande", size: .lg) {}
            }
            HStack {
                BrandButton(icon: .close, accessibilityLabel: "Cerrar", variant: .outline, size: .sm) {}
                BrandButton(icon: .plus, accessibilityLabel: "Añadir") {}
                BrandButton(icon: .search, accessibilityLabel: "Buscar", variant: .ghost, size: .lg) {}
            }
            BrandButton("A ancho completo", block: true) {}
        }
        .padding()
    }
}
