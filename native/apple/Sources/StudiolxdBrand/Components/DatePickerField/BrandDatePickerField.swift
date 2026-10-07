import SwiftUI

/// `DatePickerField` `size`: la talla de control compartida.
public typealias DatePickerFieldSize = BrandControlSize

/// Un campo de fecha de la marca con su etiqueta, ayuda y mensaje de error (`DatePickerField` de React). El campo es de
/// Brand (la caja de `BrandInputField`: tallas, estados y error) y el **selector es el del sistema**: el `DatePicker`
/// gráfico en un popover (iPad y macOS) o en una hoja inferior con «Listo» y «Cancelar» (iPhone). No hay calendario
/// propio: así se heredan el idioma, el primer día de la semana y VoiceOver.
///
/// ```swift
/// @State private var due: Date?
///
/// BrandDatePickerField("Vence", date: $due, in: Date.now...Date.now.addingTimeInterval(86_400 * 365))
/// ```
///
/// - La fecha **no se escribe**: el campo la muestra (formato corto del `locale`) o el `placeholder`, y el botón de
///   calendario abre el selector. Con fecha y sin `readOnly`, un aspa la borra (`nil`).
/// - La fecha es **de calendario, sin hora**: se normaliza a las 00:00 del calendario del entorno.
/// - `in` limita el rango elegible (`minDate` y `maxDate` de React).
/// - Con `readOnly` el botón no abre nada; con `.disabled(_:)` el campo entero se atenúa.
public struct BrandDatePickerField: View {
    private let label: LocalizedStringKey
    @Binding private var date: Date?
    private let range: ClosedRange<Date>?
    private let labelHidden: Bool
    private let placeholder: LocalizedStringKey
    private let readOnly: Bool
    private let required: Bool
    private let error: Bool
    private let errorMessage: LocalizedStringKey?
    private let helperText: LocalizedStringKey?
    private let size: DatePickerFieldSize?
    private let openCalendarLabel: LocalizedStringKey
    private let clearLabel: LocalizedStringKey
    private let doneLabel: LocalizedStringKey
    private let cancelLabel: LocalizedStringKey
    private let requiredLabel: LocalizedStringKey
    private let locale: Locale?

    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.brandControlSize) private var inheritedSize
    @Environment(\.calendar) private var calendar
    @Environment(\.locale) private var environmentLocale
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    #if os(iOS)
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    #endif
    @FocusState private var isButtonFocused: Bool
    @State private var isPresented = false
    @State private var draft = Date()
    @ScaledMetric(relativeTo: .body) private var heightScale: CGFloat = 1

    private typealias T = BrandInputTokens
    private typealias B = BrandDatePickerTokens
    private typealias F = BrandDatePickerFieldTokens

    /// - Parameters:
    ///   - date: la fecha elegida (`nil` = ninguna), normalizada a las 00:00 del calendario del entorno.
    ///   - range: el rango elegible; sin él, cualquier fecha.
    ///   - placeholder: lo que enseña el campo sin fecha. Por defecto «Elige una fecha» (castellano).
    ///   - openCalendarLabel: nombre accesible del botón del calendario. Por defecto «Abrir calendario» (castellano).
    ///   - clearLabel: nombre accesible del aspa. Por defecto «Borrar» (castellano).
    ///   - doneLabel: botón que confirma en la hoja del iPhone. Por defecto «Listo» (castellano).
    ///   - cancelLabel: botón que descarta en la hoja del iPhone. Por defecto «Cancelar» (castellano).
    ///   - required: campo obligatorio (`required` de React). SwiftUI no tiene rasgo de accesibilidad para lo
    ///     obligatorio: VoiceOver lee `requiredLabel` tras la etiqueta. La validación sigue siendo de la app.
    ///   - requiredLabel: lo que se lee tras la etiqueta con `required`. Por defecto «obligatorio» (castellano).
    ///   - locale: el de la fecha mostrada y el del selector; sin valor, el del entorno.
    ///   - error: marca el campo en error sin mensaje; un `errorMessage` ya lo implica.
    public init(
        _ label: LocalizedStringKey,
        date: Binding<Date?>,
        in range: ClosedRange<Date>? = nil,
        labelHidden: Bool = false,
        placeholder: LocalizedStringKey = "Elige una fecha",
        readOnly: Bool = false,
        required: Bool = false,
        error: Bool = false,
        errorMessage: LocalizedStringKey? = nil,
        helperText: LocalizedStringKey? = nil,
        size: DatePickerFieldSize? = nil,
        openCalendarLabel: LocalizedStringKey = "Abrir calendario",
        clearLabel: LocalizedStringKey = "Borrar",
        doneLabel: LocalizedStringKey = "Listo",
        cancelLabel: LocalizedStringKey = "Cancelar",
        requiredLabel: LocalizedStringKey = "obligatorio",
        locale: Locale? = nil
    ) {
        self.label = label
        _date = date
        self.range = range
        self.labelHidden = labelHidden
        self.placeholder = placeholder
        self.readOnly = readOnly
        self.required = required
        self.error = error
        self.errorMessage = errorMessage
        self.helperText = helperText
        self.size = size
        self.openCalendarLabel = openCalendarLabel
        self.clearLabel = clearLabel
        self.doneLabel = doneLabel
        self.cancelLabel = cancelLabel
        self.requiredLabel = requiredLabel
        self.locale = locale
    }

    // MARK: Lógica (interna, probada)

    /// La fecha de calendario sin hora: las 00:00 del día en `calendar`.
    static func normalized(_ date: Date, calendar: Calendar) -> Date {
        calendar.startOfDay(for: date)
    }

    /// `date` normalizada y metida en el rango (sus extremos también se normalizan).
    static func clamped(_ date: Date, to range: ClosedRange<Date>?, calendar: Calendar) -> Date {
        let day = normalized(date, calendar: calendar)
        guard let range else { return day }
        let lower = normalized(range.lowerBound, calendar: calendar)
        let upper = normalized(range.upperBound, calendar: calendar)
        return min(max(day, lower), upper)
    }

    /// El texto corto de la fecha en el idioma de `locale` (`18/05/2026` en `es-ES`).
    static func displayText(_ date: Date, locale: Locale, calendar: Calendar) -> String {
        var style = Date.FormatStyle(date: .omitted, time: .omitted, locale: locale, calendar: calendar)
            .day(.twoDigits).month(.twoDigits).year()
        style.timeZone = calendar.timeZone
        return date.formatted(style)
    }

    private var resolvedSize: DatePickerFieldSize { size ?? inheritedSize ?? .md }
    private var resolvedLocale: Locale { locale ?? environmentLocale }
    private var hasError: Bool { error || errorMessage != nil }
    private var canEdit: Bool { isEnabled && !readOnly }
    private var showsClear: Bool { date != nil && canEdit }
    private var valueText: String? { date.map { Self.displayText($0, locale: resolvedLocale, calendar: calendar) } }

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

    private var slot: CGFloat {
        switch resolvedSize {
        case .sm: B.buttonSmSlotSize
        case .md: B.buttonSlotSize
        case .lg: B.buttonLgSlotSize
        }
    }

    private var iconSize: CGFloat {
        switch resolvedSize {
        case .sm: B.buttonSmIconSize
        case .md: B.buttonIconSize
        case .lg: B.buttonLgIconSize
        }
    }

    private var glyphColor: Color { isEnabled ? B.buttonColor : B.buttonDisabledColor }

    private var textColor: Color {
        if !isEnabled { return T.disabledColor }
        if date == nil { return hasError ? T.errorPlaceholderColor : T.placeholderColor }
        return hasError ? T.errorColor : T.color
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
            helper: .init(fontSize: F.helperFontSize, fontWeight: F.helperFontWeight, lineHeight: F.helperLineHeight, color: F.helperColor),
            requiredLabel: required ? requiredLabel : nil
        ) {
            box
        }
    }

    private var box: some View {
        let scaledHeight = height * heightScale
        let scaledSlot = slot * heightScale
        let border: Color = !isEnabled ? T.disabledBorderColor : hasError ? T.errorBorderColor : T.borderColor
        return HStack(spacing: 0) {
            Group {
                if let valueText { Text(verbatim: valueText) } else { Text(placeholder) }
            }
            .brandFont(size: fontSize, weight: T.fontWeight)
            .foregroundStyle(textColor)
            .lineLimit(1)
            .padding(.leading, paddingInline)
            .frame(maxWidth: .infinity, alignment: .leading)
            .frame(minHeight: scaledHeight)
            .contentShape(Rectangle())
            .onTapGesture { open() }
            .accessibilityHidden(true)
            if showsClear { clearButton(slot: scaledSlot) }
            calendarButton(slot: scaledSlot)
        }
        .frame(minHeight: scaledHeight)
        .frame(maxWidth: .infinity)
        .modifier(BrandFieldBox(
            radius: T.borderRadius,
            borderWidth: T.borderWidth,
            background: !isEnabled ? T.disabledBg : hasError ? T.errorBg : T.bg,
            border: border,
            ringWidth: T.focusRingWidth,
            ringInsetOffset: T.focusRingInsetOffset,
            ringColor: T.focusRingColor,
            isFocused: false,
            transition: nil
        ))
        .accessibilityElement(children: .contain)
        .accessibilityValue(Text(readOnly ? valueText ?? "" : ""))
        .modifier(PickerPresentation(
            isPresented: $isPresented, draft: $draft, range: range, locale: resolvedLocale, calendar: calendar,
            doneLabel: doneLabel, cancelLabel: cancelLabel, compact: isCompact, commit: commit
        ))
    }

    private var isCompact: Bool {
        #if os(iOS)
        horizontalSizeClass == .compact
        #else
        false
        #endif
    }

    @ViewBuilder
    private func calendarButton(slot: CGFloat) -> some View {
        if readOnly {
            // Solo lectura: el glifo se queda, pero ya no es un botón ni entra en el recorrido.
            BrandIcon(.calendar, size: .text)
                .environment(\.brandIconTextSize, iconSize)
                .foregroundStyle(glyphColor)
                .frame(width: slot, height: slot)
                .accessibilityHidden(true)
        } else {
            calendarControl(slot: slot)
        }
    }

    private func calendarControl(slot: CGFloat) -> some View {
        Button(action: open) {
            BrandIcon(.calendar, size: .text)
                .environment(\.brandIconTextSize, iconSize)
                .foregroundStyle(glyphColor)
                .frame(width: slot, height: slot)
                .overlay {
                    if isButtonFocused {
                        Rectangle().strokeBorder(B.buttonFocusRingColor, lineWidth: B.buttonFocusRingWidth)
                            .padding(B.borderWidth)
                    }
                }
                .contentShape(Rectangle())
                .brandHitTarget(width: slot, height: slot)
        }
        .buttonStyle(.plain)
        .focused($isButtonFocused)
        .focusEffectDisabled()
        .accessibilityLabel(Text(openCalendarLabel))
        .accessibilityValue(Text(valueText ?? ""))
    }

    private func clearButton(slot: CGFloat) -> some View {
        Button {
            date = nil
        } label: {
            BrandIcon(.close, size: .text)
                .environment(\.brandIconTextSize, iconSize)
                .foregroundStyle(glyphColor)
                .frame(width: slot, height: slot)
                .contentShape(Rectangle())
                .brandHitTarget(width: slot, height: slot)
        }
        .buttonStyle(.plain)
        .focusEffectDisabled()
        .accessibilityLabel(Text(clearLabel))
    }

    private func open() {
        guard canEdit else { return }
        draft = Self.clamped(date ?? Date(), to: range, calendar: calendar)
        isPresented = true
    }

    private func commit(_ picked: Date) {
        date = Self.clamped(picked, to: range, calendar: calendar)
    }
}

