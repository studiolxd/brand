import SwiftUI

/// `NumberInputField` `size`: la talla de control compartida.
public typealias NumberInputFieldSize = BrandControlSize

/// Un campo numérico con botones de restar y sumar, etiqueta, ayuda y error (`NumberInputField` de React).
///
/// ```swift
/// BrandNumberInputField("Cantidad", value: $quantity, min: 0, max: 99)
/// BrandNumberInputField("Importe", value: $amount, decimal: true, step: 0.5, helperText: "En euros")
/// BrandNumberInputField("Plazas", value: $seats, placeholder: "Sin indicar")   // $seats: Double?
/// ```
///
/// **Sin valor.** Con un `Binding<Double?>`, `nil` es «sin valor»: el campo está vacío (y enseña el `placeholder`, si lo
/// hay) y vaciar el texto escribe `nil`. Desde vacío, − y + parten de 0 y se ajustan a `min`/`max` (los botones no se
/// deshabilitan por los topes estando vacío), igual que el ajuste de VoiceOver; vacío no anuncia valor sino
/// `emptyValueLabel`. Con un `Binding<Double>` (sobrecarga) el campo nunca queda sin valor: al salir con el texto vacío
/// recupera el último número.
///
/// **Dar el foco desde fuera**: `.brandFocused($focus)` (ver `BrandInputField`), que apunta siempre al texto y no a los
/// botones − y +.
///
/// El valor se fija entre `min` y `max` al teclear y al pulsar los botones; con `decimal` admite coma o punto. El
/// borrador que se está tecleando (`12,`) no se pisa hasta que el campo pierde el foco. VoiceOver lo anuncia como un
/// valor **ajustable**: deslizar arriba o abajo suma o resta un paso.
public struct BrandNumberInputField: View {
    private let label: LocalizedStringKey
    @Binding private var value: Double?
    private let labelHidden: Bool
    private let placeholder: LocalizedStringKey?
    private let range: ClosedRange<Double>
    private let step: Double
    private let decimal: Bool
    private let readOnly: Bool
    private let error: Bool
    private let errorMessage: LocalizedStringKey?
    private let helperText: LocalizedStringKey?
    private let size: NumberInputFieldSize?
    private let decrementLabel: LocalizedStringKey
    private let incrementLabel: LocalizedStringKey
    private let emptyValueLabel: LocalizedStringKey

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.brandControlSize) private var inheritedSize
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @FocusState private var isFocused: Bool
    @State private var draft: String?
    @State private var feedback = 0
    @ScaledMetric(relativeTo: .body) private var heightScale: CGFloat = 1

    private typealias T = BrandNumberInputTokens
    private typealias F = BrandNumberInputFieldTokens

    /// - Parameters:
    ///   - value: el valor; `nil` es «sin valor» (campo vacío).
    ///   - placeholder: el marcador que se ve con el campo vacío.
    ///   - min: valor mínimo (sin tope si es `nil`).
    ///   - max: valor máximo (sin tope si es `nil`).
    ///   - step: lo que suman y restan los botones.
    ///   - decimal: admite decimales (coma o punto).
    ///   - decrementLabel: nombre accesible del botón de restar. Por defecto «Decrementar» (castellano).
    ///   - incrementLabel: nombre accesible del botón de sumar. Por defecto «Incrementar» (castellano).
    ///   - emptyValueLabel: lo que lee VoiceOver como valor con el campo vacío. Por defecto «Sin valor» (castellano).
    public init(
        _ label: LocalizedStringKey,
        value: Binding<Double?>,
        labelHidden: Bool = false,
        placeholder: LocalizedStringKey? = nil,
        min: Double? = nil,
        max: Double? = nil,
        step: Double = 1,
        decimal: Bool = false,
        readOnly: Bool = false,
        error: Bool = false,
        errorMessage: LocalizedStringKey? = nil,
        helperText: LocalizedStringKey? = nil,
        size: NumberInputFieldSize? = nil,
        decrementLabel: LocalizedStringKey = "Decrementar",
        incrementLabel: LocalizedStringKey = "Incrementar",
        emptyValueLabel: LocalizedStringKey = "Sin valor"
    ) {
        self.label = label
        _value = value
        self.labelHidden = labelHidden
        self.placeholder = placeholder
        range = (min ?? -.infinity)...(max ?? .infinity)
        self.step = step
        self.decimal = decimal
        self.readOnly = readOnly
        self.error = error
        self.errorMessage = errorMessage
        self.helperText = helperText
        self.size = size
        self.decrementLabel = decrementLabel
        self.incrementLabel = incrementLabel
        self.emptyValueLabel = emptyValueLabel
    }

    /// Compatibilidad: un `Binding<Double>` (el campo nunca queda sin valor).
    public init(
        _ label: LocalizedStringKey,
        value: Binding<Double>,
        labelHidden: Bool = false,
        placeholder: LocalizedStringKey? = nil,
        min: Double? = nil,
        max: Double? = nil,
        step: Double = 1,
        decimal: Bool = false,
        readOnly: Bool = false,
        error: Bool = false,
        errorMessage: LocalizedStringKey? = nil,
        helperText: LocalizedStringKey? = nil,
        size: NumberInputFieldSize? = nil,
        decrementLabel: LocalizedStringKey = "Decrementar",
        incrementLabel: LocalizedStringKey = "Incrementar",
        emptyValueLabel: LocalizedStringKey = "Sin valor"
    ) {
        self.init(
            label,
            value: Binding<Double?>(get: { value.wrappedValue }, set: { if let next = $0 { value.wrappedValue = next } }),
            labelHidden: labelHidden, placeholder: placeholder, min: min, max: max, step: step, decimal: decimal,
            readOnly: readOnly, error: error, errorMessage: errorMessage, helperText: helperText, size: size,
            decrementLabel: decrementLabel, incrementLabel: incrementLabel, emptyValueLabel: emptyValueLabel
        )
    }

    private var resolvedSize: NumberInputFieldSize { size ?? inheritedSize ?? .md }
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

    // MARK: Valor

    private func clamp(_ n: Double) -> Double { Swift.min(Swift.max(n, range.lowerBound), range.upperBound) }

    /// Como `String(n)` de la web: «3» y no «3.0».
    private func format(_ n: Double) -> String {
        n == n.rounded() && abs(n) < 1e15 ? String(Int(n)) : String(n)
    }

    /// Suma `delta` partiendo del valor o, si no lo hay, de 0 (el campo vacío cuenta como 0).
    private func commit(adding delta: Double) {
        value = clamp((value ?? 0) + delta)
        feedback += 1
    }

    // Vacío no se deshabilita por los topes: − y + parten de 0 y se ajustan.
    private var canDecrement: Bool { isEnabled && !readOnly && (value.map { $0 > range.lowerBound } ?? true) }
    private var canIncrement: Bool { isEnabled && !readOnly && (value.map { $0 < range.upperBound } ?? true) }

    private var displayed: Binding<String> {
        Binding(
            get: { draft ?? value.map(format) ?? "" },
            set: { raw in
                draft = raw
                let normalized = (decimal ? raw.replacingOccurrences(of: ",", with: ".") : raw).trimmingCharacters(in: .whitespaces)
                if normalized.isEmpty { value = nil }
                else if let parsed = Double(normalized) { value = clamp(parsed) }
            }
        )
    }

    // MARK: Vista

    public var body: some View {
        BrandFieldLayout(
            label: label,
            labelHidden: labelHidden,
            size: resolvedSize,
            gap: F.gap,
            errorMessage: errorMessage,
            helperText: helperText,
            helper: .init(fontSize: F.helperFontSize, fontWeight: F.helperFontWeight, lineHeight: F.helperLineHeight, color: F.helperColor)
        ) {
            box
        }
    }

    private var box: some View {
        let scaledHeight = height * heightScale
        let focused = isFocused && isEnabled
        let border: Color = !isEnabled ? T.disabledBorderColor : hasError ? (focused ? T.errorFocusBorderColor : T.errorBorderColor)
            : (focused ? T.focusBorderColor : T.borderColor)
        let separator = hasError || !isEnabled ? border : T.btnSeparatorColor
        return HStack(spacing: 0) {
            stepButton(.minus, label: decrementLabel, enabled: canDecrement, height: scaledHeight) { commit(adding: -step) }
            Rectangle().fill(separator).frame(width: T.borderWidth)
            field
            Rectangle().fill(separator).frame(width: T.borderWidth)
            stepButton(.plus, label: incrementLabel, enabled: canIncrement, height: scaledHeight) { commit(adding: step) }
        }
        .frame(minHeight: scaledHeight)
        .frame(maxWidth: .infinity)
        .clipped()
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
        .sensoryFeedback(.selection, trigger: feedback)
    }

    private var field: some View {
        let color: Color = !isEnabled ? T.disabledColor : hasError ? T.errorColor : T.color
        let prompt = placeholder.map { Text($0).foregroundColor(hasError ? BrandInputTokens.errorPlaceholderColor : BrandInputTokens.placeholderColor) }
        return Group {
            if readOnly {
                Text(value.map(format) ?? "").textSelection(.enabled)
            } else {
                TextField(text: displayed, prompt: prompt) { Text(label) }
            }
        }
        .textFieldStyle(.plain)
        .multilineTextAlignment(.center)
        .focused($isFocused)
        .brandFocusApplied()
        .onChange(of: isFocused) { _, focused in if !focused { draft = nil } }
        .brandFont(size: fontSize, weight: T.fontWeight)
        .monospacedDigit()
        .foregroundStyle(color)
        .tint(color)
        .padding(.horizontal, paddingInline)
        .frame(maxWidth: .infinity)
        .contentShape(Rectangle())
        #if os(iOS)
        .keyboardType(decimal ? .decimalPad : .numberPad)
        #endif
        .accessibilityValue(value.map { Text(format($0)) } ?? Text(emptyValueLabel))
        .accessibilityAdjustableAction { direction in
            guard !readOnly, isEnabled else { return }
            switch direction {
            case .increment: if canIncrement { commit(adding: step) }
            case .decrement: if canDecrement { commit(adding: -step) }
            @unknown default: break
            }
        }
    }

    private func stepButton(_ icon: BrandIconName, label: LocalizedStringKey, enabled: Bool, height: CGFloat,
                            action: @escaping () -> Void) -> some View {
        Button(action: action) {
            BrandIcon(icon, size: .sm)
                .foregroundStyle(enabled ? T.btnColor : T.disabledBtnColor)
                .frame(width: T.btnWidth)
                .frame(maxHeight: .infinity)
        }
        .buttonStyle(NumberInputStepStyle(enabled: enabled))
        .disabled(!enabled)
        .accessibilityLabel(Text(label))
        .brandHitTarget(width: T.btnWidth, height: height)
    }
}

