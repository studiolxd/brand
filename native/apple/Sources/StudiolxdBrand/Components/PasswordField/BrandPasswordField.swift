import SwiftUI

/// `PasswordField` `size`: la talla de control compartida.
public typealias PasswordFieldSize = BrandControlSize

/// Un campo de contraseña con el botón de mostrar u ocultar dentro de la caja (`PasswordField` de React).
///
/// ```swift
/// BrandPasswordField("Contraseña", text: $password, helperText: "Mínimo 8 caracteres")
/// BrandPasswordField("Contraseña", text: $password, labelHidden: true)
/// BrandPasswordField("Contraseña", text: $password, errorMessage: "Es demasiado corta")
/// ```
///
/// Con la contraseña oculta es un `SecureField` (sin copiar ni sugerencias) que pide el relleno automático de contraseña;
/// con el ojo se vuelve un `TextField` y el campo conserva el foco. El botón es el ojo / ojo tachado del catálogo, a ras
/// del borde, con zona táctil de 44 pt en iOS; su nombre accesible cambia con el estado (`showPasswordLabel` /
/// `hidePasswordLabel`) y se anuncia como interruptor. Al salir de pantalla la contraseña vuelve a oculta.
///
/// **Etiqueta.** Como en React (y en `BrandInputField`), la etiqueta se ve por defecto. Con `labelHidden: true` no se ve
/// pero la lee VoiceOver, y sirve de marcador de sitio si no hay `placeholder`.
///
/// **Dar el foco desde fuera**: `.brandFocused($focus)` o `.brandFocused($focus, equals: .password)` (ver
/// `BrandInputField`), que apunta siempre al texto y no al ojo:
///
/// ```swift
/// @FocusState private var focus: Bool
/// BrandPasswordField("Contraseña", text: $password).brandFocused($focus)
/// ```
///
/// Estados: reposo, foco (anillo interior), error (`error` o un `errorMessage`) y deshabilitado (`.disabled(_:)`).
public struct BrandPasswordField: View {
    private let label: LocalizedStringKey
    @Binding private var text: String
    private let labelHidden: Bool
    private let optional: Bool
    private let optionalLabel: LocalizedStringKey
    private let placeholder: LocalizedStringKey?
    private let error: Bool
    private let errorMessage: LocalizedStringKey?
    private let helperText: LocalizedStringKey?
    private let size: PasswordFieldSize?
    private let showPasswordLabel: LocalizedStringKey
    private let hidePasswordLabel: LocalizedStringKey

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.brandControlSize) private var inheritedSize
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @FocusState private var isFocused: Bool
    @State private var isVisible: Bool
    @ScaledMetric(relativeTo: .body) private var heightScale: CGFloat = 1

    private typealias T = BrandInputTokens
    private typealias F = BrandInputFieldTokens
    private typealias P = BrandPasswordFieldTokens

    /// - Parameters:
    ///   - optional: marca el campo como opcional (D70): « (opcional)» tras la etiqueta, en la tinta apagada, y parte
    ///     del nombre que lee VoiceOver. Explícita: un campo sin `required` no la lleva sola. No se combina con `required`.
    ///   - optionalLabel: el texto de esa marca. Por defecto «(opcional)» (castellano).
    ///   - labelHidden: oculta la etiqueta a la vista (la sigue leyendo VoiceOver). Por defecto `false`, como en React.
    ///     Sin `placeholder`, el control usa el texto de la etiqueta como marcador de sitio.
    ///   - error: marca el control en error sin mensaje; un `errorMessage` ya lo implica.
    ///   - size: sin valor toma la del entorno (`brandControlSize(_:)`) y, si tampoco hay, `md`.
    ///   - showPasswordLabel: nombre accesible del ojo con la contraseña oculta. Por defecto «Mostrar contraseña» (castellano).
    ///   - hidePasswordLabel: nombre accesible del ojo con la contraseña a la vista. Por defecto «Ocultar contraseña» (castellano).
    public init(
        _ label: LocalizedStringKey,
        text: Binding<String>,
        labelHidden: Bool = false,
        optional: Bool = false,
        optionalLabel: LocalizedStringKey = "(opcional)",
        placeholder: LocalizedStringKey? = nil,
        error: Bool = false,
        errorMessage: LocalizedStringKey? = nil,
        helperText: LocalizedStringKey? = nil,
        size: PasswordFieldSize? = nil,
        showPasswordLabel: LocalizedStringKey = "Mostrar contraseña",
        hidePasswordLabel: LocalizedStringKey = "Ocultar contraseña"
    ) {
        self.init(label, text: text, labelHidden: labelHidden, optional: optional, optionalLabel: optionalLabel, placeholder: placeholder, error: error,
                  errorMessage: errorMessage, helperText: helperText, size: size, showPasswordLabel: showPasswordLabel,
                  hidePasswordLabel: hidePasswordLabel, initiallyVisible: false)
    }

    /// Para capturas y pruebas: arranca con la contraseña a la vista.
    init(
        _ label: LocalizedStringKey,
        text: Binding<String>,
        labelHidden: Bool = false,
        optional: Bool = false,
        optionalLabel: LocalizedStringKey = "(opcional)",
        placeholder: LocalizedStringKey? = nil,
        error: Bool = false,
        errorMessage: LocalizedStringKey? = nil,
        helperText: LocalizedStringKey? = nil,
        size: PasswordFieldSize? = nil,
        showPasswordLabel: LocalizedStringKey = "Mostrar contraseña",
        hidePasswordLabel: LocalizedStringKey = "Ocultar contraseña",
        initiallyVisible: Bool
    ) {
        self.label = label
        _text = text
        self.labelHidden = labelHidden
        self.optional = optional
        self.optionalLabel = optionalLabel
        self.placeholder = placeholder
        self.error = error
        self.errorMessage = errorMessage
        self.helperText = helperText
        self.size = size
        self.showPasswordLabel = showPasswordLabel
        self.hidePasswordLabel = hidePasswordLabel
        _isVisible = State(initialValue: initiallyVisible)
    }

    private var resolvedSize: PasswordFieldSize { size ?? inheritedSize ?? .md }
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

    private var toggleSize: CGFloat {
        switch resolvedSize {
        case .sm: P.smToggleSize
        case .md: P.toggleSize
        case .lg: P.lgToggleSize
        }
    }

    private var toggleIconSize: CGFloat {
        switch resolvedSize {
        case .sm: P.smToggleIconSize
        case .md: P.toggleIconSize
        case .lg: P.lgToggleIconSize
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
            gap: P.gap,
            errorMessage: errorMessage,
            helperText: helperText,
            helper: .init(fontSize: F.helperFontSize, fontWeight: F.helperFontWeight, lineHeight: F.helperLineHeight, color: F.helperColor),
            optionalLabel: optional ? optionalLabel : nil
        ) {
            box
        }
        .onDisappear { isVisible = false }
    }

    private var box: some View {
        let scaledHeight = height * heightScale
        let focused = isFocused && isEnabled
        let border: Color = !isEnabled ? T.disabledBorderColor : hasError ? (focused ? T.errorFocusBorderColor : T.errorBorderColor)
            : (focused ? T.focusBorderColor : T.borderColor)
        return HStack(spacing: 0) {
            control
            toggle(side: toggleSize * heightScale)
        }
        .padding(.leading, paddingInline)
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
        .onTapGesture { isFocused = true }
    }

    @ViewBuilder private var control: some View {
        let prompt = Text(placeholder ?? (labelHidden ? label : "")).foregroundColor(placeholderColor)
        Group {
            if isVisible {
                TextField(text: $text, prompt: prompt) { Text(label) }
            } else {
                SecureField(text: $text, prompt: prompt) { Text(label) }
            }
        }
        .textFieldStyle(.plain)
        .focused($isFocused)
        .brandFocusApplied()
        .brandFont(size: fontSize, weight: T.fontWeight)
        .foregroundStyle(textColor)
        .tint(textColor)
        .autocorrectionDisabled()
        #if os(iOS)
        .textContentType(.password)
        .textInputAutocapitalization(.never)
        #endif
        .submitLabel(.done)
    }

    private func toggle(side: CGFloat) -> some View {
        Button {
            // Cambiar de `SecureField` a `TextField` es cambiar de vista: si tenía el foco, se lo devolvemos.
            let hadFocus = isFocused
            isVisible.toggle()
            if hadFocus { DispatchQueue.main.async { isFocused = true } }
        } label: {
            PasswordToggleGlyph(isVisible: isVisible, iconSize: toggleIconSize, side: side)
        }
        .buttonStyle(.plain)
        .focusEffectDisabled()
        .accessibilityLabel(Text(isVisible ? hidePasswordLabel : showPasswordLabel))
        .accessibilityAddTraits(.isToggle)
        .brandHitTarget(width: side, height: side)
    }
}