/// El selector del sistema: hoja inferior con «Listo» y «Cancelar» en iPhone; popover anclado al campo en iPad y macOS.
private struct PickerPresentation: ViewModifier {
    @Binding var isPresented: Bool
    @Binding var draft: Date
    let range: ClosedRange<Date>?
    let locale: Locale
    let calendar: Calendar
    let doneLabel: LocalizedStringKey
    let cancelLabel: LocalizedStringKey
    let compact: Bool
    let commit: (Date) -> Void

    private func picker(_ selection: Binding<Date>) -> some View {
        Group {
            if let range {
                DatePicker("", selection: selection, in: range, displayedComponents: .date)
            } else {
                DatePicker("", selection: selection, displayedComponents: .date)
            }
        }
        .datePickerStyle(.graphical)
        .labelsHidden()
        .tint(BrandColorRoles.text)
        .environment(\.locale, locale)
        .environment(\.calendar, calendar)
    }

    func body(content: Content) -> some View {
        content
            .popover(isPresented: Binding(get: { isPresented && !compact }, set: { isPresented = $0 }), arrowEdge: .bottom) {
                // Elegir un día confirma y cierra.
                picker(Binding(get: { draft }, set: { draft = $0; commit($0); isPresented = false }))
                    .padding(BrandSpacing.s4)
                    .presentationCompactAdaptation(.popover)
            }
            .sheet(isPresented: Binding(get: { isPresented && compact }, set: { isPresented = $0 })) {
                VStack(spacing: BrandSpacing.s4) {
                    HStack {
                        BrandButton(cancelLabel, variant: .outline) { isPresented = false }
                        Spacer()
                        BrandButton(doneLabel) { commit(draft); isPresented = false }
                    }
                    picker($draft)
                    Spacer(minLength: 0)
                }
                .padding(BrandSpacing.s4)
                .presentationDetents([.medium])
                .presentationDragIndicator(.visible)
                .presentationBackground(BrandSheetTokens.bg)
            }
    }
}

#Preview("DatePickerField") {
    @Previewable @State var empty: Date?
    @Previewable @State var filled: Date? = Calendar.current.date(from: DateComponents(year: 2026, month: 5, day: 18))
    return ScrollView {
        VStack(alignment: .leading, spacing: BrandSpacing.s5) {
            BrandDatePickerField("Fecha de inicio", date: $empty)
            BrandDatePickerField("Obligatorio", date: $empty, required: true)
            BrandDatePickerField("Con valor", date: $filled, helperText: "La fecha en la que empieza el contrato.")
            BrandDatePickerField("Con error", date: $empty, errorMessage: "Elige una fecha.")
            BrandDatePickerField("Solo lectura", date: $filled, readOnly: true)
            BrandDatePickerField("Deshabilitado", date: $filled).disabled(true)
            ForEach(DatePickerFieldSize.allCases, id: \.self) { size in
                BrandDatePickerField("Talla \(size.rawValue)", date: $empty, size: size)
            }
        }
        .padding()
    }
}
