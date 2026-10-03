import SwiftUI

/// El interruptor de la marca (`Switcher`) como `ToggleStyle`: se aplica a cualquier `Toggle` nativo.
///
/// ```swift
/// Toggle("Avisarme por correo", isOn: $notify).toggleStyle(.brandSwitch)
/// ```
///
/// Pista redondeada con el pulgar a un lado: la altura y el ancho salen de `switcher.*` (`em` del cuerpo de 16 pt, que
/// crece con el tipo dinámico). Estados: marcado (`track-bg-checked`), deshabilitado (opacidad), foco de teclado y
/// error (anillo). Toda la fila —pista y etiqueta— conmuta, como el `<label>` de React; la fila mide siempre
/// 44 pt de alto o más en iOS.
public struct BrandSwitchToggleStyle: ToggleStyle {
    public let size: BrandControlSize?
    public let error: Bool

    public init(size: BrandControlSize? = nil, error: Bool = false) {
        self.size = size
        self.error = error
    }

    public func makeBody(configuration: Configuration) -> some View {
        BrandSwitchBody(configuration: configuration, size: size, error: error)
    }
}

extension ToggleStyle where Self == BrandSwitchToggleStyle {
    /// El interruptor de la marca a talla `md` (o la del entorno, `brandControlSize(_:)`).
    public static var brandSwitch: BrandSwitchToggleStyle { BrandSwitchToggleStyle() }

    /// El interruptor de la marca con talla y estado de error.
    public static func brandSwitch(size: BrandControlSize? = nil, error: Bool = false) -> BrandSwitchToggleStyle {
        BrandSwitchToggleStyle(size: size, error: error)
    }
}

private struct BrandSwitchBody: View {
    let configuration: ToggleStyleConfiguration
    let size: BrandControlSize?
    let error: Bool

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.isFocused) private var isFocused
    @Environment(\.brandControlSize) private var inheritedSize
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    private typealias T = BrandSwitcherTokens
    private typealias F = BrandSwitcherFieldTokens

    private var resolvedSize: BrandControlSize { size ?? inheritedSize ?? .md }

    /// El cuerpo de 16 pt sobre el que se calculan las medidas en `em` de `md` y `sm` (la pista no hereda el cuerpo
    /// reducido de la etiqueta: en React el `font-size` de talla solo va en la etiqueta).
    private var em: CGFloat { BrandFontSize.s2 }

    private var trackWidth: CGFloat {
        switch resolvedSize {
        case .sm: T.smTrackWidth * em
        case .md: T.trackWidth * em
        case .lg: T.lgTrackWidth
        }
    }

    private var trackHeight: CGFloat {
        switch resolvedSize {
        case .sm: T.smTrackHeight * em
        case .md: T.trackHeight * em
        case .lg: T.lgTrackHeight
        }
    }

    private var thumbSize: CGFloat {
        switch resolvedSize {
        case .sm: T.smThumbSize * em
        case .md: T.thumbSize * em
        case .lg: T.lgThumbSize
        }
    }

    private var gap: CGFloat {
        switch resolvedSize {
        case .sm: F.smGap
        case .md: F.gap
        case .lg: F.lgGap
        }
    }

    private var paddingBlock: CGFloat {
        switch resolvedSize {
        case .sm: F.smPaddingBlock
        case .md: F.paddingBlock
        case .lg: F.lgPaddingBlock
        }
    }

    var body: some View {
        Button {
            configuration.isOn.toggle()
        } label: {
            HStack(spacing: gap) {
                track
                configuration.label
            }
            .padding(.vertical, paddingBlock)
            .contentShape(Rectangle())
            .brandHitTarget(height: trackHeight * scale + paddingBlock * 2)
        }
        .buttonStyle(.plain)
        .focusEffectDisabled()
        .opacity(isEnabled ? 1 : T.disabledOpacity)
        // `.isToggle`: VoiceOver lo anuncia como interruptor y dice «activado»/«desactivado» en el idioma del sistema.
        .accessibilityAddTraits(.isToggle)
    }

    private var track: some View {
        let width = trackWidth * scale
        let height = trackHeight * scale
        let thumb = thumbSize * scale
        let padding = T.trackPadding * em * scale
        let offset = configuration.isOn ? width - padding * 2 - thumb : 0
        let animation: Animation? = reduceMotion ? nil : T.transitionEasing.animation(duration: T.transitionDuration)

        return ZStack(alignment: .leading) {
            Capsule()
                .fill(configuration.isOn ? T.trackBgChecked : T.trackBg)
            Circle()
                .fill(T.thumbBg)
                .frame(width: thumb, height: thumb)
                .padding(.leading, padding)
                .offset(x: offset)
        }
        .frame(width: width, height: height)
        .overlay {
            if error {
                Capsule()
                    .stroke(T.errorRingColor, lineWidth: T.errorRingWidth)
                    .padding(-(T.errorRingOffset + T.errorRingWidth / 2))
            }
        }
        .overlay {
            if isFocused {
                Capsule()
                    .stroke(T.focusRingColor, lineWidth: T.focusRingWidth)
                    .padding(-(T.focusRingOffset + T.focusRingWidth / 2))
            }
        }
        .animation(animation, value: configuration.isOn)
    }
}