/// El ojo y su anillo de foco de teclado (`password-field__toggle:focus-visible`: el anillo va hacia dentro porque el
/// botón se apoya en el borde del campo).
private struct PasswordToggleGlyph: View {
    let isVisible: Bool
    let iconSize: CGFloat
    let side: CGFloat

    @Environment(\.isFocused) private var isFocused
    private typealias P = BrandPasswordFieldTokens

    var body: some View {
        BrandIcon(isVisible ? .eyeOff : .eye, size: .text)
            .environment(\.brandIconTextSize, iconSize)
            .foregroundStyle(P.toggleColor)
            .frame(width: side, height: side)
            .overlay {
                if isFocused {
                    Rectangle()
                        .inset(by: P.toggleFocusRingOffset)
                        .strokeBorder(P.toggleFocusRingColor, lineWidth: P.toggleFocusRingWidth)
                }
            }
            .contentShape(Rectangle())
    }
}

private struct PasswordFieldPreview: View {
    @State private var password = "secreto123"
    @State private var empty = ""
    @FocusState private var focused: Bool

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: BrandSpacing.s5) {
                BrandPasswordField("Contraseña", text: $empty, labelHidden: true)
                BrandPasswordField("Contraseña", text: $password, helperText: "Mínimo 8 caracteres")
                BrandPasswordField("Contraseña", text: $password, errorMessage: "Es demasiado corta")
                BrandPasswordField("Deshabilitada", text: $password).disabled(true)
                // Foco desde fuera: el botón (o un atajo) lleva el cursor al campo.
                BrandPasswordField("Repite la contraseña", text: $empty).brandFocused($focused)
                Button("Ir al campo") { focused = true }.keyboardShortcut("n")
                ForEach(PasswordFieldSize.allCases, id: \.self) { size in
                    BrandPasswordField("Talla \(size.rawValue)", text: $password, size: size)
                }
            }
            .padding()
        }
    }
}

#Preview("PasswordField") { PasswordFieldPreview() }
