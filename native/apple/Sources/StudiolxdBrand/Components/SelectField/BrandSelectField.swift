import SwiftUI

/// `SelectField` `size`: la talla de control compartida.
public typealias SelectFieldSize = BrandControlSize

/// Una opción de un `BrandSelectField` (`SelectOption` de React: `{ value, label }`).
public struct BrandSelectOption: Hashable, Sendable {
    public let value: String
    public let label: String

    public init(value: String, label: String) {
        self.value = value
        self.label = label
    }
}

/// Una entrada de `options`: una opción suelta o un grupo con cabecera (`SelectOptionOrGroup`). La cabecera es una
/// etiqueta, no una opción elegible. Las dos formas se pueden mezclar.
public enum BrandSelectEntry: Hashable, Sendable {
    case option(BrandSelectOption)
    case group(label: String, options: [BrandSelectOption])

    /// Atajo: `.option("es", "Español")`.
    public static func option(_ value: String, _ label: String) -> BrandSelectEntry {
        .option(BrandSelectOption(value: value, label: label))
    }
}

/// Un desplegable de la marca con su etiqueta, ayuda y mensaje de error (`SelectField` de React). El aspecto es el
/// del selector de Brand; el desplegable es un `Menu` nativo (gestos, teclado y VoiceOver del sistema) con una marca
/// de verificación en la opción elegida.
///
/// ```swift
/// BrandSelectField("Idioma", selection: $language, options: [
///     .option("es", "Español"), .option("en", "Inglés"),
/// ])
/// ```
///
/// `selection == ""` significa «nada elegido» y el disparador enseña el `placeholder`, salvo que una opción tenga
/// precisamente el valor `""` (el patrón «Selecciona un tipo» en cabeza de lista): entonces enseña su etiqueta.
public struct BrandSelectField: View {
    private let label: LocalizedStringKey
    @Binding private var selection: String
    private let options: [BrandSelectEntry]
    private let labelHidden: Bool
    private let optional: Bool
    private let optionalLabel: LocalizedStringKey
    private let placeholder: LocalizedStringKey
    private let error: Bool
    private let errorMessage: LocalizedStringKey?
    private let helperText: LocalizedStringKey?
    private let size: SelectFieldSize?

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.brandControlSize) private var inheritedSize
    @FocusState private var isFocused: Bool
    @ScaledMetric(relativeTo: .body) private var heightScale: CGFloat = 1

    private typealias T = BrandSelectTokens
    private typealias F = BrandSelectFieldTokens

    /// - Parameters:
    ///   - optional: marca el campo como opcional (D70): « (opcional)» tras la etiqueta, en la tinta apagada, y parte
    ///     del nombre que lee VoiceOver. Explícita: un campo sin `required` no la lleva sola. No se combina con `required`.
    ///   - optionalLabel: el texto de esa marca. Por defecto «(opcional)» (castellano).
    ///   - placeholder: marcador de sitio del disparador sin valor elegido. Por defecto «Seleccionar…» (castellano).
    ///   - error: marca el control en error sin mensaje; un `errorMessage` ya lo implica.
    public init(
        _ label: LocalizedStringKey,
        selection: Binding<String>,
        options: [BrandSelectEntry],
        labelHidden: Bool = false,
        optional: Bool = false,
        optionalLabel: LocalizedStringKey = "(opcional)",
        placeholder: LocalizedStringKey = "Seleccionar…",
        error: Bool = false,
        errorMessage: LocalizedStringKey? = nil,
        helperText: LocalizedStringKey? = nil,
        size: SelectFieldSize? = nil
    ) {
        self.label = label
        _selection = selection
        self.options = options
        self.labelHidden = labelHidden
        self.optional = optional
        self.optionalLabel = optionalLabel
        self.placeholder = placeholder
        self.error = error
        self.errorMessage = errorMessage
        self.helperText = helperText
        self.size = size
    }

    private var resolvedSize: SelectFieldSize { size ?? inheritedSize ?? .md }
    private var hasError: Bool { error || errorMessage != nil }

    private var flatOptions: [BrandSelectOption] {
        options.flatMap { entry -> [BrandSelectOption] in
            switch entry {
            case .option(let option): [option]
            case .group(_, let options): options
            }
        }
    }

    private var selectedLabel: String? { flatOptions.first { $0.value == selection }?.label }

    private var height: CGFloat {
        switch resolvedSize {
        case .sm: T.smHeight
        case .md: T.height
        case .lg: T.lgHeight
        }
    }

    private var fontSize: CGFloat {
        switch resolvedSize {
        case .sm: T.smFontSize
        case .md: T.fontSize
        case .lg: T.lgFontSize
        }
    }

    private var paddingInline: CGFloat {
        switch resolvedSize {
        case .sm: T.smPaddingInline
        case .md: T.paddingInline
        case .lg: T.lgPaddingInline
        }
    }

    private var iconSize: CGFloat {
        switch resolvedSize {
        case .sm: T.smIconSize
        case .md: T.iconSize
        case .lg: T.lgIconSize
        }
    }

    public var body: some View {
        BrandFieldLayout(
            label: label,
            labelHidden: labelHidden,
            size: resolvedSize,
            gap: F.gap,
            errorMessage: errorMessage,
            helperText: helperText,
            helper: .init(fontSize: F.helperFontSize, fontWeight: F.helperFontWeight, lineHeight: F.helperLineHeight, color: F.helperColor),
            optionalLabel: optional ? optionalLabel : nil
        ) {
            menu
        }
    }

    private var menu: some View {
        Menu {
            Picker(selection: $selection) {
                ForEach(Array(options.enumerated()), id: \.offset) { _, entry in
                    switch entry {
                    case .option(let option):
                        Text(option.label).tag(option.value)
                    case .group(let title, let options):
                        Section(title) {
                            ForEach(options, id: \.self) { option in Text(option.label).tag(option.value) }
                        }
                    }
                }
            } label: { Text(label) }
            .pickerStyle(.inline)
            .labelsHidden()
        } label: {
            trigger
        }
        .menuStyle(.button)
        .menuIndicator(.hidden)
        .buttonStyle(.plain)
        .focused($isFocused)
        .focusEffectDisabled()
        .accessibilityValue(Text(selectedLabel ?? ""))
    }

    private var trigger: some View {
        let scaledHeight = height * heightScale
        let shape = RoundedRectangle(cornerRadius: T.borderRadius)
        return HStack(spacing: T.iconGap) {
            Group {
                if let selectedLabel { Text(verbatim: selectedLabel) } else { Text(placeholder) }
            }
            .lineLimit(1)
            .frame(maxWidth: .infinity, alignment: .leading)
            BrandIcon(.chevron, size: .text)
                .environment(\.brandIconTextSize, iconSize)
                .rotationEffect(.degrees(90))
        }
        .brandFont(size: fontSize, weight: T.fontWeight)
        .foregroundStyle(isEnabled ? T.color : BrandInputTokens.disabledColor)
        .padding(.horizontal, paddingInline)
        .frame(minHeight: scaledHeight)
        .frame(maxWidth: .infinity)
        .background(isEnabled ? T.bg : BrandInputTokens.disabledBg, in: shape)
        .overlay {
            shape.strokeBorder(isEnabled ? (hasError ? T.errorBorderColor : T.borderColor) : BrandInputTokens.disabledBorderColor,
                               lineWidth: T.borderWidth)
        }
        .overlay {
            // `outline` hacia dentro, pegado al borde.
            if isFocused && isEnabled {
                shape.inset(by: T.borderWidth).strokeBorder(T.focusRingColor, lineWidth: T.focusRingWidth)
            }
        }
        .contentShape(Rectangle())
        .brandHitTarget(height: scaledHeight)
    }
}

#Preview("SelectField") {
    @Previewable @State var language = "es"
    @Previewable @State var empty = ""
    @Previewable @State var grouped = "madrid"
    let languages: [BrandSelectEntry] = [.option("es", "Español"), .option("en", "Inglés"), .option("fr", "Francés")]
    return ScrollView {
        VStack(alignment: .leading, spacing: BrandSpacing.s5) {
            BrandSelectField("Idioma", selection: $language, options: languages, helperText: "Cambia el idioma de la app")
            BrandSelectField("Sin elegir", selection: $empty, options: languages)
            BrandSelectField("Con error", selection: $empty, options: languages, errorMessage: "Elige una opción")
            BrandSelectField("Deshabilitado", selection: $language, options: languages).disabled(true)
            BrandSelectField("Con grupos", selection: $grouped, options: [
                .group(label: "España", options: [.init(value: "madrid", label: "Madrid"), .init(value: "bcn", label: "Barcelona")]),
                .group(label: "Francia", options: [.init(value: "paris", label: "París")]),
            ])
            ForEach(SelectFieldSize.allCases, id: \.self) { size in
                BrandSelectField("Talla \(size.rawValue)", selection: $language, options: languages, size: size)
            }
        }
        .padding()
    }
}
