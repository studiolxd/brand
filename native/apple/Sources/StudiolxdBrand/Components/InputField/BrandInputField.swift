import SwiftUI

/// `InputField` `type`: el tipo de contenido (teclado, autocapitalización y rellenado automático adecuados).
/// `search` no está: para un campo de búsqueda, `kind: .search`.
public enum InputFieldType: String, CaseIterable, Sendable {
    case text, email, password, number, tel, url
}

/// `InputField` `kind`: `search` lo convierte en campo de búsqueda, con una lupa fija al inicio y la tecla de
/// intro rotulada «buscar».
public enum InputFieldKind: String, CaseIterable, Sendable {
    case text, search
}

/// `InputField` `size`: la talla de control compartida.
public typealias InputFieldSize = BrandControlSize

/// Un campo de texto de la marca con su etiqueta, ayuda y mensaje de error (`InputField` de React).
///
/// ```swift
/// BrandInputField("Correo", text: $email, type: .email, helperText: "Te escribiremos aquí")
/// BrandInputField("Nombre", text: $name, errorMessage: "Obligatorio")
/// BrandInputField("Buscar", text: $query, labelHidden: true, kind: .search, clearable: true)
/// ```
///
/// Estados: reposo, foco (anillo interior), error (`error` o un `errorMessage`), deshabilitado (`.disabled(_:)`) y de
/// solo lectura (`readOnly`). La altura y el tamaño de letra crecen con el tipo dinámico; en iOS toda la caja
/// enfoca el campo y el aspa de borrado tiene zona táctil de 44 pt.
///
/// **Dar el foco desde fuera.** La app lleva el foco con su propio `@FocusState` y lo enlaza con
/// `.brandFocused(_:)` (o `.brandFocused(_:equals:)` si es un enum con varios campos); el componente lo sincroniza con
/// su `@FocusState` interno, el que pinta el anillo, sin que se pisen:
///
/// ```swift
/// @FocusState private var addFocused: Bool
///
/// BrandInputField("Nueva tarea", text: $title).brandFocused($addFocused)
/// Button("Añadir") { addFocused = true }.keyboardShortcut("n")   // el cursor salta al campo
/// ```
public struct BrandInputField: View {
    private let label: LocalizedStringKey
    @Binding private var text: String
    private let labelHidden: Bool
    private let optional: Bool
    private let optionalLabel: LocalizedStringKey
    private let type: InputFieldType
    private let kind: InputFieldKind
    private let clearable: Bool
    private let clearLabel: LocalizedStringKey
    private let onClear: (() -> Void)?
    private let placeholder: LocalizedStringKey?
    private let readOnly: Bool
    private let error: Bool
    private let errorMessage: LocalizedStringKey?
    private let helperText: LocalizedStringKey?
    private let size: InputFieldSize?

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.brandControlSize) private var inheritedSize
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @FocusState private var isFocused: Bool
    @ScaledMetric(relativeTo: .body) private var heightScale: CGFloat = 1

    private typealias T = BrandInputTokens
    private typealias F = BrandInputFieldTokens

    /// - Parameters:
    ///   - optional: marca el campo como opcional (D70): « (opcional)» tras la etiqueta, en la tinta apagada, y parte
    ///     del nombre que lee VoiceOver. Explícita: un campo sin `required` no la lleva sola. No se combina con `required`.
    ///   - optionalLabel: el texto de esa marca. Por defecto «(opcional)» (castellano).
    ///   - labelHidden: oculta la etiqueta a la vista (la sigue leyendo VoiceOver). Sin `placeholder`, el control usa
    ///     el texto de la etiqueta como marcador de sitio.
    ///   - clearable: solo con `kind: .search`: un aspa al final del campo cuando hay texto.
    ///   - clearLabel: nombre accesible del aspa. Por defecto «Borrar» (castellano).
    ///   - readOnly: el texto se ve y se puede seleccionar, pero no se edita.
    ///   - error: marca el control en error sin mensaje; un `errorMessage` ya lo implica.
    ///   - size: sin valor toma la del entorno (`brandControlSize(_:)`) y, si tampoco hay, `md`.
    public init(
        _ label: LocalizedStringKey,
        text: Binding<String>,
        labelHidden: Bool = false,
        optional: Bool = false,
        optionalLabel: LocalizedStringKey = "(opcional)",
        type: InputFieldType = .text,
        kind: InputFieldKind = .text,
        clearable: Bool = false,
        clearLabel: LocalizedStringKey = "Borrar",
        onClear: (() -> Void)? = nil,
        placeholder: LocalizedStringKey? = nil,
        readOnly: Bool = false,
        error: Bool = false,
        errorMessage: LocalizedStringKey? = nil,
        helperText: LocalizedStringKey? = nil,
        size: InputFieldSize? = nil
    ) {
        self.label = label
        _text = text
        self.labelHidden = labelHidden
        self.optional = optional
        self.optionalLabel = optionalLabel
        self.type = type
        self.kind = kind
        self.clearable = clearable
        self.clearLabel = clearLabel
        self.onClear = onClear
        self.placeholder = placeholder
        self.readOnly = readOnly
        self.error = error
        self.errorMessage = errorMessage
        self.helperText = helperText
        self.size = size
    }

    private var resolvedSize: InputFieldSize { size ?? inheritedSize ?? .md }
    private var isSearch: Bool { kind == .search }
    private var hasError: Bool { error || errorMessage != nil }

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

    private var searchSlot: CGFloat {
        switch resolvedSize {
        case .sm: F.searchSmSlotSize
        case .md: F.searchSlotSize
        case .lg: F.searchLgSlotSize
        }
    }

    private var searchIconSize: CGFloat {
        switch resolvedSize {
        case .sm: F.searchSmIconSize
        case .md: F.searchIconSize
        case .lg: F.searchLgIconSize
        }
    }

    private var textColor: Color {
        if !isEnabled { return T.disabledColor }
        return hasError ? T.errorColor : T.color
    }

    private var placeholderColor: Color { hasError ? T.errorPlaceholderColor : T.placeholderColor }

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
            box
        }
    }

    private var showsClear: Bool { isSearch && clearable && !text.isEmpty && isEnabled && !readOnly }

    private var box: some View {
        let scaledHeight = height * heightScale
        let focused = isFocused && isEnabled
        let border: Color = !isEnabled ? T.disabledBorderColor : hasError ? (focused ? T.errorFocusBorderColor : T.errorBorderColor)
            : (focused ? T.focusBorderColor : T.borderColor)
        return HStack(spacing: 0) {
            if isSearch {
                BrandIcon(.search, size: .text)
                    .environment(\.brandIconTextSize, searchIconSize)
                    .foregroundStyle(F.searchIconColor)
                    .frame(width: searchSlot)
            }
            control
            if isSearch && clearable {
                clearButton.frame(width: searchSlot)
            }
        }
        .padding(.leading, isSearch ? 0 : paddingInline)
        .padding(.trailing, isSearch && clearable ? 0 : paddingInline)
        .frame(minHeight: scaledHeight)
        .frame(maxWidth: .infinity)
        .modifier(BrandFieldBox(
            radius: T.borderRadius,
            borderWidth: T.borderWidth,
            background: !isEnabled ? T.disabledBg : hasError ? T.errorBg : T.bg,
            border: border,
            ringWidth: T.focusRingWidth,
            ringInsetOffset: T.focusRingInsetOffset,
            ringColor: hasError ? T.errorFocusRingColor : T.focusRingColor,
            isFocused: focused,
            transition: reduceMotion ? nil : T.transitionEasing.animation(duration: T.transitionDuration)
        ))
        .contentShape(Rectangle())
        .onTapGesture { if !readOnly { isFocused = true } }
    }

    @ViewBuilder private var control: some View {
        let prompt = Text(placeholder ?? (labelHidden ? label : "")).foregroundColor(placeholderColor)
        Group {
            if readOnly {
                Text(text)
                    .textSelection(.enabled)
                    .frame(maxWidth: .infinity, alignment: .leading)
            } else if type == .password && !isSearch {
                SecureField(text: $text, prompt: prompt) { Text(label) }
            } else {
                TextField(text: $text, prompt: prompt) { Text(label) }
            }
        }
        .textFieldStyle(.plain)
        .focused($isFocused)
        .brandFocusApplied()
        .brandFont(size: fontSize, weight: T.fontWeight)
        .foregroundStyle(textColor)
        .tint(textColor)
        #if os(iOS)
        .modifier(InputTraits(type: type, kind: kind))
        #endif
        .submitLabel(isSearch ? .search : .done)
    }

    private var clearButton: some View {
        Button {
            text = ""
            isFocused = true
            onClear?()
        } label: {
            BrandIcon(.close, size: .text)
                .environment(\.brandIconTextSize, searchIconSize)
                .foregroundStyle(F.searchClearColor)
                .frame(width: searchSlot, height: searchSlot)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .opacity(showsClear ? 1 : 0)
        .allowsHitTesting(showsClear)
        .accessibilityHidden(!showsClear)
        .accessibilityLabel(Text(clearLabel))
        .brandHitTarget(width: searchSlot, height: searchSlot)
    }
}

