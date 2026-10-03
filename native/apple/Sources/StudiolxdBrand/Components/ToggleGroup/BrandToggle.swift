import SwiftUI

/// El botón de dos estados de la marca (`Toggle` de React): pulsado o no. Es un **valor que se conmuta** (un filtro,
/// una opción elegida), no una acción: queda relleno mientras está pulsado. El *hover* marca el borde y no rellena.
///
/// Es la pieza que usa `BrandToggleGroup`; suelta, se aplica a un `Toggle` nativo:
///
/// ```swift
/// Toggle("Solo pendientes", isOn: $onlyPending).toggleStyle(.brandToggle)
/// ```
public struct BrandToggleStyle: ToggleStyle {
    public let size: BrandControlSize?
    public let iconOnly: Bool

    public init(size: BrandControlSize? = nil, iconOnly: Bool = false) {
        self.size = size
        self.iconOnly = iconOnly
    }

    public func makeBody(configuration: Configuration) -> some View {
        BrandToggleSurface(isOn: configuration.isOn, size: size, iconOnly: iconOnly, action: { configuration.isOn.toggle() }) {
            configuration.label
        }
    }
}

extension ToggleStyle where Self == BrandToggleStyle {
    /// `Toggle.toggleStyle(.brandToggle)`.
    public static var brandToggle: BrandToggleStyle { BrandToggleStyle() }

    /// `Toggle.toggleStyle(.brandToggle(size: .sm))`.
    public static func brandToggle(size: BrandControlSize? = nil, iconOnly: Bool = false) -> BrandToggleStyle {
        BrandToggleStyle(size: size, iconOnly: iconOnly)
    }
}

/// La cara de un toggle: botón rectangular con borde, de la altura de la talla.
struct BrandToggleSurface<Label: View>: View {
    let isOn: Bool
    let size: BrandControlSize?
    var stretch = false
    let iconOnly: Bool
    let action: () -> Void
    @ViewBuilder let label: Label

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.isFocused) private var isFocused
    @Environment(\.brandControlSize) private var inheritedSize
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var isHovering = false
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    private typealias T = BrandToggleTokens

    private var resolvedSize: BrandControlSize { size ?? inheritedSize ?? .md }

    private var height: CGFloat {
        switch resolvedSize {
        case .sm: T.smHeight
        case .md: T.height
        case .lg: T.lgHeight
        }
    }

    private var paddingInline: CGFloat {
        switch resolvedSize {
        case .sm: T.smPaddingInline
        case .md: T.paddingInline
        case .lg: T.lgPaddingInline
        }
    }

    private var fontSize: CGFloat {
        switch resolvedSize {
        case .sm: T.smFontSize
        case .md: T.fontSize
        case .lg: T.lgFontSize
        }
    }

    var body: some View {
        let scaledHeight = height * scale
        let shape = Rectangle() // `toggle.border-radius` es 0: el sistema es rectangular.
        let border: Color = isOn ? T.pressedBorderColor : (isHovering && isEnabled ? T.hoverBorderColor : T.borderColor)

        Button(action: action) {
            HStack(spacing: T.gap) { label }
                .brandFont(size: fontSize, weight: T.fontWeight)
                .lineLimit(1)
                .foregroundStyle(isOn ? T.pressedColor : T.color)
                .padding(.horizontal, iconOnly ? 0 : paddingInline)
                .frame(width: iconOnly ? scaledHeight : nil, height: scaledHeight)
                .frame(maxWidth: stretch ? .infinity : nil)
                .background(isOn ? T.pressedBg : T.bg, in: shape)
                .overlay { shape.strokeBorder(border, lineWidth: T.borderWidth) }
                .overlay {
                    if isFocused {
                        shape.stroke(T.focusRingColor, lineWidth: T.focusRingWidth)
                            .padding(-(T.focusRingOffset + T.focusRingWidth / 2))
                    }
                }
                .contentShape(shape)
                .brandHitTarget(width: iconOnly ? scaledHeight : nil, height: scaledHeight)
        }
        .buttonStyle(.plain)
        .focusEffectDisabled()
        .opacity(isEnabled ? 1 : T.disabledOpacity)
        .onHover { isHovering = $0 }
        .animation(reduceMotion ? nil : T.transitionEasing.animation(duration: T.transitionDuration), value: isOn)
        .animation(reduceMotion ? nil : T.transitionEasing.animation(duration: T.transitionDuration), value: isHovering)
        .accessibilityAddTraits(isOn ? .isSelected : [])
    }
}

#Preview("Toggle") {
    struct Demo: View {
        @State private var on = true
        @State private var off = false
        var body: some View {
            VStack(alignment: .leading, spacing: BrandSpacing.s3) {
                Toggle("Pulsado", isOn: $on).toggleStyle(.brandToggle)
                Toggle("Sin pulsar", isOn: $off).toggleStyle(.brandToggle)
                Toggle("Deshabilitado", isOn: $off).toggleStyle(.brandToggle).disabled(true)
                HStack {
                    ForEach(BrandControlSize.allCases, id: \.self) { size in
                        Toggle(size.rawValue, isOn: $on).toggleStyle(.brandToggle(size: size))
                    }
                }
            }
            .padding()
        }
    }
    return Demo()
}