/// Pulsado y *hover* del botón ±: sin relleno bajo el puntero (regla de Colores), una línea de tinta bajo el botón.
private struct NumberInputStepStyle: ButtonStyle {
    let enabled: Bool
    @State private var isHovering = false

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .overlay(alignment: .bottom) {
                if enabled, isHovering || configuration.isPressed {
                    Rectangle().fill(T.btnHoverLineColor).frame(height: T.btnHoverLineWidth)
                }
            }
            .contentShape(Rectangle())
            .onHover { isHovering = $0 }
    }

    private typealias T = BrandNumberInputTokens
}

private struct NumberInputFieldPreview: View {
    @State private var quantity = 3.0
    @State private var amount = 12.5
    @State private var seats: Double?
    @State private var units: Double? = 2
    @FocusState private var unitsFocused: Bool

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: BrandSpacing.s5) {
                BrandNumberInputField("Cantidad", value: $quantity, min: 0, max: 5, helperText: "Entre 0 y 5")
                BrandNumberInputField("Importe", value: $amount, step: 0.5, decimal: true)
                BrandNumberInputField("Plazas (sin valor)", value: $seats, placeholder: "Sin indicar", min: 0, max: 10,
                                      helperText: "Vacío: − y + parten de 0")
                // Foco desde fuera: el botón lleva el cursor al campo.
                BrandNumberInputField("Unidades", value: $units, min: 0).brandFocused($unitsFocused)
                Button("Ir a Unidades") { unitsFocused = true }.keyboardShortcut("n")
                BrandNumberInputField("Con error", value: $quantity, errorMessage: "Demasiadas unidades")
                BrandNumberInputField("Deshabilitado", value: $quantity).disabled(true)
                BrandNumberInputField("Solo lectura", value: $quantity, readOnly: true)
                BrandNumberInputField("Talla sm", value: $quantity, size: .sm)
                BrandNumberInputField("Talla md", value: $quantity, size: .md)
                BrandNumberInputField("Talla lg", value: $quantity, size: .lg)
            }
            .padding()
        }
    }
}

#Preview("NumberInputField") { NumberInputFieldPreview() }