#if os(iOS)
/// Teclado y rellenado automático según el `type` del campo (`inputmode`/`autocomplete` en la web).
private struct InputTraits: ViewModifier {
    let type: InputFieldType
    let kind: InputFieldKind

    @ViewBuilder
    func body(content: Content) -> some View {
        if kind == .search {
            content.textInputAutocapitalization(.never).autocorrectionDisabled()
        } else {
            switch type {
            case .text: content
            case .email: content.keyboardType(.emailAddress).textContentType(.emailAddress)
                .textInputAutocapitalization(.never).autocorrectionDisabled()
            case .password: content.textContentType(.password).textInputAutocapitalization(.never).autocorrectionDisabled()
            case .number: content.keyboardType(.numbersAndPunctuation)
            case .tel: content.keyboardType(.phonePad).textContentType(.telephoneNumber)
            case .url: content.keyboardType(.URL).textContentType(.URL)
                .textInputAutocapitalization(.never).autocorrectionDisabled()
            }
        }
    }
}
#endif

#Preview("InputField") {
    @Previewable @State var text = ""
    @Previewable @State var filled = "Ada Lovelace"
    @Previewable @State var query = "casa"
    @Previewable @State var task = ""
    @Previewable @FocusState var taskFocused: Bool
    return ScrollView {
        VStack(alignment: .leading, spacing: BrandSpacing.s5) {
            // Foco desde fuera: el botón (o un atajo) lleva el cursor al campo.
            BrandInputField("Nueva tarea", text: $task, placeholder: "¿Qué hay que hacer?").brandFocused($taskFocused)
            Button("Ir al campo") { taskFocused = true }.keyboardShortcut("n")
            BrandInputField("Nombre", text: $text, placeholder: "Escribe tu nombre")
            BrandInputField("Con valor y ayuda", text: $filled, helperText: "Así te verán los demás")
            BrandInputField("Con error", text: $text, errorMessage: "Este campo es obligatorio")
            BrandInputField("Deshabilitado", text: $filled).disabled(true)
            BrandInputField("Solo lectura", text: $filled, readOnly: true)
            BrandInputField("Contraseña", text: $filled, type: .password)
            BrandInputField("Buscar", text: $query, kind: .search, clearable: true)
            ForEach(InputFieldSize.allCases, id: \.self) { size in
                BrandInputField("Talla \(size.rawValue)", text: $filled, size: size)
            }
        }
        .padding()
    }
}
