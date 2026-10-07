import SwiftUI

/// El `Switcher` como campo: interruptor, texto, ayuda y error (el `SwitcherField` de React).
///
/// ```swift
/// BrandSwitcherField("Avisarme por correo", isOn: $notify, helperText: "Un resumen al día.")
/// BrandSwitcherField("Acepto las condiciones", isOn: $accepted, errorMessage: "Debes aceptarlas.")
/// ```
///
/// Toda la fila conmuta (pista y texto). El error se **anuncia** al aparecer (`role="alert"` en la web) y, junto a
/// la ayuda, cuelga del control como pista de accesibilidad. `required` y `name` no existen en nativo
/// (ver la ficha de paridad).
public struct BrandSwitcherField: View {
    private let label: Text
    private let isOn: Binding<Bool>
    private let labelHidden: Bool
    private let size: BrandControlSize?
    private let error: Bool
    private let errorMessage: String?
    private let helperText: String?

    @Environment(\.brandControlSize) private var inheritedSize

    private typealias F = BrandSwitcherFieldTokens

    /// - Parameters:
    ///   - labelHidden: oculta la etiqueta pero la deja como nombre accesible (filas de una tabla de preferencias).
    ///   - size: sin valor, la del entorno (`brandControlSize(_:)`) y, si tampoco hay, `md`.
    ///   - error: marca el control en error sin mensaje; un `errorMessage` ya lo implica.
    public init(
        _ label: LocalizedStringKey,
        isOn: Binding<Bool>,
        labelHidden: Bool = false,
        size: BrandControlSize? = nil,
        error: Bool = false,
        errorMessage: String? = nil,
        helperText: String? = nil
    ) {
        self.label = Text(label)
        self.isOn = isOn
        self.labelHidden = labelHidden
        self.size = size
        self.error = error
        self.errorMessage = errorMessage
        self.helperText = helperText
    }

    /// Para etiquetas que salen de los datos.
    public init(
        verbatim label: String,
        isOn: Binding<Bool>,
        labelHidden: Bool = false,
        size: BrandControlSize? = nil,
        error: Bool = false,
        errorMessage: String? = nil,
        helperText: String? = nil
    ) {
        self.label = Text(verbatim: label)
        self.isOn = isOn
        self.labelHidden = labelHidden
        self.size = size
        self.error = error
        self.errorMessage = errorMessage
        self.helperText = helperText
    }

    private var resolvedSize: BrandControlSize { size ?? inheritedSize ?? .md }

    private var labelFontSize: CGFloat {
        switch resolvedSize {
        case .sm: F.smLabelFontSize
        case .md: F.labelFontSize
        case .lg: F.lgLabelFontSize
        }
    }

    private var hasError: Bool { error || errorMessage != nil }

    public var body: some View {
        VStack(alignment: .leading, spacing: F.stackGap) {
            Toggle(isOn: isOn) {
                if !labelHidden {
                    label
                        .brandLinedFont(size: labelFontSize, weight: F.labelFontWeight, lineHeight: F.labelLineHeight)
                        .foregroundStyle(F.labelColor)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            .toggleStyle(BrandSwitchToggleStyle(size: size, error: hasError))
            .modifier(HiddenLabelAccessibility(label: labelHidden ? label : nil))
            .accessibilityHint(Text(verbatim: [errorMessage, helperText].compactMap { $0 }.joined(separator: ". ")))

            if let errorMessage {
                Text(verbatim: errorMessage)
                    .brandLinedFont(size: F.errorFontSize, weight: F.errorFontWeight, lineHeight: F.errorLineHeight)
                    .foregroundStyle(F.errorColor)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityHidden(true)
                    .onAppear { announce(errorMessage) }
                    .onChange(of: errorMessage) { _, new in announce(new) }
            }
            if let helperText {
                Text(verbatim: helperText)
                    .brandLinedFont(size: F.helperFontSize, weight: F.helperFontWeight, lineHeight: F.helperLineHeight)
                    .foregroundStyle(F.helperColor)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityHidden(true)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    /// El `role="alert"` de la web: el mensaje se dice en voz alta al aparecer.
    private func announce(_ message: String) {
        var announcement = AttributedString(message)
        announcement.accessibilitySpeechAnnouncementPriority = .high
        AccessibilityNotification.Announcement(announcement).post()
    }
}

/// Con `labelHidden` el texto no se pinta pero sigue nombrando el control para VoiceOver.
private struct HiddenLabelAccessibility: ViewModifier {
    let label: Text?

    @ViewBuilder
    func body(content: Content) -> some View {
        if let label { content.accessibilityLabel(label) } else { content }
    }
}

#Preview("SwitcherField") {
    struct Demo: View {
        @State private var a = true
        @State private var b = false
        @State private var c = false
        var body: some View {
            VStack(alignment: .leading, spacing: BrandSpacing.s4) {
                ForEach(BrandControlSize.allCases, id: \.self) { size in
                    BrandSwitcherField(verbatim: "Talla \(size.rawValue)", isOn: $a, size: size)
                }
                BrandSwitcherField("Apagado", isOn: $b, helperText: "Texto de ayuda")
                BrandSwitcherField("Con error", isOn: $c, errorMessage: "Debes aceptarlo")
                BrandSwitcherField("Deshabilitado", isOn: $a).disabled(true)
            }
            .padding()
        }
    }
    return Demo()
}
